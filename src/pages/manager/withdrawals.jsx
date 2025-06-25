import React, { useEffect, useState } from 'react';
import managerServices from '../../services/managerServices';
import toast from 'react-hot-toast';
import {
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  Search,
  AlertTriangle,
  Banknote,
  MessageSquare,
  Eye,
  X,
  RefreshCw,
  UserCheck,
  Wallet,
} from 'lucide-react';
import LoadingPage from '../../components/common/LoadingPage';

export default function ManagerWithdrawals() {
  const [withdrawalData, setWithdrawalData] = useState({
    withdrawalRequests: [],
    statistics: null,
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState('');

  // Fetch all withdrawal requests
  const fetchWithdrawalRequests = async () => {
    setLoading(true);
    try {
      const response = await managerServices.getAllWithdrawalsRequests();
      setWithdrawalData(response.data);
    } catch (error) {
      toast.error('Không thể tải dữ liệu yêu cầu rút tiền');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawalRequests();
  }, []);

  const handleWithdrawRequest = async (action) => {
    if (!selectedRequest) {
      toast.error('Không tìm thấy yêu cầu');
      return;
    }

    setFormLoading(true);
    try {
      const response = await managerServices.handleWithdrawRequest(
        selectedRequest._id,
        {
          status: action.toUpperCase(),
          notes: notes,
        }
      );

      if (response.data.status) {
        toast.success(
          `Yêu cầu rút tiền đã được ${
            action === 'APPROVED' ? 'duyệt' : 'từ chối'
          } thành công`
        );
        setIsModalOpen(false);
        setSelectedRequest(null);
        setNotes('');
        fetchWithdrawalRequests(); // Refresh data
      } else {
        toast.error('Xử lý yêu cầu thất bại');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Có lỗi xảy ra khi xử lý yêu cầu'
      );
    } finally {
      setFormLoading(false);
    }
  };

  // Open modal to handle request
  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
    setNotes('');
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
    setNotes('');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'APPROVED':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'REJECTED':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Get status icon
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

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Chờ xử lý';
      case 'APPROVED':
        return 'Đã duyệt';
      case 'REJECTED':
        return 'Từ chối';
      default:
        return status;
    }
  };

  // Tabs configuration
  const tabs = [
    {
      id: 'ALL',
      label: 'Tất cả',
      count: withdrawalData.withdrawalRequests.length,
    },
    {
      id: 'PENDING',
      label: 'Chờ xử lý',
      count: withdrawalData.withdrawalRequests.filter(
        (r) => r.status === 'PENDING'
      ).length,
    },
    {
      id: 'APPROVED',
      label: 'Đã duyệt',
      count: withdrawalData.withdrawalRequests.filter(
        (r) => r.status === 'APPROVED'
      ).length,
    },
    {
      id: 'REJECTED',
      label: 'Từ chối',
      count: withdrawalData.withdrawalRequests.filter(
        (r) => r.status === 'REJECTED'
      ).length,
    },
  ];

  // Filter requests based on tab and search
  const filteredRequests = withdrawalData.withdrawalRequests.filter(
    (request) => {
      const matchesTab =
        activeTab === 'ALL' || request.status === activeTab.toUpperCase();
      const matchesSearch =
        searchTerm === '' ||
        request.sellerId?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        request.sellerId?.email
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        request.bankDetails?.bankName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        request.bankDetails?.bankAccountName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    }
  );

  // Loading state
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
                  Quản lý rút tiền 💳
                </h1>
                <p className='text-xl text-gray-600'>
                  Xem và xử lý các yêu cầu rút tiền từ sellers
                </p>
              </div>

              {/* Statistics Grid */}
              {withdrawalData.statistics && (
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm'>
                  <div className='text-center bg-white/50 rounded-xl p-4'>
                    <div className='text-2xl font-bold text-blue-600'>
                      {withdrawalData.statistics.overview.total}
                    </div>
                    <div className='text-gray-600'>Tổng yêu cầu</div>
                  </div>
                  <div className='text-center bg-white/50 rounded-xl p-4'>
                    <div className='text-2xl font-bold text-yellow-600'>
                      {withdrawalData.statistics.overview.pending}
                    </div>
                    <div className='text-gray-600'>Chờ xử lý</div>
                  </div>
                  <div className='text-center bg-white/50 rounded-xl p-4'>
                    <div className='text-2xl font-bold text-green-600'>
                      {withdrawalData.statistics.overview.completed}
                    </div>
                    <div className='text-gray-600'>Đã hoàn thành</div>
                  </div>
                  <div className='text-center bg-white/50 rounded-xl p-4'>
                    <div className='text-2xl font-bold text-purple-600'>
                      {formatCurrency(
                        withdrawalData.statistics.overview.totalAmount
                      )}
                    </div>
                    <div className='text-gray-600'>Tổng tiền</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Statistics Row */}
        {withdrawalData.statistics && (
          <div className='mb-8'>
            <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-emerald-600'>
                    {formatCurrency(
                      withdrawalData.statistics.overview.completedAmount
                    )}
                  </div>
                  <div className='text-gray-600'>Đã chi trả</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-orange-600'>
                    {formatCurrency(
                      withdrawalData.statistics.overview.pendingAmount
                    )}
                  </div>
                  <div className='text-gray-600'>Chờ chi trả</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-indigo-600'>
                    {withdrawalData.statistics.successRate || 0}%
                  </div>
                  <div className='text-gray-600'>Tỷ lệ thành công</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-red-600'>
                    {withdrawalData.statistics.urgentRequests?.length || 0}
                  </div>
                  <div className='text-gray-600'>Khẩn cấp</div>
                </div>
              </div>
            </div>
          </div>
        )}

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
                placeholder='Tìm kiếm theo tên seller, email, ngân hàng...'
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
            Hiển thị {filteredRequests.length} yêu cầu rút tiền
          </p>
        </div>

        {/* Withdrawal Requests Cards */}
        {filteredRequests.length === 0 ? (
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 text-center'>
            <div className='text-6xl mb-4'>💳</div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              Không có yêu cầu rút tiền nào
            </h3>
            <p className='text-gray-600'>
              {activeTab === 'All'
                ? 'Chưa có yêu cầu rút tiền nào'
                : `Không có yêu cầu ${tabs
                    .find((t) => t.id === activeTab)
                    ?.label.toLowerCase()}`}
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredRequests.map((request) => (
              <div
                key={request._id}
                className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300'
              >
                <div className='flex flex-col lg:flex-row gap-6'>
                  {/* Left Side - Request Info */}
                  <div className='flex-1'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-start gap-4'>
                        <img
                          src={request.sellerId.avatar}
                          alt={request.sellerId.name}
                          className='w-16 h-16 rounded-xl object-cover flex-shrink-0'
                        />
                        <div className='flex-1'>
                          <h3 className='font-bold text-lg text-gray-900 mb-1'>
                            {request.sellerId.name}
                          </h3>
                          <p className='text-sm text-gray-600 mb-2'>
                            {request.sellerId.email}
                          </p>
                          <div className='flex items-center gap-4 text-sm text-gray-600 mb-2'>
                            <span className='flex items-center gap-1'>
                              <DollarSign className='w-4 h-4' />
                              Số tiền: {formatCurrency(request.amount)}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Calendar className='w-4 h-4' />
                              {formatDate(request.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {getStatusIcon(request.status)}
                        {getStatusText(request.status)}
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                      {/* Bank Details */}
                      <div className='bg-green-50 rounded-lg p-3'>
                        <div className='flex items-center gap-2 mb-2'>
                          <Banknote className='w-4 h-4 text-green-600' />
                          <span className='font-medium text-gray-900'>
                            Thông tin ngân hàng
                          </span>
                        </div>
                        <div className='space-y-1 text-sm text-gray-700'>
                          <p>
                            <strong>Ngân hàng:</strong>{' '}
                            {request.bankDetails.bankName}
                          </p>
                          <p>
                            <strong>Chủ TK:</strong>{' '}
                            {request.bankDetails.bankAccountName}
                          </p>
                          <p>
                            <strong>Số TK:</strong>{' '}
                            {request.bankDetails.bankAccountNumber}
                          </p>
                        </div>
                      </div>

                      {/* Amount Info */}
                      <div className='bg-blue-50 rounded-lg p-3'>
                        <div className='flex items-center gap-2 mb-2'>
                          <Wallet className='w-4 h-4 text-blue-600' />
                          <span className='font-medium text-gray-900'>
                            Chi tiết rút tiền
                          </span>
                        </div>
                        <div className='space-y-1 text-sm text-gray-700'>
                          <p>
                            <strong>Số tiền yêu cầu:</strong>{' '}
                            {formatCurrency(request.amount)}
                          </p>
                          <p>
                            <strong>Ngày tạo:</strong>{' '}
                            {formatDate(request.createdAt)}
                          </p>
                          <p>
                            <strong>Cập nhật:</strong>{' '}
                            {formatDate(request.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Notes/Admin Response */}
                    {request.notes && (
                      <div className='bg-gray-50 rounded-lg p-3 mb-4'>
                        <div className='flex items-center gap-2 mb-2'>
                          <MessageSquare className='w-4 h-4 text-gray-600' />
                          <span className='font-medium text-gray-900'>
                            Ghi chú xử lý
                          </span>
                        </div>
                        <p className='text-sm text-gray-700'>{request.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Actions */}
                  <div className='lg:w-48 flex flex-col gap-3'>
                    <button
                      onClick={() => handleOpenModal(request)}
                      className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'
                    >
                      <Eye className='w-4 h-4' />
                      {request.status === 'PENDING' ? 'Xử lý' : 'Xem chi tiết'}
                    </button>

                    {request.status === 'PENDING' && (
                      <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center'>
                        <AlertTriangle className='w-5 h-5 text-yellow-600 mx-auto mb-1' />
                        <p className='text-xs text-yellow-700'>Chờ bạn xử lý</p>
                      </div>
                    )}

                    {request.status === 'APPROVED' && (
                      <div className='bg-green-50 border border-green-200 rounded-xl p-3 text-center'>
                        <CheckCircle className='w-5 h-5 text-green-600 mx-auto mb-1' />
                        <p className='text-xs text-green-700'>
                          Đã duyệt và chi trả
                        </p>
                      </div>
                    )}

                    {request.status === 'REJECTED' && (
                      <div className='bg-red-50 border border-red-200 rounded-xl p-3 text-center'>
                        <XCircle className='w-5 h-5 text-red-600 mx-auto mb-1' />
                        <p className='text-xs text-red-700'>Đã từ chối</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for handling withdrawal request */}
        {isModalOpen && selectedRequest && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto'>
              <div className='sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-xl font-bold text-gray-900'>
                    {selectedRequest.status === 'PENDING'
                      ? 'Xử lý yêu cầu rút tiền'
                      : 'Chi tiết yêu cầu rút tiền'}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>
              </div>

              <div className='p-6 space-y-6'>
                {/* Seller Info */}
                <div className='bg-gray-50 rounded-lg p-4'>
                  <h3 className='font-semibold mb-3 flex items-center gap-2'>
                    <UserCheck className='w-5 h-5' />
                    Thông tin Seller
                  </h3>
                  <div className='flex items-center gap-4'>
                    <img
                      src={selectedRequest.sellerId.avatar}
                      alt={selectedRequest.sellerId.name}
                      className='w-16 h-16 rounded-full object-cover'
                    />
                    <div>
                      <h4 className='font-medium text-lg'>
                        {selectedRequest.sellerId.name}
                      </h4>
                      <p className='text-gray-600'>
                        {selectedRequest.sellerId.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Withdrawal Details */}
                <div className='bg-blue-50 rounded-lg p-4'>
                  <h3 className='font-semibold mb-3 flex items-center gap-2'>
                    <Wallet className='w-5 h-5' />
                    Chi tiết rút tiền
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                    <p>
                      <strong>Số tiền yêu cầu:</strong>{' '}
                      {formatCurrency(selectedRequest.amount)}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(
                          selectedRequest.status
                        )}`}
                      >
                        {getStatusText(selectedRequest.status)}
                      </span>
                    </p>
                    <p>
                      <strong>Ngày tạo:</strong>{' '}
                      {formatDate(selectedRequest.createdAt)}
                    </p>
                    <p>
                      <strong>Cập nhật cuối:</strong>{' '}
                      {formatDate(selectedRequest.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* Bank Details */}
                <div className='bg-green-50 rounded-lg p-4'>
                  <h3 className='font-semibold mb-3 flex items-center gap-2'>
                    <Banknote className='w-5 h-5' />
                    Thông tin ngân hàng
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                    <p>
                      <strong>Ngân hàng:</strong>{' '}
                      {selectedRequest.bankDetails.bankName}
                    </p>
                    <p>
                      <strong>Số tài khoản:</strong>{' '}
                      {selectedRequest.bankDetails.bankAccountNumber}
                    </p>
                    <p>
                      <strong>Tên chủ tài khoản:</strong>{' '}
                      {selectedRequest.bankDetails.bankAccountName}
                    </p>
                  </div>
                </div>

                {/* Existing Notes */}
                {selectedRequest.notes && (
                  <div className='bg-gray-50 rounded-lg p-4'>
                    <h3 className='font-semibold mb-3 flex items-center gap-2'>
                      <MessageSquare className='w-5 h-5' />
                      Ghi chú xử lý
                    </h3>
                    <p className='text-gray-700'>{selectedRequest.notes}</p>
                  </div>
                )}

                {/* Action Section - Only show for PENDING requests */}
                {selectedRequest.status === 'PENDING' && (
                  <div className='border-t pt-6'>
                    <h3 className='font-semibold mb-4'>Xử lý yêu cầu</h3>

                    {/* Notes Input */}
                    <div className='mb-6'>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Ghi chú (tùy chọn)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        rows='3'
                        placeholder='Nhập ghi chú về quyết định của bạn...'
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col sm:flex-row gap-3'>
                      <button
                        onClick={() => handleWithdrawRequest('APPROVED')}
                        disabled={formLoading}
                        className='flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                      >
                        {formLoading ? (
                          <div className='flex items-center'>
                            <svg
                              className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                            >
                              <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'
                              ></circle>
                              <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                              ></path>
                            </svg>
                            Đang xử lý...
                          </div>
                        ) : (
                          <>
                            <CheckCircle className='w-5 h-5' />
                            Duyệt yêu cầu
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleWithdrawRequest('REJECTED')}
                        disabled={formLoading}
                        className='flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                      >
                        {formLoading ? (
                          <div className='flex items-center'>
                            <svg
                              className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                            >
                              <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'
                              ></circle>
                              <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                              ></path>
                            </svg>
                            Đang xử lý...
                          </div>
                        ) : (
                          <>
                            <XCircle className='w-5 h-5' />
                            Từ chối yêu cầu
                          </>
                        )}
                      </button>
                    </div>
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
