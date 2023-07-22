"use client";

import { pusherClient } from "@/lib/pusher";
import { MessageProps } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";

const Messages = ({ initialMessages }: { initialMessages: MessageProps[] }) => {
  const [messages, setMessages] = useState<MessageProps[]>(initialMessages);
  console.log(messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    pusherClient.subscribe("chat_messages");
    scrollToBottom()
    const messageHandler = (message: MessageProps) => {
      setMessages((prev) => [...prev, message]);
      setTimeout(()=>{
        scrollToBottom();

      },500)

    };
    const deleteMessage = ({ score }:{ score:number}) => {
      console.log(score)
      const newMessages = messages?.filter((prev)=>prev?.timestamp !== score)
      setMessages(newMessages);
    }

    pusherClient.bind("chat_event", messageHandler);
    // pusherClient.bind("delete_chat", deleteMessage)
    return () => {
      pusherClient.unsubscribe("chat_messages");
      pusherClient.unbind("chat_event", messageHandler);
      // pusherClient.unbind("delete_chat", deleteMessage);
    };
  }, []);
  return (
    <div className="flex flex-col w-full sm:w-3/4 md:w-1/2 ml-auto items-end gap-y-4 overflow-y-scroll h-[90vh] scrollbar  ">
      {messages?.map((message, i) => (
        <Message key={i} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
