import React from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { Link } from 'react-router';
import InterestModel from '../../components/common/InterestModel';
import { INTERESTS } from '../../constants';

const Profile = () => {
  const { user, userInterests } = useAuthStore();
  // Fake payment history data
  const paymentHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: 299000,
      description: 'Premium Package Subscription',
      status: 'Completed',
      method: 'Credit Card',
    },
    {
      id: 2,
      date: '2024-01-01',
      amount: 150000,
      description: 'Additional Features',
      status: 'Completed',
      method: 'PayPal',
    },
    {
      id: 3,
      date: '2023-12-20',
      amount: 99000,
      description: 'Basic Plan',
      status: 'Completed',
      method: 'Bank Transfer',
    },
    {
      id: 4,
      date: '2023-12-01',
      amount: 450000,
      description: 'Enterprise Package',
      status: 'Pending',
      method: 'Credit Card',
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';

    if (status === 'Completed') {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    if (status === 'Pending') {
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
    return `${baseClasses} bg-gray-100 text-gray-800`;
  };

  const handleEditProfile = () => {
    // Handle edit profile logic
    console.log('Edit profile clicked');
  };

  const handleViewPayment = (paymentId) => {
    // Handle view payment details
    console.log('View payment:', paymentId);
  };

  if (!user) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Đang tải thông tin...</p>
        </div>
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-white py-8'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center space-x-4'>
              {/* Avatar */}
              <div className='relative'>
                {user.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl}
                    alt={`${user.name}`}
                    className='w-20 h-20 rounded-full object-cover border-4 border-blue-100'
                  />
                ) : (
                  <div className='w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-blue-100'>
                    <span className='text-2xl font-bold text-white'>
                      {user.name?.charAt(0)}
                    </span>
                  </div>
                )}
                <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white'></div>
              </div>

              {/* User Info */}
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>
                  {user.name}
                </h1>
                <p className='text-gray-600'>{user.email}</p>
                <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1'>
                  {user.role}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className='mt-4 sm:mt-0'>
              <Link to='/update-profile'>
                <button
                  onClick={handleEditProfile}
                  className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
                  aria-label='Chỉnh sửa thông tin cá nhân'
                >
                  <svg
                    className='w-4 h-4 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                    />
                  </svg>
                  Chỉnh sửa
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                Thông tin cá nhân
              </h2>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-500'>
                    ID
                  </label>
                  <p className='mt-1 text-sm text-gray-900 font-mono break-all'>
                    {user.id}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-500'>
                    Tên
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>{user.name}</p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-500'>
                    Email
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>{user.email}</p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-500'>
                    Vai trò
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>{user.role}</p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-500'>
                    Sở thích
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {userInterests
                      ? userInterests
                          .map((interest) => interest.name)
                          .join(', ')
                      : 'Không có sở thích'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-lg font-semibold text-gray-900'>
                  Lịch sử thanh toán
                </h2>
                <span className='text-sm text-gray-500'>
                  {paymentHistory.length} giao dịch
                </span>
              </div>

              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Ngày
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Mô tả
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Số tiền
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Phương thức
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Trạng thái
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {paymentHistory.map((payment) => (
                      <tr
                        key={payment.id}
                        className='hover:bg-gray-50 transition-colors duration-150'
                      >
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {new Date(payment.date).toLocaleDateString('vi-VN')}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-900'>
                          <div
                            className='max-w-xs truncate'
                            title={payment.description}
                          >
                            {payment.description}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {payment.method}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className={getStatusBadge(payment.status)}>
                            {payment.status === 'Completed'
                              ? 'Hoàn thành'
                              : payment.status === 'Pending'
                              ? 'Đang xử lý'
                              : payment.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                          <button
                            onClick={() => handleViewPayment(payment.id)}
                            className='text-blue-600 hover:text-blue-900 focus:outline-none focus:underline transition-colors duration-200'
                            aria-label={`Xem chi tiết giao dịch ${payment.id}`}
                          >
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-5 h-5 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                    />
                  </svg>
                </div>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-500'>
                  Tổng chi tiêu
                </p>
                <p className='text-2xl font-semibold text-gray-900'>
                  {formatCurrency(
                    paymentHistory.reduce(
                      (sum, payment) => sum + payment.amount,
                      0
                    )
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-5 h-5 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                </div>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-500'>
                  Tổng giao dịch
                </p>
                <p className='text-2xl font-semibold text-gray-900'>
                  {paymentHistory.length}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-5 h-5 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                    />
                  </svg>
                </div>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-500'>
                  Giao dịch hoàn thành
                </p>
                <p className='text-2xl font-semibold text-gray-900'>
                  {
                    paymentHistory.filter((p) => p.status === 'Completed')
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
