import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './CommentSkeleton.module.css';

const CommentSkeleton = ({ count = 5, depth = 0 }) => {
  return Array(count)
    .fill()
    .map((_, index) => (
      <div 
        className={styles.commentSkeleton} 
        key={`comment-skeleton-${index}`}
        style={{ marginLeft: `${depth * 20}px` }}
      >
        <div className={styles.commentHeader}>
          <Skeleton width={80} height={16} />
          <Skeleton width={50} height={12} />
          <Skeleton width={100} height={12} />
        </div>
        
        <div className={styles.commentBody}>
          <Skeleton count={2} height={12} />
          <Skeleton width="80%" height={12} />
        </div>
        
        {/* Add nested comments for the first two comments */}
        {index < 2 && depth < 2 && (
          <div className={styles.replies}>
            <CommentSkeleton count={2} depth={depth + 1} />
          </div>
        )}
      </div>
    ));
};

export default CommentSkeleton; 