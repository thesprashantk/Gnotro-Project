import axios from 'axios';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000', 
  withCredentials: true 
});

// Posts/Discussions API
export const postsAPI = {
  getAll: () => API.get('/api/posts'),
  getById: (id) => API.get(`/api/posts/${id}`),
  getByUser: (userId) => API.get(`/api/posts/user/${userId}`),
  create: (postData) => API.post('/api/posts', postData),
  like: (id) => API.put(`/api/posts/${id}/like`),
  repost: (id) => API.put(`/api/posts/${id}/repost`),
  save: (id) => API.put(`/api/posts/${id}/save`),
  comment: (id, content) => API.post(`/api/posts/${id}/comment`, { content }),
  delete: (id) => API.delete(`/api/posts/${id}`)
};

// Articles API
export const articlesAPI = {
  getAll: () => API.get('/api/articles'),
  getById: (id) => API.get(`/api/articles/${id}`),
  create: (articleData) => API.post('/api/articles', articleData),
  like: (id) => API.put(`/api/articles/${id}/like`),
  comment: (id, content) => API.post(`/api/articles/${id}/comment`, { content }),
  search: (query) => API.get(`/api/articles/search/${query}`)
};

// Auth API
export const authAPI = {
  login: (credentials) => API.post('/api/auth/login', credentials),
  signup: (userData) => API.post('/api/auth/signup', userData),
  logout: () => API.post('/api/auth/logout')
};

export default API;
