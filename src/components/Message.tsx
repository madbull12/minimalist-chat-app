"use client";

import Link from "next/link";
import React from "react";
import URLPreviewCard from "./URLPreviewCard";
import useHover from "@/app/hooks/use-hover";
import { MessageProps } from "@/types";
import { useRouter } from "next/navigation";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const Message = ({ message }: { message: MessageProps }) => {
  //regex to check if a string contains urls.
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = message?.text?.match(urlRegex);

  const router = useRouter();

  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const { text } = message || "";

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
    <div className="flex  items-end gap-x-1" ref={hoverRef}>
      <div className=" rounded-lg bg-secondary text-secondary-foreground p-2">
        {text?.split(urlRegex).map((text, index) =>
          // Wrap URLs in Link tags
          urls && urls.includes(text) ? (
            <div key={index}>
              <Link
                key={index}
                className="underline"
                href={text}
                target="_blank"
                rel="noopener noreferrer"
              >
                {text}
              </Link>
              <URLPreviewCard url={urls[0]} />
            </div>
          ) : (
            text
          )
        )}
      </div>
      <div
        className={`${
          !isHovered ? "invisible " : ""
        } `}
      >
        <ConfirmDeleteDialog message={message} />
      </div>
    </div>
  );
};

export default Message;
