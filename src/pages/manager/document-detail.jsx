import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import managerServices from '../../services/managerServices';
import toast from 'react-hot-toast';
import { formatCurrency, formatDate } from '../../utils';
import LoadingPage from '../../components/common/LoadingPage';

export default function ManagerDocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  console.log('🚀 ~ ManagerDocumentDetail ~ document:', document);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchDocumentDetail = async () => {
      try {
        setLoading(true);
        const response = await managerServices.getDocumentDetail(id);
        console.log('🚀 ~ fetchDocumentDetail ~ response:', response);
        if (response.status) {
          setDocument(response.data);
        }
      } catch (error) {
        console.error('Lỗi khi tải chi tiết tài liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDocumentDetail();
    }
  }, [id]);

  const handlePublishToggle = async () => {
    try {
      if (document.status === 'APPROVED') {
        await managerServices.unpublishDocument(document._id);
        toast.success('Đã ẩn bài');
      } else {
        await managerServices.publishDocument(document._id);
        toast.success('Đã duyệt bài');
      }

      setDocument((prev) => ({
        ...prev,
        status: prev.status === 'APPROVED' ? 'PENDING' : 'APPROVED',
      }));
    } catch (error) {
      console.error('Lỗi khi thay đổi trạng thái publish:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/manager/documents');
  };

  const calculateAverageRating = (feedback) => {
    if (feedback.length === 0) return 0;
    const sum = feedback.reduce((acc, f) => acc + f.rating, 0);
    return (sum / feedback.length).toFixed(1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ⭐
      </span>
    ));
  };

  if (loading) {
    return <LoadingPage message='Đang tải dữ liệu...' />;
  }

  if (!document) {
    return (
      <div className='container mx-auto p-6 text-center'>
        <div className='text-6xl mb-4'>📄</div>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Không tìm thấy tài liệu
        </h2>
        <p className='text-gray-600 mb-6'>
          Tài liệu có thể đã bị xóa hoặc không tồn tại.
        </p>
        <button
          onClick={handleGoBack}
          className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6 min-h-screen'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center space-x-4'>
          <button
            onClick={handleGoBack}
            className='text-gray-600 hover:text-gray-800 transition-colors'
          >
            ← Quay lại
          </button>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>
              Chi tiết tài liệu
            </h1>
            <p className='text-gray-600'>
              Quản lý và xem thông tin chi tiết tài liệu
            </p>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <span
            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium ${
              document.status === 'APPROVED'
                ? 'bg-green-100 text-green-800'
                : document.status === 'PENDING'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {document.status === 'APPROVED' && 'Đã duyệt'}
            {document.status === 'PENDING' && '⏳ Chờ duyệt'}
            {document.status === 'REJECTED' && 'Bị từ chối'}
          </span>
          <button
            onClick={handlePublishToggle}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              document.status === 'APPROVED'
                ? 'bg-red-200 text-red-700 hover:bg-red-300'
                : 'bg-green-200 text-green-700 hover:bg-green-300'
            }`}
          >
            {document.status === 'APPROVED' ? '❌ Ẩn bài' : '✅ Duyệt bài'}
          </button>
        </div>
      </div>

      {/* Document Overview */}
      <div className='bg-white rounded-xl shadow-sm border p-6 mb-6'>
        <div className='grid lg:grid-cols-3 gap-6'>
          {/* Images */}
          <div className='lg:col-span-1'>
            <div className='space-y-4'>
              <img
                src={document.imageUrls?.[0] || '/placeholder.jpg'}
                alt={document.title}
                className='w-full h-64 object-cover rounded-lg'
              />
              {document.imageUrls && document.imageUrls.length > 1 && (
                <div className='grid grid-cols-2 gap-2'>
                  {document.imageUrls.slice(1, 3).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${document.title} ${index + 2}`}
                      className='w-full h-24 object-cover rounded'
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className='lg:col-span-2'>
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold text-gray-800'>
                {document.title}
              </h2>

              <p className='text-gray-600 leading-relaxed'>
                {document.description}
              </p>

              <div className='flex flex-wrap gap-2'>
                {document.interests.map((interest) => (
                  <span
                    key={interest._id}
                    className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800'
                  >
                    {interest.emoji} {interest.name}
                  </span>
                ))}
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-4'>
                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {document.price > 0
                      ? formatCurrency(document.price)
                      : 'Miễn phí'}
                  </div>
                  <div className='text-sm text-gray-600'>Giá bán</div>
                  {document.discount > 0 && (
                    <div className='text-xs text-green-600 mt-1'>
                      Giảm {document.discount}%
                    </div>
                  )}
                </div>

                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <div className='text-2xl font-bold text-yellow-600'>
                    {calculateAverageRating(document.feedback)}
                  </div>
                  <div className='text-sm text-gray-600'>Đánh giá</div>
                  <div className='flex justify-center mt-1'>
                    {renderStars(
                      Math.round(calculateAverageRating(document.feedback))
                    )}
                  </div>
                </div>

                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <div className='text-2xl font-bold text-green-600'>
                    {document.feedback.length}
                  </div>
                  <div className='text-sm text-gray-600'>Phản hồi</div>
                </div>

                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <div className='text-2xl font-bold text-purple-600'>
                    {document.download || 0}
                  </div>
                  <div className='text-sm text-gray-600'>Lượt tải</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='bg-white rounded-xl shadow-sm border mb-6'>
        <div className='border-b'>
          <nav className='flex space-x-8 px-6'>
            {[
              { id: 'overview', label: 'Tổng quan', icon: '📊' },
              { id: 'author', label: 'Tác giả', icon: '👤' },
              { id: 'content', label: 'Nội dung', icon: '📄' },
              { id: 'feedback', label: 'Phản hồi', icon: '💬' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className='p-6'>
          {activeTab === 'overview' && (
            <div className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-20'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                    Thông tin cơ bản
                  </h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>ID tài liệu:</span>
                      <span className='font-medium'>{document._id}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Ngày tạo:</span>
                      <span className='font-medium'>
                        {formatDate(document.createdAt)}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Cập nhật lần cuối:</span>
                      <span className='font-medium'>
                        {formatDate(document.updatedAt)}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Trạng thái:</span>
                      <span
                        className={`font-medium ${
                          document.status === 'APPROVED'
                            ? 'text-green-600'
                            : document.status === 'PENDING'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                      >
                        {document.status === 'APPROVED'
                          ? 'Đã duyệt'
                          : document.status === 'PENDING'
                          ? 'Chờ duyệt'
                          : 'Bị từ chối'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Bị cấm:</span>
                      <span
                        className={`font-medium ${
                          document.isBanned ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        {document.isBanned ? 'Có' : 'Không'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                    Thống kê
                  </h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Số lượng hình ảnh:</span>
                      <span className='font-medium'>
                        {document.imageUrls?.length || 0}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Số lượng tài liệu:</span>
                      <span className='font-medium'>
                        {document.documentUrls?.length || 0}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Số lượng video:</span>
                      <span className='font-medium'>
                        {document.videoUrls?.length || 0}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Lĩnh vực quan tâm:</span>
                      <span className='font-medium'>
                        {document.interests.length}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Thời lượng:</span>
                      <span className='font-medium'>
                        {document.duration
                          ? `${document.duration} giờ`
                          : 'Chưa xác định'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Loại tài liệu:</span>
                      <span
                        className={`font-medium ${
                          document.isFree ? 'text-green-600' : 'text-blue-600'
                        }`}
                      >
                        {document.isFree ? 'Miễn phí' : 'Trả phí'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Lượt tải:</span>
                      <span className='font-medium'>
                        {document.download || 0} lượt
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'author' && (
            <div className='space-y-6'>
              <h3 className='text-lg font-semibold text-gray-800'>
                Thông tin tác giả
              </h3>
              <div className='bg-gray-50 rounded-lg p-6'>
                <div className='flex items-center space-x-4'>
                  {document.author.avatar ? (
                    <img
                      src={document.author.avatar}
                      alt={document.author.name}
                      className='w-16 h-16 rounded-full object-cover'
                    />
                  ) : (
                    <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold'>
                      {document.author.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className='text-xl font-semibold text-gray-800'>
                      {document.author.name}
                    </h4>
                    <p className='text-gray-600'>{document.author.email}</p>
                    <p className='text-sm text-gray-500'>
                      ID: {document.author._id}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Tổng tài liệu: {document.author.documents?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className='space-y-6'>
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                  Tài liệu đính kèm ({document.documentUrls?.length || 0})
                </h3>
                <div className='grid gap-3'>
                  {(document.documentUrls || []).map((url, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
                    >
                      <div className='flex items-center space-x-3'>
                        <span className='text-2xl'>📄</span>
                        <span className='font-medium'>
                          Tài liệu {index + 1}
                        </span>
                      </div>
                      <a
                        href={url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 font-medium'
                      >
                        Xem tài liệu
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {document.videoUrls && document.videoUrls.length > 0 && (
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                    Video đính kèm ({document.videoUrls.length})
                  </h3>
                  <div className='grid gap-3'>
                    {document.videoUrls.map((url, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
                      >
                        <div className='flex items-center space-x-3'>
                          <span className='text-2xl'>🎥</span>
                          <span className='font-medium'>Video {index + 1}</span>
                        </div>
                        <a
                          href={url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-600 hover:text-blue-800 font-medium'
                        >
                          Xem video
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Phản hồi từ người dùng ({document.feedback.length})
                </h3>
                <div className='text-sm text-gray-600'>
                  Đánh giá trung bình:{' '}
                  {calculateAverageRating(document.feedback)}/5
                </div>
              </div>

              {document.feedback.length === 0 ? (
                <div className='text-center py-8'>
                  <div className='text-4xl mb-4'>💬</div>
                  <p className='text-gray-600'>Chưa có phản hồi nào</p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {document.feedback.map((feedback) => (
                    <div
                      key={feedback._id}
                      className='bg-gray-50 rounded-lg p-4'
                    >
                      <div className='flex items-start justify-between mb-2'>
                        <div className='flex items-center space-x-3'>
                          <div className='flex items-center space-x-2'>
                            {/* User Avatar */}
                            {feedback.user?.avatar ? (
                              <img
                                src={feedback.user.avatar}
                                alt={feedback.user.name}
                                className='w-8 h-8 rounded-full object-cover'
                              />
                            ) : (
                              <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                                {feedback.user?.name
                                  ? feedback.user.name.charAt(0).toUpperCase()
                                  : '?'}
                              </div>
                            )}

                            {/* User Name */}
                            <span className='font-medium text-gray-800'>
                              {feedback.user?.name || 'Người dùng ẩn danh'}
                            </span>
                          </div>

                          {/* Rating Stars */}
                          <div className='flex'>
                            {renderStars(feedback.rating)}
                          </div>
                        </div>
                        <span className='text-sm text-gray-500'>
                          {formatDate(feedback.createdAt)}
                        </span>
                      </div>
                      <p className='text-gray-700'>{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
