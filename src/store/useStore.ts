import { create } from 'zustand';

interface InvitationState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  recipientName: string;
  setRecipientName: (name: string) => void;
}

const useStore = create<InvitationState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  recipientName: '', // Tambahkan state baru
  setRecipientName: (name) => set({ recipientName: name }), // Tambahkan fungsi baru
}));

export default useStore;
