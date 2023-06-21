import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    posts: [],
    subreddit: {},
    openPost: {},
    user: {}
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
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
})

export const getPosts = state => state.data.posts;
export const getSubreddit = state => state.data.subreddit;
export const getOpenPost = state => state.data.openPost;
export const getUser = state => state.data.user;
export const { setPosts, setSubreddit, setOpenPost, setUser } = dataSlice.actions;
export default dataSlice.reducer;