import React from 'react';
import {
  BookOpen,
  Users,
  UserPlus,
  Calendar,
  Star,
  Download,
  Eye,
  Plus,
  Clock,
  BookOpenCheck,
  ArrowRight,
} from 'lucide-react';

export default function CustomerHome() {
  // Mock data
  const featuredDocuments = [
    {
      id: 1,
      title: 'Advanced React Patterns & Best Practices',
      author: 'Sarah Johnson',
      category: 'Programming',
      rating: 4.8,
      downloads: 1234,
      views: 5678,
      price: 'Free',
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=react',
      tags: ['React', 'JavaScript', 'Frontend'],
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      author: 'Dr. Michael Chen',
      category: 'Data Science',
      rating: 4.9,
      downloads: 2567,
      views: 8901,
      price: '$12.99',
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=ml',
      tags: ['ML', 'Python', 'AI'],
    },
    {
      id: 3,
      title: 'Calculus Study Guide 2024',
      author: 'Prof. Emma Wilson',
      category: 'Mathematics',
      rating: 4.7,
      downloads: 890,
      views: 3456,
      price: '$8.99',
      thumbnail: 'https://api.dicebear.com/9.x/shapes/svg?seed=math',
      tags: ['Calculus', 'Math', 'Study Guide'],
    },
  ];

  const studyGroups = [
    {
      id: 1,
      name: 'React Developers Unite',
      members: 342,
      category: 'Programming',
      description: 'Learn React together, share projects and get feedback',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=RD',
      isActive: true,
      lastActivity: '2 hours ago',
    },
    {
      id: 2,
      name: 'Data Science Enthusiasts',
      members: 567,
      category: 'Data Science',
      description: 'Explore ML, AI, and data analysis techniques',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=DS',
      isActive: true,
      lastActivity: '5 minutes ago',
    },
    {
      id: 3,
      name: 'Math Study Circle',
      members: 198,
      category: 'Mathematics',
      description: 'Solve problems together and prepare for exams',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=MS',
      isActive: false,
      lastActivity: '1 day ago',
    },
  ];

  const suggestedPartners = [
    {
      id: 1,
      name: 'Alex Thompson',
      major: 'Computer Science',
      year: '3rd Year',
      interests: ['React', 'Node.js', 'Mobile Development'],
      avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex',
      matchScore: 95,
      location: 'Online',
    },
    {
      id: 2,
      name: 'Maria Garcia',
      major: 'Data Science',
      year: '2nd Year',
      interests: ['Python', 'Machine Learning', 'Statistics'],
      avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Maria',
      matchScore: 88,
      location: 'San Francisco',
    },
    {
      id: 3,
      name: 'David Kim',
      major: 'Mathematics',
      year: '4th Year',
      interests: ['Calculus', 'Linear Algebra', 'Teaching'],
      avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=David',
      matchScore: 91,
      location: 'New York',
    },
  ];

  const studyPlans = [
    {
      id: 1,
      title: 'React Mastery Path',
      progress: 75,
      totalTasks: 12,
      completedTasks: 9,
      dueDate: '2024-02-15',
      category: 'Programming',
    },
    {
      id: 2,
      title: 'Calculus Final Prep',
      progress: 45,
      totalTasks: 8,
      completedTasks: 4,
      dueDate: '2024-01-20',
      category: 'Mathematics',
    },
  ];

  const stats = {
    documentsRead: 127,
    studyHours: 245,
    groupsJoined: 8,
    partnersConnected: 15,
  };

  const quickActions = [
    {
      title: 'Find Documents',
      description: 'Browse our vast library',
      icon: <BookOpen className='w-6 h-6' />,
      color: 'from-blue-500 to-cyan-500',
      href: '/customer/documents',
    },
    {
      title: 'Join Groups',
      description: 'Connect with study groups',
      icon: <Users className='w-6 h-6' />,
      color: 'from-purple-500 to-pink-500',
      href: '/customer/groups',
    },
    {
      title: 'Find Partners',
      description: 'Meet study buddies',
      icon: <UserPlus className='w-6 h-6' />,
      color: 'from-emerald-500 to-teal-500',
      href: '/customer/partners',
    },
    {
      title: 'Create Study Plan',
      description: 'Plan your learning journey',
      icon: <Calendar className='w-6 h-6' />,
      color: 'from-orange-500 to-red-500',
      href: '/customer/study-plan',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      <div className='container mx-auto px-4 md:px-8 py-8'>
        {/* Hero Section */}
        <section className='mb-12'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Welcome back to Prilab! 👋
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
              Your learning journey continues. Discover new documents, connect
              with study partners, and achieve your academic goals.
            </p>
          </div>

          {/* Quick Actions */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {quickActions.map((action, index) => (
              <div
                key={index}
                className='group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer'
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className='text-white'>{action.icon}</div>
                </div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  {action.title}
                </h3>
                <p className='text-gray-600 text-sm'>{action.description}</p>
                <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <ArrowRight className='w-5 h-5 text-gray-400' />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Overview */}
          <div className='bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
              Your Learning Journey
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3'>
                  <BookOpenCheck className='w-8 h-8 text-blue-600' />
                </div>
                <div className='text-3xl font-bold text-gray-900 mb-1'>
                  {stats.documentsRead}
                </div>
                <div className='text-sm text-gray-600'>Documents Read</div>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-3'>
                  <Clock className='w-8 h-8 text-purple-600' />
                </div>
                <div className='text-3xl font-bold text-gray-900 mb-1'>
                  {stats.studyHours}
                </div>
                <div className='text-sm text-gray-600'>Study Hours</div>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-3'>
                  <Users className='w-8 h-8 text-emerald-600' />
                </div>
                <div className='text-3xl font-bold text-gray-900 mb-1'>
                  {stats.groupsJoined}
                </div>
                <div className='text-sm text-gray-600'>Groups Joined</div>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-3'>
                  <UserPlus className='w-8 h-8 text-orange-600' />
                </div>
                <div className='text-3xl font-bold text-gray-900 mb-1'>
                  {stats.partnersConnected}
                </div>
                <div className='text-sm text-gray-600'>Partners Connected</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Featured Documents & Study Groups */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Featured Documents */}
            <section>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Featured Documents
                </h2>
                <button className='text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2'>
                  View All <ArrowRight className='w-4 h-4' />
                </button>
              </div>
              <div className='space-y-4'>
                {featuredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group'
                  >
                    <div className='flex items-start gap-4'>
                      <img
                        src={doc.thumbnail}
                        alt={doc.title}
                        className='w-16 h-16 rounded-xl object-cover'
                      />
                      <div className='flex-1'>
                        <div className='flex items-start justify-between mb-2'>
                          <h3 className='text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors'>
                            {doc.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              doc.price === 'Free'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {doc.price}
                          </span>
                        </div>
                        <p className='text-gray-600 text-sm mb-2'>
                          by {doc.author}
                        </p>
                        <div className='flex items-center gap-4 text-sm text-gray-500 mb-3'>
                          <div className='flex items-center gap-1'>
                            <Star className='w-4 h-4 text-yellow-400 fill-current' />
                            <span>{doc.rating}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Download className='w-4 h-4' />
                            <span>{doc.downloads}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Eye className='w-4 h-4' />
                            <span>{doc.views}</span>
                          </div>
                        </div>
                        <div className='flex items-center justify-between'>
                          <div className='flex gap-2'>
                            {doc.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className='px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs'
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-sm font-medium'>
                            View Document
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Study Groups */}
            <section>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Active Study Groups
                </h2>
                <button className='text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2'>
                  Browse All <ArrowRight className='w-4 h-4' />
                </button>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {studyGroups.map((group) => (
                  <div
                    key={group.id}
                    className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300'
                  >
                    <div className='flex items-start gap-4 mb-4'>
                      <img
                        src={group.avatar}
                        alt={group.name}
                        className='w-12 h-12 rounded-xl'
                      />
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h3 className='font-bold text-gray-900'>
                            {group.name}
                          </h3>
                          {group.isActive && (
                            <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                          )}
                        </div>
                        <p className='text-sm text-gray-600 mb-2'>
                          {group.description}
                        </p>
                        <div className='flex items-center justify-between text-sm text-gray-500'>
                          <span>{group.members} members</span>
                          <span>{group.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                    <button className='w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium'>
                      Join Group
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Study Partners & Plans */}
          <div className='space-y-8'>
            {/* Study Plans */}
            <section>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-gray-900'>Study Plans</h2>
                <button className='p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300'>
                  <Plus className='w-4 h-4' />
                </button>
              </div>
              <div className='space-y-4'>
                {studyPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className='bg-white rounded-2xl p-6 shadow-lg'
                  >
                    <div className='flex items-center justify-between mb-3'>
                      <h3 className='font-bold text-gray-900'>{plan.title}</h3>
                      <span className='text-sm text-gray-500'>
                        {plan.progress}%
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2 mb-3'>
                      <div
                        className='bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300'
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                    <div className='flex items-center justify-between text-sm text-gray-600'>
                      <span>
                        {plan.completedTasks}/{plan.totalTasks} tasks
                      </span>
                      <span>Due: {plan.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Suggested Partners */}
            <section>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-gray-900'>
                  Suggested Partners
                </h2>
                <button className='text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 text-sm'>
                  See More <ArrowRight className='w-4 h-4' />
                </button>
              </div>
              <div className='space-y-4'>
                {suggestedPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className='bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300'
                  >
                    <div className='flex items-center gap-3 mb-3'>
                      <img
                        src={partner.avatar}
                        alt={partner.name}
                        className='w-10 h-10 rounded-xl'
                      />
                      <div className='flex-1'>
                        <h3 className='font-bold text-gray-900 text-sm'>
                          {partner.name}
                        </h3>
                        <p className='text-xs text-gray-600'>
                          {partner.major} • {partner.year}
                        </p>
                      </div>
                      <div className='text-right'>
                        <div
                          className={`text-xs font-bold px-2 py-1 rounded-full ${
                            partner.matchScore >= 90
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {partner.matchScore}% match
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-1 mb-3'>
                      {partner.interests.slice(0, 2).map((interest, idx) => (
                        <span
                          key={idx}
                          className='px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs'
                        >
                          {interest}
                        </span>
                      ))}
                      {partner.interests.length > 2 && (
                        <span className='px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs'>
                          +{partner.interests.length - 2}
                        </span>
                      )}
                    </div>
                    <button className='w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-sm font-medium'>
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
