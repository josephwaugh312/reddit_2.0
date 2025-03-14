import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
  status: 'idle',
  error: null
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.reddit.com/comments/${postId}.json`);
      
      if (!response.ok) {
        throw new Error(`Reddit API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data[1].data.children;
    } catch (error) {
      console.error('Fetch comments error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch comments';
      });
  }
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
