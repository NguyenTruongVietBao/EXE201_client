import React from 'react';
import {
  BookOpenText,
  ShoppingCart,
  UsersRound,
  BrainCircuit,
  Menu,
  LogIn,
  UserPlus,
  ArrowRight,
  SearchCode,
  MessageSquareQuote,
  Facebook,
  Twitter,
  Instagram,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import InterestModel from '../components/common/InterestModel';
import HeroSection from '../components/common/HeroSection';

export default function LandingPage() {
  const features = [
    {
      icon: <BookOpenText className='w-12 h-12 text-blue-600' />,
      title: 'Share & Discover Documents',
      description:
        'Easily upload, share, and find study materials, notes, and research papers from a vast community library.',
      gradient: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-100',
    },
    {
      icon: <ShoppingCart className='w-12 h-12 text-emerald-600' />,
      title: 'Buy & Sell Notes',
      description:
        'Monetize your hard work or find premium study guides in our secure marketplace.',
      gradient: 'from-emerald-50 to-emerald-100',
      iconBg: 'bg-emerald-100',
    },
    {
      icon: <UsersRound className='w-12 h-12 text-purple-600' />,
      title: 'Find Study Buddies',
      description:
        'Connect with like-minded students, form study groups, and collaborate on projects.',
      gradient: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-100',
    },
    {
      icon: <BrainCircuit className='w-12 h-12 text-orange-600' />,
      title: 'AI-Powered Assistance',
      description:
        'Leverage AI tools for document summarization, Q&A, and personalized learning support.',
      gradient: 'from-orange-50 to-orange-100',
      iconBg: 'bg-orange-100',
    },
  ];

  const howItWorksSteps = [
    {
      icon: <UserPlus className='w-10 h-10 text-white' />,
      title: 'Sign Up Free',
      description:
        'Create your account in minutes and join our growing community.',
      number: '01',
    },
    {
      icon: <SearchCode className='w-10 h-10 text-white' />,
      title: 'Explore & Contribute',
      description:
        'Browse resources, upload your documents, or list items on the marketplace.',
      number: '02',
    },
    {
      icon: <MessageSquareQuote className='w-10 h-10 text-white' />,
      title: 'Connect & Collaborate',
      description:
        'Find study partners, join discussions, and enhance your learning with AI tools.',
      number: '03',
    },
  ];

  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <HeroSection />

      {/* Lộ Trình Học Section */}
      <section className='py-20 md:py-28 bg-white relative overflow-hidden'>
        {/* Background decoration */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.05),transparent_50%)] pointer-events-none'></div>

        <div className='container mx-auto px-4 md:px-8'>
          <div className='flex flex-col lg:flex-row items-center gap-16'>
            {/* Left content */}
            <div className='lg:w-1/2 text-center lg:text-left'>
              <h2 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight'>
                Kế Hoạch Học Tập
                <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  {' '}
                  Dành Riêng Cho Bạn
                </span>
              </h2>

              <p className='text-xl text-gray-600 mb-12 leading-relaxed'>
                AI sẽ tự động tạo kế hoạch học tập dựa trên nhu cầu của bạn, từ
                những tài liệu chất lượng, giúp bạn dễ dàng bắt đầu hành trình
                học tập một cách bài bản và hiệu quả.
              </p>

              {/* Learning path steps */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
                <div className='bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center'>
                      <span className='text-white font-bold text-sm'>1</span>
                    </div>
                    <h3 className='font-bold text-gray-900'>
                      Kế hoạch học tập bài bản
                    </h3>
                  </div>
                </div>

                <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center'>
                      <span className='text-white font-bold text-sm'>2</span>
                    </div>
                    <h3 className='font-bold text-gray-900'>
                      Cá nhân hóa kế hoạch học tập
                    </h3>
                  </div>
                </div>

                <div className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center'>
                      <span className='text-white font-bold text-sm'>3</span>
                    </div>
                    <h3 className='font-bold text-gray-900'>
                      Tài liệu chất lượng
                    </h3>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className='text-center lg:text-left'>
                <p className='text-lg text-emerald-600 font-semibold mb-6'>
                  Không biết bắt đầu từ đâu?
                </p>
                <button className='bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-3 mx-auto lg:mx-0'>
                  Tham gia ngay
                  <ArrowRight className='w-5 h-5' />
                </button>
              </div>
            </div>

            {/* Right illustration */}
            <div className='lg:w-1/2 relative'>
              <div className='relative flex items-center justify-center'>
                {/* 3D Isometric blocks illustration */}
                <div className='relative w-96 h-96 flex items-center justify-center'>
                  {/* Base green block */}
                  <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
                    <div className='relative'>
                      <div className='w-32 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg transform -skew-y-12 shadow-xl'></div>
                      <div className='absolute top-0 left-0 w-32 h-20 bg-gradient-to-br from-emerald-300 to-emerald-500 rounded-lg transform translate-y-2 translate-x-2 -skew-y-12'></div>
                      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl z-10'>
                        01
                      </div>
                    </div>
                  </div>

                  {/* Purple block */}
                  <div className='absolute bottom-16 left-1/2 transform -translate-x-1/4'>
                    <div className='relative'>
                      <div className='w-28 h-18 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg transform -skew-y-12 shadow-xl'></div>
                      <div className='absolute top-0 left-0 w-28 h-18 bg-gradient-to-br from-purple-300 to-purple-500 rounded-lg transform translate-y-2 translate-x-2 -skew-y-12'></div>
                      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg z-10'>
                        02
                      </div>
                    </div>
                  </div>

                  {/* Blue block */}
                  <div className='absolute bottom-32 left-1/2 transform translate-x-1/4'>
                    <div className='relative'>
                      <div className='w-24 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg transform -skew-y-12 shadow-xl'></div>
                      <div className='absolute top-0 left-0 w-24 h-16 bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg transform translate-y-2 translate-x-2 -skew-y-12'></div>
                      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-base z-10'>
                        03
                      </div>
                    </div>
                  </div>

                  {/* Character illustration */}
                  <div className='absolute top-0 right-0 transform translate-x-8 -translate-y-8'>
                    <div className='w-24 h-32 relative'>
                      {/* Head */}
                      <div className='w-12 h-12 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full mx-auto mb-2 relative'>
                        <div className='absolute top-2 left-3 w-1 h-1 bg-gray-800 rounded-full'></div>
                        <div className='absolute top-2 right-3 w-1 h-1 bg-gray-800 rounded-full'></div>
                        <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-gray-800 rounded-full'></div>
                        {/* Hair */}
                        <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-14 h-8 bg-gradient-to-br from-blue-800 to-blue-900 rounded-t-full'></div>
                      </div>

                      {/* Body */}
                      <div className='w-16 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg mx-auto relative'>
                        {/* Arms */}
                        <div className='absolute -left-2 top-2 w-3 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full transform rotate-12'></div>
                        <div className='absolute -right-2 top-2 w-3 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full transform -rotate-12'></div>

                        {/* Legs */}
                        <div className='absolute -bottom-8 left-2 w-3 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full'></div>
                        <div className='absolute -bottom-8 right-2 w-3 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full'></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className='absolute top-8 left-8 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce'></div>
                  <div className='absolute top-16 right-16 w-3 h-3 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-pulse'></div>
                  <div className='absolute bottom-40 left-4 w-5 h-5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-bounce delay-300'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Gradient background */}
      <section className='py-20 md:py-28 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden'>
        {/* Background decoration */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.1),transparent_50%)] pointer-events-none'></div>

        <div className='container mx-auto px-4 md:px-8 text-center relative z-10'>
          <div className='mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900'>
              Get Started in
              <span className='bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent'>
                {' '}
                Minutes
              </span>
            </h2>
            <p className='text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed'>
              Joining and using StudySphere is simple and straightforward.
              Follow these easy steps.
            </p>
            <div className='w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto'>
            {howItWorksSteps.map((step, index) => (
              <div key={index} className='relative group'>
                {/* Connection line */}
                {index < howItWorksSteps.length - 1 && (
                  <div className='hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-indigo-200 to-cyan-200 z-0 transform translate-x-6'></div>
                )}

                <div className='relative z-10 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1'>
                  {/* Step number */}
                  <div className='absolute -top-4 left-8 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold px-3 py-1 rounded-full'>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className='bg-gradient-to-br from-indigo-500 to-cyan-500 text-white rounded-2xl p-4 inline-block mb-6 group-hover:scale-110 transition-transform duration-300'>
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

      {/* AI Integration Highlight - Dark theme với accents */}
      <section className='py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden'>
        {/* Background effects */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.1),transparent_50%)] pointer-events-none'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none'></div>

        <div className='container mx-auto px-4 md:px-8'>
          <div className='flex flex-col lg:flex-row items-center gap-16'>
            {/* Left content */}
            <div className='lg:w-1/2 text-center lg:text-left'>
              <div className='mb-6'>
                <span className='bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text text-sm font-semibold uppercase tracking-wider'>
                  AI-Powered Learning
                </span>
              </div>

              <h2 className='text-4xl md:text-5xl font-bold mb-6 text-white leading-tight'>
                Supercharge Your Studies with
                <span className='bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
                  {' '}
                  AI
                </span>
              </h2>

              <p className='text-xl text-gray-300 mb-8 leading-relaxed'>
                Our integrated AI tools provide intelligent summaries, answer
                complex questions from your documents, help draft essays, and
                offer personalized feedback to accelerate your learning.
              </p>

              {/* Feature list */}
              <div className='mb-8 space-y-3'>
                {[
                  'Intelligent document summarization',
                  'AI-powered Q&A assistance',
                  'Personalized learning recommendations',
                  'Smart essay writing help',
                ].map((feature, index) => (
                  <div key={index} className='flex items-center gap-3'>
                    <CheckCircle className='w-5 h-5 text-green-400 flex-shrink-0' />
                    <span className='text-gray-300'>{feature}</span>
                  </div>
                ))}
              </div>

              <button className='bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2'>
                Explore AI Features
                <Sparkles className='w-5 h-5' />
              </button>
            </div>

            {/* Right image */}
            <div className='lg:w-1/2 relative'>
              <div className='relative'>
                {/* Decorative background */}
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl transform rotate-6'></div>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl transform -rotate-3'></div>

                {/* Main image container */}
                <div className='relative bg-white rounded-3xl p-2 shadow-2xl'>
                  <img
                    src='https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=Amaya'
                    alt='AI powered learning'
                    className='rounded-2xl w-full h-auto'
                  />
                </div>

                {/* Floating elements */}
                <div className='absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-3 shadow-lg animate-bounce'>
                  <BrainCircuit className='w-6 h-6 text-white' />
                </div>
                <div className='absolute -bottom-4 -left-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-3 shadow-lg animate-pulse'>
                  <Sparkles className='w-6 h-6 text-white' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Background trắng với cards gradient */}
      <section className='py-20 md:py-28 bg-gray-50'>
        <div className='container mx-auto px-4 md:px-8 text-center'>
          <div className='mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900'>
              Everything You Need to
              <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                {' '}
                Succeed
              </span>
            </h2>
            <p className='text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed'>
              Our platform offers a comprehensive suite of tools designed to
              enhance your learning experience and academic performance.
            </p>
            <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full'></div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2'
              >
                {/* Gradient background overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                <div className='relative p-8'>
                  {/* Icon container */}
                  <div
                    className={`${feature.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className='text-xl font-bold mb-4 text-gray-900 group-hover:text-gray-800'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed group-hover:text-gray-700'>
                    {feature.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <Sparkles className='w-5 h-5 text-yellow-400' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Call to Action Section - Final gradient mạnh mẽ */}
      <section className='py-20 md:py-28 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden'>
        {/* Background patterns */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none'></div>

        <div className='container mx-auto px-4 md:px-8 text-center relative z-10'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-4xl md:text-6xl font-bold mb-6 text-white leading-tight'>
              Ready to Elevate Your
              <span className='block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'>
                Learning?
              </span>
            </h2>

            <p className='text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-2xl mx-auto'>
              Join thousands of students already benefiting from StudySphere.
              Sign up today and transform the way you study.
            </p>

            {/* CTA Button */}
            <div className='relative inline-block'>
              <button className='bg-white text-blue-600 font-bold text-lg px-10 py-5 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 mx-auto group'>
                Create Your Free Account Now
                <ArrowRight className='w-6 h-6 group-hover:translate-x-1 transition-transform duration-300' />
              </button>

              {/* Glow effect */}
              <div className='absolute inset-0 bg-white rounded-2xl opacity-20 blur-xl scale-110 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none'></div>
            </div>

            {/* Trust indicators */}
            <div className='mt-12 pt-8 border-t border-white/20'>
              <p className='text-blue-200 mb-4'>
                Trusted by students worldwide
              </p>
              <div className='flex items-center justify-center gap-8 text-white/60'>
                <span className='text-sm'>🎓 10,000+ Students</span>
                <span className='text-sm'>📚 50,000+ Documents</span>
                <span className='text-sm'>⭐ 4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
