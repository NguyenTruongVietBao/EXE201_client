import React from 'react';
import { useParams } from 'react-router';

export default function Chat() {
  const { id } = useParams();
  console.log('id', id);
  return (
    <div className='container mx-auto h-full min-h-screen'>
      <h1>Chat</h1>
    </div>
  );
}
