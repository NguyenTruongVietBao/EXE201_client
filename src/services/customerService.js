import axiosInstance from '../configs/axios';

const customerService = {
  getMyDocuments: async () => {
    try {
      const response = await axiosInstance.get(`/api/documents/my-documents`);
      return response;
    } catch (error) {
      console.error('Error fetching my documents:', error);
      throw error;
    }
  },
  handleEnrollFreeDocument: async (id) => {
    try {
      const response = await axiosInstance.post(
        `/api/documents/${id}/enroll-free-document`
      );
      return response;
    } catch (error) {
      console.error('Error enrolling free document:', error);
      throw error;
    }
  },
  getMyEnrolledDocuments: async () => {
    try {
      const response = await axiosInstance.get(`/api/documents/enrolled`);
      return response;
    } catch (error) {
      console.error('Error fetching my enrolled documents:', error);
      throw error;
    }
  },
  getMyNotEnrolledDocuments: async () => {
    try {
      const response = await axiosInstance.get(`/api/documents/not-enrolled`);
      return response;
    } catch (error) {
      console.error('Error fetching my enrolled documents:', error);
      throw error;
    }
  },
  handleDownloadDocument: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/api/documents/${id}/download`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      console.error('Error downloading free document:', error);
      throw error;
    }
  },
  // Purchased Documents ------------------------------------------------------------
  getMyPurchasedDocuments: async () => {
    try {
      const response = await axiosInstance.get(
        `/api/payments/my-purchased-documents`
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
        `/api/payments/callback-purchase/${id}`
      );
      return response;
    } catch (error) {
      console.error('Error handling callback purchase:', error);
      throw error;
    }
  },
  // Refunds Requests ------------------------------------------------------------
  getMyRefundsRequests: async () => {
    try {
      const response = await axiosInstance.get(`/api/refunds/my-requests`);
      return response;
    } catch (error) {
      console.error('Error fetching my refunds requests:', error);
      throw error;
    }
  },
  getRefundRequestAvailable: async () => {
    try {
      const response = await axiosInstance.get(
        `/api/payments/refundable-payments`
      );
      return response;
    } catch (error) {
      console.error('Error fetching refund request available:', error);
      throw error;
    }
  },
  createRefundRequest: async ({ paymentId, reason, bankDetails }) => {
    try {
      const response = await axiosInstance.post(`/api/refunds`, {
        paymentId,
        reason,
        bankDetails,
      });
      return response;
    } catch (error) {
      console.error('Error creating refund request:', error);
      throw error;
    }
  },
  // Group ------------------------------------------------------------
  // Get group stats for current user
  getMyGroupStats: async () => {
    try {
      const response = await axiosInstance.get(`/api/groups/my-stats`);
      return response;
    } catch (error) {
      console.error('Error fetching my group stats:', error);
      throw error;
    }
  },
  // Member
  getAllGroups: async () => {
    try {
      const response = await axiosInstance.get(`/api/groups`);
      return response;
    } catch (error) {
      console.error('Error fetching all groups:', error);
      throw error;
    }
  },
  getAllMyJoinGroupRequests: async () => {
    try {
      const response = await axiosInstance.get(`/api/groups/my-join-requests`);
      return response;
    } catch (error) {
      console.error('Error fetching my join group requests:', error);
      throw error;
    }
  },
  getJoinedGroups: async () => {
    try {
      const response = await axiosInstance.get(`/api/groups/joined-groups`);
      return response;
    } catch (error) {
      console.error('Error fetching my groups:', error);
      throw error;
    }
  },
  getGroupById: async (groupId) => {
    try {
      const response = await axiosInstance.get(`/api/groups/${groupId}`);
      return response;
    } catch (error) {
      console.error('Error fetching group by id:', error);
      throw error;
    }
  },
  createGroup: async (data) => {
    //  data: {
    //    "name": "React Native Việt Nam",
    //    "description": "Nhóm chuyên React native cho người mới",
    //    "maxMembers": 100,
    //    "interests": ["68459bb312842521c22178c2", "68459bb312842521c22178c3"]
    //  }
    try {
      const response = await axiosInstance.post(`/api/groups`, data);
      return response;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  },
  createJoinGroupRequest: async (groupId, data) => {
    // data: {
    //   "message": "Xin chào, tôi muốn tham gia nhóm này"
    // }
    try {
      const response = await axiosInstance.post(
        `/api/groups/${groupId}/join`,
        data
      );
      return response;
    } catch (error) {
      console.error('Error creating join group request:', error);
      throw error;
    }
  },
  // Admin Group
  getJoinGroupRequests: async (groupId) => {
    try {
      const response = await axiosInstance.get(
        `/api/groups/${groupId}/requests`
      );
      return response;
    } catch (error) {
      console.error('Error fetching group join requests:', error);
      throw error;
    }
  },
  getGroupJoinRequests: async (groupId) => {
    try {
      const response = await axiosInstance.get(
        `/api/groups/${groupId}/requests`
      );
      return response;
    } catch (error) {
      console.error('Error fetching group join requests:', error);
      throw error;
    }
  },
  handleJoinGroupRequest: async (requestId, data) => {
    // data: { action: 'APPROVE' | 'REJECT', rejectionReason?: string }
    try {
      if (data.action === 'APPROVE') {
        const response = await axiosInstance.put(
          `/api/groups/requests/${requestId}/accept`
        );
        return response;
      } else if (data.action === 'REJECT') {
        const response = await axiosInstance.put(
          `/api/groups/requests/${requestId}/reject`,
          { rejectionReason: data.rejectionReason || '' }
        );
        return response;
      }
    } catch (error) {
      console.error('Error handling join group request:', error);
      throw error;
    }
  },
  getMyGroups: async () => {
    try {
      const response = await axiosInstance.get(`/api/groups/my-groups`);
      return response;
    } catch (error) {
      console.error('Error fetching my groups:', error);
      throw error;
    }
  },

  // Chat ------------------------------------------------------------
  // User - User
  getMyConversations: async () => {
    try {
      const response = await axiosInstance.get(`/api/chat/conversations`);
      return response;
    } catch (error) {
      console.error('Error fetching my conversations:', error);
      throw error;
    }
  },
  createConversation: async (userId) => {
    try {
      const response = await axiosInstance.post(`/api/chat/conversations`, {
        userId,
      });
      return response;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  },
  getConversationMessages: async (conversationId) => {
    try {
      const response = await axiosInstance.get(
        `/api/chat/conversations/${conversationId}/messages`
      );
      return response;
    } catch (error) {
      console.error('Error fetching conversation messages:', error);
      throw error;
    }
  },
  sendMessage: async (conversationId, data) => {
    // data: {messageType: 'text' | 'image' , content: string | File}
    try {
      const response = await axiosInstance.post(
        `/api/chat/conversations/${conversationId}/messages`,
        data
      );
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
  // User - Group
  getGroupMessages: async (groupId) => {
    try {
      const response = await axiosInstance.get(
        `/api/chat/groups/${groupId}/messages`
      );
      return response;
    } catch (error) {
      console.error('Error fetching group messages:', error);
      throw error;
    }
  },
  sendGroupMessage: async (groupId, data) => {
    // data: {messageType: 'text' | 'image', content: string | File}
    try {
      const response = await axiosInstance.post(
        `/api/chat/groups/${groupId}/messages`,
        data
      );
      return response;
    } catch (error) {
      console.error('Error sending group message:', error);
      throw error;
    }
  },
};

export default customerService;
