import React, { useEffect, useRef } from "react";

import { cn } from "@lib/utils";
import { AnimatePresence, motion } from "framer-motion";

import { Message, loggedInUserData } from "@/app/data";
import Show from '@/utils/Show';
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";

interface ChatListProps {
  messages?: Message[];
}

export function ChatList({
  messages,
}: ChatListProps) {
  const initialRenderRef = useRef<boolean>(true);
  const messageItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialRenderRef.current) return;
    if (!messageItemRef.current) return;

    messageItemRef.current.scrollIntoView(
      { behavior: "smooth", block: "start", inline: "nearest" }
    );

  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
        <AnimatePresence>
          { messages?.map((message, index) => (
            <motion.div
              key={ index }
              layout
              initial={ initialRenderRef.current ? false : { opacity: 0, scale: 1, y: 50, x: 0 } }
              animate={ { opacity: 1, scale: 1, y: 0, x: 0 } }
              exit={ { opacity: 0, scale: 1, y: 1, x: 0 } }
              transition={ {
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              } }
              style={ {
                originX: 0.5,
                originY: 0.5,
              } }
              className={ cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.name === "human" ? "items-end" : "items-start"
              ) }
            >
              <div ref={ index === messages.length - 1 ? messageItemRef : null } className="flex gap-3 items-center">
                <Show>
                  <Show.When condition={ message.name === "human" }>
                    <div className=" bg-accent p-3 rounded-md max-w-xs">{ message.message }</div>
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={ "" }
                        alt={ loggedInUserData.name }
                        width={ 6 }
                        height={ 6 }
                      />
                      <AvatarFallback>{ loggedInUserData.name[0] }</AvatarFallback>
                    </Avatar>
                  </Show.When>

                  <Show.Else>
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={ "" }
                        alt={ "ai avatar" }
                        width={ 6 }
                        height={ 6 }
                      />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className=" bg-accent p-3 rounded-md max-w-xs">{ message.message }</div>
                  </Show.Else>
                </Show>
              </div>
            </motion.div>
          )) }
        </AnimatePresence>
      </div>
    </div>
  );
}
