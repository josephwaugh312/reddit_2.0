import React from 'react';
import { useSelector } from 'react-redux';

const ReduxDebugger = () => {
  const postsState = useSelector(state => state.posts);
  
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      left: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      maxWidth: '300px',
      maxHeight: '200px',
      overflow: 'auto',
      zIndex: 9999,
      fontSize: '12px'
    }}>
      <h4 style={{ margin: '0 0 5px 0' }}>Redux State:</h4>
      <div>
        <strong>Status:</strong> {postsState.status}
      </div>
      <div>
        <strong>Error:</strong> {postsState.error || 'None'}
      </div>
      <div>
        <strong>Posts:</strong> {postsState.posts ? postsState.posts.length : 0}
      </div>
    </div>
  );
};

export default ReduxDebugger; 