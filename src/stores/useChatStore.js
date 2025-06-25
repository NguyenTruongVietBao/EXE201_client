import { create } from 'zustand';
import chatServices from '../services/chatServices';

export const useChatStore = create((set, get) => ({
  conversations: [],
  groups: [],
  selectedConversation: null,
  selectedGroup: null,
  messages: [],
  isLoading: false,
  isLoadingMessages: false,
  onlineUsers: [],

  setConversations: (conversations) => set({ conversations }),
  setGroups: (groups) => set({ groups }),

  // Load danh sách groups đã tham gia
  loadJoinedGroups: async () => {
    try {
      set({ isLoading: true });
      const response = await chatServices.getJoinedGroups();
      if (response?.status) {
        set({ groups: response.data || [] });
        return response.data || [];
      } else {
        console.error('Error loading joined groups:', response?.message);
        set({ groups: [] });
        return [];
      }
    } catch (error) {
      console.error('Error loading joined groups:', error);
      set({ groups: [] });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  // Load conversations
  loadConversations: async () => {
    try {
      set({ isLoading: true });
      const response = await chatServices.getConversations();
      if (response?.status) {
        set({ conversations: response.data || [] });
        return response.data || [];
      } else {
        console.error('Error loading conversations:', response?.message);
        set({ conversations: [] });
        return [];
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      set({ conversations: [] });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  updateConversation: (conversationId, lastMessage) => {
    const { conversations } = get();
    const updatedConversations = conversations.map((conv) => {
      if (conv._id === conversationId) {
        return {
          ...conv,
          lastMessage,
          lastActivity: new Date(Date.now()),
        };
      }
      return conv;
    });
    set({ conversations: updatedConversations });
  },

  setSelectedConversation: (conversation) => {
    const { selectedConversation: current } = get();
    if (current?._id === conversation?._id) return;

    set({
      selectedConversation: conversation,
      selectedGroup: null,
      messages: [],
    });
  },

  setSelectedGroup: (group) => {
    const { selectedGroup: current } = get();
    if (current?._id === group?._id) return;

    set({
      selectedGroup: group,
      selectedConversation: null,
      messages: [],
    });
  },

  setMessages: (messages) => {
    const uniqueMessages = Array.isArray(messages)
      ? messages.filter(
          (msg, index, self) =>
            index === self.findIndex((m) => m._id === msg._id)
        )
      : [];
    set({ messages: uniqueMessages });
  },

  addMessage: (message) => {
    const { messages, selectedConversation, selectedGroup } = get();

    if (!message || !message._id || !message.senderId) {
      console.warn('Invalid message received:', message);
      return;
    }

    const isRelevantMessage =
      (selectedConversation &&
        message.conversationId === selectedConversation._id) ||
      (selectedGroup && message.groupId === selectedGroup._id);

    if (!isRelevantMessage) return;

    const messageExists = messages.some((m) => m._id === message._id);
    if (messageExists) return;

    const updatedMessages = [...messages, message];
    set({ messages: updatedMessages });

    if (message.conversationId) {
      get().updateConversation(message.conversationId, message);
    }
  },

  removeMessage: (messageId) => {
    const { messages } = get();
    const updatedMessages = messages.filter((m) => m._id !== messageId);
    set({ messages: updatedMessages });
  },

  setIsLoading: (isLoading) => set({ isLoading }),
  setIsLoadingMessages: (isLoadingMessages) => set({ isLoadingMessages }),

  setOnlineUsers: (users) => {
    const validUsers = Array.isArray(users) ? users : [];
    set({ onlineUsers: validUsers });
  },

  addOnlineUser: (user) => {
    if (!user || !user.userId) return;

    const { onlineUsers } = get();
    const userExists = onlineUsers.some((u) => u.userId === user.userId);

    if (!userExists) {
      set({ onlineUsers: [...onlineUsers, user] });
    } else {
      // Cập nhật thông tin user nếu đã tồn tại
      const updatedUsers = onlineUsers.map((u) =>
        u.userId === user.userId ? { ...u, ...user } : u
      );
      set({ onlineUsers: updatedUsers });
    }
  },

  removeOnlineUser: (userId) => {
    if (!userId) return;

    const { onlineUsers } = get();
    const updatedUsers = onlineUsers.filter((u) => u.userId !== userId);
    set({ onlineUsers: updatedUsers });
  },

  isUserOnline: (userId) => {
    if (!userId) return false;
    const { onlineUsers } = get();
    return onlineUsers.some((u) => u.userId === userId);
  },

  batchUpdate: (updates) => {
    set((state) => ({
      ...state,
      ...updates,
    }));
  },

  clearMessages: () => set({ messages: [] }),
  clearSelection: () =>
    set({
      selectedConversation: null,
      selectedGroup: null,
      messages: [],
    }),

  clearChat: () =>
    set({
      conversations: [],
      groups: [],
      selectedConversation: null,
      selectedGroup: null,
      messages: [],
      onlineUsers: [],
      isLoading: false,
      isLoadingMessages: false,
    }),
}));
