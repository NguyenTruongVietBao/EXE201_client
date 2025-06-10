import { Facebook, Instagram, Twitter } from 'lucide-react';
import React from 'react';

function Footer() {
  return (
    <footer className='p-4 footer footer-center bg-base-100 text-base-content'>
      <aside>
        <p>© {new Date().getFullYear()} StudySphere - All rights reserved.</p>
        <div className='flex gap-4 mt-2'>
          <a href='#' aria-label='Facebook' className='link link-hover'>
            <Facebook className='w-6 h-6' />
          </a>
          <a href='#' aria-label='Twitter' className='link link-hover'>
            <Twitter className='w-6 h-6' />
          </a>
          <a href='#' aria-label='Instagram' className='link link-hover'>
            <Instagram className='w-6 h-6' />
          </a>
        </div>
      </aside>
    </footer>
  );
}

export default Footer;
