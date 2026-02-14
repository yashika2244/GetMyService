
import { create } from 'zustand';

const useConversation = create((set) => ({
  selcetedConversation: null,
  setSelcetedConversation: (selcetedConversation) => set({ selcetedConversation }),

  messages: [],
  setMessages: (updater) =>
    set((state) => ({
      messages:
        typeof updater === "function" ? updater(state.messages) : updater,
    })),

  unreadCounts: {},

  // Unread increment karne ka function
  increaseUnreadCount: (userId) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [userId]: (state.unreadCounts[userId] || 0) + 1,
      },
    })),

  //  Reset (clear) count without deleting key
  clearUnreadCount: (userId) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [userId]: 0, //  Set to 0 instead of deleting
      },
    })),
}));

export default useConversation;
