import React, { useEffect, useState } from 'react';
import adminServices from '../../services/adminServices';
import LoadingPage from '../../components/common/LoadingPage';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(''); // 'ban' or 'unban'
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminServices.getAllUsers();
      const allUsers = res.data.filter((user) => user.role !== 'ADMIN');
      setLoading(false);
      if (res.status) {
        setUsers(allUsers);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách users:', error);
      setLoading(false);
    }
  };

  const handleBanUser = (user) => {
    setSelectedUser(user);
    setActionType('ban');
    setShowConfirmModal(true);
  };

  const handleUnbanUser = (user) => {
    setSelectedUser(user);
    setActionType('unban');
    setShowConfirmModal(true);
  };

  const confirmAction = async () => {
    if (!selectedUser) return;

    setActionLoading(true);
    try {
      let res;
      if (actionType === 'ban') {
        res = await adminServices.banUser(selectedUser._id);
      } else {
        res = await adminServices.unbanUser(selectedUser._id);
      }

      if (res.status) {
        // Cập nhật state local
        setUsers(
          users.map((user) =>
            user._id === selectedUser._id
              ? { ...user, isBanned: actionType === 'ban' }
              : user
          )
        );

        // Đóng modal
        setShowConfirmModal(false);
        setSelectedUser(null);
        setActionType('');
      }
    } catch (error) {
      console.error(`Lỗi khi ${actionType} user:`, error);
    } finally {
      setActionLoading(false);
    }
  };

  const cancelAction = () => {
    setShowConfirmModal(false);
    setSelectedUser(null);
    setActionType('');
  };

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

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'CUSTOMER':
        return 'Khách hàng';
      case 'SELLER':
        return 'Người bán';
      case 'MANAGER':
        return 'Quản lý';
      default:
        return role;
    }
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'ALL' || user.role === filterRole;
    const matchesStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'ACTIVE' && !user.isBanned) ||
      (filterStatus === 'BANNED' && user.isBanned) ||
      (filterStatus === 'VERIFIED' && user.isVerified) ||
      (filterStatus === 'UNVERIFIED' && !user.isVerified);

    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className='container mx-auto h-full min-h-screen p-6 bg-gray-50'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Quản Lý Người Dùng
        </h1>
        <p className='text-gray-600'>
          Quản lý tất cả người dùng trong hệ thống
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Tổng người dùng
              </p>
              <p className='text-2xl font-bold text-gray-900'>{users.length}</p>
            </div>
            <div className='bg-blue-100 p-3 rounded-full'>
              <svg
                className='w-5 h-5 text-blue-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
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
              <p className='text-2xl font-bold text-green-600'>
                {users.filter((u) => !u.isBanned).length}
              </p>
            </div>
            <div className='bg-green-100 p-3 rounded-full'>
              <svg
                className='w-5 h-5 text-green-600'
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
              <p className='text-2xl font-bold text-red-600'>
                {users.filter((u) => u.isBanned).length}
              </p>
            </div>
            <div className='bg-red-100 p-3 rounded-full'>
              <svg
                className='w-5 h-5 text-red-600'
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

        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Đã xác thực</p>
              <p className='text-2xl font-bold text-purple-600'>
                {users.filter((u) => u.isVerified).length}
              </p>
            </div>
            <div className='bg-purple-100 p-3 rounded-full'>
              <svg
                className='w-5 h-5 text-purple-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6'>
        <div className='flex flex-col md:flex-row gap-4'>
          {/* Search */}
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Tìm kiếm
            </label>
            <div className='relative'>
              <input
                type='text'
                placeholder='Tìm theo tên hoặc email...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
              <svg
                className='absolute left-3 top-2.5 h-5 w-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Vai trò
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value='ALL'>Tất cả</option>
              <option value='CUSTOMER'>Khách hàng</option>
              <option value='SELLER'>Người bán</option>
              <option value='MANAGER'>Quản lý</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Trạng thái
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value='ALL'>Tất cả</option>
              <option value='ACTIVE'>Hoạt động</option>
              <option value='BANNED'>Bị cấm</option>
              <option value='VERIFIED'>Đã xác thực</option>
              <option value='UNVERIFIED'>Chưa xác thực</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Người dùng
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Vai trò
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Trạng thái
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Sở thích
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Ngày tham gia
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredUsers.map((user) => (
                <tr key={user._id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className='w-10 h-10 rounded-full'
                      />
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900 flex items-center'>
                          {user.name}
                          {user.isVerified && (
                            <svg
                              className='w-4 h-4 text-blue-500 ml-1'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                              />
                            </svg>
                          )}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className='text-sm text-gray-500'>
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${handleRoleColor(
                        user.role
                      )}`}
                    >
                      {getRoleDisplayName(user.role)}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex flex-col space-y-1'>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          user.isBanned
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {user.isBanned ? 'Bị cấm' : 'Hoạt động'}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          user.isVerified
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {user.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex flex-wrap gap-1 max-w-xs'>
                      {user.interests?.slice(0, 3).map((interest) => (
                        <span
                          key={interest._id}
                          className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800'
                        >
                          <span className='mr-1'>{interest.emoji}</span>
                          {interest.name}
                        </span>
                      ))}
                      {user.interests?.length > 3 && (
                        <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800'>
                          +{user.interests.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {formatDate(user.createdAt)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    {user.role !== 'MANAGER' && (
                      <div className='flex space-x-2'>
                        {user.isBanned ? (
                          <button
                            onClick={() => handleUnbanUser(user)}
                            className='inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                          >
                            Bỏ cấm
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBanUser(user)}
                            className='inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                          >
                            Cấm
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className='text-center py-12'>
            <svg
              className='mx-auto h-12 w-12 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
              />
            </svg>
            <h3 className='mt-2 text-sm font-medium text-gray-900'>
              Không tìm thấy người dùng
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
            </p>
          </div>
        )}
      </div>

      {/* Pagination info */}
      {filteredUsers.length > 0 && (
        <div className='bg-white px-6 py-3 border-t border-gray-200 rounded-b-lg'>
          <div className='flex justify-between items-center'>
            <div className='text-sm text-gray-700'>
              Hiển thị{' '}
              <span className='font-medium'>{filteredUsers.length}</span> trong
              tổng số <span className='font-medium'>{users.length}</span> người
              dùng
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center'>
          <div className='relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4'>
            <div className='p-6'>
              <div className='flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full'>
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
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-medium text-gray-900 text-center mb-2'>
                Xác nhận {actionType === 'ban' ? 'cấm' : 'bỏ cấm'} người dùng
              </h3>
              <p className='text-sm text-gray-500 text-center mb-6'>
                Bạn có chắc chắn muốn {actionType === 'ban' ? 'cấm' : 'bỏ cấm'}{' '}
                người dùng{' '}
                <span className='font-medium'>{selectedUser?.name}</span>?
              </p>
              <div className='flex justify-center space-x-4'>
                <button
                  onClick={cancelAction}
                  disabled={actionLoading}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
                >
                  Hủy
                </button>
                <button
                  onClick={confirmAction}
                  disabled={actionLoading}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
                    actionType === 'ban'
                      ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                      : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                  }`}
                >
                  {actionLoading
                    ? 'Đang xử lý...'
                    : actionType === 'ban'
                    ? 'Cấm'
                    : 'Bỏ cấm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
