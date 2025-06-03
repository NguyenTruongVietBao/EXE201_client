import React from 'react';
import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold text-primary'>404</h1>
          <p className='py-6 text-primary'>
            Page not found or you don't have permission access this page
          </p>
          <Link to='/' className='btn btn-primary'>
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
