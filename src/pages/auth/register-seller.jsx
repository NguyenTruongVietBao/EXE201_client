import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import {
  ArrowLeftIcon,
  Loader2,
  UserPlus,
  Building2,
  ChevronDown,
} from 'lucide-react';
import InputCustom from '../../components/common/InputCustom';
import authServices from '../../services/authServices';

export default function RegisterSeller() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [banksInfo, setBanksInfo] = useState([]);
  console.log('🚀 ~ RegisterSeller ~ banksInfo:', banksInfo);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showBankDropdown, setShowBankDropdown] = useState(false);

  const [form, setForm] = useState({
    name: 'John Doe',
    phone: '0888641656',
    email: 'joindoe@gmail.com',
    password: '123123',
    confirmPassword: '123123',
    bankName: '',
    bankAccountName: '',
    bankAccountNumber: '',
  });

  // Get selected bank info
  const selectedBank = banksInfo.find(
    (bank) => bank.shortName === form.bankName
  );

  const validateForm = () => {
    const newErrors = {};

    // Validate First Name
    if (!form.name.trim()) {
      newErrors.name = 'Họ và tên là bắt buộc';
    } else if (form.name.length < 2) {
      newErrors.name = 'Họ và tên phải có ít nhất 2 ký tự';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Định dạng email không hợp lệ';
    }

    // Validate Password
    if (!form.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (form.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Validate Confirm Password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    // Validate Phone
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!form.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    // Validate Bank Info
    if (!form.bankName) {
      newErrors.bankName = 'Vui lòng chọn ngân hàng';
    }

    if (!form.bankAccountName.trim()) {
      newErrors.bankAccountName = 'Tên tài khoản ngân hàng là bắt buộc';
    }

    if (!form.bankAccountNumber.trim()) {
      newErrors.bankAccountNumber = 'Số tài khoản ngân hàng là bắt buộc';
    } else if (!/^[0-9]{8,20}$/.test(form.bankAccountNumber)) {
      newErrors.bankAccountNumber = 'Số tài khoản phải từ 8-20 chữ số';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 ~ handleSubmit: ~ form:', form);
    if (validateForm()) {
      try {
        setIsLoading(true);
        const result = await authServices.registerSeller({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          bankName: form.bankName,
          bankAccountName: form.bankAccountName,
          bankAccountNumber: form.bankAccountNumber,
        });
        console.log('🚀 ~ handleSubmit: ~ result:', result);
        if (result.status === true) {
          toast.success('Đăng ký thành công');
          navigate('/verify-email', {
            state: {
              email: form.email,
              userId: result.data.user._id,
            },
          });
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.log('An error occurred: ', error);
        toast.error('Có lỗi xảy ra, vui lòng thử lại');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBankSelect = (bankShortName) => {
    setForm((prev) => ({ ...prev, bankName: bankShortName }));
    setShowBankDropdown(false);
    if (errors.bankName) {
      setErrors((prev) => ({ ...prev, bankName: '' }));
    }
  };

  useEffect(() => {
    const fetchBanksInfo = async () => {
      try {
        const result = await authServices.getBanksInfo();
        if (result.code === '00') {
          setBanksInfo(result.data);
        }
      } catch (error) {
        console.log('Error fetching banks:', error);
      }
    };
    fetchBanksInfo();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-r from-emerald-50/90 via-white/95 to-cyan-50/90 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className='card w-full max-w-2xl bg-base-100 shadow-xl'>
        <div className='card-body'>
          <div className='text-center mb-8'>
            <div className='grid grid-cols-3 items-center'>
              <Link to='/' className='justify-self-start'>
                <ArrowLeftIcon className='w-6 h-6 text-primary' />
              </Link>
              <Link
                to='/'
                className='normal-case text-3xl font-bold text-primary mb-2 justify-self-center'
              >
                <img
                  src='/exe201-logo.png'
                  alt='Prilab'
                  className='w-auto h-15'
                />
              </Link>
              <div></div>
            </div>
            <h2 className='text-2xl font-semibold'>Đăng ký làm người bán</h2>
            <p className='text-base-content/70'>
              Đăng ký tài khoản seller để có thể đăng tài liệu của bạn.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-3'>
            <div className='flex flex-row justify-around'>
              <div className='space-y-3'>
                <InputCustom
                  type='text'
                  name='name'
                  label='Họ và tên'
                  placeholder='John Doe'
                  form={form}
                  handleChange={handleChange}
                />
                {errors.name && (
                  <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
                )}

                <InputCustom
                  type='email'
                  name='email'
                  label='Email'
                  placeholder='Nhập email'
                  form={form}
                  handleChange={handleChange}
                />
                {errors.email && (
                  <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
                )}

                <InputCustom
                  type='password'
                  name='password'
                  label='Mật khẩu'
                  placeholder='Nhập mật khẩu'
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  form={form}
                  handleChange={handleChange}
                />
                {errors.password && (
                  <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
                )}

                <InputCustom
                  type='password'
                  name='confirmPassword'
                  label='Xác nhận mật khẩu'
                  placeholder='Nhập lại mật khẩu'
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                  form={form}
                  handleChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.confirmPassword}
                  </p>
                )}

                <InputCustom
                  type='text'
                  name='phone'
                  label='Số điện thoại'
                  placeholder='Nhập số điện thoại'
                  form={form}
                  handleChange={handleChange}
                />
                {errors.phone && (
                  <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>
                )}
              </div>

              <div className='space-y-3'>
                {/* Custom Bank Dropdown */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Ngân hàng</span>
                  </label>
                  <div className='relative max-w-64'>
                    <button
                      type='button'
                      className='border border-gray-400 rounded-lg text-gray-700 text-lg w-full pl-10 py-2 pr-10 bg-white text-left'
                      onClick={() => setShowBankDropdown(!showBankDropdown)}
                    >
                      {selectedBank ? (
                        <div className='flex items-center space-x-3'>
                          <img
                            src={selectedBank.logo}
                            alt={selectedBank.shortName}
                            className='w-6 h-6 object-contain'
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <span className='font-medium'>
                            {selectedBank.shortName}
                          </span>
                          <span className='text-gray-500 text-sm truncate'>
                            {selectedBank.name}
                          </span>
                        </div>
                      ) : (
                        <span className='text-gray-500'>Chọn ngân hàng</span>
                      )}
                    </button>
                    <Building2 className='w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2' />
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${
                        showBankDropdown ? 'rotate-180' : ''
                      }`}
                    />

                    {showBankDropdown && (
                      <div className='absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                        {banksInfo.map((bank) => (
                          <button
                            key={bank.id}
                            type='button'
                            className='w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0'
                            onClick={() => handleBankSelect(bank.shortName)}
                          >
                            <div className='flex items-center space-x-3'>
                              <img
                                src={bank.logo}
                                alt={bank.shortName}
                                className='w-8 h-8 object-contain flex-shrink-0'
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                              <div className='flex-1 min-w-0'>
                                <div className='font-medium text-gray-900'>
                                  {bank.shortName}
                                </div>
                                <div className='text-sm text-gray-500 truncate'>
                                  {bank.name}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.bankName && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.bankName}
                    </p>
                  )}
                </div>

                <InputCustom
                  type='text'
                  name='bankAccountName'
                  label='Tên tài khoản ngân hàng'
                  placeholder='Nhập tên chủ tài khoản'
                  form={form}
                  handleChange={handleChange}
                />
                {errors.bankAccountName && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.bankAccountName}
                  </p>
                )}

                <InputCustom
                  type='text'
                  name='bankAccountNumber'
                  label='Số tài khoản ngân hàng'
                  placeholder='Nhập số tài khoản'
                  form={form}
                  handleChange={handleChange}
                />
                {errors.bankAccountNumber && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.bankAccountNumber}
                  </p>
                )}
              </div>
            </div>

            <div className='form-control mt-10'>
              <button
                type='submit'
                className='btn btn-outline btn-primary btn-lg w-full py-3 border-2'
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                ) : (
                  <UserPlus className='w-5 h-5 mr-2' />
                )}
                {isLoading ? 'Đang xử lý...' : 'Tạo tài khoản'}
              </button>
            </div>
          </form>

          <div className='mt-8 text-center text-md font-semibold'>
            Đã có tài khoản?{' '}
            <Link to='/login' className='link link-primary font-semibold'>
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
