import React, { useEffect, useState } from 'react';
import sellerServices from '../../services/sellerServices';
import {
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  User,
  Calendar,
  FileText,
  Search,
  AlertTriangle,
  Banknote,
  MessageSquare,
  Eye,
  X,
  TrendingUp,
  RefreshCw,
  CreditCard,
} from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils';
import LoadingPage from '../../components/common/LoadingPage';

export default function SellerRefundsRequest() {
  const [refundRequests, setRefundRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [refundRequestStats, setRefundRequestStats] = useState({
    totalRefunds: 0,
    pendingRefunds: 0,
    approvedRefunds: 0,
    rejectedRefunds: 0,
    totalRefundAmount: 0,
    approvedRefundAmount: 0,
    approvalRate: 0,
    rejectionRate: 0,
  });

  const fetchRefundRequests = async () => {
    try {
      const response = await sellerServices.getRefundRequestsForMyDocuments();
      setRefundRequests(response.data.refunds || []);

      // Tính toán stats từ dữ liệu
      const stats = response.data.stats || {};
      const totalRefunds = stats.total || 0;
      const pendingRefunds = stats.pending || 0;
      const approvedRefunds = stats.approved || 0;
      const rejectedRefunds = stats.rejected || 0;

      // Tính tổng số tiền từ refunds array
      const refunds = response.data.refunds || [];
      const totalRefundAmount = refunds.reduce(
        (sum, refund) => sum + (refund.amount || 0),
        0
      );
      const approvedRefundAmount = refunds
        .filter((refund) => refund.status === 'APPROVED')
        .reduce((sum, refund) => sum + (refund.amount || 0), 0);

      const approvalRate =
        totalRefunds > 0
          ? Math.round((approvedRefunds / totalRefunds) * 100)
          : 0;
      const rejectionRate =
        totalRefunds > 0
          ? Math.round((rejectedRefunds / totalRefunds) * 100)
          : 0;

      setRefundRequestStats({
        totalRefunds,
        pendingRefunds,
        approvedRefunds,
        rejectedRefunds,
        totalRefundAmount,
        approvedRefundAmount,
        approvalRate,
        rejectionRate,
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching refund requests:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefundRequests();
  }, []);

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

  const tabs = [
    { id: 'all', label: 'Tất cả', count: refundRequests.length },
    {
      id: 'pending',
      label: 'Chờ xử lý',
      count: refundRequests.filter((r) => r.status === 'PENDING').length,
    },
    {
      id: 'approved',
      label: 'Đã duyệt',
      count: refundRequests.filter((r) => r.status === 'APPROVED').length,
    },
    {
      id: 'rejected',
      label: 'Bị từ chối',
      count: refundRequests.filter((r) => r.status === 'REJECTED').length,
    },
  ];

  const filteredRefunds = refundRequests.filter((refund) => {
    const matchesTab =
      activeTab === 'all' || refund.status === activeTab.toUpperCase();
    const matchesSearch =
      searchTerm === '' ||
      refund.documentId?.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      refund.customerId?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      refund.reason?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const openModal = (refund) => {
    setSelectedRefund(refund);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRefund(null);
  };

  if (loading) {
    return <LoadingPage message='Đang tải dữ liệu...' />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
              <div>
                <h1 className='text-4xl py-2 font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  Yêu cầu hoàn trả 💰
                </h1>
                <p className='text-xl text-gray-600'>
                  Theo dõi các yêu cầu hoàn tiền cho tài liệu của bạn
                </p>
              </div>

              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm'>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {refundRequestStats.totalRefunds}
                  </div>
                  <div className='text-gray-600'>Tổng yêu cầu</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-yellow-600'>
                    {refundRequestStats.pendingRefunds}
                  </div>
                  <div className='text-gray-600'>Chờ xử lý</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-green-600'>
                    {refundRequestStats.approvedRefunds}
                  </div>
                  <div className='text-gray-600'>Đã duyệt</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-red-600'>
                    {refundRequestStats.rejectedRefunds}
                  </div>
                  <div className='text-gray-600'>Bị từ chối</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-purple-600'>
                    {formatCurrency(refundRequestStats.totalRefundAmount || 0)}
                  </div>
                  <div className='text-gray-600'>Tổng tiền</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-emerald-600'>
                    {formatCurrency(
                      refundRequestStats.approvedRefundAmount || 0
                    )}
                  </div>
                  <div className='text-gray-600'>Đã hoàn</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-indigo-600'>
                    {refundRequestStats.approvalRate || 0}%
                  </div>
                  <div className='text-gray-600'>Tỷ lệ duyệt</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-orange-600'>
                    {refundRequestStats.rejectionRate || 0}%
                  </div>
                  <div className='text-gray-600'>Tỷ lệ từ chối</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20'>
            <div className='flex flex-wrap gap-1'>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white shadow-lg text-blue-600 border-blue-600 scale-105'
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type='text'
                placeholder='Tìm kiếm theo tên tài liệu, khách hàng, lý do...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className='mb-6 flex items-center justify-between'>
          <p className='text-gray-600'>
            Hiển thị {filteredRefunds.length} yêu cầu hoàn trả
          </p>
        </div>

        {/* Refunds List */}
        {filteredRefunds.length === 0 ? (
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 text-center'>
            <div className='text-6xl mb-4'>📋</div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              Không có yêu cầu hoàn trả nào
            </h3>
            <p className='text-gray-600'>
              {activeTab === 'all'
                ? 'Chưa có yêu cầu hoàn trả nào cho tài liệu của bạn'
                : `Không có yêu cầu ${tabs
                    .find((t) => t.id === activeTab)
                    ?.label.toLowerCase()}`}
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredRefunds.map((refund) => (
              <div
                key={refund._id}
                className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300'
              >
                <div className='flex flex-col lg:flex-row gap-6'>
                  {/* Left Side - Request Info */}
                  <div className='flex-1'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-start gap-4'>
                        <img
                          src={
                            refund.documentId?.imageUrls?.[0] ||
                            '/placeholder.jpg'
                          }
                          alt={refund.documentId?.title}
                          className='w-16 h-16 rounded-xl object-cover flex-shrink-0'
                        />
                        <div className='flex-1'>
                          <h3 className='font-bold text-lg text-gray-900 mb-1'>
                            {refund.documentId?.title || 'Tài liệu đã bị xóa'}
                          </h3>
                          <p className='text-sm text-gray-600 mb-2'>
                            Giá: {formatCurrency(refund.documentId?.price)} • Mã
                            GD: {refund.paymentId?.transactionCode}
                          </p>
                          <div className='flex items-center gap-4 text-sm text-gray-600 mb-2'>
                            <span className='flex items-center gap-1'>
                              <DollarSign className='w-4 h-4' />
                              Giá gốc:{' '}
                              {formatCurrency(refund.documentId?.price)}
                            </span>
                            <span className='flex items-center gap-1'>
                              <TrendingUp className='w-4 h-4' />
                              Hoàn: {formatCurrency(refund.amount)}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Calendar className='w-4 h-4' />
                              {formatDate(refund.createdAt)}
                            </span>
                          </div>
                          <p className='text-sm text-gray-700 mb-3'>
                            <strong>Lý do:</strong> {refund.reason}
                          </p>
                        </div>
                      </div>

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
                          : 'Chờ xử lý'}
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                      {/* Customer Info */}
                      <div className='bg-gray-50 rounded-lg p-3'>
                        <div className='flex items-center gap-2 mb-2'>
                          <User className='w-4 h-4 text-gray-600' />
                          <span className='font-medium text-gray-900'>
                            Khách hàng
                          </span>
                        </div>
                        <div className='flex items-center gap-3'>
                          <img
                            src={refund.customerId?.avatar}
                            alt={refund.customerId?.name}
                            className='w-8 h-8 rounded-full'
                          />
                          <div>
                            <p className='font-medium text-sm'>
                              {refund.customerId?.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                              {refund.customerId?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div className='bg-blue-50 rounded-lg p-3'>
                        <div className='flex items-center gap-2 mb-2'>
                          <CreditCard className='w-4 h-4 text-blue-600' />
                          <span className='font-medium text-gray-900'>
                            Thông tin thanh toán
                          </span>
                        </div>
                        <div className='space-y-1 text-sm text-gray-700'>
                          <p>
                            <strong>Mã giao dịch:</strong>{' '}
                            {refund.paymentId?.transactionCode}
                          </p>
                          <p>
                            <strong>Giá tài liệu:</strong>{' '}
                            {formatCurrency(refund.documentId?.price)}
                          </p>
                          <p>
                            <strong>Ngày thanh toán:</strong>{' '}
                            {formatDate(refund.paymentId?.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bank Details */}
                    <div className='bg-green-50 rounded-lg p-3 mb-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <Banknote className='w-4 h-4 text-green-600' />
                        <span className='font-medium text-gray-900'>
                          Thông tin nhận tiền hoàn trả
                        </span>
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-700'>
                        <p>
                          <strong>Ngân hàng:</strong>{' '}
                          {refund.bankDetails?.bankName}
                        </p>
                        <p>
                          <strong>Số TK:</strong>{' '}
                          {refund.bankDetails?.bankAccountNumber}
                        </p>
                        <p>
                          <strong>Tên TK:</strong>{' '}
                          {refund.bankDetails?.bankAccountName}
                        </p>
                      </div>
                    </div>

                    {/* Admin Response */}
                    {refund.adminResponse && (
                      <div
                        className={`rounded-lg p-3 mb-4 ${
                          refund.status === 'APPROVED'
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        <div className='flex items-center gap-2 mb-2'>
                          <MessageSquare className='w-4 h-4' />
                          <span className='font-medium'>
                            Phản hồi từ {refund.processedBy?.name || 'Manager'}
                          </span>
                        </div>
                        <p className='text-sm text-gray-700 mb-1'>
                          {refund.adminResponse}
                        </p>
                        {refund.processedAt && (
                          <p className='text-xs text-gray-500'>
                            {formatDate(refund.processedAt)}
                          </p>
                        )}
                        {refund.refundCompletedAt && (
                          <p className='text-xs text-green-600 font-medium mt-1'>
                            Hoàn tiền completed:{' '}
                            {formatDate(refund.refundCompletedAt)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Side - Actions */}
                  <div className='lg:w-48 flex flex-col gap-3'>
                    <button
                      onClick={() => openModal(refund)}
                      className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'
                    >
                      <Eye className='w-4 h-4' />
                      Xem chi tiết
                    </button>

                    {refund.status === 'PENDING' && (
                      <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center'>
                        <AlertTriangle className='w-5 h-5 text-yellow-600 mx-auto mb-1' />
                        <p className='text-xs text-yellow-700'>
                          Đang chờ Manager xử lý
                        </p>
                      </div>
                    )}

                    {refund.status === 'APPROVED' && (
                      <div className='bg-green-50 border border-green-200 rounded-xl p-3 text-center'>
                        <CheckCircle className='w-5 h-5 text-green-600 mx-auto mb-1' />
                        <p className='text-xs text-green-700'>
                          Đã duyệt và hoàn tiền
                        </p>
                      </div>
                    )}

                    {refund.status === 'REJECTED' && (
                      <div className='bg-red-50 border border-red-200 rounded-xl p-3 text-center'>
                        <XCircle className='w-5 h-5 text-red-600 mx-auto mb-1' />
                        <p className='text-xs text-red-700'>Bị từ chối</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedRefund && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto'>
              <div className='sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-xl font-bold text-gray-900'>
                    Chi tiết yêu cầu hoàn trả
                  </h2>
                  <button
                    onClick={closeModal}
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>
              </div>

              <div className='p-6 space-y-6'>
                {/* Document & Customer Info */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='bg-gray-50 rounded-lg p-4'>
                    <h3 className='font-semibold mb-3 flex items-center gap-2'>
                      <FileText className='w-5 h-5' />
                      Thông tin tài liệu
                    </h3>
                    <div className='flex gap-3 mb-3'>
                      <img
                        src={selectedRefund.documentId?.imageUrls?.[0]}
                        alt={selectedRefund.documentId?.title}
                        className='w-16 h-16 rounded-lg object-cover'
                      />
                      <div>
                        <h4 className='font-medium'>
                          {selectedRefund.documentId?.title}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          Mã GD: {selectedRefund.paymentId?.transactionCode}
                        </p>
                      </div>
                    </div>
                    <div className='space-y-1 text-sm text-gray-600'>
                      <p>
                        <strong>Giá gốc:</strong>{' '}
                        {formatCurrency(selectedRefund.documentId?.price)}
                      </p>
                      <p>
                        <strong>Số tiền hoàn:</strong>{' '}
                        {formatCurrency(selectedRefund.amount)}
                      </p>
                    </div>
                  </div>

                  <div className='bg-gray-50 rounded-lg p-4'>
                    <h3 className='font-semibold mb-3 flex items-center gap-2'>
                      <User className='w-5 h-5' />
                      Thông tin khách hàng
                    </h3>
                    <div className='flex items-center gap-3 mb-3'>
                      <img
                        src={selectedRefund.customerId?.avatar}
                        alt={selectedRefund.customerId?.name}
                        className='w-12 h-12 rounded-full'
                      />
                      <div>
                        <p className='font-medium'>
                          {selectedRefund.customerId?.name}
                        </p>
                        <p className='text-sm text-gray-600'>
                          {selectedRefund.customerId?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className='bg-blue-50 rounded-lg p-4'>
                  <h3 className='font-semibold mb-3 flex items-center gap-2'>
                    <CreditCard className='w-5 h-5' />
                    Chi tiết thanh toán
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                    <p>
                      <strong>Mã giao dịch:</strong>{' '}
                      {selectedRefund.paymentId?.transactionCode}
                    </p>
                    <p>
                      <strong>Giá tài liệu:</strong>{' '}
                      {formatCurrency(selectedRefund.documentId?.price)}
                    </p>
                    <p>
                      <strong>Ngày thanh toán:</strong>{' '}
                      {formatDate(selectedRefund.paymentId?.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Lý do yêu cầu hoàn trả
                  </label>
                  <p className='bg-gray-50 p-3 rounded-lg text-gray-700'>
                    {selectedRefund.reason}
                  </p>
                </div>

                {/* Bank Details */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Thông tin nhận tiền hoàn trả
                  </label>
                  <div className='bg-gray-50 p-3 rounded-lg space-y-1 text-sm'>
                    <p>
                      <strong>Ngân hàng:</strong>{' '}
                      {selectedRefund.bankDetails?.bankName}
                    </p>
                    <p>
                      <strong>Số tài khoản:</strong>{' '}
                      {selectedRefund.bankDetails?.bankAccountNumber}
                    </p>
                    <p>
                      <strong>Tên chủ tài khoản:</strong>{' '}
                      {selectedRefund.bankDetails?.bankAccountName}
                    </p>
                  </div>
                </div>

                {/* Status & Timeline */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Trạng thái & Timeline
                  </label>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3 p-3 bg-blue-50 rounded-lg'>
                      <Clock className='w-5 h-5 text-blue-600' />
                      <div>
                        <p className='font-medium'>Yêu cầu được tạo</p>
                        <p className='text-sm text-gray-600'>
                          {formatDate(selectedRefund.createdAt)}
                        </p>
                      </div>
                    </div>

                    {selectedRefund.processedAt && (
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          selectedRefund.status === 'APPROVED'
                            ? 'bg-green-50'
                            : 'bg-red-50'
                        }`}
                      >
                        {selectedRefund.status === 'APPROVED' ? (
                          <CheckCircle className='w-5 h-5 text-green-600' />
                        ) : (
                          <XCircle className='w-5 h-5 text-red-600' />
                        )}
                        <div>
                          <p className='font-medium'>
                            {selectedRefund.status === 'APPROVED'
                              ? 'Đã được duyệt'
                              : 'Bị từ chối'}
                          </p>
                          <p className='text-sm text-gray-600'>
                            {formatDate(selectedRefund.processedAt)}
                          </p>
                          {selectedRefund.adminResponse && (
                            <p className='text-sm text-gray-700 mt-1'>
                              <strong>Phản hồi:</strong>{' '}
                              {selectedRefund.adminResponse}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedRefund.refundCompletedAt && (
                      <div className='flex items-center gap-3 p-3 bg-emerald-50 rounded-lg'>
                        <TrendingUp className='w-5 h-5 text-emerald-600' />
                        <div>
                          <p className='font-medium'>Hoàn tiền completed</p>
                          <p className='text-sm text-gray-600'>
                            {formatDate(selectedRefund.refundCompletedAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
