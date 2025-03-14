import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './PostCard.module.css';

const PostCard = ({ post, index }) => {
  console.log('PostCard styles:', styles); // Debug log
  
  // Add null checks for post properties
  const {
    id = '',
    title = 'Untitled Post',
    author = '[deleted]',
    subreddit = '',
    score = 0,
    num_comments = 0,
    created_utc = Date.now() / 1000,
    thumbnail = ''
  } = post || {};
  
  // Format the timestamp
  const timeAgo = formatTimeAgo(created_utc);
  
  // Check if thumbnail is a valid URL
  const hasValidThumbnail = thumbnail && 
    thumbnail !== 'self' && 
    thumbnail !== 'default' && 
    thumbnail !== 'nsfw' &&
    !thumbnail.includes('redditmedia');
  
  return (
    <motion.div 
      className={styles.postCard} 
      data-testid="post-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05, // Stagger effect
        ease: "easeOut" 
      }}
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
      }}
    >
      <div className={styles.voteContainer}>
        <motion.button 
          className={styles.voteButton} 
          aria-label="Upvote"
          whileHover={{ scale: 1.2, color: "#FF4500" }}
          whileTap={{ scale: 0.9 }}
        >
          ▲
        </motion.button>
        <span className={styles.score}>{score}</span>
        <motion.button 
          className={styles.voteButton} 
          aria-label="Downvote"
          whileHover={{ scale: 1.2, color: "#9494FF" }}
          whileTap={{ scale: 0.9 }}
        >
          ▼
        </motion.button>
      </div>
      
      <div className={styles.mainContent}>
        {hasValidThumbnail && (
          <div className={styles.thumbnailContainer}>
            <img src={thumbnail} alt="" className={styles.thumbnail} />
          </div>
        )}
        
        <div className={styles.contentContainer}>
          <Link to={`/posts/${id}`} className={styles.titleLink}>
            <h3 className={styles.title}>{title}</h3>
          </Link>
          <div className={styles.metadata}>
            <span>Posted by u/{author}</span>
            <span>{timeAgo}</span>
            <span>in r/{subreddit}</span>
            <span>{num_comments} comments</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Simple function to format time ago
const formatTimeAgo = (timestamp) => {
  const seconds = Math.floor((new Date() - new Date(timestamp * 1000)) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  if (interval === 1) return '1 year ago';
  
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  if (interval === 1) return '1 month ago';
  
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  if (interval === 1) return '1 day ago';
  
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  if (interval === 1) return '1 hour ago';
  
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  if (interval === 1) return '1 minute ago';
  
  return 'just now';
};

export default PostCard;
