import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useChatStore } from '../../../stores/useChatStore';
import { useSocket } from '../../../hooks/useSocket';
import MessageSkeleton from './MessageSkeleton';
import NoChatSelected from './NoChatSelected';
import { Send, Image, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import chatServices from '../../../services/chatServices';
import useAuthStore from '../../../stores/useAuthStore';

export default function ChatContainer() {
  const { user } = useAuthStore();
  const {
    selectedConversation,
    selectedGroup,
    messages,
    isLoadingMessages,
    setMessages,
    setIsLoadingMessages,
    isUserOnline,
  } = useChatStore();

  const { sendDirectMessage, sendGroupMessage, joinGroup, leaveGroup } =
    useSocket();

  const [messageInput, setMessageInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const currentGroupRef = useRef(null); // Track current group để cleanup

  // Scroll to bottom khi có message mới
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Fetch messages khi select conversation/group
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation && !selectedGroup) {
        setMessages([]);
        return;
      }

      setIsLoadingMessages(true);

      try {
        let response;

        if (selectedConversation) {
          // Leave previous group nếu có
          if (currentGroupRef.current) {
            leaveGroup(currentGroupRef.current);
            currentGroupRef.current = null;
          }

          response = await chatServices.getConversationMessages(
            selectedConversation._id
          );
        } else if (selectedGroup) {
          // Leave previous group nếu khác group hiện tại
          if (
            currentGroupRef.current &&
            currentGroupRef.current !== selectedGroup._id
          ) {
            leaveGroup(currentGroupRef.current);
          }

          response = await chatServices.getGroupMessages(selectedGroup._id);

          // Join group mới
          if (currentGroupRef.current !== selectedGroup._id) {
            joinGroup(selectedGroup._id);
            currentGroupRef.current = selectedGroup._id;
          }
        }

        if (response?.status) {
          setMessages(response.data || []);
        } else {
          console.error('Error fetching messages:', response?.message);
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Lỗi khi tải tin nhắn');
        setMessages([]);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();

    // Cleanup khi component unmount
    return () => {
      if (currentGroupRef.current) {
        leaveGroup(currentGroupRef.current);
        currentGroupRef.current = null;
      }
    };
  }, [
    selectedConversation?._id,
    selectedGroup?._id,
    setMessages,
    setIsLoadingMessages,
    // Remove joinGroup và leaveGroup khỏi dependencies để tránh infinite loop
  ]);

  // Handle image selection
  const handleImageSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Chỉ chấp nhận file hình ảnh');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB
        toast.error('File quá lớn. Vui lòng chọn file nhỏ hơn 10MB');
        return;
      }
      setSelectedImage(file);
    }
  }, []);

  // Send text message
  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      if (!messageInput.trim() && !selectedImage) return;

      let fileUrl = null;

      try {
        // Upload image nếu có
        if (selectedImage) {
          setIsUploading(true);
          const uploadResponse = await chatServices.uploadImage(selectedImage);

          if (uploadResponse?.status) {
            fileUrl = uploadResponse.data.fileUrl;
          } else {
            toast.error('Lỗi upload hình ảnh');
            setIsUploading(false);
            return;
          }
        }

        const messageContent = messageInput.trim();
        const messageType = selectedImage ? 'image' : 'text';

        // Send via socket
        if (selectedConversation) {
          const otherParticipant = selectedConversation.participants.find(
            (p) => p._id !== user._id
          );
          if (otherParticipant) {
            sendDirectMessage(
              otherParticipant._id,
              messageType,
              messageContent,
              fileUrl
            );
          }
        } else if (selectedGroup) {
          sendGroupMessage(
            selectedGroup._id,
            messageType,
            messageContent,
            fileUrl
          );
        }

        // Clear input
        setMessageInput('');
        setSelectedImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error sending message:', error);
        toast.error('Lỗi khi gửi tin nhắn');
      } finally {
        setIsUploading(false);
      }
    },
    [
      messageInput,
      selectedImage,
      selectedConversation,
      selectedGroup,
      user?._id,
      sendDirectMessage,
      sendGroupMessage,
    ]
  );

  // Clear selected image
  const clearSelectedImage = useCallback(() => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  // Render message
  const renderMessage = useCallback(
    (message, index) => {
      const isMyMessage = message.senderId._id === user._id;
      const showAvatar =
        index === 0 ||
        messages[index - 1]?.senderId._id !== message.senderId._id;

      return (
        <div
          key={message._id}
          className={`chat ${isMyMessage ? 'chat-end' : 'chat-start'}`}
        >
          {showAvatar && (
            <div className='chat-image avatar'>
              <div className='w-10 rounded-full'>
                <img
                  alt={message.senderId.name}
                  src={
                    message.senderId.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.senderId._id}`
                  }
                  onError={(e) => {
                    e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.senderId._id}`;
                  }}
                />
              </div>
            </div>
          )}

          <div className='chat-header mb-1'>
            <span className='text-sm opacity-50'>{message.senderId.name}</span>
            <time className='text-xs opacity-50 ml-2'>
              {new Date(message.createdAt).toLocaleTimeString()}
            </time>
          </div>

          <div
            className={`chat-bubble ${
              isMyMessage ? 'chat-bubble-primary' : 'chat-bubble-secondary'
            }`}
          >
            {message.messageType === 'text' ? (
              <p className='break-words'>{message.content}</p>
            ) : message.messageType === 'image' ? (
              <div className='max-w-xs'>
                <img
                  src={message.fileUrl}
                  alt='Hình ảnh'
                  className='rounded-lg cursor-pointer'
                  onClick={() => window.open(message.fileUrl, '_blank')}
                />
              </div>
            ) : null}
          </div>
        </div>
      );
    },
    [user._id, messages]
  );

  // Show loading or no chat selected
  if (!selectedConversation && !selectedGroup) {
    return <NoChatSelected />;
  }

  if (isLoadingMessages) {
    return (
      <div className='flex-1 flex flex-col'>
        <MessageSkeleton />
      </div>
    );
  }

  const chatTitle = selectedConversation
    ? selectedConversation.participants.find((p) => p._id !== user._id)?.name
    : selectedGroup?.name;

  const chatAvatar = selectedConversation
    ? selectedConversation.participants.find((p) => p._id !== user._id)
        ?.avatar ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${
        selectedConversation.participants.find((p) => p._id !== user._id)?._id
      }`
    : `https://api.dicebear.com/9.x/shapes/svg?seed=${selectedGroup?.name}`;

  const isOnline = selectedConversation
    ? isUserOnline(
        selectedConversation.participants.find((p) => p._id !== user._id)?._id
      )
    : false;

  return (
    <div className='flex-1 flex flex-col'>
      {/* Header */}
      <div className='border-b border-base-300 p-4'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <div className='avatar'>
              <div className='w-10 rounded-full'>
                <img
                  alt={chatTitle}
                  src={chatAvatar}
                  onError={(e) => {
                    e.target.src = selectedConversation
                      ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${
                          selectedConversation.participants.find(
                            (p) => p._id !== user._id
                          )?._id
                        }`
                      : `https://api.dicebear.com/9.x/shapes/svg?seed=${selectedGroup?.name}`;
                  }}
                />
              </div>
            </div>
            {isOnline && (
              <div className='absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
            )}
          </div>
          <div>
            <h3 className='font-semibold'>{chatTitle}</h3>
            <p className='text-sm text-base-content/60'>
              {selectedGroup
                ? `${
                    selectedGroup.memberCount ||
                    selectedGroup.members?.length ||
                    0
                  } thành viên`
                : isOnline
                ? 'Đang hoạt động'
                : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.length === 0 ? (
          <div className='flex items-center justify-center h-full'>
            <p className='text-base-content/60'>Chưa có tin nhắn nào</p>
          </div>
        ) : (
          messages.map((message, index) => renderMessage(message, index))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className='border-t border-base-300 p-4'>
        {/* Image preview */}
        {selectedImage && (
          <div className='mb-2 relative inline-block'>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt='Preview'
              className='max-w-32 max-h-32 rounded-lg'
            />
            <button
              onClick={clearSelectedImage}
              className='absolute -top-2 -right-2 btn btn-circle btn-xs btn-error'
            >
              <X className='w-3 h-3' />
            </button>
          </div>
        )}

        <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleImageSelect}
            className='hidden'
          />

          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className='btn btn-ghost btn-sm'
            disabled={isUploading}
          >
            <Image className='w-4 h-4' />
          </button>

          <input
            type='text'
            placeholder='Nhập tin nhắn...'
            className='input input-bordered flex-1'
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            disabled={isUploading}
          />

          <button
            type='submit'
            className='btn btn-primary'
            disabled={(!messageInput.trim() && !selectedImage) || isUploading}
          >
            {isUploading ? (
              <span className='loading loading-spinner loading-sm'></span>
            ) : (
              <Send className='w-4 h-4' />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
