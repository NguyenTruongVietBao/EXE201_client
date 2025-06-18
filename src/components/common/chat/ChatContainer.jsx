import React from 'react';
import MessageSkeleton from './MessageSkeleton';
import NoChatSelected from './NoChatSelected';

export default function ChatContainer() {
  return (
    <div className='flex-1 flex flex-col'>
      <MessageSkeleton />
    </div>
  );
}
