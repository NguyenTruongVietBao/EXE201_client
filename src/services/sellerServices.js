import axiosInstance from '../configs/axios';

const sellerServices = {
  getSellerWallet: async () => {
    const response = await axiosInstance.get(
      '/api/payments/seller/seller-wallet'
    );
    return response;
  },
  getSellerStatistic: async () => {
    const response = await axiosInstance.get('/api/users/seller-statistics');
    return response;
  },
  getRefundRequestsForMyDocuments: async () => {
    const response = await axiosInstance.get('/api/refunds/seller/requests');
    return response;
  },
  getRefundRequestDetail: async (id) => {
    const response = await axiosInstance.get(
      `/api/refunds/seller/requests/${id}`
    );
    return response;
  },
  getRefundRequestStats: async () => {
    const response = await axiosInstance.get('/api/refunds/seller/stats');
    return response;
  },
  getMyWithdrawalRequests: async () => {
    const response = await axiosInstance.get(
      '/api/payments/seller/withdrawal-requests'
    );
    return response;
  },
  createWithdrawalRequest: async (data) => {
    const response = await axiosInstance.post(
      '/api/payments/seller/withdrawal-request',
      data
    );
    return response;
  },
};

export default sellerServices;
