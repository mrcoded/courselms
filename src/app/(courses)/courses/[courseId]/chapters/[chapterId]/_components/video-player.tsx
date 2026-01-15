"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import axios from "axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";

import { VideoPlayerProps } from "@/types/chapter.types";
import { useConfettiStore } from "@/hooks/use-confetti-store";

const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isReady, setIsReady] = useState(false);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Sucesss", { description: "Progress updated" });
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error", { description: "Something went wrong" });
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="w-8 h-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <MuxPlayer
            title={title}
            className={cn(
              "h-auto w-auto md:h-2/3 md:w-1/2",
              !isReady && "hidden"
            )}
            playbackId={playbackId}
            onCanPlay={() => setIsReady(true)}
            onEnded={onEnd}
            autoPlay
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
