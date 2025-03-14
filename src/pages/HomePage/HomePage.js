import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice';
import PostList from '../../components/PostList/PostList';
import Filters from '../../components/Filters/Filters';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import PostSkeleton from '../../components/LoadingIndicator/PostSkeleton';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import styles from './HomePage.module.css';
import PageTransition from '../../components/Animations/PageTransition';

const HomePage = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('hot');
  
  const posts = useSelector(state => state.posts.posts);
  const status = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);
  
  useEffect(() => {
    console.log('Current posts state:', posts);
    console.log('Current status:', status);
    console.log('Current error:', error);
  }, [posts, status, error]);
  
  useEffect(() => {
    console.log('HomePage: Fetching posts with sortBy:', sortBy);
    dispatch(fetchPosts(sortBy));
  }, [dispatch, sortBy]);
  
  const handleSortChange = (newSortBy) => {
    console.log('Sort changed to:', newSortBy);
    setSortBy(newSortBy);
  };
  
  const handleRetry = () => {
    console.log('HomePage retry function called');
    dispatch(fetchPosts(sortBy));
  };
  
  return (
    <PageTransition>
      <div className={styles.homePage}>
        <h2 className={styles.pageTitle}>Popular Posts</h2>
        
        <Filters 
          activeSortOption={sortBy} 
          onSortChange={handleSortChange} 
        />
        
        {status === 'loading' && (
          <div className={styles.skeletonContainer}>
            <PostSkeleton count={8} />
          </div>
        )}
        
        {status === 'failed' && (
          <ErrorDisplay 
            message={error} 
            retry={handleRetry}
          />
        )}
        
        {status === 'succeeded' && posts && posts.length > 0 ? (
          <PostList posts={posts} />
        ) : status === 'succeeded' && (
          <div className={styles.noResults}>
            <p>No posts found.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default HomePage;
