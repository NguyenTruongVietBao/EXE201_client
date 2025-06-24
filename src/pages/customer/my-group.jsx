import React, { useEffect, useState } from 'react';
import customerService from '../../services/customerService';
import interestServices from '../../services/interestServices';
import {
  Users,
  Plus,
  Search,
  Settings,
  Calendar,
  Crown,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  TrendingUp,
  Shield,
  X,
  ChevronDown,
  UserPlus,
  BarChart3,
  Activity,
  PlusCircle,
} from 'lucide-react';
import { formatJustDate } from '../../utils';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

export default function CustomerMyGroup() {
  const [myGroups, setMyGroups] = useState([]);
  const [groupStats, setGroupStats] = useState({
    totalJoinedGroups: 0,
    adminGroups: 0,
    createdGroups: 0,
    memberGroups: 0,
    recentGroups: [],
  });
  const [joinGroupRequests, setJoinGroupRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, groups, requests, create

  // Create Group Modal
  const [isModalCreateGroupOpen, setIsModalCreateGroupOpen] = useState(false);
  const [allInterests, setAllInterests] = useState([]);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    maxMembers: 100,
    interests: [],
  });
  const [showInterestsDropdown, setShowInterestsDropdown] = useState(false);

  // Search and Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, approved, rejected

  // Rejection Modal
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Fetch groups data
      const [groupsResponse, statsResponse, allInterestsResponse] =
        await Promise.all([
          customerService.getJoinedGroups(),
          customerService.getMyGroupStats(),
          interestServices.getAllInterests(),
        ]);

      // Filter only groups where user is admin/creator
      const myGroupsData = groupsResponse.data.groups.filter(
        (group) => group.userRole === 'ADMIN'
      );
      setMyGroups(myGroupsData);

      // Set stats from API response
      if (statsResponse.data) {
        setGroupStats(statsResponse.data);
      }

      setAllInterests(allInterestsResponse.data);

      // Fetch join requests for all my groups
      if (myGroupsData.length > 0) {
        const requestsPromises = myGroupsData.map((group) =>
          customerService.getJoinGroupRequests(group._id)
        );
        const requestsResponses = await Promise.all(requestsPromises);
        const allRequests = requestsResponses.flatMap(
          (response) => response.data || []
        );
        setJoinGroupRequests(allRequests);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setIsLoading(false);
    }
  };

  const createNewGroup = async () => {
    if (!newGroup.name.trim()) {
      toast.error('Vui lòng nhập tên nhóm');
      return;
    }
    if (!newGroup.description.trim()) {
      toast.error('Vui lòng nhập mô tả nhóm');
      return;
    }
    if (newGroup.interests.length === 0) {
      toast.error('Vui lòng chọn ít nhất 1 sở thích');
      return;
    }

    try {
      setIsLoading(true);
      const response = await customerService.createGroup({
        name: newGroup.name,
        description: newGroup.description,
        maxMembers: newGroup.maxMembers,
        interests: newGroup.interests.map((interest) => interest._id),
      });

      setMyGroups([...myGroups, { ...response.data, userRole: 'creator' }]);
      setIsModalCreateGroupOpen(false);
      setNewGroup({
        name: '',
        description: '',
        maxMembers: 100,
        interests: [],
      });
      toast.success('Tạo nhóm thành công!');
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error creating new group:', error);
      toast.error('Có lỗi xảy ra khi tạo nhóm');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRequest = async (requestId, action, rejectionReason = '') => {
    try {
      setIsLoading(true);
      await customerService.handleJoinGroupRequest(requestId, {
        action, // 'APPROVE' or 'REJECT'
        rejectionReason: action === 'REJECT' ? rejectionReason : undefined,
      });

      // Update local state
      setJoinGroupRequests((prev) =>
        prev.map((req) =>
          req._id === requestId
            ? { ...req, status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' }
            : req
        )
      );

      toast.success(
        action === 'APPROVE' ? 'Đã chấp nhận yêu cầu' : 'Đã từ chối yêu cầu'
      );
    } catch (error) {
      console.error('Error handling join request:', error);
      toast.error('Có lỗi xảy ra khi xử lý yêu cầu');
    } finally {
      setIsLoading(false);
    }
  };

  const addInterestToNewGroup = (interest) => {
    if (!newGroup.interests.find((i) => i._id === interest._id)) {
      setNewGroup({
        ...newGroup,
        interests: [...newGroup.interests, interest],
      });
    }
    setShowInterestsDropdown(false);
  };

  const removeInterestFromNewGroup = (interestId) => {
    setNewGroup({
      ...newGroup,
      interests: newGroup.interests.filter((i) => i._id !== interestId),
    });
  };

  const handleRejectRequest = async () => {
    try {
      setIsLoading(true);
      await handleJoinRequest(selectedRequestId, 'REJECT', rejectionReason);
      setIsRejectModalOpen(false);
      setSelectedRequestId('');
      setRejectionReason('');
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter requests
  const filteredRequests = joinGroupRequests.filter((request) => {
    const matchesSearch =
      request.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.userId?.email
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      request.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.groupId?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      request.groupId?.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || request.status === filterStatus.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'PENDING':
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className='w-4 h-4' />;
      case 'REJECTED':
        return <XCircle className='w-4 h-4' />;
      case 'PENDING':
      default:
        return <Clock className='w-4 h-4' />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: BarChart3, count: null },
    {
      id: 'groups',
      label: 'Nhóm của tôi',
      icon: Users,
      count: myGroups.length,
    },
    {
      id: 'requests',
      label: 'Yêu cầu tham gia',
      icon: UserPlus,
      count: joinGroupRequests.filter((r) => r.status === 'PENDING').length,
    },
  ];

  if (isLoading && myGroups.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20'>
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h1 className='text-4xl py-3 font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                  Quản lý nhóm 👑
                </h1>
                <p className='text-xl text-gray-600'>
                  Quản lý các nhóm bạn đã tạo và yêu cầu tham gia
                </p>
              </div>
              <button
                onClick={() => setIsModalCreateGroupOpen(true)}
                className='px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium flex items-center gap-2 shadow-lg'
              >
                <Plus className='w-5 h-5' />
                Tạo nhóm mới
              </button>
            </div>

            {/* Tabs */}
            <div className='flex flex-wrap gap-2'>
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-white shadow-lg text-purple-600 scale-105'
                        : 'text-gray-600 hover:bg-white/50'
                    }`}
                  >
                    <IconComponent className='w-4 h-4' />
                    <span>{tab.label}</span>
                    {tab.count !== null && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          activeTab === tab.id
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className='space-y-8'>
            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='p-3 bg-blue-100 rounded-xl'>
                    <Users className='w-6 h-6 text-blue-600' />
                  </div>
                  <TrendingUp className='w-5 h-5 text-green-500' />
                </div>
                <div className='space-y-1'>
                  <p className='text-2xl font-bold text-gray-900'>
                    {groupStats.totalJoinedGroups || 0}
                  </p>
                  <p className='text-sm text-gray-600'>Tổng nhóm tham gia</p>
                </div>
              </div>

              <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='p-3 bg-yellow-100 rounded-xl'>
                    <Crown className='w-6 h-6 text-yellow-600' />
                  </div>
                  <Activity className='w-5 h-5 text-blue-500' />
                </div>
                <div className='space-y-1'>
                  <p className='text-2xl font-bold text-gray-900'>
                    {groupStats.adminGroups || myGroups.length}
                  </p>
                  <p className='text-sm text-gray-600'>Nhóm là Admin</p>
                </div>
              </div>

              <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='p-3 bg-green-100 rounded-xl'>
                    <PlusCircle className='w-6 h-6 text-green-600' />
                  </div>
                  <Star className='w-5 h-5 text-yellow-500' />
                </div>
                <div className='space-y-1'>
                  <p className='text-2xl font-bold text-gray-900'>
                    {groupStats.createdGroups || myGroups.length}
                  </p>
                  <p className='text-sm text-gray-600'>Nhóm đã tạo</p>
                </div>
              </div>

              <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='p-3 bg-purple-100 rounded-xl'>
                    <UserPlus className='w-6 h-6 text-purple-600' />
                  </div>
                  <Clock className='w-5 h-5 text-orange-500' />
                </div>
                <div className='space-y-1'>
                  <p className='text-2xl font-bold text-gray-900'>
                    {
                      joinGroupRequests.filter((r) => r.status === 'PENDING')
                        .length
                    }
                  </p>
                  <p className='text-sm text-gray-600'>Yêu cầu chờ duyệt</p>
                </div>
              </div>
            </div>

            {/* Recent Groups */}
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20'>
              <div className='p-6 border-b border-gray-100'>
                <h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                  <Users className='w-6 h-6 text-purple-600' />
                  Nhóm gần đây
                </h3>
              </div>
              <div className='p-6'>
                {groupStats.recentGroups.slice(0, 3).length > 0 ? (
                  <div className='space-y-4'>
                    {groupStats.recentGroups.slice(0, 3).map((group) => (
                      <div
                        key={group._id}
                        className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'
                      >
                        <div className='flex items-center gap-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-lg font-bold'>
                            {group.name?.charAt(0) || 'G'}
                          </div>
                          <div>
                            <h4 className='font-semibold text-gray-900'>
                              {group.name} - ({group.members?.length || 0} thành
                              viên)
                            </h4>
                            <p className='text-sm text-gray-600'>
                              {group.description || 0} thành viên
                            </p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <span className='px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium'>
                            {group.userRole === 'ADMIN' ? 'Admin' : 'Member'}
                          </span>
                          <p className='text-xs text-gray-500 mt-1'>
                            {formatJustDate(group.updatedAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <Users className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                    <p className='text-gray-600'>Chưa có nhóm nào</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div className='space-y-6'>
            {/* Search */}
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Tìm kiếm nhóm...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                />
              </div>
            </div>

            {/* Groups Grid */}
            {myGroups.filter(
              (group) =>
                group.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                group.description
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase())
            ).length > 0 ? (
              <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {myGroups
                  .filter(
                    (group) =>
                      group.name
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      group.description
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((group) => (
                    <div
                      key={group._id}
                      className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'
                    >
                      <div className='p-6'>
                        {/* Header */}
                        <div className='flex items-start gap-4 mb-4'>
                          <div className='relative'>
                            <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold'>
                              {group.name?.charAt(0) || 'G'}
                            </div>
                            <div className='absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 border-2 border-white rounded-full flex items-center justify-center'>
                              <Star className='w-3 h-3 text-white' />
                            </div>
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h3 className='text-lg font-bold text-gray-900'>
                                {group.name}
                              </h3>
                              <span className='px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1'>
                                <Crown className='w-3 h-3' />
                                {group.userRole === 'creator'
                                  ? 'Creator'
                                  : 'Admin'}
                              </span>
                            </div>
                            <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
                              {group.description}
                            </p>
                            <div className='flex items-center gap-4 text-sm text-gray-500'>
                              <div className='flex items-center gap-1'>
                                <Users className='w-4 h-4' />
                                <span>
                                  {group.memberCount ||
                                    group.members?.length ||
                                    0}
                                </span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Shield className='w-4 h-4' />
                                <span>{group.maxMembers}</span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Calendar className='w-4 h-4' />
                                <span>{formatJustDate(group.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className='bg-gray-50 rounded-lg p-3 mb-4'>
                          <div className='grid grid-cols-3 gap-4 text-center'>
                            <div>
                              <p className='text-lg font-bold text-gray-900'>
                                {group.memberCount ||
                                  group.members?.length ||
                                  0}
                              </p>
                              <p className='text-xs text-gray-600'>
                                Thành viên
                              </p>
                            </div>
                            <div>
                              <p className='text-lg font-bold text-gray-900'>
                                {group.adminCount || 1}
                              </p>
                              <p className='text-xs text-gray-600'>Admin</p>
                            </div>
                            <div>
                              <p className='text-lg font-bold text-gray-900'>
                                {group.fillPercentage || 0}%
                              </p>
                              <p className='text-xs text-gray-600'>Đầy</p>
                            </div>
                          </div>
                        </div>

                        {/* Interests */}
                        {group.interests && group.interests.length > 0 && (
                          <div className='mb-4'>
                            <p className='text-xs text-gray-500 mb-2'>
                              Sở thích:
                            </p>
                            <div className='flex flex-wrap gap-1'>
                              {group.interests.slice(0, 3).map((interest) => (
                                <span
                                  key={interest._id}
                                  className='px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium flex items-center gap-1'
                                >
                                  <span>{interest.emoji}</span>
                                  <span>{interest.name}</span>
                                </span>
                              ))}
                              {group.interests.length > 3 && (
                                <span className='px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs'>
                                  +{group.interests.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className='flex items-center gap-2'>
                          <Link
                            to={`/customer/group/${group._id}`}
                            className='flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm font-medium text-center'
                          >
                            Xem chi tiết
                          </Link>
                          <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors'>
                            <Settings className='w-4 h-4 text-gray-600' />
                          </button>
                          <button className='p-2 bg-yellow-100 hover:bg-yellow-200 rounded-xl transition-colors'>
                            <Crown className='w-4 h-4 text-yellow-600' />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 text-center py-16'>
                <Users className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Chưa có nhóm nào
                </h3>
                <p className='text-gray-600 mb-6'>
                  Bạn chưa tạo nhóm nào. Hãy tạo nhóm đầu tiên của bạn!
                </p>
                <button
                  onClick={() => setIsModalCreateGroupOpen(true)}
                  className='px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium flex items-center gap-2 mx-auto'
                >
                  <Plus className='w-5 h-5' />
                  Tạo nhóm mới
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className='space-y-6'>
            {/* Search and Filter */}
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1 relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <input
                    type='text'
                    placeholder='Tìm kiếm theo tên, email, tin nhắn, nhóm...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className='px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-700'
                >
                  <option value='all'>Tất cả trạng thái</option>
                  <option value='pending'>Chờ duyệt</option>
                  <option value='approved'>Đã duyệt</option>
                  <option value='rejected'>Đã từ chối</option>
                </select>
              </div>
            </div>

            {/* Requests List */}
            {filteredRequests.length > 0 ? (
              <div className='space-y-4'>
                {filteredRequests.map((request) => (
                  <div
                    key={request._id}
                    className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'
                  >
                    {/* Request Header */}
                    <div className='bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b border-gray-100'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full'></div>
                          <h3 className='font-semibold text-gray-900'>
                            Yêu cầu tham gia nhóm
                          </h3>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {getStatusIcon(request.status)}
                            {request.status === 'APPROVED'
                              ? 'Đã duyệt'
                              : request.status === 'REJECTED'
                              ? 'Đã từ chối'
                              : 'Chờ duyệt'}
                          </span>
                          <span className='text-xs text-gray-500'>
                            {formatJustDate(request.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='p-4'>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-start gap-4 mb-4 w-1/2'>
                          {/* User Avatar */}
                          <img
                            src={
                              request.userId?.avatar ||
                              `https://api.dicebear.com/9.x/avataaars/svg?seed=${request.userId?.name}`
                            }
                            alt={request.userId?.name}
                            className='w-12 h-12 rounded-full border-2 border-gray-200'
                          />

                          {/* User Info */}
                          <div className='flex-1'>
                            <div className='flex items-start justify-between mb-2'>
                              <div>
                                <h4 className='font-semibold text-gray-900'>
                                  {request.userId?.name}
                                </h4>
                                <p className='text-sm text-gray-600'>
                                  {request.userId?.email}
                                </p>
                              </div>
                            </div>

                            {/* Message */}
                            <div className='bg-blue-50 rounded-lg p-3 mb-3'>
                              <p className='text-sm text-gray-700 flex items-start gap-2'>
                                <MessageSquare className='w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0' />
                                <span className='italic'>
                                  "{request.message}"
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* Group Info */}
                        {request.groupId && (
                          <div className='bg-gray-50 rounded-lg p-4 mb-4'>
                            <div className='flex items-start gap-3'>
                              <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold'>
                                {request.groupId.name?.charAt(0) || 'G'}
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-gray-900 mb-1'>
                                  {request.groupId.name}
                                </h5>
                                <p className='text-sm text-gray-600 mb-2'>
                                  {request.groupId.description}
                                </p>
                                <div className='flex items-center gap-4 text-xs text-gray-500'>
                                  <span className='flex items-center gap-1'>
                                    <Users className='w-3 h-3' />
                                    {request.groupId.members?.length || 0} thành
                                    viên
                                  </span>
                                  <span className='flex items-center gap-1'>
                                    <Crown className='w-3 h-3' />
                                    {request.groupId.members?.filter(
                                      (m) => m.isAdmin
                                    ).length || 0}{' '}
                                    admin
                                  </span>
                                  {request.groupId.interests && (
                                    <span className='flex items-center gap-1'>
                                      <Star className='w-3 h-3' />
                                      {request.groupId.interests.length} sở
                                      thích
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className='flex justify-start'>
                        {/* Rejection Reason */}
                        {request.status === 'REJECTED' &&
                          request.rejectionReason && (
                            <div className='bg-red-50 border border-red-200 rounded-lg p-3 mb-4'>
                              <div className='flex items-start gap-2'>
                                <XCircle className='w-4 h-4 text-red-500 mt-0.5 flex-shrink-0' />
                                <div>
                                  <p className='text-sm font-medium text-red-800 mb-1'>
                                    Lý do từ chối:
                                  </p>
                                  <p className='text-sm text-red-700'>
                                    {request.rejectionReason}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                        {/* Action Buttons */}
                        {request.status === 'PENDING' && (
                          <div className='flex items-center gap-3 pt-2 border-t border-gray-100 w-1/2'>
                            <button
                              onClick={() =>
                                handleJoinRequest(request._id, 'APPROVE')
                              }
                              disabled={isLoading}
                              className='flex-1 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-medium'
                            >
                              <CheckCircle className='w-4 h-4' />
                              Chấp nhận
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRequestId(request._id);
                                setIsRejectModalOpen(true);
                              }}
                              disabled={isLoading}
                              className='flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-medium'
                            >
                              <XCircle className='w-4 h-4' />
                              Từ chối
                            </button>
                          </div>
                        )}

                        {/* Approved/Rejected Status Message */}
                        {request.status !== 'PENDING' && (
                          <div
                            className={`text-center py-3 px-4 rounded-lg ${
                              request.status === 'APPROVED'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            <p className='text-sm font-medium'>
                              {request.status === 'APPROVED'
                                ? '✅ Yêu cầu đã được chấp nhận'
                                : '❌ Yêu cầu đã bị từ chối'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 text-center py-16'>
                <UserPlus className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Không có yêu cầu nào
                </h3>
                <p className='text-gray-600'>
                  Chưa có yêu cầu tham gia nhóm nào.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Create Group Modal */}
        {isModalCreateGroupOpen && (
          <div className='fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
              <div className='p-6 border-b border-gray-200'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-2xl font-bold text-gray-900'>
                    Tạo nhóm mới
                  </h3>
                  <button
                    onClick={() => setIsModalCreateGroupOpen(false)}
                    className='p-2 hover:bg-gray-100 rounded-xl transition-colors'
                  >
                    <X className='w-6 h-6 text-gray-500' />
                  </button>
                </div>
              </div>

              <div className='p-6 space-y-6'>
                {/* Group Name */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Tên nhóm *
                  </label>
                  <input
                    type='text'
                    value={newGroup.name}
                    onChange={(e) =>
                      setNewGroup({ ...newGroup, name: e.target.value })
                    }
                    placeholder='Ví dụ: ReactJS Việt Nam'
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                  />
                </div>

                {/* Description */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mô tả nhóm *
                  </label>
                  <textarea
                    value={newGroup.description}
                    onChange={(e) =>
                      setNewGroup({ ...newGroup, description: e.target.value })
                    }
                    placeholder='Mô tả về mục đích và hoạt động của nhóm...'
                    rows={4}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none'
                  />
                </div>

                {/* Max Members */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Số thành viên tối đa
                  </label>
                  <input
                    type='number'
                    value={newGroup.maxMembers}
                    onChange={(e) =>
                      setNewGroup({
                        ...newGroup,
                        maxMembers: parseInt(e.target.value) || 100,
                      })
                    }
                    min='2'
                    max='1000'
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                  />
                </div>

                {/* Interests */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Sở thích nhóm * (chọn ít nhất 1)
                  </label>

                  {/* Selected Interests */}
                  {newGroup.interests.length > 0 && (
                    <div className='flex flex-wrap gap-2 mb-3'>
                      {newGroup.interests.map((interest) => (
                        <span
                          key={interest._id}
                          className='px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2'
                        >
                          <span>{interest.emoji}</span>
                          <span>{interest.name}</span>
                          <button
                            onClick={() =>
                              removeInterestFromNewGroup(interest._id)
                            }
                            className='hover:bg-purple-200 rounded-full p-0.5'
                          >
                            <X className='w-3 h-3' />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Interest Dropdown */}
                  <div className='relative'>
                    <button
                      onClick={() =>
                        setShowInterestsDropdown(!showInterestsDropdown)
                      }
                      className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-left flex items-center justify-between'
                    >
                      <span className='text-gray-500'>Chọn sở thích...</span>
                      <ChevronDown className='w-5 h-5 text-gray-400' />
                    </button>

                    {showInterestsDropdown && (
                      <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto'>
                        {allInterests.map((interest) => (
                          <button
                            key={interest._id}
                            onClick={() => addInterestToNewGroup(interest)}
                            disabled={newGroup.interests.find(
                              (i) => i._id === interest._id
                            )}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                              newGroup.interests.find(
                                (i) => i._id === interest._id
                              )
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                            }`}
                          >
                            <span className='text-xl'>{interest.emoji}</span>
                            <span>{interest.name}</span>
                            {newGroup.interests.find(
                              (i) => i._id === interest._id
                            ) && (
                              <CheckCircle className='w-4 h-4 text-green-500 ml-auto' />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='p-6 border-t border-gray-200'>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={() => setIsModalCreateGroupOpen(false)}
                    className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium'
                  >
                    Hủy
                  </button>
                  <button
                    onClick={createNewGroup}
                    disabled={
                      isLoading ||
                      !newGroup.name.trim() ||
                      !newGroup.description.trim() ||
                      newGroup.interests.length === 0
                    }
                    className='flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                  >
                    {isLoading ? (
                      <>
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                        Đang tạo...
                      </>
                    ) : (
                      <>
                        <Plus className='w-5 h-5' />
                        Tạo nhóm
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reject Request Modal */}
        {isRejectModalOpen && (
          <div className='fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full'>
              <div className='p-6 border-b border-gray-200'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                    <XCircle className='w-6 h-6 text-red-500' />
                    Từ chối yêu cầu
                  </h3>
                  <button
                    onClick={() => {
                      setIsRejectModalOpen(false);
                      setSelectedRequestId('');
                      setRejectionReason('');
                    }}
                    className='p-2 hover:bg-gray-100 rounded-xl transition-colors'
                  >
                    <X className='w-5 h-5 text-gray-500' />
                  </button>
                </div>
              </div>

              <div className='p-6'>
                <p className='text-gray-600 mb-4'>
                  Bạn có chắc chắn muốn từ chối yêu cầu tham gia nhóm này? Vui
                  lòng nhập lý do từ chối để người dùng hiểu rõ hơn.
                </p>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Lý do từ chối (tùy chọn)
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder='Ví dụ: Nhóm đã đầy, không phù hợp với mục tiêu nhóm...'
                    rows={4}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none'
                  />
                  <p className='text-xs text-gray-500 mt-1'>
                    Nếu để trống, yêu cầu sẽ bị từ chối mà không có lý do cụ
                    thể.
                  </p>
                </div>
              </div>

              <div className='p-6 border-t border-gray-200'>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={() => {
                      setIsRejectModalOpen(false);
                      setSelectedRequestId('');
                      setRejectionReason('');
                    }}
                    className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium'
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleRejectRequest}
                    disabled={isLoading}
                    className='flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                  >
                    {isLoading ? (
                      <>
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                        Đang từ chối...
                      </>
                    ) : (
                      <>
                        <XCircle className='w-5 h-5' />
                        Từ chối yêu cầu
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
