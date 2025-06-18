import React from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { Link } from 'react-router';
import { Edit, Phone, Mail, Calendar, Shield, User } from 'lucide-react';

const Profile = () => {
  const { user } = useAuthStore();

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  if (!user) {
    return (
      <div className='h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  // Helper: Hiển thị badge role
  const getRoleBadge = (role) => {
    let color = 'bg-blue-100 text-blue-800 border-blue-200';
    let label = role;
    if (role === 'ADMIN') {
      color = 'bg-red-50 text-red-700 border-red-200';
      label = 'Quản trị viên';
    } else if (role === 'STAFF') {
      color = 'bg-green-50 text-green-700 border-green-200';
      label = 'Nhân viên';
    } else if (role === 'CUSTOMER') {
      color = 'bg-blue-50 text-blue-700 border-blue-200';
      label = 'Khách hàng';
    }
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color} border mt-2 transition-all duration-200 hover:shadow-md`}
      >
        {label}
      </span>
    );
  };

  // Helper: Hiển thị interests dạng badge
  const renderInterests = (interests) => {
    if (!interests || interests.length === 0)
      return <span className='text-gray-400 italic'>Chưa có sở thích nào</span>;
    return (
      <div className='flex flex-wrap gap-2 mt-2'>
        {interests.map((interest) => (
          <span
            key={interest._id}
            className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm font-medium border border-blue-100 transition-all duration-200 hover:shadow-md hover:scale-105'
          >
            <span className='text-lg'>{interest.emoji}</span>
            <span>{interest.name}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4'>
      <div className='max-w-3xl mx-auto space-y-8'>
        {/* Header Section */}
        <div className='bg-white rounded-3xl shadow-xl border border-white/30 p-8 transition-all duration-300 hover:shadow-2xl'>
          <div className='flex flex-col items-center text-center'>
            {/* Avatar */}
            <div className='relative mb-6 group'>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className='w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-xl'
                />
              ) : (
                <div className='w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-4 border-blue-100 shadow-lg transition-all duration-300 group-hover:border-blue-200'>
                  <span className='text-4xl font-bold text-white'>
                    {user.name?.charAt(0)}
                  </span>
                </div>
              )}
              <div className='absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg'></div>
            </div>

            {/* User Info */}
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>
                {user.name}
              </h1>
              <div className='flex items-center justify-center gap-2 text-gray-600'>
                <Mail className='w-4 h-4' />
                <p>{user.email}</p>
              </div>
              {getRoleBadge(user.role)}
            </div>

            {/* Edit Button */}
            <div className='mt-6'>
              <Link to='/update-profile'>
                <button
                  onClick={handleEditProfile}
                  className='inline-flex items-center px-6 py-2.5 border border-blue-100 rounded-xl shadow-sm text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200'
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
        <div className='bg-white rounded-3xl shadow-xl border border-white/30 p-8 transition-all duration-300 hover:shadow-2xl'>
          <h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
            <User className='w-5 h-5 text-blue-600' />
            Thông tin cá nhân
          </h2>

          <div className='grid gap-6'>
            <div className='p-4 rounded-2xl bg-slate-50 border border-slate-100'>
              <label className='block text-sm font-medium text-gray-500 mb-1'>
                ID
              </label>
              <p className='text-sm text-gray-900 font-mono break-all'>
                {user._id}
              </p>
            </div>

            {user.phone && (
              <div className='p-4 rounded-2xl bg-slate-50 border border-slate-100'>
                <label className='block text-sm font-medium text-gray-500 mb-1 flex items-center gap-1.5'>
                  <Phone className='w-4 h-4' />
                  Số điện thoại
                </label>
                <p className='text-sm text-gray-900'>{user.phone}</p>
              </div>
            )}

            {/* Chỉ hiển thị interests nếu là CUSTOMER */}
            {user.role === 'CUSTOMER' && (
              <div className='p-4 rounded-2xl bg-slate-50 border border-slate-100'>
                <label className='block text-sm font-medium text-gray-500 mb-1'>
                  Sở thích
                </label>
                {renderInterests(user.interests)}
              </div>
            )}

            {user.createdAt && (
              <div className='p-4 rounded-2xl bg-slate-50 border border-slate-100'>
                <label className='text-sm font-medium text-gray-500 mb-1 flex items-center gap-1.5'>
                  <Calendar className='w-4 h-4' />
                  Ngày tạo tài khoản
                </label>
                <p className='text-sm text-gray-900'>
                  {new Date(user.createdAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}

            {user.isVerified && (
              <div className='flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-xl border border-green-100'>
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
