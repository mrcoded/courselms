import { create } from "zustand";
import type { Chapter } from "@prisma/client";

interface ChapterStore {
  chapters: Chapter[];
  setChapters: (chapters: Chapter[]) => void;
}

export const useChapterStore = create<ChapterStore>((set) => ({
  chapters: [],
  setChapters: (chapters) => set(() => ({ chapters })),
}));
