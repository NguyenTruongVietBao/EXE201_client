import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorStats({ message }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div
        className='text-center bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full animate-fade-in'
        role='alert'
        aria-live='assertive'
      >
        <AlertCircle
          size={64}
          className='mx-auto mb-4 text-red-500 animate-pulse'
        />
        <p className='text-red-600 font-semibold text-lg sm:text-xl mb-2'>
          Không thể tải dữ liệu
        </p>
        <p className='text-gray-600 text-sm sm:text-base max-w-sm mx-auto'>
          {message || 'Vui lòng thử lại sau hoặc liên hệ hỗ trợ.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className='mt-6 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 font-medium w-full sm:w-auto'
          aria-label='Thử lại tải trang'
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
