"use client";

import React from 'react';

import { ScrollArea } from '@ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';

import { Message, UserData } from '@/app/data';

import ChatBottombar from '../chat/chat-bottombar';
import { ChatList } from '../chat/chat-list';



interface WorkspaceProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

function Workspace({ messages, selectedUser, isMobile }: WorkspaceProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? []
  );

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };

  const scrollAreaStyle = "h-[70dvh] lg:h-[60dvh] rounded-md border";

  return (
    <main className="flex flex-1 flex-col gap-4 p-12 lg:gap-6 lg:p-20">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="flow">Flow</TabsTrigger>
          <TabsTrigger value="graph">Graph</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <ScrollArea className={ scrollAreaStyle }>
            <ChatList
              messages={ messagesState }
              selectedUser={ selectedUser }
            />
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
