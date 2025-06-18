import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  Users,
  UserPlus,
  MessageSquare,
  MapPin,
  Star,
  Clock,
  Heart,
  Sparkles,
  Brain,
  Target,
  BookOpen,
  Calendar,
  ChevronDown,
  X,
  Plus,
  Grid3X3,
  List,
  Award,
  TrendingUp,
  User,
  Globe,
  Zap,
  Shield,
  Coffee,
  Lightbulb,
  Video,
  Phone,
  Mail,
  PlusCircle,
} from 'lucide-react';
import interestServices from '../../services/interestServices';
import { Link } from 'react-router';

export default function CustomerPartner() {
  const [activeTab, setActiveTab] = useState('partners'); // partners, groups
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [minMatchPercentage, setMinMatchPercentage] = useState(0);
  const [dateFilter, setDateFilter] = useState('all'); // all, week, month, 3months
  const [priorityUsers, setPriorityUsers] = useState([]);

  useEffect(() => {
    const fetchPriorityUsers = async () => {
      const response = await interestServices.getPrioriryUsers();
      setPriorityUsers(response.data.users || []);
    };
    fetchPriorityUsers();
  }, []);
  // AI suggestions được tạo từ users thật
  const aiSuggestions = {
    partners: priorityUsers.slice(0, 2).map((user, index) => ({
      id: `ai-p${index + 1}`,
      name: user.name,
      email: user.email,
      reason: `${user.matchPercentage}% phù hợp - Cùng ${user.sharedInterestsCount} sở thích`,
      avatar: user.avatar,
      matchScore: 85 + user.sharedInterestsCount * 5,
    })),
    groups: [
      {
        id: 'ai-g1',
        name: 'React Developers VN',
        reason: 'Phù hợp với sở thích lập trình của bạn',
        members: 1247,
        avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=RVN-AI',
      },
      {
        id: 'ai-g2',
        name: 'AI Study Group',
        reason: 'Tiếp tục hành trình học AI',
        members: 892,
        avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=AI-AI',
      },
    ],
  };

  // Mock data for study groups
  const studyGroups = [
    {
      id: 1,
      name: 'React Developers Việt Nam',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=RVN',
      description:
        'Cộng đồng lập trình viên React Việt Nam. Chia sẻ kiến thức, thảo luận dự án và hỗ trợ lẫn nhau.',
      category: 'Lập trình',
      members: 1247,
      onlineMembers: 156,
      isActive: true,
      privacy: 'Công khai',
      createdAt: '2023-06-15',
      lastActivity: '5 phút trước',
      tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
      rules: ['Tôn trọng lẫn nhau', 'Không spam', 'Chia sẻ kiến thức'],
      meetingSchedule: 'Thứ 7 hàng tuần - 20:00',
      languages: ['Tiếng Việt'],
      level: 'Tất cả cấp độ',
      rating: 4.8,
      newPosts: 12,
      adminName: 'Nguyễn Văn Admin',
      adminAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=admin1',
    },
    {
      id: 2,
      name: 'AI & Machine Learning Study Group',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=AIML',
      description:
        'Nhóm học AI và Machine Learning cho những người đam mê công nghệ AI. Từ cơ bản đến nâng cao.',
      category: 'Trí tuệ nhân tạo',
      members: 892,
      onlineMembers: 87,
      isActive: true,
      privacy: 'Công khai',
      createdAt: '2023-08-10',
      lastActivity: '15 phút trước',
      tags: ['AI', 'Machine Learning', 'Deep Learning', 'Python'],
      rules: ['Chia sẻ tài liệu', 'Thảo luận học thuật', 'Hỗ trợ newbie'],
      meetingSchedule: 'Chủ nhật hàng tuần - 19:30',
      languages: ['Tiếng Việt', 'English'],
      level: 'Trung cấp - Nâng cao',
      rating: 4.9,
      newPosts: 8,
      adminName: 'Dr. Trần AI',
      adminAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=admin2',
    },
    {
      id: 3,
      name: 'UX/UI Design Community',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=UXUI',
      description:
        'Cộng đồng thiết kế UX/UI. Review design, chia sẻ inspiration và học hỏi cùng nhau.',
      category: 'Thiết kế',
      members: 634,
      onlineMembers: 45,
      isActive: true,
      privacy: 'Công khai',
      createdAt: '2023-09-20',
      lastActivity: '1 giờ trước',
      tags: ['UI/UX', 'Figma', 'Design', 'Prototype'],
      rules: ['Góp ý xây dựng', 'Chia sẻ inspiration', 'Respect creativity'],
      meetingSchedule: 'Thứ 6 hàng tuần - 20:30',
      languages: ['Tiếng Việt'],
      level: 'Cơ bản - Trung cấp',
      rating: 4.6,
      newPosts: 5,
      adminName: 'Designer Pro',
      adminAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=admin3',
    },
  ];

  // Tạo danh sách interests từ users thật
  const interests = [
    ...new Set(
      priorityUsers.flatMap(
        (user) => user.interests?.map((interest) => interest.name) || []
      )
    ),
  ];

  const handleInterestToggle = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const getDateFilterValue = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffTime = Math.abs(now - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    switch (dateFilter) {
      case 'week':
        return diffDays <= 7;
      case 'month':
        return diffDays <= 30;
      case '3months':
        return diffDays <= 90;
      case 'all':
      default:
        return true;
    }
  };

  const filteredPartners = priorityUsers.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.interests?.some((interest) =>
        interest.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesInterests =
      selectedInterests.length === 0 ||
      selectedInterests.some((interest) =>
        user.interests?.some((userInterest) => userInterest.name === interest)
      );

    const matchesPercentage = user.matchPercentage >= minMatchPercentage;

    const matchesDate = getDateFilterValue(user.createdAt);

    return (
      matchesSearch && matchesInterests && matchesPercentage && matchesDate
    );
  });

  const filteredGroups = studyGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesInterests =
      selectedInterests.length === 0 ||
      selectedInterests.some((interest) => group.tags.includes(interest));

    const matchesDate = getDateFilterValue(group.createdAt);

    return matchesSearch && matchesInterests && matchesDate;
  });

  const PartnerCard = ({ partner }) => {
    const matchScore = partner.matchPercentage;

    return (
      <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group'>
        <div className='p-6'>
          {/* Header */}
          <div className='flex items-center gap-4 mb-4'>
            <div className='relative'>
              <img
                src={
                  partner.avatar ||
                  'https://api.dicebear.com/9.x/avataaars/svg?seed=default'
                }
                alt={partner.name}
                className='w-16 h-16 rounded-xl object-cover'
              />
              <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full'></div>
            </div>
            <div className='flex-1'>
              <Link
                to={`/customer/documents/author/${partner._id}`}
                className='text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors'
              >
                {partner.name}
              </Link>
              <p className='text-sm text-gray-600'>{partner.email}</p>
              <p className='text-xs text-gray-500'>
                Tham gia:{' '}
                {new Date(partner.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
            <div className='text-center'>
              <div
                className={`text-lg font-bold px-3 py-1 rounded-full ${
                  matchScore >= 90
                    ? 'bg-green-100 text-green-700'
                    : matchScore >= 80
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {matchScore}%
              </div>
              <p className='text-xs text-gray-500 mt-1'>Phù hợp</p>
            </div>
          </div>

          {/* Description - placeholder */}
          <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
            Thành viên tích cực với {partner.sharedInterestsCount || 0} sở thích
            chung. Sẵn sàng chia sẻ kiến thức và học hỏi cùng nhau.
          </p>

          {/* Stats Row */}
          <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                <Target className='w-4 h-4' />
                <span>{partner.sharedInterestsCount || 0} sở thích chung</span>
              </div>
            </div>
            <div className='flex items-center gap-1 text-xs'>
              <Clock className='w-3 h-3' />
              <span>Đang hoạt động</span>
            </div>
          </div>

          {/* Interests */}
          <div className='mb-4'>
            <p className='text-xs text-gray-500 mb-2'>
              {partner.sharedInterestsCount || 0} sở thích:
            </p>
            <div className='flex flex-wrap gap-1'>
              {partner.interests?.slice(0, 4).map((interest) => (
                <span
                  key={interest._id}
                  className='px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium flex items-center gap-1'
                >
                  <span>{interest.emoji}</span>
                  <span>{interest.name}</span>
                </span>
              ))}
              {partner.interests?.length > 4 && (
                <span className='px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs'>
                  +{partner.interests.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex items-center gap-2'>
            <button className='flex-1 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-sm font-medium'>
              Kết nối
            </button>
            <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors'>
              <MessageSquare className='w-4 h-4 text-gray-600' />
            </button>
            <button className='p-2 bg-gray-100 hover:bg-red-100 rounded-xl transition-colors group'>
              <Heart className='w-4 h-4 text-gray-600 group-hover:text-red-500' />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const GroupCard = ({ group }) => (
    <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group'>
      <div className='p-6'>
        {/* Header */}
        <div className='flex items-start gap-4 mb-4'>
          <img
            src={group.avatar}
            alt={group.name}
            className='w-16 h-16 rounded-xl object-cover'
          />
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              <h3 className='text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors'>
                {group.name}
              </h3>
              {group.isActive && (
                <div className='w-2 h-2 bg-green-400 rounded-full'></div>
              )}
            </div>
            <p className='text-sm text-gray-600 mb-1'>{group.category}</p>
            <div className='flex items-center gap-4 text-sm text-gray-500'>
              <div className='flex items-center gap-1'>
                <Users className='w-4 h-4' />
                <span>{group.members} thành viên</span>
              </div>
              <div className='flex items-center gap-1'>
                <Globe className='w-4 h-4' />
                <span>{group.onlineMembers} online</span>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full'>
            <Shield className='w-3 h-3' />
            {group.privacy}
          </div>
        </div>

        {/* Description */}
        <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
          {group.description}
        </p>

        {/* Tags */}
        <div className='mb-4'>
          <div className='flex flex-wrap gap-1'>
            {group.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className='px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium'
              >
                {tag}
              </span>
            ))}
            {group.tags.length > 4 && (
              <span className='px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs'>
                +{group.tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Group Info */}
        <div className='space-y-2 mb-4 text-sm'>
          <div className='flex items-center gap-2'>
            <Calendar className='w-4 h-4 text-gray-400' />
            <span className='text-gray-600'>{group.meetingSchedule}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Star className='w-4 h-4 text-yellow-400 fill-current' />
            <span className='text-gray-600'>{group.rating}/5</span>
          </div>
          <div className='flex items-center gap-2'>
            <TrendingUp className='w-4 h-4 text-gray-400' />
            <span className='text-gray-600'>{group.newPosts} bài viết mới</span>
          </div>
        </div>

        {/* Admin Info */}
        <div className='flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl'>
          <img
            src={group.adminAvatar}
            alt={group.adminName}
            className='w-8 h-8 rounded-lg'
          />
          <div>
            <p className='text-sm font-medium text-gray-900'>
              {group.adminName}
            </p>
            <p className='text-xs text-gray-500'>Quản trị viên</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-2'>
          <button className='flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm font-medium'>
            Tham gia nhóm
          </button>
          <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors'>
            <MessageSquare className='w-4 h-4 text-gray-600' />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 mb-8'>
            <h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Tìm bạn học & Nhóm học 👥
            </h1>
            <p className='text-xl text-gray-600 mb-6'>
              Kết nối với cộng đồng học tập và phát triển cùng nhau
            </p>

            {/* AI Suggestions */}
            <div className='bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full'>
                  <Sparkles className='w-5 h-5' />
                  <span className='font-semibold'>Gợi ý từ AI</span>
                </div>
                <p className='text-purple-700'>
                  Những kết nối hoàn hảo cho bạn
                </p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {activeTab === 'partners'
                  ? aiSuggestions.partners.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className='bg-white/80 rounded-xl p-4 hover:bg-white transition-all duration-300'
                      >
                        <div className='flex items-center gap-3'>
                          <div className='relative'>
                            <img
                              src={suggestion.avatar}
                              alt={suggestion.name}
                              className='w-12 h-12 rounded-xl'
                            />
                            <div className='absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1'>
                              <Brain className='w-3 h-3 text-white' />
                            </div>
                          </div>
                          <div className='flex-1'>
                            <h3 className='font-semibold text-gray-900 text-sm'>
                              {suggestion.name}
                            </h3>
                            <p className='text-xs text-gray-600'>
                              {suggestion.email}
                            </p>
                            <div className='flex items-center gap-2 mt-1'>
                              <p className='text-xs text-purple-600 flex items-center gap-1'>
                                <Sparkles className='w-3 h-3' />
                                {suggestion.reason}
                              </p>
                            </div>
                          </div>
                          <button className='px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300'>
                            Kết nối
                          </button>
                        </div>
                      </div>
                    ))
                  : aiSuggestions.groups.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className='bg-white/80 rounded-xl p-4 hover:bg-white transition-all duration-300'
                      >
                        <div className='flex items-center gap-3'>
                          <div className='relative'>
                            <img
                              src={suggestion.avatar}
                              alt={suggestion.name}
                              className='w-12 h-12 rounded-xl'
                            />
                            <div className='absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1'>
                              <Brain className='w-3 h-3 text-white' />
                            </div>
                          </div>
                          <div className='flex-1'>
                            <h3 className='font-semibold text-gray-900 text-sm'>
                              {suggestion.name}
                            </h3>
                            <p className='text-xs text-gray-600'>
                              {suggestion.members} thành viên
                            </p>
                            <p className='text-xs text-purple-600 flex items-center gap-1'>
                              <Sparkles className='w-3 h-3' />
                              {suggestion.reason}
                            </p>
                          </div>
                          <button className='px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300'>
                            Tham gia
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => setActiveTab('partners')}
                  className={`ml-4 flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === 'partners'
                      ? 'bg-white shadow-lg text-blue-600 border-blue-600 scale-105'
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                >
                  <UserPlus className='w-4 h-4' />
                  <span>Bạn học</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === 'partners'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {filteredPartners.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('groups')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === 'groups'
                      ? 'bg-white shadow-lg text-purple-600 border-purple-600 scale-105'
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                >
                  <Users className='w-4 h-4' />
                  <span>Nhóm học</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === 'groups'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {filteredGroups.length}
                  </span>
                </button>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  className={`ml-4 flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300`}
                >
                  <PlusCircle className='w-4 h-4' />
                  <span>Tạo nhóm mới</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
            <div className='flex flex-col md:flex-row gap-4 mb-4'>
              {/* Search */}
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  placeholder={
                    activeTab === 'partners'
                      ? 'Tìm kiếm bạn học...'
                      : 'Tìm kiếm nhóm học...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
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
            </div>

            {/* Filters */}
            {showFilters && (
              <div className='border-t border-gray-200 pt-4'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                  {/* Interests */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Sở thích
                    </label>
                    <div className='max-h-32 overflow-y-auto space-y-1'>
                      {interests.slice(0, 8).map((interest) => (
                        <label
                          key={interest}
                          className='flex items-center gap-2 text-sm'
                        >
                          <input
                            type='checkbox'
                            checked={selectedInterests.includes(interest)}
                            onChange={() => handleInterestToggle(interest)}
                            className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          />
                          {interest}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Match Percentage */}
                  {activeTab === 'partners' && (
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Mức độ phù hợp tối thiểu
                      </label>
                      <select
                        value={minMatchPercentage}
                        onChange={(e) =>
                          setMinMatchPercentage(Number(e.target.value))
                        }
                        className='w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      >
                        <option value={0}>Tất cả</option>
                        <option value={50}>≥ 50%</option>
                        <option value={70}>≥ 70%</option>
                        <option value={80}>≥ 80%</option>
                        <option value={90}>≥ 90%</option>
                      </select>
                    </div>
                  )}

                  {/* Date Filter */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Thời gian tham gia
                    </label>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className='w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value='all'>Tất cả</option>
                      <option value='week'>7 ngày qua</option>
                      <option value='month'>30 ngày qua</option>
                      <option value='3months'>3 tháng qua</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className='min-h-[400px]'>
          {activeTab === 'partners' ? (
            filteredPartners.length === 0 ? (
              <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 text-center py-16'>
                <UserPlus className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Không tìm thấy bạn học phù hợp
                </h3>
                <p className='text-gray-600 mb-6'>
                  Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedInterests([]);
                    setMinMatchPercentage(0);
                    setDateFilter('all');
                  }}
                  className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium'
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {filteredPartners.map((partner) => (
                  <PartnerCard key={partner._id} partner={partner} />
                ))}
              </div>
            )
          ) : filteredGroups.length === 0 ? (
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 text-center py-16'>
              <Users className='w-16 h-16 text-gray-300 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Không tìm thấy nhóm học phù hợp
              </h3>
              <p className='text-gray-600 mb-6'>
                Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
              </p>
              <div className='flex items-center justify-center gap-4'>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedInterests([]);
                    setDateFilter('all');
                  }}
                  className='px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium'
                >
                  Xóa bộ lọc
                </button>
                <button className='px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-medium flex items-center gap-2'>
                  <Plus className='w-4 h-4' />
                  Tạo nhóm mới
                </button>
              </div>
            </div>
          ) : (
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        {((activeTab === 'partners' && filteredPartners.length > 0) ||
          (activeTab === 'groups' && filteredGroups.length > 0)) && (
          <div className='text-center mt-8'>
            <button className='px-8 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-medium'>
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
