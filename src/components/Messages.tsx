"use client";

import { pusherClient } from "@/lib/pusher";
import { MessageProps } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Message from "./Message";

const Messages = ({ initialMessages }: { initialMessages: MessageProps[] }) => {
  const [messages, setMessages] = useState<MessageProps[]>(initialMessages);
  useEffect(() => {
    pusherClient.subscribe("chat_messages");
    const messageHandler = (message: MessageProps) => {
      setMessages((prev) => [...prev, message]);
    };
    pusherClient.bind("chat_event", messageHandler);
    return () => {
      pusherClient.unsubscribe("chat_messages");
      pusherClient.unbind("chat_event", messageHandler);
    };
  }, []);
  return (
    <div className="flex flex-col items-end gap-y-4 ">
      {messages?.map((message, i) => (
        <Message key={i} message={message} />
      ))}
    </div>
  );
};

export default Messages;
