import React from "react";
import { CiSearch } from "react-icons/ci";
function FindService() {


  return (
    <div className=" md:mt-12 mt-5 flex justify-center bg-gradient-to-b from-blue-50 to-white min-h-screen pt-10 w-full">
      <div className="max-w-[1100px] w-full px-6">
        {/* Page Title */}
        <div className="text-center flex flex-col items-center">
          <h2 className="md:text-4xl text-2xl font-bold text-gray-800 mb-3 0 md:mb-6 animate-fade-in">
            Find a Doctor
          </h2>
          {/* Search Bar  */}
          <div className="max-w-[570px] w-full flex items-center bg-white shadow-lg rounded-xl  px-2 md:px-4 md:py-2 py-1  border border-gray-300 transition-all hover:shadow-xl ">
            <span className="mr-1 md:text-2xl text-sm">
              {" "}
              <CiSearch />
            </span>
            <input
              type="search"
              placeholder="Search for a doctor..."
              className="flex-1 bg-transparent outline-none text-gray-700 md:text-lg text-[15px]"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-2 py-1 md:px-6 md:py-2 font-semibold transition-all duration-300 shadow-md cursor-pointer ">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindService;
