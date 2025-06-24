import React from 'react';

export default function LoadingPage({ message }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='text-center animate-fade-in'>
        <div className='relative flex items-center justify-center mb-6'>
          <div className='relative'>
            <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-blue-200'></div>
            <div className='absolute top-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-transparent border-t-blue-600 animate-spin'></div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 animate-pulse'></div>
            </div>
          </div>
        </div>
        <p className='text-lg sm:text-xl font-medium text-gray-700 max-w-md mx-auto'>
          {message || 'Đang tải dữ liệu...'}
        </p>
        <div className='flex justify-center mt-4 space-x-2'>
          <div
            className='h-3 w-3 bg-blue-600 rounded-full animate-bounce'
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className='h-3 w-3 bg-blue-600 rounded-full animate-bounce'
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className='h-3 w-3 bg-blue-600 rounded-full animate-bounce'
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
