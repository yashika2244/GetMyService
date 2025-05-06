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

        {/* find service */}
        {/* <div className="flex flex-col md:flex-row md:mt-10 mt-5 md:gap-10 gap-5  md:flex-wrap mb-5">
          <div className="   border  rounded-2xl  ">
          <div className=" flex p-2 gap-2">
            <div className=" w-32 h-36 rounded-lg ">
              <img
                src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-minan1398-675920.jpg&fm=jpg"
                className="h-full object-cover  rounded-lg"
                alt=""
              />
            </div>
            <div className="flex  ">
            <h1>Service care</h1>
            <span className=" flex justify-end">

            <h3>4.8</h3>
            </span>

            </div>

          </div>
          </div>

            
          <div className=" md:w-1/2 py-15  border rounded-2xl ">
            <h1>Service care</h1>
          </div>
          <div className=" md:w-1/2 py-15 border rounded-2xl ">
            <h1>Service care</h1>
          </div>
          <div className=" md:w-1/3 py-15 border rounded-2xl ">
            <h1>Service care</h1>
          </div>
        </div> */}
        <div className="flex flex-wrap gap-5 mt-5 mb-5">
  {/* Card 1 */}
  <div className="w-full md:w-[48%] border border-gray-300 shadow-xl  rounded-2xl relative">
    <h3 className="absolute top-2 right-2 md:mt-4 mt-1 text-yellow-400 px-2 py-1 text-sm font-semibold rounded">
      4.8
    </h3>
    <div className="flex p-2 gap-4">
      <div className="md:w-32 md:h-36 w-28 h-28 rounded-lg overflow-hidden">
        <img
          src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-col md:mt-4 mt-1 ">
        <h1 className="text-lg font-bold">Service care</h1>
        <h2>about</h2>
        <h3 className="mt-3">Loations</h3>
      </div>
    </div>
  </div>

  {/* Card 2 */}
  <div className="w-full md:w-[48%] border border-gray-300 shadow-xl  rounded-2xl relative">
    <h3 className="absolute top-2 right-2 mt-4  text-yellow-400 px-2 py-1 text-sm font-semibold rounded">
      4.8
    </h3>
    <div className="flex p-2 gap-4">
      <div className="w-32 h-36 rounded-lg overflow-hidden">
        <img
          src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-col mt-4 ">
        <h1 className="text-lg font-bold">Service care</h1>
        <h2>about</h2>
        <h3 className="mt-3">Loations</h3>
      </div>
    </div>
  </div>
  <div className="w-full md:w-[48%] border border-gray-300 shadow-xl  rounded-2xl relative">
    <h3 className="absolute top-2 right-2 mt-4  text-yellow-400 px-2 py-1 text-sm font-semibold rounded">
      4.8
    </h3>
    <div className="flex p-2 gap-4">
      <div className="w-32 h-36 rounded-lg overflow-hidden">
        <img
          src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-col mt-4 ">
        <h1 className="text-lg font-bold">Service care</h1>
        <h2>about</h2>
        <h3 className="mt-3">Loations</h3>
      </div>
    </div>
  </div>
  <div className="w-full md:w-[48%] border border-gray-300 shadow-xl  rounded-2xl relative">
    <h3 className="absolute top-2 right-2 mt-4  text-yellow-400 px-2 py-1 text-sm font-semibold rounded">
      4.8
    </h3>
    <div className="flex p-2 gap-4">
      <div className="w-32 h-36 rounded-lg overflow-hidden">
        <img
          src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-col mt-4 ">
        <h1 className="text-lg font-bold">Service care</h1>
        <h2>about</h2>
        <h3 className="mt-3">Loations</h3>
      </div>
    </div>
  </div><div className="w-full md:w-[48%] border border-gray-300 shadow-xl  rounded-2xl relative">
    <h3 className="absolute top-2 right-2 mt-4  text-yellow-400 px-2 py-1 text-sm font-semibold rounded">
      4.8
    </h3>
    <div className="flex p-2 gap-4">
      <div className="w-32 h-36 rounded-lg overflow-hidden">
        <img
          src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-col mt-4 ">
        <h1 className="text-lg font-bold">Service care</h1>
        <h2>about</h2>
        <h3 className="mt-3">Loations</h3>
      </div>
    </div>
  </div><div className="w-full md:w-[48%] border border-gray-300 shadow-xl  rounded-2xl relative">
    <h3 className="absolute top-2 right-2 mt-4  text-yellow-400 px-2 py-1 text-sm font-semibold rounded">
      4.8
    </h3>
    <div className="flex p-2 gap-4">
      <div className="w-32 h-36 rounded-lg overflow-hidden">
        <img
          src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-col mt-4 ">
        <h1 className="text-lg font-bold">Service care</h1>
        <h2>about</h2>
        <h3 className="mt-3">Loations</h3>
      </div>
    </div>
  </div><div className="w-full md:w-[48%] border border-gray-300 shadow-xl  rounded-2xl relative">
    <h3 className="absolute top-2 right-2 mt-4  text-yellow-400 px-2 py-1 text-sm font-semibold rounded">
      4.8
    </h3>
    <div className="flex p-2 gap-4">
      <div className="md:w-32 w-28 md:h-36 rounded-lg overflow-hidden">
        <img
          src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-col mt-4 ">
        <h1 className="text-lg font-bold">Service care</h1>
        <h2>about</h2>
        <h3 className="mt-3">Loations</h3>
      </div>
    </div>
  </div>

 

      </div>
     
      </div>
    </div>
  );
}

export default FindService;
