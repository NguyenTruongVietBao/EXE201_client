import React, { useState } from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { Loader2, LogInIcon, ArrowLeftIcon } from 'lucide-react';
import InputCustom from '../../components/common/InputCustom';
import envConfig from '../../configs/envConfig';

const TOKEN_KEY = envConfig.TOKEN_KEY;

function Login() {
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: 'a.baocute0204@gmail.com',
    password: 'Baonguyen1303.',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    console.log('🚀 ~ handleSubmit: ~ result:', result);
    if (result.status === true) {
      localStorage.setItem(TOKEN_KEY, result.data.token);
      toast.success('Login successfully');
      navigate('/profile');
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
            <h2 className='text-2xl font-semibold'>Welcome Back!</h2>
            <p className='text-base-content/70'>
              Sign in to continue to your account.
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
                Forgot password?
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
                {isLoading ? '' : 'Login'}
              </button>
            </div>
          </form>

          <div className='mt-8 text-center text-md font-semibold'>
            Don&apos;t have an account?{' '}
            <Link to='/register' className='link link-primary font-semibold'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
