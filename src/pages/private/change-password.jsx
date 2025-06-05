import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    if (newPassword !== confirmPassword) {
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
        <div className='card bg-base-100 shrink-0 shadow-2xl'>
          <div className='card-body '>
            <form onSubmit={handleSubmit} className=''>
              <div className='form-group flex flex-col gap-5'>
                <div>
                  <label htmlFor='oldPassword'>Old Password</label>
                  <input
                    type='password'
                    className='input'
                    placeholder='Old Password'
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor='newPassword'>New Password</label>
                  <input
                    type='password'
                    className='input'
                    placeholder='New Password'
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
