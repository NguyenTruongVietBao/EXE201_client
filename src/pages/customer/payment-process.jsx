import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router';
import { CheckCircle, AlertCircle, BookOpen, Loader2 } from 'lucide-react';
import documentServices from '../../services/documentServices';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../utils';

export default function PaymentProcess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [document, setDocument] = useState(null);
  const hasCalledRef = useRef(false);
  const documentId = searchParams.get('documentId');
  const handlePayment = async () => {
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;
    setIsLoading(true);

    if (
      searchParams.get('status') === 'CANCELLED' ||
      searchParams.get('cancel') === 'true'
    ) {
      setIsFailed(true);
      toast.error('Thanh toán thất bại');
      navigate(`/customer/documents/${documentId}`);
      return;
    }
    try {
      const response = await documentServices.handlePayment({
        paymentId: searchParams.get('paymentId'),
        status: searchParams.get('status'),
        id: searchParams.get('id'),
        documentId: searchParams.get('documentId'),
        userId: searchParams.get('userId'),
        code: searchParams.get('code'),
        cancel: searchParams.get('cancel'),
        orderCode: searchParams.get('orderCode'),
      });

      if (response.statusCode === 200) {
        setIsFailed(false);
        const res = await documentServices.getDocumentDetail(
          searchParams.get('documentId')
        );
        setDocument(res.data);
        toast.success('Thanh toán thành công');
      } else {
        setIsFailed(true);
        toast.error(response.message || 'Thanh toán thất bại');
      }
    } catch (error) {
      console.error(error);
      setIsFailed(true);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlePayment();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4'>
      <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-lg w-full text-center transform transition-all duration-300'>
        {isLoading ? (
          <div className='flex flex-col items-center justify-center py-12'>
            <Loader2 className='w-12 h-12 text-blue-500 animate-spin mb-4' />
            <p className='text-lg font-medium text-gray-600'>
              Đang xử lý thanh toán...
            </p>
          </div>
        ) : isFailed ? (
          <div className='animate-fade-in'>
            <AlertCircle className='w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse' />
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4'>
              Thanh toán thất bại
            </h2>
            <p className='text-gray-600 mb-6'>
              Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ nếu cần.
            </p>
            <button
              onClick={() => navigate('/customer/my-documents')}
              className='px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium w-full sm:w-auto'
            >
              Quay lại
            </button>
          </div>
        ) : (
          document && (
            <div className='animate-fade-in'>
              <CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce' />
              <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4'>
                Thanh toán thành công!
              </h2>
              <div className='bg-gray-50 p-4 sm:p-6 rounded-xl mb-6'>
                <img
                  src={document.imageUrls[0]}
                  alt={document.title}
                  className='w-full h-48 object-cover rounded-xl mb-4'
                />
                <div className='text-left space-y-2'>
                  <p className='font-semibold text-xl sm:text-2xl text-gray-900 line-clamp-2'>
                    {document.title}
                  </p>
                  <p className='text-sm text-gray-600 line-clamp-2'>
                    {document.description}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {document.interests.map((interest) => (
                      <span
                        key={interest._id}
                        className='inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full'
                      >
                        {interest.emoji} {interest.name}
                      </span>
                    ))}
                  </div>
                  <p className='text-xl text-blue-500 font-bold'>
                    {document.discount > 0
                      ? formatCurrency(
                          document.price * (1 - document.discount / 100)
                        )
                      : formatCurrency(document.price)}
                  </p>
                </div>
              </div>
              <Link
                to={`/customer/documents/${documentId}`}
                className='px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-medium flex items-center justify-center gap-2 w-full sm:w-auto mx-auto'
              >
                <BookOpen className='w-5 h-5' />
                Xem tài liệu
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
