import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Eye,
  Star,
  Calendar,
  Bookmark,
  Share2,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  SortAsc,
  SortDesc,
  Edit,
  Trash2,
  ExternalLink,
  Heart,
  TrendingUp,
  FileText,
  Users,
  ShoppingCart,
  DollarSign,
} from 'lucide-react';
import documentServices from '../../services/documentServices';
import { Link } from 'react-router';

export default function SellerMyDocuments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterStatus, setFilterStatus] = useState('all');
  const [myDocuments, setMyDocuments] = useState([]);

  useEffect(() => {
    const fetchMyDocuments = async () => {
      try {
        const response = await documentServices.getMyDocuments();
        if (response.status && response.data) {
          // Map documents từ API response
          const mappedDocuments = response.data.map((doc) => ({
            id: doc._id,
            title: doc.title,
            description: doc.description,
            price: doc.isFree
              ? 'Miễn phí'
              : `${doc.price.toLocaleString('vi-VN')} VND`,
            originalPrice: doc.price,
            discount: doc.discount || 0,
            finalPrice: doc.price - (doc.price * (doc.discount || 0)) / 100,
            thumbnail: doc.imageUrls?.[0] || '/default-thumbnail.jpg',
            documentUrl: doc.documentUrls?.[0],
            videoUrl: doc.videoUrls?.[0],
            documentUrls: doc.documentUrls || [],
            videoUrls: doc.videoUrls || [],
            duration: doc.duration,
            tags: doc.interests?.map((interest) => interest.name) || [],
            interests: doc.interests || [],
            author: doc.author,
            isFree: doc.isFree,
            feedback: doc.feedback || [],
            createdAt: new Date(doc.createdAt).toLocaleDateString('vi-VN'),
            updatedAt: new Date(doc.updatedAt).toLocaleDateString('vi-VN'),
            status: doc.status === 'APPROVED' ? 'approved' : 'pending',
            downloads: doc.download || 0,
            views: doc.views || 0,
            rating: doc.rating || 0,
            reviewCount: doc.feedback?.length || 0,
            category: doc.interests?.[0]?.name || 'Khác',
          }));

          setMyDocuments(mappedDocuments);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
        setMyDocuments([]);
      }
    };
    fetchMyDocuments();
  }, []);

  console.log('myDocuments', myDocuments);

  const stats = {
    total: myDocuments?.length || 0,
    approved:
      myDocuments?.filter((doc) => doc.status === 'approved').length || 0,
    pending: myDocuments?.filter((doc) => doc.status === 'pending').length || 0,
    totalDownloads:
      myDocuments?.reduce((sum, doc) => sum + (doc.downloads || 0), 0) || 0,
    totalRevenue:
      myDocuments?.reduce((sum, doc) => {
        if (doc.status === 'approved' && !doc.isFree) {
          return sum + (doc.downloads || 0) * doc.finalPrice;
        }
        return sum;
      }, 0) || 0,
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: {
        label: 'Đã duyệt',
        className: 'bg-green-100 text-green-700 border-green-200',
        icon: <CheckCircle className='w-3 h-3' />,
      },
      pending: {
        label: 'Chờ duyệt',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: <Clock className='w-3 h-3' />,
      },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.className}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  const DocumentCard = ({ document }) => (
    <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group'>
      <div className='relative'>
        <img
          src={document.thumbnail}
          alt={document.title}
          className='w-full h-48 object-cover rounded-t-2xl'
        />
        <div className='absolute top-3 right-3 flex items-center gap-2'>
          {getStatusBadge(document.status)}
        </div>

        {/* Price Badge */}
        <div className='absolute top-3 left-3'>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              document.isFree
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}
          >
            {document.price}
          </span>
        </div>

        {/* Discount Badge */}
        {document.discount > 0 && (
          <div className='absolute bottom-3 left-3'>
            <span className='px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium border border-red-200'>
              -{document.discount}%
            </span>
          </div>
        )}
      </div>

      <div className='p-5'>
        <div className='flex items-start justify-between mb-3'>
          <h3 className='text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight'>
            {document.title}
          </h3>
          <button className='p-1 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100'>
            <MoreVertical className='w-4 h-4 text-gray-500' />
          </button>
        </div>

        <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
          {document.description}
        </p>

        {/* Price Display */}
        {!document.isFree && (
          <div className='mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Giá bán</p>
                <div className='flex items-center gap-2'>
                  {document.discount > 0 ? (
                    <>
                      <span className='text-lg font-bold text-blue-600'>
                        {document.finalPrice.toLocaleString('vi-VN')} VND
                      </span>
                      <span className='text-sm text-gray-500 line-through'>
                        {document.originalPrice.toLocaleString('vi-VN')} VND
                      </span>
                    </>
                  ) : (
                    <span className='text-lg font-bold text-blue-600'>
                      {document.originalPrice.toLocaleString('vi-VN')} VND
                    </span>
                  )}
                </div>
              </div>
              <DollarSign className='w-6 h-6 text-blue-600' />
            </div>
          </div>
        )}

        {/* Duration Display */}
        {document.duration && (
          <div className='mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Thời lượng</p>
                <span className='text-lg font-bold text-purple-600'>
                  {document.duration}
                </span>
              </div>
              <Clock className='w-6 h-6 text-purple-600' />
            </div>
          </div>
        )}

        {/* Tags */}
        <div className='flex flex-wrap gap-1 mb-4'>
          {document.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className='px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs'
            >
              {tag}
            </span>
          ))}
          {document.tags.length > 3 && (
            <span className='px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs'>
              +{document.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
          <div className='flex items-center gap-4'>
            {document.rating > 0 && (
              <div className='flex items-center gap-1'>
                <Star className='w-4 h-4 text-yellow-400 fill-current' />
                <span>{document.rating}</span>
                {document.reviewCount && <span>({document.reviewCount})</span>}
              </div>
            )}

            <div className='flex items-center gap-1'>
              <Download className='w-4 h-4' />
              <span>{document.downloads}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Eye className='w-4 h-4' />
              <span>{document.views}</span>
            </div>

            {/* Revenue for seller */}
            {document.status === 'approved' && !document.isFree && (
              <div className='flex items-center gap-1 text-green-600 font-medium'>
                <TrendingUp className='w-3 h-3' />
                <span>
                  {(
                    (document.downloads || 0) * document.finalPrice
                  ).toLocaleString('vi-VN')}{' '}
                  VND
                </span>
              </div>
            )}
          </div>

          <div className='flex items-center gap-1 text-xs'>
            <FileText className='w-3 h-3' />
            <span>Tài liệu</span>
          </div>
        </div>

        {/* Actions */}
        <div className='flex items-center gap-2'>
          {document.status === 'approved' && (
            <button className='flex-1 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium'>
              Xem thống kê
            </button>
          )}
          {document.status === 'pending' && (
            <button className='flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium cursor-not-allowed'>
              Đang xử lý
            </button>
          )}
          <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'>
            <Edit className='w-4 h-4 text-gray-600' />
          </button>
        </div>

        {/* Additional info */}
        <div className='mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500'>
          <span>Đăng ngày {document.createdAt}</span>
          <span>Cập nhật {document.updatedAt}</span>
        </div>
      </div>
    </div>
  );

  const EmptyState = () => {
    return (
      <div className='text-center py-16'>
        <div className='flex justify-center mb-4'>
          <Share2 className='w-16 h-16 text-gray-300' />
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>
          Chưa có tài liệu nào được chia sẻ
        </h3>
        <p className='text-gray-600 mb-6 max-w-md mx-auto'>
          Bắt đầu chia sẻ kiến thức của bạn với cộng đồng và kiếm tiền từ tài
          liệu
        </p>
        <div className='flex justify-center'>
          <Link
            to={'/seller/create-documents'}
            className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium'
          >
            Bán tài liệu
          </Link>
        </div>
      </div>
    );
  };

  const filteredDocuments =
    myDocuments?.filter(
      (doc) =>
        (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === 'all' || doc.status === filterStatus)
    ) || [];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
              <div>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                  Tài liệu của tôi
                </h1>
                <p className='text-gray-600'>
                  Quản lý và theo dõi tài liệu đã chia sẻ, doanh thu và hiệu
                  suất
                </p>
              </div>

              <div className='flex justify-center'>
                <Link
                  to={'/seller/create-documents'}
                  className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium'
                >
                  <Plus className='w-4 h-4' />
                  Bán tài liệu
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8'>
              <div className='bg-white/70 rounded-xl p-4 text-center'>
                <div className='text-2xl font-bold text-blue-600'>
                  {stats.total}
                </div>
                <div className='text-sm text-gray-600'>Tổng tài liệu</div>
              </div>
              <div className='bg-white/70 rounded-xl p-4 text-center'>
                <div className='text-2xl font-bold text-green-600'>
                  {stats.approved}
                </div>
                <div className='text-sm text-gray-600'>Đã duyệt</div>
              </div>
              <div className='bg-white/70 rounded-xl p-4 text-center'>
                <div className='text-2xl font-bold text-yellow-600'>
                  {stats.pending}
                </div>
                <div className='text-sm text-gray-600'>Chờ duyệt</div>
              </div>
              <div className='bg-white/70 rounded-xl p-4 text-center'>
                <div className='text-2xl font-bold text-purple-600'>
                  {stats.totalDownloads}
                </div>
                <div className='text-sm text-gray-600'>Lượt tải</div>
              </div>
              <div className='bg-white/70 rounded-xl p-4 text-center'>
                <div className='text-2xl font-bold text-orange-600'>
                  {stats.totalRevenue.toLocaleString('vi-VN')}
                </div>
                <div className='text-sm text-gray-600'>Doanh thu (VND)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
            <div className='flex flex-col md:flex-row gap-4'>
              {/* Search */}
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Tìm kiếm tài liệu...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              >
                <option value='newest'>Mới nhất</option>
                <option value='oldest'>Cũ nhất</option>
                <option value='name'>Tên A-Z</option>
                <option value='downloads'>Lượt tải cao</option>
                <option value='rating'>Đánh giá cao</option>
                <option value='revenue'>Doanh thu cao</option>
              </select>

              {/* Filter by status */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className='px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              >
                <option value='all'>Tất cả trạng thái</option>
                <option value='approved'>Đã duyệt</option>
                <option value='pending'>Chờ duyệt</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents Grid/List */}
        <div className='min-h-[400px]'>
          {filteredDocuments.length === 0 ? (
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20'>
              <EmptyState />
            </div>
          ) : (
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {filteredDocuments.map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredDocuments.length > 0 && (
          <div className='text-center mt-8'>
            <button className='px-8 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-medium'>
              Xem thêm tài liệu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
