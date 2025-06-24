import { useEffect, useCallback } from 'react';
import { socketManager } from '../configs/socket';
import { useChatStore } from '../stores/useChatStore';
import useAuthStore from '../stores/useAuthStore';
import { toast } from 'react-hot-toast';

export const useSocket = () => {
  const { user } = useAuthStore();
  const {
    addMessage,
    setOnlineUsers,
    addOnlineUser,
    removeOnlineUser,
    loadJoinedGroups,
    loadConversations,
    clearChat,
  } = useChatStore();

  // Memoize socket emitters để tránh re-render
  const sendDirectMessage = useCallback(
    (receiverId, messageType, content, fileUrl = null) => {
      if (!socketManager.isConnected()) {
        toast.error('Không thể kết nối đến server');
        return;
      }

      socketManager.emit('send_direct_message', {
        receiverId,
        messageType,
        content,
        fileUrl,
      });
    },
    []
  );

  const sendGroupMessage = useCallback(
    (groupId, messageType, content, fileUrl = null) => {
      if (!socketManager.isConnected()) {
        toast.error('Không thể kết nối đến server');
        return;
      }

      socketManager.emit('send_group_message', {
        groupId,
        messageType,
        content,
        fileUrl,
      });
    },
    []
  );

  const joinGroup = useCallback((groupId) => {
    if (!socketManager.isConnected()) return;
    socketManager.emit('join_group', { groupId });
  }, []);

  const leaveGroup = useCallback((groupId) => {
    if (!socketManager.isConnected()) return;
    socketManager.emit('leave_group', { groupId });
  }, []);

  useEffect(() => {
    if (!user) {
      // Clear chat data và disconnect socket khi không có user
      clearChat();
      if (socketManager.isConnected()) {
        socketManager.disconnect();
      }
      return;
    }

    // Connect to socket chỉ khi chưa connected
    if (!socketManager.isConnected()) {
      socketManager.connect();
    }

    // === LISTENERS ===

    // Socket connected successfully
    const handleConnect = () => {
      console.log('Socket connected successfully');

      // Load conversations và groups khi connect thành công
      loadConversations();
      loadJoinedGroups();

      // Add current user vào onlineUsers
      addOnlineUser({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
    };

    // Nhận tin nhắn 1-1 mới
    const handleNewDirectMessage = (message) => {
      console.log('New direct message received:', message);
      addMessage(message);

      // Chỉ show toast nếu không phải tin nhắn của chính mình
      if (message.senderId._id !== user._id) {
        toast.success(`Tin nhắn mới từ ${message.senderId.name}`);
      }
    };

    // Nhận tin nhắn nhóm mới
    const handleNewGroupMessage = (message) => {
      console.log('New group message received:', message);
      addMessage(message);

      // Chỉ show toast nếu không phải tin nhắn của chính mình
      if (message.senderId._id !== user._id) {
        toast.success(`Tin nhắn mới trong nhóm`);
      }
    };

    // User online
    const handleUserOnline = (userData) => {
      console.log('User online:', userData);
      addOnlineUser(userData);
    };

    // User offline
    const handleUserOffline = (data) => {
      console.log('User offline:', data);
      removeOnlineUser(data.userId);
    };

    // Socket error
    const handleError = (error) => {
      console.error('Socket error:', error);
      toast.error(error.message || 'Lỗi kết nối');
    };

    // Message sent confirmation
    const handleMessageSent = (data) => {
      console.log('Message sent successfully:', data);
    };

    // Group joined confirmation
    const handleJoinedGroup = (data) => {
      console.log('Joined group:', data);
    };

    // Group left confirmation
    const handleLeftGroup = (data) => {
      console.log('Left group:', data);
    };

    // Initial online users
    const handleOnlineUsers = (users) => {
      console.log('Received online users:', users);
      setOnlineUsers(users);
    };

    // Socket disconnect
    const handleDisconnect = (reason) => {
      console.log('Socket disconnected:', reason);
    };

    // Remove existing listeners trước khi add mới (tránh duplicate)
    socketManager.off('connect');
    socketManager.off('disconnect');
    socketManager.off('new_direct_message');
    socketManager.off('new_group_message');
    socketManager.off('user_online');
    socketManager.off('user_offline');
    socketManager.off('error');
    socketManager.off('message_sent');
    socketManager.off('joined_group');
    socketManager.off('left_group');
    socketManager.off('online_users');

    // Đăng ký listeners
    socketManager.on('connect', handleConnect);
    socketManager.on('disconnect', handleDisconnect);
    socketManager.on('new_direct_message', handleNewDirectMessage);
    socketManager.on('new_group_message', handleNewGroupMessage);
    socketManager.on('user_online', handleUserOnline);
    socketManager.on('user_offline', handleUserOffline);
    socketManager.on('error', handleError);
    socketManager.on('message_sent', handleMessageSent);
    socketManager.on('joined_group', handleJoinedGroup);
    socketManager.on('left_group', handleLeftGroup);
    socketManager.on('online_users', handleOnlineUsers);

    // Cleanup khi unmount hoặc user change
    return () => {
      socketManager.off('connect', handleConnect);
      socketManager.off('disconnect', handleDisconnect);
      socketManager.off('new_direct_message', handleNewDirectMessage);
      socketManager.off('new_group_message', handleNewGroupMessage);
      socketManager.off('user_online', handleUserOnline);
      socketManager.off('user_offline', handleUserOffline);
      socketManager.off('error', handleError);
      socketManager.off('message_sent', handleMessageSent);
      socketManager.off('joined_group', handleJoinedGroup);
      socketManager.off('left_group', handleLeftGroup);
      socketManager.off('online_users', handleOnlineUsers);
    };
  }, [
    user?._id,
    addMessage,
    setOnlineUsers,
    addOnlineUser,
    removeOnlineUser,
    loadJoinedGroups,
    loadConversations,
    clearChat,
  ]);

  return {
    sendDirectMessage,
    sendGroupMessage,
    joinGroup,
    leaveGroup,
  };
};
