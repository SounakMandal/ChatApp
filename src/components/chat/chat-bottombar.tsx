import React, { useRef, useState } from "react";

import { buttonVariants } from "@ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Textarea } from "@ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";

import { Message, loggedInUserData } from "@/app/data";
import { cn } from "@/lib/utils";
import Show from '@/utils/Show';

import { EmojiPicker } from "./emoji-picker";


interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  sendMessage, isMobile,
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    const newMessage: Message = {
      id: message.length + 1,
      name: loggedInUserData.name,
      avatar: loggedInUserData.avatar,
      message: "👍",
    };
    sendMessage(newMessage);
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: message.length + 1,
        name: loggedInUserData.name,
        avatar: loggedInUserData.avatar,
        message: message.trim(),
      };
      sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="flex justify-between w-full items-center gap-2 absolute bottom-4">
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Link
              href="#"
              className={ cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              ) }
            >
              <PlusCircle size={ 20 } className="text-muted-foreground" />
            </Link>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="w-full p-2">
            <Show>
              <Show.When condition={ message.trim().length === 0 || isMobile }>
                <div className="flex gap-2">
                  <Link
                    href="#"
                    className={ cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "h-9 w-9",
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    ) }
                  >
                    <Mic size={ 20 } className="text-muted-foreground" />
                  </Link>
                  { BottombarIcons.map((icon, index) => (
                    <Link
                      key={ index }
                      href="#"
                      className={ cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "h-9 w-9",
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      ) }
                    >
                      <icon.icon size={ 20 } className="text-muted-foreground" />
                    </Link>
                  )) }
                </div>
              </Show.When>

              <Show.Else>
                <Link
                  href="#"
                  className={ cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  ) }
                >
                  <Mic size={ 20 } className="text-muted-foreground" />
                </Link>
              </Show.Else>
            </Show>
          </PopoverContent>
        </Popover>

        <Show>
          <Show.When condition={ !message.trim() && !isMobile }>
            <div className="flex gap-2">
              { BottombarIcons.map((icon, index) => (
                <Link
                  key={ index }
                  href="#"
                  className={ cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  ) }
                >
                  <icon.icon size={ 20 } className="text-muted-foreground" />
                </Link>
              )) }
            </div>
          </Show.When>
        </Show>
      </div>

      <AnimatePresence initial={ false }>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={ { opacity: 0, scale: 1 } }
          animate={ { opacity: 1, scale: 1 } }
          exit={ { opacity: 0, scale: 1 } }
          transition={ {
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          } }
        >
          <Textarea
            autoComplete="off"
            value={ message }
            ref={ inputRef }
            onKeyDown={ handleKeyPress }
            onChange={ handleInputChange }
            name="message"
            placeholder="Type your message here"
            className=" w-full border rounded-full flex items-center h-6 resize-none overflow-hidden bg-background"
          ></Textarea>
          <div className="absolute right-2 bottom-1  ">
            <EmojiPicker onChange={ (value) => {
              setMessage(message + value);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            } } />
          </div>
        </motion.div>

        { message.trim() ? (
          <Link
            href="#"
            className={ cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            ) }
            onClick={ handleSend }
          >
            <SendHorizontal size={ 20 } className="text-muted-foreground" />
          </Link>
        ) : (
          <Link
            href="#"
            className={ cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            ) }
            onClick={ handleThumbsUp }
          >
            <ThumbsUp size={ 20 } className="text-muted-foreground" />
          </Link>
        ) }
      </AnimatePresence>
    </div>
  );
}
