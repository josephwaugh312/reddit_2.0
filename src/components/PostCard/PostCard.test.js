import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PostCard from './PostCard';

const mockStore = configureStore([]);

describe('PostCard Component', () => {
  const mockPost = {
    id: '123',
    title: 'Test Post',
    author: 'testuser',
    subreddit: 'testsubreddit',
    score: 42,
    num_comments: 10,
    created_utc: Date.now() / 1000,
    thumbnail: 'https://example.com/thumb.jpg'
  };

  let store;

  beforeEach(() => {
    store = mockStore({
      posts: {
        selectedPost: null
      }
    });
    store.dispatch = jest.fn();
  });

  test('renders post information correctly', () => {
    render(
      <Provider store={store}>
        <PostCard post={mockPost} />
      </Provider>
    );

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('u/testuser')).toBeInTheDocument();
    expect(screen.getByText('r/testsubreddit')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('10 comments')).toBeInTheDocument();
  });

  test('dispatches selectPost action when clicked', () => {
    render(
      <Provider store={store}>
        <PostCard post={mockPost} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Test Post'));
    expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: expect.stringContaining('selectPost')
    }));
  });
}); 