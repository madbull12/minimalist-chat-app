"use client"

import React from "react";



const Messages = ({ children }:{ children:React.ReactNode}) => {
  return (
    <div className="flex flex-col items-end gap-y-4">
      {children}
  
    </div>
  );
};

export default Messages;
