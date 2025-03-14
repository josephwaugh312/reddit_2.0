import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage/HomePage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import SubredditPage from './pages/SubredditPage/SubredditPage';

// Create a properly configured router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchResultsPage />,
      },
      {
        path: 'r/:subreddit',
        element: <SubredditPage />,
      },
    ],
  },
]);

export default router;
