import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Comment from './Comment';

// Mock data for testing
const mockComment = {
  data: {
    id: 'comment1',
    author: 'testuser',
    body: 'This is a test comment',
    created_utc: Date.now() / 1000,
    score: 42,
    replies: {
      data: {
        children: [
          {
            kind: 't1',
            data: {
              id: 'reply1',
              author: 'replyuser',
              body: 'This is a reply',
              created_utc: Date.now() / 1000,
              score: 21,
              replies: {
                data: {
                  children: [],
                },
              },
            },
          },
        ],
      },
    },
  },
};

describe('Comment Component', () => {
  test('renders comment correctly', () => {
    render(<Comment comment={mockComment} />);
    
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    expect(screen.getByText(/42 points/i)).toBeInTheDocument();
  });
  
  test('renders nested replies', () => {
    render(<Comment comment={mockComment} />);
    
    expect(screen.getByText('This is a reply')).toBeInTheDocument();
    expect(screen.getByText(/replyuser/i)).toBeInTheDocument();
  });
  
  test('collapses and expands comment', () => {
    render(<Comment comment={mockComment} />);
    
    // Initially expanded
    const commentText = screen.getByText('This is a test comment');
    expect(commentText).toBeInTheDocument();
    
    // Get all collapse buttons and click the first one (parent comment)
    const collapseButtons = screen.getAllByRole('button', { name: /collapse comment/i });
    fireEvent.click(collapseButtons[0]);
    
    // The element might still be in the DOM but not visible
    // Use .not.toBeVisible() instead of .not.toBeInTheDocument()
    // If your component completely removes the element, you can use .not.toBeInTheDocument()
    
    // Try to find the element again after collapsing
    const commentTextAfterCollapse = screen.queryByText('This is a test comment');
    
    // If the element is still in the DOM but hidden with CSS
    if (commentTextAfterCollapse) {
      expect(commentTextAfterCollapse).not.toBeVisible();
    } else {
      // If the element is completely removed from the DOM
      expect(commentTextAfterCollapse).toBeNull();
    }
    
    // Get all expand buttons and click the first one
    const expandButtons = screen.getAllByRole('button', { name: /expand comment/i });
    fireEvent.click(expandButtons[0]);
    
    // Should be expanded again
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
  });
  
  test('handles null or invalid comment', () => {
    const { container } = render(<Comment comment={null} />);
    expect(container).toBeEmptyDOMElement();
    
    const { container: container2 } = render(<Comment comment={{ kind: 'more' }} />);
    expect(container2).toBeEmptyDOMElement();
  });
});
