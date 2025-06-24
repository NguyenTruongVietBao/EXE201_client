import React from 'react';
import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4 sm:px-6 lg:px-8'>
      <div className='text-center max-w-md sm:max-w-lg animate-slide-up'>
        <svg
          className='w-48 sm:w-64 mx-auto mb-8 text-indigo-500 transform transition-transform duration-500 hover:scale-110'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <h1 className='text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4'>
          404
        </h1>
        <p className='text-lg sm:text-xl text-gray-600 mb-10 font-medium leading-relaxed'>
          Looks like you're lost in space! The page you're looking for doesn't
          exist or is restricted.
        </p>
        <Link
          to='/'
          className='inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
