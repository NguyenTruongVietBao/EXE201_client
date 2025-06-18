import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import managerServices from '../../services/managerServices';
import toast from 'react-hot-toast';

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <div className='container mx-auto p-6'>
        <div className='animate-pulse'>
          <div className='h-8 bg-gray-200 rounded w-1/4 mb-6'></div>
          <div className='space-y-4'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='h-20 bg-gray-200 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6 min-h-screen'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
          Quản lý tài liệu
        </h1>
        <p className='text-gray-600'>
          Quản lý và điều hành các tài liệu trên nền tảng
        </p>
      </div>

      {/* Pagination Info */}
      <div className='mb-4 flex justify-between items-center'>
        <p className='text-gray-600'>
          Hiển thị {filteredDocuments.length} / {pagination.totalDocuments} tài
          liệu
        </p>
        {pagination.totalPages > 1 && (
          <p className='text-sm text-gray-500'>
            Trang {pagination.currentPage} / {pagination.totalPages}
          </p>
        )}
      </div>

      {/* Filters & Search */}
      <div className='bg-white rounded-xl shadow-sm border p-6 mb-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {/* Search */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Tìm kiếm
            </label>
            <input
              type='text'
              placeholder='Nhập tên tài liệu...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Trạng thái
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value='ALL'>Tất cả</option>
              <option value='APPROVED'>Đã duyệt</option>
              <option value='PENDING'>Chờ duyệt</option>
              <option value='REJECTED'>Bị từ chối</option>
            </select>
          </div>

          {/* Interest Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Lĩnh vực
            </label>
            <select
              value={interestFilter}
              onChange={(e) => setInterestFilter(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Sắp xếp
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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

      {/* Documents Table */}
      <div className='bg-white rounded-xl shadow-sm border overflow-hidden'>
        {filteredDocuments.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-6xl mb-4'>📄</div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              Không tìm thấy tài liệu
            </h3>
            <p className='text-gray-600'>
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[1200px]'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='w-[35%] px-4 py-4 text-left text-sm font-semibold text-gray-900'>
                    Tài liệu
                  </th>
                  <th className='w-[15%] px-4 py-4 text-left text-sm font-semibold text-gray-900'>
                    Tác giả
                  </th>
                  <th className='w-[12%] px-4 py-4 text-left text-sm font-semibold text-gray-900'>
                    Giá
                  </th>
                  <th className='w-[10%] px-4 py-4 text-left text-sm font-semibold text-gray-900'>
                    Đánh giá
                  </th>
                  <th className='w-[10%] px-4 py-4 text-left text-sm font-semibold text-gray-900'>
                    Trạng thái
                  </th>
                  <th className='w-[10%] px-4 py-4 text-left text-sm font-semibold text-gray-900'>
                    Ngày tạo
                  </th>
                  <th className='w-[8%] px-4 py-4 text-center text-sm font-semibold text-gray-900'>
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc._id}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    {/* Tài liệu */}
                    <td className='px-4 py-4'>
                      <div className='flex items-start space-x-3'>
                        <img
                          src={doc.imageUrls?.[0] || '/placeholder.jpg'}
                          alt={doc.title}
                          className='w-12 h-12 rounded-lg object-cover flex-shrink-0'
                        />
                        <div className='flex-1 min-w-0'>
                          <h3 className='text-sm font-semibold text-gray-900 mb-1 line-clamp-1'>
                            {doc.title}
                          </h3>
                          <p className='text-xs text-gray-600 line-clamp-2 mb-2'>
                            {doc.description}
                          </p>
                          <div className='flex flex-wrap gap-1'>
                            {doc.interests.slice(0, 2).map((interest) => (
                              <span
                                key={interest._id}
                                className='inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800'
                              >
                                {interest.emoji} {interest.name}
                              </span>
                            ))}
                            {doc.interests.length > 2 && (
                              <span className='text-xs text-gray-500'>
                                +{doc.interests.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Tác giả */}
                    <td className='px-4 py-4'>
                      <div className='flex items-center space-x-2'>
                        <img
                          src={doc.author.avatar}
                          alt={doc.author.name}
                          className='w-8 h-8 rounded-full flex-shrink-0'
                        />
                        <div className='min-w-0 flex-1'>
                          <div className='text-sm font-medium text-gray-900 truncate'>
                            {doc.author.name}
                          </div>
                          <div className='text-xs text-gray-600 truncate'>
                            {doc.author.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Giá */}
                    <td className='px-4 py-4'>
                      <div className='text-sm font-semibold text-gray-900'>
                        {doc.price > 0 ? (
                          <div className='space-y-1'>
                            <div>{formatPrice(doc.price)}</div>
                            {doc.discount > 0 && (
                              <div className='text-xs text-green-600'>
                                Giảm {doc.discount}%
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className='text-green-600 font-medium'>
                            Miễn phí
                          </span>
                        )}
                      </div>
                      <div className='text-xs text-gray-500 mt-1'>
                        {doc.download} lượt tải
                      </div>
                    </td>

                    {/* Đánh giá */}
                    <td className='px-4 py-4'>
                      <div className='flex items-center space-x-1'>
                        <span className='text-sm font-medium text-gray-900'>
                          {calculateAverageRating(doc.feedback)}
                        </span>
                        <span className='text-yellow-400'>⭐</span>
                      </div>
                      <div className='text-xs text-gray-600'>
                        ({doc.feedback.length} đánh giá)
                      </div>
                    </td>

                    {/* Trạng thái */}
                    <td className='px-4 py-4'>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          doc.status === 'APPROVED'
                            ? 'bg-green-100 text-green-800'
                            : doc.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {doc.status === 'APPROVED' && '✅ Đã duyệt'}
                        {doc.status === 'PENDING' && '⏳ Chờ duyệt'}
                        {doc.status === 'REJECTED' && '❌ Từ chối'}
                      </span>
                    </td>

                    {/* Ngày tạo */}
                    <td className='px-4 py-4'>
                      <div className='text-sm text-gray-900 whitespace-nowrap'>
                        {formatDate(doc.createdAt)}
                      </div>
                    </td>

                    {/* Thao tác */}
                    <td className='px-4 py-4'>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => handleViewDetail(doc._id)}
                          className='text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 rounded bg-blue-50 hover:bg-blue-100 transition-colors whitespace-nowrap'
                        >
                          Chi tiết
                        </button>
                        <button
                          onClick={() =>
                            handlePublishToggle(doc._id, doc.status)
                          }
                          className={`px-4 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap ${
                            doc.status === 'APPROVED'
                              ? 'bg-red-100 text-red-700 hover:bg-red-100'
                              : 'bg-green-100 text-green-700 hover:bg-green-100'
                          }`}
                        >
                          {doc.status === 'APPROVED' ? '❌ Ẩn bài' : '✅ Duyệt'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
