import React, { useState } from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { ArrowLeftIcon, Loader2, UserPlus } from 'lucide-react';
import InputCustom from '../../components/common/InputCustom';

function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: 'John Doe',
    phone: '0888641656',
    email: 'joindoe@gmail.com',
    password: '123123',
    confirmPassword: '123123',
  });

  const validateForm = () => {
    const newErrors = {};

    // Validate First Name
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.length < 2) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Validate Password
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Validate Confirm Password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 ~ handleSubmit: ~ form:', form);
    if (validateForm()) {
      try {
        const result = await register(form);
        console.log('🚀 ~ handleSubmit: ~ result:', result);
        if (result.status === true) {
          toast.success('Register successfully');
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

  return (
    <div className='min-h-screen bg-gradient-to-r from-emerald-50/90 via-white/95 to-cyan-50/90 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className='card w-full max-w-lg bg-base-100 shadow-xl'>
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
            <h2 className='text-2xl font-semibold'>Đăng ký tài khoản</h2>
            <p className='text-base-content/70'>
              Đăng ký để tiếp tục sử dụng dịch vụ của chúng tôi.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-3'>
            <InputCustom
              type='text'
              name='name'
              label='Họ và tên'
              placeholder='John Doe'
              form={form}
              handleChange={handleChange}
            />

            <InputCustom
              type='email'
              name='email'
              label='Email'
              placeholder='Nhập email'
              form={form}
              handleChange={handleChange}
            />

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
            <InputCustom
              type='text'
              name='phone'
              label='Số điện thoại'
              placeholder='Nhập số điện thoại'
              form={form}
              handleChange={handleChange}
            />

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
                {isLoading ? '' : 'Tạo tài khoản'}
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

export default Register;
