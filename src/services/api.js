import axios from 'axios';

const api = axios.create({
  //the base URL is /api/v1 [cite: 114]
  baseURL: 'http://localhost:5000/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// This interceptor automatically adds the JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; [cite, 74]
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;