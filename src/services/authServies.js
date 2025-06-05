import axiosInstance from '../configs/axios';

const authServices = {
  // Login
  login: async (data) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      return response;
    } catch (error) {
      return error;
    }
  },
  // Register
  register: async (data) => {
    try {
      const response = await axiosInstance.post('/auth/register', data);
      return response;
    } catch (error) {
      return error;
    }
  },
  // Verify email
  verifyEmail: async (data) => {
    try {
      const response = await axiosInstance.post(
        `/auth/emailverification?email=${data.email}&code=${data.otp}`,
        data
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  // Resend email verification OTP
  resendOtp: async (data) => {
    try {
      const response = await axiosInstance.post(
        `/auth/resendemailverification?email=${data.email}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  // Create user's interests
  updateInterest: async (data) => {
    console.log('🚀 ~ updateInterest: ~ data:', data);
    try {
      const response = await axiosInstance.post(
        `/user/interests?email=${data.email}`,
        data.interests
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  // Get user's interests
  getUserInterests: async (email) => {
    try {
      const response = await axiosInstance.get(
        `/user/interests?email=${email}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  // Get all interests
  getAllInterests: async () => {
    try {
      const response = await axiosInstance.get('/interest/interests');
      console.log('🚀 ~ getAllInterests: ~ response:', response);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default authServices;
