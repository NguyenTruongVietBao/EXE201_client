import React from 'react';
import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className='hero bg-primary min-h-screen'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold text-secondary-content'>404</h1>
          <p className='py-6 text-secondary-content'>
            Page not found or you don't have permission access this page
          </p>
          <Link to='/' className='btn btn-secondary'>
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
