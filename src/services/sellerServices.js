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
};

export default sellerServices;
