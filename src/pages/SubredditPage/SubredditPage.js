import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import PostList from '../../components/PostList/PostList';
import Filters from '../../components/Filters/Filters';
import styles from './SubredditPage.module.css';
import PageTransition from '../../components/Animations/PageTransition';
import PostSkeleton from '../../components/LoadingIndicator/PostSkeleton';

const SubredditPage = () => {
  const { subreddit } = useParams();
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('hot');
  
  const posts = useSelector(state => state.posts.posts);
  const status = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);
  
  useEffect(() => {
    console.log('SubredditPage: Loading subreddit:', subreddit, 'with sort:', sortBy);
    dispatch(fetchPosts({ category: subreddit, sortBy }));
  }, [dispatch, subreddit, sortBy]);
  
  const handleSortChange = (newSortBy) => {
    console.log('Sort changed to:', newSortBy);
    setSortBy(newSortBy);
  };
  
  const handleRetry = () => {
    console.log('SubredditPage retry function called');
    dispatch(fetchPosts({ category: subreddit, sortBy }));
  };
  
  return (
    <PageTransition>
      <div className={styles.subredditPage}>
        <div className={styles.subredditHeader}>
          <h2 className={styles.pageTitle}>r/{subreddit}</h2>
          <button className={styles.subscribeButton}>Join</button>
      </div>
      
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
          <p>No posts found in r/{subreddit}.</p>
        </div>
      )}
    </div>
    </PageTransition>
  );
};

export default SubredditPage;
