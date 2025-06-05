import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
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
  Bookmark,
  Sparkles,
  TrendingUp,
  Brain,
  Users,
  Tag,
  Share2,
  ExternalLink,
  Play,
  DollarSign,
  Gift,
} from 'lucide-react';
import CreateDocModel from '../../components/common/customer/create-doc-model';

export default function CustomerDocuments() {
  const [activeTab, setActiveTab] = useState('all'); // all, free, paid
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Mock data với tiếng Việt
  const categories = [
    'Lập trình',
    'Khoa học dữ liệu',
    'Toán học',
    'Vật lý',
    'Hóa học',
    'Sinh học',
    'Kinh doanh',
    'Thiết kế',
    'Ngoại ngữ',
    'Kỹ thuật',
  ];

  // AI Suggested Documents
  const aiSuggestions = [
    {
      id: 'ai-1',
      title: 'React Advanced Patterns - Được đề xuất cho bạn',
      author: 'Nguyễn Văn An',
      reason: 'Dựa trên sở thích React và JavaScript của bạn',
      isAI: true,
    },
    {
      id: 'ai-2',
      title: 'Machine Learning Thực Hành - Phù hợp với mức độ của bạn',
      author: 'Trần Thị Bình',
      reason: 'Tiếp tục hành trình học AI của bạn',
      isAI: true,
    },
  ];

  const documents = [
    {
      id: 1,
      title: 'Hướng dẫn React.js từ cơ bản đến nâng cao 2024',
      author: 'Nguyễn Văn An',
      authorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=an',
      category: 'Lập trình',
      rating: 4.8,
      reviews: 245,
      downloads: 1234,
      views: 5678,
      price: 0,
      originalPrice: 299000,
      discount: 100,
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=react-vn',
      tags: ['React', 'JavaScript', 'Frontend'],
      description:
        'Làm chủ React.js từ cơ bản đến nâng cao với các dự án thực tế và ví dụ trong thực tiễn.',
      level: 'Trung cấp',
      duration: '8 giờ',
      publishedAt: '2024-01-15',
      isFeatured: true,
      type: 'free',
      isNew: false,
      previewPages: 15,
      totalPages: 120,
      language: 'Tiếng Việt',
      lastUpdated: '2024-01-20',
    },
    {
      id: 2,
      title: 'Machine Learning cơ bản với Python',
      author: 'TS. Trần Minh Hoàng',
      authorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=hoang',
      category: 'Khoa học dữ liệu',
      rating: 4.9,
      reviews: 189,
      downloads: 2567,
      views: 8901,
      price: 199000,
      originalPrice: 399000,
      discount: 50,
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=ml-vn',
      tags: ['ML', 'Python', 'AI'],
      description:
        'Hướng dẫn toàn diện về thuật toán machine learning, tiền xử lý dữ liệu và đánh giá mô hình.',
      level: 'Nâng cao',
      duration: '12 giờ',
      publishedAt: '2024-01-10',
      isFeatured: true,
      type: 'paid',
      isNew: false,
      previewPages: 20,
      totalPages: 180,
      language: 'Tiếng Việt',
      lastUpdated: '2024-01-18',
    },
    {
      id: 3,
      title: 'Advanced Calculus Study Guide',
      author: 'Prof. Emma Wilson',
      category: 'Mathematics',
      rating: 4.7,
      reviews: 156,
      downloads: 890,
      views: 3456,
      price: 15.99,
      originalPrice: 19.99,
      discount: 20,
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=math',
      tags: ['Calculus', 'Math', 'Study Guide'],
      description:
        'Complete calculus reference with solved examples and practice problems.',
      level: 'Advanced',
      duration: '6 hours',
      publishedAt: '2024-01-08',
      isFeatured: false,
      type: 'paid',
    },
    {
      id: 4,
      title: 'JavaScript ES6+ Complete Course',
      author: 'John Doe',
      category: 'Programming',
      rating: 4.6,
      reviews: 312,
      downloads: 1890,
      views: 7234,
      price: 0,
      originalPrice: 39.99,
      discount: 100,
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=js',
      tags: ['JavaScript', 'ES6', 'Programming'],
      description:
        'Modern JavaScript features and best practices for web development.',
      level: 'Beginner',
      duration: '10 hours',
      publishedAt: '2024-01-05',
      isFeatured: false,
      type: 'free',
    },
    {
      id: 5,
      title: 'Data Structures & Algorithms',
      author: 'Alex Thompson',
      category: 'Programming',
      rating: 4.8,
      reviews: 278,
      downloads: 1567,
      views: 6789,
      price: 19.99,
      originalPrice: 29.99,
      discount: 33,
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=dsa',
      tags: ['DSA', 'Algorithms', 'Computer Science'],
      description:
        'Essential data structures and algorithms with implementation examples.',
      level: 'Intermediate',
      duration: '15 hours',
      publishedAt: '2024-01-12',
      isFeatured: true,
      type: 'paid',
    },
    {
      id: 6,
      title: 'Introduction to Python Programming',
      author: 'Maria Garcia',
      category: 'Programming',
      rating: 4.5,
      reviews: 467,
      downloads: 3245,
      views: 9876,
      price: 0,
      originalPrice: 24.99,
      discount: 100,
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=python',
      tags: ['Python', 'Programming', 'Beginner'],
      description:
        'Learn Python programming from scratch with hands-on exercises.',
      level: 'Beginner',
      duration: '8 hours',
      publishedAt: '2024-01-20',
      isFeatured: false,
      type: 'free',
    },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesTab = activeTab === 'all' || doc.type === activeTab;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesRating =
      selectedRating === 'all' || doc.rating >= parseFloat(selectedRating);
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
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      case 'oldest':
        return new Date(a.publishedAt) - new Date(b.publishedAt);
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

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
            <div className='bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6'>
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
                        <Brain className='w-6 h-6 text-white' />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-semibold text-gray-900 text-sm'>
                          {suggestion.title}
                        </h3>
                        <p className='text-xs text-gray-600'>
                          bởi {suggestion.author}
                        </p>
                        <p className='text-xs text-purple-600 mt-1 flex items-center gap-1'>
                          <Sparkles className='w-3 h-3' />
                          {suggestion.reason}
                        </p>
                      </div>
                      <button className='px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300'>
                        Xem
                      </button>
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
                <option value='rating'>Đánh giá cao nhất</option>
                <option value='downloads'>Tải nhiều nhất</option>
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
                Tất cả ({documents.length})
              </button>
              <button
                onClick={() => setActiveTab('free')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'free'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Miễn phí ({documents.filter((d) => d.type === 'free').length})
              </button>
              <button
                onClick={() => setActiveTab('paid')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'paid'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Trả phí ({documents.filter((d) => d.type === 'paid').length})
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

              {/* Rating Filter */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Đánh giá tối thiểu
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className='w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all'>Bất kỳ</option>
                  <option value='4.5'>4.5+ sao</option>
                  <option value='4.0'>4.0+ sao</option>
                  <option value='3.5'>3.5+ sao</option>
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
                {documents.length} tài liệu
              </p>
            </div>

            {/* Documents Display */}
            {viewMode === 'grid' ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {sortedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1'
                  >
                    {/* Document Thumbnail */}
                    <div className='relative h-48 bg-gradient-to-br from-blue-100 to-purple-100'>
                      <img
                        src={doc.thumbnail}
                        alt={doc.title}
                        className='w-full h-full object-cover'
                      />
                      {doc.isFeatured && (
                        <div className='absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1'>
                          <Award className='w-3 h-3' />
                          Nổi bật
                        </div>
                      )}
                      {doc.discount > 0 && doc.price > 0 && (
                        <div className='absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                          -{doc.discount}%
                        </div>
                      )}
                      <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
                    </div>

                    {/* Document Info */}
                    <div className='p-6'>
                      {/* Price and Category */}
                      <div className='flex items-center justify-between mb-3'>
                        <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium'>
                          {doc.category}
                        </span>
                        <div className='text-right'>
                          {doc.price === 0 ? (
                            <span className='text-emerald-600 font-bold text-lg'>
                              MIỄN PHÍ
                            </span>
                          ) : (
                            <div className='flex flex-col items-end'>
                              {doc.originalPrice > doc.price && (
                                <span className='text-gray-400 line-through text-xs'>
                                  {doc.originalPrice.toLocaleString('vi-VN')}{' '}
                                  VNĐ
                                </span>
                              )}
                              <span className='text-blue-600 font-bold text-sm'>
                                {doc.price.toLocaleString('vi-VN')} VNĐ
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Title and Author */}
                      <h3 className='font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors'>
                        {doc.title}
                      </h3>
                      <p className='text-gray-600 text-sm mb-3'>
                        bởi {doc.author}
                      </p>

                      {/* Description */}
                      <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                        {doc.description}
                      </p>

                      {/* Stats */}
                      <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
                        <div className='flex items-center gap-1'>
                          <Star className='w-4 h-4 text-yellow-400 fill-current' />
                          <span>{doc.rating}</span>
                          <span>({doc.reviews})</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Download className='w-4 h-4' />
                          <span>{doc.downloads}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='w-4 h-4' />
                          <span>{doc.duration}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className='flex gap-2 mb-4'>
                        {doc.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className='px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className='flex items-center gap-2'>
                        <button className='flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105'>
                          {doc.price === 0 ? 'Tải miễn phí' : 'Mua ngay'}
                        </button>
                        <button className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200'>
                          <Heart className='w-5 h-5' />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className='space-y-4'>
                {sortedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group'
                  >
                    <div className='flex items-start gap-4'>
                      <img
                        src={doc.thumbnail}
                        alt={doc.title}
                        className='w-20 h-20 rounded-xl object-cover'
                      />
                      <div className='flex-1'>
                        <div className='flex items-start justify-between mb-2'>
                          <div>
                            <h3 className='font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors'>
                              {doc.title}
                            </h3>
                            <p className='text-gray-600 text-sm'>
                              by {doc.author}
                            </p>
                          </div>
                          <div className='text-right'>
                            {doc.price === 0 ? (
                              <span className='text-emerald-600 font-bold text-lg'>
                                FREE
                              </span>
                            ) : (
                              <div className='flex items-center gap-2'>
                                {doc.originalPrice > doc.price && (
                                  <span className='text-gray-400 line-through text-sm'>
                                    ${doc.originalPrice}
                                  </span>
                                )}
                                <span className='text-blue-600 font-bold text-lg'>
                                  ${doc.price}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className='text-gray-600 text-sm mb-3'>
                          {doc.description}
                        </p>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-4 text-sm text-gray-500'>
                            <div className='flex items-center gap-1'>
                              <Star className='w-4 h-4 text-yellow-400 fill-current' />
                              <span>
                                {doc.rating} ({doc.reviews})
                              </span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <Download className='w-4 h-4' />
                              <span>{doc.downloads}</span>
                            </div>
                            <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs'>
                              {doc.category}
                            </span>
                          </div>
                          <button className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-6 rounded-xl font-medium transition-all duration-300'>
                            {doc.price === 0 ? 'Download' : 'Buy Now'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {sortedDocuments.length === 0 && (
              <div className='text-center py-12'>
                <BookOpen className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                <h3 className='text-xl font-medium text-gray-900 mb-2'>
                  No documents found
                </h3>
                <p className='text-gray-600 mb-4'>
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedRating('all');
                    setPriceRange('all');
                    setActiveTab('all');
                  }}
                  className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300'
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
