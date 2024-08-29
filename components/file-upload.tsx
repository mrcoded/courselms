"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "./ui/use-toast";

interface FileUploadProps {
  onchange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onchange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onchange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast({ title: "Error", description: `${error?.message}` });
      }}
    />
  );
};
