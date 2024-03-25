import { cn } from '@/lib/utils';
import React from 'react';

interface ChatDisplayProps {
  chat: Chat;
}

function ChatDisplay({ chat }: ChatDisplayProps) {
  return (
    <div className={ cn("m-auto") }>
      <div className={ cn("ml-[5%] mb-[1%] bg-stone-900 border-8 border-solid rounded border-stone-900") }>{ chat.human }</div>
      <div className={ cn("mr-[5%] bg-stone-800 border-8 border-solid rounded border-stone-800") }>{ chat.assistant }</div>
    </div>
  );
}

export default ChatDisplay;
