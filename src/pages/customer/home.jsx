import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Users,
  UserPlus,
  Plus,
  Clock,
  BookOpenCheck,
  ArrowRight,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Brain,
  Search,
  Gift,
  User,
} from 'lucide-react';
import interestServices from '../../services/interestServices';
import { Link } from 'react-router';
import useAuthStore from '../../stores/useAuthStore';
import { formatCurrency, formatDate } from '../../utils';
import LoadingPage from '../../components/common/LoadingPage';
import chatServices from '../../services/chatServices';
import customerService from '../../services/customerService';

export default function CustomerHome() {
  const [recommendDocuments, setRecommendDocuments] = useState([]);
  const [recommendStudyPartners, setRecommendStudyPartners] = useState([]);
  const [recommendStudyGroups, setRecommendStudyGroups] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [enrolledDocuments, setEnrolledDocuments] = useState([]);
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  // Helper functions to check status
  const isDocumentEnrolled = (docId) => {
    return enrolledDocuments.some((doc) => doc._id === docId);
  };

  const isUserConnected = (userId) => {
    return connectedUsers.some((conversation) =>
      conversation.participants.some(
        (participant) => participant._id === userId
      )
    );
  };

  const isGroupJoined = (groupId) => {
    return joinedGroups.some((group) => group._id === groupId);
  };

  // Handle connect with study partner
  const handleConnectPartner = async (partnerId) => {
    try {
      // TODO: Implement connect partner API call
      console.log('Connecting with partner:', partnerId);
      // After successful connection, refresh connectedUsers data
      const response = await chatServices.getConversations();
      setConnectedUsers(response.data || []);
    } catch (error) {
      console.error('Error connecting with partner:', error);
    }
  };

  // Handle join study group
  const handleJoinGroup = async (groupId) => {
    try {
      // TODO: Implement join group API call
      console.log('Joining group:', groupId);
      // After successful join, refresh joinedGroups data
      const response = await customerService.getJoinedGroups();
      setJoinedGroups(response.data.groups || []);
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  useEffect(() => {
    const fetchRecommendData = async () => {
      try {
        const response = await interestServices.getRecommendData();

        setRecommendDocuments(
          response.data.recommendedDocuments.items.filter(
            (item) => item.matchPercentage === 100
          )
        );
        setRecommendStudyPartners(
          response.data.recommendedUsers.items.filter(
            (item) => item.matchPercentage === 100
          )
        );
        setRecommendStudyGroups(
          response.data.recommendedGroups.items.filter(
            (item) => item.matchPercentage === 100
          )
        );
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchUserConnected = async () => {
      const response = await chatServices.getConversations();
      setConnectedUsers(response.data || []);
    };
    const fetchEnrolledDocuments = async () => {
      const response = await customerService.getMyEnrolledDocuments();
      setEnrolledDocuments(response.data || []);
    };
    const fetchJoinedGroups = async () => {
      const response = await customerService.getJoinedGroups();
      setJoinedGroups(response.data.groups || []);
    };
    fetchJoinedGroups();
    fetchEnrolledDocuments();
    fetchUserConnected();
    fetchRecommendData();
  }, []);

  const studyPlans = [
    {
      id: 1,
      title: 'Làm chủ React trong 3 tháng',
      progress: 68,
      totalTasks: 15,
      completedTasks: 10,
      dueDate: '15/02/2024',
      category: 'Lập trình',
      aiGenerated: true,
      nextTask: 'Học về React Hooks',
    },
    {
      id: 2,
      title: 'Chuẩn bị thi cuối kỳ Giải tích',
      progress: 42,
      totalTasks: 12,
      completedTasks: 5,
      dueDate: '20/01/2024',
      category: 'Toán học',
      aiGenerated: false,
      nextTask: 'Ôn tập chương 3',
      isUrgent: true,
    },
  ];

  const userStats = {
    documentsRead: enrolledDocuments.length,
    studyHours: 312, // Keep static for now
    groupsJoined: joinedGroups.length,
    partnersConnected: connectedUsers.length,
    weeklyGoal: 20, // Keep static for now
    weeklyProgress: 14, // Keep static for now
  };

  const quickActions = [
    {
      title: 'Tìm tài liệu',
      description: 'Khám phá thư viện phong phú',
      icon: <Search className='w-6 h-6' />,
      color: 'from-blue-500 to-cyan-500',
      href: '/customer/documents',
    },
    {
      title: 'Tham gia nhóm',
      description: 'Kết nối cộng đồng học tập',
      icon: <Users className='w-6 h-6' />,
      color: 'from-purple-500 to-pink-500',
      href: '/customer/groups',
    },
    {
      title: 'Tìm bạn học',
      description: 'Tìm đối tác học tập',
      icon: <UserPlus className='w-6 h-6' />,
      color: 'from-emerald-500 to-teal-500',
      href: '/customer/partners',
    },
    {
      title: 'Kế hoạch học tập',
      description: 'Lập kế hoạch với AI',
      icon: <Brain className='w-6 h-6' />,
      color: 'from-orange-500 to-red-500',
      href: '/customer/study-plan',
    },
  ];

  if (loading) {
    return <LoadingPage message='Đang tải dữ liệu...' />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 md:px-8 py-6'>
        {/* Header Welcome */}
        <section className='mb-8'>
          <div className='bg-white/70 backdrop-blur-lg rounded-3xl p-5 border border-white/20 shadow-xl'>
            <div className='flex flex-col md:flex-row items-center justify-around mb-6'>
              <div>
                <h1 className='text-3xl md:text-5xl md:mb-3 font-bold py-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  Chào mừng trở lại {user?.name || 'bạn'}! 👋
                </h1>
                <p className='text-lg text-gray-600 max-w-2xl'>
                  Hành trình học tập của bạn tiếp tục với những gợi ý thông minh
                  từ AI
                </p>
                {user?.interests && (
                  <div className='flex items-center gap-2 mt-3'>
                    <span className='text-sm text-gray-600'>
                      Sở thích của bạn:
                    </span>
                    <div className='flex gap-2'>
                      {user.interests.map((interest) => (
                        <span
                          key={interest._id}
                          className='px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium flex items-center gap-1'
                        >
                          <span>{interest.emoji}</span>
                          {interest.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className='grid grid-cols-2 gap-10'>
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    className='group relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 px-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-white/30'
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className='text-white'>{action.icon}</div>
                    </div>
                    <Link
                      to={action.href}
                      className='text-sm font-bold text-gray-900 mb-1'
                    >
                      {action.title}
                    </Link>
                    <p className='text-xs text-gray-600'>
                      {action.description}
                    </p>
                    <ArrowRight className='absolute top-3 right-3 w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Suggestions Section */}
        <section className='mb-8'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full'>
              <Sparkles className='w-5 h-5 text-purple-600' />
              <span className='text-purple-700 font-semibold'>Gợi ý từ AI</span>
            </div>
            <p className='text-gray-600'>
              Được cá nhân hóa dựa trên sở thích của bạn
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
            {/* Document Recommend */}
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                  <BookOpen className='w-5 h-5 text-blue-600' />
                  Tài liệu dành cho bạn
                </h3>
                <Link
                  to='documents'
                  className='text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2'
                >
                  Xem thêm <ArrowRight className='w-4 h-4' />
                </Link>
              </div>
              <div className='space-y-4 overflow-y-auto h-[600px]'>
                {recommendDocuments.length > 0 ? (
                  recommendDocuments.map((doc) => (
                    <div
                      key={doc._id}
                      className='group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300'
                    >
                      <div className='flex items-start gap-3 mb-2'>
                        {/* Avatar và Author */}
                        <div className='flex flex-col items-center flex-shrink-0 mr-2'>
                          <img
                            src={
                              doc.imageUrls[0] ||
                              'https://api.dicebear.com/9.x/shapes/svg?seed=default'
                            }
                            alt={doc.author.name}
                            className='w-16 h-12 rounded-lg object-cover border-2 border-gray-200'
                          />
                          {/* Author Info */}
                          <p className='text-xs text-gray-600 mb-2'>
                            bởi{' '}
                            <Link
                              to={`/customer/documents/author/${doc.author._id}`}
                              className='text-blue-600 font-semibold hover:underline'
                            >
                              {doc.author.name}
                            </Link>
                          </p>
                        </div>

                        {/* Content */}
                        <div className='flex-1 min-w-0 space-y-1'>
                          {/* Title và Match Percentage */}
                          <div className='flex items-start justify-between gap-2'>
                            <Link
                              to={`/customer/documents/${doc._id}`}
                              className='font-semibold text-gray-900 text-sm leading-tight hover:text-blue-600 transition-colors line-clamp-2'
                            >
                              {doc.title}
                            </Link>
                            <div className='text-right flex-shrink-0'>
                              <div className='px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium'>
                                {Math.round(doc.matchPercentage)}% phù hợp
                              </div>
                            </div>
                          </div>
                          <div className='flex items-center gap-2 text-xs text-gray-600'>
                            <span>Đăng lúc {formatDate(doc.createdAt)}</span>
                          </div>
                          {/* Interests */}
                          <div className='flex items-center gap-2 text-xs text-purple-600'>
                            <Brain className='w-3 h-3 flex-shrink-0' />
                            <span>
                              {doc.sharedInterestsCount} /{' '}
                              {user?.interests?.length || 0} sở thích chung
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price và Action */}
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          {doc.discount > 0 ? (
                            <span className='px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium'>
                              -{doc.discount}%
                            </span>
                          ) : doc.price === 0 ? (
                            <span className='px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium'>
                              Miễn phí
                            </span>
                          ) : (
                            <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium'>
                              Premium
                            </span>
                          )}
                          <span className='font-bold text-md text-blue-600'>
                            {doc.price === 0
                              ? ''
                              : doc.discount > 0
                              ? formatCurrency(
                                  doc.price * (1 - doc.discount / 100)
                                )
                              : formatCurrency(doc.price)}
                          </span>
                        </div>
                        {isDocumentEnrolled(doc._id) ? (
                          <Link
                            to={`/customer/documents/${doc._id}`}
                            className='px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-xs font-medium flex items-center gap-1'
                          >
                            <BookOpenCheck className='w-3 h-3' />
                            Đã sở hữu
                          </Link>
                        ) : (
                          <Link
                            to={`/customer/documents/${doc._id}`}
                            className='px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-xs font-medium'
                          >
                            Chi tiết
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center py-8 text-gray-500'>
                    <BookOpen className='w-12 h-12 mx-auto mb-3 opacity-50' />
                    <p>Chưa có gợi ý tài liệu phù hợp</p>
                    <p className='text-xs mt-1'>
                      Hệ thống sẽ cập nhật khi có tài liệu mới
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Study Partners Recommend */}
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                  <User className='w-5 h-5 text-purple-600' />
                  Bạn học gợi ý
                </h3>
                <Link
                  to='partners'
                  className='text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2'
                >
                  Xem thêm <ArrowRight className='w-4 h-4' />
                </Link>
              </div>
              <div className='space-y-4 overflow-y-auto h-[600px]'>
                {recommendStudyPartners.length > 0 ? (
                  recommendStudyPartners.map((partner) => (
                    <div
                      key={partner._id}
                      className='group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300'
                    >
                      <div className='flex items-start gap-3 mb-3'>
                        <div className='relative flex-shrink-0'>
                          <img
                            src={partner.avatar}
                            alt={partner.name}
                            className='w-12 h-12 rounded-full object-cover border-2 border-gray-200'
                          />
                          <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-start justify-between gap-2'>
                            <h3 className='font-semibold text-gray-900 text-sm line-clamp-1'>
                              {partner.name}
                            </h3>
                            <div className='text-right flex-shrink-0'>
                              <div
                                className={`text-xs font-medium px-2 py-1 rounded-lg ${
                                  partner.matchPercentage >= 90
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {Math.round(partner.matchPercentage)}% phù hợp
                              </div>
                            </div>
                          </div>
                          <p className='text-xs text-gray-600 mb-2 line-clamp-1'>
                            Tham gia từ {formatDate(partner.createdAt)}
                          </p>
                          <div className='flex items-center gap-2 text-xs text-purple-600'>
                            <Brain className='w-3 h-3 flex-shrink-0' />
                            <span>
                              {partner.sharedInterestsCount} /{' '}
                              {user?.interests?.length || 0} sở thích
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center justify-between'>
                        {isUserConnected(partner._id) ? (
                          <Link
                            to='/customer/chat'
                            className='w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 text-xs font-medium flex items-center justify-center gap-1'
                          >
                            <MessageSquare className='w-3 h-3' />
                            Nhắn tin
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleConnectPartner(partner._id)}
                            className='w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-xs font-medium'
                          >
                            Kết nối
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center py-8 text-gray-500'>
                    <User className='w-12 h-12 mx-auto mb-3 opacity-50' />
                    <p>Chưa có gợi ý bạn học phù hợp</p>
                    <p className='text-xs mt-1'>
                      Hệ thống sẽ tìm kiếm bạn học phù hợp
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Study Groups Recommend */}
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                  <Users className='w-5 h-5 text-purple-600' />
                  Nhóm học phù hợp
                </h3>
                <Link
                  to='/groups'
                  className='text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2'
                >
                  Xem thêm <ArrowRight className='w-4 h-4' />
                </Link>
              </div>
              <div className='space-y-4 overflow-y-auto h-[600px]'>
                {recommendStudyGroups.length > 0 ? (
                  recommendStudyGroups.map((group) => (
                    <div
                      key={group._id}
                      className='group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300'
                    >
                      <div className='flex items-start gap-3'>
                        <div className='relative flex-shrink-0'>
                          <img
                            src={
                              group.imageUrl ||
                              'https://api.dicebear.com/9.x/initials/svg?seed=default'
                            }
                            alt={group.name}
                            className='w-12 h-12 rounded-lg object-cover border-2 border-gray-200'
                          />
                          <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-start justify-between gap-2 mb-2'>
                            <h4 className='font-semibold text-gray-900 text-sm line-clamp-1'>
                              {group.name}
                            </h4>
                            <div className='text-right flex-shrink-0'>
                              <div className='px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium'>
                                {Math.round(group.matchPercentage)}% phù hợp
                              </div>
                            </div>
                          </div>
                          <p className='text-xs text-gray-600 mb-2 line-clamp-2'>
                            {group.description}
                          </p>
                          <div className='flex items-center gap-2 text-xs text-purple-600 mb-3'>
                            <Brain className='w-3 h-3 flex-shrink-0' />
                            <span>
                              {group.sharedInterestsCount || 3} /{' '}
                              {user?.interests?.length || 0} sở thích
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3 text-xs'>
                          <span className='text-gray-500'>
                            {group.memberCount || 0} thành viên
                          </span>
                          <span className='flex items-center gap-1 text-blue-600'>
                            <MessageSquare className='w-3 h-3' />
                            {group.newMessages || 0} tin mới
                          </span>
                        </div>
                        {isGroupJoined(group._id) ? (
                          <Link
                            to={`/customer/groups/${group._id}`}
                            className='px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-xs font-medium flex items-center gap-1'
                          >
                            <Users className='w-3 h-3' />
                            Đã tham gia
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleJoinGroup(group._id)}
                            className='px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-xs font-medium'
                          >
                            Tham gia
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center py-8 text-gray-500'>
                    <Users className='w-12 h-12 mx-auto mb-3 opacity-50' />
                    <p>Chưa có gợi ý nhóm học phù hợp</p>
                    <p className='text-xs mt-1'>
                      Hệ thống sẽ cập nhật khi có nhóm mới
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Sidebar */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Personal Stats */}
            <section>
              <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20'>
                <h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                  <TrendingUp className='w-5 h-5 text-green-600' />
                  Thống kê học tập của bạn
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-3'>
                      <BookOpenCheck className='w-6 h-6 text-blue-600' />
                    </div>
                    <div className='text-2xl font-bold text-gray-900 mb-1'>
                      {userStats.documentsRead}
                    </div>
                    <div className='text-xs text-gray-600'>Tài liệu đã đọc</div>
                  </div>
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-3'>
                      <Clock className='w-6 h-6 text-purple-600' />
                    </div>
                    <div className='text-2xl font-bold text-gray-900 mb-1'>
                      {userStats.studyHours}
                    </div>
                    <div className='text-xs text-gray-600'>Giờ học tập</div>
                  </div>
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mx-auto mb-3'>
                      <Users className='w-6 h-6 text-emerald-600' />
                    </div>
                    <div className='text-2xl font-bold text-gray-900 mb-1'>
                      {userStats.groupsJoined}
                    </div>
                    <div className='text-xs text-gray-600'>
                      Nhóm đã tham gia
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mx-auto mb-3'>
                      <UserPlus className='w-6 h-6 text-orange-600' />
                    </div>
                    <div className='text-2xl font-bold text-gray-900 mb-1'>
                      {userStats.partnersConnected}
                    </div>
                    <div className='text-xs text-gray-600'>Bạn đã kết nối</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className='space-y-6'>
            {/* Study Plans */}
            <section>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-bold text-gray-900'>
                  Kế hoạch học tập
                </h2>
                <button className='p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300'>
                  <Plus className='w-4 h-4' />
                </button>
              </div>
              <div className='space-y-4'>
                {studyPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className='bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20'
                  >
                    <div className='flex items-start justify-between mb-3'>
                      <h3 className='font-bold text-gray-900 text-sm leading-tight'>
                        {plan.title}
                      </h3>
                      <div className='flex items-center gap-1'>
                        {plan.aiGenerated && (
                          <Brain className='w-3 h-3 text-purple-500' />
                        )}
                        {plan.isUrgent && (
                          <Clock className='w-3 h-3 text-red-500' />
                        )}
                      </div>
                    </div>
                    <div className='mb-3'>
                      <div className='flex items-center justify-between text-xs text-gray-600 mb-1'>
                        <span>Tiến độ: {plan.progress}%</span>
                        <span>
                          {plan.completedTasks}/{plan.totalTasks} nhiệm vụ
                        </span>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            plan.isUrgent
                              ? 'bg-gradient-to-r from-red-500 to-orange-500'
                              : 'bg-gradient-to-r from-blue-500 to-purple-500'
                          }`}
                          style={{ width: `${plan.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className='text-xs text-gray-600 mb-2'>
                      <span className='font-medium'>Tiếp theo:</span>{' '}
                      {plan.nextTask}
                    </div>
                    <div className='flex items-center justify-between text-xs'>
                      <span
                        className={`${
                          plan.isUrgent
                            ? 'text-red-600 font-medium'
                            : 'text-gray-500'
                        }`}
                      >
                        Hạn: {plan.dueDate}
                      </span>
                      <button className='px-2 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-300 font-medium'>
                        Tiếp tục
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* My Documents */}
            {enrolledDocuments.length > 0 && (
              <section>
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20'>
                  <h3 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                    <BookOpenCheck className='w-4 h-4 text-blue-600' />
                    Tài liệu của tôi ({enrolledDocuments.length})
                  </h3>
                  <div className='space-y-2 max-h-32 overflow-y-auto'>
                    {enrolledDocuments.slice(0, 3).map((doc) => (
                      <Link
                        key={doc._id}
                        to={`/customer/documents/${doc._id}`}
                        className='block p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200'
                      >
                        <p className='text-sm font-medium text-gray-900 line-clamp-1'>
                          {doc.title}
                        </p>
                        <p className='text-xs text-gray-600'>
                          {doc.price === 0
                            ? 'Miễn phí'
                            : formatCurrency(doc.price)}
                        </p>
                      </Link>
                    ))}
                  </div>
                  {enrolledDocuments.length > 3 && (
                    <Link
                      to='/customer/my-document'
                      className='block text-center text-sm text-blue-600 hover:text-blue-700 mt-2 font-medium'
                    >
                      Xem tất cả ({enrolledDocuments.length})
                    </Link>
                  )}
                </div>
              </section>
            )}

            {/* My Groups */}
            {joinedGroups.length > 0 && (
              <section>
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20'>
                  <h3 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                    <Users className='w-4 h-4 text-purple-600' />
                    Nhóm của tôi ({joinedGroups.length})
                  </h3>
                  <div className='space-y-2 max-h-32 overflow-y-auto'>
                    {joinedGroups.slice(0, 3).map((group) => (
                      <Link
                        key={group._id}
                        to={`/customer/groups/${group._id}`}
                        className='block p-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200'
                      >
                        <p className='text-sm font-medium text-gray-900 line-clamp-1'>
                          {group.name}
                        </p>
                        <p className='text-xs text-gray-600'>
                          {group.members?.length || 0} thành viên
                        </p>
                      </Link>
                    ))}
                  </div>
                  {joinedGroups.length > 3 && (
                    <Link
                      to='/customer/my-group'
                      className='block text-center text-sm text-purple-600 hover:text-purple-700 mt-2 font-medium'
                    >
                      Xem tất cả ({joinedGroups.length})
                    </Link>
                  )}
                </div>
              </section>
            )}

            {/* Quick Links */}
            <section>
              <div className='bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-4 border border-blue-200'>
                <h3 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <Gift className='w-4 h-4 text-purple-600' />
                  Ưu đãi đặc biệt
                </h3>
                <p className='text-sm text-gray-700 mb-3'>
                  Miễn phí tài liệu premium trong 7 ngày đầu!
                </p>
                <button className='w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm font-medium'>
                  Nhận ngay
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
