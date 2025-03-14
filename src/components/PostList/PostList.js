import React from 'react';
import PostCard from '../PostCard/PostCard';
import PostSkeleton from '../LoadingIndicator/PostSkeleton';
import styles from './PostList.module.css';

const PostList = ({ posts = [], loading = false }) => {
  console.log('PostList styles:', styles); // Debug log
  
  if (loading) {
    return (
      <div className={styles.postList} data-testid="post-list-loading">
        <PostSkeleton count={8} />
      </div>
    );
  }
  
  // If no posts are provided, use dummy data for testing
  const dummyPosts = [
    {
      id: '1',
      title: 'First Test Post',
      author: 'user1',
      subreddit: 'reactjs',
      score: 42,
      num_comments: 10,
      created_utc: Date.now() / 1000 - 3600, // 1 hour ago
      thumbnail: 'https://placehold.co/150x150',
    },
    {
      id: '2',
      title: 'Second Test Post with a longer title to see how it wraps',
      author: 'user2',
      subreddit: 'javascript',
      score: 21,
      num_comments: 5,
      created_utc: Date.now() / 1000 - 7200, // 2 hours ago
      thumbnail: '',
    },
    {
      id: '3',
      title: 'Third Test Post - Another example to show multiple posts',
      author: 'user3',
      subreddit: 'webdev',
      score: 15,
      num_comments: 3,
      created_utc: Date.now() / 1000 - 10800, // 3 hours ago
      thumbnail: 'https://placehold.co/150x150',
    },
  ];

  const displayPosts = posts.length > 0 ? posts : dummyPosts;

  if (displayPosts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No posts found.</p>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className={styles.postList} data-testid="post-list">
      {displayPosts.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};

export default PostList;
