import React, { useState } from 'react';
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
  Grid3X3,
  List,
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
} from 'lucide-react';
import CreateDocModel from '../../components/common/customer/create-doc-model';

export default function CustomerMyDocument() {
  const [activeTab, setActiveTab] = useState('shared');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('newest');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const myDocuments = {
    shared: [
      {
        id: 1,
        title: 'Hướng dẫn React Hooks chi tiết',
        description:
          'Tài liệu hướng dẫn sử dụng React Hooks từ cơ bản đến nâng cao với các ví dụ thực tế',
        category: 'Lập trình',
        thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=react-hooks',
        createdAt: '2024-01-15',
        status: 'approved', // pending, approved, rejected
        downloads: 1247,
        views: 3892,
        rating: 4.8,
        reviewCount: 156,
        tags: ['React', 'JavaScript', 'Frontend'],
        fileSize: '2.5 MB',
        pages: 45,
      },
      {
        id: 2,
        title: 'Cấu trúc dữ liệu và giải thuật',
        description: 'Tổng hợp các cấu trúc dữ liệu và giải thuật quan trọng',
        category: 'Khoa học máy tính',
        thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=algorithm',
        createdAt: '2024-01-10',
        status: 'pending',
        downloads: 0,
        views: 0,
        rating: 0,
        reviewCount: 0,
        tags: ['Algorithm', 'Data Structure', 'Programming'],
        fileSize: '4.2 MB',
        pages: 78,
      },
      {
        id: 3,
        title: 'Thiết kế UI/UX hiện đại',
        description: 'Nguyên tắc và thực hành thiết kế giao diện người dùng',
        category: 'Thiết kế',
        thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=uiux',
        createdAt: '2024-01-05',
        status: 'rejected',
        downloads: 0,
        views: 0,
        rating: 0,
        reviewCount: 0,
        tags: ['UI/UX', 'Design', 'Figma'],
        fileSize: '6.8 MB',
        pages: 92,
        rejectionReason:
          'Nội dung chưa đủ chi tiết, cần bổ sung thêm ví dụ thực tế',
      },
    ],
    purchased: [
      {
        id: 4,
        title: 'Machine Learning với Python',
        author: 'Trần Văn A',
        description: 'Khóa học machine learning từ cơ bản đến nâng cao',
        category: 'AI & Machine Learning',
        thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=ml-python',
        purchasedAt: '2024-01-20',
        price: '299.000 VNĐ',
        rating: 4.9,
        progress: 75,
        lastAccessed: '2024-01-22',
        fileSize: '15.6 MB',
        pages: 234,
        tags: ['Python', 'ML', 'AI'],
      },
      {
        id: 5,
        title: 'Toán cao cấp cho kỹ sư',
        author: 'PGS. Nguyễn Thị B',
        description: 'Giáo trình toán cao cấp dành cho sinh viên kỹ thuật',
        category: 'Toán học',
        thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=advanced-math',
        purchasedAt: '2024-01-18',
        price: '199.000 VNĐ',
        rating: 4.7,
        progress: 45,
        lastAccessed: '2024-01-21',
        fileSize: '8.9 MB',
        pages: 156,
        tags: ['Toán học', 'Kỹ thuật', 'Giải tích'],
      },
    ],
    bookmarked: [
      {
        id: 6,
        title: 'JavaScript ES6+ Modern Features',
        author: 'Lê Văn C',
        description: 'Tìm hiểu các tính năng mới của JavaScript ES6+',
        category: 'Lập trình',
        thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=js-es6',
        bookmarkedAt: '2024-01-19',
        price: 'Miễn phí',
        rating: 4.6,
        downloads: 2156,
        views: 7892,
        tags: ['JavaScript', 'ES6', 'Modern JS'],
        fileSize: '3.4 MB',
        pages: 67,
      },
      {
        id: 7,
        title: 'Docker và Kubernetes',
        author: 'Phạm Minh D',
        description: 'Hướng dẫn triển khai ứng dụng với Docker và Kubernetes',
        category: 'DevOps',
        thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=docker-k8s',
        bookmarkedAt: '2024-01-17',
        price: '149.000 VNĐ',
        rating: 4.8,
        downloads: 1534,
        views: 4231,
        tags: ['Docker', 'Kubernetes', 'DevOps'],
        fileSize: '5.7 MB',
        pages: 123,
      },
    ],
  };

  const stats = {
    shared: myDocuments.shared.length,
    purchased: myDocuments.purchased.length,
    bookmarked: myDocuments.bookmarked.length,
    totalDownloads: myDocuments.shared.reduce(
      (sum, doc) => sum + doc.downloads,
      0
    ),
  };

  const tabs = [
    {
      id: 'shared',
      label: 'Đã chia sẻ',
      count: stats.shared,
      icon: <Share2 className='w-4 h-4' />,
      color: 'text-blue-600 border-blue-600',
    },
    {
      id: 'purchased',
      label: 'Đã mua',
      count: stats.purchased,
      icon: <ShoppingCart className='w-4 h-4' />,
      color: 'text-green-600 border-green-600',
    },
    {
      id: 'bookmarked',
      label: 'Đã lưu',
      count: stats.bookmarked,
      icon: <Bookmark className='w-4 h-4' />,
      color: 'text-purple-600 border-purple-600',
    },
  ];

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
      rejected: {
        label: 'Bị từ chối',
        className: 'bg-red-100 text-red-700 border-red-200',
        icon: <XCircle className='w-3 h-3' />,
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

  const DocumentCard = ({ document, type }) => (
    <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group'>
      <div className='relative'>
        <img
          src={document.thumbnail}
          alt={document.title}
          className='w-full h-48 object-cover rounded-t-2xl'
        />
        <div className='absolute top-3 right-3 flex items-center gap-2'>
          {type === 'shared' && getStatusBadge(document.status)}
          {type === 'purchased' && (
            <span className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium'>
              Đã mua
            </span>
          )}
          {type === 'bookmarked' && (
            <button className='p-1.5 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors'>
              <Heart className='w-4 h-4 text-red-500 fill-current' />
            </button>
          )}
        </div>

        {type === 'purchased' && document.progress > 0 && (
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
            <div className='flex items-center gap-2 text-white text-sm'>
              <span>Tiến độ: {document.progress}%</span>
              <div className='flex-1 bg-white/30 rounded-full h-2'>
                <div
                  className='bg-white h-2 rounded-full transition-all duration-300'
                  style={{ width: `${document.progress}%` }}
                />
              </div>
            </div>
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

        {document.author && (
          <p className='text-sm text-gray-600 mb-2'>bởi {document.author}</p>
        )}

        <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
          {document.description}
        </p>

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

            {type === 'shared' && (
              <>
                <div className='flex items-center gap-1'>
                  <Download className='w-4 h-4' />
                  <span>{document.downloads}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Eye className='w-4 h-4' />
                  <span>{document.views}</span>
                </div>
              </>
            )}

            {(type === 'purchased' || type === 'bookmarked') &&
              document.price && (
                <span
                  className={`font-medium ${
                    document.price === 'Miễn phí'
                      ? 'text-green-600'
                      : 'text-blue-600'
                  }`}
                >
                  {document.price}
                </span>
              )}
          </div>

          <div className='flex items-center gap-1 text-xs'>
            <FileText className='w-3 h-3' />
            <span>{document.pages} trang</span>
          </div>
        </div>

        {/* Actions */}
        <div className='flex items-center gap-2'>
          {type === 'shared' && (
            <>
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
              {document.status === 'rejected' && (
                <button className='flex-1 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium'>
                  Xem lý do
                </button>
              )}
              <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'>
                <Edit className='w-4 h-4 text-gray-600' />
              </button>
            </>
          )}

          {type === 'purchased' && (
            <>
              <button className='flex-1 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium'>
                Tiếp tục đọc
              </button>
              <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'>
                <Download className='w-4 h-4 text-gray-600' />
              </button>
            </>
          )}

          {type === 'bookmarked' && (
            <>
              <button className='flex-1 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium'>
                Xem chi tiết
              </button>
              <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'>
                <ExternalLink className='w-4 h-4 text-gray-600' />
              </button>
            </>
          )}
        </div>

        {/* Rejection reason */}
        {type === 'shared' &&
          document.status === 'rejected' &&
          document.rejectionReason && (
            <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
              <div className='flex items-start gap-2'>
                <AlertCircle className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                <div>
                  <p className='text-sm font-medium text-red-800'>
                    Lý do từ chối:
                  </p>
                  <p className='text-sm text-red-700 mt-1'>
                    {document.rejectionReason}
                  </p>
                </div>
              </div>
            </div>
          )}

        {/* Additional info */}
        <div className='mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500'>
          <span>
            {type === 'shared' && `Đăng ngày ${document.createdAt}`}
            {type === 'purchased' && `Mua ngày ${document.purchasedAt}`}
            {type === 'bookmarked' && `Lưu ngày ${document.bookmarkedAt}`}
          </span>
          <span>{document.fileSize}</span>
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ type }) => {
    const emptyStates = {
      shared: {
        icon: <Share2 className='w-16 h-16 text-gray-300' />,
        title: 'Chưa có tài liệu nào được chia sẻ',
        description: 'Bắt đầu chia sẻ kiến thức của bạn với cộng đồng',
        action: 'Chia sẻ tài liệu đầu tiên',
      },
      purchased: {
        icon: <ShoppingCart className='w-16 h-16 text-gray-300' />,
        title: 'Chưa mua tài liệu nào',
        description: 'Khám phá thư viện tài liệu phong phú của chúng tôi',
        action: 'Duyệt tài liệu',
      },
      bookmarked: {
        icon: <Bookmark className='w-16 h-16 text-gray-300' />,
        title: 'Chưa có tài liệu nào được lưu',
        description: 'Lưu các tài liệu yêu thích để đọc sau',
        action: 'Tìm tài liệu hay',
      },
    };

    const state = emptyStates[type];

    return (
      <div className='text-center py-16'>
        <div className='flex justify-center mb-4'>{state.icon}</div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>
          {state.title}
        </h3>
        <p className='text-gray-600 mb-6 max-w-md mx-auto'>
          {state.description}
        </p>
        <button className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium'>
          {state.action}
        </button>
      </div>
    );
  };

  const filteredDocuments =
    myDocuments[activeTab]?.filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase())
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
                  Quản lý và theo dõi tài liệu đã chia sẻ, mua và lưu trữ
                </p>
              </div>

              <div className='flex items-center gap-4'>
                <CreateDocModel />
                <div className='flex items-center gap-6 text-sm'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-blue-600'>
                      {stats.shared}
                    </div>
                    <div className='text-gray-600'>Đã chia sẻ</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-green-600'>
                      {stats.purchased}
                    </div>
                    <div className='text-gray-600'>Đã mua</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-purple-600'>
                      {stats.bookmarked}
                    </div>
                    <div className='text-gray-600'>Đã lưu</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-orange-600'>
                      {stats.totalDownloads}
                    </div>
                    <div className='text-gray-600'>Lượt tải</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20'>
            <div className='flex flex-wrap gap-1'>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-white shadow-lg ${tab.color} scale-105`
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === tab.id
                        ? 'bg-current text-white bg-opacity-20'
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

              {/* View Mode */}
              <div className='flex items-center gap-2 bg-gray-100 rounded-xl p-1'>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3X3 className='w-4 h-4' />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className='w-4 h-4' />
                </button>
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
              </select>

              {/* Filter by status (for shared documents) */}
              {activeTab === 'shared' && (
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className='px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                >
                  <option value='all'>Tất cả trạng thái</option>
                  <option value='approved'>Đã duyệt</option>
                  <option value='pending'>Chờ duyệt</option>
                  <option value='rejected'>Bị từ chối</option>
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Documents Grid/List */}
        <div className='min-h-[400px]'>
          {filteredDocuments.length === 0 ? (
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20'>
              <EmptyState type={activeTab} />
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredDocuments.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  type={activeTab}
                />
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
