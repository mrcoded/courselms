"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

interface FileUploadProps {
  onchange: (ufsUrl?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onchange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onchange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        toast.error("Error", { description: `${error?.message}` });
      }}
    />
  );
};
