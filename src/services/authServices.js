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
};

export default authServices;
