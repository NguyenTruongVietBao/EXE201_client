import axiosInstance from '../configs/axios';

const sellerServices = {
  getSellerWallet: async () => {
    const response = await axiosInstance.get('/payments/seller/seller-wallet');
    return response;
  },
  getSellerStatistic: async () => {
    const response = await axiosInstance.get('/users/seller-statistics');
    return response;
  },
  getRefundRequestsForMyDocuments: async () => {
    const response = await axiosInstance.get('/refunds/seller/requests');
    return response;
  },
  getRefundRequestDetail: async (id) => {
    const response = await axiosInstance.get(`/refunds/seller/requests/${id}`);
    return response;
  },
  getRefundRequestStats: async () => {
    const response = await axiosInstance.get('/refunds/seller/stats');
    return response;
  },
};

export default sellerServices;
