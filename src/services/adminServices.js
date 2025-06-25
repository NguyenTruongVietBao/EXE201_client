import axiosInstance from '../configs/axios';

const adminServices = {
  getUserStatistics: async () => {
    const response = await axiosInstance.get(
      '/api/users/admin-user-statistics'
    );
    return response;
  },
  getAllUsers: async () => {
    const response = await axiosInstance.get('/api/users');
    return response;
  },
  banUser: async (id) => {
    const response = await axiosInstance.put(`/api/users/${id}/ban`);
    return response;
  },
  unbanUser: async (id) => {
    const response = await axiosInstance.put(`/api/users/${id}/unban`);
    return response;
  },
};

export default adminServices;
