import React from 'react';
import ThemeToggle from '../common/ThemeToggle';
import { LogIn, UserPlus } from 'lucide-react';
import useAuthStore from '../../stores/useAuthStore';
import { Link } from 'react-router';
import { USER_ROLE } from '../../constants';
import HeaderAvatar from './HeaderAvatar';

const Header = () => {
  const { user } = useAuthStore();
  const userRole = user?.role;

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
    <div className='navbar  bg-base-100 shadow-md sticky top-0 z-50 '>
      <div className='navbar-start flex items-center'>
        <a className='btn btn-ghost text-xl'>Messenger App</a>
      </div>
      <div className='navbar-center flex items-start gap-16'>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className='text-sm font-semibold'
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className='navbar-end flex items-center gap-5'>
        {/* Search */}

        {/* User */}
        {user ? (
          <div className='flex items-center gap-4'>
            <label className='input mr-10'>
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
            <HeaderAvatar />
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <Link to='/login' className='btn btn-soft btn-primary btn-md'>
              <LogIn className='w-4 h-4 mr-1' /> Login
            </Link>
            <Link to='/register' className='btn btn-primary btn-md'>
              <UserPlus className='w-4 h-4 mr-1' /> Register
            </Link>
          </div>
        )}
        {/* Theme Toggle */}
        <div className='dropdown dropdown-end'>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
