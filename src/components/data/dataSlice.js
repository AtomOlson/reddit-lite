import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadData = createAsyncThunk(
  'data/getData',
  async ({path, params}) => {
    const data = await fetch(`https://www.reddit.com${path}/.json`)
    const json = await data.json();


    return {
      json,
      path,
      params
    };
  }
)

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    posts: [],
    subreddit: {},
    openPost: {},
    comments: [],
    user: {},
    isLoading: false,
    hasError: false
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
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
        state.comments = json[1].data.children;
      }

      state.isLoading = false;
      state.hasError = false;
    },
    [loadData.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
})



export const getPosts = state => state.data.posts;
export const getSubreddit = state => state.data.subreddit;
export const getOpenPost = state => state.data.openPost;
export const getComments = state => state.data.comments;
export const getUser = state => state.data.user;
export const { setPosts, setSubreddit, setOpenPost, setComments, setUser } = dataSlice.actions;
export default dataSlice.reducer;