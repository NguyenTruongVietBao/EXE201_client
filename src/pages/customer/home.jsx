import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Users,
  UserPlus,
  Star,
  Download,
  Eye,
  Plus,
  Clock,
  BookOpenCheck,
  ArrowRight,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Target,
  Brain,
  Bookmark,
  Search,
  Gift,
  User,
} from 'lucide-react';
import interestServices from '../../services/interestServices';
import { Link } from 'react-router';

export default function CustomerHome() {
  const [recommendDocuments, setRecommendDocuments] = useState([]);
  const [recommendStudyPartners, setRecommendStudyPartners] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendDocuments = async () => {
      try {
        const response = await interestServices.getRecommendData();
        setRecommendDocuments(response.data.recommendedDocuments.items);
        setRecommendStudyPartners(response.data.recommendedUsers.items);
        setUserInfo(response.data.userInfo);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendDocuments();
  }, []);

  // Mock data không liên quan đến gợi ý - giữ nguyên
  const featuredDocuments = [
    {
      id: 3,
      title: 'Giải tích 1 - Tóm tắt lý thuyết và bài tập',
      author: 'PGS.TS Võ Văn Cường',
      category: 'Toán học',
      rating: 4.7,
      downloads: 3421,
      views: 12890,
      price: '150.000 VNĐ',
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=giai-tich',
      tags: ['Giải tích', 'Toán cao cấp', 'Đại học'],
      isBestseller: true,
    },
    {
      id: 4,
      title: 'Tiếng Anh giao tiếp cho IT',
      author: 'Lê Minh Phương',
      category: 'Ngoại ngữ',
      rating: 4.6,
      downloads: 2156,
      views: 8743,
      price: 'Miễn phí',
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=english-it',
      tags: ['Tiếng Anh', 'IT', 'Giao tiếp'],
      isRecent: true,
    },
  ];

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
    documentsRead: 147,
    studyHours: 312,
    groupsJoined: 12,
    partnersConnected: 28,
    weeklyGoal: 20,
    weeklyProgress: 14,
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

  // Hàm helper để định dạng giá
  const formatPrice = (price, discount) => {
    if (price === 0) return 'Miễn phí';
    const discountedPrice = price * (1 - discount / 100);
    return `${discountedPrice.toLocaleString('vi-VN')} VNĐ`;
  };

  // Hàm helper để định dạng ngày
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 md:px-8 py-6'>
        {/* Header Welcome */}
        <section className='mb-8'>
          <div className='bg-white/70 backdrop-blur-lg rounded-3xl p-5 border border-white/20 shadow-xl'>
            <div className='flex flex-col md:flex-row items-center justify-around mb-6'>
              <div>
                <h1 className='text-3xl md:text-5xl md:mb-3 font-bold py-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  Chào mừng trở lại {userInfo?.name || 'bạn'}! 👋
                </h1>
                <p className='text-lg text-gray-600 max-w-2xl'>
                  Hành trình học tập của bạn tiếp tục với những gợi ý thông minh
                  từ AI
                </p>
                {userInfo?.interests && (
                  <div className='flex items-center gap-2 mt-3'>
                    <span className='text-sm text-gray-600'>
                      Sở thích của bạn:
                    </span>
                    <div className='flex gap-2'>
                      {userInfo.interests.map((interest) => (
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
                    <h3 className='text-sm font-bold text-gray-900 mb-1'>
                      {action.title}
                    </h3>
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
              <div className='flex items-center justify-between mb-4'>
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
              <div className='space-y-4'>
                {recommendDocuments.slice(0, 3).map((doc) => (
                  <div
                    key={doc._id}
                    className=' h-36 group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='flex flex-col items-center gap-2'>
                        <img
                          src={
                            doc.imageUrl[0] ||
                            'https://api.dicebear.com/9.x/shapes/svg?seed=default'
                          }
                          alt={doc.title}
                          className='w-20 h-20 rounded-lg object-cover'
                        />
                        <p className='text-xs text-gray-600 mb-2'>
                          bởi {doc.author.name}
                        </p>
                      </div>
                      <div className='flex-1 ml-4 justify-between'>
                        <div className='flex items-start justify-between'>
                          <h4 className='font-semibold text-gray-900 text-sm leading-tight'>
                            {doc.title}
                          </h4>
                          <div className='flex items-center gap-1'>
                            <span className='px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium'>
                              {Math.round(doc.matchPercentage)}% phù hợp
                            </span>
                          </div>
                        </div>
                        <div className='flex items-center gap-2 text-xs text-purple-600 my-1'>
                          <Brain className='w-3 h-3' />
                          <span>
                            {doc.sharedInterestsCount} /{' '}
                            {userInfo?.interests.length} sở thích
                          </span>
                        </div>
                        <div className='mt-2 mb-1'>
                          {doc.discount > 0 ? (
                            <span className='px-2 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium'>
                              -{doc.discount}%
                            </span>
                          ) : (
                            <span className='px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium'>
                              Miễn phí
                            </span>
                          )}
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='font-bold text-md text-blue-600'>
                            {formatPrice(doc.price, doc.discount)}
                            {doc.discount > 0 && doc.price > 0 && (
                              <span className='ml-1 text-xs text-gray-400 line-through font-semibold'>
                                {doc.price.toLocaleString('vi-VN')} VNĐ
                              </span>
                            )}
                          </span>
                          <button className='px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-sm font-medium'>
                            Chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
              <div className='space-y-4'>
                {recommendStudyPartners.map((partner) => (
                  <div
                    key={partner._id}
                    className='group relative h-36 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300'
                  >
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='relative'>
                        <img
                          src={partner.avatar}
                          alt={partner.name}
                          className='w-10 h-10 rounded-xl'
                        />
                        <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full' />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-bold text-gray-900 text-sm'>
                          {partner.name}
                        </h3>
                        <p className='text-xs text-gray-600'>
                          Tham gia từ {formatDate(partner.createdAt)}
                        </p>
                      </div>
                      <div className='text-right'>
                        <div
                          className={`text-xs font-bold px-2 py-1 rounded-full ${
                            partner.matchPercentage >= 90
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {Math.round(partner.matchPercentage)}% phù hợp
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 mb-3'>
                      <span className='text-xs text-gray-500'>
                        {partner.sharedInterestsCount} sở thích chung
                      </span>
                      <div className='flex items-center gap-1'>
                        <Brain className='w-3 h-3 text-purple-500' />
                        <span className='text-xs text-purple-600'>
                          AI gợi ý
                        </span>
                      </div>
                    </div>
                    <button className='w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-sm font-medium'>
                      Kết nối
                    </button>
                  </div>
                ))}
                {recommendStudyPartners.length === 0 && (
                  <div className='text-center py-8 text-gray-500'>
                    <Users className='w-12 h-12 mx-auto mb-3 opacity-50' />
                    <p>Chưa có gợi ý bạn học phù hợp</p>
                  </div>
                )}
              </div>
            </div>

            {/* Study Groups Recommend - Giữ nguyên mock data */}
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
              <div className='space-y-4'>
                <div className='bg-gray-50/50 rounded-xl p-4 hover:bg-white transition-all duration-300'>
                  <div className='flex items-start gap-3'>
                    <img
                      src='https://api.dicebear.com/9.x/initials/svg?seed=RVN'
                      alt='Cộng đồng React Việt Nam'
                      className='w-12 h-12 rounded-lg'
                    />
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <h4 className='font-semibold text-gray-900 text-sm'>
                          Cộng đồng React Việt Nam
                        </h4>
                        <div className='w-2 h-2 bg-green-400 rounded-full' />
                        <Sparkles className='w-3 h-3 text-purple-500' />
                      </div>
                      <p className='text-xs text-gray-600 mb-2 line-clamp-2'>
                        Chia sẻ kiến thức React, thảo luận dự án và tìm việc làm
                      </p>
                      <div className='flex items-center justify-between text-xs'>
                        <div className='flex items-center gap-3'>
                          <span className='text-gray-500'>1247 thành viên</span>
                          <span className='flex items-center gap-1 text-blue-600'>
                            <MessageSquare className='w-3 h-3' />
                            12 tin mới
                          </span>
                        </div>
                        <button className='px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium'>
                          Tham gia
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50/50 rounded-xl p-4 hover:bg-white transition-all duration-300'>
                  <div className='flex items-start gap-3'>
                    <img
                      src='https://api.dicebear.com/9.x/initials/svg?seed=AIVN'
                      alt='AI & Machine Learning VN'
                      className='w-12 h-12 rounded-lg'
                    />
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <h4 className='font-semibold text-gray-900 text-sm'>
                          AI & Machine Learning VN
                        </h4>
                        <div className='w-2 h-2 bg-green-400 rounded-full' />
                        <Sparkles className='w-3 h-3 text-purple-500' />
                      </div>
                      <p className='text-xs text-gray-600 mb-2 line-clamp-2'>
                        Học tập và nghiên cứu AI, ML cùng cộng đồng Việt Nam
                      </p>
                      <div className='flex items-center justify-between text-xs'>
                        <div className='flex items-center gap-3'>
                          <span className='text-gray-500'>892 thành viên</span>
                          <span className='flex items-center gap-1 text-blue-600'>
                            <MessageSquare className='w-3 h-3' />5 tin mới
                          </span>
                        </div>
                        <button className='px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium'>
                          Tham gia
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Content & Stats */}
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

            {/* Featured Documents */}
            <section>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Tài liệu nổi bật
                </h2>
                <button className='text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2'>
                  Xem tất cả <ArrowRight className='w-4 h-4' />
                </button>
              </div>
              <div className='space-y-4'>
                {featuredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group'
                  >
                    <div className='flex items-start gap-4'>
                      <img
                        src={doc.thumbnail}
                        alt={doc.title}
                        className='w-16 h-16 rounded-xl object-cover'
                      />
                      <div className='flex-1'>
                        <div className='flex items-start justify-between mb-2'>
                          <h3 className='text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors'>
                            {doc.title}
                          </h3>
                          <div className='flex items-center gap-2'>
                            {doc.isBestseller && (
                              <span className='px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1'>
                                <Star className='w-3 h-3 fill-current' />
                                Bán chạy
                              </span>
                            )}
                            {doc.isRecent && (
                              <span className='px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium'>
                                Mới cập nhật
                              </span>
                            )}
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                doc.price === 'Miễn phí'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {doc.price}
                            </span>
                          </div>
                        </div>
                        <p className='text-gray-600 text-sm mb-2'>
                          bởi {doc.author}
                        </p>
                        <div className='flex items-center gap-4 text-sm text-gray-500 mb-3'>
                          <div className='flex items-center gap-1'>
                            <Star className='w-4 h-4 text-yellow-400 fill-current' />
                            <span>{doc.rating}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Download className='w-4 h-4' />
                            <span>{doc.downloads}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Eye className='w-4 h-4' />
                            <span>{doc.views}</span>
                          </div>
                        </div>
                        <div className='flex items-center justify-between'>
                          <div className='flex gap-2'>
                            {doc.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className='px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs'
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className='flex items-center gap-2'>
                            <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300'>
                              <Bookmark className='w-4 h-4 text-gray-600' />
                            </button>
                            <button className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-sm font-medium'>
                              Xem tài liệu
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
