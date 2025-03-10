import React from 'react';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorDisplay message="Something went wrong" retry={() => this.setState({ hasError: false })} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 