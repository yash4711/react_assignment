export const API_CONFIG = {
  baseURL: 'https://api.example.com', // Replace with actual API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const API_ENDPOINTS = {
  profile: {
    getProfile: (userId: string) => `/users/${userId}/profile`,
    updateProfile: (userId: string) => `/users/${userId}/profile`,
  },
  posts: {
    getPosts: (userId: string, type?: string) => `/users/${userId}/posts${type ? `?type=${type}` : ''}`,
    getPost: (postId: string) => `/posts/${postId}`,
  },
} as const;
