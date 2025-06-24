import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import {
  FileText,
  DollarSign,
  TrendingUp,
  Wallet,
  ShoppingCart,
  Clock,
  AlertCircle,
  Star,
  MessageSquare,
  Download,
  CreditCard,
  Users,
  Activity,
  BookOpen,
  User,
  Mail,
  Phone,
  Building,
  Shield,
  Calendar,
  Eye,
  Heart,
  Award,
  Target,
  Zap,
  TrendingDown,
  Plus,
  ArrowRight,
  CheckCircle,
  XCircle,
  Timer,
} from 'lucide-react';
import sellerServices from '../../services/sellerServices';
import useAuthStore from '../../stores/useAuthStore';
import LoadingPage from '../../components/common/LoadingPage';
import ErrorStats from '../../components/common/ErrorStats';
import { Link } from 'react-router';

export default function SellerHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchSellerStats = async () => {
      try {
        setLoading(true);
        const response = await sellerServices.getSellerStatistic();
        console.log('🚀 ~ fetchSellerStats ~ response:', response);
        setStats(response.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSellerStats();
  }, []);

  if (loading) {
    return <LoadingPage message='Đang tải dữ liệu cho Seller...' />;
  }

  if (!stats) {
    return <ErrorStats message='Không thể tải dữ liệu' />;
  }

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const StatCard = ({
    title,
    value,
    // eslint-disable-next-line no-unused-vars
    IconComponent,
    bgGradient,
    iconBg,
    textColor,
    subtitle,
    trend,
    onClick,
  }) => (
    <div
      className={`${bgGradient} rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/20 backdrop-blur-sm cursor-pointer group relative overflow-hidden`}
      onClick={onClick}
    >
      <div className='absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      <div className='relative z-10'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <p className='text-white/80 font-medium mb-2 text-sm uppercase tracking-wide'>
              {title}
            </p>
            <p className={`text-3xl font-bold ${textColor} mb-1`}>{value}</p>
            {subtitle && <p className='text-white/70 text-xs'>{subtitle}</p>}
            {trend && (
              <div className='flex items-center mt-2'>
                {trend > 0 ? (
                  <TrendingUp className='h-4 w-4 text-green-300 mr-1' />
                ) : (
                  <TrendingDown className='h-4 w-4 text-red-300 mr-1' />
                )}
                <span className='text-white/80 text-xs'>
                  {trend > 0 ? '+' : ''}
                  {trend}%
                </span>
              </div>
            )}
          </div>
          <div
            className={`p-4 rounded-2xl ${iconBg} backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300`}
          >
            <IconComponent className='h-8 w-8 text-white' />
          </div>
        </div>
      </div>
    </div>
  );

  // Data for charts
  const documentStatusData = [
    {
      name: 'Đã duyệt',
      value: stats?.overview?.approvedDocuments || 0,
      color: '#10B981',
    },
    {
      name: 'Chờ duyệt',
      value: stats?.overview?.pendingDocuments || 0,
      color: '#F59E0B',
    },
    {
      name: 'Từ chối',
      value: stats?.overview?.rejectedDocuments || 0,
      color: '#EF4444',
    },
  ];

  const walletData = [
    {
      name: 'Khả dụng',
      value: stats?.wallet?.availableBalance || 0,
      color: '#10B981',
    },
    {
      name: 'Chờ xử lý',
      value: stats?.wallet?.pendingBalance || 0,
      color: '#F59E0B',
    },
  ];

  const performanceData = [
    { name: 'Tài liệu', value: stats?.overview?.totalDocuments || 0 },
    { name: 'Bán được', value: stats?.overview?.totalSales || 0 },
    { name: 'Đánh giá', value: stats?.overview?.totalFeedbacks || 0 },
    { name: 'Rating', value: (stats?.overview?.averageRating || 0) * 20 },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 sm:px-6 py-8 max-w-7xl'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <div className='inline-block'>
            <h1 className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent mb-4'>
              Dashboard Seller
            </h1>
            <div className='h-1 w-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full'></div>
          </div>
          {user && (
            <div className='mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
              <img
                src={user.avatar || '/api/placeholder/64/64'}
                alt={user.name}
                className='w-16 h-16 rounded-full border-4 border-white shadow-lg'
              />
              <div className='text-center sm:text-left'>
                <p className='text-2xl font-bold text-gray-800'>
                  Chào mừng, {user.name}!
                </p>
                <p className='text-gray-600'>{user.email}</p>
                <div className='flex items-center justify-center sm:justify-start mt-2 space-x-4'>
                  <div className='flex items-center space-x-1'>
                    <Shield className='h-4 w-4 text-green-500' />
                    <span className='text-xs text-green-600'>
                      {user.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                    </span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user.isBanned ? 'bg-red-500' : 'bg-green-500'
                      }`}
                    ></div>
                    <span className='text-xs text-gray-600'>
                      {user.isBanned ? 'Bị cấm' : 'Hoạt động'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8'>
          <StatCard
            title='Tổng tài liệu'
            value={formatNumber(stats?.overview?.totalDocuments)}
            IconComponent={FileText}
            bgGradient='bg-gradient-to-br from-blue-500 to-blue-700'
            iconBg='bg-blue-400/30'
            textColor='text-white'
            subtitle={`${stats?.overview?.approvedDocuments || 0} đã duyệt`}
          />

          <StatCard
            title='Tổng bán'
            value={formatNumber(stats?.overview?.totalSales)}
            IconComponent={ShoppingCart}
            bgGradient='bg-gradient-to-br from-emerald-500 to-green-700'
            iconBg='bg-emerald-400/30'
            textColor='text-white'
            subtitle={`${stats?.overview?.periodSales || 0} trong kỳ`}
          />

          <StatCard
            title='Doanh thu'
            value={formatCurrency(stats?.overview?.totalRevenue)}
            IconComponent={DollarSign}
            bgGradient='bg-gradient-to-br from-purple-500 to-indigo-700'
            iconBg='bg-purple-400/30'
            textColor='text-white'
            subtitle={`${formatCurrency(
              stats?.overview?.periodRevenue
            )} kỳ này`}
          />

          <StatCard
            title='Số dư khả dụng'
            value={formatCurrency(stats?.wallet?.availableBalance)}
            IconComponent={Wallet}
            bgGradient='bg-gradient-to-br from-orange-500 to-red-600'
            iconBg='bg-orange-400/30'
            textColor='text-white'
            subtitle='Có thể rút ngay'
          />
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer group'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-xl font-bold mb-2'>Tạo tài liệu mới</h3>
                <p className='text-blue-100 text-sm mb-4'>
                  Chia sẻ kiến thức và kiếm thu nhập
                </p>
                <div className='flex items-center text-sm group-hover:translate-x-2 transition-transform duration-300'>
                  <Plus className='h-4 w-4 mr-2' />
                  <span>Bắt đầu tạo</span>
                  <ArrowRight className='h-4 w-4 ml-2' />
                </div>
              </div>
              <BookOpen className='h-12 w-12 opacity-80' />
            </div>
          </div>

          <div className='bg-gradient-to-br from-emerald-500 to-green-700 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer group'>
            <Link
              to='/seller/withdrawals'
              className='flex items-center justify-between'
            >
              <div>
                <h3 className='text-xl font-bold mb-2'>Rút tiền</h3>
                <p className='text-emerald-100 text-sm mb-4'>
                  Rút số dư về tài khoản
                </p>
                <div className='flex items-center text-sm group-hover:translate-x-2 transition-transform duration-300'>
                  <Download className='h-4 w-4 mr-2' />
                  <span>{formatCurrency(stats?.wallet?.availableBalance)}</span>
                  <ArrowRight className='h-4 w-4 ml-2' />
                </div>
              </div>
              <Wallet className='h-12 w-12 opacity-80' />
            </Link>
          </div>

          <div className='bg-gradient-to-br from-purple-500 to-indigo-700 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer group'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-xl font-bold mb-2'>Xem báo cáo</h3>
                <p className='text-purple-100 text-sm mb-4'>
                  Phân tích chi tiết hiệu suất
                </p>
                <div className='flex items-center text-sm group-hover:translate-x-2 transition-transform duration-300'>
                  <Activity className='h-4 w-4 mr-2' />
                  <span>Chi tiết</span>
                  <ArrowRight className='h-4 w-4 ml-2' />
                </div>
              </div>
              <TrendingUp className='h-12 w-12 opacity-80' />
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8'>
          {/* Performance Chart */}
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>
                Hiệu suất tổng quan
              </h3>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis dataKey='name' stroke='#6b7280' />
                <YAxis stroke='#6b7280' />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar
                  dataKey='value'
                  fill='url(#barGradient)'
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id='barGradient' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#8884d8' stopOpacity={0.2} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Key Metrics */}
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>
                Chỉ số quan trọng
              </h3>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl border border-blue-200'>
                <div className='flex items-center space-x-3'>
                  <Star className='h-8 w-8 text-yellow-500' />
                  <div>
                    <p className='text-sm font-semibold text-gray-700'>
                      Đánh giá trung bình
                    </p>
                    <p className='text-2xl font-bold text-blue-600'>
                      {stats?.overview?.averageRating || 0}/5
                    </p>
                  </div>
                </div>
                <div className='flex space-x-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= (stats?.overview?.averageRating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className='flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl border border-green-200'>
                <div className='flex items-center space-x-3'>
                  <MessageSquare className='h-8 w-8 text-green-500' />
                  <div>
                    <p className='text-sm font-semibold text-gray-700'>
                      Tổng phản hồi
                    </p>
                    <p className='text-2xl font-bold text-green-600'>
                      {formatNumber(stats?.overview?.totalFeedbacks)}
                    </p>
                  </div>
                </div>
                <Award className='h-8 w-8 text-green-400' />
              </div>

              <div className='flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-100 rounded-xl border border-purple-200'>
                <div className='flex items-center space-x-3'>
                  <Target className='h-8 w-8 text-purple-500' />
                  <div>
                    <p className='text-sm font-semibold text-gray-700'>
                      Tỷ lệ thành công
                    </p>
                    <p className='text-2xl font-bold text-purple-600'>
                      {stats?.overview?.totalDocuments > 0
                        ? Math.round(
                            (stats?.overview?.totalSales /
                              stats?.overview?.totalDocuments) *
                              100
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
                <Zap className='h-8 w-8 text-purple-400' />
              </div>

              <div className='flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-100 rounded-xl border border-orange-200'>
                <div className='flex items-center space-x-3'>
                  <Download className='h-8 w-8 text-orange-500' />
                  <div>
                    <p className='text-sm font-semibold text-gray-700'>
                      Lần rút tiền
                    </p>
                    <p className='text-2xl font-bold text-orange-600'>
                      {stats?.withdrawals?.total || 0}
                    </p>
                  </div>
                </div>
                <CreditCard className='h-8 w-8 text-orange-400' />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8'>
          {/* Document Status */}
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>
                Trạng thái tài liệu
              </h3>
            </div>
            {documentStatusData.some((item) => item.value > 0) ? (
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={documentStatusData}
                    cx='50%'
                    cy='50%'
                    outerRadius={100}
                    innerRadius={50}
                    dataKey='value'
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {documentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className='flex flex-col items-center justify-center h-72 text-gray-500'>
                <FileText className='h-16 w-16 mb-4 opacity-50' />
                <p className='text-lg font-semibold'>Chưa có tài liệu nào</p>
                <p className='text-sm'>Tạo tài liệu đầu tiên của bạn!</p>
              </div>
            )}
          </div>

          {/* Wallet Distribution */}
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>Phân bố ví</h3>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={walletData}
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  dataKey='value'
                  label={({ name, value }) =>
                    `${name}: ${formatCurrency(value)}`
                  }
                  labelLine={false}
                >
                  {walletData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wallet Details */}
        <div className='bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50 mb-8'>
          <div className='flex items-center mb-6'>
            <div className='w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full mr-4'></div>
            <h3 className='text-2xl font-bold text-gray-800'>Chi tiết ví</h3>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
            <div className='p-6 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl border border-emerald-200 transform hover:scale-105 transition-all duration-300'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-3 bg-emerald-500 rounded-xl'>
                  <Wallet className='h-6 w-6 text-white' />
                </div>
                <CheckCircle className='h-5 w-5 text-emerald-500' />
              </div>
              <p className='text-sm font-semibold text-emerald-800 mb-1'>
                Số dư khả dụng
              </p>
              <p className='text-2xl font-bold text-emerald-600'>
                {formatCurrency(stats?.wallet?.availableBalance)}
              </p>
              <p className='text-xs text-emerald-700 mt-2'>Có thể rút ngay</p>
            </div>

            <div className='p-6 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl border border-yellow-200 transform hover:scale-105 transition-all duration-300'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-3 bg-yellow-500 rounded-xl'>
                  <Timer className='h-6 w-6 text-white' />
                </div>
                <Clock className='h-5 w-5 text-yellow-500' />
              </div>
              <p className='text-sm font-semibold text-yellow-800 mb-1'>
                Đang chờ xử lý
              </p>
              <p className='text-2xl font-bold text-yellow-600'>
                {formatCurrency(stats?.wallet?.pendingBalance)}
              </p>
              <p className='text-xs text-yellow-700 mt-2'>Chờ duyệt</p>
            </div>

            <div className='p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200 transform hover:scale-105 transition-all duration-300'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-3 bg-blue-500 rounded-xl'>
                  <TrendingUp className='h-6 w-6 text-white' />
                </div>
                <Award className='h-5 w-5 text-blue-500' />
              </div>
              <p className='text-sm font-semibold text-blue-800 mb-1'>
                Tổng thu nhập
              </p>
              <p className='text-2xl font-bold text-blue-600'>
                {formatCurrency(stats?.wallet?.totalEarned)}
              </p>
              <p className='text-xs text-blue-700 mt-2'>Tổng cộng</p>
            </div>

            <div className='p-6 bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl border border-red-200 transform hover:scale-105 transition-all duration-300'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-3 bg-red-500 rounded-xl'>
                  <Download className='h-6 w-6 text-white' />
                </div>
                <XCircle className='h-5 w-5 text-red-500' />
              </div>
              <p className='text-sm font-semibold text-red-800 mb-1'>Đã rút</p>
              <p className='text-2xl font-bold text-red-600'>
                {formatCurrency(stats?.wallet?.totalWithdrawn)}
              </p>
              <p className='text-xs text-red-700 mt-2'>Đã chuyển</p>
            </div>
          </div>
        </div>

        {/* Status Footer */}
        <div className='bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl border border-blue-200 shadow-lg p-6'>
          <div className='flex flex-col sm:flex-row items-center justify-between'>
            <div className='flex items-center space-x-4 mb-4 sm:mb-0'>
              <div className='flex items-center space-x-2'>
                <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
                <p className='text-blue-800 font-semibold'>
                  Dashboard được cập nhật liên tục
                </p>
              </div>
              <div className='hidden sm:block w-px h-6 bg-blue-300'></div>
              <p className='text-blue-600 text-sm'>
                Hiển thị dữ liệu{' '}
                {stats.period === 'all' ? 'tất cả thời gian' : stats.period}
              </p>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='flex space-x-1'>
                <div className='w-2 h-2 bg-blue-400 rounded-full animate-bounce'></div>
                <div
                  className='w-2 h-2 bg-indigo-400 rounded-full animate-bounce'
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
              <Activity className='h-5 w-5 text-blue-500' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
