import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CommentSkeleton from './CommentSkeleton';
import styles from './PostDetailSkeleton.module.css';

const PostDetailSkeleton = () => {
  return (
    <div className={styles.postDetailSkeleton}>
      <div className={styles.backButton}>
        <Skeleton width={60} height={24} />
      </div>
      
      <div className={styles.postContent}>
        <div className={styles.title}>
          <Skeleton height={32} />
        </div>
        
        <div className={styles.metadata}>
          <Skeleton width={100} height={16} />
          <Skeleton width={150} height={16} />
          <Skeleton width={120} height={16} />
        </div>
        
        <div className={styles.selfText}>
          <Skeleton count={4} height={16} />
        </div>
        
        <div className={styles.stats}>
          <Skeleton width={80} height={20} />
          <Skeleton width={120} height={20} />
        </div>
      </div>
      
      <div className={styles.commentsSection}>
        <div className={styles.commentsTitle}>
          <Skeleton width={150} height={24} />
        </div>
        
        <div className={styles.commentsList}>
          <CommentSkeleton count={5} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeleton; 