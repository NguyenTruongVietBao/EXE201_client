import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import logo from '../../assets/exe201-logo.png';

function Footer() {
  return (
    <footer className='bg-gradient-to-br from-slate-900 to-slate-800 text-white'>
      <div className='max-w-7xl mx-auto p-4 pt-8'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          {/* Brand Section */}
          <div className='lg:col-span-2'>
            <div className='flex items-center mb-4'>
              <img
                src={logo}
                alt='StudySphere Logo'
                className='w-auto h-15 mr-3'
              />
            </div>
            <p className='text-slate-300 mb-4 leading-relaxed'>
              Nền tảng chia sẻ tài liệu học tập với công nghệ AI tiên tiến. Kết
              nối sinh viên, trao đổi kiến thức và xây dựng cộng đồng học tập
              mạnh mẽ.
            </p>
            <div className='flex gap-4'>
              <a
                href='https://www.facebook.com/profile.php?id=61577253997316'
                aria-label='Facebook'
                className='bg-slate-700 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110'
              >
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='https://www.instagram.com/viethere.prilab/'
                aria-label='Instagram'
                className='bg-slate-700 hover:bg-pink-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110'
              >
                <Instagram className='w-5 h-5' />
              </a>
              <a
                href='mailto:weare.viethere@gmail.com'
                aria-label='Email'
                className='bg-slate-700 hover:bg-red-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110'
              >
                <Mail className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4 text-white'>
              Liên kết nhanh
            </h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='/customer/documents'
                  className='text-slate-300 hover:text-white transition-colors duration-200'
                >
                  Tài liệu học tập
                </a>
              </li>
              <li>
                <a
                  href='/customer/groups'
                  className='text-slate-300 hover:text-white transition-colors duration-200'
                >
                  Nhóm học tập
                </a>
              </li>
              <li>
                <a
                  href='/customer/partners'
                  className='text-slate-300 hover:text-white transition-colors duration-200'
                >
                  Bạn học
                </a>
              </li>
              <li>
                <a
                  href='/about'
                  className='text-slate-300 hover:text-white transition-colors duration-200'
                >
                  Về chúng tôi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='text-lg font-semibold mb-4 text-white'>
              Thông tin liên hệ
            </h4>
            <div className='space-y-3'>
              <div className='flex items-center text-slate-300'>
                <Mail className='w-4 h-4 mr-3 flex-shrink-0' />
                <span className='text-sm'>weare.viethere@gmail.com</span>
              </div>
              <div className='flex items-center text-slate-300'>
                <Phone className='w-4 h-4 mr-3 flex-shrink-0' />
                <span className='text-sm'>+84 123 456 789</span>
              </div>
              <div className='flex items-center text-slate-300'>
                <MapPin className='w-4 h-4 mr-3 flex-shrink-0' />
                <span className='text-sm'>Thành phố Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-slate-700 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='text-slate-300 text-sm'>
              © {new Date().getFullYear()} Prilab. All rights reserved.
            </div>
            <div className='flex gap-6 text-sm'>
              <a
                href='/privacy'
                className='text-slate-300 hover:text-white transition-colors duration-200'
              >
                Chính sách bảo mật
              </a>
              <a
                href='/terms'
                className='text-slate-300 hover:text-white transition-colors duration-200'
              >
                Điều khoản sử dụng
              </a>
              <a
                href='/support'
                className='text-slate-300 hover:text-white transition-colors duration-200'
              >
                Hỗ trợ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
