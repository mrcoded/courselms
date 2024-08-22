"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface ChapterActionsProps {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
  chapterId: string;
}

const ChapterActions = ({
  chapterId,
  courseId,
  isPublished,
  disabled,
}: ChapterActionsProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
      }
      toast({
        title: "Success",
        description: "Chapter published",
      });

      router.refresh();
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast({
        title: "Success",
        description: "Chapter deleted",
      });
      router.refresh();
      router.push(`/tutor/courses/${courseId}`);
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
