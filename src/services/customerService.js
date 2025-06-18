import axiosInstance from '../configs/axios';

const customerService = {
  getMyDocuments: async () => {
    try {
      const response = await axiosInstance.get(`/documents/my-documents`);
      return response;
    } catch (error) {
      console.error('Error fetching my documents:', error);
      throw error;
    }
  },
  handleEnrollFreeDocument: async (id) => {
    try {
      const response = await axiosInstance.post(
        `/documents/${id}/enroll-free-document`
      );
      return response;
    } catch (error) {
      console.error('Error enrolling free document:', error);
      throw error;
    }
  },
  getMyEnrolledDocuments: async () => {
    try {
      const response = await axiosInstance.get(`/documents/enrolled`);
      return response;
    } catch (error) {
      console.error('Error fetching my enrolled documents:', error);
      throw error;
    }
  },
  getMyNotEnrolledDocuments: async () => {
    try {
      const response = await axiosInstance.get(`/documents/not-enrolled`);
      return response;
    } catch (error) {
      console.error('Error fetching my enrolled documents:', error);
      throw error;
    }
  },
  getMyPurchasedDocuments: async () => {
    try {
      const response = await axiosInstance.get(
        `/payments/my-purchased-documents`
      );
      return response;
    } catch (error) {
      console.error('Error fetching my purchased documents:', error);
      throw error;
    }
  },
  handleCallbackPurchase: async (id) => {
    try {
      const response = await axiosInstance.post(
        `/payments/callback-purchase/${id}`
      );
      return response;
    } catch (error) {
      console.error('Error handling callback purchase:', error);
      throw error;
    }
  },
  handleDownloadDocument: async (id) => {
    try {
      const response = await axiosInstance.get(`/documents/${id}/download`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      console.error('Error downloading free document:', error);
      throw error;
    }
  },
};

export default customerService;
