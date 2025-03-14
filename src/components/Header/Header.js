import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Header.module.css';

const Header = () => {
  console.log('Header styles:', styles); // Debug log
  
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <h1>Reddit<span className={styles.highlight}>2.0</span></h1>
        </Link>
      </div>
      <SearchBar />
      <nav className={styles.nav}>
        <ul>
          <li><Link to="/" onClick={() => console.log('Home clicked')}>Home</Link></li>
          <li><Link to="/r/popular" onClick={() => console.log('Popular clicked')}>Popular</Link></li>
          <li><Link to="/r/all" onClick={() => console.log('All clicked')}>All</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
