import React from 'react';

import { Message } from '@/app/data';
import { ScrollArea } from '@ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';

import ChatBottombar from '../chat/chat-bottombar';
import { ChatList } from '../chat/chat-list';

interface WorkspaceProps {
  messages?: Message[];
  isMobile: boolean;
}

function Workspace({ messages, isMobile }: WorkspaceProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? []
  );

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };

  const scrollAreaStyle = "h-[70dvh] rounded-md border";

  return (
    <main className="flex flex-1 flex-col gap-4 p-8 lg:gap-6">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="flow">Flow</TabsTrigger>
          <TabsTrigger value="graph">Graph</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <ScrollArea className={ scrollAreaStyle }>
            <ChatList messages={ messagesState } />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="flow">
          <ScrollArea className={ scrollAreaStyle }>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="graph">
          <ScrollArea className={ scrollAreaStyle }>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="relative h-full w-full">
        <ChatBottombar sendMessage={ sendMessage } isMobile={ isMobile } />
      </div>
    </main>
  );
}

export default Workspace;
