import React, { useState, useEffect } from 'react';
import ThemeToggle from '../common/ThemeToggle';
import { LogIn, Search, UserPlus, Menu, X } from 'lucide-react';
import useAuthStore from '../../stores/useAuthStore';
import { Link } from 'react-router';
import { USER_ROLE } from '../../constants';
import HeaderAvatar from './HeaderAvatar';

const { CUSTOMER, MANAGER, SELLER, ADMIN } = USER_ROLE;

const Header = () => {
  const { user } = useAuthStore();
  const userRole = user?.role;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const guestLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/register-seller', label: 'Become a Seller' },
  ];
  const customerLinks = [
    { href: '/customer', label: 'Home' },
    { href: '/customer/documents', label: 'Documents Library' },
    { href: '/customer/study-plan', label: 'Study Plan' },
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
    userRole === CUSTOMER
      ? customerLinks
      : userRole === MANAGER
      ? managerLinks
      : userRole === SELLER
      ? sellerLinks
      : userRole === ADMIN
      ? adminLinks
      : userRole === 'User'
      ? customerLinks
      : guestLinks;

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg'
            : 'bg-gradient-to-r from-white/95 via-gray-50/90 to-white/95 backdrop-blur-sm'
        }`}
      >
        <div className='container mx-auto px-4 md:px-8'>
          <div className='flex items-center justify-between h-16 md:h-20'>
            {/* Logo */}
            <div className='flex items-center'>
              <Link
                to='/'
                className='gap-2 group flex items-center space-x-2 text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300'
              >
                <div className='w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                  <span className='text-white font-bold text-sm md:text-base'>
                    P
                  </span>
                </div>
                Prilab
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center space-x-1'>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className='px-4 py-2 text-md font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 relative group'
                >
                  {link.label}
                  <span className='absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full'></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className='hidden lg:flex items-center space-x-4'>
              {user ? (
                <div className='flex items-center gap-10'>
                  {/* Search */}
                  <div className='relative group bg-base-100'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Search className='w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200' />
                    </div>
                    <input
                      type='search'
                      placeholder='Search...'
                      className='w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200'
                    />
                  </div>
                  <HeaderAvatar />
                </div>
              ) : (
                <div className='flex items-center space-x-3'>
                  <Link
                    to='/login'
                    className='px-4 py-2 text-md font-semibold text-gray-700 hover:text-blue-600 rounded-xl transition-colors duration-200'
                  >
                    Login
                  </Link>
                  <Link
                    to='/register'
                    className='px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-md font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2'
                  >
                    <UserPlus className='w-4 h-4' />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className='lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'
              aria-label='Toggle mobile menu'
            >
              {isMobileMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-40 lg:hidden'>
          {/* Backdrop */}
          <div
            className='fixed inset-0 bg-black/50 backdrop-blur-sm'
            onClick={handleMobileMenuToggle}
          ></div>

          {/* Menu Panel */}
          <div className='fixed top-16 md:top-20 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-xl'>
            <div className='container mx-auto px-4 py-6'>
              {/* Navigation Links */}
              <nav className='space-y-1 mb-6'>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={handleMobileMenuToggle}
                    className='block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Search */}
              {user && (
                <div className='mb-6'>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Search className='w-4 h-4 text-gray-400' />
                    </div>
                    <input
                      type='search'
                      placeholder='Search documents...'
                      className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200'
                    />
                  </div>
                </div>
              )}

              {/* Mobile Actions */}
              {!user && (
                <div className='flex flex-col space-y-3'>
                  <Link
                    to='/login'
                    onClick={handleMobileMenuToggle}
                    className='w-full px-4 py-3 text-center text-base font-medium text-gray-700 hover:text-blue-600 border border-gray-300 rounded-xl transition-colors duration-200'
                  >
                    Login
                  </Link>
                  <Link
                    to='/register'
                    onClick={handleMobileMenuToggle}
                    className='w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-base font-medium rounded-xl transition-all duration-300 text-center flex items-center justify-center space-x-2'
                  >
                    <UserPlus className='w-4 h-4' />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className='h-16 md:h-20'></div>
    </>
  );
};

export default Header;
