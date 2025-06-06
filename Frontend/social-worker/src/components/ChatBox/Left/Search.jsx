import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import UserGetAtll from "../../../context/UserGetAll";
import useConversation from "../../../stateManage/useConversation.js";
import {toast} from 'react-toastify'

function Search() {

const [search, setSearch] = useState("")
const [allUsers] = UserGetAtll()
const {setSelcetedConversation} = useConversation()
 const handleSubmit  = (e) => {
   e.preventDefaults()
   if(!search) return;
   const conversation = allUsers.find((user)=>{
    return user.name.toLowerCase().includes(search.toLowerCase())
    if(conversation){
      setSelcetedConversation(conversation)
        setSearch("");

    }else{
      alert("User not found")
    }
   })
   
 }
 


  return (
    <div className=" px-4 py-1 md:py-3 pb-3 md:pb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-2">
          <label className="border-[1px] rounded-lg flex items-center gap-2 w-[90%]  border-gray-700 bg-slate-900">
            <input
              type="search"
              className="grow  bg-transparent outline-none  text-slate-200 pl-2 "
              placeholder="Search"
              value={search}
              onChange={(e)=> setSearch(e.target.value)}
            />
          </label>
          <button>
            <IoSearchSharp className=" text-4xl p-2 hover:bg-gray-600 rounded-full duration-300"/>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
