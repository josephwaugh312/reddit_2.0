import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search form submitted with:', searchInput);
    
    if (searchInput.trim()) {
      const searchUrl = `/search?q=${encodeURIComponent(searchInput)}`;
      console.log('Navigating to:', searchUrl);
      navigate(searchUrl);
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search Reddit"
        value={searchInput}
        onChange={(e) => {
          console.log('Search input changed:', e.target.value);
          setSearchInput(e.target.value);
        }}
        className={styles.searchInput}
        aria-label="Search Reddit"
      />
      <button type="submit" className={styles.searchButton} aria-label="Submit search">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
