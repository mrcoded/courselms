import { DropResult } from "@hello-pangea/dnd";

import { useChapterStore } from "@/store/useChapterStore";
import useChapterReorder from "@/hooks/use-chapter-reorder";

const useChapterDND = (courseId: string) => {
  //get reorder helper function
  const { onReorder } = useChapterReorder(courseId);

  //get chapters
  const { chapters, setChapters } = useChapterStore((state) => state);

  //handle drag and drop
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  return onDragEnd;
};

export default useChapterDND;
