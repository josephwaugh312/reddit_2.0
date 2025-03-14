import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';

// Mock the components used in App
jest.mock('./components/Header/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('./pages/HomePage/HomePage', () => () => <div data-testid="mock-homepage">HomePage</div>);
jest.mock('./pages/SearchResultsPage/SearchResultsPage', () => () => <div data-testid="mock-search">SearchResultsPage</div>);
jest.mock('./components/PostDetail/PostDetail', () => () => <div data-testid="mock-post-detail">PostDetail</div>);
jest.mock('./pages/SubredditPage/SubredditPage', () => () => <div data-testid="mock-subreddit">SubredditPage</div>);

// Create a simple mock store
const createMockStore = () => {
  return {
    getState: () => ({
      posts: {
        posts: [],
        status: 'idle',
        error: null,
      },
      comments: {
        comments: [],
        status: 'idle',
        error: null,
      }
    }),
    subscribe: jest.fn(),
    dispatch: jest.fn()
  };
};

// Mock react-router-dom completely
jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
  useLocation: () => ({ pathname: '/' }),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ children }) => <div>{children}</div>,
  NavLink: ({ children }) => <div>{children}</div>,
  Outlet: () => <div data-testid="outlet" />,
  useNavigate: () => jest.fn(),
  useParams: () => ({}),
}));

describe('App Component', () => {
  test('renders header without crashing', () => {
    const mockStore = createMockStore();
    
    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );
    
    // Just check that the header renders
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });
});
