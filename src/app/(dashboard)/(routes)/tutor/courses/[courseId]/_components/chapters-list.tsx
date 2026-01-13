"use client";

import { useEffect, useState } from "react";

import ChapterDND from "./chapter-dnd";

import { ChaptersListProps } from "@/types/input.types";

import useChapterDND from "@/hooks/use-chapter-dnd";
import { useChapterStore } from "@/store/useChapterStore";

export const ChaptersList = ({
  onEdit,
  items,
  courseId,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);

  //handle drag and drop hooks
  const onDragEnd = useChapterDND(courseId);

  //set chapters
  const setChapters = useChapterStore((state) => state.setChapters);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  //nothing is displayed on server side like hydration errors
  if (!isMounted) return null;

  return <ChapterDND onDragEnd={onDragEnd} onEdit={onEdit} />;
};
