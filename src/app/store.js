import { configureStore } from '@reduxjs/toolkit';
import searchbarSlice from '../components/searchbar/searchbarSlice';
import filterSlice from '../components/filter/filterSlice';
import dataSlice from '../components/data/dataSlice';

export const store = configureStore({
  reducer: {
    searchbar: searchbarSlice,
    filter: filterSlice,
    data: dataSlice
  },
});
