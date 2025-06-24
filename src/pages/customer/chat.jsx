import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useChatStore } from '../../stores/useChatStore';
import { useSocket } from '../../hooks/useSocket';
import ChatSidebar from '../../components/common/chat/ChatSidebar';
import ChatContainer from '../../components/common/chat/ChatContainer';
import chatServices from '../../services/chatServices';
import { toast } from 'react-hot-toast';
import useAuthStore from '../../stores/useAuthStore';

export default function Chat() {
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get('receiverId');
  const groupId = searchParams.get('groupId');

  const { user } = useAuthStore();
  const { conversations, groups, setSelectedConversation, setSelectedGroup } =
    useChatStore();

  // Initialize socket connection
  useSocket();

  // Handle URL parameters để tự động select conversation/group
  useEffect(() => {
    const handleUrlParams = async () => {
      if (!user) return;

      if (receiverId && conversations.length > 0) {
        // Tìm conversation với user này
        const existingConversation = conversations.find((conv) =>
          conv.participants?.some((p) => p._id === receiverId)
        );

        if (existingConversation) {
          setSelectedConversation(existingConversation);
        } else {
          // Tạo conversation mới nếu chưa có
          try {
            const response = await chatServices.createConversation(receiverId);
            if (response?.status) {
              setSelectedConversation(response.data);
              toast.success('Bắt đầu cuộc trò chuyện mới');
            } else {
              console.error('Error creating conversation:', response?.message);
              toast.error(response?.message || 'Lỗi khi tạo cuộc trò chuyện');
            }
          } catch (error) {
            console.error('Error creating conversation:', error);
            toast.error('Lỗi khi tạo cuộc trò chuyện');
          }
        }
      } else if (groupId && groups.length > 0) {
        // Tìm group đã tham gia
        const existingGroup = groups.find((group) => group._id === groupId);
        if (existingGroup) {
          setSelectedGroup(existingGroup);
        } else {
          toast.error(
            'Không tìm thấy nhóm chat hoặc bạn chưa tham gia nhóm này'
          );
        }
      }
    };

    // Chỉ handle URL params khi đã có data
    if (user && (receiverId || groupId)) {
      handleUrlParams();
    }
  }, [
    receiverId,
    groupId,
    conversations,
    groups,
    user,
    setSelectedConversation,
    setSelectedGroup,
  ]);

  if (!user) {
    return (
      <div className='container mx-auto h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-4'>Vui lòng đăng nhập</h2>
          <p className='text-base-content/60'>
            Bạn cần đăng nhập để sử dụng tính năng chat
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto h-[750px] max-h-screen'>
      <div className='flex h-full'>
        <ChatSidebar />
        <ChatContainer />
      </div>
    </div>
  );
}
