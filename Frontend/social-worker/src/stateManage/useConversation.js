import { create } from 'zustand'

const useConversation = create((set) => ({
  selcetedConversation: null,
  setSelcetedConversation: (selcetedConversation) => set({selcetedConversation}),
  messages:[],
  setMessages:(messages)=>
    set({messages})
}))

export default useConversation

