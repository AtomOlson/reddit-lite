import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: [
      'Best',
      'Hot',
      'New',
      'Top',
      'Rising'
    ],
    selecting: 'filterNotSelecting'
  },
  reducers: {
    setFilter: (state, action) => {
      let data = state.filter;
      data = data.filter(item => item !== action.payload);
      data.unshift(action.payload);
      state.filter = data;
    },
    setSelecting: (state, action) => {
      state.selecting = action.payload
    }
  }
})

export const getFilters = state => state.filter.filter;
export const isSelecting = state => state.filter.selecting;
export const { setFilter, setSelecting } = filterSlice.actions;
export default filterSlice.reducer;