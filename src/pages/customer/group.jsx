import React, { useEffect, useState } from 'react';
import {
  Search,
  Users,
  MessageSquare,
  Clock,
  Sparkles,
  Brain,
  Target,
  SortAsc,
  SortDesc,
  UserPlus,
  Shield,
  Crown,
  Calendar,
  CheckCircle,
  Settings,
  XCircle,
} from 'lucide-react';
import interestServices from '../../services/interestServices';
import { formatDate, formatJustDate } from '../../utils';
import customerService from '../../services/customerService';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import useAuthStore from '../../stores/useAuthStore';

export default function CustomerGroup() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('compatibilityScore');
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeTab, setActiveTab] = useState('discover');
  const [priorityGroups, setPriorityGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [myJoinGroupRequests, setMyJoinGroupRequests] = useState([]);
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    const fetchPriorityGroups = async () => {
      const response = await interestServices.getPrioriryGroups();
      setPriorityGroups(response.data.groups || []);
    };
    const fetchMyJoinGroupRequests = async () => {
      const response = await customerService.getAllMyJoinGroupRequests();
      setMyJoinGroupRequests(response.data.joinRequests || []);
    };
    const fetchJoinedGroups = async () => {
      const response = await customerService.getJoinedGroups();
      setJoinedGroups(response.data.groups || []);
    };
    const fetchMyGroups = async () => {
      const response = await customerService.getMyGroups();
      setMyGroups(response.data.groups || []);
    };

    fetchMyJoinGroupRequests();
    fetchPriorityGroups();
    fetchJoinedGroups();
    fetchMyGroups();
  }, []);

  const sendJoinGroupRequest = async (groupId) => {
    try {
      await customerService.createJoinGroupRequest(groupId, {
        message: 'Xin chào, tôi muốn tham gia nhóm này',
      });
      toast.success('Yêu cầu tham gia nhóm đã được gửi');
      const requestsResponse =
        await customerService.getAllMyJoinGroupRequests();
      setMyJoinGroupRequests(requestsResponse.data.joinRequests || []);
    } catch (error) {
      console.error('Error sending join group request:', error);
      toast.error('Có lỗi xảy ra khi gửi yêu cầu');
    }
  };

  // AI suggestions được tạo từ groups thật
  const aiSuggestions = priorityGroups.slice(0, 2).map((group, index) => ({
    id: `ai-g${index + 1}`,
    name: group.name,
    description: group.description,
    reason: `${group.sharedInterestsCount} sở thích chung - ${group.currentMemberCount} thành viên`,
    currentMemberCount: group.currentMemberCount,
    compatibilityScore: group.compatibilityScore,
    _id: group._id,
  }));

  // Determine which groups to display based on active tab
  const currentGroups = (() => {
    switch (activeTab) {
      case 'discover':
        return priorityGroups;
      case 'myGroups':
        // Filter out groups where user is admin (only show groups where user is regular member)
        return joinedGroups.filter((group) => {
          // Check if user is admin/creator of this group
          const isAdmin =
            group.userRole === 'ADMIN' ||
            (currentUser &&
              group.createdBy &&
              currentUser._id === group.createdBy._id);
          return !isAdmin; // Only return groups where user is NOT admin
        });
      case 'createdGroups':
        return myGroups;
      default:
        return priorityGroups;
    }
  })();

  const filteredGroups = currentGroups
    .filter((group) => {
      const matchesSearch =
        group.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.createdBy?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        group.interests?.some((interest) =>
          interest.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesSearch;
    })
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name?.toLowerCase() || '';
          bValue = b.name?.toLowerCase() || '';
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'currentMemberCount':
          // Use different fields based on tab
          if (activeTab === 'createdGroups') {
            aValue = a.memberCount || a.members?.length || 0;
            bValue = b.memberCount || b.members?.length || 0;
          } else if (activeTab === 'myGroups') {
            aValue = a.members?.length || a.currentMemberCount || 0;
            bValue = b.members?.length || b.currentMemberCount || 0;
          } else {
            aValue = a.currentMemberCount || 0;
            bValue = b.currentMemberCount || 0;
          }
          break;
        case 'compatibilityScore':
        default:
          aValue = a.compatibilityScore || 0;
          bValue = b.compatibilityScore || 0;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const GroupCard = ({ group }) => {
    // Get member count based on tab and available data
    const memberCount = (() => {
      if (activeTab === 'createdGroups') {
        return group.memberCount || group.members?.length || 0;
      } else if (activeTab === 'myGroups') {
        return group.members?.length || group.currentMemberCount || 0;
      } else {
        return group.currentMemberCount || 0;
      }
    })();

    // Check if current user is admin based on different data structures
    const isAdmin = (() => {
      if (activeTab === 'createdGroups') {
        return true; // All groups in myGroups are created by current user
      } else if (activeTab === 'myGroups') {
        return false; // myGroups tab only shows groups where user is NOT admin
      } else {
        return (
          currentUser &&
          group.createdBy &&
          currentUser._id === group.createdBy._id
        );
      }
    })();

    const isMember = activeTab !== 'discover' || group.isMember;

    // Get join date for display
    const joinDate = (() => {
      if (activeTab === 'createdGroups') {
        return group.createdAt; // Use creation date for created groups
      } else if (activeTab === 'myGroups' && group.members) {
        const currentUserMember = group.members.find(
          (member) => member.userId._id === currentUser?._id
        );
        return currentUserMember?.joinDate;
      }
      return group.joinDate;
    })();

    // Check if user has already sent a join request for this group
    const hasPendingRequest = myJoinGroupRequests.some(
      (request) =>
        request.groupId._id === group._id && request.status === 'PENDING'
    );

    // Check if user has a rejected request for this group
    const hasRejectedRequest = myJoinGroupRequests.some(
      (request) =>
        request.groupId._id === group._id && request.status === 'REJECTED'
    );

    return (
      <div
        className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border ${
          isAdmin
            ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-white'
            : 'border-gray-100'
        } group`}
      >
        <div className='p-6'>
          {/* Header */}
          <div className='flex items-start gap-4 mb-4'>
            <div className='relative'>
              <div
                className={`w-16 h-16 ${
                  isAdmin
                    ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                } rounded-xl flex items-center justify-center text-white text-2xl font-bold`}
              >
                {group.name?.charAt(0) || 'G'}
              </div>
              {isMember && (
                <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full flex items-center justify-center'>
                  <CheckCircle className='w-3 h-3 text-white' />
                </div>
              )}
              {isAdmin && (
                <div className='absolute -top-1 -left-1 w-6 h-6 bg-yellow-400 border-2 border-white rounded-full flex items-center justify-center'>
                  <Crown className='w-3 h-3 text-white' />
                </div>
              )}
            </div>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-1 flex-wrap'>
                <h3 className='text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors'>
                  {group.name}
                </h3>
                {isAdmin && (
                  <span className='px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1 border border-yellow-200'>
                    <Crown className='w-3 h-3' />
                    {activeTab === 'createdGroups' ? 'Người tạo' : 'Admin'}
                  </span>
                )}
              </div>
              <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
                {group.description}
              </p>
              <div className='flex items-center gap-4 text-sm text-gray-500 flex-wrap'>
                <div className='flex items-center gap-1'>
                  <Users className='w-4 h-4' />
                  <span>{memberCount}</span>
                </div>
                {group.maxMembers && (
                  <div className='flex items-center gap-1'>
                    <Shield className='w-4 h-4' />
                    <span>Max: {group.maxMembers}</span>
                  </div>
                )}

                {(activeTab === 'myGroups' || activeTab === 'createdGroups') &&
                  joinDate && (
                    <div className='flex items-center gap-1'>
                      <Calendar className='w-4 h-4' />
                      <span>
                        {activeTab === 'createdGroups' ? 'Tạo: ' : 'Tham gia: '}
                        {formatJustDate(joinDate)}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Creator Info */}
          <div
            className={`${
              isAdmin ? 'bg-yellow-50 border border-yellow-100' : 'bg-gray-50'
            } rounded-lg p-3 mb-4`}
          >
            <div className='flex items-center gap-3'>
              <img
                src={
                  group.createdBy?.avatar ||
                  `https://api.dicebear.com/9.x/avataaars/svg?seed=${
                    group.createdBy?.name || 'default'
                  }`
                }
                alt={group.createdBy?.name}
                className='w-8 h-8 rounded-full border-2 border-white shadow-sm'
              />
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <Crown
                    className={`w-4 h-4 ${
                      isAdmin ? 'text-yellow-600' : 'text-yellow-500'
                    }`}
                  />
                  <p className='text-sm font-medium text-gray-900'>
                    {group.createdBy?.name}
                    {isAdmin && (
                      <span className='text-yellow-600 ml-1'>(Bạn)</span>
                    )}
                  </p>
                </div>
                <p className='text-xs text-gray-500'>
                  {group.createdBy?.email}
                </p>
              </div>
              <div className='text-xs text-gray-500'>
                {formatDate(group.createdAt)}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                <Target className='w-4 h-4' />
                <span>
                  {activeTab === 'discover'
                    ? `${group.sharedInterestsCount || 0} sở thích chung`
                    : `${group.interests?.length || 0} sở thích`}
                </span>
              </div>
              {activeTab === 'createdGroups' && (
                <div className='flex items-center gap-1'>
                  <Crown className='w-4 h-4' />
                  <span>{group.adminCount || 1} admin</span>
                </div>
              )}
            </div>
            <div className='flex items-center gap-1 text-xs'>
              {isMember ? (
                <>
                  <CheckCircle className='w-3 h-3 text-green-500' />
                  <span className='text-green-600'>
                    {activeTab === 'createdGroups'
                      ? 'Nhóm của bạn'
                      : 'Đã tham gia'}
                  </span>
                </>
              ) : isAdmin ? (
                <>
                  <Crown className='w-3 h-3 text-yellow-500' />
                  <span className='text-yellow-600'>Quản trị viên</span>
                </>
              ) : (
                <>
                  <Clock className='w-3 h-3' />
                  <span>Có thể tham gia</span>
                </>
              )}
            </div>
          </div>

          {/* Interests */}
          <div className='mb-4'>
            <p className='text-xs text-gray-500 mb-2'>
              {group.interests?.length || 0} sở thích:
            </p>
            <div className='flex flex-wrap gap-1'>
              {group.interests?.slice(0, 4).map((interest) => (
                <span
                  key={interest._id}
                  className='px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium flex items-center gap-1 border border-purple-100'
                >
                  <span>{interest.emoji}</span>
                  <span>{interest.name}</span>
                </span>
              ))}
              {group.interests?.length > 4 && (
                <span className='px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs border border-gray-200'>
                  +{group.interests.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex items-center justify-between gap-2'>
            {activeTab === 'createdGroups' ? (
              <div className='flex items-center gap-2 w-full'>
                <button className='flex-1 py-2 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 border border-yellow-200'>
                  <Crown className='w-4 h-4 text-yellow-700' />
                  Nhóm của bạn
                </button>
                <Link
                  to={`/customer/chat`}
                  className='p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors border border-gray-200'
                >
                  <MessageSquare className='w-4 h-4 text-gray-600' />
                </Link>
                <Link
                  to={`/customer/my-groups`}
                  className='p-2 bg-yellow-100 hover:bg-yellow-200 rounded-xl transition-colors border border-yellow-200'
                >
                  <Settings className='w-4 h-4 text-yellow-600' />
                </Link>
              </div>
            ) : isAdmin ? (
              <div className='flex items-center gap-2 w-full'>
                <button className='flex-1 py-2 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 border border-yellow-200'>
                  <Crown className='w-4 h-4 text-yellow-700' />
                  Quản trị viên
                </button>
                <Link
                  to={`/customer/chat`}
                  className='p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors border border-gray-200'
                >
                  <MessageSquare className='w-4 h-4 text-gray-600' />
                </Link>
                <Link
                  to={`/customer/my-groups`}
                  className='p-2 bg-yellow-100 hover:bg-yellow-200 rounded-xl transition-colors border border-yellow-200'
                >
                  <Settings className='w-4 h-4 text-yellow-600' />
                </Link>
              </div>
            ) : isMember ? (
              <div className='flex items-center gap-2 w-full'>
                <button className='flex-1 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 border border-green-200'>
                  <CheckCircle className='w-4 h-4 text-green-700' />
                  Đã tham gia
                </button>
                <Link
                  to={`/customer/chat`}
                  className='p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors border border-gray-200'
                >
                  <MessageSquare className='w-4 h-4 text-gray-600' />
                </Link>
              </div>
            ) : hasPendingRequest ? (
              <button
                className='flex-1 py-2 bg-orange-100 text-orange-700 rounded-xl transition-all duration-300 text-sm font-medium cursor-not-allowed flex items-center justify-center gap-2 border border-orange-200'
                disabled
              >
                <Clock className='w-4 h-4' />
                Đang đợi Admin duyệt
              </button>
            ) : hasRejectedRequest ? (
              <button
                className='flex-1 py-2 bg-red-100 text-red-700 rounded-xl transition-all duration-300 text-sm font-medium cursor-not-allowed flex items-center justify-center gap-2 border border-red-200'
                disabled
              >
                <XCircle className='w-4 h-4' />
                Đã bị từ chối
              </button>
            ) : (
              <button
                onClick={() => sendJoinGroupRequest(group._id)}
                className='flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm font-medium border border-purple-300'
              >
                Gửi yêu cầu tham gia
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Tabs configuration
  const tabs = [
    {
      id: 'discover',
      label: 'Khám phá',
      count: priorityGroups.length,
      icon: Search,
    },
    {
      id: 'myGroups',
      label: 'Nhóm đã tham gia',
      count: joinedGroups.filter((group) => {
        const isAdmin =
          group.userRole === 'ADMIN' ||
          (currentUser &&
            group.createdBy &&
            currentUser._id === group.createdBy._id);
        return !isAdmin;
      }).length,
      icon: Users,
    },
    {
      id: 'createdGroups',
      label: 'Nhóm của tôi',
      count: myGroups.length,
      icon: Crown,
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 mb-8'>
            <div className='flex items-center gap-3 mb-4'>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                Nhóm học 🎓
              </h1>
            </div>
            <p className='text-xl text-gray-600 mb-6'>
              Tham gia các nhóm học và phát triển cùng cộng đồng
            </p>

            {/* AI Suggestions */}
            {activeTab === 'discover' && (
              <div className='bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full'>
                    <Sparkles className='w-5 h-5' />
                    <span className='font-semibold'>Gợi ý từ AI</span>
                  </div>
                  <p className='text-purple-700'>
                    Những nhóm học phù hợp với bạn
                  </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {aiSuggestions.map((suggestion) => {
                    // Check if user has already sent a join request for this group
                    const hasPendingRequest = myJoinGroupRequests.some(
                      (request) =>
                        request.groupId._id === suggestion._id &&
                        request.status === 'PENDING'
                    );

                    // Check if user is admin of this group
                    const isAdmin =
                      currentUser &&
                      priorityGroups.find((g) => g._id === suggestion._id)
                        ?.createdBy?._id === currentUser._id;

                    return (
                      <div
                        key={suggestion.id}
                        className='bg-white/80 rounded-xl p-4 hover:bg-white transition-all duration-300'
                      >
                        <div className='flex items-center gap-3'>
                          <div className='relative'>
                            <div
                              className={`w-12 h-12 ${
                                isAdmin
                                  ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
                              } rounded-xl flex items-center justify-center text-white text-lg font-bold`}
                            >
                              {suggestion.name?.charAt(0) || 'G'}
                            </div>
                            <div
                              className={`absolute -top-1 -right-1 ${
                                isAdmin
                                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
                              } rounded-full p-1`}
                            >
                              {isAdmin ? (
                                <Crown className='w-3 h-3 text-white' />
                              ) : (
                                <Brain className='w-3 h-3 text-white' />
                              )}
                            </div>
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2'>
                              <h3 className='font-semibold text-gray-900 text-sm'>
                                {suggestion.name}
                              </h3>
                              {isAdmin && (
                                <span className='px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-medium'>
                                  Admin
                                </span>
                              )}
                            </div>
                            <p className='text-xs text-gray-600 line-clamp-1'>
                              {suggestion.description}
                            </p>
                            <div className='flex items-center gap-2 mt-1'>
                              <p className='text-xs text-purple-600 flex items-center gap-1'>
                                <Sparkles className='w-3 h-3' />
                                {suggestion.reason}
                              </p>
                            </div>
                          </div>
                          {isAdmin ? (
                            <button className='px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium border border-yellow-200'>
                              <Crown className='w-3 h-3' />
                            </button>
                          ) : hasPendingRequest ? (
                            <button
                              disabled
                              className='px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium cursor-not-allowed border border-orange-200'
                            >
                              Đang chờ
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                sendJoinGroupRequest(suggestion._id)
                              }
                              className='px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300'
                            >
                              Tham gia
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20'>
            <div className='flex flex-wrap gap-1'>
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-white shadow-lg text-purple-600 border-purple-600 scale-105'
                        : 'text-gray-600 hover:bg-white/50'
                    }`}
                  >
                    <IconComponent className='w-4 h-4' />
                    <span>{tab.label}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        activeTab === tab.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search and Sort */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
            <div className='flex flex-col md:flex-row gap-4'>
              {/* Search */}
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Tìm kiếm theo tên nhóm, mô tả, người tạo, sở thích...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                />
              </div>

              {/* Sort Options */}
              <div className='flex gap-2'>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-700'
                >
                  {activeTab === 'discover' && (
                    <option value='compatibilityScore'>Điểm phù hợp</option>
                  )}
                  <option value='currentMemberCount'>Số thành viên</option>
                  <option value='name'>Tên A-Z</option>
                  <option value='createdAt'>Ngày tạo</option>
                </select>

                <button
                  onClick={() =>
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                  }
                  className='px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 bg-white'
                  title={sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
                >
                  {sortOrder === 'asc' ? (
                    <SortAsc className='w-5 h-5 text-gray-600' />
                  ) : (
                    <SortDesc className='w-5 h-5 text-gray-600' />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className='min-h-[400px]'>
          {filteredGroups.length === 0 ? (
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 text-center py-16'>
              <Users className='w-16 h-16 text-gray-300 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                {activeTab === 'discover'
                  ? 'Không tìm thấy nhóm học phù hợp'
                  : activeTab === 'createdGroups'
                  ? 'Bạn chưa tạo/quản lý nhóm nào'
                  : 'Bạn chưa là thành viên của nhóm nào'}
              </h3>
              <p className='text-gray-600 mb-6'>
                {activeTab === 'discover'
                  ? 'Thử điều chỉnh từ khóa tìm kiếm hoặc tạo nhóm mới'
                  : activeTab === 'createdGroups'
                  ? 'Hãy tạo nhóm học đầu tiên của bạn'
                  : 'Các nhóm mà bạn là thành viên (không phải admin) sẽ hiển thị ở đây'}
              </p>
              <div className='flex items-center justify-center gap-4'>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSortBy(
                      activeTab === 'discover'
                        ? 'compatibilityScore'
                        : 'createdAt'
                    );
                    setSortOrder('desc');
                  }}
                  className='px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium'
                >
                  Đặt lại
                </button>
                {(activeTab === 'myGroups' ||
                  activeTab === 'createdGroups') && (
                  <button
                    onClick={() => setActiveTab('discover')}
                    className='px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-medium flex items-center gap-2'
                  >
                    <Search className='w-4 h-4' />
                    Khám phá nhóm
                  </button>
                )}
                <button className='px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-medium flex items-center gap-2'>
                  <UserPlus className='w-4 h-4' />
                  Tạo nhóm mới
                </button>
              </div>
            </div>
          ) : (
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {filteredGroups.map((group) => (
                <GroupCard key={group._id} group={group} />
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredGroups.length > 0 && (
          <div className='text-center mt-8'>
            <button className='px-8 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-medium'>
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
