import axiosInstance from '../configs/axios';

const managerServices = {
  managerStatistics: async () => {
    try {
      const response = await axiosInstance.get('/users/manager-statistics');
      return response;
    } catch (error) {
      console.error('Error fetching manager statistics:', error);
      throw error;
    }
  },
  getAllDocuments: async () => {
    try {
      const response = await axiosInstance.get(`/documents`);
      return response;
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  },
  getDocumentDetail: async (id) => {
    try {
      const response = await axiosInstance.get(`/documents/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching document detail:', error);
      throw error;
    }
  },
  publishDocument: async (id) => {
    try {
      const response = await axiosInstance.put(`/documents/${id}/approve`);
      return response;
    } catch (error) {
      console.error('Error publishing document:', error);
      throw error;
    }
  },
  unpublishDocument: async (id) => {
    try {
      const response = await axiosInstance.put(`/documents/${id}/reject`);
      return response;
    } catch (error) {
      console.error('Error unpublishing document:', error);
      throw error;
    }
  },
  paymentStats: async () => {
    try {
      const response = await axiosInstance.get(`/payments/manager/stats`);
      return response;
    } catch (error) {
      console.error('Error fetching payment stats:', error);
      throw error;
    }
  },
  platformWallet: async () => {
    try {
      const response = await axiosInstance.get(
        `/payments/manager/platform-wallet`
      );
      return response;
    } catch (error) {
      console.error('Error fetching platform wallet:', error);
      throw error;
    }
  },
  getAllWithdrawsRequest: async () => {
    try {
      const response = await axiosInstance.get(
        `/payments/manager/withdrawal-requests`
      );
      return response;
    } catch (error) {
      console.error('Error fetching all withdraws:', error);
      throw error;
    }
  },
  handleWithdrawRequest: async (id) => {
    try {
      const response = await axiosInstance.put(
        `/payments/manager/withdrawal-request/${id}`
      );
      return response;
    } catch (error) {
      console.error('Error handling withdraw request:', error);
      throw error;
    }
  },
};

export default managerServices;
