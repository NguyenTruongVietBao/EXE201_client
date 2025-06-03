import React from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { LogOut, Settings, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export default function HeaderAvatar({ className }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  console.log('🚀 ~ HeaderAvatar ~ user:', user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <div
        tabIndex={0}
        role='button'
        className='btn btn-ghost btn-circle avatar'
      >
        <div className='w-10 rounded-full shadow-sm'>
          <img
            alt='Tailwind CSS Navbar component'
            src={
              user?.avatar ||
              `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${user?.firstName}${user?.lastName}`
            }
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className='menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-2 border border-base-content '
      >
        <li>
          <Link to='/profile' className='flex items-center justify-start gap-5'>
            <span>
              <User size={16} />
            </span>
            Profile
          </Link>
        </li>
        <li>
          <Link to='/setting' className='flex items-center justify-start gap-5'>
            <span>
              <Settings size={16} />
            </span>
            Settings
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className='text-red-700 font-bold flex items-center justify-start gap-5'
          >
            <span>
              <LogOut size={16} />
            </span>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
