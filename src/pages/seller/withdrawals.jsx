import React, { useState, useEffect } from 'react';
import sellerServices from '../../services/sellerServices';
import authServices from '../../services/authServices';
import toast from 'react-hot-toast';
import {
  DollarSign,
  Calendar,
  Banknote,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Eye,
  X,
  Wallet,
} from 'lucide-react';
import LoadingPage from '../../components/common/LoadingPage';

export default function SellerWithdrawals() {
  const [withdrawalData, setWithdrawalData] = useState({
    withdrawalRequests: [],
    statistics: null,
  });
  const [loading, setLoading] = useState(false);
  const [bankInfo, setBankInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: '',
    bankDetails: {
      bankName: '',
      bankAccountName: '',
      bankAccountNumber: '',
    },
  });

  // Fetch data
  const fetchWithdrawalData = async () => {
    setLoading(true);
    try {
      const response = await sellerServices.getMyWithdrawalRequests();
      setWithdrawalData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBankInfo = async () => {
    try {
      const response = await authServices.getBanksInfo();
      setBankInfo(response.data);
    } catch (error) {
      console.error('Không thể tải thông tin ngân hàng:', error);
    }
  };

  useEffect(() => {
    fetchWithdrawalData();
    fetchBankInfo();
  }, []);

  // Handle form submission
  const handleSubmitWithdrawal = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const response = await sellerServices.createWithdrawalRequest({
        amount: Number(withdrawalForm.amount),
        bankDetails: withdrawalForm.bankDetails,
      });

      if (response.data.status) {
        toast.success('Yêu cầu rút tiền đã được tạo thành công');
        setIsModalOpen(false);
        setWithdrawalForm({
          amount: '',
          bankDetails: {
            bankName: '',
            bankAccountName: '',
            bankAccountNumber: '',
          },
        });
        // Refresh data
        fetchWithdrawalData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('bank.')) {
      const bankField = name.split('.')[1];
      setWithdrawalForm((prev) => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [bankField]: value,
        },
      }));
    } else {
      setWithdrawalForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
      case 'COMPLETED':
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
      case 'COMPLETED':
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
      case 'COMPLETED':
        return 'Hoàn thành';
      case 'REJECTED':
        return 'Từ chối';
      default:
        return status;
    }
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
                  Quản lý rút tiền 💳
                </h1>
                <p className='text-xl text-gray-600'>
                  Tạo yêu cầu rút tiền và theo dõi trạng thái
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
                    <div className='text-gray-600'>Hoàn thành</div>
                  </div>
                  <div className='text-center bg-white/50 rounded-xl p-4'>
                    <div className='text-2xl font-bold text-purple-600'>
                      {formatCurrency(
                        withdrawalData.statistics.overview.totalAmount
                      )}
                    </div>
                    <div className='text-gray-600'>Tổng tiền rút</div>
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
                      withdrawalData.statistics.overview.completedAmount || 0
                    )}
                  </div>
                  <div className='text-gray-600'>Đã nhận</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-orange-600'>
                    {formatCurrency(
                      withdrawalData.statistics.overview.pendingAmount || 0
                    )}
                  </div>
                  <div className='text-gray-600'>Chờ duyệt</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-red-600'>
                    {withdrawalData.statistics.overview.rejected || 0}
                  </div>
                  <div className='text-gray-600'>Bị từ chối</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-indigo-600'>
                    {withdrawalData.statistics.successRate || 0}%
                  </div>
                  <div className='text-gray-600'>Tỷ lệ thành công</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2'
            >
              <Plus className='w-5 h-5' />
              Tạo yêu cầu rút tiền mới
            </button>
          </div>
        </div>

        {/* Results */}
        <div className='mb-6 flex items-center justify-between'>
          <p className='text-gray-600'>
            Hiển thị {withdrawalData.withdrawalRequests.length} yêu cầu rút tiền
          </p>
        </div>

        {/* Withdrawal Requests Cards */}
        {withdrawalData.withdrawalRequests.length === 0 ? (
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 text-center'>
            <div className='text-6xl mb-4'>💳</div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              Chưa có yêu cầu rút tiền nào
            </h3>
            <p className='text-gray-600 mb-4'>
              Tạo yêu cầu rút tiền đầu tiên của bạn
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto'
            >
              <Plus className='w-4 h-4' />
              Tạo yêu cầu ngay
            </button>
          </div>
        ) : (
          <div className='space-y-4'>
            {withdrawalData.withdrawalRequests.map((request) => (
              <div
                key={request._id}
                className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300'
              >
                <div className='flex flex-col lg:flex-row gap-6'>
                  {/* Left Side - Request Info */}
                  <div className='flex-1'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-start gap-4'>
                        <div className='w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                          <Wallet className='w-8 h-8 text-blue-600' />
                        </div>
                        <div className='flex-1'>
                          <h3 className='font-bold text-lg text-gray-900 mb-1'>
                            Yêu cầu rút tiền
                          </h3>
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
                          <DollarSign className='w-4 h-4 text-blue-600' />
                          <span className='font-medium text-gray-900'>
                            Chi tiết giao dịch
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

                    {/* Processing Timeline */}
                    <div className='bg-gray-50 rounded-lg p-3'>
                      <h4 className='font-medium text-gray-900 mb-2'>
                        Trạng thái xử lý
                      </h4>
                      <div className='flex items-center gap-2 text-sm'>
                        <div className='flex items-center gap-1 text-blue-600'>
                          <Clock className='w-4 h-4' />
                          <span>Đã tạo: {formatDate(request.createdAt)}</span>
                        </div>
                        {request.status !== 'PENDING' && (
                          <div className='flex items-center gap-1 text-gray-600'>
                            →
                            <span
                              className={
                                request.status === 'COMPLETED'
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }
                            >
                              {request.status === 'COMPLETED'
                                ? 'Đã hoàn thành'
                                : 'Đã từ chối'}
                              : {formatDate(request.updatedAt)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Status */}
                  <div className='lg:w-48 flex flex-col gap-3'>
                    {request.status === 'PENDING' && (
                      <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center'>
                        <Clock className='w-8 h-8 text-yellow-600 mx-auto mb-2' />
                        <p className='text-sm font-medium text-yellow-800 mb-1'>
                          Chờ xử lý
                        </p>
                        <p className='text-xs text-yellow-700'>
                          Yêu cầu đang được Manager xem xét
                        </p>
                      </div>
                    )}

                    {request.status === 'COMPLETED' && (
                      <div className='bg-green-50 border border-green-200 rounded-xl p-4 text-center'>
                        <CheckCircle className='w-8 h-8 text-green-600 mx-auto mb-2' />
                        <p className='text-sm font-medium text-green-800 mb-1'>
                          Hoàn thành
                        </p>
                        <p className='text-xs text-green-700'>
                          Tiền đã được chuyển vào tài khoản
                        </p>
                      </div>
                    )}

                    {request.status === 'REJECTED' && (
                      <div className='bg-red-50 border border-red-200 rounded-xl p-4 text-center'>
                        <XCircle className='w-8 h-8 text-red-600 mx-auto mb-2' />
                        <p className='text-sm font-medium text-red-800 mb-1'>
                          Bị từ chối
                        </p>
                        <p className='text-xs text-red-700'>
                          Yêu cầu không được chấp thuận
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for creating withdrawal request */}
        {isModalOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto'>
              <div className='sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-xl font-bold text-gray-900'>
                    Tạo yêu cầu rút tiền
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>
              </div>

              <div className='p-6'>
                <form onSubmit={handleSubmitWithdrawal} className='space-y-4'>
                  {/* Amount */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Số tiền (VND) <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='number'
                      name='amount'
                      value={withdrawalForm.amount}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Nhập số tiền muốn rút'
                      required
                    />
                  </div>

                  {/* Bank Name */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Tên ngân hàng <span className='text-red-500'>*</span>
                    </label>
                    <select
                      name='bank.bankName'
                      value={withdrawalForm.bankDetails.bankName}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      required
                    >
                      <option value=''>Chọn ngân hàng</option>
                      {bankInfo.map((bank) => (
                        <option key={bank.id} value={bank.code}>
                          {bank.name} ({bank.shortName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Account Name */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Tên chủ tài khoản <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='bank.bankAccountName'
                      value={withdrawalForm.bankDetails.bankAccountName}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Nhập tên chủ tài khoản'
                      required
                    />
                  </div>

                  {/* Account Number */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Số tài khoản <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='bank.bankAccountNumber'
                      value={withdrawalForm.bankDetails.bankAccountNumber}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Nhập số tài khoản'
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className='flex justify-end space-x-3 pt-6 border-t border-gray-200'>
                    <button
                      type='button'
                      onClick={() => setIsModalOpen(false)}
                      className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
                    >
                      Hủy
                    </button>
                    <button
                      type='submit'
                      disabled={formLoading}
                      className='px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border border-transparent rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105'
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
                        'Tạo yêu cầu'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
