import axiosInstance from '../configs/axios';

const interestServices = {
  // Create user's interests
  setUserInterests: async (data) => {
    try {
      const response = await axiosInstance.put(
        `/api/users/${data.userId}/set-interests`,
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
      const response = await axiosInstance.get(`/api/ interests/my-interests`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // Get all interests
  getAllInterests: async () => {
    try {
      const response = await axiosInstance.get('/api/interests');
      return response;
    } catch (error) {
      return error;
    }
  },
  // Get recommend documents and study groups and study partners
  getRecommendData: async () => {
    try {
      const response = await axiosInstance.get('/api/interests/recommended');
      return response;
    } catch (error) {
      return error;
    }
  },
  getPrioriryDocuments: async () => {
    try {
      const response = await axiosInstance.get(
        '/api/interests/priority-documents'
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  getPrioriryUsers: async () => {
    try {
      const response = await axiosInstance.get('/api/interests/priority-users');
      return response;
    } catch (error) {
      return error;
    }
  },
  getPrioriryGroups: async () => {
    try {
      const response = await axiosInstance.get(
        '/api/interests/priority-groups'
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default interestServices;
