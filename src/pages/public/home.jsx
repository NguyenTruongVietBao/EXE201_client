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
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <BookOpenText className='w-12 h-12 text-primary' />,
      title: 'Share & Discover Documents',
      description:
        'Easily upload, share, and find study materials, notes, and research papers from a vast community library.',
    },
    {
      icon: <ShoppingCart className='w-12 h-12 text-primary' />,
      title: 'Buy & Sell Notes',
      description:
        'Monetize your hard work or find premium study guides in our secure marketplace.',
    },
    {
      icon: <UsersRound className='w-12 h-12 text-primary' />,
      title: 'Find Study Buddies',
      description:
        'Connect with like-minded students, form study groups, and collaborate on projects.',
    },
    {
      icon: <BrainCircuit className='w-12 h-12 text-primary' />,
      title: 'AI-Powered Assistance',
      description:
        'Leverage AI tools for document summarization, Q&A, and personalized learning support.',
    },
  ];

  const howItWorksSteps = [
    {
      icon: <UserPlus className='w-10 h-10 text-secondary' />,
      title: 'Sign Up Free',
      description:
        'Create your account in minutes and join our growing community.',
    },
    {
      icon: <SearchCode className='w-10 h-10 text-secondary' />,
      title: 'Explore & Contribute',
      description:
        'Browse resources, upload your documents, or list items on the marketplace.',
    },
    {
      icon: <MessageSquareQuote className='w-10 h-10 text-secondary' />,
      title: 'Connect & Collaborate',
      description:
        'Find study partners, join discussions, and enhance your learning with AI tools.',
    },
  ];
  return (
    <main>
      {/* Hero Section */}
      <section
        className='hero min-h-screen'
        style={{
          backgroundImage:
            'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
        }}
      >
        <div className='hero-overlay bg-opacity-70 bg-neutral'></div>
        <div className='hero-content text-center text-neutral-content py-20'>
          <div className='max-w-2xl'>
            <h1 className='mb-6 text-4xl md:text-6xl font-bold leading-tight'>
              Unlock Your Learning Potential
            </h1>
            <p className='mb-8 text-lg md:text-xl'>
              Join StudySphere: Share documents, buy & sell notes, find study
              partners, and leverage cutting-edge AI tools to supercharge your
              academic journey.
            </p>
            <button className='btn btn-primary btn-lg'>
              Get Started Free <ArrowRight className='w-5 h-5 ml-2' />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 md:py-24 bg-base-200'>
        <div className='container mx-auto px-4 md:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Everything You Need to Succeed
          </h2>
          <p className='text-lg text-base-content opacity-80 mb-12 max-w-2xl mx-auto'>
            Our platform offers a comprehensive suite of tools designed to
            enhance your learning experience and academic performance.
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300'
              >
                <figure className='px-10 pt-10'>{feature.icon}</figure>
                <div className='card-body items-center text-center'>
                  <h3 className='card-title text-xl font-semibold'>
                    {feature.title}
                  </h3>
                  <p className='text-base-content opacity-70 text-sm'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='py-16 md:py-24 bg-base-100'>
        <div className='container mx-auto px-4 md:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Get Started in Minutes
          </h2>
          <p className='text-lg text-base-content opacity-80 mb-12 max-w-xl mx-auto'>
            Joining and using StudySphere is simple and straightforward. Follow
            these easy steps.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {howItWorksSteps.map((step, index) => (
              <div key={index} className='p-6'>
                <div className='flex justify-center mb-4'>
                  <div className='bg-secondary-focus text-secondary-content rounded-full p-3 inline-block'>
                    {step.icon}
                  </div>
                </div>
                <h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
                <p className='text-base-content opacity-70'>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Integration Highlight */}
      <section className='py-16 md:py-24 bg-neutral text-neutral-content'>
        <div className='container mx-auto px-4 md:px-8'>
          <div className='flex flex-col lg:flex-row items-center gap-12'>
            <div className='lg:w-1/2 text-center lg:text-left'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Supercharge Your Studies with AI
              </h2>
              <p className='text-lg opacity-80 mb-6'>
                Our integrated AI tools provide intelligent summaries, answer
                complex questions from your documents, help draft essays, and
                offer personalized feedback to accelerate your learning.
              </p>
              <button className='btn btn-primary'>Explore AI Features</button>
            </div>
            <div className='lg:w-1/2'>
              {/* Placeholder for an AI-related image or animation */}
              <img
                src='https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=Amaya'
                alt='AI powered learning'
                className='rounded-lg shadow-xl mx-auto'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='py-16 md:py-24 bg-base-100 text-center'>
        <div className='container mx-auto px-4 md:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Ready to Elevate Your Learning?
          </h2>
          <p className='text-lg text-base-content opacity-80 mb-8 max-w-xl mx-auto'>
            Join thousands of students already benefiting from StudySphere. Sign
            up today and transform the way you study.
          </p>
          <button className='btn btn-primary btn-lg'>
            Create Your Free Account Now <ArrowRight className='w-5 h-5 ml-2' />
          </button>
        </div>
      </section>
    </main>
  );
}
