import React, { useState, useEffect } from 'react';
import customerService from '../../services/customerService';
import {
  X,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  User,
  Calendar,
  DollarSign,
  Banknote,
} from 'lucide-react';
import authServices from '../../services/authServices';
import { formatCurrency } from '../../utils';
import { formatDate } from '../../utils';

export default function CustomerRefundsRequests() {
  const [bankInfo, setBankInfo] = useState([]);
  const [refundsRequestsAvailable, setRefundsRequestsAvailable] = useState([]);
  const [refundsRequestsHistory, setRefundsRequestsHistory] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [reason, setReason] = useState('Khóa học này có vấn đề !');
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    bankAccountNumber: '',
    bankAccountName: '',
  });

  useEffect(() => {
    const fetchRefundsRequests = async () => {
      const response = await customerService.getRefundRequestAvailable();
      setRefundsRequestsAvailable(response.data);
    };
    const fetchRefundsRequestsHistory = async () => {
      const response = await customerService.getMyRefundsRequests();
      setRefundsRequestsHistory(response.data);
    };
    fetchRefundsRequests();
    fetchRefundsRequestsHistory();
  }, []);

  const handleOpenModal = (payment) => {
    const fetchBankInfo = async () => {
      const response = await authServices.getBanksInfo();
      setBankInfo(response.data);
    };
    fetchBankInfo();
    setPaymentId(payment._id);
    setSelectedPayment(payment);
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setPaymentId('');
    setSelectedPayment(null);
    setReason('');
  };

  const handleCreateRefundRequest = async ({
    paymentId,
    reason,
    bankDetails,
  }) => {
    try {
      await customerService.createRefundRequest({
        paymentId,
        reason,
        bankDetails,
      });
      // Refresh data
      const availableResponse =
        await customerService.getRefundRequestAvailable();
      const historyResponse = await customerService.getMyRefundsRequests();
      setRefundsRequestsAvailable(availableResponse.data);
      setRefundsRequestsHistory(historyResponse.data);
    } catch (error) {
      console.error('Error creating refund request:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'REJECTED':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className='w-4 h-4' />;
      case 'REJECTED':
        return <XCircle className='w-4 h-4' />;
      case 'PENDING':
        return <Clock className='w-4 h-4' />;
      default:
        return <RefreshCw className='w-4 h-4' />;
    }
  };

  const stats = {
    available: refundsRequestsAvailable?.length || 0,
    pending:
      refundsRequestsHistory?.filter((r) => r.status === 'PENDING').length || 0,
    approved:
      refundsRequestsHistory?.filter((r) => r.status === 'APPROVED').length ||
      0,
    rejected:
      refundsRequestsHistory?.filter((r) => r.status === 'REJECTED').length ||
      0,
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
              <div>
                <h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  Yêu cầu hoàn trả 💰
                </h1>
                <p className='text-xl text-gray-600'>
                  Quản lý yêu cầu hoàn tiền cho các tài liệu đã mua
                </p>
              </div>

              <div className='flex items-center gap-6 text-sm'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {stats.available}
                  </div>
                  <div className='text-gray-600'>Có thể hoàn trả</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-yellow-600'>
                    {stats.pending}
                  </div>
                  <div className='text-gray-600'>Đang xử lý</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-green-600'>
                    {stats.approved}
                  </div>
                  <div className='text-gray-600'>Đã duyệt</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-red-600'>
                    {stats.rejected}
                  </div>
                  <div className='text-gray-600'>Bị từ chối</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Refunds Section */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <RefreshCw className='w-6 h-6 text-blue-600' />
              Có thể yêu cầu hoàn trả ({stats.available})
            </h2>
            <p className='text-gray-600'>
              Các tài liệu được mua trong vòng 24h gần đây có thể yêu cầu hoàn
              trả
            </p>
          </div>

          {refundsRequestsAvailable.length === 0 ? (
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 text-center'>
              <div className='text-6xl mb-4'>🎉</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Không có yêu cầu hoàn trả nào
              </h3>
              <p className='text-gray-600'>
                Bạn chưa có tài liệu nào đủ điều kiện để yêu cầu hoàn trả
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
              {refundsRequestsAvailable.map((payment) => (
                <div
                  key={payment._id}
                  className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1'
                >
                  {/* Document Image */}
                  <div className='relative h-48'>
                    <img
                      src={
                        payment.documentId.imageUrls?.[0] || '/placeholder.jpg'
                      }
                      alt={payment.documentId.title}
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />

                    {/* Time remaining badge */}
                    <div className='absolute top-3 right-3'>
                      <div className='bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1'>
                        <Clock className='w-3 h-3' />
                        {payment.hoursRemaining}h còn lại
                      </div>
                    </div>

                    {/* Can refund status */}
                    <div className='absolute bottom-3 left-3'>
                      {payment.canRefund ? (
                        <div className='bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full'>
                          Có thể hoàn trả
                        </div>
                      ) : (
                        <div className='bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full'>
                          Đã gửi yêu cầu
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className='p-6'>
                    <h3 className='font-bold text-gray-900 text-lg mb-2 line-clamp-2'>
                      {payment.documentId.title}
                    </h3>

                    {/* Seller Info */}
                    <div className='flex items-center gap-3 mb-4'>
                      <img
                        src={payment.sellerId.avatar}
                        alt={payment.sellerId.name}
                        className='w-8 h-8 rounded-full'
                      />
                      <div>
                        <p className='text-sm font-medium text-gray-900'>
                          {payment.sellerId.name}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {payment.sellerId.email}
                        </p>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className='space-y-2 mb-4'>
                      <div className='flex items-center justify-between text-sm'>
                        <span className='text-gray-600 flex items-center gap-1'>
                          <DollarSign className='w-4 h-4' />
                          Số tiền:
                        </span>
                        <span className='font-semibold text-green-600'>
                          {formatCurrency(payment.amount)}
                        </span>
                      </div>
                      <div className='flex items-center justify-between text-sm'>
                        <span className='text-gray-600 flex items-center gap-1'>
                          <CreditCard className='w-4 h-4' />
                          Phương thức:
                        </span>
                        <span className='font-medium'>
                          {payment.paymentMethod === 'BANK_TRANSFER'
                            ? 'Chuyển khoản'
                            : payment.paymentMethod}
                        </span>
                      </div>
                      <div className='flex items-center justify-between text-sm'>
                        <span className='text-gray-600 flex items-center gap-1'>
                          <Calendar className='w-4 h-4' />
                          Ngày mua:
                        </span>
                        <span className='font-medium'>
                          {formatDate(payment.paymentDate)}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    {payment.canRefund ? (
                      <button
                        onClick={() => handleOpenModal(payment)}
                        className='w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'
                      >
                        <RefreshCw className='w-4 h-4' />
                        Yêu cầu hoàn trả
                      </button>
                    ) : (
                      <button
                        disabled
                        className='w-full bg-gray-200 text-gray-500 py-3 px-4 rounded-xl font-medium cursor-not-allowed'
                      >
                        Đang xử lý
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Refund History Section */}
        <div>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <RefreshCw className='w-6 h-6 text-purple-600' />
              Lịch sử yêu cầu hoàn trả ({refundsRequestsHistory.length})
            </h2>
            <p className='text-gray-600'>
              Tất cả các yêu cầu hoàn trả đã gửi và trạng thái xử lý
            </p>
          </div>

          {refundsRequestsHistory.length === 0 ? (
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 text-center'>
              <div className='text-6xl mb-4'>📋</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Chưa có lịch sử hoàn trả
              </h3>
              <p className='text-gray-600'>
                Bạn chưa từng gửi yêu cầu hoàn trả nào
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {refundsRequestsHistory.map((refund) => (
                <div
                  key={refund._id}
                  className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300'
                >
                  <div className='flex flex-col lg:flex-row gap-6'>
                    {/* Document Info */}
                    <div className='flex-1'>
                      <div className='flex items-start gap-4'>
                        <img
                          src={
                            refund.documentId.imageUrls?.[0] ||
                            '/placeholder.jpg'
                          }
                          alt={refund.documentId.title}
                          className='w-16 h-16 rounded-lg object-cover'
                        />
                        <div className='flex-1'>
                          <h3 className='font-bold text-lg text-gray-900 mb-1'>
                            {refund.documentId.title}
                          </h3>
                          <div className='flex items-center gap-3 mb-2'>
                            <img
                              src={refund.sellerId.avatar}
                              alt={refund.sellerId.name}
                              className='w-6 h-6 rounded-full'
                            />
                            <span className='text-sm text-gray-600'>
                              {refund.sellerId.name}
                            </span>
                          </div>
                          <p className='text-sm text-gray-600 mb-2'>
                            <strong>Lý do:</strong> {refund.reason}
                          </p>
                          <div className='flex items-center gap-4 text-sm text-gray-500'>
                            <span className='flex items-center gap-1'>
                              <DollarSign className='w-4 h-4' />
                              {formatCurrency(refund.amount)}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Calendar className='w-4 h-4' />
                              {formatDate(refund.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status and Details */}
                    <div className='lg:w-80'>
                      <div className='space-y-3'>
                        {/* Status Badge */}
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                            refund.status
                          )}`}
                        >
                          {getStatusIcon(refund.status)}
                          {refund.status === 'APPROVED'
                            ? 'Đã duyệt'
                            : refund.status === 'REJECTED'
                            ? 'Bị từ chối'
                            : 'Đang xử lý'}
                        </div>

                        {/* Bank Details */}
                        <div className='bg-gray-50 rounded-lg p-3 text-sm'>
                          <div className='flex items-center gap-2 mb-2'>
                            <Banknote className='w-4 h-4 text-gray-600' />
                            <span className='font-medium text-gray-900'>
                              Thông tin nhận tiền
                            </span>
                          </div>
                          <div className='space-y-1 text-gray-600'>
                            <p>
                              <strong>Ngân hàng:</strong>{' '}
                              {refund.bankDetails.bankName}
                            </p>
                            <p>
                              <strong>Số TK:</strong>{' '}
                              {refund.bankDetails.bankAccountNumber}
                            </p>
                            <p>
                              <strong>Tên TK:</strong>{' '}
                              {refund.bankDetails.bankAccountName}
                            </p>
                          </div>
                        </div>

                        {/* Admin Response */}
                        {refund.adminResponse && (
                          <div
                            className={`rounded-lg p-3 text-sm ${
                              refund.status === 'APPROVED'
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-red-50 border border-red-200'
                            }`}
                          >
                            <div className='flex items-center gap-2 mb-2'>
                              <User className='w-4 h-4' />
                              <span className='font-medium'>
                                Phản hồi từ Quản lý
                              </span>
                            </div>
                            <p className='text-gray-700'>
                              {refund.adminResponse}
                            </p>
                            {refund.processedAt && (
                              <p className='text-xs text-gray-500 mt-1'>
                                {formatDate(refund.processedAt)}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {isOpenModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto'>
              <div className='sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-xl font-bold text-gray-900'>
                    Tạo yêu cầu hoàn trả
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateRefundRequest({ paymentId, reason, bankDetails });
                  handleCloseModal();
                }}
                className='p-6 space-y-6'
              >
                {/* Document Info */}
                {selectedPayment && (
                  <div className='bg-gray-50 rounded-lg p-4'>
                    <h3 className='font-semibold mb-2'>
                      {selectedPayment.documentId.title}
                    </h3>
                    <div className='text-sm text-gray-600 space-y-1'>
                      <p>Số tiền: {formatCurrency(selectedPayment.amount)}</p>
                      <p>Ngày mua: {formatDate(selectedPayment.paymentDate)}</p>
                    </div>
                  </div>
                )}

                {/* Reason Input */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Lý do hoàn trả *
                  </label>
                  <textarea
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder='Vui lòng nhập lý do yêu cầu hoàn trả...'
                    rows={3}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>

                {/* Bank Info */}
                <div className='space-y-4'>
                  <h3 className='font-medium text-gray-900'>
                    Thông tin nhận tiền
                  </h3>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Ngân hàng *
                    </label>
                    <select
                      required
                      value={bankDetails.bankName}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          bankName: e.target.value,
                        })
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    >
                      <option value=''>Chọn ngân hàng</option>
                      {bankInfo.map((bank) => (
                        <option key={bank.id} value={bank.shortName}>
                          {bank.shortName} - {bank.code}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Số tài khoản *
                    </label>
                    <input
                      required
                      type='text'
                      value={bankDetails.bankAccountNumber}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      placeholder='Nhập số tài khoản'
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Tên chủ tài khoản *
                    </label>
                    <input
                      required
                      type='text'
                      value={bankDetails.bankAccountName}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          bankAccountName: e.target.value,
                        })
                      }
                      placeholder='Nhập tên chủ tài khoản'
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>
                </div>

                <div className='flex gap-3 pt-4'>
                  <button
                    type='button'
                    onClick={handleCloseModal}
                    className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                  >
                    Hủy
                  </button>
                  <button
                    type='submit'
                    className='flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105'
                  >
                    Gửi yêu cầu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
