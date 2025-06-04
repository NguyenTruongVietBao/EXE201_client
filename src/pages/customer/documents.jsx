import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  Download,
  Eye,
  Heart,
  BookOpen,
  Calendar,
  User,
  ArrowUpDown,
  Grid3X3,
  List,
  ChevronDown,
  X,
  DollarSign,
  Clock,
  Award,
  TrendingUp,
} from 'lucide-react';

export default function CustomerDocuments() {
  const [activeTab, setActiveTab] = useState('all'); // all, free, paid
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Mock data
  const categories = [
    'Programming',
    'Data Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Business',
    'Design',
  ];

  const documents = [
    {
      id: 1,
      title: 'Complete React.js Guide 2024',
      author: 'Sarah Johnson',
      category: 'Programming',
      rating: 4.8,
      reviews: 245,
      downloads: 1234,
      views: 5678,
      price: 0,
      originalPrice: 29.99,
      discount: 100,
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=react',
      tags: ['React', 'JavaScript', 'Frontend'],
      description:
        'Master React.js from basics to advanced concepts with practical projects and real-world examples.',
      level: 'Intermediate',
      duration: '8 hours',
      publishedAt: '2024-01-15',
      isFeatured: true,
      type: 'free',
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      author: 'Dr. Michael Chen',
      category: 'Data Science',
      rating: 4.9,
      reviews: 189,
      downloads: 2567,
      views: 8901,
      price: 24.99,
      originalPrice: 49.99,
      discount: 50,
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=ml',
      tags: ['ML', 'Python', 'AI'],
      description:
        'Comprehensive guide to machine learning algorithms, data preprocessing, and model evaluation.',
      level: 'Advanced',
      duration: '12 hours',
      publishedAt: '2024-01-10',
      isFeatured: true,
      type: 'paid',
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
      (priceRange === 'under20' && doc.price > 0 && doc.price < 20) ||
      (priceRange === 'over20' && doc.price >= 20);

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
    <div className='min-h-screen '>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            Document Library 📚
          </h1>
          <p className='text-xl text-gray-600 mb-6'>
            Discover high-quality learning materials from our community
          </p>

          {/* Search and Filters */}
          <div className='flex flex-col lg:flex-row gap-4 mb-6'>
            {/* Search Bar */}
            <div className='flex-1 relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='w-5 h-5 text-gray-400' />
              </div>
              <input
                type='search'
                placeholder='Search documents, authors, or tags...'
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
              Filters
              {showFilters && <X className='w-4 h-4' />}
            </button>

            {/* Sort Dropdown */}
            <div className='relative'>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='newest'>Newest First</option>
                <option value='oldest'>Oldest First</option>
                <option value='rating'>Highest Rated</option>
                <option value='downloads'>Most Downloaded</option>
                <option value='price-low'>Price: Low to High</option>
                <option value='price-high'>Price: High to Low</option>
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
          <div className='flex space-x-1 bg-white p-1 rounded-xl border border-gray-200 w-fit'>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              All Documents ({documents.length})
            </button>
            <button
              onClick={() => setActiveTab('free')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'free'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Free ({documents.filter((d) => d.type === 'free').length})
            </button>
            <button
              onClick={() => setActiveTab('paid')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'paid'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Premium ({documents.filter((d) => d.type === 'paid').length})
            </button>
          </div>
        </div>

        <div className='flex gap-8'>
          {/* Filters Sidebar */}
          {showFilters && (
            <div className='w-64 bg-white rounded-2xl p-6 shadow-lg h-fit sticky top-8'>
              <h3 className='font-bold text-gray-900 mb-4'>Filters</h3>

              {/* Category Filter */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className='w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all'>All Categories</option>
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
                  Minimum Rating
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className='w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all'>Any Rating</option>
                  <option value='4.5'>4.5+ Stars</option>
                  <option value='4.0'>4.0+ Stars</option>
                  <option value='3.5'>3.5+ Stars</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className='w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all'>Any Price</option>
                  <option value='free'>Free</option>
                  <option value='under20'>Under $20</option>
                  <option value='over20'>$20 and above</option>
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
                Clear All Filters
              </button>
            </div>
          )}

          {/* Documents Grid/List */}
          <div className='flex-1'>
            {/* Results Count */}
            <div className='flex items-center justify-between mb-6'>
              <p className='text-gray-600'>
                Showing {sortedDocuments.length} of {documents.length} documents
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
                          Featured
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

                      {/* Title and Author */}
                      <h3 className='font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors'>
                        {doc.title}
                      </h3>
                      <p className='text-gray-600 text-sm mb-3'>
                        by {doc.author}
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
                          {doc.price === 0 ? 'Download Free' : 'Buy Now'}
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
