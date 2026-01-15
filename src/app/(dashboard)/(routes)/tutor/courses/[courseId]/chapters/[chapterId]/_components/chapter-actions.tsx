"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

import { ChapterActionsProps } from "@/types/form.types";

import { useUpdatingStore } from "@/store/useUpdatingStore";

import { useClickActions } from "@/hooks/use-click-action";
import { useDeleteActions } from "@/hooks/use-delete-actions";

const ChapterActions = ({
  chapterId,
  courseId,
  isPublished,
  disabled,
}: ChapterActionsProps) => {
  //Course Click Action hooks
  const { mutate: onChapterClickHandler, isPending: chapterClickUpdating } =
    useClickActions(isPublished, courseId, chapterId);

  //onDelete handler
  const { mutate: deleteChapterHandler, isPending: isChapterDeleting } =
    useDeleteActions(courseId, chapterId);

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={() => onChapterClickHandler()}
        disabled={disabled || chapterClickUpdating}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={() => deleteChapterHandler(undefined)}>
        <Button size="sm" disabled={isChapterDeleting}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
