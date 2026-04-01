import axios from 'axios';
import conf from '../conf/conf.js';

// Axios instance configured for the existing backend
const httpClient = axios.create({
  baseURL: conf.backendUrl,
  withCredentials: true,
});

// Attach JWT token from localStorage if present
httpClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Basic global 401 handling
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    }
    return Promise.reject(error);
  },
);

export default httpClient;

