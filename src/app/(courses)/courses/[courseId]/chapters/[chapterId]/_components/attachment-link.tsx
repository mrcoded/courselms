import React from "react";
import type { Attachment } from "@prisma/client";

const AttachmentLink = ({ attachment }: { attachment: Attachment }) => {
  return (
    <a
      href={attachment.url}
      target="_blank"
      className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
    >
      <p className="line-clamp-1">{attachment.name}</p>
    </a>
  );
};

export default AttachmentLink;
