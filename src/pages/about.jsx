import React from 'react';

export default function AboutPage() {
  const features = [
    {
      icon: '📚',
      title: 'Quản lý tài liệu thông minh',
      description:
        'Hệ thống quản lý tài liệu hiện đại với khả năng tìm kiếm, phân loại và tổ chức tự động.',
    },
    {
      icon: '🔒',
      title: 'Bảo mật cao cấp',
      description:
        'Đảm bảo an toàn tuyệt đối cho tài liệu của bạn với công nghệ mã hóa tiên tiến.',
    },
    {
      icon: '👥',
      title: 'Chia sẻ và cộng tác',
      description:
        'Dễ dàng chia sẻ tài liệu và làm việc nhóm một cách hiệu quả và an toàn.',
    },
    {
      icon: '☁️',
      title: 'Lưu trữ đám mây',
      description:
        'Truy cập tài liệu mọi lúc, mọi nơi với hệ thống lưu trữ đám mây đáng tin cậy.',
    },
    {
      icon: '🚀',
      title: 'Hiệu suất cao',
      description:
        'Tải lên và tải xuống nhanh chóng với công nghệ tối ưu hóa hiệu suất.',
    },
    {
      icon: '📱',
      title: 'Đa nền tảng',
      description:
        'Hoạt động mượt mà trên mọi thiết bị từ máy tính đến điện thoại di động.',
    },
  ];

  const teamMembers = [
    {
      name: 'Nguyễn Văn An',
      role: 'CEO & Founder',
      avatar: '👨‍💼',
      description:
        '10+ năm kinh nghiệm trong lĩnh vực công nghệ và quản lý dự án.',
    },
    {
      name: 'Trần Thị Bình',
      role: 'CTO',
      avatar: '👩‍💻',
      description:
        'Chuyên gia công nghệ với expertise về cloud computing và AI.',
    },
    {
      name: 'Lê Minh Cường',
      role: 'Lead Developer',
      avatar: '👨‍💻',
      description:
        'Full-stack developer với đam mê tạo ra những sản phẩm tuyệt vời.',
    },
    {
      name: 'Phạm Thu Dung',
      role: 'UI/UX Designer',
      avatar: '👩‍🎨',
      description: 'Tạo ra những trải nghiệm người dùng đẹp mắt và dễ sử dụng.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Người dùng tin tưởng' },
    { number: '50,000+', label: 'Tài liệu được quản lý' },
    { number: '99.9%', label: 'Uptime đảm bảo' },
    { number: '24/7', label: 'Hỗ trợ khách hàng' },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4'>
        <div className='container mx-auto text-center'>
          <div className='mb-8'>
            <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6'>
              Prilab
            </h1>
            <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              Nền tảng quản lý và chia sẻ tài liệu thông minh, hiện đại và bảo
              mật hàng đầu Việt Nam
            </p>
          </div>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <button className='px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl'>
              Bắt đầu ngay
            </button>
            <button className='px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300'>
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-white/50 backdrop-blur-sm'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center'>
                <div className='text-3xl md:text-4xl font-bold text-blue-600 mb-2'>
                  {stat.number}
                </div>
                <div className='text-gray-600 font-medium'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-20 px-4'>
        <div className='container mx-auto'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl font-bold text-gray-800 mb-8'>
              Sứ mệnh của chúng tôi
            </h2>
            <p className='text-lg text-gray-600 leading-relaxed mb-12'>
              Chúng tôi tin rằng việc quản lý tài liệu không nên phức tạp. Sứ
              mệnh của chúng tôi là tạo ra một nền tảng đơn giản, mạnh mẽ và an
              toàn, giúp cá nhân và doanh nghiệp tổ chức, chia sẻ và bảo vệ tài
              liệu quan trọng của họ một cách hiệu quả nhất.
            </p>
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white'>
              <h3 className='text-2xl font-bold mb-4'>Tầm nhìn 2030</h3>
              <p className='text-lg opacity-90'>
                Trở thành nền tảng quản lý tài liệu số 1 Đông Nam Á, phục vụ hơn
                1 triệu người dùng và góp phần xây dựng một xã hội số hiện đại,
                hiệu quả.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 px-4 bg-gray-50'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-800 mb-4'>
              Tính năng nổi bật
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Khám phá những tính năng mạnh mẽ giúp bạn quản lý tài liệu một
              cách thông minh và hiệu quả
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
              >
                <div className='text-4xl mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-bold text-gray-800 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-20 px-4'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-800 mb-4'>
              Đội ngũ phát triển
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Gặp gỡ những con người tài năng đang nỗ lực tạo ra sản phẩm tuyệt
              vời mỗi ngày
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {teamMembers.map((member, index) => (
              <div key={index} className='text-center group'>
                <div className='bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300'>
                  {member.avatar}
                </div>
                <h3 className='text-xl font-bold text-gray-800 mb-2'>
                  {member.name}
                </h3>
                <p className='text-blue-600 font-semibold mb-3'>
                  {member.role}
                </p>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className='py-20 px-4 bg-gradient-to-r from-gray-900 to-blue-900 text-white'>
        <div className='container mx-auto text-center'>
          <h2 className='text-4xl font-bold mb-8'>Công nghệ tiên tiến</h2>
          <p className='text-lg opacity-90 max-w-3xl mx-auto mb-12 leading-relaxed'>
            Chúng tôi sử dụng những công nghệ mới nhất và đáng tin cậy nhất để
            đảm bảo hiệu suất, bảo mật và trải nghiệm người dùng tốt nhất.
          </p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {['React', 'Node.js', 'MongoDB', 'AWS'].map((tech, index) => (
              <div
                key={index}
                className='bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300'
              >
                <div className='text-2xl font-bold'>{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50'>
        <div className='container mx-auto text-center'>
          <h2 className='text-4xl font-bold text-gray-800 mb-8'>
            Liên hệ với chúng tôi
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto mb-12'>
            Có câu hỏi hoặc cần hỗ trợ? Đội ngũ của chúng tôi luôn sẵn sàng giúp
            đỡ bạn.
          </p>
          <div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
            <div className='bg-white rounded-xl p-6 shadow-lg'>
              <div className='text-3xl mb-4'>📧</div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Email</h3>
              <p className='text-gray-600'>support@Prilab.vn</p>
            </div>
            <div className='bg-white rounded-xl p-6 shadow-lg'>
              <div className='text-3xl mb-4'>📞</div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Hotline</h3>
              <p className='text-gray-600'>1900-xxxx</p>
            </div>
            <div className='bg-white rounded-xl p-6 shadow-lg'>
              <div className='text-3xl mb-4'>📍</div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Địa chỉ</h3>
              <p className='text-gray-600'>TP. Hồ Chí Minh, Việt Nam</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className='py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-4'>Sẵn sàng bắt đầu?</h2>
          <p className='text-lg opacity-90 mb-8 max-w-2xl mx-auto'>
            Tham gia cùng hàng nghìn người dùng đã tin tưởng Prilab để quản lý
            tài liệu của họ.
          </p>
          <button className='px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl'>
            Đăng ký miễn phí ngay
          </button>
        </div>
      </section>
    </div>
  );
}
