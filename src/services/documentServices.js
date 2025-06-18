import axiosInstance from '../configs/axios';

const documentServices = {
  // Tạo tài liệu
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
  // Danh sách tài liệu đã chia sẻ của tôi
  getMyDocuments: async () => {
    try {
      const response = await axiosInstance.get(`/documents/my-documents`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // Danh sách tài liệu đã mua
  getMyPurchasedDocuments: async () => {
    try {
      const response = await axiosInstance.get(
        `/payments/my-purchased-documents`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  // Danh sách tài liệu đã đăng ký
  getMyEnrolledDocuments: async () => {
    try {
      const response = await axiosInstance.get(`/documents/enrolled`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // Danh sách tài liệu theo ID tác giả
  getDocumentsByAuthor: async (authorId) => {
    try {
      const response = await axiosInstance.get(`/documents/${authorId}/author`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // Chi tiết tài liệu
  getDocumentDetail: async (id) => {
    try {
      const response = await axiosInstance.get(`/documents/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // Gửi đánh giá tài liệu
  sendFeedbackDocument: async (id, data) => {
    try {
      const response = await axiosInstance.post(`/documents/${id}/feedback`, {
        rating: data.rating,
        comment: data.comment,
      });
      return response;
    } catch (error) {
      return error;
    }
  },
  // Danh sách đánh giá tài liệu
  getFeedbackDocument: async (id) => {
    try {
      const response = await axiosInstance.get(`/documents/${id}/feedback`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // Mua tài liệu
  purchaseDocument: async (id) => {
    try {
      const response = await axiosInstance.post(`/payments/buy-document/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // Xử lý thanh toán
  handlePayment: async (data) => {
    try {
      const response = await axiosInstance.post(`/payments/callback`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default documentServices;
