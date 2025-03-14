import React from 'react';
import { render, screen } from '@testing-library/react';
import PostCard from './PostCard';

// Mock data for testing
const mockPost = {
  id: 'test123',
  title: 'Test Post Title',
  author: 'testuser',
  subreddit: 'testsubreddit',
  score: 42,
  num_comments: 10,
  created_utc: Date.now() / 1000 - 3600, // 1 hour ago
  thumbnail: 'https://placehold.co/150x150',
};

describe('PostCard Component', () => {
  test('renders post information correctly', () => {
    render(<PostCard post={mockPost} index={0} />);
    
    // Check if title is rendered
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    
    // Check if author is rendered
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    
    // Check if subreddit is rendered
    expect(screen.getByText(/testsubreddit/i)).toBeInTheDocument();
    
    // Check if score is rendered
    expect(screen.getByText('42')).toBeInTheDocument();
    
    // Check if comments count is rendered
    expect(screen.getByText(/10 comments/i)).toBeInTheDocument();
    
    // Check if time ago is rendered (approximate check)
    expect(screen.getByText(/hour ago/i)).toBeInTheDocument();
  });
  
  test('renders with missing data gracefully', () => {
    // Test with minimal data
    const minimalPost = { id: 'min123' };
    render(<PostCard post={minimalPost} index={0} />);
    
    // Should use default values
    expect(screen.getByText('Untitled Post')).toBeInTheDocument();
    expect(screen.getByText(/\[deleted\]/i)).toBeInTheDocument();
  });
  
  test('renders thumbnail when available', () => {
    render(<PostCard post={mockPost} index={0} />);
    
    // Use querySelector instead of getByRole
    const thumbnail = document.querySelector('.thumbnail');
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute('src', 'https://placehold.co/150x150');
  });
}); 