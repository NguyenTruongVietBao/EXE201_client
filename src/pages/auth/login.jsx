import React, { useState } from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { Loader2, LogInIcon, ArrowLeftIcon } from 'lucide-react';
import InputCustom from '../../components/common/InputCustom';

function Login() {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: 'bao@gmail.com',
    password: '123123',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    if (result.status === true) {
      toast.success('Đăng nhập thành công');
      switch (result.data.user.role) {
        case 'CUSTOMER':
          navigate('/customer');
          break;
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'MANAGER':
          navigate('/manager');
          break;
        case 'SELLER':
          navigate('/seller');
          break;
        default:
          navigate('/');
          break;
      }
    } else {
      if (result.statusCode === 403) {
        toast.error(result.message);
        navigate(`/verify-email`, {
          state: {
            email: form.email,
          },
        });
      } else {
        toast.error(result.message);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-emerald-50/90 via-white/95 to-cyan-50/90 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl'>
        <div className='card-body'>
          <div className='text-center mb-8'>
            <div className='grid grid-cols-3 items-center'>
              <Link to='/' className='justify-self-start'>
                <ArrowLeftIcon className='w-6 h-6 text-primary' />
              </Link>
              <Link
                href='/'
                className='btn btn-ghost normal-case text-3xl font-bold text-primary mb-2 justify-self-center'
              >
                Prilab
              </Link>
              <div></div>
            </div>
            <h2 className='text-2xl font-semibold'>Chào mừng trở lại !</h2>
            <p className='text-base-content/70'>
              Đăng nhập để tiếp tục sử dụng hệ thống
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <InputCustom
              type='email'
              name='email'
              placeholder='Nhập email'
              form={form}
              handleChange={handleChange}
            />

            <InputCustom
              type='password'
              name='password'
              placeholder='Nhập mật khẩu'
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              form={form}
              handleChange={handleChange}
            />
            <div className='flex justify-end'>
              <Link
                to='/forgot-password'
                className='text-sm text-gray-500 hover:text-gray-700 font-semibold'
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div className='form-control mt-5 '>
              <button
                type='submit'
                className='btn btn-outline btn-primary btn-lg w-full py-3 border-2'
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                ) : (
                  <LogInIcon className='w-5 h-5 mr-2' />
                )}
                {isLoading ? '' : 'Đăng nhập'}
              </button>
            </div>
          </form>

          <div className='mt-8 text-center text-md font-semibold'>
            Chưa có tài khoản?{' '}
            <Link to='/register' className='link link-primary font-semibold'>
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
