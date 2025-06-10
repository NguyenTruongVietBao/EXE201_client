import axiosInstance from '../configs/axios';

const interestServices = {
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
  getUserInterests: async () => {
    try {
      const response = await axiosInstance.get(`/interests/my-interests`);
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

export default interestServices;
