import React from 'react';
import useAuthStore from '../../stores/useAuthStore';
import {
  LogOut,
  User,
  Lock,
  BookOpen,
  LayoutDashboard,
  AlertCircle,
  Users,
  CreditCard,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { USER_ROLE } from '../../constants';

const { CUSTOMER, MANAGER, SELLER, ADMIN } = USER_ROLE;

export default function HeaderAvatar({ className }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const userRole = user?.role;

  const customerLinks = [
    {
      href: '/customer/my-documents',
      label: 'Tài liệu của tôi',
      icon: <BookOpen size={16} />,
    },
    {
      href: '/customer/my-groups',
      label: 'Nhóm của tôi',
      icon: <Users size={16} />,
    },
    {
      href: '/customer/refunds-requests',
      label: 'Yêu cầu hoàn trả',
      icon: <AlertCircle size={16} />,
    },
    {
      href: '/customer/payment-history',
      label: 'Lịch sử thanh toán',
      icon: <CreditCard size={16} />,
    },
  ];
  const sellerLinks = [
    {
      href: '/seller/my-documents',
      label: 'Tài liệu của tôi',
      icon: <BookOpen size={16} />,
    },
    { href: '/seller/billing', label: 'Billing', icon: <BookOpen size={16} /> },
  ];

  const managerLinks = [
    {
      href: '/manager',
      label: 'Bảng điều khiển',
      icon: <LayoutDashboard size={16} />,
    },
    {
      href: '/manager/documents',
      label: 'Tài liệu',
      icon: <BookOpen size={16} />,
    },
  ];

  const adminLinks = [
    {
      href: '/admin/dashboard',
      label: 'Bảng điều khiển',
      icon: <LayoutDashboard size={16} />,
    },
    { href: '/admin/users', label: 'Người dùng', icon: <BookOpen size={16} /> },
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
      : [];

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
              `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${user?.name}`
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
            Hồ sơ
          </Link>
        </li>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className='flex items-center justify-start gap-5'
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to='/change-password'
            className='flex items-center justify-start gap-5'
          >
            <span>
              <Lock size={16} />
            </span>
            Thay đổi mật khẩu
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className='text-red-700 font-bold flex items-center justify-start gap-5'
          >
            <span>
              <LogOut size={16} className='mr-1' />
            </span>
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
}
