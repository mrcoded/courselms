"use client";

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useGetIdStore } from "@/store/useIdStore";
import { useUpdatingStore } from "@/store/useUpdatingStore";

export const useDeleteActions = (
  courseId: string,
  chapterId?: string,
  attachmentId?: string
) => {
  const router = useRouter();
  // set id
  const setGetId = useGetIdStore((state) => state.setGetId);

  // set loading
  const setIsUpdating = useUpdatingStore((state) => state.setIsUpdating);

  // chapter actions
  const chapterActions = chapterId ? `/chapters/${chapterId}` : "";

  const { mutate, isPending } = useMutation({
    mutationFn: async (attachmentId?: string) => {
      // attachment actions
      const attachmentActions = attachmentId
        ? `/attachments/${attachmentId}`
        : "";

      await axios.delete(
        `/api/courses/${courseId}${chapterActions}${attachmentActions}`
      );
    },
    onMutate: (variables) => {
      setIsUpdating(true);
      setGetId(variables);
    },
    onSuccess: () => {
      console.log(attachmentId);
      setIsUpdating(true);
      toast.success("Success", {
        description: `${
          attachmentId ? "Attachment" : chapterActions ? "Chapter" : "Course"
        } successfully deleted`,
      });
      {
        // if it is attachment is deleted refresh the page
        attachmentId
          ? router.refresh()
          : //return to course
            router.push(`/tutor/courses/${courseId}`);
      }
    },
    onError: (data) => {
      setIsUpdating(false);
      toast.error("Something went wrong", { description: `${data.message}` });
    },
    onSettled: () => {
      setGetId(null);
    },
  });

  return { mutate, isPending };
};
