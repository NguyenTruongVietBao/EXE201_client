import React, { useEffect, useState } from 'react';
import {
  Search,
  UserPlus,
  MessageSquare,
  Clock,
  Heart,
  Sparkles,
  Brain,
  Target,
  SortAsc,
  SortDesc,
} from 'lucide-react';
import interestServices from '../../services/interestServices';
import { Link } from 'react-router';
import { formatDate } from '../../utils';
import chatServices from '../../services/chatServices';
import toast from 'react-hot-toast';

export default function CustomerPartner() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('matchPercentage');
  const [sortOrder, setSortOrder] = useState('desc');
  const [priorityUsers, setPriorityUsers] = useState([]);
  const [userConnected, setUserConnected] = useState([]);

  useEffect(() => {
    const fetchPriorityUsers = async () => {
      const response = await interestServices.getPrioriryUsers();
      setPriorityUsers(response.data.users || []);
    };
    const fetchUserConnected = async () => {
      const response = await chatServices.getConversations();
      setUserConnected(response.data || []);
    };
    fetchPriorityUsers();
    fetchUserConnected();
  }, []);

  const aiSuggestions = priorityUsers.slice(0, 2).map((user, index) => ({
    id: `ai-p${index + 1}`,
    name: user.name,
    email: user.email,
    reason: `${user.matchPercentage}% phù hợp - Cùng ${user.sharedInterestsCount} sở thích`,
    avatar: user.avatar,
    matchScore: 85 + user.sharedInterestsCount * 5,
  }));

  const filteredPartners = priorityUsers
    .filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.interests?.some((interest) =>
          interest.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesSearch;
    })
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name?.toLowerCase() || '';
          bValue = b.name?.toLowerCase() || '';
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'matchPercentage':
        default:
          aValue = a.matchPercentage || 0;
          bValue = b.matchPercentage || 0;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Function để check xem user đã kết nối chưa
  const isUserConnected = (userId) => {
    return userConnected.some((conversation) =>
      conversation.participants.some(
        (participant) => participant._id === userId
      )
    );
  };

  const handleConnect = async (partnerId) => {
    const response = await chatServices.createConversation(partnerId);
    if (response.status) {
      toast.success('Kết nối thành công');
      const updatedConnections = await chatServices.getConversations();
      setUserConnected(updatedConnections.data || []);
    } else {
      toast.error('Kết nối thất bại');
    }
  };

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
                Tham gia: {formatDate(partner.createdAt)}
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

          {/* Description */}
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
            {isUserConnected(partner._id) ? (
              <Link
                to={`/customer/chat`}
                target='_blank'
                className='flex-1 py-2 bg-green-100 text-green-700 rounded-xl cursor-pointer text-sm font-medium flex items-center justify-center gap-2 '
              >
                <MessageSquare className='w-4 h-4 text-green-700' />
                Chat ngay
              </Link>
            ) : (
              <button
                onClick={() => handleConnect(partner._id)}
                className='flex-1 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-sm font-medium'
              >
                Kết nối
              </button>
            )}
            <button className='p-2 bg-gray-100 hover:bg-red-100 rounded-xl transition-colors group'>
              <Heart className='w-4 h-4 text-gray-600 group-hover:text-red-500' />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 mb-8'>
            <h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Tìm bạn học 👥
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
                {aiSuggestions.map((suggestion) => (
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
                      {priorityUsers.find(
                        (user) =>
                          user.name === suggestion.name &&
                          user.email === suggestion.email
                      ) &&
                      isUserConnected(
                        priorityUsers.find(
                          (user) =>
                            user.name === suggestion.name &&
                            user.email === suggestion.email
                        )?._id
                      ) ? (
                        <button
                          disabled
                          className='px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium cursor-not-allowed'
                        >
                          Đã kết nối ✓
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const user = priorityUsers.find(
                              (user) =>
                                user.name === suggestion.name &&
                                user.email === suggestion.email
                            );
                            if (user) handleConnect(user._id);
                          }}
                          className='px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300'
                        >
                          Kết nối
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Header Stats */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <UserPlus className='w-6 h-6 text-blue-600' />
                <span className='text-lg font-semibold text-gray-900'>
                  Bạn học
                </span>
                <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold'>
                  {filteredPartners.length} người
                </span>
              </div>
              <div className='text-sm text-gray-600'>
                Tìm thấy {filteredPartners.length} bạn học phù hợp
              </div>
            </div>
          </div>
        </div>

        {/* Search and Sort */}
        <div className='mb-8'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
            <div className='flex flex-col md:flex-row gap-4'>
              {/* Search */}
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Tìm kiếm theo tên, email, sở thích...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                />
              </div>

              {/* Sort Options */}
              <div className='flex gap-2'>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700'
                >
                  <option value='matchPercentage'>Mức độ phù hợp</option>
                  <option value='name'>Tên A-Z</option>
                  <option value='createdAt'>Ngày tham gia</option>
                </select>

                <button
                  onClick={() =>
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                  }
                  className='px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 bg-white'
                  title={sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
                >
                  {sortOrder === 'asc' ? (
                    <SortAsc className='w-5 h-5 text-gray-600' />
                  ) : (
                    <SortDesc className='w-5 h-5 text-gray-600' />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className='min-h-[400px]'>
          {filteredPartners.length === 0 ? (
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
                  setSortBy('matchPercentage');
                  setSortOrder('desc');
                }}
                className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium'
              >
                Đặt lại
              </button>
            </div>
          ) : (
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {filteredPartners.map((partner) => (
                <PartnerCard key={partner._id} partner={partner} />
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredPartners.length > 0 && (
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
