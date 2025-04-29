import React from "react";
import { IoIosSearch} from "react-icons/io";
import AccontList from "../account/AccontList";

function Msg() {
 

  return (
    <section className="pt-2 md:p-10  text-black h-screen mb-17">
      <div className=" md:mt-8 mx-auto  mt-9">
        <div className="min-h-screen  sm:w-[650px]  border  border-gray-300 shadow-lg rounded-2xl p-4">
       
          {/* navigation */}
          <h2 className="font-semibold text-2xl">Chats</h2>
        
          {/* search bar */}
          <div className=" mt-4  w-full outline-none border py-1 px-2 rounded-md border-gray-300 flex items-center border-b-2 border-b-blue-800">
            <span className="mr-1 ">
              {" "}
              <IoIosSearch className="text-gray-700" />
            </span>
            <input
              type="search"
              placeholder="Search or start a new chat"
              className="flex-1 p-1 bg-transparent outline-none text-gray-700 md:text-md text-[15px] "
            />
          </div>
        
           {/* scrollable content */}
           <div className="mt-4 max-h-[450px] overflow-y-auto">
            <AccontList />
          </div>
        </div>
      </div>
  </section>



  
  );
}

export default Msg;


