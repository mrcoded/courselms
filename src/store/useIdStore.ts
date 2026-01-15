import { create } from "zustand";

// Define types for state & actions
interface GetIdState {
  getId: string | null | undefined;
  setGetId: (id: string | null | undefined) => void;
}

// Create store using the curried form of `create`
export const useGetIdStore = create<GetIdState>()((set) => ({
  getId: "",
  setGetId: (getId) => set(() => ({ getId })),
}));
