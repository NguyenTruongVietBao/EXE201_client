import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import {
  Users,
  Crown,
  Calendar,
  Target,
  MessageSquare,
  Settings,
  UserPlus,
  ArrowLeft,
  Clock,
  TrendingUp,
  MoreVertical,
  Activity,
} from 'lucide-react';
import customerService from '../../services/customerService';
import useAuthStore from '../../stores/useAuthStore';
import { formatDate, formatJustDate } from '../../utils';
import toast from 'react-hot-toast';
import LoadingPage from '../../components/common/LoadingPage';

export default function CustomerGroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuthStore();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        setLoading(true);
        const response = await customerService.getGroupById(id);
        setGroup(response.data);
      } catch (error) {
        console.error('Error fetching group:', error);
        toast.error('Không thể tải thông tin nhóm');
      } finally {
        setLoading(false);
      }
    };
    fetchGroup();
  }, [id]);

  if (loading) {
    return <LoadingPage message='Đang tải thông tin nhóm...' />;
  }

  if (!group) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Không tìm thấy nhóm
          </h2>
          <Link
            to='/customer/groups'
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Quay lại danh sách nhóm
          </Link>
        </div>
      </div>
    );
  }

  const {
    groupInfo,
    members,
    userPermissions,
    statistics,
    activityRate,
    recentMessages,
  } = group;

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => (
    <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
      <div className='flex items-center gap-4'>
        <div className={`p-3 rounded-xl bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div className='flex-1'>
          <p className='text-2xl font-bold text-gray-900'>{value}</p>
          <p className='text-sm font-medium text-gray-600'>{title}</p>
          {subtitle && <p className='text-xs text-gray-500 mt-1'>{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const MemberCard = ({ member }) => {
    const isCurrentUser = currentUser && member.userId._id === currentUser._id;

    return (
      <div className='bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <img
              src={
                member.userId.avatar ||
                `https://api.dicebear.com/9.x/avataaars/svg?seed=${member.userId.name}`
              }
              alt={member.userId.name}
              className='w-12 h-12 rounded-full border-2 border-white shadow-sm'
            />
            {member.isAdmin && (
              <div className='absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 border-2 border-white rounded-full flex items-center justify-center'>
                <Crown className='w-3 h-3 text-white' />
              </div>
            )}
          </div>
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <h3 className='font-semibold text-gray-900'>
                {member.userId.name}
                {isCurrentUser && (
                  <span className='text-blue-600 ml-1'>(Bạn)</span>
                )}
              </h3>
              {member.isAdmin && (
                <span className='px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium'>
                  Admin
                </span>
              )}
            </div>
            <p className='text-sm text-gray-600'>{member.userId.email}</p>
            <div className='flex items-center gap-2 mt-1 text-xs text-gray-500'>
              <Calendar className='w-3 h-3' />
              <span>Tham gia: {formatJustDate(member.joinDate)}</span>
            </div>
          </div>
          {userPermissions.canManageMembers && !isCurrentUser && (
            <div className='flex items-center gap-1'>
              <button className='p-2 text-gray-400 hover:text-gray-600 transition-colors'>
                <MoreVertical className='w-4 h-4' />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-6'>
            <button
              onClick={() => navigate(-1)}
              className='p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                Chi tiết nhóm
              </h1>
              <p className='text-gray-600'>
                Quản lý và theo dõi hoạt động nhóm
              </p>
            </div>
          </div>

          {/* Group Info Card */}
          <div className='bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20'>
            <div className='flex items-start gap-6 mb-6'>
              <div className='relative'>
                <div
                  className={`w-20 h-20 ${
                    userPermissions.isAdmin
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                      : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                  } rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg`}
                >
                  {groupInfo.name.charAt(0)}
                </div>
                {userPermissions.isAdmin && (
                  <div className='absolute -top-2 -right-2 w-7 h-7 bg-yellow-400 border-3 border-white rounded-full flex items-center justify-center shadow-lg'>
                    <Crown className='w-4 h-4 text-white' />
                  </div>
                )}
              </div>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-2'>
                  <h2 className='text-2xl font-bold text-gray-900'>
                    {groupInfo.name}
                  </h2>
                  {userPermissions.isCreator && (
                    <span className='px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium border border-yellow-200'>
                      Người tạo
                    </span>
                  )}
                  {userPermissions.isAdmin && !userPermissions.isCreator && (
                    <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200'>
                      Admin
                    </span>
                  )}
                  {userPermissions.isMember && !userPermissions.isAdmin && (
                    <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200'>
                      Thành viên
                    </span>
                  )}
                </div>
                <p className='text-lg text-gray-600 mb-4'>
                  {groupInfo.description}
                </p>

                {/* Creator Info */}
                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
                  <img
                    src={groupInfo.createdBy.avatar}
                    alt={groupInfo.createdBy.name}
                    className='w-8 h-8 rounded-full'
                  />
                  <div>
                    <div className='flex items-center gap-2'>
                      <Crown className='w-4 h-4 text-yellow-500' />
                      <span className='font-medium text-gray-900'>
                        {groupInfo.createdBy.name}
                      </span>
                    </div>
                    <p className='text-xs text-gray-500'>
                      {groupInfo.createdBy.email}
                    </p>
                  </div>
                  <div className='ml-auto text-xs text-gray-500'>
                    Tạo: {formatJustDate(groupInfo.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className='mb-6'>
              <h3 className='font-semibold text-gray-900 mb-3'>
                Sở thích nhóm ({groupInfo.interests.length})
              </h3>
              <div className='flex flex-wrap gap-2'>
                {groupInfo.interests.map((interest) => (
                  <span
                    key={interest._id}
                    className='px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium flex items-center gap-2 border border-blue-100'
                  >
                    <span className='text-base'>{interest.emoji}</span>
                    <span>{interest.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-3 flex-wrap'>
              {userPermissions.canSendMessages && (
                <Link
                  to={`/customer/chat`}
                  className='px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-medium flex items-center gap-2'
                >
                  <MessageSquare className='w-4 h-4' />
                  Chat nhóm
                </Link>
              )}
              {userPermissions.canInvite && (
                <button className='px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-medium flex items-center gap-2'>
                  <UserPlus className='w-4 h-4' />
                  Mời thành viên
                </button>
              )}
              {userPermissions.canManageMembers && (
                <button className='px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium flex items-center gap-2'>
                  <Settings className='w-4 h-4' />
                  Quản lý nhóm
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard
            icon={Users}
            title='Tổng thành viên'
            value={statistics.totalMembers}
            subtitle={`Còn ${statistics.availableSlots} slot`}
            color='blue'
          />
          <StatCard
            icon={TrendingUp}
            title='Tham gia tháng này'
            value={statistics.joinedThisMonth}
            subtitle='Thành viên mới'
            color='green'
          />
          <StatCard
            icon={Target}
            title='Sở thích'
            value={statistics.totalInterests}
            subtitle='Chủ đề nhóm'
            color='purple'
          />
          <StatCard
            icon={Activity}
            title='Hoạt động'
            value={`${Math.round(activityRate * 100)}%`}
            subtitle='Tỷ lệ tương tác'
            color='orange'
          />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Members List */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-bold text-gray-900'>
                  Thành viên ({statistics.totalMembers})
                </h3>
                {userPermissions.canInvite && (
                  <button className='px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center gap-2'>
                    <UserPlus className='w-4 h-4' />
                    Mời thêm
                  </button>
                )}
              </div>

              <div className='space-y-4'>
                {members.map((member) => (
                  <MemberCard key={member._id} member={member} />
                ))}
              </div>

              {statistics.pendingRequestsCount > 0 &&
                userPermissions.canManageMembers && (
                  <div className='mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl'>
                    <div className='flex items-center gap-3'>
                      <Clock className='w-5 h-5 text-orange-600' />
                      <div>
                        <p className='font-medium text-orange-900'>
                          {statistics.pendingRequestsCount} yêu cầu tham gia
                          đang chờ duyệt
                        </p>
                        <p className='text-sm text-orange-700'>
                          Click để xem và xử lý
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Permissions Card */}
            <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
              <h3 className='text-lg font-bold text-gray-900 mb-4'>
                Quyền hạn của bạn
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      userPermissions.canViewMessages
                        ? 'bg-green-400'
                        : 'bg-gray-300'
                    }`}
                  ></div>
                  <span
                    className={`text-sm ${
                      userPermissions.canViewMessages
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }`}
                  >
                    Xem tin nhắn
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      userPermissions.canSendMessages
                        ? 'bg-green-400'
                        : 'bg-gray-300'
                    }`}
                  ></div>
                  <span
                    className={`text-sm ${
                      userPermissions.canSendMessages
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }`}
                  >
                    Gửi tin nhắn
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      userPermissions.canInvite ? 'bg-green-400' : 'bg-gray-300'
                    }`}
                  ></div>
                  <span
                    className={`text-sm ${
                      userPermissions.canInvite
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }`}
                  >
                    Mời thành viên
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      userPermissions.canManageMembers
                        ? 'bg-green-400'
                        : 'bg-gray-300'
                    }`}
                  ></div>
                  <span
                    className={`text-sm ${
                      userPermissions.canManageMembers
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }`}
                  >
                    Quản lý thành viên
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
              <h3 className='text-lg font-bold text-gray-900 mb-4'>
                Hoạt động gần đây
              </h3>
              {recentMessages.length > 0 ? (
                <div className='space-y-3'>
                  {recentMessages.slice(0, 5).map((message, index) => (
                    <div
                      key={index}
                      className='flex items-start gap-3 p-3 bg-gray-50 rounded-lg'
                    >
                      <img
                        src={
                          message.user?.avatar ||
                          `https://api.dicebear.com/9.x/avataaars/svg?seed=${message.user?.name}`
                        }
                        alt={message.user?.name}
                        className='w-8 h-8 rounded-full'
                      />
                      <div className='flex-1'>
                        <p className='text-sm font-medium text-gray-900'>
                          {message.user?.name}
                        </p>
                        <p className='text-xs text-gray-600 line-clamp-2'>
                          {message.content}
                        </p>
                        <p className='text-xs text-gray-500 mt-1'>
                          {formatDate(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-8'>
                  <MessageSquare className='w-12 h-12 text-gray-300 mx-auto mb-3' />
                  <p className='text-sm text-gray-500'>Chưa có hoạt động nào</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
