import React from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { Link } from 'react-router';
import {
  Edit,
  Phone,
  Mail,
  Calendar,
  Shield,
  User,
  FileText,
  Users,
} from 'lucide-react';
import { formatDate } from '../../utils';

const Profile = () => {
  const { user } = useAuthStore();

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4'>
        <div className='text-center animate-pulse'>
          <div className='w-12 h-12 rounded-full bg-blue-200 mx-auto mb-4'></div>
          <p className='text-gray-600 text-lg'>Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  // Helper: Hiển thị badge role
  const getRoleBadge = (role) => {
    let color = 'bg-blue-100 text-blue-800 border-blue-200';
    let label = role;
    if (role === 'ADMIN') {
      color = 'bg-red-100 text-red-800 border-red-200';
      label = 'Quản trị viên';
    } else if (role === 'MANAGER') {
      color = 'bg-green-100 text-green-800 border-green-200';
      label = 'Nhân viên';
    } else if (role === 'CUSTOMER') {
      color = 'bg-blue-100 text-blue-800 border-blue-200';
      label = 'Khách hàng';
    }
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${color} border transition-all duration-200 hover:shadow-sm`}
        role='status'
        aria-label={`Vai trò: ${label}`}
      >
        {label}
      </span>
    );
  };

  // Helper: Hiển thị interests dạng badge
  const renderInterests = (interests) => {
    if (!interests || interests.length === 0) {
      return (
        <span className='text-gray-500 text-sm italic'>
          Chưa có sở thích nào
        </span>
      );
    }
    return (
      <div className='flex flex-wrap gap-2'>
        {interests.map((interest) => (
          <span
            key={interest._id}
            className='inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100 transition-all duration-200 hover:shadow-sm hover:scale-105'
          >
            <span>{interest.emoji}</span>
            <span>{interest.name}</span>
          </span>
        ))}
      </div>
    );
  };

  // Helper: Hiển thị danh sách documents
  const renderDocuments = (documents) => {
    if (!documents || documents.length === 0) {
      return (
        <span className='text-gray-500 text-sm italic'>
          Chưa có tài liệu nào
        </span>
      );
    }
    return (
      <div className='space-y-2'>
        {documents.map((docId) => (
          <div
            key={docId._id}
            className='flex items-center gap-2 text-gray-700'
          >
            <FileText className='w-4 h-4 text-blue-500' />
            <span className='text-sm'>
              Tài liệu : {docId.title || 'Không có'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Helper: Hiển thị danh sách groups
  const renderGroups = (groups) => {
    if (!groups || groups.length === 0) {
      return (
        <span className='text-gray-500 text-sm italic'>
          Chưa tham gia nhóm nào
        </span>
      );
    }
    return (
      <div className='space-y-2'>
        {groups.map((groupId) => (
          <div
            key={groupId._id}
            className='flex items-center gap-2 text-gray-700'
          >
            <Users className='w-4 h-4 text-blue-500' />
            <span className='text-sm'>Nhóm : {groupId.name || 'Kh có '}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6'>
      <div className='max-w-2xl mx-auto space-y-6'>
        {/* Header Section */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 animate-fade-in'>
          <div className='flex flex-col items-center text-center'>
            {/* Avatar */}
            <div className='relative mb-4 group'>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className='w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-blue-100 shadow-md transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-lg'
                  aria-label={`Ảnh đại diện của ${user.name}`}
                />
              ) : (
                <div className='w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center border-2 border-blue-100 shadow-md transition-all duration-300 group-hover:border-blue-200'>
                  <span className='text-3xl font-bold text-white'>
                    {user.name?.charAt(0)}
                  </span>
                </div>
              )}
              <div className='absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-sm'></div>
            </div>

            {/* User Info */}
            <div className='space-y-2'>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                {user.name}
              </h1>
              <div className='flex items-center justify-center gap-2 text-gray-600 text-sm sm:text-base'>
                <Mail className='w-4 h-4' />
                <p>{user.email}</p>
              </div>
              {getRoleBadge(user.role)}
            </div>

            {/* Edit Button */}
            <div className='mt-4'>
              <Link to='/update-profile'>
                <button
                  onClick={handleEditProfile}
                  className='inline-flex items-center px-4 sm:px-6 py-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 hover:bg-blue-100 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base'
                  aria-label='Chỉnh sửa thông tin cá nhân'
                >
                  <Edit className='w-4 h-4 mr-2' />
                  Chỉnh sửa thông tin
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 animate-fade-in'>
          <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
            <User className='w-5 h-5 text-blue-600' />
            Thông tin cá nhân
          </h2>

          <div className='grid gap-4'>
            <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
              <label className='block text-sm font-medium text-gray-600 mb-1'>
                ID
              </label>
              <p className='text-sm text-gray-800 font-mono break-all'>
                {user._id}
              </p>
            </div>

            <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
              <label className='block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1'>
                <Phone className='w-4 h-4' />
                Số điện thoại
              </label>
              <p className='text-sm text-gray-800'>
                {user.phone || 'Chưa cập nhật'}
              </p>
            </div>

            {user.role === 'CUSTOMER' && (
              <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
                <label className='block text-sm font-medium text-gray-600 mb-1'>
                  Sở thích
                </label>
                {renderInterests(user.interests)}
              </div>
            )}

            <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
              <label className='block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1'>
                <Calendar className='w-4 h-4' />
                Ngày tạo tài khoản
              </label>
              <p className='text-sm text-gray-800'>
                {formatDate(user.createdAt)}
              </p>
            </div>

            <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
              <label className='block text-sm font-medium text-gray-600 mb-1'>
                Thông tin ngân hàng
              </label>
              <p className='text-sm text-gray-800'>
                {user.bankName || user.bankAccountName || user.bankAccountNumber
                  ? `${user.bankName || 'N/A'} - ${
                      user.bankAccountName || 'N/A'
                    } - ${user.bankAccountNumber || 'N/A'}`
                  : 'Chưa cập nhật'}
              </p>
            </div>

            <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
              <label className='block text-sm font-medium text-gray-600 mb-1'>
                Tài liệu
              </label>
              {renderDocuments(user.documents)}
            </div>

            <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
              <label className='block text-sm font-medium text-gray-600 mb-1'>
                Nhóm
              </label>
              {renderGroups(user.groups)}
            </div>

            {user.isVerified && (
              <div className='flex items-center gap-2 text-green-700 bg-green-50 px-3 py-2 rounded-xl border border-green-100'>
                <Shield className='w-4 h-4' />
                <span className='text-sm font-medium'>
                  Tài khoản đã được xác thực
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
