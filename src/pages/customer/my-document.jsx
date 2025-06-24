import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Search,
  Download,
  Star,
  Bookmark,
  Share2,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  TrendingUp,
  ShoppingCart,
  AlertCircle,
} from 'lucide-react';
import CreateDocModel from '../../components/common/customer/create-doc-model';
import documentServices from '../../services/documentServices';
import { Link } from 'react-router';
import EmptyDocs from '../../components/common/EmptyDocs';
import { formatCurrency, formatDate } from '../../utils';

export default function CustomerMyDocument() {
  const [activeTab, setActiveTab] = useState('shared');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [myEnrolledDocuments, setMyEnrolledDocuments] = useState([]);
  const [mySharedDocuments, setMySharedDocuments] = useState([]);
  const [myPurchasedDocuments, setMyPurchasedDocuments] = useState([]);

  useEffect(() => {
    const fetchMyEnrolledDocuments = async () => {
      try {
        const response = await documentServices.getMyEnrolledDocuments();
        if (response.status) {
          const documents = response.data || [];
          setMyEnrolledDocuments(
            documents.filter((doc) => doc.isFree === true)
          );
          setMyPurchasedDocuments(
            documents.filter((doc) => doc.isFree === false)
          );
        }
      } catch {
        setMyEnrolledDocuments([]);
        setMyPurchasedDocuments([]);
      }
    };
    const fetchMySharedDocuments = async () => {
      try {
        const response = await documentServices.getMyDocuments();
        if (response.status) {
          setMySharedDocuments(response.data || []);
        }
      } catch {
        setMySharedDocuments([]);
      }
    };
    fetchMySharedDocuments();
    fetchMyEnrolledDocuments();
  }, []);

  const stats = {
    shared: mySharedDocuments?.length || 0,
    purchased: myPurchasedDocuments?.length || 0,
    enrolled: myEnrolledDocuments?.length || 0,
    totalDownloads: [
      ...(mySharedDocuments || []),
      ...(myPurchasedDocuments || []),
      ...(myEnrolledDocuments || []),
    ].reduce((sum, doc) => sum + (doc.download || 0), 0),
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
      id: 'enrolled',
      label: 'Đã đăng ký',
      count: stats.enrolled,
      icon: <Bookmark className='w-4 h-4' />,
      color: 'text-purple-600 border-purple-600',
    },
  ];

  // Helper function to get document data based on activeTab
  const getCurrentDocuments = () => {
    switch (activeTab) {
      case 'shared':
        return mySharedDocuments || [];
      case 'purchased':
        return myPurchasedDocuments || [];
      case 'enrolled':
        return myEnrolledDocuments || [];
      default:
        return [];
    }
  };

  const DocumentCard = ({ document, type }) => {
    const finalPrice =
      document.discount > 0
        ? document.price * (1 - document.discount / 100)
        : document.price;

    return (
      <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1'>
        {/* Document Thumbnail */}
        <div className='relative h-48 bg-gradient-to-br from-blue-100 to-purple-100'>
          <img
            src={document.imageUrls?.[0] || '/placeholder.jpg'}
            alt={document.title}
            className='w-full h-full object-cover'
          />

          {/* Status badges */}
          <div className='absolute top-3 left-3'>
            {type === 'shared' && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  document.status === 'APPROVED'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : document.status === 'PENDING'
                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {document.status === 'APPROVED' && (
                  <span className='inline-flex items-center gap-1'>
                    <CheckCircle className='w-3 h-3' />
                    Đã duyệt
                  </span>
                )}
                {document.status === 'PENDING' && (
                  <span className='inline-flex items-center gap-1'>
                    <Clock className='w-3 h-3' />
                    Chờ duyệt
                  </span>
                )}
                {document.status === 'REJECTED' && (
                  <span className='inline-flex items-center gap-1'>
                    <XCircle className='w-3 h-3' />
                    Bị từ chối
                  </span>
                )}
              </span>
            )}
            {type === 'purchased' && (
              <span className='bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200'>
                Đã mua
              </span>
            )}
            {type === 'enrolled' && (
              <span className='bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium border border-purple-200'>
                Đã đăng ký
              </span>
            )}
          </div>

          {/* Discount badge */}
          <div className='absolute top-3 right-3'>
            {document.discount > 0 && document.price > 0 && (
              <div className='bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                -{document.discount}%
              </div>
            )}
          </div>

          {/* Dropdown menu */}
          <div className='absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-sm bg-white/90 hover:bg-white'
              >
                <MoreVertical className='w-4 h-4' />
              </div>
              <ul
                tabIndex={0}
                className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
              >
                <li>
                  <a className='flex items-center gap-2'>
                    <Edit className='w-4 h-4' />
                    Chỉnh sửa
                  </a>
                </li>
                <li>
                  <a className='flex items-center gap-2 text-red-600'>
                    <Trash2 className='w-4 h-4' />
                    Xóa
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
        </div>

        {/* Document Info */}
        <div className='p-6'>
          {/* Price and Interests */}
          <div className='flex items-center justify-between mb-3'>
            <div className='flex gap-1'>
              {document.interests?.slice(0, 2).map((interest) => (
                <span
                  key={interest._id}
                  className='px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium flex items-center gap-1'
                >
                  <span>{interest.emoji}</span>
                  <span>{interest.name}</span>
                </span>
              ))}
            </div>
            <div className='text-right'>
              {document.price === 0 || document.isFree ? (
                <span className='text-emerald-600 font-bold text-lg'>
                  MIỄN PHÍ
                </span>
              ) : (
                <div className='flex flex-col items-end'>
                  {document.discount > 0 && (
                    <span className='text-gray-400 line-through text-xs'>
                      {formatCurrency(document.price)}
                    </span>
                  )}
                  <span className='text-blue-600 font-bold text-sm'>
                    {formatCurrency(finalPrice)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <Link
            to={`/customer/documents/${document._id}`}
            className='font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors'
          >
            {document.title}
          </Link>

          {/* Description */}
          <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
            {document.description}
          </p>

          {/* Stats */}
          <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
            <div className='flex items-center gap-1'>
              <Star className='w-4 h-4 text-yellow-400 fill-current' />
              <span>
                {document.feedback?.length > 0
                  ? (
                      document.feedback.reduce((sum, f) => sum + f.rating, 0) /
                      document.feedback.length
                    ).toFixed(1)
                  : '0.0'}
              </span>
              <span>({document.feedback?.length || 0})</span>
            </div>
            <div className='flex items-center gap-1'>
              <Download className='w-4 h-4' />
              <span>{document.download || 0}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Clock className='w-4 h-4' />
              <span>{formatDate(document.createdAt)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex items-center gap-2'>
            {type === 'shared' && (
              <>
                {document.status === 'APPROVED' && (
                  <button className='flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'>
                    <TrendingUp className='w-4 h-4' />
                    Xem thống kê
                  </button>
                )}
                {document.status === 'PENDING' && (
                  <button className='flex-1 bg-gray-200 text-gray-600 py-2 px-4 rounded-xl font-medium cursor-not-allowed'>
                    Đang xử lý
                  </button>
                )}
                {document.status === 'REJECTED' && (
                  <button className='flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105'>
                    Xem lý do
                  </button>
                )}
              </>
            )}
            {type === 'purchased' &&
              new Date(document.enrollmentDate) >
                new Date(Date.now() - 1000 * 60 * 60 * 24) && (
                <Link
                  to={`/customer/refunds-requests`}
                  className='flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'
                >
                  <AlertCircle className='w-4 h-4' />
                  Khiếu nại
                </Link>
              )}
            <>
              <Link
                to={`/customer/documents/${document._id}`}
                className='flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'
              >
                <BookOpen className='w-4 h-4' />
                Xem chi tiết
              </Link>
            </>
          </div>

          {/* Additional info */}
          <div className='mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500'>
            <span>
              {type === 'shared' &&
                `Đăng ngày ${formatDate(document.createdAt)}`}
              {type === 'purchased' &&
                `Mua ngày ${formatDate(document.enrollmentDate)}`}
              {type === 'enrolled' &&
                `Đăng ký ngày ${formatDate(document.enrollmentDate)}`}
            </span>
            <span className='flex items-center gap-1'>
              <span className='text-xs text-gray-500'>Thời lượng:</span>
              <span className='text-sm font-bold'>
                {document.duration ? `${document.duration}` : 'Chưa xác định'}
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Updated filtering logic
  const filteredDocuments = getCurrentDocuments().filter((doc) => {
    // Search term matching
    const matchesSearch = searchTerm
      ? doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.interests?.some((interest) =>
          interest.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    // Status filtering for shared documents
    const matchesStatus =
      activeTab !== 'shared' ||
      filterStatus === 'all' ||
      doc.status === filterStatus.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
              <div>
                <h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  Tài liệu của tôi 📚
                </h1>
                <p className='text-xl text-gray-600'>
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
                      {stats.enrolled}
                    </div>
                    <div className='text-gray-600'>Đã đăng ký</div>
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
                  className={`ml-3 flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
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

        {/* Search and Filter */}
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

              {/* Filter by status (only for shared tab) */}
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

        <div className='min-h-[400px]'>
          {/* Results Count */}
          <div className='mb-6 flex items-center justify-between'>
            <p className='text-gray-600'>
              Hiển thị {filteredDocuments.length} tài liệu
            </p>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20'>
              <EmptyDocs type={activeTab} />
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredDocuments.map((document) => (
                <DocumentCard
                  key={document._id}
                  document={document}
                  type={activeTab}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
