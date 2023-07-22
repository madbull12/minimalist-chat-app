"use client";

import React, { useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios, { AxiosError } from "axios";
const ChatForm = () => {
  const [message, setMessage] = useState<string>("");
  const messageRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (message.length === 0) return;
    setIsLoading(true);

    try {
      await axios.post("/api/message/send", {
        text: message,
      });
      setMessage("");
      messageRef.current?.focus();
      messageRef.current?.value === "";
    } catch (error) {
      const err = error as AxiosError;
      throw new Error("Oops something went wrong" + err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-4 bottom-0 right-0 left-0 absolute flex items-center gap-x-2">
      <Input
        ref={messageRef}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        value={message}
        placeholder="Message..."
      />
      <Button
        isLoading={isLoading}
        onClick={sendMessage}
        disabled={message.length === 0}
      >
        Send
      </Button>
    </div>
  );
};

export default ChatForm;
