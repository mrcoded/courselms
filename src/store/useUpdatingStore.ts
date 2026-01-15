import { create } from "zustand";

// Define types for state & actions
interface isUpdatingState {
  isUpdating: boolean;
  setIsUpdating: (isUpdating: boolean) => void;
}

// Create store using the curried form of `create`
export const useUpdatingStore = create<isUpdatingState>()((set) => ({
  isUpdating: false,
  setIsUpdating: (isUpdating) => set(() => ({ isUpdating })),
}));
