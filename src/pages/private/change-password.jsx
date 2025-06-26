import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Key,
  AlertCircle,
} from 'lucide-react';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Đánh giá độ mạnh mật khẩu
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Yếu';
    if (passwordStrength < 50) return 'Trung bình';
    if (passwordStrength < 75) return 'Mạnh';
    return 'Rất mạnh';
  };

  const validate = () => {
    if (!oldPassword.trim()) {
      toast.error('Vui lòng nhập mật khẩu hiện tại');
      return false;
    }
    if (!newPassword.trim()) {
      toast.error('Vui lòng nhập mật khẩu mới');
      return false;
    }
    if (newPassword.length < 8) {
      toast.error('Mật khẩu mới phải có ít nhất 8 ký tự');
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Xác nhận mật khẩu không khớp');
      return false;
    }
    if (oldPassword === newPassword) {
      toast.error('Mật khẩu mới phải khác mật khẩu hiện tại');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsLoading(true);
        // TODO: Implement API call to change password
        // await authService.changePassword({ oldPassword, newPassword });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        toast.success('Đổi mật khẩu thành công!');
        navigate('/customer/profile');
      } catch (error) {
        console.error('Error changing password:', error);
        toast.error('Có lỗi xảy ra khi đổi mật khẩu');
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='text-center'>
            <div className='w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Lock className='w-10 h-10 text-white' />
            </div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2'>
              Đổi mật khẩu
            </h1>
          </div>
        </div>

        {/* Form */}
        <div className='max-w-md mx-auto'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Old Password */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  <Key className='w-4 h-4 inline mr-2' />
                  Mật khẩu hiện tại *
                </label>
                <div className='relative'>
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder='Nhập mật khẩu hiện tại'
                    className='w-full px-4 py-3 pl-12 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                    required
                  />
                  <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <button
                    type='button'
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showOldPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  <Shield className='w-4 h-4 inline mr-2' />
                  Mật khẩu mới *
                </label>
                <div className='relative'>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder='Nhập mật khẩu mới'
                    className='w-full px-4 py-3 pl-12 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                    required
                  />
                  <Shield className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <button
                    type='button'
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showNewPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className='mt-3'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-xs text-gray-500'>
                        Độ mạnh mật khẩu:
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength < 50
                            ? 'text-red-600'
                            : passwordStrength < 75
                            ? 'text-orange-600'
                            : 'text-green-600'
                        }`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <div className='mt-2 text-xs text-gray-500'>
                      <p>Mật khẩu nên có:</p>
                      <ul className='mt-1 space-y-1'>
                        <li
                          className={`flex items-center gap-1 ${
                            newPassword.length >= 8
                              ? 'text-green-600'
                              : 'text-gray-400'
                          }`}
                        >
                          {newPassword.length >= 8 ? (
                            <CheckCircle className='w-3 h-3' />
                          ) : (
                            <XCircle className='w-3 h-3' />
                          )}
                          Ít nhất 8 ký tự
                        </li>
                        <li
                          className={`flex items-center gap-1 ${
                            /[A-Z]/.test(newPassword)
                              ? 'text-green-600'
                              : 'text-gray-400'
                          }`}
                        >
                          {/[A-Z]/.test(newPassword) ? (
                            <CheckCircle className='w-3 h-3' />
                          ) : (
                            <XCircle className='w-3 h-3' />
                          )}
                          Chữ hoa
                        </li>
                        <li
                          className={`flex items-center gap-1 ${
                            /[0-9]/.test(newPassword)
                              ? 'text-green-600'
                              : 'text-gray-400'
                          }`}
                        >
                          {/[0-9]/.test(newPassword) ? (
                            <CheckCircle className='w-3 h-3' />
                          ) : (
                            <XCircle className='w-3 h-3' />
                          )}
                          Số
                        </li>
                        <li
                          className={`flex items-center gap-1 ${
                            /[^A-Za-z0-9]/.test(newPassword)
                              ? 'text-green-600'
                              : 'text-gray-400'
                          }`}
                        >
                          {/[^A-Za-z0-9]/.test(newPassword) ? (
                            <CheckCircle className='w-3 h-3' />
                          ) : (
                            <XCircle className='w-3 h-3' />
                          )}
                          Ký tự đặc biệt
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  <Shield className='w-4 h-4 inline mr-2' />
                  Xác nhận mật khẩu *
                </label>
                <div className='relative'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Nhập lại mật khẩu mới'
                    className={`w-full px-4 py-3 pl-12 pr-12 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                      confirmPassword && newPassword !== confirmPassword
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : confirmPassword && newPassword === confirmPassword
                        ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                        : 'border-gray-200 focus:ring-purple-500 focus:border-transparent'
                    }`}
                    required
                  />
                  <Shield className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>

                {/* Confirm Password Validation */}
                {confirmPassword && (
                  <div className='mt-2'>
                    {newPassword === confirmPassword ? (
                      <div className='flex items-center gap-2 text-green-600 text-sm'>
                        <CheckCircle className='w-4 h-4' />
                        <span>Mật khẩu khớp</span>
                      </div>
                    ) : (
                      <div className='flex items-center gap-2 text-red-600 text-sm'>
                        <AlertCircle className='w-4 h-4' />
                        <span>Mật khẩu không khớp</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={
                  isLoading ||
                  passwordStrength < 50 ||
                  newPassword !== confirmPassword
                }
                className='w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg'
              >
                {isLoading ? (
                  <>
                    <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Shield className='w-5 h-5' />
                    Cập nhật mật khẩu
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
