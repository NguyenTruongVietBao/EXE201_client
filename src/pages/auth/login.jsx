import React, { useState } from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

let TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'token';

function Login() {
  const { login, isLoading } = useAuthStore();
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

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Login now!</h1>
          <p className='py-6'>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
          <div className='card-body'>
            <fieldset className='fieldset'>
              <label className='label'>Email</label>
              <input
                type='email'
                className='input'
                placeholder='Email'
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <label className='label'>Password</label>
              <input
                type='password'
                className='input'
                placeholder='Password'
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <div>
                <Link to='/forgot-password' className='link link-hover'>
                  Forgot password?
                </Link>
              </div>
              <button
                className='btn btn-neutral mt-4'
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
