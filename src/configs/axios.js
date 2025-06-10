import axios from 'axios';
import envConfig from './envConfig';

const BACKEND_URL = envConfig.BACKEND_URL;
const ACCESS_TOKEN_KEY = envConfig.ACCESS_TOKEN_KEY;
console.log('🚀 ~ ACCESS_TOKEN_KEY:', ACCESS_TOKEN_KEY);

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    console.log('🚀 ~ accessToken:', accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
