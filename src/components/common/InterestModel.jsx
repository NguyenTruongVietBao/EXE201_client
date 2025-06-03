import React, { useState, useMemo } from 'react';
import { INTERESTS } from '../../constants';
import toast from 'react-hot-toast';

const InterestModel = ({ onConfirm }) => {
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Lọc sở thích dựa trên tìm kiếm
  const filteredInterests = useMemo(() => {
    if (!searchQuery) return INTERESTS;
    return INTERESTS.filter((interest) =>
      interest.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleToggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm(selected);
    else {
      toast.error('Vui lòng chọn ít nhất 3 sở thích');
    }
  };

  const handleClose = () => {
    setSelected([]);
    setSearchQuery('');
    if (onConfirm) onConfirm([]);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(id);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='relative bg-white rounded-2xl shadow-2xl p-10 w-full max-w-4xl mx-4 animate-slideIn max-h-[80vh] overflow-y-auto'>
        {/* Nút đóng */}
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1'
          aria-label='Đóng modal chọn sở thích'
          onClick={handleClose}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && handleClose()
          }
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* Tiêu đề */}
        <h2 className='text-3xl font-bold text-center mb-4 text-gray-800'>
          Prilab
        </h2>
        <p className='text-center text-gray-500 mb-6'>
          Chọn ít nhất 3 sở thích để tìm bạn học và tài liệu phù hợp
        </p>

        {/* Thanh tìm kiếm */}
        <div className='mb-6 flex justify-center'>
          <input
            type='text'
            placeholder='Tìm kiếm sở thích...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full max-w-sm p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700'
            aria-label='Tìm kiếm sở thích'
          />
        </div>

        {/* Danh sách sở thích */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6 '>
          {filteredInterests.length > 0 ? (
            filteredInterests.map((interest, idx) => {
              const isSelected = selected.includes(interest.id);
              // Tạo hiệu ứng lệch lạc nhẹ
              const rotate = ((idx % 5) - 2) * 1.2; // -1, -0.5, 0, 0.5, 1 độ
              const translateX = ((idx % 3) - 2) * 0.3; // -0.2, 0, 0.2 rem
              const translateY = ((idx % 4) - 2) * 0.3; // -0.4, -0.2, 0, 0.2 rem
              return (
                <button
                  key={interest.id}
                  type='button'
                  className={`relative flex items-center p-4 hover:scale-105 rounded-xl border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-50 cursor-pointer shadow-md hover:shadow-lg z-10 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  style={{
                    transform: `rotate(${rotate}deg) translate(${translateX}rem, ${translateY}rem)`,
                  }}
                  aria-pressed={isSelected}
                  aria-label={`Chọn ${interest.name}`}
                  onClick={() => handleToggle(interest.id)}
                  onKeyDown={(e) => handleKeyDown(e, interest.id)}
                >
                  <span className='text-2xl mr-3' aria-hidden='true'>
                    {interest.emoji}
                  </span>
                  <span className='text-sm font-medium text-gray-700 flex-1 text-left'>
                    {interest.name}
                  </span>
                  {isSelected && (
                    <svg
                      className='w-5 h-5 text-blue-500'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </button>
              );
            })
          ) : (
            <p className='text-center text-gray-500 col-span-full'>
              Không tìm thấy sở thích phù hợp
            </p>
          )}
        </div>

        {/* Nút xác nhận */}
        <div className='flex justify-center'>
          <button
            className='btn btn-primary btn-lg w-full max-w-xl rounded-xl '
            onClick={handleConfirm}
            disabled={selected.length <= 2}
            aria-disabled={selected.length <= 2}
          >
            Xác nhận ({selected.length} đã chọn)
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestModel;
