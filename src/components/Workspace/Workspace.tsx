import React, { useEffect, useState } from 'react';

import { useChat } from '@/context/chat_context';
import { getGroups, getMessages, getTitle } from '@/data/messages';
import { Message } from '@interface/data';
import { ScrollArea } from '@ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';

import ChatBottombar from './chat/chat-bottombar';
import { ChatList } from './chat/chat-list';
import Flow from './flow/flow';

interface WorkspaceProps {
  isMobile: boolean;
}

const scrollAreaStyle = "h-[70dvh] rounded-md border";

function Workspace({ isMobile }: WorkspaceProps) {
  const { activeChat, activeGroup } = useChat();
  const [messagesState, setMessages] = useState<Message[]>(
    getMessages(activeChat, activeGroup)
  );

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };

  useEffect(() => {
    setMessages(getMessages(activeChat, activeGroup));
  }, [activeChat, activeGroup]);

  return (
    <main className="flex flex-1 flex-col gap-3 p-8 lg:gap-6">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList>
          <TabsTrigger value="chat">Message</TabsTrigger>
          <TabsTrigger value="flow">Flow</TabsTrigger>
          <TabsTrigger value="graph">Graph</TabsTrigger>
          <TabsTrigger value="flies">Files</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <ScrollArea className={ scrollAreaStyle }>
            <ChatList messages={ messagesState } />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="flow">
          <Flow titles={ getTitle(activeChat) } subtitles={ getGroups(activeChat) } />
        </TabsContent>

        <TabsContent value="graph">
          <ScrollArea className={ scrollAreaStyle }>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="files">
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

