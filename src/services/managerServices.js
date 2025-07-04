import axiosInstance from '../configs/axios';

const managerServices = {
  managerStatistics: async () => {
    try {
      const response = await axiosInstance.get('/api/users/manager-statistics');
      return response;
    } catch (error) {
      console.error('Error fetching manager statistics:', error);
      throw error;
    }
  },
  getAllDocuments: async () => {
    try {
      const response = await axiosInstance.get(`/api/documents`);
      return response;
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  },
  getDocumentDetail: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/documents/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching document detail:', error);
      throw error;
    }
  },
  publishDocument: async (id) => {
    try {
      const response = await axiosInstance.put(`/api/documents/${id}/approve`);
      return response;
    } catch (error) {
      console.error('Error publishing document:', error);
      throw error;
    }
  },
  unpublishDocument: async (id) => {
    try {
      const response = await axiosInstance.put(`/api/documents/${id}/reject`);
      return response;
    } catch (error) {
      console.error('Error unpublishing document:', error);
      throw error;
    }
  },
  paymentStats: async () => {
    try {
      const response = await axiosInstance.get(`/api/payments/manager/stats`);
      return response;
    } catch (error) {
      console.error('Error fetching payment stats:', error);
      throw error;
    }
  },
  platformWallet: async () => {
    try {
      const response = await axiosInstance.get(
        `/api/payments/manager/platform-wallet`
      );
      return response;
    } catch (error) {
      console.error('Error fetching platform wallet:', error);
      throw error;
    }
  },
  // Refunds Requests ------------------------------------------------------------
  getAllRefundsRequests: async () => {
    try {
      const response = await axiosInstance.get(`/api/refunds`);
      return response;
    } catch (error) {
      console.error('Error fetching all refunds requests:', error);
      throw error;
    }
  },
  getRefundRequestStats: async () => {
    try {
      const response = await axiosInstance.get(`/api/refunds/stats/overview`);
      return response;
    } catch (error) {
      console.error('Error fetching refund request stats:', error);
      throw error;
    }
  },
  getRefundRequestDetail: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/refunds/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching refund request detail:', error);
      throw error;
    }
  },
  approveRefundRequest: async (id, adminResponse) => {
    try {
      const response = await axiosInstance.put(`/api/refunds/${id}/process`, {
        status: 'APPROVED',
        adminResponse,
      });
      return response;
    } catch (error) {
      console.error('Error handling refund request:', error);
      throw error;
    }
  },
  rejectRefundRequest: async (id, adminResponse) => {
    try {
      const response = await axiosInstance.put(`/api/refunds/${id}/process`, {
        status: 'REJECTED',
        adminResponse,
      });
      return response;
    } catch (error) {
      console.error('Error handling refund request:', error);
      throw error;
    }
  },
  // Withdrawals Requests ------------------------------------------------------------
  getAllWithdrawalsRequests: async () => {
    try {
      const response = await axiosInstance.get(
        `/api/payments/manager/withdrawal-requests`
      );
      return response;
    } catch (error) {
      console.error('Error fetching all withdrawals requests:', error);
      throw error;
    }
  },
  handleWithdrawRequest: async (id, data) => {
    try {
      const response = await axiosInstance.put(
        `/api/payments/manager/withdrawal-request/${id}`,
        data
      );
      return response;
    } catch (error) {
      console.error('Error handling withdraw request:', error);
      throw error;
    }
  },
};

export default managerServices;
