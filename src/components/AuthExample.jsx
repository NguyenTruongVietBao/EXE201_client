import React, { useState, useEffect } from 'react';
import useAuthStore from '../stores/useAuthStore';

const AuthExample = () => {
  const {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError,
    initializeAuth,
  } = useAuthStore();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [activeTab, setActiveTab] = useState('login');

  // Initialize auth khi component mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Clear error khi chuyển tab
  useEffect(() => {
    clearError();
  }, [activeTab, clearError]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const result = await login({
      email: loginForm.email,
      password: loginForm.password,
    });

    if (result.success) {
      console.log('Đăng nhập thành công:', result.data);
      // Reset form
      setLoginForm({ email: '', password: '' });
    } else {
      console.log('Đăng nhập thất bại:', result.error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp');
      return;
    }

    const result = await register({
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
    });

    if (result.success) {
      console.log('Đăng ký thành công:', result.data);
      // Reset form và chuyển sang tab login
      setRegisterForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setActiveTab('login');
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
    } else {
      console.log('Đăng ký thất bại:', result.error);
    }
  };

  const handleLogout = () => {
    logout();
    console.log('Đã đăng xuất');
  };

  // Nếu đã authenticated, hiển thị profile
  if (isAuthenticated && user) {
    return (
      <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-green-600 mb-4'>Chào mừng!</h2>
        <div className='space-y-3'>
          <div>
            <span className='font-semibold'>Tên:</span> {user.name}
          </div>
          <div>
            <span className='font-semibold'>Email:</span> {user.email}
          </div>
          <div>
            <span className='font-semibold'>Role:</span> {user.role}
          </div>
          {user.avatar && (
            <div>
              <span className='font-semibold'>Avatar:</span>
              <img
                src={user.avatar}
                alt='Avatar'
                className='w-16 h-16 rounded-full mt-2'
              />
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className='w-full mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors'
        >
          Đăng xuất
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
      {/* Tab Headers */}
      <div className='flex mb-6 border-b'>
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-2 text-center font-semibold ${
            activeTab === 'login'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Đăng nhập
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-2 text-center font-semibold ${
            activeTab === 'register'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Đăng ký
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
          {error}
        </div>
      )}

      {/* Login Form */}
      {activeTab === 'login' && (
        <form onSubmit={handleLoginSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              type='email'
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Mật khẩu
            </label>
            <input
              type='password'
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, password: e.target.value }))
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      )}

      {/* Register Form */}
      {activeTab === 'register' && (
        <form onSubmit={handleRegisterSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Tên
            </label>
            <input
              type='text'
              value={registerForm.name}
              onChange={(e) =>
                setRegisterForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              type='email'
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Mật khẩu
            </label>
            <input
              type='password'
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Xác nhận mật khẩu
            </label>
            <input
              type='password'
              value={registerForm.confirmPassword}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthExample;
