import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isOpen: false,
  setToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));
