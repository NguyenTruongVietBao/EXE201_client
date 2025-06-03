import React from 'react';
import ThemeToggle from '../common/ThemeToggle';
import { ArrowRight, LogOut, Settings, User } from 'lucide-react';
import useAuthStore from '../../stores/useAuthStore';
import { Link } from 'react-router';
import { USER_ROLE } from '../../constants';

const Header = () => {
  const { user, logout } = useAuthStore();
  const userRole = user?.role;

  const handleLogout = () => {
    logout();
  };

  const guestLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  const customerLinks = [
    { href: '/courses', label: 'Courses' },
    { href: '/document', label: 'Documents' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];
  const userLinks = [
    { href: '/courses', label: 'Courses' },
    { href: '/document', label: 'Documents' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  const managerLinks = [
    { href: '/manager/dashboard', label: 'Dashboard' },
    { href: '/manager/users', label: 'Users' },
    { href: '/manager/documents', label: 'Documents' },
  ];

  const sellerLinks = [
    { href: '/seller/dashboard', label: 'Dashboard' },
    { href: '/seller/users', label: 'Users' },
    { href: '/seller/documents', label: 'Documents' },
  ];

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/documents', label: 'Documents' },
  ];

  const navLinks =
    userRole === USER_ROLE.CUSTOMER
      ? customerLinks
      : userRole === USER_ROLE.MANAGER
      ? managerLinks
      : userRole === USER_ROLE.SELLER
      ? sellerLinks
      : userRole === USER_ROLE.ADMIN
      ? adminLinks
      : userRole === USER_ROLE.USER
      ? userLinks
      : guestLinks;

  return (
    <div className='navbar flex justify-around bg-base-100 shadow-md'>
      <div className='flex'>
        <a className='btn btn-ghost text-xl'>Messenger App</a>
      </div>
      <div className='flex items-center gap-16'>
        {navLinks.map((link) => (
          <Link key={link.href} to={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className='flex items-center gap-2'>
        {/* Search */}
        <label className='input'>
          <svg
            className='h-[1em] opacity-50'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2.5'
              fill='none'
              stroke='currentColor'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.3-4.3'></path>
            </g>
          </svg>
          <input type='search' required placeholder='Search' />
        </label>
        {/* Theme Toggle */}
        <div className='dropdown dropdown-end'>
          <ThemeToggle />
        </div>
        {/* User */}
        {user ? (
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full shadow-sm'>
                <img
                  alt='Tailwind CSS Navbar component'
                  src='https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Brooklynn'
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-2'
            >
              <li>
                <Link
                  to='/profile'
                  className='flex items-center justify-start gap-5'
                >
                  <span>
                    <User size={16} />
                  </span>
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to='/setting'
                  className='flex items-center justify-start gap-5'
                >
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
        ) : (
          <div className='dropdown dropdown-end flex gap-2'>
            <Link to='/login'>
              <button className='btn btn-soft btn-primary rounded-lg'>
                Login
              </button>
            </Link>
            <Link to='/register'>
              <button className='btn btn-primary flex items-center gap-2 rounded-xl'>
                Register
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
