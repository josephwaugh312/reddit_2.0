import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../../features/posts/postsSlice';
import PostList from '../../components/PostList/PostList';
import PostSkeleton from '../../components/LoadingIndicator/PostSkeleton';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import styles from './SearchResultsPage.module.css';
import PageTransition from '../../components/Animations/PageTransition';

const SearchResultsPage = () => {
  console.log('SearchResultsPage rendered');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  console.log('Search query:', query);
  
  const dispatch = useDispatch();
  
  // Enhanced Redux state logging
  const postsState = useSelector((state) => {
    console.log('Full Redux state:', state);
    console.log('Posts state:', state.posts);
    return state.posts;
  });
  
  const { posts, status, error } = postsState;
  console.log('Posts array length:', posts?.length);
  console.log('Current status:', status);
  if (error) console.log('Error:', error);
  
  useEffect(() => {
    if (query) {
      console.log('Dispatching searchPosts with query:', query);
      dispatch(searchPosts(query));
    }
  }, [query, dispatch]);
  
  return (
    <PageTransition>
      <div className={styles.searchResultsPage}>
        <h2 className={styles.title}>Search Results for "{query}"</h2>
        
        {status === 'loading' && (
          <div className={styles.skeletonContainer}>
            <PostSkeleton count={8} />
          </div>
        )}
        
        {status === 'failed' && (
          <ErrorDisplay 
            message={`Failed to load search results: ${error}`} 
            retry={() => dispatch(searchPosts(query))}
          />
        )}
        
        {status === 'succeeded' && posts.length === 0 && (
          <div className={styles.noResults}>
            <p>No results found for "{query}"</p>
            <p>Try different keywords or check your spelling.</p>
          </div>
        )}
        
        {status === 'succeeded' && posts.length > 0 && (
          <PostList posts={posts} />
        )}
      </div>
    </PageTransition>
  );
};

export default SearchResultsPage;
