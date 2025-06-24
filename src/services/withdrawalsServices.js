import axiosInstance from '../configs/axios';

const withdrawalsServices = {
  // Seller ------------------------------------------------------------
  getSellerWithdrawals: async () => {
    const response = await axiosInstance.get(
      '/api/payments/seller/withdrawal-requests'
    );
    return response;
  },
  createSellerWithdrawal: async (data) => {
    const response = await axiosInstance.post(
      '/api/payments/seller/withdrawal-requests',
      data
    );
    return response;
  },

  // Manager ------------------------------------------------------------
  getAllWithdrawals: async () => {
    const response = await axiosInstance.get(
      '/api/payments/manager/withdrawal-requests'
    );
    return response;
  },
  handleSellerWithdrawal: async (id, data) => {
    // data: { status: 'APPROVED' | 'REJECTED', notes: string }
    const response = await axiosInstance.put(
      `/api/payments/manager/withdrawal-requests/${id}`,
      data
    );
    return response;
  },
};

export default withdrawalsServices;
