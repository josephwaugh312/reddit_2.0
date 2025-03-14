import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Comment.module.css';

const Comment = ({ comment }) => {
  const [expanded, setExpanded] = useState(true);
  
  if (!comment || comment.kind === 'more') {
    return null;
  }
  
  const { author, body, created_utc, score, replies } = comment.data || comment;
  const hasReplies = replies && replies.data && replies.data.children.length > 0;
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const formattedDate = new Date(created_utc * 1000).toLocaleString();
  
  return (
    <motion.div 
      className={styles.comment}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.commentHeader}>
        <motion.button 
          className={`${styles.collapseButton} ${expanded ? '' : styles.collapsed}`}
          onClick={toggleExpanded}
          aria-label={expanded ? 'Collapse comment' : 'Expand comment'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {expanded ? '−' : '+'}
        </motion.button>
        
        <span className={styles.author}>{author}</span>
        <span className={styles.score}>{score} points</span>
        <span className={styles.date}>{formattedDate}</span>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.commentBody}>
              {body}
            </div>
            
            {hasReplies && (
              <div className={styles.replies}>
                {replies.data.children
                  .filter(reply => reply.kind !== 'more')
                  .map(reply => (
                    <Comment key={reply.data.id} comment={reply} />
                  ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Comment;
