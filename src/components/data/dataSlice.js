import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const intialOptions = {
  headers: {
    accept: "application/json",
  },
};

export const loadData = createAsyncThunk(
  'data/loadData',
  async ({path, params}) => {
    const data = await fetch(`https://www.reddit.com${path}/.json`, intialOptions);
    const json = await data.json();


    return {
      json,
      path,
      params
    };
  }
)

export const loadSearch = createAsyncThunk(
  'data/loadSearch',
  async (searchParam) => {
    const data = await fetch(`https://www.reddit.com/search/.json?q=${searchParam}`);
    const json = await data.json();

    return json;
  }
)

export const loadUserIcon = createAsyncThunk(
  'data/loadUserIcon',
  async(user) => {

    const data = await fetch(`https://www.reddit.com/user/${user}/about.json`, intialOptions)
    if(data.ok) {
      const json = await data.json()
      return {
        json,
        user
      }
    }

    throw new Error('Failed to fetch user')
  }
)

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    posts: [],
    subreddit: {},
    openPost: {},
    comments: [],
    userIcons: {},
    user: {},
    search: {},
    isLoading: false,
    hasError: false,
    searchIsLoading: false,
    searchHasError: false,
    iconIsLoading: false,
    iconHasError: false
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSubreddit: (state, action) => {
      state.subreddit = action.payload;
    },
    setOpenPost: (state, action) => {
      state.openPost = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setUserIcons: (state, action) => {
      state.userIcons = {...state.userIcons, ...action.payload};
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload
    }
  },
  extraReducers: {
    // Posts
    [loadData.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadData.fulfilled]: (state, action) => {
      const { json, path, params } = action.payload;
      let [ filter, subreddit, id, title ] = params;  // Destructures the params in the url
      const filters = [ 'best', 'hot', 'new', 'top', 'rising' ]; // Filters list to check if the filter is params

      if(path === '/'  || filters.includes(filter)) { // Gets the data for plain posts
        state.posts = json.data.children
      } else if(path === `/r/${subreddit}/comments/${id}/${title}/`) { // Gets data for open post
        state.openPost = json[0].data.children[0].data;
        state.comments = json[1].data.children.slice(0, -1); // Slice removes the last empty comment in every json
      }

      state.isLoading = false;
      state.hasError = false;
    },
    [loadData.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    // Search
    [loadSearch.pending]: (state, action) => {
      state.searchIsLoading = true;
      state.searchHasError = false;
    },
    [loadSearch.fulfilled]: (state, action) => {

      state.searchIsLoading = false;
      state.searchHasError = false;
    },
    [loadSearch.rejected]: (state, action) => {
      state.searchIsLoading = false;
      state.searchHasError = true;
    },
    // Icons
    [loadUserIcon.pending]: (state, action) => {
      state.iconIsLoading = true;
      state.iconHasError = false;
    },
    [loadUserIcon.fulfilled]: (state, action) => {
      const { json, user } = action.payload;
      let img;

      if(json.data.snoovatar_img) {
        img = json.data.snoovatar_img;
      } else if (json.data.icon_img) {
        if(!json.data.icon_img.includes('styles.')) {
          img = json.data.icon_img;
        }
      } else {
        img = undefined;
      }

      state.userIcons[user] = img;

      state.iconIsLoading = false;
      state.iconHasError = false;
    },
    [loadUserIcon.rejected]: (state, action) => {
      state.iconIsLoading = false;
      state.iconHasError = true;
    }
  }
})



export const getPosts = state => state.data.posts;
export const getSubreddit = state => state.data.subreddit;
export const getOpenPost = state => state.data.openPost;
export const getComments = state => state.data.comments;
export const getUserIcons = state => state.data.userIcons
export const getUser = state => state.data.user;
export const getSearch = state => state.data.search;
export const { setPosts, setSubreddit, setOpenPost, setComments, setUser, setSearch, setUserIcons } = dataSlice.actions;
export default dataSlice.reducer;