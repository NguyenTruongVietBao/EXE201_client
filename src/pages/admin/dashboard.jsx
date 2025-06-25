import React, { useEffect, useState } from 'react';
import adminServices from '../../services/adminServices';
import LoadingPage from '../../components/common/LoadingPage';

export default function AdminDashboard() {
  const [userStatistics, setUserStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await adminServices.getUserStatistics();
        if (res.status) {
          setUserStatistics(res.data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thống kê:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (!userStatistics) {
    return (
      <div className='container mx-auto h-full min-h-screen p-6'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-600'>
            Không thể tải dữ liệu thống kê
          </h2>
        </div>
      </div>
    );
  }

  const {
    overview,
    usersByRole,
    topInterests,
    userRegistrationTrends,
    topDocumentCreators,
    topPurchasers,
    groupStats,
    engagement,
    recentActivities,
  } = userStatistics;

  const handleRoleColor = (role) => {
    switch (role) {
      case 'CUSTOMER':
        return 'bg-blue-100 text-blue-800';
      case 'SELLER':
        return 'bg-green-100 text-green-800';
      case 'MANAGER':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className='container mx-auto h-full min-h-screen p-6 bg-gray-50'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Dashboard Quản Trị
        </h1>
        <p className='text-gray-600'>
          Tổng quan thống kê người dùng và hoạt động hệ thống
        </p>
      </div>

      {/* Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-6 mb-8'>
        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Tổng người dùng
              </p>
              <p className='text-3xl font-bold text-gray-900'>
                {overview.totalUsers}
              </p>
            </div>
            <div className='bg-blue-100 p-3 rounded-full'>
              <svg
                className='w-6 h-6 text-blue-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 20h5v-2a3 3 0 00-5.196-2.121M17 20a3 3 0 01-3-3v-1a3 3 0 016 0v1a3 3 0 01-3 3z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 7a4 4 0 108 0 4 4 0 00-8 0zM9 14a6 6 0 006 6H3a6 6 0 016-6z'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Người dùng hoạt động
              </p>
              <p className='text-3xl font-bold text-green-600'>
                {overview.activeUsers}
              </p>
            </div>
            <div className='bg-green-100 p-3 rounded-full'>
              <svg
                className='w-6 h-6 text-green-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Người dùng bị cấm
              </p>
              <p className='text-3xl font-bold text-red-600'>
                {overview.bannedUsers}
              </p>
            </div>
            <div className='bg-red-100 p-3 rounded-full'>
              <svg
                className='w-6 h-6 text-red-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
        {/* Users by Role */}
        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Người dùng theo vai trò
          </h3>
          <div className='space-y-4'>
            {usersByRole.map((role) => (
              <div
                key={role._id}
                className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
              >
                <div className='flex items-center space-x-3'>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${handleRoleColor(
                      role._id
                    )}`}
                  >
                    {role._id === 'CUSTOMER'
                      ? 'Khách hàng'
                      : role._id === 'SELLER'
                      ? 'Người bán'
                      : role._id === 'MANAGER'
                      ? 'Quản lý'
                      : 'Quản trị viên'}
                  </span>
                  <div>
                    <p className='text-sm text-gray-600'>Tổng: {role.count}</p>
                    <p className='text-sm text-gray-600'>
                      Hoạt động: {role.active}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-xl font-bold text-gray-900'>
                    {role.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Interests */}
        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Sở thích phổ biến
          </h3>
          <div className='space-y-3'>
            {topInterests.slice(0, 5).map((interest) => (
              <div
                key={interest._id}
                className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
              >
                <div className='flex items-center space-x-3'>
                  <span className='text-2xl'>{interest.emoji}</span>
                  <span className='font-medium text-gray-900'>
                    {interest.name}
                  </span>
                </div>
                <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                  {interest.userCount} người
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Trends */}
      <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Xu hướng đăng ký
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {userRegistrationTrends.map((trend) => (
            <div key={trend.date} className='p-4 bg-gray-50 rounded-lg'>
              <div className='flex items-center justify-between mb-2'>
                <span className='font-medium text-gray-900'>
                  {formatDate(trend.date)}
                </span>
                <span className='bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium'>
                  {trend.count} đăng ký
                </span>
              </div>
              <div className='flex flex-wrap gap-1'>
                {trend.roles.map((role, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-xs ${handleRoleColor(
                      role
                    )}`}
                  >
                    {role === 'CUSTOMER'
                      ? 'KH'
                      : role === 'SELLER'
                      ? 'NB'
                      : 'QL'}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Creators and Purchasers */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
        {/* Top Document Creators */}
        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Người tạo tài liệu hàng đầu
          </h3>
          <div className='space-y-4'>
            {topDocumentCreators.map((creator) => (
              <div
                key={creator._id}
                className='flex items-center space-x-4 p-4 bg-gray-50 rounded-lg'
              >
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className='w-12 h-12 rounded-full'
                />
                <div className='flex-1'>
                  <p className='font-medium text-gray-900'>{creator.name}</p>
                  <p className='text-sm text-gray-600'>{creator.email}</p>
                  <div className='flex items-center space-x-4 mt-1'>
                    <span className='text-sm text-gray-600'>
                      {creator.documentCount} tài liệu
                    </span>
                    <span className='text-sm text-gray-600'>
                      {creator.totalViews} lượt xem
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${handleRoleColor(
                    creator.role
                  )}`}
                >
                  {creator.role === 'CUSTOMER'
                    ? 'KH'
                    : creator.role === 'SELLER'
                    ? 'NB'
                    : 'QL'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Purchasers */}
        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Người mua hàng đầu
          </h3>
          <div className='space-y-4'>
            {topPurchasers.length > 0 ? (
              topPurchasers.map((purchaser) => (
                <div
                  key={purchaser._id}
                  className='flex items-center space-x-4 p-4 bg-gray-50 rounded-lg'
                >
                  <img
                    src={purchaser.avatar}
                    alt={purchaser.name}
                    className='w-12 h-12 rounded-full'
                  />
                  <div className='flex-1'>
                    <p className='font-medium text-gray-900'>
                      {purchaser.name}
                    </p>
                    <p className='text-sm text-gray-600'>{purchaser.email}</p>
                    <div className='flex items-center space-x-4 mt-1'>
                      <span className='text-sm text-gray-600'>
                        {purchaser.totalPurchases} giao dịch
                      </span>
                      <span className='text-sm font-medium text-green-600'>
                        {formatCurrency(purchaser.totalSpent)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-gray-500 text-center py-4'>
                Chưa có giao dịch mua hàng
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Group Stats and Engagement */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
        {/* Group Statistics */}
        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Thống kê nhóm
          </h3>
          <div className='grid grid-cols-2 gap-4'>
            <div className='p-4 bg-blue-50 rounded-lg text-center'>
              <p className='text-2xl font-bold text-blue-600'>
                {groupStats.totalGroups}
              </p>
              <p className='text-sm text-gray-600'>Tổng nhóm</p>
            </div>
            <div className='p-4 bg-green-50 rounded-lg text-center'>
              <p className='text-2xl font-bold text-green-600'>
                {groupStats.totalGroups}
              </p>
              <p className='text-sm text-gray-600'>Nhóm hoạt động</p>
            </div>
            <div className='p-4 bg-purple-50 rounded-lg text-center'>
              <p className='text-2xl font-bold text-purple-600'>
                {groupStats.totalMembers}
              </p>
              <p className='text-sm text-gray-600'>Tổng thành viên</p>
            </div>
            <div className='p-4 bg-orange-50 rounded-lg text-center'>
              <p className='text-2xl font-bold text-orange-600'>
                {groupStats.avgMembersPerGroup}
              </p>
              <p className='text-sm text-gray-600'>TB thành viên/nhóm</p>
            </div>
          </div>
        </div>

        {/* Engagement Statistics */}
        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Thống kê tương tác
          </h3>
          <div className='space-y-4'>
            <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
              <span className='text-gray-600'>Trung bình tài liệu/người</span>
              <span className='font-bold text-gray-900'>
                {engagement.avgDocumentsPerUser}
              </span>
            </div>
            <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
              <span className='text-gray-600'>Trung bình đăng ký/người</span>
              <span className='font-bold text-gray-900'>
                {engagement.avgEnrollmentsPerUser}
              </span>
            </div>
            <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
              <span className='text-gray-600'>Người có tài liệu</span>
              <span className='font-bold text-gray-900'>
                {engagement.usersWithDocuments}
              </span>
            </div>
            <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
              <span className='text-gray-600'>Người có đăng ký</span>
              <span className='font-bold text-gray-900'>
                {engagement.usersWithEnrollments}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Người dùng mới gần đây
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {recentActivities.recentUsers.slice(0, 6).map((user) => (
            <div
              key={user._id}
              className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg'
            >
              <img
                src={user.avatar}
                alt={user.name}
                className='w-10 h-10 rounded-full'
              />
              <div className='flex-1 min-w-0'>
                <p className='font-medium text-gray-900 truncate'>
                  {user.name}
                </p>
                <p className='text-sm text-gray-600 truncate'>{user.email}</p>
                <div className='flex items-center space-x-2 mt-1'>
                  <span
                    className={`px-2 py-1 rounded text-xs ${handleRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role === 'CUSTOMER'
                      ? 'KH'
                      : user.role === 'SELLER'
                      ? 'NB'
                      : 'QL'}
                  </span>
                  <span className='text-xs text-gray-500'>
                    {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
