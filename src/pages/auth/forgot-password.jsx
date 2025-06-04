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
    <div className='flex flex-col items-center justify-center h-screen gap-10'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-3xl font-bold'>Forgot Password</h1>
        <p className='text-sm text-gray-500'>
          Please enter your email address to reset your password.
        </p>
      </div>
      <div className=''>
        <form onSubmit={handleSubmit} className='w-full max-w-xl'>
          <div className='form-group flex gap-2 items-center w-full'>
            <input
              type='email'
              className='input'
              placeholder='Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit' className='btn btn-primary'>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
