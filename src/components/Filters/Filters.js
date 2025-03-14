import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Filters.module.css';

const Filters = ({ activeSortOption, onSortChange }) => {
  console.log('Filters rendered with activeSortOption:', activeSortOption);
  
  const [showSortOptions, setShowSortOptions] = useState(false);
  
  const sortOptions = [
    { id: 'hot', label: 'Hot', icon: '🔥' },
    { id: 'new', label: 'New', icon: '✨' },
    { id: 'top', label: 'Top', icon: '🏆' },
    { id: 'rising', label: 'Rising', icon: '📈' }
  ];
  
  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };
  
  const handleSortClick = (sortOption) => {
    console.log('Sort option clicked:', sortOption);
    onSortChange(sortOption);
    setShowSortOptions(false);
  };
  
  // Find the active sort option object
  const activeOption = sortOptions.find(option => option.id === activeSortOption) || sortOptions[0];
  
  return (
    <motion.div 
      className={styles.filtersContainer} 
      data-testid="filters"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.sortContainer}>
        <motion.button 
          className={styles.sortButton} 
          onClick={toggleSortOptions}
          aria-label="Sort options"
          aria-expanded={showSortOptions}
          data-testid="sort-button"
          whileHover={{ backgroundColor: '#f0f0f0' }}
          whileTap={{ scale: 0.98 }}
        >
          <span className={styles.icon}>{activeOption.icon}</span>
          <span>{activeOption.label}</span>
          <motion.span 
            className={styles.arrow}
            animate={{ rotate: showSortOptions ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </motion.button>
        
        <AnimatePresence>
          {showSortOptions && (
            <motion.div 
              className={styles.sortOptions} 
              data-testid="sort-options"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {sortOptions.map(option => (
                <motion.button
                  key={option.id}
                  className={`${styles.sortOption} ${option.id === activeSortOption ? styles.active : ''}`}
                  onClick={() => handleSortClick(option.id)}
                  data-testid={`sort-option-${option.id}`}
                  whileHover={{ backgroundColor: '#f0f0f0' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={styles.icon}>{option.icon}</span>
                  <span>{option.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Filters;
