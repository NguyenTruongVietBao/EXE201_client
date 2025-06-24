import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Heart,
  BookOpen,
  Grid3X3,
  List,
  ChevronDown,
  X,
  Clock,
  Award,
  Eye,
  Sparkles,
  Brain,
  Users,
  DollarSign,
  Edit,
  Trash2,
  MoreVertical,
  Target,
  AwardIcon,
  CheckCircle,
} from 'lucide-react';
import CreateDocModel from '../../components/common/customer/create-doc-model';
import interestServices from '../../services/interestServices';
import { Link } from 'react-router';
import customerService from '../../services/customerService';
import { formatCurrency, formatDate } from '../../utils';

export default function CustomerDocuments() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [enrolledDocuments, setEnrolledDocuments] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [priorityDocuments, setPriorityDocuments] = useState([]);

  useEffect(() => {
    const fetchPriorityDocuments = async () => {
      const response = await interestServices.getPrioriryDocuments();
      setPriorityDocuments(response.data || []);
    };
    const fetchEnrolledDocuments = async () => {
      const response = await customerService.getMyEnrolledDocuments();
      setEnrolledDocuments(response.data || []);
    };
    fetchPriorityDocuments();
    fetchEnrolledDocuments();
  }, []);

  // Tạo danh sách categories từ documents thật
  const categories = [
    ...new Set(
      priorityDocuments.flatMap(
        (doc) => doc.interests?.map((interest) => interest.name) || []
      )
    ),
  ];

  // AI Suggested Documents từ 2 documents đầu tiên
  const aiSuggestions = priorityDocuments.slice(0, 2).map((doc, index) => ({
    id: `ai-${index + 1}`,
    title: `${doc.title} - Được đề xuất cho bạn`,
    author: doc.author?.name || 'Tác giả ẩn danh',
    reason: `${doc.matchPercentage}% phù hợp - Cùng ${doc.sharedInterestsCount} sở thích`,
    isAI: true,
    documentId: doc._id,
    image: doc.imageUrls[0],
    matchPercentage: doc.matchPercentage || 0,
  }));

  const filteredDocuments = priorityDocuments.filter((doc) => {
    const docType = doc.price === 0 ? 'free' : 'paid';
    const matchesTab = activeTab === 'all' || docType === activeTab;
    const matchesSearch =
      doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.author?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.interests?.some((interest) =>
        interest.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === 'all' ||
      doc.interests?.some((interest) => interest.name === selectedCategory);
    const matchesRating =
      selectedRating === 'all' ||
      (doc.matchPercentage || 0) >= parseFloat(selectedRating);
    const matchesPrice =
      priceRange === 'all' ||
      (priceRange === 'free' && doc.price === 0) ||
      (priceRange === 'under200k' && doc.price > 0 && doc.price < 200000) ||
      (priceRange === 'over200k' && doc.price >= 200000);

    return (
      matchesTab &&
      matchesSearch &&
      matchesCategory &&
      matchesRating &&
      matchesPrice
    );
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'match':
        return (b.matchPercentage || 0) - (a.matchPercentage || 0);
      case 'popularity':
        return (b.sharedInterestsCount || 0) - (a.sharedInterestsCount || 0);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Helper function to get match percentage color
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-blue-600 bg-blue-100';
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 mb-8'>
            <h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Thư viện tài liệu 📚
            </h1>
            <p className='text-xl text-gray-600 mb-6'>
              Khám phá tài liệu học tập chất lượng cao từ cộng đồng của chúng
              tôi
            </p>

            {/* AI Suggestions */}
            <div className='bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 '>
              <div className='flex items-center gap-3 mb-4'>
                <div className='flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full'>
                  <Sparkles className='w-5 h-5' />
                  <span className='font-semibold'>Gợi ý từ AI</span>
                </div>
                <p className='text-purple-700'>
                  Được cá nhân hóa dành riêng cho bạn
                </p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {aiSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className='bg-white/80 rounded-xl p-4 hover:bg-white transition-all duration-300'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center'>
                        <div className='relative'>
                          <img
                            src={suggestion.image}
                            alt={suggestion.title}
                            className='w-12 h-12 rounded-xl'
                          />
                          <div className='absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1'>
                            <Brain className='w-3 h-3 text-white' />
                          </div>
                        </div>
                      </div>

                      <div className='flex-1'>
                        <h3 className='font-semibold text-gray-900 text-sm'>
                          {suggestion.title}
                        </h3>
                        <p className='text-xs text-gray-600'>
                          bởi {suggestion.author}
                        </p>
                        <div className='flex items-center gap-2 mt-1'>
                          <p className='text-xs text-purple-600 flex items-center gap-1'>
                            <Sparkles className='w-3 h-3' />
                            {suggestion.reason}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/customer/documents/${suggestion.documentId}`}
                        className='px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300'
                      >
                        Xem
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className='flex flex-col lg:flex-row gap-4 mb-6'>
            {/* Search Bar */}
            <div className='flex-1 relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='w-5 h-5 text-gray-400' />
              </div>
              <input
                type='search'
                placeholder='Tìm kiếm tài liệu, tác giả, hoặc thẻ...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className='px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2'
            >
              <Filter className='w-5 h-5' />
              Bộ lọc
              {showFilters && <X className='w-4 h-4' />}
            </button>

            {/* Sort Dropdown */}
            <div className='relative'>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='newest'>Mới nhất</option>
                <option value='oldest'>Cũ nhất</option>
                <option value='match'>Phù hợp nhất</option>
                <option value='popularity'>Phổ biến nhất</option>
                <option value='price-low'>Giá: Thấp đến cao</option>
                <option value='price-high'>Giá: Cao đến thấp</option>
              </select>
              <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
            </div>

            {/* View Mode Toggle */}
            <div className='flex bg-white border border-gray-200 rounded-xl p-1'>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className='w-5 h-5' />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className='w-5 h-5' />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className='flex justify-between w-full'>
            <div className='flex space-x-1 bg-white p-1 rounded-xl border border-gray-200 w-fit'>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Tất cả ({priorityDocuments.length})
              </button>
              <button
                onClick={() => setActiveTab('free')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'free'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Miễn phí (
                {priorityDocuments.filter((d) => d.price === 0).length})
              </button>
              <button
                onClick={() => setActiveTab('paid')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'paid'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Trả phí ({priorityDocuments.filter((d) => d.price > 0).length})
              </button>
            </div>
            <CreateDocModel />
          </div>
        </div>

        <div className='flex gap-8'>
          {/* Filters Sidebar */}
          {showFilters && (
            <div className='w-64 bg-white rounded-2xl p-6 shadow-lg h-fit sticky top-8'>
              <h3 className='font-bold text-gray-900 mb-4'>Bộ lọc</h3>

              {/* Category Filter */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Danh mục
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className='w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all'>Tất cả danh mục</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Match Percentage Filter */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Độ phù hợp tối thiểu
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className='w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all'>Bất kỳ</option>
                  <option value='80'>80%+ phù hợp</option>
                  <option value='60'>60%+ phù hợp</option>
                  <option value='40'>40%+ phù hợp</option>
                  <option value='20'>20%+ phù hợp</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Khoảng giá
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className='w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all'>Bất kỳ</option>
                  <option value='free'>Miễn phí</option>
                  <option value='under200k'>Dưới 200.000 VNĐ</option>
                  <option value='over200k'>Từ 200.000 VNĐ</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedRating('all');
                  setPriceRange('all');
                  setSearchQuery('');
                }}
                className='w-full py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200'
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}

          {/* Documents Grid/List */}
          <div className='flex-1'>
            {/* Results Count */}
            <div className='flex items-center justify-between mb-6'>
              <p className='text-gray-600'>
                Hiển thị {sortedDocuments.length} trong tổng số{' '}
                {priorityDocuments.length} tài liệu
              </p>
            </div>

            {/* Documents Display */}
            {viewMode === 'grid' ? (
              // Grid View
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {sortedDocuments.map((doc) => {
                  const finalPrice =
                    doc.discount > 0
                      ? doc.price * (1 - doc.discount / 100)
                      : doc.price;

                  return (
                    <div
                      key={doc._id}
                      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 `}
                    >
                      {/* Document Thumbnail */}
                      <div className='relative h-48 bg-gradient-to-br from-blue-100 to-purple-100'>
                        <img
                          src={
                            doc.imageUrls?.[0] ||
                            'https://api.dicebear.com/9.x/shapes/svg?seed=default'
                          }
                          alt={doc.title}
                          className='w-full h-full object-cover'
                        />
                        {doc.price === 0 ||
                          (enrolledDocuments.some((d) => d._id === doc._id) && (
                            <div className='absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1'>
                              <Edit className='w-3 h-3' />
                              Đã thanh toán
                            </div>
                          ))}
                        {doc.price > 0 &&
                          !enrolledDocuments.some((d) => d._id === doc._id) &&
                          doc.sharedInterestsCount > 3 && (
                            <div className='absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1'>
                              <Award className='w-3 h-3' />
                              Nổi bật
                            </div>
                          )}
                        {doc.matchPercentage > 0 && (
                          <div
                            className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${getMatchColor(
                              doc.matchPercentage
                            )}`}
                          >
                            <Target className='w-3 h-3 inline mr-1' />
                            {doc.matchPercentage}%
                          </div>
                        )}
                        {doc.discount > 0 && doc.price > 0 && (
                          <div className='absolute bottom-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                            -{doc.discount}%
                          </div>
                        )}

                        <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
                      </div>

                      {/* Document Info */}
                      <div className='p-6'>
                        {/* Price and Interests */}
                        <div className='flex items-center justify-between mb-3'>
                          <div className='flex gap-1'>
                            {doc.interests?.slice(0, 2).map((interest) => (
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
                            {doc.price === 0 ? (
                              <span className='text-emerald-600 font-bold text-lg'>
                                MIỄN PHÍ
                              </span>
                            ) : (
                              <div className='flex flex-col items-end'>
                                {doc.discount > 0 && (
                                  <span className='text-gray-400 line-through text-xs'>
                                    {formatCurrency(doc.price)}
                                  </span>
                                )}
                                <span className='text-blue-600 font-bold text-sm'>
                                  {formatCurrency(finalPrice)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Title and Author */}
                        <Link
                          to={`/customer/documents/${doc._id}`}
                          className='font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors block'
                        >
                          {doc.title}
                        </Link>
                        <div className='flex items-center gap-2 mb-3'>
                          <img
                            src={
                              doc.author?.avatar ||
                              'https://api.dicebear.com/9.x/initials/svg?seed=default'
                            }
                            alt={doc.author?.name}
                            className='w-6 h-6 rounded-full'
                          />
                          <p className='text-gray-600 text-sm'>
                            bởi {doc.author?.name}
                          </p>
                        </div>
                        {/* Description */}
                        <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                          {doc.description}
                        </p>
                        {/* Stats */}
                        <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
                          {doc.matchPercentage > 0 && (
                            <div
                              className={`flex items-center gap-1 px-2 py-1 rounded-lg ${getMatchColor(
                                doc.matchPercentage
                              )}`}
                            >
                              <Target className='w-4 h-4' />
                              <span>{doc.matchPercentage}%</span>
                            </div>
                          )}
                          <div className='flex items-center gap-1'>
                            <Users className='w-4 h-4' />
                            <span>{doc.sharedInterestsCount || 0}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-4 h-4' />
                            <span>{formatDate(doc.createdAt)}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex items-center gap-2'>
                          {enrolledDocuments.some((d) => d._id === doc._id) ? (
                            // Đã đăng ký - hiển thị nút xem chi tiết
                            <>
                              <Link
                                to={`/customer/documents/${doc._id}`}
                                className='flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'
                              >
                                <CheckCircle className='w-4 h-4' />
                                Đã đăng ký
                              </Link>
                              <button className='p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-xl transition-colors duration-200'>
                                <Download className='w-5 h-5' />
                              </button>
                            </>
                          ) : doc.price === 0 ? (
                            // Khóa miễn phí chưa đăng ký - nút tham gia ngay
                            <Link
                              to={`/customer/documents/${doc._id}`}
                              className='flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'
                            >
                              <AwardIcon className='w-4 h-4' />
                              Đăng ký ngay
                            </Link>
                          ) : (
                            // Khóa trả phí chưa mua - nút mua ngay
                            <Link
                              to={`/customer/documents/${doc._id}`}
                              className='flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'
                            >
                              <DollarSign className='w-4 h-4' />
                              Mua tài liệu
                            </Link>
                          )}
                          <button className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200'>
                            <Heart className='w-5 h-5' />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // List View
              <div className='space-y-4'>
                {sortedDocuments.map((doc) => {
                  const finalPrice =
                    doc.discount > 0
                      ? doc.price * (1 - doc.discount / 100)
                      : doc.price;

                  return (
                    <div
                      key={doc._id}
                      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group `}
                    >
                      <div className='flex items-start gap-4'>
                        <div className='relative'>
                          <img
                            src={
                              doc.imageUrls?.[0] ||
                              'https://api.dicebear.com/9.x/shapes/svg?seed=default'
                            }
                            alt={doc.title}
                            className='w-20 h-20 rounded-xl object-cover'
                          />
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-start justify-between mb-2'>
                            <div className='flex-1'>
                              <div className='flex items-center gap-2 mb-1'>
                                <h3 className='font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors'>
                                  {doc.title}
                                </h3>
                                {doc.matchPercentage > 0 && (
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${getMatchColor(
                                      doc.matchPercentage
                                    )}`}
                                  >
                                    {doc.matchPercentage}% phù hợp
                                  </span>
                                )}
                              </div>
                              <div className='flex items-center gap-2'>
                                <img
                                  src={
                                    doc.author?.avatar ||
                                    'https://api.dicebear.com/9.x/initials/svg?seed=default'
                                  }
                                  alt={doc.author?.name}
                                  className='w-4 h-4 rounded-full'
                                />
                                <p className='text-gray-600 text-sm'>
                                  bởi {doc.author?.name}
                                </p>
                              </div>
                            </div>
                            <div className='flex items-center gap-2'>
                              <div className='text-right'>
                                {doc.price === 0 ? (
                                  <span className='text-emerald-600 font-bold text-lg'>
                                    MIỄN PHÍ
                                  </span>
                                ) : (
                                  <div className='flex items-center gap-2'>
                                    {doc.discount > 0 && (
                                      <span className='text-gray-400 line-through text-sm'>
                                        {formatCurrency(doc.price)}
                                      </span>
                                    )}
                                    <span className='text-blue-600 font-bold text-lg'>
                                      {formatCurrency(finalPrice)}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className='dropdown dropdown-end'>
                                <div
                                  tabIndex={0}
                                  role='button'
                                  className='btn btn-ghost btn-sm'
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
                          </div>
                          <p className='text-gray-600 text-sm mb-3'>
                            {doc.description}
                          </p>
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4 text-sm text-gray-500'>
                              <div className='flex items-center gap-1'>
                                <Users className='w-4 h-4' />
                                <span>{doc.sharedInterestsCount || 0}</span>
                              </div>
                              <div className='flex gap-1'>
                                {doc.interests?.slice(0, 2).map((interest) => (
                                  <span
                                    key={interest._id}
                                    className='px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs flex items-center gap-1'
                                  >
                                    <span>{interest.emoji}</span>
                                    <span>{interest.name}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                            <button className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-6 rounded-xl font-medium transition-all duration-300 flex items-center gap-2'>
                              {enrolledDocuments.some(
                                (d) => d._id === doc._id
                              ) ? (
                                // Đã đăng ký - hiển thị nút xem chi tiết
                                <>
                                  <Eye className='w-4 h-4' />
                                  Xem chi tiết
                                </>
                              ) : doc.price === 0 ? (
                                // Khóa miễn phí chưa đăng ký - nút tham gia ngay
                                <>
                                  <AwardIcon className='w-4 h-4' />
                                  Tham gia ngay
                                </>
                              ) : (
                                // Khóa trả phí chưa mua - nút mua ngay
                                <>
                                  <DollarSign className='w-4 h-4' />
                                  Mua ngay
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Empty State */}
            {sortedDocuments.length === 0 && (
              <div className='text-center py-12'>
                <BookOpen className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                <h3 className='text-xl font-medium text-gray-900 mb-2'>
                  Không tìm thấy tài liệu nào
                </h3>
                <p className='text-gray-600 mb-4'>
                  Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc của bạn
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedRating('all');
                    setPriceRange('all');
                    setActiveTab('all');
                  }}
                  className='rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-600'
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
