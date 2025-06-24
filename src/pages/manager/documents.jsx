import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import managerServices from '../../services/managerServices';
import toast from 'react-hot-toast';
import { formatCurrency, formatDate } from '../../utils';
import LoadingPage from '../../components/common/LoadingPage';
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  User,
  DollarSign,
  Star,
  Download,
  Calendar,
  Filter,
  SortAsc,
} from 'lucide-react';

export default function ManagerDocuments() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  console.log('🚀 ~ ManagerDocuments ~ documents:', documents);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalDocuments: 0,
    hasMore: false,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [interestFilter, setInterestFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await managerServices.getAllDocuments(1, 20);
        console.log('🚀 ~ fetchDocuments ~ response:', response);
        if (response.status) {
          setDocuments(response.data.documents || []);
          setPagination(
            response.data.pagination || {
              currentPage: 1,
              totalPages: 1,
              totalDocuments: 0,
              hasMore: false,
            }
          );
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách tài liệu:', error);
        toast.error('Lỗi khi tải danh sách tài liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handlePublishToggle = async (documentId, currentStatus) => {
    try {
      if (currentStatus === 'APPROVED') {
        await managerServices.unpublishDocument(documentId);
        toast.success('Ẩn bài viết thành công');
      } else {
        await managerServices.publishDocument(documentId);
        toast.success('Công khai bài viết thành công');
      }

      // Cập nhật state local
      setDocuments((prev) =>
        prev.map((doc) =>
          doc._id === documentId
            ? {
                ...doc,
                status: currentStatus === 'APPROVED' ? 'PENDING' : 'APPROVED',
              }
            : doc
        )
      );
    } catch (error) {
      console.error('Lỗi khi thay đổi trạng thái publish:', error);
      toast.error('Lỗi khi thay đổi trạng thái');
    }
  };

  const handleViewDetail = (documentId) => {
    navigate(`/manager/documents/${documentId}`);
  };

  // Lọc và sắp xếp documents
  const filteredDocuments = documents
    .filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'APPROVED' && doc.status === 'APPROVED') ||
        (statusFilter === 'PENDING' && doc.status === 'PENDING') ||
        (statusFilter === 'REJECTED' && doc.status === 'REJECTED');

      const matchesInterest =
        interestFilter === 'ALL' ||
        doc.interests.some((interest) => interest.name === interestFilter);

      return matchesSearch && matchesStatus && matchesInterest;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'rating': {
          const avgRatingA =
            a.feedback.length > 0
              ? a.feedback.reduce((sum, f) => sum + f.rating, 0) /
                a.feedback.length
              : 0;
          const avgRatingB =
            b.feedback.length > 0
              ? b.feedback.reduce((sum, f) => sum + f.rating, 0) /
                b.feedback.length
              : 0;
          return avgRatingB - avgRatingA;
        }
        default:
          return 0;
      }
    });

  // Lấy danh sách unique interests
  const ALLInterests = [
    ...new Set(
      documents.flatMap((doc) => doc.interests.map((interest) => interest.name))
    ),
  ];

  const calculateAverageRating = (feedback) => {
    if (feedback.length === 0) return 0;
    const sum = feedback.reduce((acc, f) => acc + f.rating, 0);
    return (sum / feedback.length).toFixed(1);
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
        return <FileText className='w-4 h-4' />;
    }
  };

  // Stats calculation
  const stats = {
    total: documents.length,
    approved: documents.filter((doc) => doc.status === 'APPROVED').length,
    pending: documents.filter((doc) => doc.status === 'PENDING').length,
    rejected: documents.filter((doc) => doc.status === 'REJECTED').length,
    totalRevenue: documents.reduce(
      (sum, doc) => sum + doc.price * (doc.download || 0),
      0
    ),
    totalDownloads: documents.reduce(
      (sum, doc) => sum + (doc.download || 0),
      0
    ),
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
                  Quản lý tài liệu 📚
                </h1>
                <p className='text-xl text-gray-600'>
                  Quản lý và điều hành các tài liệu trên nền tảng
                </p>
              </div>

              <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm'>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {stats.total}
                  </div>
                  <div className='text-gray-600'>Tổng tài liệu</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-green-600'>
                    {stats.approved}
                  </div>
                  <div className='text-gray-600'>Đã duyệt</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-yellow-600'>
                    {stats.pending}
                  </div>
                  <div className='text-gray-600'>Chờ duyệt</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-red-600'>
                    {stats.rejected}
                  </div>
                  <div className='text-gray-600'>Bị từ chối</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-purple-600'>
                    {stats.totalDownloads}
                  </div>
                  <div className='text-gray-600'>Lượt tải</div>
                </div>
                <div className='text-center bg-white/50 rounded-xl p-4'>
                  <div className='text-2xl font-bold text-emerald-600'>
                    {formatCurrency(stats.totalRevenue)}
                  </div>
                  <div className='text-gray-600'>Giá trị</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {/* Search */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2'>
                  <Search className='w-4 h-4' />
                  Tìm kiếm
                </label>
                <input
                  type='text'
                  placeholder='Nhập tên tài liệu...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2'>
                  <Filter className='w-4 h-4' />
                  Trạng thái
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                >
                  <option value='ALL'>Tất cả</option>
                  <option value='APPROVED'>Đã duyệt</option>
                  <option value='PENDING'>Chờ duyệt</option>
                  <option value='REJECTED'>Bị từ chối</option>
                </select>
              </div>

              {/* Interest Filter */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2'>
                  <FileText className='w-4 h-4' />
                  Lĩnh vực
                </label>
                <select
                  value={interestFilter}
                  onChange={(e) => setInterestFilter(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                >
                  <option value='ALL'>Tất cả</option>
                  {ALLInterests.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2'>
                  <SortAsc className='w-4 h-4' />
                  Sắp xếp
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                >
                  <option value='newest'>Mới nhất</option>
                  <option value='oldest'>Cũ nhất</option>
                  <option value='price-high'>Giá cao → thấp</option>
                  <option value='price-low'>Giá thấp → cao</option>
                  <option value='rating'>Đánh giá cao nhất</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className='mb-6 flex items-center justify-between'>
          <p className='text-gray-600'>
            Hiển thị {filteredDocuments.length} / {pagination.totalDocuments}{' '}
            tài liệu
          </p>
          {pagination.totalPages > 1 && (
            <p className='text-sm text-gray-500'>
              Trang {pagination.currentPage} / {pagination.totalPages}
            </p>
          )}
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length === 0 ? (
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 text-center'>
            <div className='text-6xl mb-4'>📄</div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              Không tìm thấy tài liệu
            </h3>
            <p className='text-gray-600'>
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredDocuments.map((doc) => (
              <div
                key={doc._id}
                className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300'
              >
                <div className='flex flex-col lg:flex-row gap-6'>
                  {/* Left Side - Document Info */}
                  <div className='flex-1'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-start gap-4'>
                        <img
                          src={doc.imageUrls?.[0] || '/placeholder.jpg'}
                          alt={doc.title}
                          className='w-16 h-16 rounded-xl object-cover flex-shrink-0'
                        />
                        <div className='flex-1'>
                          <h3 className='font-bold text-lg text-gray-900 mb-1'>
                            {doc.title}
                          </h3>
                          <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
                            {doc.description}
                          </p>

                          {/* Interests */}
                          <div className='flex flex-wrap gap-1 mb-3'>
                            {doc.interests.slice(0, 3).map((interest) => (
                              <span
                                key={interest._id}
                                className='inline-flex items-center px-2 py-1 rounded-lg text-xs bg-blue-100 text-blue-700 font-medium'
                              >
                                {interest.emoji} {interest.name}
                              </span>
                            ))}
                            {doc.interests.length > 3 && (
                              <span className='text-xs text-gray-500 px-2 py-1'>
                                +{doc.interests.length - 3} khác
                              </span>
                            )}
                          </div>

                          {/* Stats */}
                          <div className='flex items-center gap-4 text-sm text-gray-600'>
                            <span className='flex items-center gap-1'>
                              <DollarSign className='w-4 h-4' />
                              {doc.price > 0
                                ? formatCurrency(doc.price)
                                : 'Miễn phí'}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Download className='w-4 h-4' />
                              {doc.download} lượt tải
                            </span>
                            <span className='flex items-center gap-1'>
                              <Star className='w-4 h-4 text-yellow-400' />
                              {calculateAverageRating(doc.feedback)} (
                              {doc.feedback.length})
                            </span>
                            <span className='flex items-center gap-1'>
                              <Calendar className='w-4 h-4' />
                              {formatDate(doc.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                          doc.status
                        )}`}
                      >
                        {getStatusIcon(doc.status)}
                        {doc.status === 'APPROVED'
                          ? 'Đã duyệt'
                          : doc.status === 'REJECTED'
                          ? 'Bị từ chối'
                          : 'Chờ duyệt'}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className='bg-gray-50 rounded-lg p-3'>
                      <div className='flex items-center gap-2 mb-2'>
                        <User className='w-4 h-4 text-gray-600' />
                        <span className='font-medium text-gray-900'>
                          Tác giả
                        </span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <img
                          src={doc.author.avatar}
                          alt={doc.author.name}
                          className='w-8 h-8 rounded-full'
                        />
                        <div>
                          <p className='font-medium text-sm'>
                            {doc.author.name}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {doc.author.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Actions */}
                  <div className='lg:w-48 flex flex-col gap-3'>
                    <button
                      onClick={() => handleViewDetail(doc._id)}
                      className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'
                    >
                      <Eye className='w-4 h-4' />
                      Chi tiết
                    </button>

                    <button
                      onClick={() => handlePublishToggle(doc._id, doc.status)}
                      className={`w-full py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                        doc.status === 'APPROVED'
                          ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                      }`}
                    >
                      {doc.status === 'APPROVED' ? (
                        <>
                          <XCircle className='w-4 h-4' />
                          Ẩn bài
                        </>
                      ) : (
                        <>
                          <CheckCircle className='w-4 h-4' />
                          Duyệt bài
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
