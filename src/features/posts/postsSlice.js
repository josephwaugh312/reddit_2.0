import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (params, { rejectWithValue }) => {
    try {
      // Simulate an error for testing
      // Comment this out when you're done testing
      //throw new Error('Reddit API error: 404');
      let url;
      
      // Handle different parameter formats
      if (typeof params === 'string') {
        // If params is just a string, it's the sort option for the main page
        console.log('Fetching posts with sort:', params);
        url = `https://www.reddit.com/${params}.json`;
      } else if (params && typeof params === 'object') {
        // If params is an object, extract category and sortBy
        const { category, sortBy } = params;
        console.log('Fetching posts with category:', category, 'and sort:', sortBy);
        
        if (category) {
          url = `https://www.reddit.com/r/${category}/${sortBy || 'hot'}.json`;
        } else {
          url = `https://www.reddit.com/${sortBy || 'hot'}.json`;
        }
      } else {
        // Default case
        url = 'https://www.reddit.com/hot.json';
      }
      
      console.log('Fetching posts from URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Reddit API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data.children.map(child => child.data);
    } catch (error) {
      console.error('Fetch posts error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async (searchQuery, { rejectWithValue }) => {
    try {
      // Simulate an error for testing
      // Comment this out when you're done testing
      //throw new Error('Search service temporarily unavailable');
      
      console.log('Fetching search results for:', searchQuery);
      const response = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(searchQuery)}&sort=relevance&limit=25`);
      
      if (!response.ok) {
        //throw new Error(`Reddit API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Search results:', data.data.children.length);
      return data.data.children.map(child => child.data);
    } catch (error) {
      console.error('Search posts error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPostDetails = createAsyncThunk(
  'posts/fetchPostDetails',
  async (postId, { rejectWithValue }) => {
    try {
      // Simulate an error for testing
      // Comment this out when you're done testing
      //throw new Error('Failed to load post details');
      
      const response = await fetch(`https://www.reddit.com/comments/${postId}.json`);
      
      if (!response.ok) {
        throw new Error(`Reddit API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data[0].data.children[0].data;
    } catch (error) {
      console.error('Fetch post details error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedPost: null
  },
  reducers: {
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An error occurred while fetching posts.';
        console.log('Error in Redux state:', action.payload);
      })
      // Handle searchPosts
      .addCase(searchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to search posts';
      })
      // Handle fetchPostDetails
      .addCase(fetchPostDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch post details';
      });
  },
});

export const { selectPost, clearSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;

export const selectPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectSelectedPost = (state) => state.posts.selectedPost;
