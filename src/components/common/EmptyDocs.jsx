import { Bookmark, Share2, ShoppingCart } from 'lucide-react';

const EmptyDocs = ({ type }) => {
  const emptyStates = {
    shared: {
      icon: <Share2 className='w-16 h-16 text-gray-300' />,
      title: 'Chưa có tài liệu nào được chia sẻ',
      description: 'Bắt đầu chia sẻ kiến thức của bạn với cộng đồng',
      action: 'Chia sẻ tài liệu đầu tiên',
    },
    purchased: {
      icon: <ShoppingCart className='w-16 h-16 text-gray-300' />,
      title: 'Chưa mua tài liệu nào',
      description: 'Khám phá thư viện tài liệu phong phú của chúng tôi',
      action: 'Duyệt tài liệu',
    },
    enrolled: {
      icon: <Bookmark className='w-16 h-16 text-gray-300' />,
      title: 'Chưa có tài liệu nào được đăng ký',
      description: 'Đăng ký các tài liệu yêu thích để đọc sau',
      action: 'Tìm tài liệu hay',
    },
  };

  const state = emptyStates[type];

  return (
    <div className='text-center py-16'>
      <div className='flex justify-center mb-4'>{state.icon}</div>
      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
        {state.title}
      </h3>
      <p className='text-gray-600 mb-6 max-w-md mx-auto'>{state.description}</p>
      <button className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium'>
        {state.action}
      </button>
    </div>
  );
};

export default EmptyDocs;
