import React from 'react';
import useAuthStore from '../../stores/useAuthStore';

function Profile() {
  const { user } = useAuthStore();
  return (
    <div className='h-screen container mx-auto'>
      <h1>Profile</h1>
      <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  );
}

export default Profile;
