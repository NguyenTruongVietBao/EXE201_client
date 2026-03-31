import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  CheckCircle,
  FileText,
  GraduationCap,
  Heart,
  Lightbulb,
  SearchCode,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Target,
  Users,
  UsersRound,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

export default function LandingPage() {
  const categories = [
    { name: 'Kinh tế', count: '120+ tài liệu', icon: <Target /> },
    { name: 'Công nghệ', count: '450+ tài liệu', icon: <SearchCode /> },
    { name: 'Ngôn ngữ', count: '280+ tài liệu', icon: <BookOpenText /> },
    { name: 'Kỹ năng', count: '150+ tài liệu', icon: <Lightbulb /> },
  ];

  const featuredDocs = [
    {
      title: 'Tóm tắt Marketing căn bản',
      author: 'Minh Anh',
      price: '25,000đ',
      rating: 4.8,
      pages: 12,
      tag: 'Bán chạy',
    },
    {
      title: 'Cấu trúc dữ liệu & Giải thuật',
      author: 'Hoàng Nam',
      price: 'Miễn phí',
      rating: 5.0,
      pages: 45,
      tag: 'Tài liệu tốt',
    },
    {
      title: 'Kinh tế vi mô nâng cao',
      author: 'Lê Hường',
      price: '30,000đ',
      rating: 4.9,
      pages: 28,
      tag: 'Mới',
    },
  ];

  const stats = [
    { value: '1.5k+', label: 'Học viên', icon: <Users /> },
    { value: '1k+', label: 'Tài liệu', icon: <FileText /> },
    { value: '450+', label: 'Nhóm học', icon: <UsersRound /> },
    { value: '98%', label: 'Hài lòng', icon: <Heart /> },
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden font-sans">
      {/* Hero Section - Lush Market Focus */}
      <section className="relative pt-20 pb-32 md:pt-40 md:pb-48 bg-mesh-gradient overflow-hidden">
        {/* Floating Decorative Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-[100px] -z-10 animate-float"></div>

        <div className="container relative mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/80 backdrop-blur-md rounded-full border border-white shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-gray-700">
                  Hệ sinh thái học tập AI số 1
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight">
                Kho tàng tri thức <br />
                <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  Nâng tầm việc học
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
                Nền tảng chia sẻ và mua bán tài liệu học tập thông minh. Kết nối sinh viên toàn quốc
                cùng công nghệ AI hỗ trợ tóm tắt kiến thức tức thì.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 mb-12">
                <Link
                  to={'/login'}
                  className="px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all duration-300 shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
                >
                  Bắt đầu ngay
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={'/about'}
                  className="px-10 py-5 bg-white text-gray-700 font-bold rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                >
                  Tìm hiểu thêm
                </Link>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual Hero Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative lg:ml-auto w-full max-w-xl"
            >
              {/* Stacked Cards Mockup */}
              <div className="relative group">
                {/* Background Shadow Card */}
                <div className="absolute top-8 left-8 w-full h-full bg-cyan-100/50 rounded-3xl -rotate-6 transition-transform group-hover:-rotate-3 duration-500"></div>
                <div className="absolute top-4 left-4 w-full h-full bg-indigo-50 rounded-3xl rotate-3 transition-transform group-hover:rotate-1 duration-500"></div>

                {/* Top Interactive Card */}
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-50 overflow-hidden">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                      <BrainCircuit className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-950">AI Learning Hub</h3>
                      <p className="text-xs text-gray-400">Đang tóm tắt tài liệu...</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '70' }}
                        className="h-full bg-indigo-500"
                      />
                    </div>
                    <div className="h-2 w-2/3 bg-gray-50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '40' }}
                        transition={{ delay: 0.3 }}
                        className="h-full bg-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                      <FileText className="w-5 h-5 mx-auto mb-2 text-indigo-500" />
                      <span className="text-[10px] font-black block uppercase text-gray-400">
                        PDFs
                      </span>
                      <span className="text-sm font-bold text-gray-950">4.5GB</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                      <Star className="w-5 h-5 mx-auto mb-2 text-amber-400" />
                      <span className="text-[10px] font-black block uppercase text-gray-400">
                        Rating
                      </span>
                      <span className="text-sm font-bold text-gray-950">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Floating Element */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-10 -left-6 md:-left-20 p-6 lush-glass rounded-3xl border border-white shadow-xl max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span className="font-bold text-gray-800 text-sm">AI Recommendation</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Dựa trên lịch sử của bạn, chúng tôi gợi ý tài liệu Marketing...
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories Bar */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 bg-gray-50 rounded-3xl flex items-center gap-5 transition-colors hover:bg-gray-100 cursor-pointer border border-transparent hover:border-gray-200"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600">
                  {React.cloneElement(cat.icon, { className: 'w-7 h-7' })}
                </div>
                <div>
                  <h4 className="font-bold text-gray-950">{cat.name}</h4>
                  <p className="text-xs text-gray-400">{cat.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Documents Section - Marketplace Feel */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Tài liệu nổi bật
              </h2>
              <p className="text-xl text-gray-500">
                Được cộng đồng sinh viên đánh giá cao nhất tuần này.
              </p>
            </div>
            <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all">
              Xem tất cả tài liệu
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredDocs.map((doc, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-indigo-50 to-cyan-50 relative p-8 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase text-indigo-600 tracking-wider shadow-sm">
                    {doc.tag}
                  </div>
                  <FileText className="w-24 h-24 text-indigo-200" />
                  {/* Decorative Mesh in card header */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-200/40 rounded-full blur-3xl"></div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-3 h-3 ${idx < Math.floor(doc.rating) ? 'text-amber-400 fill-current' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-400">{doc.rating}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-950 mb-4 leading-tight group-hover:text-indigo-600 truncate">
                    {doc.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                      {doc.author[0]}
                    </div>
                    <span className="text-sm font-semibold text-gray-500">{doc.author}</span>
                    <span className="text-gray-200">•</span>
                    <span className="text-sm font-semibold text-gray-500">{doc.pages} trang</span>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <span className="text-2xl font-black text-gray-950">{doc.price}</span>
                    <button className="p-3 bg-gray-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Showcase - Lush Soft Style */}
      <section className="py-20 md:py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-indigo-100 rounded-full blur-[100px] opacity-40"></div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="relative bg-white p-10 rounded-[40px] shadow-2xl border border-gray-50"
              >
                <div className="flex items-start gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-950 mb-2 mt-1">AI Assistant</h3>
                    <p className="text-gray-500">Phân tích tài liệu trong tích tắc.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      q: 'Tài liệu này nói về gì?',
                      a: 'Tóm tắt các khái niệm Marketing căn bản...',
                    },
                    {
                      q: 'Có những điểm lưu ý nào?',
                      a: 'Phân tích 4P, SWOT và chiến lược thương hiệu...',
                    },
                  ].map((chat, i) => (
                    <div key={i} className="space-y-3">
                      <div className="p-4 bg-gray-50 rounded-2xl rounded-tl-none border border-gray-100 text-sm italic text-gray-600 ml-8">
                        {chat.q}
                      </div>
                      <div className="p-4 bg-indigo-50 rounded-2xl rounded-tr-none border border-indigo-100 text-sm font-semibold text-indigo-700 mr-8">
                        {chat.a}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-indigo-50 text-indigo-700 rounded-full font-bold text-xs uppercase tracking-widest">
                <BrainCircuit className="w-3 h-3" />
                <span>Hỗ trợ AI Toàn diện</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
                Học nhanh hơn gấp <br /> <span className="text-indigo-600">5 lần với AI</span>
              </h2>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed">
                Tích hợp AI trực tiếp vào quá trình đọc tài liệu. Hệ thống sẽ tự động tóm tắt, trả
                lời câu hỏi và gợi ý các lộ trình học tập phù hợp nhất cho riêng bạn.
              </p>

              <ul className="space-y-6 mb-12">
                {[
                  'Tóm tắt tự động các tài liệu dài',
                  'Đề xuất tài liệu thông minh theo sở thích',
                  'Tạo lộ trình học tập cá nhân hóa',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <button className="px-10 py-5 bg-gray-950 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-xl">
                Khám phá AI Learning
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Soft Lush Carousel Feel */}
      <section className="py-20 md:py-40 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Tiếng nói cộng đồng
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              Hàng ngàn sinh viên Đại học FPT và các trường đại học toàn quốc đã tin tưởng Prilab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: 'Minh Anh',
                content:
                  'Prilab giúp mình tìm tài liệu nhanh hơn hẳn, lại còn được AI tóm tắt giúp tiết kiệm khối thời gian!',
                role: 'Sinh viên FPTU',
                avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=Minh-Anh',
              },
              {
                name: 'Hoàng Nam',
                content:
                  'Chỗ này không chỉ có tài liệu học mà còn giúp mình kiếm thêm thu nhập từ các ghi chú cá nhân của mình.',
                role: 'Sinh viên FPTU',
                avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=Hoang-Nam',
              },
              {
                name: 'Lê Thị Hường',
                content:
                  'Giao diện cực kỳ thân thiện và hiện đại. Nhóm học tập giúp mình kết nối được nhiều bạn giỏi.',
                role: 'Sinh viên FPTU',
                avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=Le-Huong',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-xl font-medium text-gray-700 leading-relaxed italic mb-10">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden shadow-inner font-bold text-gray-400 flex items-center justify-center">
                    <img src={t.avatar} alt={t.name} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-950">{t.name}</h4>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Lush Gradient Impact */}
      <section className="py-20 md:py-40 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-full bg-indigo-600 rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-3xl shadow-indigo-200"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 overflow-hidden"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 overflow-hidden"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-8xl font-black mb-10 leading-tight tracking-tight">
                Sẵn sàng để <br /> <span className="text-cyan-300">bắt đầu?</span>
              </h2>
              <p className="text-xl md:text-2xl text-indigo-100 mb-16 max-w-2xl mx-auto leading-relaxed">
                Tham gia cùng cộng đồng học tập đa năng, chia sẻ kiến thức và nhận lại giá trị đích
                thực.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="w-full sm:w-auto px-12 py-6 bg-white text-indigo-600 font-black rounded-3xl hover:bg-gray-50 transition-all shadow-2xl flex items-center justify-center gap-3 group">
                  Tham gia miễn phí ngay
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to="/login"
                  className="font-bold text-white/80 hover:text-white transition-colors"
                >
                  Đã có tài khoản? Đăng nhập
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 pt-16 border-t border-white/10 opacity-70">
                {[
                  { icon: <Shield />, text: '100% An toàn' },
                  { icon: <Heart />, text: 'Tín nhiệm cao' },
                  { icon: <GraduationCap />, text: 'Chuẩn giáo trình' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center gap-3">
                    {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                    <span className="text-xs font-bold uppercase tracking-widest">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
