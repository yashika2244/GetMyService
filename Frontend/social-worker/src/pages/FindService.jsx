

import React, { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../config";
import { IoMdSearch } from "react-icons/io";
import { debounce } from "lodash";
import { BsChatSquareText } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

import { useAccounts } from "../context/AppContext";

const FindService = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [allResults, setAllResults] = useState([]); // Store all search groups
  // const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const { accounts, loading, error } = useAccounts();

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClick = (accounts) => {
    console.log("serifve id", accounts._id);
    navigate(`/Services-profile/${accounts._id}`, {
      state: {
        name: accounts.name,
        about: accounts.about,
        locate: accounts.location,
        photo: accounts.photo,
        rating: accounts.rating,
        // accounts: accounts.data,

        // accounts: group.data
      },
    });
  };

  return (
    <div className="md:mt-12 mt-5 flex justify-center bg-gradient-to-b from-blue-50 to-white min-h-screen pt-10 w-full">
      <div className="max-w-[1100px] w-full px-6">
        {/* Title and Search Bar */}
        <div className="text-center flex flex-col items-center">
          <h2 className="md:text-4xl text-2xl font-bold text-gray-800 mb-6">
            Find Services
          </h2>

          <div className="w-full flex items-center gap-2">
            {/* Search Input Box */}
            <div className="flex items-center md:gap-1 bg-white shadow-lg rounded-xl px-2 md:px-4 md:py-2 py-2 border border-gray-300 hover:shadow-xl transition-all w-full">
              <span className="mr-1 md:text-2xl text-sm text-gray-700">
                <IoMdSearch className=" text-gray-400" />
              </span>
              <input
                type="search"
                aria-label="Search for a service"
                placeholder="Search for a service..."
                className="flex-1 bg-transparent outline-none text-gray-700 md:text-lg text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Chat Icon Outside Input Box */}
            <button
              type="button"
              value={search}
              // onClick={handleSearch}
              // aria-label="Open chat"
              className="p-2 bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <BsChatSquareText className="text-gray-700 md:text-xl text-base" />
            </button>
          </div>
        </div>


        {/* All services */}

        <div className="flex flex-col lg:flex-row lg:flex-wrap md:gap-10  mt-1 md:mt-10 md:mb-5 ">
          <div className="flex flex-wrap gap-4 ">
            {accounts.length === 0 ? (
              <p className="text-gray-500">No services available.</p>
            ) : (
              accounts.map((account, index) => (
                <div
                  key={account._id}
                  className="w-full  border border-slate-200 shadow-xl rounded-2xl relative  duration-300n transition-transform transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex  absolute top-2 right-2 px-2 py-1 gap-1 ">
                    <FaStar className="text-yellow-400" />
                    <h3 className=" text-yellow-400  text-sm font-semibold rounded">
                      {account.rating}
                    </h3>
                  </div>

                  <div className="flex p-2 gap-4  ">
                    <div className="md:w-44 md:h-48 w-28 h-28 rounded-lg flex shrink-0 overflow-hidden">
                      <img
                        // src={account.photo}
                        src={
                          account.photo && account.photo.trim() !== ""
                            ? account.photo
                            : "/default-placeholder.png"
                        }
                        alt={account.name || "Service Name Not Available"}
                        className="h-full w-full object-cover"
                        // alt={account.name}
                      />
                    </div>
                    <div className="flex flex-col gap-4 md:mt-5 md:ml-8 mt-1">
                      <h1
                        className="md:text-lg text-md  text-gray-800 font-bold"
                        // onClick={() => handleClick(searchService ,accounts)
                        // }
                        onClick={() => handleClick(account)}
                      >
                        {account.name || "No name available"}
                      </h1>
                      <h2 className="text-sm text-gray-600">
                        {account.about || "No description available"}
                      </h2>

                      <div className="mt-3 md:mt-8 text-sm text-gray-700 flex items-center gap-1">
                        <FaLocationDot className="" />
                        <h3 className="">
                          {account.location || "Location not specified"}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <p className="text-center text-gray-500 mt-10">
            {page === 1
              ? "Loading searchService..."
              : "Loading more searchService..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default FindService;
