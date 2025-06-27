import React from 'react';
import {
  BookOpenText,
  ShoppingCart,
  UsersRound,
  BrainCircuit,
  ArrowRight,
  SearchCode,
  MessageSquareQuote,
  Sparkles,
  CheckCircle,
  FileText,
  Users,
  Star,
  Target,
  Zap,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Shield,
  Heart,
  UserPlus,
} from 'lucide-react';
import { Link } from 'react-router';

export default function LandingPage() {
  const features = [
    {
      icon: <BookOpenText className='w-12 h-12 text-blue-600' />,
      title: 'Chia sẻ & Khám phá Tài liệu',
      description:
        'Dễ dàng tải lên, chia sẻ và tìm kiếm tài liệu học tập, ghi chú và bài nghiên cứu từ thư viện cộng đồng phong phú.',
      gradient: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-100',
    },
    {
      icon: <ShoppingCart className='w-12 h-12 text-emerald-600' />,
      title: 'Mua bán Tài liệu',
      description:
        'Kiếm tiền từ công sức của bạn hoặc tìm kiếm các tài liệu chất lượng cao trong marketplace an toàn.',
      gradient: 'from-emerald-50 to-emerald-100',
      iconBg: 'bg-emerald-100',
    },
    {
      icon: <UsersRound className='w-12 h-12 text-purple-600' />,
      title: 'Tìm Bạn và Nhóm',
      description:
        'Kết nối với những sinh viên cùng chí hướng, tạo nhóm học tập và cộng tác trong các dự án.',
      gradient: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-100',
    },
    {
      icon: <BrainCircuit className='w-12 h-12 text-orange-600' />,
      title: 'Hỗ trợ AI Thông minh',
      description:
        'Tận dụng công cụ AI để tóm tắt tài liệu, hỏi đáp và hỗ trợ học tập được cá nhân hóa.',
      gradient: 'from-orange-50 to-orange-100',
      iconBg: 'bg-orange-100',
    },
  ];

  const howItWorksSteps = [
    {
      icon: <UserPlus className='w-10 h-10 text-white' />,
      title: 'Đăng ký Miễn phí',
      description:
        'Tạo tài khoản trong vài phút và tham gia cộng đồng học tập đang phát triển.',
      number: '01',
    },
    {
      icon: <SearchCode className='w-10 h-10 text-white' />,
      title: 'Khám phá & Đóng góp',
      description:
        'Duyệt tài nguyên, tải lên tài liệu hoặc bán sản phẩm trên marketplace.',
      number: '02',
    },
    {
      icon: <MessageSquareQuote className='w-10 h-10 text-white' />,
      title: 'Kết nối & Cộng tác',
      description:
        'Tìm bạn học, tham gia thảo luận và nâng cao việc học với AI.',
      number: '03',
    },
  ];

  const stats = [
    {
      value: '1,500+',
      label: 'Người dùng tham gia',
      icon: <Users className='w-6 h-6 text-emerald-600' />,
    },
    {
      value: '1000+',
      label: 'Tài liệu chia sẻ',
      icon: <FileText className='w-6 h-6 text-blue-600' />,
    },
    {
      value: '450+',
      label: 'Nhóm học tập',
      icon: <UsersRound className='w-6 h-6 text-purple-600' />,
    },
    {
      value: '87%',
      label: 'Đánh giá tích cực',
      icon: <Star className='w-6 h-6 text-yellow-600' />,
    },
  ];

  const testimonials = [
    {
      name: 'Nguyễn Minh Anh',
      role: 'Sinh viên Đại học FPT',
      content:
        'Prilab đã giúp tôi tìm được rất nhiều tài liệu chất lượng cho môn học khó. AI hỗ trợ rất thông minh và chính xác.',
      avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=Minh-Anh',
      rating: 5,
    },
    {
      name: 'Trần Hoàng Nam',
      role: 'Sinh viên Đại học FPT',
      content:
        'Platform này thật tuyệt vời! Tôi đã bán được nhiều tài liệu và kiếm thêm thu nhập trong lúc học.',
      avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=Hoang-Nam',
      rating: 5,
    },
    {
      name: 'Lê Thị Hường',
      role: 'Sinh viên Đại học FPT',
      content:
        'Nhóm học tập trên Prilab giúp tôi kết nối với bạn cùng ngành và cùng nhau tiến bộ.',
      avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=Le-Huong',
      rating: 5,
    },
  ];

  const aiFeatures = [
    {
      icon: <Lightbulb className='w-8 h-8' />,
      title: 'Tóm tắt thông minh',
      description:
        'AI tự động tóm tắt nội dung tài liệu dài thành những điểm chính quan trọng',
    },
    {
      icon: <MessageSquareQuote className='w-8 h-8' />,
      title: 'Hỏi đáp tức thì',
      description:
        'Đặt câu hỏi về tài liệu và nhận câu trả lời chi tiết từ AI trong giây lát',
    },
    {
      icon: <Target className='w-8 h-8' />,
      title: 'Gợi ý cá nhân hóa',
      description:
        'AI phân tích sở thích để đề xuất tài liệu và bạn học phù hợp nhất',
    },
    {
      icon: <BookOpen className='w-8 h-8' />,
      title: 'Lộ trình học tập',
      description:
        'Tạo kế hoạch học tập chi tiết dựa trên mục tiêu và năng lực của bạn',
    },
  ];

  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='py-20 md:py-28 md:pb-32 bg-gradient-to-r from-emerald-50/90 via-white/95 to-cyan-50/90 relative overflow-hidden'>
        {/* Background decorations */}
        <div className='container flex justify-center mx-auto'>
          <div className='grid lg:grid-cols-2 gap-10 items-center'>
            {/* Text Content */}
            <div className='text-center lg:text-left'>
              <div className='inline-flex items-center rounded-full px-4 py-2 mb-6'>
                <Sparkles className='w-4 h-4 text-indigo-600 mr-2' />
                <span className='text-sm font-semibold text-indigo-700'>
                  Trợ Lý Học Tập #1 Cho Bạn
                </span>
              </div>

              <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6'>
                Chia sẻ kiến thức,
                <br />
                <span className='bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent'>
                  Phát triển cùng nhau
                </span>
              </h1>

              <p className='text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed'>
                Nền tảng chia sẻ tài liệu học tập với công nghệ AI tiên tiến.
                Kết nối sinh viên, trao đổi kiến thức và xây dựng cộng đồng học
                tập mạnh mẽ.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start'>
                <Link
                  to={'/login'}
                  className='cursor-pointer bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center group'
                >
                  Bắt đầu ngay
                  <ArrowRight className='w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1' />
                </Link>
                <Link
                  to={'/about'}
                  className=' cursor-pointer bg-white hover:bg-gray-50 text-gray-700 font-semibold border-2 border-gray-200 hover:border-gray-300 px-8 py-4 rounded-2xl transition-all duration-300'
                >
                  Tìm hiểu thêm
                </Link>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                {stats.map((stat, index) => (
                  <div key={index} className='text-center'>
                    <div className='flex items-center justify-center mb-2'>
                      {stat.icon}
                      <span className='text-2xl md:text-3xl font-bold text-gray-900 ml-2'>
                        {stat.value}
                      </span>
                    </div>
                    <p className='text-sm text-gray-600'>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Content */}
            <div className='relative lg:mt-0 mx-auto lg:mx-10 max-w-lg'>
              <div className='relative '>
                {/* Background decorations */}
                <div className='absolute -inset-4 bg-gradient-to-r from-indigo-200 to-cyan-200 rounded-3xl blur-2xl opacity-30'></div>
                <div className='absolute -inset-2 bg-gradient-to-r from-indigo-300 to-cyan-300 rounded-2xl blur-xl opacity-40'></div>

                {/* Main image */}
                <div className='relative bg-white rounded-2xl shadow-2xl'>
                  <img
                    src='./hero-image3.gif'
                    alt='Học tập với AI'
                    className='rounded-xl w-full h-auto object-cover'
                    style={{ aspectRatio: '4/5' }}
                  />

                  {/* Floating elements */}
                  <div className='absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl shadow-lg animate-bounce'>
                    <BrainCircuit className='w-6 h-6 text-white' />
                  </div>

                  <div className='absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg'>
                    <div className='flex items-center'>
                      <Sparkles className='w-5 h-5 text-yellow-500 mr-1' />
                      <span className='font-bold text-gray-900'>#1</span>
                    </div>
                    <p className='text-sm text-gray-600'>Học với AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Study Plan Generation Section */}
      <section className='py-20 md:py-28 relative overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none'></div>

        <div className='container mx-auto px-4 md:px-8'>
          <div className='text-center mb-16'>
            <div className='inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 mb-6'>
              <BrainCircuit className='w-5 h-5 text-purple-600 mr-2' />
              <span className='text-sm font-semibold text-purple-700'>
                Được hỗ trợ bởi AI
              </span>
            </div>

            <h2 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900'>
              Lộ trình học tập
              <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                {' '}
                được AI tạo
              </span>
            </h2>

            <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              AI sẽ tự động tạo lộ trình học tập dựa trên nhu cầu của bạn, từ
              các tài liệu chất lượng cao, giúp bạn dễ dàng bắt đầu hành trình
              học tập một cách có cấu trúc và hiệu quả.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
            {aiFeatures.map((feature, index) => (
              <div
                key={index}
                className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group'
              >
                <div className='bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 w-fit mb-4 group-hover:scale-110 transition-transform duration-300'>
                  {React.cloneElement(feature.icon, {
                    className: 'w-8 h-8 text-white',
                  })}
                </div>
                <h3 className='font-bold text-gray-900 mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className='text-center'>
            <button className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2 mx-auto'>
              Tạo lộ trình của tôi
              <Zap className='w-5 h-5' />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='py-20 md:py-28 bg-gradient-to-br from-indigo-50 via-white to-cyan-50'>
        <div className='container mx-auto px-4 md:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900'>
              Bắt đầu chỉ trong
              <span className='bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent'>
                {' '}
                3 bước
              </span>
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Tham gia và sử dụng Prilab rất đơn giản. Làm theo các bước dễ dàng
              này.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
            {howItWorksSteps.map((step, index) => (
              <div key={index} className='relative group'>
                {index < howItWorksSteps.length - 1 && (
                  <div className='hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-indigo-200 to-cyan-200 transform translate-x-6'></div>
                )}

                <div className='bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 relative'>
                  <div className='absolute -top-4 left-8 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold px-3 py-2 rounded-full'>
                    Bước {step.number}
                  </div>

                  <div className='bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl p-4 inline-block mb-6 group-hover:scale-110 transition-transform duration-300'>
                    {step.icon}
                  </div>

                  <h3 className='text-2xl font-bold mb-4 text-gray-900'>
                    {step.title}
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-20 md:py-28'>
        <div className='container mx-auto px-4 md:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900'>
              Mọi thứ bạn cần để
              <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                {' '}
                thành công
              </span>
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              Nền tảng của chúng tôi cung cấp bộ công cụ toàn diện được thiết kế
              để nâng cao trải nghiệm học tập và hiệu suất học tập của bạn.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2'
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                <div className='relative p-8'>
                  <div
                    className={`${feature.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className='text-xl font-bold mb-4 text-gray-900'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {feature.description}
                  </p>
                </div>

                <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <Sparkles className='w-5 h-5 text-yellow-400' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Integration Highlight */}
      <section className='py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.1),transparent_50%)]'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1),transparent_50%)]'></div>

        <div className='container mx-auto px-4 md:px-8'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div className='text-center lg:text-left'>
              <div className='inline-flex items-center bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-full px-6 py-3 mb-6'>
                <BrainCircuit className='w-5 h-5 text-purple-400 mr-2' />
                <span className='text-sm font-semibold text-purple-300'>
                  Tính năng AI tiên tiến
                </span>
              </div>

              <h2 className='text-4xl md:text-5xl font-bold mb-6 text-white leading-tight'>
                Tăng tốc học tập với
                <span className='bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
                  {' '}
                  trí tuệ nhân tạo
                </span>
              </h2>

              <p className='text-xl text-gray-300 mb-8 leading-relaxed'>
                Các công cụ AI tích hợp của chúng tôi cung cấp tóm tắt thông
                minh, trả lời các câu hỏi phức tạp từ tài liệu của bạn, giúp
                soạn thảo bài luận và đưa ra phản hồi cá nhân hóa để tăng tốc
                quá trình học tập.
              </p>

              <div className='mb-8 space-y-3'>
                {[
                  'Tóm tắt tài liệu thông minh',
                  'Hỗ trợ hỏi đáp được AI hỗ trợ',
                  'Đề xuất học tập được cá nhân hóa',
                  'Hỗ trợ viết bài luận thông minh',
                ].map((feature, index) => (
                  <div key={index} className='flex items-center gap-3'>
                    <CheckCircle className='w-5 h-5 text-green-400 flex-shrink-0' />
                    <span className='text-gray-300'>{feature}</span>
                  </div>
                ))}
              </div>

              <button className='bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2'>
                Khám phá tính năng AI
                <Sparkles className='w-5 h-5' />
              </button>
            </div>

            <div className='relative'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl transform rotate-6'></div>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl transform -rotate-3'></div>

                <div className='relative bg-white rounded-3xl p-6 shadow-2xl'>
                  <div className='bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 text-center'>
                    <BrainCircuit className='w-24 h-24 text-purple-600 mx-auto mb-4' />
                    <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                      AI Assistant
                    </h3>
                    <p className='text-gray-600'>Sẵn sàng hỗ trợ 24/7</p>
                  </div>
                </div>

                <div className='absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-3 shadow-lg animate-bounce'>
                  <Lightbulb className='w-6 h-6 text-white' />
                </div>
                <div className='absolute -bottom-4 -left-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-3 shadow-lg animate-pulse'>
                  <Sparkles className='w-6 h-6 text-white' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 md:py-28'>
        <div className='container mx-auto px-4 md:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900'>
              Sinh viên nói gì về
              <span className='bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
                {' '}
                Prilab
              </span>
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Hàng ngàn sinh viên đã tin tưởng và sử dụng Prilab để nâng cao kết
              quả học tập.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300'
              >
                <div className='flex items-center mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-5 h-5 text-yellow-400 fill-current'
                    />
                  ))}
                </div>

                <p className='text-gray-700 mb-6 leading-relaxed italic'>
                  "{testimonial.content}"
                </p>

                <div className='flex items-center'>
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className='w-12 h-12 rounded-full mr-4'
                  />
                  <div>
                    <h4 className='font-semibold text-gray-900'>
                      {testimonial.name}
                    </h4>
                    <p className='text-sm text-gray-600'>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='py-20 md:py-28 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1),transparent_50%)]'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.1),transparent_50%)]'></div>

        <div className='container mx-auto px-4 md:px-8 text-center relative z-10'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-4xl md:text-6xl font-bold mb-6 text-white leading-tight'>
              Sẵn sàng nâng tầm
              <span className='block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'>
                việc học của bạn?
              </span>
            </h2>

            <p className='text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-2xl mx-auto'>
              Tham gia cùng hàng ngàn sinh viên đã được hưởng lợi từ Prilab.
              Đăng ký ngay hôm nay và thay đổi cách bạn học tập.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
              <button className='bg-white text-blue-600 font-bold text-lg px-10 py-5 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 justify-center group'>
                Tạo tài khoản miễn phí ngay
                <ArrowRight className='w-6 h-6 group-hover:translate-x-1 transition-transform duration-300' />
              </button>

              <button className='border-2 border-white text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300'>
                <Link to='/login'>Đăng nhập</Link>
              </button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-white/20'>
              <div className='text-center'>
                <Shield className='w-8 h-8 text-blue-200 mx-auto mb-2' />
                <p className='text-blue-200 text-sm'>Bảo mật 100%</p>
              </div>
              <div className='text-center'>
                <Heart className='w-8 h-8 text-blue-200 mx-auto mb-2' />
                <p className='text-blue-200 text-sm'>
                  1,500+ Người dùng hài lòng
                </p>
              </div>
              <div className='text-center'>
                <GraduationCap className='w-8 h-8 text-blue-200 mx-auto mb-2' />
                <p className='text-blue-200 text-sm'>100+ Trường đại học</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
