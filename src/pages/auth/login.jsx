import React, { useState } from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { GithubIcon, LogInIcon } from 'lucide-react';
import InputCustom from '../../components/common/InputCustom';

let TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'token';

function Login() {
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: 'bao@gmail.com',
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
    <div className='min-h-screen bg-base-200 flex items-center justify-center p-4'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl'>
        <div className='card-body'>
          <div className='text-center mb-8'>
            <Link
              href='/'
              className='btn btn-ghost normal-case text-2xl font-bold text-primary mb-2'
            >
              StudySphere
            </Link>
            <h2 className='text-3xl font-semibold'>Welcome Back!</h2>
            <p className='text-base-content/70'>
              Sign in to continue to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
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

            <div className='form-control mt-6'>
              <button
                type='submit'
                className='btn btn-primary w-full'
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className='loading loading-spinner'></span>
                ) : (
                  <LogInIcon className='w-5 h-5 mr-2' />
                )}
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          <div className='divider my-6'>OR</div>

          {/* Placeholder for Social Logins */}
          <div className='space-y-2'>
            <button className='btn btn-outline w-full'>
              {/* <GoogleIcon className='w-5 h-5 mr-2' /> */}
              Sign in with Google
            </button>
            <button className='btn btn-outline  w-full'>
              <GithubIcon className='w-5 h-5 mr-2' /> Sign in with GitHub
            </button>
          </div>

          <p className='mt-8 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link
              href='/register'
              passHref
              className='link link-primary font-medium'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
