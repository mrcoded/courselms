"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface CourseActionsProps {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
}

const CourseActions = ({
  courseId,
  isPublished,
  disabled,
}: CourseActionsProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast({
          title: "Success",
          description: "Course Unpublished",
        });
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast({
          title: "Success",
          description: "Course published",
        });
        confetti.onOpen();
      }

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

      await axios.delete(`/api/courses/${courseId}`);
      toast({
        title: "Success",
        description: "Course deleted",
      });
      router.refresh();
      router.push(`/tutor/courses`);
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

export default CourseActions;
