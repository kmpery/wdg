import { create } from 'zustand';

interface InvitationState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const useStore = create<InvitationState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export default useStore;
