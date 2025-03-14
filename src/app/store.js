import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import filtersReducer from '../features/filters/filtersSlice';

// Create a simple reducer for testing
const initialState = {
  posts: {
    items: [],
    isLoading: false,
    error: null
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    filters: filtersReducer,
  },
});
