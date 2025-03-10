import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../features/posts/postsSlice';

export function usePostData(category = 'popular') {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(state => state.posts);
  
  useEffect(() => {
    dispatch(getPosts(category));
  }, [category, dispatch]);
  
  return { posts: items, isLoading, error };
} 