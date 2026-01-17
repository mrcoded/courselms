"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, PlusCircle, Video } from "lucide-react";

import axios from "axios";
import { toast } from "sonner";
import MuxPlayer from "@mux/mux-player-react";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

import { ChapterVideoFormProps, VideoInputValues } from "@/types/form.types";

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // Toggle edit mode
  const toggleEdit = () => setIsEditing((prev) => !prev);

  // Handle form submission
  const onSubmit = async (values: VideoInputValues) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Success", { description: "Chapter Video updated" });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Error", { description: "Something went wrong" });
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer
              className="h-full"
              playbackId={initialData?.muxData?.playbackId || ""}
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onchange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter &apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if videos
          does not appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
