// Base API configuration
const BASE_URL = 'https://www.reddit.com';

// Helper function for API requests
const fetchFromReddit = async (endpoint, params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${endpoint}.json?${queryParams}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Reddit API error: ${response.statusText}`);
  }
  return response.json();
};

// API methods
export const redditAPI = {
  getPopularPosts: (limit = 25) => 
    fetchFromReddit('/r/popular', { limit }),
  
  getSubredditPosts: (subreddit, sortBy = 'hot', limit = 25) => 
    fetchFromReddit(`/r/${subreddit}/${sortBy}`, { limit }),
  
  searchPosts: (query, limit = 25) => 
    fetchFromReddit('/search', { q: query, limit }),
  
  getPostComments: (postId, subreddit) => 
    fetchFromReddit(`/r/${subreddit}/comments/${postId}`),
}; 