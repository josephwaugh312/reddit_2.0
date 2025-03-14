# Reddit 2.0

![Reddit 2.0 Logo](public/logo.png)

A modern, responsive Reddit client built with React and Redux that offers a clean interface for browsing Reddit content.

## 📋 Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Design Decisions](#design-decisions)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Demo

[Live Demo](https://your-deployed-app-url.com)

## ✨ Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Browse Reddit Content**: View posts from different subreddits and sorting options
- **Search Functionality**: Search for posts across Reddit
- **Post Details**: View full post content and comments
- **Sort Options**: Sort posts by Hot, New, Top, and Rising
- **Error Handling**: Graceful error handling with retry options
- **Loading States**: Skeleton loading states for a better user experience
- **Animations**: Smooth transitions and animations throughout the app

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home-page.png)

### Post Detail
![Post Detail](screenshots/post-detail.png)

### Search Results
![Search Results](screenshots/search-results.png)

### Mobile View
![Mobile View](screenshots/mobile-view.png)

## 🛠️ Technologies Used

- **React**: Frontend library for building the user interface
- **Redux Toolkit**: State management
- **React Router**: Navigation and routing
- **Framer Motion**: Animations and transitions
- **CSS Modules**: Scoped styling for components
- **Reddit API**: Data source for posts and comments
- **React Loading Skeleton**: Loading state placeholders
- **Date-fns**: Date formatting utilities
- **Jest & React Testing Library**: Unit testing
- **Cypress**: End-to-end testing

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/reddit-2.0.git
   cd reddit-2.0
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure
src/
├── app/
│ └── store.js # Redux store configuration
├── components/
│ ├── Animations/
│ │ └── PageTransition.js # Page transition animations
│ ├── Comment/
│ │ ├── Comment.js # Comment component
│ │ └── Comment.module.css # Comment styles
│ ├── Debug/
│ │ └── ReduxDebugger.js # Redux debugging helper
│ ├── ErrorBoundary/
│ │ ├── ErrorBoundary.js # Error boundary component
│ │ └── ErrorBoundary.test.js # Error boundary tests
│ ├── ErrorDisplay/
│ │ ├── ErrorDisplay.js # Error display component
│ │ └── ErrorDisplay.module.css # Error display styles
│ ├── Filters/
│ │ ├── Filters.js # Filtering component
│ │ └── Filters.module.css # Filters styles
│ ├── Header/
│ │ ├── Header.js # App header component
│ │ └── Header.module.css # Header styles
│ ├── LoadingIndicator/
│ │ ├── CommentSkeleton.js # Comment loading skeleton
│ │ ├── CommentSkeleton.module.css # Comment skeleton styles
│ │ ├── LoadingIndicator.js # Loading spinner
│ │ ├── LoadingIndicator.module.css # Loading spinner styles
│ │ ├── PostDetailSkeleton.js # Post detail loading skeleton
│ │ ├── PostDetailSkeleton.module.css # Post detail skeleton styles
│ │ ├── PostSkeleton.js # Post loading skeleton
│ │ └── PostSkeleton.module.css # Post skeleton styles
│ ├── PostCard/
│ │ ├── PostCard.js # Post card component
│ │ └── PostCard.module.css # Post card styles
│ ├── PostDetail/
│ │ ├── PostDetail.js # Post detail component
│ │ └── PostDetail.module.css # Post detail styles
│ ├── PostList/
│ │ ├── PostList.js # Post list component
│ │ └── PostList.module.css # Post list styles
│ └── SearchBar/
│ ├── SearchBar.js # Search bar component
│ └── SearchBar.module.css # Search bar styles
├── features/
│ ├── comments/
│ │ └── commentsSlice.js # Comments Redux slice
│ ├── filters/
│ │ └── filtersSlice.js # Filters Redux slice
│ └── posts/
│ └── postsSlice.js # Posts Redux slice
├── hooks/
│ ├── useCommentData.js # Custom hook for comment data
│ └── usePostData.js # Custom hook for post data
├── pages/
│ ├── HomePage/
│ │ ├── HomePage.js # Home page component
│ │ └── HomePage.module.css # Home page styles
│ ├── SearchResultsPage/
│ │ ├── SearchResultsPage.js # Search results page
│ │ └── SearchResultsPage.module.css # Search results styles
│ └── SubredditPage/
│ ├── SubredditPage.js # Subreddit page component
│ └── SubredditPage.module.css # Subreddit page styles
├── services/
│ └── redditAPI.js # Reddit API service
├── utils/
│ ├── formatters.js # Formatting utilities
│ ├── testUtils.js # Testing utilities
│ └── validators.js # Validation utilities
├── App.css # App global styles
├── App.js # Main app component
├── App.module.css # App component styles
├── index.css # Root styles
├── index.js # Entry point
├── reportWebVitals.js # Performance measurement
├── routes.js # Router configuration
└── setupTests.js # Test configuration


## 🧪 Testing

This project includes both unit tests (Jest/React Testing Library) and end-to-end tests (Cypress).

### Unit Tests

Unit tests focus on testing individual components and functions in isolation.

#### Running Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage
```

#### Unit Test Structure

- Tests are co-located with their components (e.g., `Component.test.js`)
- Tests verify component rendering, user interactions, and state changes
- Mock data and services are used to isolate components

#### Key Unit Tests

- Component rendering tests
- Redux slice tests
- Custom hook tests
- Utility function tests

### End-to-End Tests

End-to-end tests verify that the application works correctly from a user's perspective, testing complete user flows.

#### Running E2E Tests

```bash
# Start the application (in one terminal)
npm start

# Open Cypress Test Runner (in another terminal)
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run
```

#### E2E Test Structure

Tests are located in the `cypress/e2e` directory:

- `homepage.cy.js` - Tests for the homepage functionality
- `search.cy.js` - Tests for the search functionality
- `post-detail.cy.js` - Tests for post detail pages
- `subreddit.cy.js` - Tests for subreddit navigation
- `animations.cy.js` - Tests for UI animations
- `error-handling.cy.js` - Tests for error states

#### Key E2E Test Scenarios

1. **Homepage Tests**
   - Loading posts on the homepage
   - Sorting posts
   - Navigating to post details

2. **Search Tests**
   - Searching for posts
   - Handling searches with no results

3. **Post Detail Tests**
   - Displaying post details
   - Loading post content
   - Navigating back to homepage

4. **Subreddit Tests**
   - Navigating to subreddits from posts

5. **Error Handling Tests**
   - Gracefully handling 404 errors

## ♿ Accessibility

This application is built with accessibility in mind:

- Semantic HTML elements
- ARIA attributes where appropriate
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly content

## ⚡ Performance

The application is optimized for performance:

- Lazy loading of images and components
- Code splitting for reduced bundle size
- Memoization to prevent unnecessary re-renders
- Efficient Redux state management
- Lighthouse score of 90+

## 🎨 Design Decisions

### Responsive Design
The application is designed with a mobile-first approach, ensuring it works well on all screen sizes. CSS media queries are used to adapt the layout for different devices.

### State Management
Redux is used for global state management, with separate slices for posts and comments. This allows for efficient data fetching and caching.

### Error Handling
A centralized error handling system is implemented to provide consistent error messages and recovery options throughout the app.

### Loading States
Skeleton loading states are used instead of spinners to provide a better user experience by showing the structure of the content before it loads.

### Animations
Subtle animations are added to enhance the user experience without being distracting. These include page transitions, hover effects, and loading animations.

## 🔮 Future Improvements

- User authentication to allow logging in with Reddit accounts
- Ability to upvote, downvote, and comment
- Dark mode support
- Infinite scrolling for posts
- Caching mechanism to reduce API calls
- Progressive Web App (PWA) capabilities
- More advanced filtering options
- Customizable themes

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.