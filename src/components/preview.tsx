"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill-new/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );

  return (
    <div>
      <h1 className="text-center mt-2 font-semibold text-sm sm:text-base">
        Chapter Description
      </h1>
      <ReactQuill theme="bubble" value={value} readOnly />
    </div>
  );
};
