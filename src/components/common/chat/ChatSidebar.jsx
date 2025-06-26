import React, { useState, useMemo, useCallback } from 'react';
import { Users, MessageCircle, Search } from 'lucide-react';
import { useChatStore } from '../../../stores/useChatStore';
import SidebarSkeleton from './SidebarSkeleton';
import useAuthStore from '../../../stores/useAuthStore';
import ThemeToggle from '../ThemeToggle';

export default function ChatSidebar() {
  const { user } = useAuthStore();
  const {
    conversations,
    groups,
    selectedConversation,
    selectedGroup,
    setSelectedConversation,
    setSelectedGroup,
    isLoading,
    isUserOnline,
  } = useChatStore();

  const [activeTab, setActiveTab] = useState('conversations');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter conversations và groups theo search term với debouncing
  const filteredConversations = useMemo(() => {
    if (!Array.isArray(conversations) || !user) return [];

    return conversations.filter((conv) => {
      if (!conv?.participants) return false;
      const otherParticipant = conv.participants.find(
        (p) => p._id !== user._id
      );
      if (!otherParticipant?.name) return false;
      return otherParticipant.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [conversations, searchTerm, user?._id]);

  const filteredGroups = useMemo(() => {
    if (!Array.isArray(groups)) return [];

    return groups.filter((group) => {
      if (!group?.name) return false;
      return group.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [groups, searchTerm]);

  // Memoized handlers để tránh re-render
  const handleConversationClick = useCallback(
    (conversation) => {
      setSelectedConversation(conversation);
    },
    [setSelectedConversation]
  );

  const handleGroupClick = useCallback(
    (group) => {
      setSelectedGroup(group);
    },
    [setSelectedGroup]
  );

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Render conversation item với optimization
  const renderConversationItem = useCallback(
    (conversation) => {
      if (!conversation?.participants || !user) return null;

      const otherParticipant = conversation.participants.find(
        (p) => p._id !== user._id
      );

      if (!otherParticipant) return null;

      const isSelected = selectedConversation?._id === conversation._id;
      const isOnline = isUserOnline(otherParticipant._id);

      return (
        <div
          key={conversation._id}
          className={`p-3 cursor-pointer hover:bg-base-200 transition-colors ${
            isSelected ? 'bg-base-200' : ''
          }`}
          onClick={() => handleConversationClick(conversation)}
        >
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <div className='avatar'>
                <div className='w-12 rounded-full'>
                  <img
                    src={
                      otherParticipant.avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherParticipant._id}`
                    }
                    alt={otherParticipant.name}
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherParticipant._id}`;
                    }}
                  />
                </div>
              </div>
              {isOnline && (
                <div className='absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
              )}
            </div>

            <div className='flex-1 min-w-0'>
              <div className='flex items-center justify-between'>
                <h3 className='font-medium truncate'>
                  {otherParticipant.name}
                </h3>
                {conversation.lastActivity && (
                  <span className='text-xs text-base-content/60'>
                    {new Date(conversation.lastActivity).toLocaleDateString()}
                  </span>
                )}
              </div>

              {conversation.lastMessage ? (
                <p className='text-sm text-base-content/60 truncate'>
                  {conversation.lastMessage.messageType === 'text'
                    ? conversation.lastMessage.content
                    : conversation.lastMessage.messageType === 'image'
                    ? 'Đã gửi một hình ảnh'
                    : 'Tin nhắn mới'}
                </p>
              ) : (
                <p className='text-sm text-base-content/60'>Chưa có tin nhắn</p>
              )}
            </div>
          </div>
        </div>
      );
    },
    [
      user?._id,
      selectedConversation?._id,
      isUserOnline,
      handleConversationClick,
    ]
  );

  // Render group item với optimization
  const renderGroupItem = useCallback(
    (group) => {
      if (!group) return null;

      const isSelected = selectedGroup?._id === group._id;

      return (
        <div
          key={group._id}
          className={`p-3 cursor-pointer hover:bg-base-200 transition-colors ${
            isSelected ? 'bg-base-200' : ''
          }`}
          onClick={() => handleGroupClick(group)}
        >
          <div className='flex items-center gap-3'>
            <div className='avatar'>
              <div className='w-12 rounded-full bg-primary text-primary-content flex items-center justify-center'>
                <img
                  src={`https://api.dicebear.com/9.x/shapes/svg?seed=${group.name}`}
                  alt='Group Avatar'
                />
              </div>
            </div>

            <div className='flex-1 min-w-0'>
              <div className='flex items-center justify-between'>
                <h3 className='font-medium truncate'>{group.name}</h3>
                <span className='text-xs text-base-content/60'>
                  {group.memberCount || group.members?.length || 0} thành viên
                </span>
              </div>

              <p className='text-sm text-base-content/60 truncate'>
                {group.description || 'Nhóm học tập'}
              </p>
            </div>
          </div>
        </div>
      );
    },
    [selectedGroup?._id, handleGroupClick]
  );

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className='h-full w-20 lg:w-80 border-r border-base-300 flex flex-col transition-all duration-200'>
      {/* Header */}
      <div className='border-b border-base-300 p-4'>
        <div className='flex items-center justify-between gap-2 mb-4'>
          <div className='flex items-center gap-2'>
            <MessageCircle className='w-6 h-6' />
            <span className='font-medium hidden lg:block'>Prilab Chat</span>
          </div>
          <div className='flex items-center'>
            <ThemeToggle />
            <span className='text-sm'>Theme</span>
          </div>
        </div>

        {/* Search */}
        <div className='relative hidden lg:block'>
          <Search className='w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60' />
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='input input-bordered w-full pl-10 input-sm'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Tabs */}
        <div className='tabs tabs-boxed mt-4 hidden lg:flex'>
          <button
            className={`tab flex-1 ${
              activeTab === 'conversations' ? 'tab-active' : ''
            }`}
            onClick={() => handleTabChange('conversations')}
          >
            Trò chuyện
          </button>
          <button
            className={`tab flex-1 ${
              activeTab === 'groups' ? 'tab-active' : ''
            }`}
            onClick={() => handleTabChange('groups')}
          >
            Nhóm
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto'>
        {activeTab === 'conversations' ? (
          <div>
            {filteredConversations.length === 0 ? (
              <div className='p-4 text-center text-base-content/60'>
                <MessageCircle className='w-12 h-12 mx-auto mb-2 opacity-50' />
                <p>
                  {searchTerm
                    ? 'Không tìm thấy cuộc trò chuyện'
                    : 'Chưa có cuộc trò chuyện nào'}
                </p>
              </div>
            ) : (
              filteredConversations.map(renderConversationItem)
            )}
          </div>
        ) : (
          <div>
            {filteredGroups.length === 0 ? (
              <div className='p-4 text-center text-base-content/60'>
                <Users className='w-12 h-12 mx-auto mb-2 opacity-50' />
                <p>
                  {searchTerm
                    ? 'Không tìm thấy nhóm'
                    : 'Chưa tham gia nhóm nào'}
                </p>
              </div>
            ) : (
              filteredGroups.map(renderGroupItem)
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
