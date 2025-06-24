import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  Download,
  Gift,
  Heart,
  Mail,
  MessageCircle,
  Search,
  Share2,
  Star,
  Users,
  X,
} from 'lucide-react';
import documentServices from '../../services/documentServices';
import useAuthStore from '../../stores/useAuthStore';
import { formatCurrency, formatDate } from '../../utils';
import LoadingPage from '../../components/common/LoadingPage';

export default function CustomerDocumentsAuthor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [documents, setDocuments] = useState([]);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [enrollmentFilter, setEnrollmentFilter] = useState('all');
  const [isFollowing, setIsFollowing] = useState(false);
  const [enrolledDocuments, setEnrolledDocuments] = useState([]);

  useEffect(() => {
    const fetchEnrolledDocuments = async () => {
      const response = await documentServices.getMyEnrolledDocuments();
      setEnrolledDocuments(response.data || []);
    };
    fetchEnrolledDocuments();
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await documentServices.getDocumentsByAuthor(id);
        setDocuments(response.data.documents || []);
        setAuthor(response.data.author);
      } catch (err) {
        setError(err);
        console.error('Error fetching author documents:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [id]);

  const isMyProfile = () => {
    if (!user || !author) return false;
    return (
      user._id === author._id ||
      user.email === author.email ||
      user.name === author.name
    );
  };

  const handleDownloadDocument = async (doc) => {
    try {
      if (doc.price === 0) {
        // Handle free download
        console.log('Downloading free document:', doc._id);
        // Add your download logic here
      } else {
        // Handle purchase
        console.log('Purchasing document:', doc._id);
        // Add your purchase logic here
      }
    } catch (error) {
      console.error('Error handling document action:', error);
    }
  };

  // Flatten enrolled documents for easier comparison
  const flatEnrolledDocuments = enrolledDocuments.flat();

  // Check if document is enrolled
  const isDocumentEnrolled = (docId) => {
    return flatEnrolledDocuments.some((doc) => doc._id === docId);
  };

  // Categorize documents based on enrollment status
  const categorizeDocuments = () => {
    const enrolled = [];
    const notEnrolled = [];

    documents.forEach((doc) => {
      if (isDocumentEnrolled(doc._id)) {
        enrolled.push(doc);
      } else {
        notEnrolled.push(doc);
      }
    });

    return { enrolled, notEnrolled };
  };

  const { enrolled: enrolledDocs, notEnrolled: notEnrolledDocs } =
    categorizeDocuments();

  // Filter documents based on search, price, and enrollment status
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.interests?.some((interest) =>
        interest.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'free' && doc.price === 0) ||
      (priceFilter === 'paid' && doc.price > 0);
    const matchesEnrollment =
      enrollmentFilter === 'all' ||
      (enrollmentFilter === 'enrolled' && isDocumentEnrolled(doc._id)) ||
      (enrollmentFilter === 'not-enrolled' && !isDocumentEnrolled(doc._id));

    return matchesSearch && matchesPrice && matchesEnrollment;
  });

  // Calculate comprehensive statistics
  const stats = {
    totalDocuments: documents.length,
    enrolledDocuments: enrolledDocs.length,
    notEnrolledDocuments: notEnrolledDocs.length,
    freeDocuments: documents.filter((doc) => doc.price === 0).length,
    paidDocuments: documents.filter((doc) => doc.price > 0).length,
    enrolledFreeDocuments: enrolledDocs.filter((doc) => doc.price === 0).length,
    enrolledPaidDocuments: enrolledDocs.filter((doc) => doc.price > 0).length,
    totalViews: documents.reduce(
      (sum, doc) => sum + (doc.sharedInterestsCount || 0),
      0
    ),
    avgRating: 0, // Mock data
    followers: 156, // Mock data
  };

  if (loading) {
    return <LoadingPage message='Đang tải dữ liệu...' />;
  }

  if (error || !author) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        <div className='text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
            <X className='h-8 w-8 text-red-500' />
          </div>
          <h2 className='mb-2 text-2xl font-bold text-gray-900'>
            Không tìm thấy tác giả
          </h2>
          <p className='mb-4 text-gray-600'>
            Tác giả này không tồn tại hoặc đã bị xóa.
          </p>
          <button
            onClick={() => navigate('/customer/documents')}
            className='rounded-xl bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600'
          >
            Quay lại danh sách tài liệu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 py-8 md:px-8'>
        {/* Header with Back Button */}
        <div className='mb-6 flex items-center gap-4'>
          <button
            onClick={() => navigate(-1)}
            className='group rounded-xl bg-white p-2 shadow-md transition-all duration-300 hover:shadow-lg'
          >
            <ArrowLeft className='h-5 w-5 text-gray-600 group-hover:text-blue-600' />
          </button>
          <h1 className='text-2xl font-bold text-gray-900'>
            Tài liệu của {author.name}
          </h1>
        </div>

        {/* Author Profile Section */}
        <div className='mb-8 rounded-3xl border border-white/20 bg-white/80 p-8 shadow-xl backdrop-blur-lg'>
          <div className='flex flex-col items-start gap-8 lg:flex-row'>
            {/* Author Avatar & Basic Info */}
            <div className='flex flex-col items-center text-center lg:items-start lg:text-left'>
              <img
                src={
                  author.avatar ||
                  `https://api.dicebear.com/9.x/avataaars/svg?seed=${author.name}`
                }
                alt={author.name}
                className='mb-4 h-32 w-32 rounded-2xl border-4 border-white shadow-lg'
              />
              <h2 className='mb-2 text-3xl font-bold text-gray-900'>
                {author.name}
              </h2>
              <p className='mb-2 flex items-center gap-2 text-gray-600'>
                <Mail className='h-4 w-4' />
                {author.email}
              </p>
              <p className='mb-4 flex items-center gap-2 text-gray-600'>
                <Calendar className='h-4 w-4' />
                Tham gia từ {formatDate(author.createdAt)}
              </p>

              {/* Action Buttons */}
              <div className='flex w-full gap-3 lg:w-auto'>
                {!isMyProfile() && (
                  <>
                    <button
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={`flex flex-1 items-center gap-2 rounded-xl px-6 py-3 font-medium transition-all duration-300 lg:flex-none ${
                        isFollowing
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                      }`}
                    >
                      <MessageCircle className='h-5 w-5' />
                      {isFollowing ? 'Đang theo dõi' : 'Kết nối'}
                    </button>
                  </>
                )}
                <button className='rounded-xl bg-gray-100 p-3 transition-colors hover:bg-gray-200'>
                  <Share2 className='h-5 w-5 text-gray-600' />
                </button>
              </div>
            </div>

            {/* Author Stats & Interests */}
            <div className='w-full flex-1'>
              <div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-3'>
                <div className='rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center'>
                  <div className='mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500'>
                    <BookOpen className='h-6 w-6 text-white' />
                  </div>
                  <div className='text-2xl font-bold text-blue-600'>
                    {stats.totalDocuments}
                  </div>
                  <div className='text-sm text-blue-700'>Tổng tài liệu</div>
                </div>

                <div className='rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-4 text-center'>
                  <div className='mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500'>
                    <Users className='h-6 w-6 text-white' />
                  </div>
                  <div className='text-2xl font-bold text-green-600'>
                    {stats.enrolledDocuments}
                  </div>
                  <div className='text-sm text-green-700'>Đã đăng ký</div>
                </div>

                <div className='rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 text-center'>
                  <div className='mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500'>
                    <Clock className='h-6 w-6 text-white' />
                  </div>
                  <div className='text-2xl font-bold text-gray-600'>
                    {stats.notEnrolledDocuments}
                  </div>
                  <div className='text-sm text-gray-700'>Chưa đăng ký</div>
                </div>

                <div className='rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 text-center'>
                  <div className='mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500'>
                    <Gift className='h-6 w-6 text-white' />
                  </div>
                  <div className='text-2xl font-bold text-emerald-600'>
                    {stats.freeDocuments}
                  </div>
                  <div className='text-sm text-emerald-700'>Miễn phí</div>
                  <div className='text-xs text-emerald-600 mt-1'>
                    ({stats.enrolledFreeDocuments} đã đăng ký)
                  </div>
                </div>

                <div className='rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-4 text-center'>
                  <div className='mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500'>
                    <DollarSign className='h-6 w-6 text-white' />
                  </div>
                  <div className='text-2xl font-bold text-orange-600'>
                    {stats.paidDocuments}
                  </div>
                  <div className='text-sm text-orange-700'>Trả phí</div>
                  <div className='text-xs text-orange-600 mt-1'>
                    ({stats.enrolledPaidDocuments} đã đăng ký)
                  </div>
                </div>

                <div className='rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 text-center'>
                  <div className='mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500'>
                    <Star className='h-6 w-6 text-white' />
                  </div>
                  <div className='text-2xl font-bold text-yellow-600'>
                    {stats.avgRating}
                  </div>
                  <div className='text-sm text-yellow-700'>Đánh giá</div>
                </div>
              </div>

              {/* Author Interests */}
              {author.interests && author.interests.length > 0 && (
                <div>
                  <h3 className='mb-3 text-lg font-semibold text-gray-900'>
                    Sở thích
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {author.interests.slice(0, 10).map((interest) => (
                      <span
                        key={interest._id}
                        className='flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 text-sm font-medium text-blue-700'
                      >
                        <span>{interest.emoji}</span>
                        <span>{interest.name}</span>
                      </span>
                    ))}
                    {author.interests.length > 10 && (
                      <span className='rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600'>
                        +{author.interests.length - 10} khác
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className='mb-6 flex flex-col gap-4'>
          {/* Search Bar */}
          <div className='relative flex-1'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <Search className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='search'
              placeholder='Tìm kiếm tài liệu của tác giả...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-base placeholder-gray-500 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
            {/* Enrollment Filter */}
            <div className='flex space-x-1 rounded-xl border border-gray-200 bg-white p-1'>
              <button
                onClick={() => setEnrollmentFilter('all')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  enrollmentFilter === 'all'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Tất cả ({stats.totalDocuments})
              </button>
              <button
                onClick={() => setEnrollmentFilter('enrolled')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  enrollmentFilter === 'enrolled'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Đã đăng ký ({stats.enrolledDocuments})
              </button>
              <button
                onClick={() => setEnrollmentFilter('not-enrolled')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  enrollmentFilter === 'not-enrolled'
                    ? 'bg-gray-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Chưa đăng ký ({stats.notEnrolledDocuments})
              </button>
            </div>

            {/* Price Filter */}
            <div className='flex space-x-1 rounded-xl border border-gray-200 bg-white p-1'>
              <button
                onClick={() => setPriceFilter('all')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  priceFilter === 'all'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Tất cả giá
              </button>
              <button
                onClick={() => setPriceFilter('free')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  priceFilter === 'free'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Miễn phí ({stats.freeDocuments})
              </button>
              <button
                onClick={() => setPriceFilter('paid')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  priceFilter === 'paid'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Trả phí ({stats.paidDocuments})
              </button>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div>
          {/* Results Count */}
          <div className='mb-6 flex items-center justify-between'>
            <p className='text-gray-600'>
              Hiển thị {filteredDocuments.length} tài liệu
            </p>
          </div>

          {/* Documents Display */}
          {filteredDocuments.length === 0 ? (
            <div className='py-12 text-center'>
              <BookOpen className='mx-auto mb-4 h-16 w-16 text-gray-400' />
              <h3 className='mb-2 text-xl font-medium text-gray-900'>
                {searchQuery || priceFilter !== 'all'
                  ? 'Không tìm thấy tài liệu nào'
                  : 'Tác giả chưa có tài liệu nào'}
              </h3>
              <p className='mb-4 text-gray-600'>
                {searchQuery ||
                priceFilter !== 'all' ||
                enrollmentFilter !== 'all'
                  ? 'Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc của bạn'
                  : 'Hãy quay lại sau khi tác giả đăng tài liệu mới'}
              </p>
              {(searchQuery ||
                priceFilter !== 'all' ||
                enrollmentFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setPriceFilter('all');
                    setEnrollmentFilter('all');
                  }}
                  className='rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-600'
                >
                  Xóa tất cả bộ lọc
                </button>
              )}
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {filteredDocuments.map((doc) => {
                const finalPrice =
                  doc.discount > 0
                    ? doc.price * (1 - doc.discount / 100)
                    : doc.price;

                return (
                  <div
                    key={doc._id}
                    className='group transform overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl'
                  >
                    {/* Document Thumbnail */}
                    <div className='relative h-48 bg-gradient-to-br from-blue-100 to-purple-100'>
                      <img
                        src={
                          doc.imageUrls?.[0] ||
                          'https://api.dicebear.com/9.x/shapes/svg?seed=default'
                        }
                        alt={doc.title}
                        className='h-full w-full object-cover'
                      />
                      {doc.discount > 0 && doc.price > 0 && (
                        <div className='absolute right-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white'>
                          -{doc.discount}%
                        </div>
                      )}
                      <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20'></div>
                    </div>

                    {/* Document Info */}
                    <div className='p-6'>
                      {/* Price and Interests */}
                      <div className='mb-3 flex items-center justify-between'>
                        <div className='flex gap-1'>
                          {doc.interests?.slice(0, 2).map((interest) => (
                            <span
                              key={interest._id}
                              className='flex items-center gap-1 rounded-lg bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700'
                            >
                              <span>{interest.emoji}</span>
                              <span>{interest.name}</span>
                            </span>
                          ))}
                        </div>
                        <div className='text-right'>
                          {doc.price === 0 ? (
                            <span className='text-lg font-bold text-emerald-600'>
                              MIỄN PHÍ
                            </span>
                          ) : (
                            <div className='flex flex-col items-end'>
                              {doc.discount > 0 && (
                                <span className='text-xs text-gray-400 line-through'>
                                  {formatCurrency(doc.price)}
                                </span>
                              )}
                              <span className='text-sm font-bold text-blue-600'>
                                {formatCurrency(finalPrice)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <Link
                        to={`/customer/documents/${doc._id}`}
                        className='mb-2 block line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600'
                      >
                        {doc.title}
                      </Link>

                      {/* Description */}
                      <p className='mb-4 line-clamp-2 text-sm text-gray-600'>
                        {doc.description}
                      </p>

                      {/* Stats */}
                      <div className='mb-4 flex items-center gap-4 text-sm text-gray-500'>
                        <div className='flex items-center gap-1'>
                          <Star className='h-4 w-4 fill-current text-yellow-400' />
                          <span>4.5</span>
                          <span>(0)</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Users className='h-4 w-4' />
                          <span>{doc.sharedInterestsCount || 0}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='h-4 w-4' />
                          <span>{formatDate(doc.createdAt)}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className='flex items-center gap-2'>
                        {isDocumentEnrolled(doc._id) ? (
                          <button
                            disabled
                            className='flex-1 rounded-xl px-4 py-2 font-medium transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-not-allowed opacity-90'
                          >
                            <BookOpen className='h-4 w-4' />
                            Đã đăng ký
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDownloadDocument(doc)}
                            className={`flex-1 rounded-xl px-4 py-2 font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                              doc.price === 0
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white'
                                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                            }`}
                          >
                            {doc.price === 0 ? (
                              <>
                                <Download className='h-4 w-4' />
                                Tải miễn phí
                              </>
                            ) : (
                              <Link
                                to={`/customer/documents/${doc._id}`}
                                className='flex items-center justify-center gap-2'
                              >
                                <DollarSign className='w-4 h-4' />
                                Mua tài liệu
                              </Link>
                            )}
                          </button>
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
          )}
        </div>
      </div>
    </div>
  );
}
