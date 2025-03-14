import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header/Header';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import ReduxDebugger from './components/Debug/ReduxDebugger';
import styles from './App.module.css';

// Replace direct imports with lazy imports
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage/SearchResultsPage'));
const SubredditPage = lazy(() => import('./pages/SubredditPage/SubredditPage'));
const PostDetail = lazy(() => import('./components/PostDetail/PostDetail'));

function App() {
  const location = useLocation();
  
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.mainContent}>
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingIndicator />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/r/:subreddit" element={<SubredditPage />} />
              <Route path="/posts/:postId" element={<PostDetail />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      {process.env.NODE_ENV === 'development' && <ReduxDebugger />}
    </div>
  );
}

export default App;
