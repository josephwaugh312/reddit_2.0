import React from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingIndicator.module.css';

const LoadingIndicator = () => {
  console.log('LoadingIndicator styles:', styles);
  
  return (
    <div className={styles.loadingContainer} data-testid="loading-indicator">
      <motion.div 
        className={styles.spinner}
        animate={{ 
          rotate: 360,
          borderTopColor: ['#FF4500', '#0079D3', '#FF4500']
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
    </div>
  );
};

export default LoadingIndicator;
