import axiosInstance from '../configs/axios';

const documentServices = {
  // Create document
  createDocument: async (data) => {
    try {
      const config = {};

      // Nếu data là FormData, set header phù hợp
      if (data instanceof FormData) {
        config.headers = {
          'Content-Type': 'multipart/form-data',
        };
      }

      const response = await axiosInstance.post(`/documents`, data, config);
      return response;
    } catch (error) {
      console.error('Create document error:', error);
      return (
        error.response?.data || {
          status: false,
          message: 'Lỗi kết nối server',
        }
      );
    }
  },
  // Get my documents
  getMyDocuments: async () => {
    try {
      const response = await axiosInstance.get(`/documents/my-documents`);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default documentServices;
