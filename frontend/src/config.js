// API Configuration
// This file manages the API base URL for different environments

const getApiUrl = () => {
  // Check if we're in production (GitHub Pages)
  if (window.location.hostname === 'chinnu891.github.io' || 
      window.location.hostname.includes('github.io')) {
    // For GitHub Pages, you'll need to update this to your actual backend URL
    // You can host your PHP backend on a service like:
    // - Heroku (with PHP buildpack)
    // - 000webhost
    // - InfinityFree
    // - Your own server
    // IMPORTANT: Update this URL to your actual PHP backend URL
    return 'https://your-backend-url.com/student-project';
  }
  
  // Development - localhost
  return 'http://localhost/student-project';
};

export const API_BASE_URL = getApiUrl();

