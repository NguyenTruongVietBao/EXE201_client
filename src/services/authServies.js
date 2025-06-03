import axiosInstance from '../configs/axios';

const authServices = {
  // Login
  login: async (data) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', data);
      return response;
    } catch (error) {
      return error;
    }
  },
  // Register
  register: async (data) => {
    try {
      const response = await axiosInstance.post('/api/auth/register', data);
      return response;
    } catch (error) {
      return error;
    }
  },
  // Verify email
  verifyEmail: async (data) => {
    try {
      const response = await axiosInstance.post(
        `/api/auth/emailverification?email=${data.email}&code=${data.otp}`,
        data
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  // Update interest
  updateInterest: async (data) => {
    try {
      const response = await axiosInstance.post(
        '/api/auth/update-interest',
        data
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default authServices;
