import axiosInstance from '../configs/axios';

const chatServices = {
  // Upload image cho chat
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axiosInstance.post(
        `/api/chat/upload-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Upload image error:', error);
      return (
        error.response?.data || {
          status: false,
          message: 'Lỗi kết nối server',
        }
      );
    }
  },

  // === CONVERSATION (1-1 Chat) APIs ===

  // Lấy danh sách conversations
  getConversations: async () => {
    try {
      const response = await axiosInstance.get('/api/chat/conversations');
      return response;
    } catch (error) {
      console.error('Get conversations error:', error);
      return {
        status: false,
        message: 'Lỗi khi lấy danh sách cuộc trò chuyện',
      };
    }
  },
  // Tạo conversation mới với user
  createConversation: async (participantId) => {
    try {
      const response = await axiosInstance.post(
        `/api/chat/conversations/${participantId}`
      );
      return response;
    } catch (error) {
      console.error('Create conversation error:', error);
      return {
        status: false,
        message: 'Lỗi khi tạo cuộc trò chuyện',
      };
    }
  },
  // Lấy tin nhắn của conversation
  getConversationMessages: async (conversationId) => {
    try {
      const response = await axiosInstance.get(
        `/api/chat/conversations/${conversationId}/messages`
      );
      return response;
    } catch (error) {
      console.error('Get conversation messages error:', error);
      return {
        status: false,
        message: 'Lỗi khi lấy tin nhắn',
      };
    }
  },
  // Gửi tin nhắn trong conversation
  sendConversationMessage: async (conversationId, messageData) => {
    try {
      const response = await axiosInstance.post(
        `/api/chat/conversations/${conversationId}/messages`,
        messageData
      );
      return response;
    } catch (error) {
      console.error('Send conversation message error:', error);
      return {
        status: false,
        message: 'Lỗi khi gửi tin nhắn',
      };
    }
  },

  // === GROUP CHAT APIs ===

  // Lấy danh sách groups đã tham gia
  getJoinedGroups: async () => {
    try {
      const response = await axiosInstance.get('/api/chat/groups');
      return response;
    } catch (error) {
      console.error('Get joined groups error:', error);
      return {
        status: false,
        message: 'Lỗi khi lấy danh sách nhóm',
      };
    }
  },
  // Lấy tin nhắn của group
  getGroupMessages: async (groupId) => {
    try {
      const response = await axiosInstance.get(
        `/api/chat/groups/${groupId}/messages`
      );
      return response;
    } catch (error) {
      console.error('Get group messages error:', error);
      return {
        status: false,
        message: 'Lỗi khi lấy tin nhắn nhóm',
      };
    }
  },
  // Gửi tin nhắn trong group
  sendGroupMessage: async (groupId, messageData) => {
    try {
      const response = await axiosInstance.post(
        `/api/chat/groups/${groupId}/messages`,
        messageData
      );
      return response;
    } catch (error) {
      console.error('Send group message error:', error);
      return {
        status: false,
        message: 'Lỗi khi gửi tin nhắn nhóm',
      };
    }
  },
};

export default chatServices;
