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
  AreaChart,
  Area,
  Legend,
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  Users,
  Wallet,
  CreditCard,
  AlertCircle,
  FileText,
  Award,
  Download,
  Activity,
  BookOpen,
  UserCheck,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  PauseCircle,
} from 'lucide-react';
import managerServices from '../../services/managerServices';

export default function ManagerDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const statsRes = await managerServices.managerStatistics();
        console.log('🚀 ~ fetchStats ~ statsRes:', statsRes);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='relative'>
            <div className='animate-spin rounded-full h-32 w-32 border-4 border-blue-200'></div>
            <div className='animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600 absolute top-0'></div>
          </div>
          <p className='mt-6 text-gray-600 font-medium'>
            Đang tải dữ liệu dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center'>
        <div className='text-center bg-white p-8 rounded-2xl shadow-xl'>
          <AlertCircle size={64} className='mx-auto mb-4 text-red-500' />
          <p className='text-red-600 font-semibold text-lg'>
            Không thể tải dữ liệu dashboard
          </p>
          <p className='text-gray-500 mt-2'>Vui lòng thử lại sau</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
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
  }) => (
    <div
      className={`${bgGradient} rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/20 backdrop-blur-sm`}
    >
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          <p className='text-white/80 font-medium mb-2 text-sm uppercase tracking-wide'>
            {title}
          </p>
          <p className={`text-3xl font-bold ${textColor} mb-1`}>{value}</p>
          {subtitle && <p className='text-white/70 text-xs'>{subtitle}</p>}
          {trend && (
            <div className='flex items-center mt-2'>
              <TrendingUp className='h-3 w-3 text-green-300 mr-1' />
              <span className='text-green-300 text-xs font-medium'>
                {trend}
              </span>
            </div>
          )}
        </div>
        <div
          className={`p-4 rounded-2xl ${iconBg} backdrop-blur-sm border border-white/20`}
        >
          <IconComponent className='h-8 w-8 text-white' />
        </div>
      </div>
    </div>
  );

  // Dữ liệu cho biểu đồ user roles
  const userRoleData = stats.overview.users.byRole.map((role) => ({
    name: role._id,
    value: role.count,
    percentage: ((role.count / stats.overview.users.total) * 100).toFixed(1),
  }));

  // Dữ liệu cho biểu đồ documents
  const documentData = [
    {
      name: 'Tổng cộng',
      value: stats.overview.documents.total,
      color: '#3B82F6',
    },
    {
      name: 'Đã duyệt',
      value: stats.overview.documents.approved,
      color: '#10B981',
    },
    {
      name: 'Chờ duyệt',
      value: stats.overview.documents.pending,
      color: '#F59E0B',
    },
    {
      name: 'Từ chối',
      value: stats.overview.documents.rejected,
      color: '#EF4444',
    },
    {
      name: 'Miễn phí',
      value: stats.overview.documents.free,
      color: '#8B5CF6',
    },
    { name: 'Trả phí', value: stats.overview.documents.paid, color: '#EC4899' },
  ];

  // Dữ liệu cho biểu đồ payments
  const paymentData = [
    {
      name: 'Hoàn thành',
      value: stats.overview.payments.completed,
      color: '#10B981',
    },
    {
      name: 'Chờ xử lý',
      value: stats.overview.payments.pending,
      color: '#F59E0B',
    },
    {
      name: 'Thất bại',
      value: stats.overview.payments.failed,
      color: '#EF4444',
    },
  ];

  // Dữ liệu cho daily revenue chart
  const dailyRevenueData = stats.dailyRevenueStats.map((day) => ({
    date: new Date(day.date).toLocaleDateString('vi-VN'),
    revenue: day.revenue,
    sales: day.sales,
  }));

  // Top categories data
  const topCategoriesData = stats.topCategories.slice(0, 8).map((cat) => ({
    name: `${cat.emoji} ${cat.name}`,
    value: cat.count,
  }));

  // Commission colors
  const commissionColors = [
    '#10B981',
    '#3B82F6',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      <div className='container mx-auto px-6 py-8'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <div className='inline-block'>
            <h1 className='text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4'>
              Dashboard Quản lý nền tảng
            </h1>
            <div className='h-1 w-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full'></div>
          </div>
          <p className='text-gray-600 text-lg mt-4 max-w-3xl mx-auto'>
            Tổng quan toàn diện về hoạt động nền tảng với dữ liệu thời gian thực
            và phân tích chi tiết
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12'>
          <StatCard
            title='Tổng người dùng'
            value={stats.overview.users.total}
            IconComponent={Users}
            bgGradient='bg-gradient-to-br from-blue-500 to-blue-700'
            iconBg='bg-blue-400/30'
            textColor='text-white'
            subtitle={`${stats.overview.users.active} đang hoạt động`}
            trend='+100% mới'
          />

          <StatCard
            title='Tài liệu'
            value={stats.overview.documents.total}
            IconComponent={FileText}
            bgGradient='bg-gradient-to-br from-emerald-500 to-green-700'
            iconBg='bg-emerald-400/30'
            textColor='text-white'
            subtitle={`${stats.overview.documents.paid} trả phí, ${stats.overview.documents.free} miễn phí`}
          />

          <StatCard
            title='Thanh toán'
            value={stats.overview.payments.total}
            IconComponent={CreditCard}
            bgGradient='bg-gradient-to-br from-purple-500 to-indigo-700'
            iconBg='bg-purple-400/30'
            textColor='text-white'
            subtitle={`${stats.overview.payments.completed} thành công`}
          />

          <StatCard
            title='Tổng doanh thu'
            value={formatCurrency(stats.revenue.totalRevenue)}
            IconComponent={DollarSign}
            bgGradient='bg-gradient-to-br from-orange-500 to-red-600'
            iconBg='bg-orange-400/30'
            textColor='text-white'
            subtitle='Tất cả giao dịch'
          />
        </div>

        {/* Revenue & Wallet Section */}
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12'>
          {/* Platform Wallet */}
          <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>Ví nền tảng</h3>
            </div>

            <div className='space-y-4'>
              <div className='p-4 bg-gradient-to-r from-emerald-50 to-green-100 rounded-xl border border-emerald-200'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-emerald-800'>
                      Số dư khả dụng
                    </p>
                    <p className='text-2xl font-bold text-emerald-600'>
                      {formatCurrency(stats.platformWallet.availableBalance)}
                    </p>
                  </div>
                  <Wallet className='h-8 w-8 text-emerald-500' />
                </div>
              </div>

              <div className='p-4 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl border border-blue-200'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-blue-800'>
                      Tổng hoa hồng
                    </p>
                    <p className='text-2xl font-bold text-blue-600'>
                      {formatCurrency(
                        stats.platformWallet.totalCommissionEarned
                      )}
                    </p>
                  </div>
                  <Award className='h-8 w-8 text-blue-500' />
                </div>
              </div>

              <div className='p-4 bg-gradient-to-r from-red-50 to-pink-100 rounded-xl border border-red-200'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-red-800'>
                      Đã hoàn trả
                    </p>
                    <p className='text-2xl font-bold text-red-600'>
                      {formatCurrency(stats.platformWallet.totalRefunded)}
                    </p>
                  </div>
                  <AlertCircle className='h-8 w-8 text-red-500' />
                </div>
              </div>
            </div>
          </div>

          {/* Daily Revenue Chart */}
          <div className='xl:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-green-500 to-green-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>
                Doanh thu theo ngày
              </h3>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart data={dailyRevenueData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
                <XAxis
                  dataKey='date'
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip
                  formatter={(value, name) => [
                    name === 'revenue' ? formatCurrency(value) : value,
                    name === 'revenue' ? 'Doanh thu' : 'Số lượng bán',
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  }}
                />
                <Area
                  type='monotone'
                  dataKey='revenue'
                  stroke='#10B981'
                  fill='url(#revenueGradient)'
                  strokeWidth={3}
                />
                <defs>
                  <linearGradient
                    id='revenueGradient'
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop offset='0%' stopColor='#10B981' stopOpacity={0.8} />
                    <stop offset='100%' stopColor='#10B981' stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12'>
          {/* User Roles Distribution */}
          <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>
                Phân bố người dùng
              </h3>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={userRoleData}
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  innerRadius={50}
                  dataKey='value'
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  labelLine={false}
                >
                  {userRoleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={commissionColors[index % commissionColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [value, 'Số lượng']}
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

          {/* Documents Status */}
          <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>
                Trạng thái tài liệu
              </h3>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={documentData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
                <XAxis
                  dataKey='name'
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar dataKey='value' fill='#8B5CF6' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payment Status */}
          <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-orange-500 to-orange-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>Thanh toán</h3>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={paymentData}
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  dataKey='value'
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {paymentData.map((entry, index) => (
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
          </div>
        </div>

        {/* Top Categories */}
        <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50 mb-12'>
          <div className='flex items-center mb-6'>
            <div className='w-2 h-8 bg-gradient-to-b from-indigo-500 to-indigo-700 rounded-full mr-4'></div>
            <h3 className='text-2xl font-bold text-gray-800'>
              Danh mục phổ biến
            </h3>
          </div>
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={topCategoriesData} layout='horizontal'>
              <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
              <XAxis type='number' tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis
                type='category'
                dataKey='name'
                tick={{ fontSize: 12, fill: '#64748b' }}
                width={120}
              />
              <Tooltip
                formatter={(value) => [value, 'Số lượng tài liệu']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
              />
              <Bar
                dataKey='value'
                fill='url(#categoryGradient)'
                radius={[0, 8, 8, 0]}
              />
              <defs>
                <linearGradient
                  id='categoryGradient'
                  x1='0'
                  y1='0'
                  x2='1'
                  y2='0'
                >
                  <stop offset='0%' stopColor='#6366F1' />
                  <stop offset='100%' stopColor='#8B5CF6' />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Documents & Top Sellers */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12'>
          {/* Top Selling Documents */}
          <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-green-500 to-green-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>
                Tài liệu bán chạy
              </h3>
            </div>
            <div className='space-y-4'>
              {stats.topSellingDocuments.slice(0, 5).map((doc, index) => (
                <div
                  key={doc._id}
                  className='flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow'
                >
                  <div className='flex items-center space-x-4'>
                    <div className='w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      {index + 1}
                    </div>
                    <div>
                      <p className='font-semibold text-gray-800 truncate max-w-[200px]'>
                        {doc.title}
                      </p>
                      <p className='text-sm text-gray-600'>
                        bởi {doc.authorName}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-green-600'>
                      {formatCurrency(doc.revenue)}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {doc.sales} lượt bán
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Sellers */}
          <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>
                Seller hàng đầu
              </h3>
            </div>
            <div className='space-y-4'>
              {stats.topSellers.map((seller, index) => (
                <div
                  key={seller._id}
                  className='flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow'
                >
                  <div className='flex items-center space-x-4'>
                    <div className='w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      {index + 1}
                    </div>
                    <img
                      src={seller.avatar}
                      alt={seller.name}
                      className='w-10 h-10 rounded-full border-2 border-white shadow-md'
                    />
                    <div>
                      <p className='font-semibold text-gray-800'>
                        {seller.name}
                      </p>
                      <p className='text-sm text-gray-600'>{seller.email}</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-blue-600'>
                      {seller.totalSales} lượt bán
                    </p>
                    <p className='text-sm text-gray-500'>
                      {formatCurrency(seller.totalRevenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12'>
          {/* Recent Documents */}
          <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>
                Tài liệu gần đây
              </h3>
            </div>
            <div className='space-y-4'>
              {stats.recentActivities.documents.slice(0, 5).map((doc) => (
                <div
                  key={doc._id}
                  className='flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow'
                >
                  <div className='flex items-center space-x-4'>
                    <img
                      src={doc.author.avatar}
                      alt={doc.author.name}
                      className='w-10 h-10 rounded-full border-2 border-white shadow-md'
                    />
                    <div>
                      <p className='font-semibold text-gray-800 truncate max-w-[200px]'>
                        {doc.title}
                      </p>
                      <p className='text-sm text-gray-600'>
                        bởi {doc.author.name}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {new Date(doc.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    {doc.status === 'APPROVED' && (
                      <CheckCircle className='h-5 w-5 text-green-500' />
                    )}
                    {doc.status === 'PENDING' && (
                      <Clock className='h-5 w-5 text-yellow-500' />
                    )}
                    {doc.status === 'REJECTED' && (
                      <XCircle className='h-5 w-5 text-red-500' />
                    )}
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        doc.status === 'APPROVED'
                          ? 'bg-green-100 text-green-800'
                          : doc.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payments */}
          <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
            <div className='flex items-center mb-6'>
              <div className='w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full mr-4'></div>
              <h3 className='text-2xl font-bold text-gray-800'>
                Thanh toán gần đây
              </h3>
            </div>
            <div className='space-y-4'>
              {stats.recentActivities.payments.slice(0, 5).map((payment) => (
                <div
                  key={payment._id}
                  className='flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow'
                >
                  <div className='flex items-center space-x-4'>
                    <img
                      src={payment.userId.avatar}
                      alt={payment.userId.name}
                      className='w-10 h-10 rounded-full border-2 border-white shadow-md'
                    />
                    <div>
                      <p className='font-semibold text-gray-800'>
                        {payment.userId.name}
                      </p>
                      <p className='text-sm text-gray-600 truncate max-w-[200px]'>
                        {payment.documentId.title}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {new Date(payment.createdAt).toLocaleDateString(
                          'vi-VN'
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-emerald-600'>
                      {formatCurrency(payment.amount)}
                    </p>
                    <CheckCircle className='h-4 w-4 text-green-500 ml-auto mt-1' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-lg p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-blue-800 font-semibold'>
                <span className='inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse'></span>
                Cập nhật lần cuối:{' '}
                {new Date(stats.platformWallet.updatedAt).toLocaleString(
                  'vi-VN'
                )}
              </p>
              <p className='text-blue-600 text-sm mt-1'>
                Dashboard được cập nhật tự động mỗi 30 giây • Hiển thị dữ liệu{' '}
                {stats.period === 'all' ? 'tất cả thời gian' : stats.period}
              </p>
            </div>
            <div className='hidden md:flex items-center space-x-4'>
              <div className='flex space-x-2'>
                <div className='w-3 h-3 bg-blue-400 rounded-full animate-bounce'></div>
                <div
                  className='w-3 h-3 bg-purple-400 rounded-full animate-bounce'
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className='w-3 h-3 bg-indigo-400 rounded-full animate-bounce'
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
