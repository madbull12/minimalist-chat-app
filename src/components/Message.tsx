import { MessageProps, PreviewURL } from "@/types";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import URLPreviewCard from "./URLPreviewCard";



const Message = async({ text }: { text: string }) => {
  //regex to check if a string contains urls.
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex);


  // const[urlPreview,setUrlPreview] = useState<PreviewURL>();

  // useEffect(()=>{
  //   const getUrlPreview = async (url: string) => {
  //     const res = await fetch(
  //       `https://api.linkpreview.net?key=${process.env.NEXT_PUBLIC_LINK_PREVIEW_API_KEY}&q=${url}`
  //     );
  //     const data = await res.json();
    
  //     setUrlPreview(data);
  //   };

    
  //   getUrlPreview(Array.isArray(urls) ? urls[0] : "");
  //   console.log(urlPreview)
  // },[])


  return (
    <div className="w-auto rounded-lg bg-secondary text-secondary-foreground p-2">
      {text.split(urlRegex).map((text, index) =>
        // Wrap URLs in Link tags
        urls && urls.includes(text) ? (
          <>
            <Link
              key={index}
              className="underline"
              href={text}
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </Link>
            <URLPreviewCard url={Array.isArray(urls) ? urls[0] : "" }  />
          </>
        ) : (
          text
        )
      )}
    </div>
  );
};

export default Message