import { PreviewURL } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const getUrlPreview = async (url: string) => {
  const res = await fetch(
    `https://api.linkpreview.net?key=${process.env.LINK_PREVIEW_API_KEY}&q=${url}`
  );
  const data = await res.json();

  return data;
};
const URLPreviewCard = async ({ url }: { url: string }) => {
  //extract the hostname from url
  //if preview undefined then make yt.com as base url;
  const preview:PreviewURL = await getUrlPreview(url);
  const { hostname } = new URL(url)

  if(!preview) return <p>Too many requests...</p>


  return (
    <Link
      href={preview.url}
      target="_blank"
      className="flex items-center gap-x-2 cursor-pointer mt-4"
    >
      <Image
        src={preview?.image}
        objectFit="cover"
        width={125}
        height={150}
        alt="preview-image"
      />
      <div className="flex flex-col">
        <p className="text-lg">{hostname}</p>
        <p className="text-sm">{preview.title}</p>
      </div>
    </Link>
  );
};

export default URLPreviewCard;
