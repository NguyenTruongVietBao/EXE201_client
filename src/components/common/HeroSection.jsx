import React from 'react';
import { ArrowRight, CheckCircle, Award, Briefcase } from 'lucide-react';

export default function HeroSection() {
  const stats = [
    {
      value: '250+',
      label: 'Projects',
      icon: <Briefcase className='w-5 h-5 text-primary' />,
    },
    {
      value: '98%',
      label: 'Success Rate',
      icon: <CheckCircle className='w-5 h-5 text-primary' />,
    },
    {
      value: '15+',
      label: 'Awards',
      icon: <Award className='w-5 h-5 text-primary' />,
    },
  ];

  return (
    <section className='bg-base-100 py-16 md:py-24 lg:py-32'>
      <div className='container mx-auto pl-24'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Text Content */}
          <div className='text-center lg:text-left'>
            <p className='text-sm font-medium text-gray-500 uppercase tracking-wider mb-2'>
              Award-Winning Digital Agency
            </p>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-secondary leading-tight'>
              Elevate Your
              <br />
              <span className='text-primary'>Digital Presence</span>
            </h1>
            <p className='mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0'>
              Strategic digital solutions that drive measurable growth and
              create lasting customer connections through innovative technology.
            </p>
            <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
              <button className='btn bg-primary hover:bg-primary/90 text-white rounded-lg px-8 py-3 text-lg font-medium transition-colors duration-300 flex items-center justify-center group'>
                Start Project
                <ArrowRight className='w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1' />
              </button>
              <button className='btn bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-lg px-8 py-3 text-lg font-medium transition-colors duration-300'>
                View Case Studies
              </button>
            </div>
            <div className='mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 text-left'>
              {stats.map((stat) => (
                <div key={stat.label} className='p-4 rounded-lg'>
                  <div className='flex items-center mb-1'>
                    {/* {stat.icon} */}
                    <p className='text-3xl font-bold text-primary mr-2'>
                      {stat.value}
                    </p>
                  </div>
                  <p className='text-sm text-gray-500'>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Content */}
          <div className='relative lg:mt-0 mx-auto lg:mx-0 max-w-lg'>
            <div className='relative transform lg:rotate-3 transition-transform duration-500 hover:rotate-0'>
              <img
                src='https://api.dicebear.com/9.x/micah/svg?seed=Caleb' // Replace with your actual image URL
                alt='Digital Presence'
                className='rounded-xl shadow-2xl w-full h-auto object-cover'
                style={{ aspectRatio: '4/5' }}
              />
              <div className='absolute -top-4 -right-4 sm:top-4 sm:right-4 bg-white p-3 rounded-lg shadow-lg text-xs sm:text-sm'>
                <p className='font-semibold text-gray-900'>
                  <span className='text-base sm:text-lg'>#1</span> Agency
                  Ranking
                </p>
              </div>
              <div className='absolute -bottom-4 -left-4 sm:bottom-6 sm:left-6 bg-white p-3 rounded-lg shadow-lg text-xs sm:text-sm flex items-center'>
                <CheckCircle className='w-4 h-4 text-green-500 mr-2' />
                <div>
                  <p className='font-semibold text-gray-700'>Trusted by</p>
                  <p className='font-bold text-primary'>500+ Companies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
