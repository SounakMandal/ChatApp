import React from 'react';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';

interface WorkspaceProps {
  chats: Chat[];
}

function Workspace({ chats }: WorkspaceProps) {
  return (
    <div className={ cn("p-20") }>
      <ScrollArea className={ cn("h-3/4 rounded-md border") }>
        <div className={ cn("p-4") }>
          { chats.map((chat, index) => <ChatDisplay key={ index } chat={ chat } />) }
        </div>
      </ScrollArea>
      <ChatInput />
    </div>
  );
}

export default Workspace;
