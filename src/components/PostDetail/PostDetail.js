import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetails } from '../../features/posts/postsSlice';
import { fetchComments } from '../../features/comments/commentsSlice';
import Comment from '../Comment/Comment';
import PostDetailSkeleton from '../LoadingIndicator/PostDetailSkeleton';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import styles from './PostDetail.module.css';
import PageTransition from '../../components/Animations/PageTransition';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedPost, status: postStatus, error: postError } = useSelector(state => state.posts);
  const { comments, status: commentsStatus, error: commentsError } = useSelector(state => state.comments);
  
  useEffect(() => {
    if (postId) {
      dispatch(fetchPostDetails(postId));
      dispatch(fetchComments(postId));
    }
  }, [postId, dispatch]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const isLoading = postStatus === 'loading' || commentsStatus === 'loading';
  const hasError = postStatus === 'failed' || commentsStatus === 'failed';
  const error = postError || commentsError;
  
  if (isLoading) {
    return (
      <PageTransition>
        <PostDetailSkeleton />
      </PageTransition>
    );
  }
  
  if (hasError) {
    return (
      <PageTransition>
        <ErrorDisplay 
          message={`Failed to load post: ${error}`} 
          retry={() => {
            dispatch(fetchPostDetails(postId));
            dispatch(fetchComments(postId));
          }}
        />
      </PageTransition>
    );
  }
  
  if (!selectedPost) {
    return (
      <PageTransition>
        <div className={styles.notFound}>
          <h2>Post not found</h2>
          <button onClick={handleGoBack} className={styles.backButton}>
            Go Back
          </button>
        </div>
      </PageTransition>
    );
  }
  
  return (
    <PageTransition>
      <div className={styles.postDetail}>
        <button onClick={handleGoBack} className={styles.backButton} data-testid="back-button">
          ← Back
        </button>
        
        <div className={styles.postContent}>
          <h1 data-testid="post-title" className={styles.title}>{selectedPost.title}</h1>
          
          <div className={styles.metadata}>
            <div data-testid="post-author">Posted by u/{selectedPost.author}</div>
            <span>{new Date(selectedPost.created_utc * 1000).toLocaleString()}</span>
            <span>in r/{selectedPost.subreddit}</span>
          </div>
          
          {selectedPost.selftext && (
            <div data-testid="post-content" className={styles.selfText}>
              {selectedPost.selftext}
            </div>
          )}
          
          {selectedPost.url && selectedPost.url.match(/\.(jpeg|jpg|gif|png)$/) && (
            <div className={styles.imageContainer}>
              <img src={selectedPost.url} alt={selectedPost.title} className={styles.image} />
            </div>
          )}
          
          {/* Handle link posts */}
          {selectedPost.url && !selectedPost.url.match(/\.(jpeg|jpg|gif|png)$/) && (
            <div className={styles.linkContainer}>
              <a 
                href={selectedPost.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.externalLink}
              >
                {selectedPost.url}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          )}
          
          <div className={styles.stats}>
            <div className={styles.votes}>
              <span>{selectedPost.score} upvotes</span>
            </div>
            <div className={styles.comments}>
              <span>{selectedPost.num_comments} comments</span>
            </div>
          </div>
        </div>
        
        <div data-testid="comments-section" className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>Comments</h2>
          
          {comments.length === 0 ? (
            <p className={styles.noComments}>No comments yet.</p>
          ) : (
            <div className={styles.commentsList}>
              {comments.map(comment => (
                <Comment 
                  key={comment.data ? comment.data.id : `comment-${Math.random()}`} 
                  comment={comment} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default PostDetail;
