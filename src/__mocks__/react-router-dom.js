// Mock for react-router-dom
module.exports = {
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ children, path, element }) => children,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  NavLink: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
  useParams: () => ({ postId: 'test123' }),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  Outlet: () => <div data-testid="outlet" />,
}; 