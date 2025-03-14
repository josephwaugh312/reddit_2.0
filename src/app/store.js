import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import filtersReducer from '../features/filters/filtersSlice';

// Remove the unused rootReducer and initialState
// The following code is not being used:
// const initialState = {
//   posts: {
//     items: [],
//     isLoading: false,
//     error: null
//   }
// };
// 
// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    filters: filtersReducer,
  },
});
