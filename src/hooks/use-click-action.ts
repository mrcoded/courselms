"use client";

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useUpdatingStore } from "@/store/useUpdatingStore";
import { useConfettiStore } from "@/hooks/use-confetti-store";

export const useClickActions = (
  isPublished: boolean,
  courseId: string,
  chapterId?: string
) => {
  const router = useRouter();
  const confetti = useConfettiStore();

  // set loading
  const setIsUpdating = useUpdatingStore((state) => state.setIsUpdating);

  // click action
  const clickAction = isPublished ? "unpublish" : "publish";

  // chapter actions
  const chapterActions = chapterId ? `/chapters/${chapterId}` : "";

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.patch(
        `/api/courses/${courseId}${chapterActions}/${clickAction}`
      );
    },
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: () => {
      setIsUpdating(false);
      if (isPublished) {
        toast.success("Success", {
          description: `${
            chapterActions ? "Chapter" : "Course"
          } Unpublished Successfully`,
        });
      } else {
        toast.success("Success", {
          description: `${
            chapterActions ? "Chapter" : "Course"
          }  published Successfully`,
        });
        // open confetti if it is course actions
        !chapterActions && confetti.onOpen();
      }
      router.refresh();
    },
    onError: (data) => {
      setIsUpdating(false);
      toast.error("Something went wrong", { description: `${data.message}` });
    },
  });

  return { mutate, isPending };
};
