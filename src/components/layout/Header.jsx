import React, { useState, useEffect } from 'react';
import { Search, UserPlus } from 'lucide-react';
import useAuthStore from '../../stores/useAuthStore';
import { Link, useLocation } from 'react-router';
import { USER_ROLE } from '../../constants';
import HeaderAvatar from './HeaderAvatar';

const { CUSTOMER, MANAGER, SELLER, ADMIN } = USER_ROLE;

const Header = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const userRole = user?.role;
  const [isScrolled, setIsScrolled] = useState(false);

  const isLandingPage = location.pathname === '/';

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
    { href: '/', label: 'Trang chủ' },
    { href: '/about', label: 'Giới thiệu' },
    { href: '/register-seller', label: 'Trở thành nhà bán hàng' },
  ];
  const customerLinks = [
    { href: '/customer', label: 'Trang chủ' },
    { href: '/customer/documents', label: 'Tài liệu' },
    { href: '/customer/partners', label: 'Bạn học' },
    { href: '/customer/groups', label: 'Nhóm học tập' },
    { href: '/customer/chat', label: 'Tin nhắn' },
  ];

  const managerLinks = [
    { href: '/manager', label: 'Bảng điều khiển' },
    { href: '/manager/documents', label: 'Tài liệu' },
    { href: '/manager/refunds-requests', label: 'Yêu cầu hoàn trả' },
    { href: '/manager/withdrawals', label: 'Yêu cầu rút tiền' },
  ];

  const sellerLinks = [
    { href: '/seller', label: 'Bảng điều khiển' },
    { href: '/seller/my-documents', label: 'Tài liệu của tôi' },
    { href: '/seller/refunds-requests', label: 'Yêu cầu hoàn trả' },
    { href: '/seller/withdrawals', label: 'Rút tiền' },
  ];

  const adminLinks = [
    { href: '/admin', label: 'Bảng điều khiển' },
    { href: '/admin/users', label: 'Người dùng' },
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
      : guestLinks;

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg'
            : isLandingPage
            ? 'bg-gradient-to-r from-emerald-50/90 via-white/95 to-cyan-50/90 backdrop-blur-sm'
            : 'bg-white border-b border-gray-200/50'
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
                <img
                  src='/exe201-logo.png'
                  alt='Prilab'
                  className='w-auto h-20'
                />
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
                  <div className='relative group bg-base-100 rounded-xl'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Search className='w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200' />
                    </div>
                    <input
                      type='search'
                      placeholder='Search...'
                      className='w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200'
                    />
                  </div>
                  <HeaderAvatar navLinks={navLinks} />
                </div>
              ) : (
                <div className='flex items-center space-x-3'>
                  <Link
                    to='/login'
                    className='px-4 py-2 text-md font-semibold text-gray-700 hover:text-blue-600 rounded-xl transition-colors duration-200'
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to='/register'
                    className='px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-md font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2'
                  >
                    <UserPlus className='w-4 h-4' />
                    <span>Đăng ký</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className='h-16 md:h-20'></div>
    </>
  );
};

export default Header;
