import React from 'react';
import { DollarSign, X } from 'lucide-react';
import { formatCurrency } from '../../../utils';

const ConfirmPurchaseModal = ({ isOpen, onClose, onConfirm, document }) => {
  if (!isOpen) return null;

  const finalPrice =
    document.discount > 0
      ? document.price * (1 - document.discount / 100)
      : document.price;

  return (
    <div
      className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out'
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      <div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 ease-out scale-100 sm:scale-105 hover:scale-105'>
        {/* Modal Header */}
        <div className='flex items-center justify-between mb-5'>
          <h2
            id='modal-title'
            className='text-xl font-bold text-gray-900 tracking-tight'
          >
            Xác nhận thanh toán
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 transition-colors duration-200'
            aria-label='Đóng modal'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Modal Body */}
        <div className='mb-6'>
          <p className='text-gray-600 text-sm mb-3 leading-relaxed'>
            Bạn có chắc chắn muốn mua tài liệu này?
          </p>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm'>
            <div className='w-1/3 mr-3'>
              <img
                src={document.imageUrls[0]}
                alt={document.title}
                className='w-full h-auto rounded-lg'
              />
            </div>
            <div className='mb-3 sm:mb-0 w-2/3'>
              <p className='font-semibold text-gray-900 text-base line-clamp-2'>
                {document.title}
              </p>
              <p className='text-sm text-gray-500 line-clamp-2 mt-1'>
                {document.description}
              </p>
            </div>
            <div className='text-right w-1/3'>
              {document.discount > 0 && (
                <p className='text-xs text-gray-400 line-through mb-1'>
                  {formatCurrency(document.price)}
                </p>
              )}
              <p className='text-lg font-bold text-blue-600'>
                {formatCurrency(finalPrice)}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className='flex flex-col sm:flex-row gap-3'>
          <button
            onClick={onClose}
            className='flex-1 py-2.5 px-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 font-medium text-sm'
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className='flex-1 py-2.5 cursor-pointer px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 shadow-md'
          >
            <DollarSign className='w-4 h-4' />
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchaseModal;
