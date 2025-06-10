import axiosInstance from '../configs/axios';

const interestServices = {
  // Create user's interests
  setUserInterests: async (data) => {
    try {
      const response = await axiosInstance.put(
        `/users/${data.userId}/set-interests`,
        { interests: data.interests }
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
      const response = await axiosInstance.get('/interests');
      return response;
    } catch (error) {
      return error;
    }
  },
  // Get recommend documents and study groups and study partners
  getRecommendData: async () => {
    try {
      const response = await axiosInstance.get('/interests/recommended');
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default interestServices;
