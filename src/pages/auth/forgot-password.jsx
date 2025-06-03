import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    navigate('/reset-password');
  };

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Forgot Password</h1>
        </div>
        <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='input'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type='submit' className='btn btn-primary'>
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
