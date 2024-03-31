import React from 'react';

import { Message } from '@interface/data';
import { ScrollArea } from '@ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';

import ChatBottombar from '../chat/chat-bottombar';
import { ChatList } from '../chat/chat-list';
import Flow from '../flow/flow';

interface WorkspaceProps {
  messages?: Message[];
  titles: string;
  subtitles: string[];
  isMobile: boolean;
}

const scrollAreaStyle = "h-[70dvh] rounded-md border";

function Workspace({ messages, titles, subtitles, isMobile }: WorkspaceProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? []
  );

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-8 lg:gap-6">
      <Tabs defaultValue="flow" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Message</TabsTrigger>
          <TabsTrigger value="flow">Flow</TabsTrigger>
          <TabsTrigger value="graph">Graph</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <ScrollArea className={ scrollAreaStyle }>
            <ChatList messages={ messagesState } />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="flow">
          <Flow titles={ titles } subtitles={ subtitles } />
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
