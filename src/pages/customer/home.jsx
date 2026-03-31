import {
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  Brain,
  Clock,
  Gift,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import LoadingPage from '../../components/common/LoadingPage';
import chatServices from '../../services/chatServices';
import customerService from '../../services/customerService';
import interestServices from '../../services/interestServices';
import useAuthStore from '../../stores/useAuthStore';
import { formatCurrency } from '../../utils';

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
      conversation.participants.some((participant) => participant._id === userId)
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
          response.data.recommendedDocuments.items.filter((item) => item.matchPercentage === 100)
        );
        setRecommendStudyPartners(
          response.data.recommendedUsers.items.filter((item) => item.matchPercentage === 100)
        );
        setRecommendStudyGroups(
          response.data.recommendedGroups.items.filter((item) => item.matchPercentage === 100)
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
      icon: <Search className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      href: '/customer/documents',
    },
    {
      title: 'Tham gia nhóm',
      description: 'Kết nối cộng đồng học tập',
      icon: <Users className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      href: '/customer/groups',
    },
    {
      title: 'Tìm bạn học',
      description: 'Tìm đối tác học tập',
      icon: <UserPlus className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500',
      href: '/customer/partners',
    },
    {
      title: 'Kế hoạch học tập',
      description: 'Lập kế hoạch với AI',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      href: '/customer/study-plan',
    },
  ];

  if (loading) {
    return <LoadingPage message="Đang tải dữ liệu..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50 bg-mesh-gradient relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-blue-400/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-purple-400/20 rounded-full blur-[120px] animate-float" />

      <div className="container mx-auto px-4 md:px-8 py-8 relative z-10">
        {/* Header Welcome */}
        <section className="mb-12">
          <div className="lush-glass rounded-[--radius-extra] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 text-blue-700 rounded-full text-sm font-semibold mb-6 animate-bounce-[0.5s]">
                  <Sparkles className="w-4 h-4" />
                  <span>Cá nhân hóa cho bạn</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  Chào mừng trở lại, {user?.name?.split(' ')[0] || 'bạn'}! 👋
                </h1>
                <p className="text-xl text-gray-600/90 leading-relaxed mb-8 max-w-2xl">
                  Hành trình học tập chưa bao giờ dễ dàng hơn. Hệ thống AI đã sẵn sàng cùng bạn
                  chinh phục mục tiêu mới.
                </p>

                {user?.interests && (
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                      Sở thích:
                    </span>
                    {user.interests.map((interest) => (
                      <span
                        key={interest._id}
                        className="px-4 py-2 bg-white/60 backdrop-blur-md text-gray-700 rounded-xl text-sm font-semibold border border-white/40 shadow-sm hover:shadow-md transition-all hover:scale-105 flex items-center gap-2"
                      >
                        <span className="text-lg">{interest.emoji}</span>
                        {interest.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    className="group relative lush-glass rounded-[--radius-soft] p-6 text-left transition-all duration-500 hover:scale-[1.05] hover:-rotate-1 active:scale-95"
                  >
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:rotate-12 transition-transform duration-500`}
                    >
                      <div className="text-white">{action.icon}</div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-tight line-clamp-2">
                      {action.description}
                    </p>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Suggestions Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-200">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gợi ý từ AI</h2>
                <p className="text-gray-500 font-medium">
                  Riêng tư & cá nhân hóa cho lộ trình học tập của bạn
                </p>
              </div>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-100 to-transparent mx-8 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Document Recommend */}
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-gray-800 uppercase tracking-wider text-sm">
                    Tài liệu
                  </span>
                </div>
                <Link
                  to="documents"
                  className="text-blue-600 hover:scale-105 transition-transform flex items-center gap-1 text-sm font-bold"
                >
                  Tất cả <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
                {recommendDocuments.length > 0 ? (
                  recommendDocuments.map((doc) => (
                    <div
                      key={doc._id}
                      className="group lush-glass rounded-[--radius-soft] p-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    >
                      <div className="flex gap-4 mb-4">
                        <div className="relative w-20 h-24 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                          <img
                            src={
                              doc.imageUrls[0] ||
                              'https://api.dicebear.com/9.x/shapes/svg?seed=default'
                            }
                            alt={doc.title}
                            className="w-full h-full object-cover rounded-xl shadow-md border border-white/50"
                          />
                          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                            <div className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                              {Math.round(doc.matchPercentage)}%
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/customer/documents/${doc._id}`}
                            className="font-bold text-gray-900 text-md leading-tight hover:text-blue-600 transition-colors line-clamp-2 mb-2"
                          >
                            {doc.title}
                          </Link>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                              <User className="w-3 h-3 text-blue-600" />
                            </div>
                            <Link
                              to={`/customer/documents/author/${doc.author._id}`}
                              className="text-xs text-gray-500 font-medium hover:underline"
                            >
                              {doc.author.name}
                            </Link>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-md text-[10px] font-bold uppercase tracking-tighter">
                              {doc.sharedInterestsCount} sở thích chung
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-blue-600">
                            {doc.price === 0
                              ? 'Free'
                              : formatCurrency(doc.price * (1 - doc.discount / 100))}
                          </span>
                          {doc.discount > 0 && (
                            <span className="text-xs text-gray-400 line-through">
                              {formatCurrency(doc.price)}
                            </span>
                          )}
                        </div>
                        <Link
                          to={`/customer/documents/${doc._id}`}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            isDocumentEnrolled(doc._id)
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:shadow-blue-300'
                          }`}
                        >
                          {isDocumentEnrolled(doc._id) ? 'Đã sở hữu' : 'Xem ngay'}
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white/40 rounded-3xl border border-dashed border-gray-200">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-400 font-medium">Đang tìm tài liệu phù hợp...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Study Partners Recommend */}
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-gray-800 uppercase tracking-wider text-sm">
                    Bạn học
                  </span>
                </div>
                <Link
                  to="partners"
                  className="text-purple-600 hover:scale-105 transition-transform flex items-center gap-1 text-sm font-bold"
                >
                  Tất cả <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
                {recommendStudyPartners.length > 0 ? (
                  recommendStudyPartners.map((partner) => (
                    <div
                      key={partner._id}
                      className="lush-glass rounded-[--radius-soft] p-5 transition-all duration-300 hover:shadow-2xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative group">
                          <img
                            src={partner.avatar}
                            alt={partner.name}
                            className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                            {partner.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs font-bold text-green-600 mb-1">
                            <TrendingUp className="w-3 h-3" />
                            {Math.round(partner.matchPercentage)}% phù hợp
                          </div>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold">
                            <Brain className="w-3 h-3" />
                            {partner.sharedInterestsCount} sở thích chung
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleConnectPartner(partner._id)}
                          disabled={isUserConnected(partner._id)}
                          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            isUserConnected(partner._id)
                              ? 'bg-gray-50 text-gray-400'
                              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-100 hover:shadow-blue-200 hover:scale-[1.02]'
                          }`}
                        >
                          <UserPlus className="w-4 h-4" />
                          {isUserConnected(partner._id) ? 'Đã kết nối' : 'Kết nối'}
                        </button>
                        <Link
                          to="/customer/chat"
                          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-white border border-gray-100 text-gray-700 hover:bg-gray-50 transition-all"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Nhắn tin
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white/40 rounded-3xl border border-dashed border-gray-200">
                    <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-400 font-medium">Đang tìm bạn đồng hành...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Study Groups Recommend */}
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-gray-800 uppercase tracking-wider text-sm">
                    Nhóm học
                  </span>
                </div>
                <Link
                  to="/groups"
                  className="text-emerald-600 hover:scale-105 transition-transform flex items-center gap-1 text-sm font-bold"
                >
                  Tất cả <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
                {recommendStudyGroups.length > 0 ? (
                  recommendStudyGroups.map((group) => (
                    <div
                      key={group._id}
                      className="lush-glass rounded-[--radius-soft] p-5 transition-all duration-300 hover:shadow-2xl"
                    >
                      <div className="flex gap-4 mb-4">
                        <img
                          src={
                            group.imageUrl ||
                            'https://api.dicebear.com/9.x/initials/svg?seed=default'
                          }
                          alt={group.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-md line-clamp-1 mb-1">
                            {group.name}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {group.memberCount || 0}
                            </span>
                            <span className="flex items-center gap-1 text-blue-600">
                              <MessageSquare className="w-3 h-3" />
                              {group.newMessages || 0} mới
                            </span>
                          </div>
                        </div>
                        <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded-lg self-start">
                          {Math.round(group.matchPercentage)}%
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                        {group.description}
                      </p>
                      <button
                        onClick={() => handleJoinGroup(group._id)}
                        disabled={isGroupJoined(group._id)}
                        className={`w-full py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${
                          isGroupJoined(group._id)
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 hover:shadow-emerald-200'
                        }`}
                      >
                        {isGroupJoined(group._id) ? 'Thành viên' : 'Tham gia ngay'}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white/40 rounded-3xl border border-dashed border-gray-200">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-400 font-medium">Đang tìm nhóm phù hợp...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Content (Stats + Collections) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Personal Stats */}
            <section>
              <div className="lush-glass rounded-[--radius-extra] p-8 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Thống kê học tập
                  </h2>
                  <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Tuần này
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: 'Tài liệu',
                      value: userStats.documentsRead,
                      icon: <BookOpenCheck />,
                      color: 'text-blue-600',
                      bg: 'bg-blue-50',
                    },
                    {
                      label: 'Giờ học',
                      value: userStats.studyHours,
                      icon: <Clock />,
                      color: 'text-purple-600',
                      bg: 'bg-purple-50',
                    },
                    {
                      label: 'Nhóm học',
                      value: userStats.groupsJoined,
                      icon: <Users />,
                      color: 'text-emerald-600',
                      bg: 'bg-emerald-50',
                    },
                    {
                      label: 'Kết nối',
                      value: userStats.partnersConnected,
                      icon: <UserPlus />,
                      color: 'text-orange-600',
                      bg: 'bg-orange-50',
                    },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/50 border border-white/20 hover:shadow-lg transition-all"
                    >
                      <div
                        className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-sm`}
                      >
                        {React.cloneElement(stat.icon, { className: 'w-5 h-5' })}
                      </div>
                      <div className="text-2xl font-black text-gray-900 leading-none mb-1">
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* My Documents */}
              {enrolledDocuments.length > 0 && (
                <section>
                  <div className="lush-glass rounded-[--radius-extra] p-6 shadow-lg h-full">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <BookOpenCheck className="w-5 h-5 text-blue-600" />
                        Tài liệu của tôi
                      </h3>
                      <Link
                        to="/customer/my-document"
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        Tất cả
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {enrolledDocuments.slice(0, 3).map((doc) => (
                        <Link
                          key={doc._id}
                          to={`/customer/documents/${doc._id}`}
                          className="flex items-center gap-3 p-3 bg-white/40 rounded-2xl hover:bg-white/60 transition-colors border border-white/40"
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-gray-900 line-clamp-1">
                              {doc.title}
                            </p>
                            <p className="text-[10px] font-medium text-gray-400">
                              {doc.price === 0 ? 'Free' : formatCurrency(doc.price)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* My Groups */}
              {joinedGroups.length > 0 && (
                <section>
                  <div className="lush-glass rounded-[--radius-extra] p-6 shadow-lg h-full">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        Nhóm của tôi
                      </h3>
                      <Link
                        to="/customer/my-groups"
                        className="text-xs font-bold text-purple-600 hover:underline"
                      >
                        Tất cả
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {joinedGroups.slice(0, 3).map((group) => (
                        <Link
                          key={group._id}
                          to={`/customer/groups/${group._id}`}
                          className="flex items-center gap-3 p-3 bg-white/40 rounded-2xl hover:bg-white/60 transition-colors border border-white/40"
                        >
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                            <Users className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-gray-900 line-clamp-1">
                              {group.name}
                            </p>
                            <p className="text-[10px] font-medium text-gray-400">
                              {group.members?.length || 0} thành viên
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Right Sidebar (Study Plans + Offers) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Study Plans */}
            {/* <section>
              <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-xl font-black text-gray-900">Kế hoạch</h2>
                <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {studyPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="lush-glass rounded-[--radius-soft] p-6 shadow-lg relative group overflow-hidden"
                  >
                    {plan.isUrgent && (
                      <div className="absolute top-0 right-0 px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-xl">
                        Khẩn cấp
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {plan.aiGenerated && (
                          <div className="p-1.5 bg-purple-100 rounded-lg">
                            <Brain className="w-4 h-4 text-purple-600" />
                          </div>
                        )}
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">
                          {plan.title}
                        </h3>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
                        <span>Tiến độ</span>
                        <span className="text-blue-600">{plan.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden border border-white/50">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            plan.isUrgent
                              ? 'bg-gradient-to-r from-red-500 to-orange-500'
                              : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                          }`}
                          style={{ width: `${plan.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-tight">
                          {plan.dueDate}
                        </span>
                      </div>
                      <button className="px-4 py-2 bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all border border-blue-50">
                        Tiếp tục
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section> */}

            {/* Special Offer */}
            <section>
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-[--radius-extra] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight">Ưu đãi Pro</h3>
                  <p className="text-white/80 text-sm mb-6 leading-relaxed">
                    Trải nghiệm đầy đủ tính năng AI và tài liệu không giới hạn.
                  </p>
                  <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-xl hover:shadow-indigo-500/20">
                    Nâng cấp ngay
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
