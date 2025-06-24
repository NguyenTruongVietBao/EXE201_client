import React, { useState, useEffect } from 'react';
import managerServices from '../../services/managerServices';
import toast from 'react-hot-toast';
import {
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  User,
  Calendar,
  FileText,
  Search,
  Filter,
  AlertTriangle,
  Banknote,
  MessageSquare,
  Eye,
  X,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils';

export default function ManagerRefundRequests() {
  const [refundsRequests, setRefundsRequests] = useState([]);
  const [refundsRequestsStats, setRefundsRequestsStats] = useState({
    totalRefunds: 0,
    pendingRefunds: 0,
    approvedRefunds: 0,
    rejectedRefunds: 0,
    totalRefundAmount: 0,
    approvedRefundAmount: 0,
  });
  const [adminResponse, setAdminResponse] = useState('Yêu cầu đã được xử lý !');
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchRefundsRequests = async () => {
    try {
      const response = await managerServices.getAllRefundsRequests();
      setRefundsRequests(response.data?.refunds || []);
    } catch (error) {
      console.error('Error fetching refunds requests:', error);
      setRefundsRequests([]);
    }
  };

  useEffect(() => {
    const fetchRefundsRequestsStats = async () => {
      try {
        const response = await managerServices.getRefundRequestStats();
        setRefundsRequestsStats(response.data);
      } catch (error) {
        console.error('Error fetching refunds stats:', error);
      }
    };
    fetchRefundsRequests();
    fetchRefundsRequestsStats();
  }, []);

  const handleApproveRefundRequest = async (id) => {
    if (!adminResponse.trim()) {
      toast.error('Vui lòng nhập phản hồi');
      return;
    }
    try {
      setIsProcessing(true);
      await managerServices.approveRefundRequest(id, adminResponse);
      toast.success('Yêu cầu hoàn trả đã được phê duyệt');
      setIsModalOpen(false);
      setAdminResponse('');
      fetchRefundsRequests();
    } catch {
      toast.error('Có lỗi xảy ra');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectRefundRequest = async (id) => {
    if (!adminResponse.trim()) {
      toast.error('Vui lòng nhập lý do từ chối');
      return;
    }
    try {
      setIsProcessing(true);
      await managerServices.rejectRefundRequest(id, adminResponse);
      toast.success('Yêu cầu hoàn trả đã bị từ chối');
      setIsModalOpen(false);
      setAdminResponse('');
      fetchRefundsRequests();
    } catch {
      toast.error('Có lỗi xảy ra');
    } finally {
      setIsProcessing(false);
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

  const tabs = [
    { id: 'all', label: 'Tất cả', count: refundsRequests.length },
    {
      id: 'pending',
      label: 'Chờ duyệt',
      count: refundsRequests.filter((r) => r.status === 'PENDING').length,
    },
    {
      id: 'approved',
      label: 'Đã duyệt',
      count: refundsRequests.filter((r) => r.status === 'APPROVED').length,
    },
    {
      id: 'rejected',
      label: 'Đã từ chối',
      count: refundsRequests.filter((r) => r.status === 'REJECTED').length,
    },
  ];

  const filteredRefunds = refundsRequests.filter((refund) => {
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
    setAdminResponse('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRefund(null);
    setAdminResponse('');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
              <div>
                <h1 className='text-4xl py-2 font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  Quản lý yêu cầu hoàn trả 💰
                </h1>
                <p className='text-xl text-gray-600'>
                  Xem và xử lý các yêu cầu hoàn tiền từ khách hàng
                </p>
              </div>

              <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm'>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {refundsRequestsStats.totalRefunds}
                  </div>
                  <div className='text-gray-600'>Tổng yêu cầu</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-yellow-600'>
                    {refundsRequestsStats.pendingRefunds}
                  </div>
                  <div className='text-gray-600'>Chờ duyệt</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-green-600'>
                    {refundsRequestsStats.approvedRefunds}
                  </div>
                  <div className='text-gray-600'>Đã duyệt</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-red-600'>
                    {refundsRequestsStats.rejectedRefunds}
                  </div>
                  <div className='text-gray-600'>Đã từ chối</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-purple-600'>
                    {formatCurrency(
                      refundsRequestsStats.totalRefundAmount || 0
                    )}
                  </div>
                  <div className='text-gray-600'>Tổng tiền (VNĐ)</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-emerald-600'>
                    {formatCurrency(
                      refundsRequestsStats.approvedRefundAmount || 0
                    )}
                  </div>
                  <div className='text-gray-600'>Đã hoàn (VNĐ)</div>
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
                  className={`ml-2 flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
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
                ? 'Chưa có yêu cầu hoàn trả nào được gửi'
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
                        <div className='w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center'>
                          <FileText className='w-6 h-6 text-blue-600' />
                        </div>
                        <div className='flex-1'>
                          <h3 className='font-bold text-lg text-gray-900 mb-1'>
                            {refund.documentId?.title || 'Tài liệu đã bị xóa'}
                          </h3>
                          <div className='flex items-center gap-4 text-sm text-gray-600 mb-2'>
                            <span className='flex items-center gap-1'>
                              <DollarSign className='w-4 h-4' />
                              {formatCurrency(refund.amount)}
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
                          ? 'Đã từ chối'
                          : 'Chờ duyệt'}
                      </div>
                    </div>

                    {/* Customer and Seller Info */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
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

                      <div className='bg-gray-50 rounded-lg p-3'>
                        <div className='flex items-center gap-2 mb-2'>
                          <User className='w-4 h-4 text-gray-600' />
                          <span className='font-medium text-gray-900'>
                            Người bán
                          </span>
                        </div>
                        <div className='flex items-center gap-3'>
                          <img
                            src={refund.sellerId?.avatar}
                            alt={refund.sellerId?.name}
                            className='w-8 h-8 rounded-full'
                          />
                          <div>
                            <p className='font-medium text-sm'>
                              {refund.sellerId?.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                              {refund.sellerId?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bank Details */}
                    <div className='bg-blue-50 rounded-lg p-3 mb-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <Banknote className='w-4 h-4 text-blue-600' />
                        <span className='font-medium text-gray-900'>
                          Thông tin nhận tiền
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
                          <span className='font-medium'>Phản hồi từ bạn</span>
                        </div>
                        <p className='text-sm text-gray-700 mb-1'>
                          {refund.adminResponse}
                        </p>
                        {refund.processedAt && (
                          <p className='text-xs text-gray-500'>
                            {formatDate(refund.processedAt)}
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
                      <>
                        <button
                          onClick={() => {
                            setSelectedRefund(refund);
                            setAdminResponse(
                              'Yêu cầu hợp lệ, đã chuyển tiền hoàn trả'
                            );
                            handleApproveRefundRequest(refund._id);
                          }}
                          className='w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'
                        >
                          <CheckCircle className='w-4 h-4' />
                          Phê duyệt
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRefund(refund);
                            setAdminResponse('Yêu cầu không hợp lệ');
                            handleRejectRefundRequest(refund._id);
                          }}
                          className='w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'
                        >
                          <XCircle className='w-4 h-4' />
                          Từ chối
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedRefund && (
          <div className='fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
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
                {/* Document Info */}
                <div className='bg-gray-50 rounded-lg p-4'>
                  <h3 className='font-semibold mb-2'>
                    {selectedRefund.documentId?.title}
                  </h3>
                  <div className='grid grid-cols-2 gap-4 text-sm text-gray-600'>
                    <p>
                      Giá gốc:{' '}
                      {formatCurrency(selectedRefund.documentId?.price)}
                    </p>
                    <p>Số tiền hoàn: {formatCurrency(selectedRefund.amount)}</p>
                    <p>Ngày yêu cầu: {formatDate(selectedRefund.createdAt)}</p>
                    <p>
                      Trạng thái:{' '}
                      {selectedRefund.status === 'APPROVED'
                        ? 'Đã duyệt'
                        : selectedRefund.status === 'REJECTED'
                        ? 'Đã từ chối'
                        : 'Chờ duyệt'}
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
                    Thông tin nhận tiền
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

                {/* Admin Response Input */}
                {selectedRefund.status === 'PENDING' && (
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phản hồi của bạn *
                    </label>
                    <textarea
                      value={adminResponse}
                      onChange={(e) => setAdminResponse(e.target.value)}
                      placeholder='Nhập phản hồi cho yêu cầu này...'
                      rows={3}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>
                )}

                {/* Existing Admin Response */}
                {selectedRefund.adminResponse && (
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phản hồi từ bạn
                    </label>
                    <div
                      className={`p-3 rounded-lg ${
                        selectedRefund.status === 'APPROVED'
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <p className='text-gray-700 mb-1'>
                        {selectedRefund.adminResponse}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {formatDate(selectedRefund.processedAt)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedRefund.status === 'PENDING' && (
                  <div className='flex gap-3 pt-4'>
                    <button
                      onClick={closeModal}
                      className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() =>
                        handleRejectRefundRequest(selectedRefund._id)
                      }
                      disabled={isProcessing}
                      className='flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50'
                    >
                      {isProcessing ? 'Đang xử lý...' : 'Từ chối'}
                    </button>
                    <button
                      onClick={() =>
                        handleApproveRefundRequest(selectedRefund._id)
                      }
                      disabled={isProcessing}
                      className='flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 disabled:opacity-50'
                    >
                      {isProcessing ? 'Đang xử lý...' : 'Phê duyệt'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
