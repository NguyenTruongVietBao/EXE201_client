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
      <div className='hero-content flex items-center justify-center gap-5'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Reset Password</h1>
        </div>
        <div className='card bg-base-100 shrink-0 shadow-2xl'>
          <div className='card-body '>
            <form onSubmit={handleSubmit} className=''>
              <div className='form-group flex flex-col gap-5'>
                <div>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    className='input'
                    placeholder='Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <input
                    type='password'
                    className='input'
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary w-full max-w-sm'
                >
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
