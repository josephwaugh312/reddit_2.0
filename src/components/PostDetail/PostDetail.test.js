import React from 'react';
import { render, screen } from '@testing-library/react';
import PostDetail from './PostDetail';

// Mock the Redux hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

// Mock the react-router-dom module
jest.mock('react-router-dom', () => ({
  useParams: () => ({ postId: 'test123' }),
  useNavigate: () => jest.fn(),
}));

// Mock the PostDetail component dependencies
jest.mock('../../features/posts/postsSlice', () => ({
  fetchPostDetails: jest.fn(),
  selectSelectedPost: (state) => state.posts.selectedPost,
  selectPostsStatus: (state) => state.posts.status,
  selectPostsError: (state) => state.posts.error,
}));

jest.mock('../../features/comments/commentsSlice', () => ({
  fetchComments: jest.fn(),
  selectComments: (state) => state.comments.comments,
  selectCommentsStatus: (state) => state.comments.status,
  selectCommentsError: (state) => state.comments.error,
}));

// Mock the PostDetailSkeleton component
jest.mock('../LoadingIndicator/PostDetailSkeleton', () => () => (
  <div className="postDetailSkeleton" data-testid="loading-skeleton">Loading...</div>
));

// Mock the ErrorDisplay component
jest.mock('../ErrorDisplay/ErrorDisplay', () => ({ message }) => (
  <div className="errorDisplay" data-testid="error-display">{message}</div>
));

// Mock the Comment component
jest.mock('../Comment/Comment', () => ({ comment }) => (
  <div className="comment" data-testid="comment">
    {comment.data.body}
    <div className="author">{comment.data.author}</div>
  </div>
));

import { useSelector } from 'react-redux';

describe('PostDetail Component', () => {
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
  });
  
  test('renders loading state', () => {
    // Mock the useSelector hook for loading state
    useSelector.mockImplementation(selector => {
      const state = {
        posts: { status: 'loading', error: null, selectedPost: null },
        comments: { status: 'loading', error: null, comments: [] },
      };
      return selector(state);
    });
    
    render(<PostDetail />);
    
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
  
  test('renders error state', () => {
    // Mock the useSelector hook for error state
    useSelector.mockImplementation(selector => {
      const state = {
        posts: { status: 'failed', error: 'Failed to load post', selectedPost: null },
        comments: { status: 'idle', error: null, comments: [] },
      };
      return selector(state);
    });
    
    render(<PostDetail />);
    
    expect(screen.getByTestId('error-display')).toBeInTheDocument();
    expect(screen.getByText(/Failed to load post/i)).toBeInTheDocument();
  });
  
  test('renders post details correctly', () => {
    // Mock the useSelector hook for successful state
    useSelector.mockImplementation(selector => {
      const state = {
        posts: {
          selectedPost: {
            id: 'test123',
            title: 'Test Post',
            author: 'testuser',
            subreddit: 'testsubreddit',
            created_utc: Date.now() / 1000,
            score: 42,
            num_comments: 10,
            selftext: 'This is a test post content',
          },
          status: 'succeeded',
          error: null,
        },
        comments: {
          comments: [],
          status: 'succeeded',
          error: null,
        },
      };
      return selector(state);
    });
    
    render(<PostDetail />);
    
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    expect(screen.getByText(/testsubreddit/i)).toBeInTheDocument();
    expect(screen.getByText('This is a test post content')).toBeInTheDocument();
  });
  
  test('renders comments correctly', () => {
    // Mock the useSelector hook for successful state with comments
    useSelector.mockImplementation(selector => {
      const state = {
        posts: {
          selectedPost: {
            id: 'test123',
            title: 'Test Post',
            author: 'testuser',
            subreddit: 'testsubreddit',
            created_utc: Date.now() / 1000,
            score: 42,
            num_comments: 10,
            selftext: 'This is a test post content',
          },
          status: 'succeeded',
          error: null,
        },
        comments: {
          comments: [
            {
              kind: 't1',
              data: {
                id: 'comment1',
                author: 'commenter1',
                body: 'This is a test comment',
                created_utc: Date.now() / 1000,
                score: 5,
                replies: {
                  data: {
                    children: [],
                  },
                },
              },
            },
          ],
          status: 'succeeded',
          error: null,
        },
      };
      return selector(state);
    });
    
    render(<PostDetail />);
    
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    expect(screen.getByText(/commenter1/i)).toBeInTheDocument();
  });
});
