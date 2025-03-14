import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    searchTerm: '',
    category: 'popular',
    sortBy: 'hot',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.category = 'popular';
      state.sortBy = 'hot';
    },
  },
});

export const { setSearchTerm, setCategory, setSortBy, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
