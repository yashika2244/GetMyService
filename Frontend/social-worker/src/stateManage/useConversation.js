import { create } from 'zustand'

const useConversation = create((set) => ({
  selcetedConversation: null,
  setSelcetedConversation: (selcetedConversation) => set({selcetedConversation}),
  messages:[],
  // setMessages:(messages)=>
  //   set({messages}),
   setMessages: (updater) =>
    set((state) => ({
      messages:
        typeof updater === "function" ? updater(state.messages) : updater,
    })),
    


}))

export default useConversation

