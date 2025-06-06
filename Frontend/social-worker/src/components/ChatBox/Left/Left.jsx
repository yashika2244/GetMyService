import React from 'react'
import Search from './Search'
import { AiOutlineMessage } from "react-icons/ai";
import User from './User';
function Left() {
  return (
    <div className=' h-full bg-black text-white'>
        <div className='flex font-[700] md:text-3xl text-2xl p-2 px-7 gap-2 items-center'>
             <AiOutlineMessage   />
        <h1 className=''>Chats</h1>

        </div>
       
        <Search/>
        <hr />
        <User/>
      
    </div>
  )
}

export default Left
