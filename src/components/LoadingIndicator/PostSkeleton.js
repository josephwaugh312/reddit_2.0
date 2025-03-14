import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './PostSkeleton.module.css';

const PostSkeleton = ({ count = 5 }) => {
  return Array(count)
    .fill()
    .map((_, index) => (
      <div className={styles.postSkeleton} key={`skeleton-${index}`}>
        <div className={styles.voteContainer}>
          <Skeleton width={20} height={20} />
          <Skeleton width={20} height={20} />
          <Skeleton width={20} height={20} />
        </div>
        
        <div className={styles.mainContent}>
          <div className={styles.thumbnailContainer}>
            <Skeleton width={70} height={70} borderRadius={4} />
          </div>
          
          <div className={styles.contentContainer}>
            <Skeleton width="90%" height={24} style={{ marginBottom: '8px' }} />
            <div className={styles.metadataSkeleton}>
              <Skeleton width={80} height={12} />
              <Skeleton width={60} height={12} />
              <Skeleton width={100} height={12} />
              <Skeleton width={70} height={12} />
            </div>
          </div>
        </div>
      </div>
    ));
};

export default PostSkeleton; 