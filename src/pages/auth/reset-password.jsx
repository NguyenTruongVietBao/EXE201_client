import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    if (password !== confirmPassword) {
      toast.error('Password and confirm password do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/login');
    }
  };
  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Reset Password</h1>
        </div>
        <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  className='input'
                  placeholder='Password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  type='password'
                  className='input'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type='submit' className='btn btn-primary'>
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
