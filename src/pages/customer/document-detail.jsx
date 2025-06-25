import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import {
  ArrowLeft,
  Download,
  Heart,
  Share2,
  Star,
  User,
  Play,
  FileText,
  Shield,
  Calendar,
  Eye,
  BookOpen,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Gift,
  UserPlus,
  Check,
} from 'lucide-react';
import documentServices from '../../services/documentServices';
import toast from 'react-hot-toast';
import customerService from '../../services/customerService';
import ConfirmPurchaseModal from '../../components/common/customer/confirm-purchase-modal';
import { formatCurrency, formatDate } from '../../utils';
import LoadingPage from '../../components/common/LoadingPage';

export default function CustomerDocumentDetail() {
  const [document, setDocument] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeMediaTab, setActiveMediaTab] = useState('images');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    const fetchDocumentDetail = async () => {
      try {
        setIsLoading(true);
        const response = await documentServices.getDocumentDetail(id);
        setDocument(response.data);

        if (response.data.imageUrls && response.data.imageUrls.length > 0) {
          setActiveMediaTab('images');
        } else if (
          response.data.videoUrls &&
          response.data.videoUrls.length > 0
        ) {
          setActiveMediaTab('videos');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocumentDetail();
  }, [id]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setFeedbackLoading(true);
        const response = await documentServices.getFeedbackDocument(id);
        setFeedback(response.data || []);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setFeedback([]);
      } finally {
        setFeedbackLoading(false);
      }
    };

    if (id) {
      fetchFeedback();
    }
  }, [id]);

  // Check enrollment status
  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      try {
        setEnrollmentLoading(true);

        // Get enrolled documents
        const enrolledResponse =
          await documentServices.getMyEnrolledDocuments();
        const enrolledDocuments = enrolledResponse.data || [];

        // Check if current document is enrolled
        const isCurrentDocumentEnrolled = enrolledDocuments.some(
          (document) => document._id === id
        );

        setIsEnrolled(isCurrentDocumentEnrolled);
      } catch (error) {
        console.error('Error checking enrollment status:', error);
        // If error, assume not enrolled to show join button
        setIsEnrolled(false);
      } finally {
        setEnrollmentLoading(false);
      }
    };

    if (id) {
      checkEnrollmentStatus();
    }
  }, [id]);

  if (isLoading) {
    return <LoadingPage message='Đang tải dữ liệu...' />;
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center'>
        <div className='text-center bg-white rounded-2xl p-8 shadow-xl max-w-md'>
          <AlertCircle className='w-16 h-16 text-red-500 mx-auto mb-4' />
          <h3 className='text-xl font-bold text-gray-900 mb-2'>
            Có lỗi xảy ra
          </h3>
          <p className='text-gray-600 mb-4'>{error.message}</p>
          <button
            onClick={() => navigate(-1)}
            className='px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors'
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center'>
        <div className='text-center bg-white rounded-2xl p-8 shadow-xl max-w-md'>
          <BookOpen className='w-16 h-16 text-gray-400 mx-auto mb-4' />
          <h3 className='text-xl font-bold text-gray-900 mb-2'>
            Không tìm thấy tài liệu
          </h3>
          <p className='text-gray-600 mb-4'>
            Tài liệu bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <button
            onClick={() => navigate('/customer/documents')}
            className='px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors'
          >
            Về trang tài liệu
          </button>
        </div>
      </div>
    );
  }

  const finalPrice =
    document.discount > 0
      ? document.price * (1 - document.discount / 100)
      : document.price;

  const savings = document.price - finalPrice;

  const handleDownload = async () => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined' || !window.document) {
      toast.error('Tải xuống không khả dụng trong môi trường này.', {
        id: 'download',
      });
      return;
    }

    try {
      setIsDownloading(true);
      toast.loading('Đang tải xuống...', { id: 'download' });
      const response = await customerService.handleDownloadDocument(id);

      // Assuming response is a blob or can be converted to one
      const blob = response instanceof Blob ? response : await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement('a'); // Explicitly use window.document
      a.href = url;
      a.download = `prilab_document_${id}.zip`;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success('Tải xuống thành công!', { id: 'download' });
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error('Tải xuống thất bại. Vui lòng thử lại.', { id: 'download' });
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await documentServices.purchaseDocument(document._id);

      if (response.status) {
        // Redirect to checkoutUrl to complete payment
        window.location.href = response.data.paymentLink.checkoutUrl;
      } else {
        toast.error('Tạo liên kết thanh toán thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error purchasing document:', error);
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  // Handle enrollment for free documents
  const handleEnrollFreeDocument = async () => {
    if (document.price !== 0) {
      toast.error('Chỉ có thể đăng ký tài liệu miễn phí');
      return;
    }

    try {
      setIsEnrolling(true);
      await customerService.handleEnrollFreeDocument(id);

      setIsEnrolled(true);
      toast.success('Đăng ký tài liệu thành công!');
    } catch (error) {
      console.error('Error enrolling free document:', error);
      toast.error('Có lỗi xảy ra khi đăng ký tài liệu. Vui lòng thử lại.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: document.description,
        url: window.location.href,
      });
    }
  };

  const handleRating = (rating) => {
    setUserRating(rating);
  };

  const handleSubmitReview = async () => {
    if (userRating === 0) {
      alert('Vui lòng chọn số sao đánh giá');
      return;
    }

    setIsSubmittingReview(true);
    try {
      await documentServices.sendFeedbackDocument(document._id, {
        rating: userRating,
        comment: userComment.trim() || '',
      });

      // Refresh feedback data
      const response = await documentServices.getFeedbackDocument(id);
      setFeedback(response.data || []);

      // Reset form
      setUserRating(0);
      setUserComment('');

      toast.success('Đánh giá của bạn đã được gửi thành công!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const cancelReview = () => {
    setUserRating(0);
    setUserComment('');
  };

  const actionButtons = (
    <div className='space-y-3'>
      {isEnrolled ? (
        <>
          <button
            disabled
            className='w-full py-3 border border-gray-200 bg-green-50 text-green-700 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-not-allowed'
          >
            <CheckCircle className='w-5 h-5' />
            {document.price === 0 ? 'Đã đăng ký' : 'Đã thanh toán'}
          </button>
          <button
            onClick={handleDownload}
            className='w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2'
            disabled={isDownloading}
          >
            <Download className='w-5 h-5' />
            {isDownloading ? 'Đang tải...' : 'Tải xuống'}
          </button>
        </>
      ) : (
        <>
          {document?.price === 0 ? (
            <button
              onClick={handleEnrollFreeDocument}
              disabled={isEnrolling}
              className='w-full py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isEnrolling ? (
                <>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Đang đăng ký...
                </>
              ) : (
                <>
                  <UserPlus className='w-5 h-5' />
                  Đăng ký để sử dụng tài liệu
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedDocument(document);
                setIsModalOpen(true);
              }}
              className='w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 cursor-pointer'
            >
              <DollarSign className='w-5 h-5' />
              Mua ngay
            </button>
          )}
        </>
      )}
      <ConfirmPurchaseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDocument(null);
        }}
        onConfirm={handlePurchase}
        document={selectedDocument}
      />
      <button className='w-full py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2'>
        <Heart className='w-5 h-5' />
        Thêm vào yêu thích
      </button>
    </div>
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <button
            onClick={() => navigate(-1)}
            className='group rounded-xl bg-white p-2 shadow-md transition-all duration-300 hover:shadow-lg'
          >
            <ArrowLeft className='h-5 w-5 text-gray-600 group-hover:text-blue-600' />
          </button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Media & Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Media Section */}
            <div className='bg-white rounded-3xl shadow-xl border border-white/20 overflow-hidden'>
              {/* Media Tabs */}
              <div className='flex border-b border-gray-100'>
                {document.imageUrls && document.imageUrls.length > 0 && (
                  <button
                    onClick={() => setActiveMediaTab('images')}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                      activeMediaTab === 'images'
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Hình ảnh ({document.imageUrls.length})
                  </button>
                )}
                {document.videoUrls && document.videoUrls.length > 0 && (
                  <button
                    onClick={() => setActiveMediaTab('videos')}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                      activeMediaTab === 'videos'
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Video
                  </button>
                )}
              </div>

              {/* Images Tab */}
              {activeMediaTab === 'images' &&
                document.imageUrls &&
                document.imageUrls.length > 0 && (
                  <>
                    {/* Main Image Display */}
                    <div className='relative h-96 bg-gradient-to-br from-blue-100 to-purple-100'>
                      <img
                        src={
                          document.imageUrls[selectedImageIndex] ||
                          'https://api.dicebear.com/9.x/shapes/svg?seed=default'
                        }
                        alt={document.title}
                        className='w-full h-full object-contain'
                      />

                      {/* Image Navigation Dots */}
                      {document.imageUrls.length > 1 && (
                        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
                          {document.imageUrls.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImageIndex(index)}
                              className={`w-3 h-3 rounded-full transition-colors ${
                                index === selectedImageIndex
                                  ? 'bg-white'
                                  : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Discount Badge */}
                      {document.discount > 0 && (
                        <div className='absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold'>
                          -{document.discount}%
                        </div>
                      )}

                      {/* Enrollment Status Badge */}
                      {document.price === 0 && (
                        <div className='absolute top-4 left-4'>
                          {enrollmentLoading ? (
                            <div className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium flex items-center gap-2'>
                              <div className='w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin'></div>
                              Đang kiểm tra...
                            </div>
                          ) : isEnrolled ? (
                            <div className='bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold flex items-center gap-2'>
                              <Check className='w-4 h-4' />
                              Đã đăng ký
                            </div>
                          ) : (
                            <div className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold'>
                              Chưa đăng ký
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Image Thumbnail Gallery */}
                    {document.imageUrls.length > 1 && (
                      <div className='p-4 border-t border-gray-100'>
                        <h4 className='text-sm font-medium text-gray-700 mb-3'>
                          Tất cả hình ảnh ({document.imageUrls.length})
                        </h4>
                        <div className='grid grid-cols-6 gap-3'>
                          {document.imageUrls.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImageIndex(index)}
                              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                                index === selectedImageIndex
                                  ? 'border-blue-500 ring-2 ring-blue-200'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <img
                                src={image}
                                alt={`Hình ${index + 1}`}
                                className='w-full h-full object-cover'
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

              {/* Videos Tab */}
              {activeMediaTab === 'videos' &&
                document.videoUrls &&
                document.videoUrls.length > 0 && (
                  <>
                    {/* Main Video Display */}
                    <div className='relative h-96 bg-gradient-to-br from-purple-100 to-pink-100'>
                      <video
                        controls
                        className='w-full h-full object-contain'
                        src={document.videoUrls[0]}
                        poster={
                          document.imageUrls?.[0] ||
                          'https://api.dicebear.com/9.x/shapes/svg?seed=video'
                        }
                      />

                      {/* Discount Badge */}
                      {document.discount > 0 && (
                        <div className='absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold'>
                          -{document.discount}%
                        </div>
                      )}

                      {/* Enrollment Status Badge */}
                      {document.price === 0 && (
                        <div className='absolute top-4 left-4'>
                          {enrollmentLoading ? (
                            <div className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium flex items-center gap-2'>
                              <div className='w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin'></div>
                              Đang kiểm tra...
                            </div>
                          ) : isEnrolled ? (
                            <div className='bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold flex items-center gap-2'>
                              <Check className='w-4 h-4' />
                              Đã đăng ký
                            </div>
                          ) : (
                            <div className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold'>
                              Chưa đăng ký
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Video List */}
                    {document.videoUrls.length > 0 && (
                      <div className='p-4 border-t border-gray-100'>
                        <h4 className='text-sm font-medium text-gray-700 mb-3'>
                          Giới thiệu tài liệu
                        </h4>
                        <div className='space-y-3'>
                          <button
                            key={document.videoUrls[0]}
                            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-gray-50 ${
                              document.videoUrls[0] === 0
                                ? 'bg-blue-50 border border-blue-200 cursor-pointer'
                                : 'border border-gray-200'
                            }`}
                          >
                            <div className='relative w-16 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg overflow-hidden flex-shrink-0'>
                              <Play className='w-6 h-6 text-purple-600 absolute inset-0 m-auto' />
                            </div>
                            <div className='flex-1 text-left'>
                              <h5 className='font-medium text-gray-900'>
                                Giới thiệu tài liệu
                              </h5>
                              <p className='text-sm text-gray-500'>
                                {document.videoUrls[0] === 0
                                  ? 'Đang phát'
                                  : 'Nhấn để phát'}
                              </p>
                            </div>
                            {document.videoUrls[0] === 0 && (
                              <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

              {/* No Media Available */}
              {(!document.imageUrls || document.imageUrls.length === 0) &&
                (!document.videoUrls || document.videoUrls.length === 0) && (
                  <div className='h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center'>
                    <div className='text-center'>
                      <FileText className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                      <p className='text-gray-600'>
                        Không có media để hiển thị
                      </p>
                    </div>
                  </div>
                )}
            </div>

            {/* Document Info */}
            <div className='bg-white rounded-3xl shadow-xl border border-white/20 p-8'>
              <div className='mb-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex-1'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                      {document.title}
                    </h1>
                    <div className='flex items-center gap-4 text-sm text-gray-600'>
                      <div className='flex items-center gap-1'>
                        <User className='w-4 h-4' />
                        <span>bởi {document.author?.name}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        <span>{formatDate(document.createdAt)}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Eye className='w-4 h-4' />
                        <span>0 lượt xem</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={handleLike}
                      className={`p-3 rounded-xl transition-colors ${
                        isLiked
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                      />
                    </button>
                    <button
                      onClick={handleShare}
                      className='p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors'
                    >
                      <Share2 className='w-5 h-5' />
                    </button>
                  </div>
                </div>

                {/* Interests Tags */}
                <div className='flex flex-wrap gap-2 mb-6'>
                  {document.interests?.map((interest) => (
                    <span
                      key={interest._id}
                      className='px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1'
                    >
                      <span>{interest.emoji}</span>
                      <span>{interest.name}</span>
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className='mb-6'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                    Mô tả
                  </h3>
                  <div
                    className={`text-gray-700 leading-relaxed ${
                      showFullDescription ? '' : 'line-clamp-3'
                    }`}
                  >
                    {document.description || 'Không có mô tả.'}
                  </div>
                  {document.description &&
                    document.description.length > 150 && (
                      <button
                        onClick={() =>
                          setShowFullDescription(!showFullDescription)
                        }
                        className='text-blue-600 hover:text-blue-700 text-sm font-medium mt-2'
                      >
                        {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
                      </button>
                    )}
                </div>

                {/* Document Files */}
                {document.documentUrls && document.documentUrls.length > 0 && (
                  <div className='mb-6 p-4 bg-gray-50 rounded-2xl'>
                    <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                      <FileText className='w-5 h-5' />
                      Tài liệu đính kèm ({document.documentUrls.length})
                    </h4>
                    <div className='space-y-2'>
                      {document.documentUrls.map((fileUrls, index) => (
                        <div
                          key={index}
                          className='flex items-center justify-between p-3 bg-white rounded-xl'
                        >
                          <div className='flex items-center gap-3'>
                            <FileText className='w-5 h-5 text-blue-500' />
                            <span className='text-sm font-medium'>
                              Tài liệu {index + 1}
                            </span>
                          </div>
                          <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
                            Xem trước
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews & Rating Section */}
                <div className='border-t border-gray-100 pt-6'>
                  {/* Existing Reviews */}
                  {feedbackLoading ? (
                    <div className='text-center py-8'>
                      <div className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2'></div>
                      <p className='text-gray-600 text-sm'>
                        Đang tải đánh giá...
                      </p>
                    </div>
                  ) : feedback && feedback.length > 0 ? (
                    <div className='mb-8'>
                      <div className='flex items-center justify-between mb-6'>
                        <h4 className='font-semibold text-gray-900'>
                          Đánh giá ({feedback.length})
                        </h4>
                        <div className='flex items-center gap-2'>
                          <div className='flex'>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <=
                                  feedback.reduce(
                                    (acc, f) => acc + f.rating,
                                    0
                                  ) /
                                    feedback.length
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className='text-sm text-gray-600'>
                            {(
                              feedback.reduce((acc, f) => acc + f.rating, 0) /
                              feedback.length
                            ).toFixed(1)}
                            /5
                          </span>
                        </div>
                      </div>

                      <div className='space-y-4 max-h-96 overflow-y-auto'>
                        {feedback.map((review, index) => (
                          <div
                            key={index}
                            className='p-4 bg-gray-50 rounded-xl'
                          >
                            <div className='flex items-start gap-3'>
                              <img
                                src={
                                  review.user?.avatar ||
                                  `https://api.dicebear.com/9.x/avataaars/svg?seed=${
                                    review.user?.name || 'anonymous'
                                  }`
                                }
                                alt={review.user?.name || 'Người dùng ẩn danh'}
                                className='w-10 h-10 rounded-full'
                              />
                              <div className='flex-1'>
                                <div className='flex items-center gap-2 mb-2'>
                                  <h5 className='font-medium text-gray-900'>
                                    {review.user?.name || 'Người dùng ẩn danh'}
                                  </h5>
                                  <div className='flex'>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`w-3 h-3 ${
                                          star <= review.rating
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className='text-xs text-gray-500'>
                                    {formatDate(review.createdAt)}
                                  </span>
                                </div>
                                {review.comment && (
                                  <p className='text-gray-700 text-sm leading-relaxed'>
                                    {review.comment}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* User Rating Form - Always Visible */}
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-4'>
                      {feedback && feedback.length > 0
                        ? 'Thêm đánh giá của bạn'
                        : 'Đánh giá đầu tiên'}
                    </h4>

                    <div className='flex items-center gap-2 mb-4'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(star)}
                          className={`text-2xl transition-colors ${
                            star <= userRating
                              ? 'text-yellow-400'
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                      <span className='text-sm text-gray-600 ml-2'>
                        {userRating > 0 ? `${userRating}/5 sao` : 'Chọn số sao'}
                      </span>
                    </div>

                    {/* Review Form - Always Visible */}
                    <div className='space-y-4 p-4 bg-blue-50 rounded-xl'>
                      <textarea
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        placeholder='Chia sẻ trải nghiệm của bạn về tài liệu này... (tùy chọn)'
                        className='w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        rows={4}
                      />
                      <div className='flex items-center gap-3'>
                        <button
                          onClick={handleSubmitReview}
                          disabled={isSubmittingReview || userRating === 0}
                          className='px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2'
                        >
                          {isSubmittingReview ? (
                            <>
                              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                              Đang gửi...
                            </>
                          ) : (
                            'Gửi đánh giá'
                          )}
                        </button>
                        <button
                          onClick={cancelReview}
                          disabled={isSubmittingReview}
                          className='px-6 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-colors font-medium'
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase & Author Info */}
          <div className='space-y-6'>
            {/* Price & Purchase */}
            <div className='bg-white rounded-3xl shadow-xl border border-white/20 p-6'>
              {/* Price Display */}
              <div className='mb-6'>
                {document.price === 0 ? (
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-emerald-600 mb-2 flex items-center justify-center gap-2'>
                      <Gift className='w-8 h-8' />
                      MIỄN PHÍ
                    </div>
                    <p className='text-gray-600 text-sm'>
                      Tải xuống ngay không tốn phí
                    </p>
                  </div>
                ) : (
                  <div className='text-center'>
                    {document.discount > 0 && (
                      <div className='flex items-center justify-center gap-2 mb-2'>
                        <span className='text-lg text-gray-400 line-through'>
                          {formatCurrency(document.price)}
                        </span>
                        <span className='px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium'>
                          Tiết kiệm {formatCurrency(savings)}
                        </span>
                      </div>
                    )}
                    <div className='text-3xl font-bold text-blue-600 mb-2'>
                      {formatCurrency(finalPrice)}
                    </div>
                    <p className='text-gray-600 text-sm'>
                      Giá đã bao gồm thuế VAT
                    </p>
                  </div>
                )}
              </div>

              {/* Download Preview */}
              {document.price === 0 && (
                <div className='mb-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-200'>
                  <h4 className='font-semibold text-emerald-800 mb-2 flex items-center gap-2'>
                    <Gift className='w-5 h-5' />
                    Nội dung tải miễn phí
                  </h4>
                  <div className='space-y-1 text-sm text-emerald-700'>
                    {document.imageUrls && document.imageUrls.length > 0 && (
                      <div className='flex items-center gap-2'>
                        <span>📸</span>
                        <span>{document.imageUrls.length} hình ảnh</span>
                      </div>
                    )}
                    {document.documentUrls &&
                      document.documentUrls.length > 0 && (
                        <div className='flex items-center gap-2'>
                          <span>📄</span>
                          <span>{document.documentUrls.length} tài liệu</span>
                        </div>
                      )}
                    {document.videoUrls && document.videoUrls.length > 0 && (
                      <div className='flex items-center gap-2'>
                        <span>🎥</span>
                        <span>{document.videoUrls.length} video</span>
                      </div>
                    )}
                    <div className='text-xs text-emerald-600 mt-2 flex items-center gap-1'>
                      <Download className='w-3 h-3' />
                      Tất cả sẽ được nén thành 1 file ZIP
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {actionButtons}

              {/* Trust Indicators */}
              <div className='mt-6 pt-6 border-t border-gray-100'>
                <div className='space-y-3 text-sm'>
                  <div className='flex items-center gap-2 text-green-600'>
                    <CheckCircle className='w-4 h-4' />
                    <span>Tài liệu đã được kiểm duyệt</span>
                  </div>
                  <div className='flex items-center gap-2 text-green-600'>
                    <Shield className='w-4 h-4' />
                    <span>Bảo mật thanh toán 100%</span>
                  </div>
                  <div className='flex items-center gap-2 text-green-600'>
                    <Download className='w-4 h-4' />
                    <span>Tải xuống ngay lập tức</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className='bg-white rounded-3xl shadow-xl border border-white/20 p-6 cursor-pointer'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Tác giả
              </h3>
              <Link
                to={`/customer/documents/author/${document.author?._id}`}
                className='flex items-center gap-4 mb-4'
              >
                <img
                  src={
                    document.author?.avatar ||
                    `https://api.dicebear.com/9.x/avataaars/svg?seed=${
                      document.author?.name || 'anonymous'
                    }`
                  }
                  alt={document.author?.name}
                  className='w-16 h-16 rounded-xl'
                />
                <div className='flex-1'>
                  <h4 className='font-semibold text-gray-900'>
                    {document.author?.name}
                  </h4>
                  <p className='text-gray-600 text-sm'>
                    {document.author?.email}
                  </p>
                  <div className='flex items-center gap-4 mt-2 text-sm text-gray-500'>
                    <span>
                      {document.author?.documents.length || 0} tài liệu
                    </span>
                    <span>0 người theo dõi</span>
                  </div>
                </div>
              </Link>
              <Link
                to={`/customer/documents/author/${document.author?._id}`}
                className='w-full py-2 border border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium flex items-center justify-center gap-2'
              >
                Xem thêm tài liệu khác
              </Link>
            </div>

            {/* Document Stats */}
            <div className='bg-white rounded-3xl shadow-xl border border-white/20 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Thống kê
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <Eye className='w-4 h-4' />
                    <span>Lượt xem</span>
                  </div>
                  <span className='font-semibold'>
                    {Math.floor(Math.random() * 100)}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <Download className='w-4 h-4' />
                    <span>Lượt tải</span>
                  </div>
                  <span className='font-semibold'>
                    {document.download || 0}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <Heart className='w-4 h-4' />
                    <span>Yêu thích</span>
                  </div>
                  <span className='font-semibold'>
                    {Math.floor(Math.random() * 100)}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2 text-gray-600'>
                    <Star className='w-4 h-4' />
                    <span>Đánh giá trung bình</span>
                  </div>
                  <span className='font-semibold'>
                    {feedback
                      .map((item) => item.rating)
                      .reduce((a, b) => a + b, 0) / feedback.length || 0}
                    /5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Documents */}
        <div className='mt-12'>
          <div className='bg-white rounded-3xl shadow-xl border border-white/20 p-8'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold text-gray-900'>
                Tài liệu liên quan
              </h2>
              <button className='text-blue-600 hover:text-blue-700 font-medium'>
                Xem tất cả
              </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {/* Placeholder for related documents */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className='group cursor-pointer'>
                  <div className='aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-3 flex items-center justify-center'>
                    <BookOpen className='w-8 h-8 text-gray-400' />
                  </div>
                  <h4 className='font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1'>
                    Tài liệu liên quan {i}
                  </h4>
                  <p className='text-gray-600 text-sm mb-2'>
                    Mô tả ngắn gọn về tài liệu
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-blue-600 font-semibold'>
                      Miễn phí
                    </span>
                    <div className='flex items-center gap-1 text-sm text-gray-500'>
                      <Star className='w-3 h-3 text-yellow-400 fill-current' />
                      <span>4.5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
