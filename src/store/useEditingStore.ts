import { create } from "zustand";

// Define types for state & actions
interface isEditingState {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

// Create store using the curried form of `create`
export const useEditingStore = create<isEditingState>()((set) => ({
  isEditing: false,
  setIsEditing: (isEditing) => set(() => ({ isEditing })),
}));
