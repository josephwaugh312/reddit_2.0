import React from 'react';
import { motion } from 'framer-motion';
import styles from './ErrorDisplay.module.css';

const ErrorDisplay = ({ message, retry }) => {
  console.log('Retry function:', retry);

  // Extract the specific error type to provide more helpful messages
  const getErrorMessage = (errorMsg) => {
    if (errorMsg.includes('404')) {
      return 'The requested content could not be found. Please try a different search.';
    } else if (errorMsg.includes('Failed to fetch') || errorMsg.includes('ERR_INTERNET_DISCONNECTED')) {
      return 'Network error. Please check your internet connection and try again.';
    } else if (errorMsg.includes('500')) {
      return 'Reddit servers are experiencing issues. Please try again later.';
    } else if (errorMsg.includes('429')) {
      return 'Too many requests. Please wait a moment and try again.';
    } else {
      return errorMsg || 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <motion.div 
      className={styles.errorContainer} 
      data-testid="error-display"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className={styles.errorIcon}
        animate={{ 
          rotate: [0, 10, -10, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      </motion.div>
      <h3 className={styles.errorTitle}>Oops! Something went wrong</h3>
      <p className={styles.errorMessage}>{getErrorMessage(message)}</p>
      {retry && (
        <motion.button 
          className={styles.retryButton} 
          onClick={retry}
          data-testid="retry-button"
          whileHover={{ scale: 1.05, backgroundColor: '#e03d00' }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default ErrorDisplay;
