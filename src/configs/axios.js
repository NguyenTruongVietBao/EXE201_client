import axios from 'axios';

let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
let TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL || 'http://localhost:5299',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log('🚀 ~ response from axios instance:', response);
    return response.data;
  },
  (error) => {
    // console.log('🚀 ~ error from axios instance:', error);
    if (error.response) {
      const { status, statusCode, message, data } = error.response.data;
      return Promise.reject({ status, message, statusCode, data });
    } else if (error.request) {
      return Promise.reject({ message: 'No response from server' });
    } else {
      return Promise.reject({ message: error.message });
    }
  }
);

export default axiosInstance;
