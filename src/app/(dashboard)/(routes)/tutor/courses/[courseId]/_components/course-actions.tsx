"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

import { CourseActionsProps } from "@/types/input.types";

import { useClickActions } from "@/hooks/use-click-action";
import { useDeleteActions } from "@/hooks/use-delete-actions";

const CourseActions = ({
  courseId,
  isPublished,
  disabled,
}: CourseActionsProps) => {
  //Chapter Click Action hooks
  const { mutate: onCourseClickHandler, isPending: courseIsUpdating } =
    useClickActions(isPublished, courseId);

  //onDelete handler
  const { mutate: deleteCourseHandler, isPending } = useDeleteActions(courseId);

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={() => onCourseClickHandler}
        disabled={disabled || courseIsUpdating}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={() => deleteCourseHandler}>
        <Button size="sm" disabled={isPending}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CourseActions;
