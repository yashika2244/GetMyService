import React from 'react'

function Loading() {
  return (

  <div className='flex h-screen items-center justify-center bg-slate-800 pb-40'>
      <div className="flex w-52 flex-col gap-4">
        <div className="animate-pulse bg-gradient-to-r from-gray-600 via-gray-600 to-gray-700 rounded-md h-32 w-full"></div>
        <div className="animate-pulse bg-gradient-to-r from-gray-600 via-gray-600 to-gray-700 rounded-md h-4 w-28"></div>
        <div className="animate-pulse bg-gradient-to-r from-gray-600 via-gray-600 to-gray-700 rounded-md h-4 w-full"></div>
        <div className="animate-pulse bg-gradient-to-r from-gray-600 via-gray-600 to-gray-700 rounded-md h-4 w-full"></div>
      </div>
    </div>
  )
}

export default Loading
