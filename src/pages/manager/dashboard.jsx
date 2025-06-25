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
} from 'recharts';
import {
  TrendingUp,
  Users,
  Wallet,
  CreditCard,
  FileText,
  Award,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import managerServices from '../../services/managerServices';
import LoadingPage from '../../components/common/LoadingPage';
import ErrorStats from '../../components/common/ErrorStats';
import { formatCurrency, formatDate } from '../../utils';

export default function ManagerDashboard() {
  const [stats, setStats] = useState(null);
  const [platformWallet, setPlatformWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const statsRes = await managerServices.managerStatistics();
        setStats(statsRes.data);
        const platformWalletRes = await managerServices.platformWallet();
        setPlatformWallet(platformWalletRes.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <LoadingPage message='Đang tải dữ liệu cho Manager...' />;
  }

  if (!stats || !platformWallet) {
    return <ErrorStats message='Không thể tải dữ liệu thống kê' />;
  }

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
      className={`${bgGradient} rounded-xl shadow-lg p-5 transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-100/20 backdrop-blur-sm`}
      role='region'
      aria-label={title}
    >
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          <p className='text-gray-100 font-medium mb-2 text-xs uppercase tracking-wide'>
            {title}
          </p>
          <p className={`text-2xl sm:text-3xl font-bold ${textColor} mb-1`}>
            {value}
          </p>
          {subtitle && <p className='text-gray-200 text-xs'>{subtitle}</p>}
          {trend && (
            <div className='flex items-center mt-2'>
              <TrendingUp className='h-3 w-3 text-green-400 mr-1' />
              <span className='text-green-400 text-xs font-medium'>
                {trend}
              </span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-xl ${iconBg} backdrop-blur-sm border border-gray-100/20`}
        >
          <IconComponent className='h-6 w-6 text-white' />
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
      name: 'Miễn phí',
      value: stats.overview.documents.free,
      color: '#8B5CF6',
    },
    { name: 'Trả phí', value: stats.overview.documents.paid, color: '#EC4899' },
  ].filter((item) => item.value > 0); // Chỉ hiển thị nếu có dữ liệu

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
  ].filter((item) => item.value > 0);

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
      <div className='container mx-auto px-4 sm:px-6 py-8'>
        {/* Header */}
        <div className='mb-10 text-center animate-fade-in'>
          <div className='inline-block'>
            <h1 className='text-4xl sm:text-5xl py-2 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3'>
              Manager Dashboard
            </h1>
            <div className='h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full'></div>
          </div>
          <p className='text-gray-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto'>
            Tổng quan hoạt động nền tảng với dữ liệu thời gian thực
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-10'>
          <StatCard
            title='Tổng người dùng'
            value={stats.overview.users.total}
            IconComponent={Users}
            bgGradient='bg-gradient-to-br from-blue-500 to-blue-600'
            iconBg='bg-blue-400/30'
            textColor='text-white'
            subtitle={`${stats.overview.users.active} đang hoạt động`}
            trend={`${stats.overview.users.new} mới`}
          />
          <StatCard
            title='Tài liệu'
            value={stats.overview.documents.total}
            IconComponent={FileText}
            bgGradient='bg-gradient-to-br from-emerald-500 to-emerald-600'
            iconBg='bg-emerald-400/30'
            textColor='text-white'
            subtitle={`${stats.overview.documents.paid} trả phí, ${stats.overview.documents.free} miễn phí`}
          />
          <StatCard
            title='Thanh toán'
            value={stats.overview.payments.total}
            IconComponent={CreditCard}
            bgGradient='bg-gradient-to-br from-purple-500 to-purple-600'
            iconBg='bg-purple-400/30'
            textColor='text-white'
            subtitle={`${stats.overview.payments.completed} thành công`}
          />
        </div>

        {/* Revenue & Wallet Section */}
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10'>
          {/* Platform Wallet */}
          <div className='bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in'>
            <div className='flex items-center mb-4'>
              <div className='w-2 h-6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full mr-3'></div>
              <h3 className='text-xl font-bold text-gray-800'>Ví nền tảng</h3>
            </div>

            {/* Main Balance Overview */}
            <div className='p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl border border-blue-200 mb-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-lg font-semibold text-blue-700'>
                    Tổng doanh thu (Tạm tính)
                  </p>
                  <p className='text-2xl font-bold text-blue-900'>
                    {formatCurrency(platformWallet.totalBalance)}
                  </p>
                </div>
                <Wallet className='h-6 w-6 text-blue-600' />
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4'>
              <div className='p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-emerald-700'>
                      Số dư khả dụng
                    </p>
                    <p className='text-lg font-bold text-emerald-900'>
                      {formatCurrency(platformWallet.availableBalance)}
                    </p>
                  </div>
                  <CheckCircle className='h-6 w-6 text-emerald-600' />
                </div>
              </div>

              <div className='p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-yellow-700'>
                      Tổng hoa hồng
                    </p>
                    <p className='text-lg font-bold text-yellow-900'>
                      {formatCurrency(platformWallet.totalCommissionEarned)}
                    </p>
                  </div>
                  <Award className='h-6 w-6 text-yellow-600' />
                </div>
              </div>
            </div>

            {/* Commission Distribution Section */}
            <div className='border-t border-gray-200 pt-4 mb-4'>
              <div className='p-3 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl border border-orange-200'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-orange-700'>
                      Đang chờ xử lý
                    </p>
                    <p className='text-xl font-bold text-orange-900'>
                      {formatCurrency(platformWallet.pendingBalance)}
                    </p>
                  </div>
                  <Clock className='h-6 w-6 text-orange-600' />
                </div>
              </div>
              <h4 className='text-sm font-semibold text-gray-700 my-1 ml-1'>
                Phân chia doanh thu
              </h4>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div className='p-3 bg-orange-50 rounded-xl border border-orange-100'>
                  <div className='flex items-center justify-between mb-2'>
                    <div>
                      <p className='text-sm font-medium text-orange-700'>
                        Seller (85%)
                      </p>
                      <p className='text-lg font-bold text-orange-900'>
                        {formatCurrency(
                          platformWallet.pendingBalance * 0.85 || 0
                        )}
                      </p>
                    </div>
                    <Users className='h-5 w-5 text-orange-600' />
                  </div>
                </div>

                <div className='p-3 bg-orange-50 rounded-xl border border-orange-100'>
                  <div className='flex items-center justify-between mb-2'>
                    <div>
                      <p className='text-sm font-medium text-orange-700'>
                        Nền tảng (15%)
                      </p>
                      <p className='text-lg font-bold text-orange-900'>
                        {formatCurrency(
                          platformWallet.pendingBalance * 0.15 || 0
                        )}
                      </p>
                    </div>
                    <Award className='h-5 w-5 text-orange-600' />
                  </div>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className='mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100'>
                <div className='text-xs text-gray-600 mb-2'>
                  Tỷ lệ phân chia doanh thu
                </div>
                <div className='w-full bg-gray-200 rounded-full h-3 mb-2'>
                  <div
                    className='bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-l-full'
                    style={{ width: '85%' }}
                  ></div>
                  <div
                    className='bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-r-full ml-auto -mt-3'
                    style={{ width: '15%' }}
                  ></div>
                </div>
                <div className='flex justify-between text-xs text-gray-600'>
                  <span>🛒 Seller: 85%</span>
                  <span>🏢 Platform: 15%</span>
                </div>
              </div>
            </div>

            {/* Financial Activities Section */}
            <div className='border-t border-gray-200 pt-4'>
              <h4 className='text-sm font-semibold text-gray-700 mb-3'>
                Hoạt động tài chính
              </h4>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div className='p-3 bg-red-50 rounded-xl border border-red-100'>
                  <div className='flex items-center justify-between mb-2'>
                    <div>
                      <p className='text-sm font-medium text-red-700'>
                        Tổng hoàn tiền
                      </p>
                      <p className='text-lg font-bold text-red-900'>
                        {formatCurrency(platformWallet.totalRefunded)}
                      </p>
                    </div>
                    <XCircle className='h-5 w-5 text-red-600' />
                  </div>
                  <div className='flex items-center justify-between text-xs text-red-600'>
                    <span>
                      {platformWallet.statistics.totalRefundCount} giao dịch
                    </span>
                    <span>
                      {platformWallet.statistics.pendingRefundCount} đang chờ
                    </span>
                  </div>
                </div>

                <div className='p-3 bg-indigo-50 rounded-xl border border-indigo-100'>
                  <div className='flex items-center justify-between mb-2'>
                    <div>
                      <p className='text-sm font-medium text-indigo-700'>
                        Tổng rút tiền
                      </p>
                      <p className='text-lg font-bold text-indigo-900'>
                        {formatCurrency(platformWallet.totalWithdrawals)}
                      </p>
                    </div>
                    <TrendingUp className='h-5 w-5 text-indigo-600' />
                  </div>
                  <div className='flex items-center justify-between text-xs text-indigo-600'>
                    <span>
                      {platformWallet.statistics.totalWithdrawalCount} giao dịch
                    </span>
                    <span>
                      {platformWallet.statistics.pendingWithdrawalCount} đang
                      chờ
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistics Summary */}
              <div className='mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100'>
                <div className='grid grid-cols-2 gap-4 text-center'>
                  <div>
                    <p className='text-xs text-gray-600'>Tỷ lệ hoàn tiền</p>
                    <p className='text-sm font-bold text-gray-900'>100%</p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-600'>Tỷ lệ rút tiền</p>
                    <p className='text-sm font-bold text-gray-900'>100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10'>
          {/* User Roles Distribution */}
          <div className='bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in'>
            <div className='flex items-center mb-4'>
              <div className='w-2 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3'></div>
              <h3 className='text-xl font-bold text-gray-800'>
                Phân bố người dùng
              </h3>
            </div>
            {userRoleData.length > 0 ? (
              <ResponsiveContainer width='100%' height={280}>
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx='50%'
                    cy='50%'
                    outerRadius={window.innerWidth < 640 ? 80 : 100}
                    innerRadius={window.innerWidth < 640 ? 40 : 50}
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
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className='flex items-center justify-center h-64 text-gray-500'>
                Chưa có dữ liệu người dùng
              </div>
            )}
          </div>

          {/* Documents Status */}
          <div className='bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in'>
            <div className='flex items-center mb-4'>
              <div className='w-2 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full mr-3'></div>
              <h3 className='text-xl font-bold text-gray-800'>
                Phân bố tài liệu
              </h3>
            </div>
            {documentData.length > 0 ? (
              <ResponsiveContainer width='100%' height={280}>
                <BarChart data={documentData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                  <XAxis
                    dataKey='name'
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Bar dataKey='value' radius={[4, 4, 0, 0]}>
                    {documentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className='flex items-center justify-center h-64 text-gray-500'>
                Chưa có dữ liệu tài liệu
              </div>
            )}
          </div>

          {/* Payment Status */}
          <div className='bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in'>
            <div className='flex items-center mb-4'>
              <div className='w-2 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3'></div>
              <h3 className='text-xl font-bold text-gray-800'>
                Tình trạng thanh toán
              </h3>
            </div>
            {paymentData.length > 0 ? (
              <ResponsiveContainer width='100%' height={280}>
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx='50%'
                    cy='50%'
                    outerRadius={window.innerWidth < 640 ? 80 : 100}
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
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className='flex items-center justify-center h-64 text-gray-500'>
                Chưa có dữ liệu thanh toán
              </div>
            )}
          </div>
        </div>

        {/* Top Selling Documents & Top Sellers */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10'>
          {/* Top Selling Documents */}
          <div className='bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in'>
            <div className='flex items-center mb-4'>
              <div className='w-2 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3'></div>
              <h3 className='text-xl font-bold text-gray-800'>
                Tài liệu bán chạy
              </h3>
            </div>
            {stats.topSellingDocuments.length > 0 ? (
              <div className='space-y-3'>
                {stats.topSellingDocuments.slice(0, 4).map((doc, index) => (
                  <div
                    key={doc._id}
                    className='flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors'
                  >
                    <div className='flex items-center space-x-3'>
                      <div className='w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold'>
                        {index + 1}
                      </div>
                      <div>
                        <p className='font-medium text-gray-800 truncate max-w-[180px] sm:max-w-[220px]'>
                          {doc.title}
                        </p>
                        <p className='text-sm text-gray-600'>
                          bởi {doc.authorName}
                        </p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium text-green-600'>
                        {formatCurrency(doc.revenue)}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {doc.sales} lượt bán
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex items-center justify-center h-48 text-gray-500'>
                Chưa có tài liệu bán chạy
              </div>
            )}
          </div>

          {/* Top Sellers */}
          <div className='bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in'>
            <div className='flex items-center mb-4'>
              <div className='w-2 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3'></div>
              <h3 className='text-xl font-bold text-gray-800'>
                Seller hàng đầu
              </h3>
            </div>
            {stats.topSellers.length > 0 ? (
              <div className='space-y-3'>
                {stats.topSellers
                  .filter((seller) => seller.totalSales > 0)
                  .sort((a, b) => b.totalSales - a.totalSales)
                  .slice(0, 4)
                  .map((seller, index) => (
                    <div
                      key={seller._id}
                      className='flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors'
                    >
                      <div className='flex items-center space-x-3'>
                        <div className='w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold'>
                          {index + 1}
                        </div>
                        <img
                          src={seller.avatar}
                          alt={seller.name}
                          className='w-8 h-8 rounded-full border border-gray-200'
                        />
                        <div>
                          <p className='font-medium text-gray-800'>
                            {seller.name}
                          </p>
                          <p className='text-sm text-gray-600 truncate max-w-[150px] sm:max-w-[200px]'>
                            {seller.email}
                          </p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='font-medium text-blue-600'>
                          {seller.totalSales} lượt bán
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className='flex items-center justify-center h-48 text-gray-500'>
                Chưa có seller hàng đầu
              </div>
            )}
          </div>
        </div>

        {/* Recent Activities */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10'>
          {/* Recent Documents */}
          <div className='bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in'>
            <div className='flex items-center mb-4'>
              <div className='w-2 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full mr-3'></div>
              <h3 className='text-xl font-bold text-gray-800'>
                Tài liệu gần đây
              </h3>
            </div>
            {stats.recentActivities.documents.length > 0 ? (
              <div className='space-y-3'>
                {stats.recentActivities.documents.slice(0, 4).map((doc) => (
                  <div
                    key={doc._id}
                    className='flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors'
                  >
                    <div className='flex items-center space-x-3'>
                      <img
                        src={doc.author.avatar}
                        alt={doc.author.name}
                        className='w-8 h-8 rounded-full border border-gray-200'
                      />
                      <div>
                        <p className='font-medium text-gray-800 truncate max-w-[180px] sm:max-w-[220px]'>
                          {doc.title}
                        </p>
                        <p className='text-sm text-gray-600'>
                          bởi {doc.author.name}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {formatDate(doc.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                      {doc.status === 'APPROVED' && (
                        <CheckCircle className='h-4 w-4 text-green-500' />
                      )}
                      {doc.status === 'PENDING' && (
                        <Clock className='h-4 w-4 text-yellow-500' />
                      )}
                      {doc.status === 'REJECTED' && (
                        <XCircle className='h-4 w-4 text-red-500' />
                      )}
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
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
            ) : (
              <div className='flex items-center justify-center h-48 text-gray-500'>
                Chưa có tài liệu gần đây
              </div>
            )}
          </div>

          {/* Recent Payments */}
          <div className='bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in'>
            <div className='flex items-center mb-4'>
              <div className='w-2 h-6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full mr-3'></div>
              <h3 className='text-xl font-bold text-gray-800'>
                Thanh toán gần đây
              </h3>
            </div>
            {stats.recentActivities.payments.length > 0 ? (
              <div className='space-y-3'>
                {stats.recentActivities.payments.slice(0, 4).map((payment) => (
                  <div
                    key={payment._id}
                    className='flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors'
                  >
                    <div className='flex items-center space-x-3'>
                      <img
                        src={payment.userId.avatar}
                        alt={payment.userId.name}
                        className='w-8 h-8 rounded-full border border-gray-200'
                      />
                      <div>
                        <p className='font-medium text-gray-800'>
                          {payment.userId.name}
                        </p>
                        <p className='text-sm text-gray-600 truncate max-w-[180px] sm:max-w-[220px]'>
                          {payment.documentId.title}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {formatDate(payment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium text-emerald-600'>
                        {formatCurrency(payment.amount)}
                      </p>
                      <CheckCircle className='h-4 w-4 text-green-500 ml-auto mt-1' />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex items-center justify-center h-48 text-gray-500'>
                Chưa có thanh toán gần đây
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className='bg-gray-50 rounded-2xl border border-gray-100 shadow-sm p-5 animate-fade-in'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div>
              <p className='text-gray-700 font-medium'>
                <span className='inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse'></span>
                Cập nhật lần cuối: {formatDate(platformWallet.updatedAt)}
              </p>
              <p className='text-gray-600 text-sm mt-1'>
                Dashboard tự động cập nhật mỗi 30 giây • Hiển thị dữ liệu thời
                gian thực
              </p>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='flex space-x-2'>
                <div className='w-2 h-2 bg-blue-400 rounded-full animate-bounce'></div>
                <div
                  className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className='w-2 h-2 bg-indigo-400 rounded-full animate-bounce'
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
              <Activity className='h-4 w-4 text-blue-500' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
