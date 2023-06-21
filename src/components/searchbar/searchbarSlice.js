import { createSlice } from "@reduxjs/toolkit";

const searchbarSlice = createSlice({
  name: 'searchBar',
  initialState: {
    active: 'search_inactive',
    searchTerm: ''
  },
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  }
})

export const isActive = state => state.searchbar.active;
export const getSearchTerm = state => state.searchbar.searchTerm;
export const { setActive, setSearchTerm } = searchbarSlice.actions;
export default searchbarSlice.reducer;