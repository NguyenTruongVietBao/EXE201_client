import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router';
import { CheckCircle, AlertCircle, BookOpen } from 'lucide-react';
import documentServices from '../../services/documentServices';
import toast from 'react-hot-toast';

export default function PaymentProcess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isFailed, setIsFailed] = useState(false);
  const hasCalledRef = useRef(false);
  const [document, setDocument] = useState(null);
  const handlePayment = async () => {
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

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
    console.log('🚀 ~ handlePayment ~ response:', response);
    if (response.statusCode === 200) {
      setIsFailed(false);
      documentServices
        .getDocumentDetail(searchParams.get('documentId'))
        .then((res) => {
          setDocument(res.data);
        });

      toast.success('Thanh toán thành công');
    } else {
      setIsFailed(true);
      toast.error('Thanh toán thất bại');
    }
  };
  useEffect(() => {
    handlePayment();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center'>
        {isFailed ? (
          <>
            <AlertCircle className='w-16 h-16 text-red-500 mx-auto mb-4' />
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Thanh toán thất bại
            </h2>
            <div className='flex flex-col sm:flex-row gap-4'>
              <button
                onClick={() => navigate('/customer/my-documents')}
                className='flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium'
              >
                Quay lại
              </button>
            </div>
          </>
        ) : (
          document && (
            <>
              <CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4' />
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                Thanh toán thành công!
              </h2>
              <div className='bg-gray-50 p-4 rounded-xl mb-6'>
                <img
                  src={document.imageUrls[0]}
                  alt={document.title}
                  className='w-full h-48 object-cover rounded-xl mb-4'
                />
                <div className='flex items-center justify-between gap-2'>
                  <p className='font-semibold text-2xl text-gray-900 line-clamp-2'>
                    {document.title.length > 30
                      ? document.title.slice(0, 30) + '...'
                      : document.title}
                  </p>

                  <p className='text-lg text-blue-500 font-semibold'>
                    {document.discount > 0
                      ? document.price * (1 - document.discount / 100)
                      : document.price}{' '}
                    VNĐ
                  </p>
                </div>
              </div>
              <Link
                to={`/customer/my-documents`}
                className='px-6 mt-10 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-medium flex items-center justify-center gap-2 mx-auto'
              >
                <BookOpen className='w-5 h-5' />
                Xem tài liệu
              </Link>
            </>
          )
        )}
      </div>
    </div>
  );
}
