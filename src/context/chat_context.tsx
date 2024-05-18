import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';

interface Chat {
  activeChat: number;
  activeGroup: number;
  setActiveChat: Dispatch<SetStateAction<number>>;
  setActiveGroup: Dispatch<SetStateAction<number>>;
}

const ChatContext = createContext<Chat | null>(null);

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatContextProvider');
  }
  return context;
}

export function ChatContextProvider({ children }: PropsWithChildren) {
  const [activeChat, setActiveChat] = useState(0);
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <ChatContext.Provider value={ {
      activeChat, setActiveChat,
      activeGroup, setActiveGroup,
    } }>
      { children }
    </ChatContext.Provider>
  );
}
