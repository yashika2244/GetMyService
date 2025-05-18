import React, { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../config";
import { IoMdSearch } from "react-icons/io";
import { debounce } from "lodash";
import { BsChatSquareText } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
// import { BASE_URL } from "../config";

const FindService = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [allResults, setAllResults] = useState([]); // Store all search groups
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate()

  // Load search results and query from localStorage on component mount

  useEffect(() => {
    const storedResults = localStorage.getItem("searchResults");
    const storedQuery = localStorage.getItem("lastQuery");

    if (storedResults) {
      setAllResults(JSON.parse(storedResults));
    }
    if (storedQuery) {
      setQuery(storedQuery);
    }
  }, []);

  const fetchServices = async (searchQuery, pageNumber, e) => {
    // if (!searchQuery.trim()) return;
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/Services-find/search?search=${searchQuery}&page=${pageNumber}`
      );
      if (!response.ok) throw new Error("Failed to fetch searchService");

      const data = await response.json();

      if (pageNumber === 1) {
        setAllResults((prev) => {
          const existingQueryGroup = prev.find(
            (group) => group.query === searchQuery
          );

          if (existingQueryGroup) {
            // Filter out duplicates from new data
            const uniqueNewData = data.filter(
              (newItem) =>
                !existingQueryGroup.data.some(
                  (existing) => existing._id === newItem._id
                )
            );

            // If no unique new data, just move existing group to front
            if (uniqueNewData.length === 0) {
              // Move existing group to front without changes
              return [
                existingQueryGroup,
                ...prev.filter((group) => group.query !== searchQuery),
              ];
            }

            // Update group's data and move it to front
            return [
              {
                ...existingQueryGroup,
                data: [...existingQueryGroup.data, ...uniqueNewData],
              },
              ...prev.filter((group) => group.query !== searchQuery),
            ];
          } else {
            // Add new group at the START
            return [{ query: searchQuery, data }, ...prev];
          }
        });

        // Delete history handler
      }
    } catch (error) {
      console.error("Error fetching searchService:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteHistory = () => {
    setAllResults([]); // Clear the search results state
    setQuery(""); // Clear current query state (optional)
    setSearch(""); // Clear search input box (optional)
    localStorage.removeItem("searchResults"); // Remove from localStorage
    localStorage.removeItem("lastQuery"); // Remove from localStorage
  };

  // Fetch searchService when query or page changes
  useEffect(() => {
    if (query) {
      fetchServices(query, page);
    }
  }, [query, page]);

  const handleSearch = () => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return;
    setPage(1);
    setQuery(normalizedSearch);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    }, 200),
    [loading]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Save current search results and query to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("searchResults", JSON.stringify(allResults));
    localStorage.setItem("lastQuery", query);
  }, [allResults, query]);


const handleClick = (searchService, accounts) => {
  console.log("serifve id" ,searchService._id)
  navigate(`/Services-profile/${searchService._id}`, {
    state: {
      name: searchService.name,
      about: searchService.about,
      location: searchService.location,
      photo: searchService.photo,
      rating: searchService.rating,
          accounts: accounts.data,

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
              onClick={handleSearch}
              // aria-label="Open chat"
              className="p-2 bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <BsChatSquareText className="text-gray-700 md:text-xl text-base" />
            </button>
          </div>
        </div>
        <div className="flex justify-start mb-4 md:mt-5 mt-2">
          <button
            onClick={handleDeleteHistory}
            className="md:px-2 md:py-1 px-3 py-1 rounded-3xl bg-slate-200 text-sm text-slate-400 border hover:text-white font-[400] border-slate-400  hover:bg-slate-400 transition"
          >
            Clear Services
          </button>
        </div>

        {/* All Search Results */}
        <div className="flex flex-col lg:flex-row lg:flex-wrap md:gap-10  mt-1 md:mt-6 md:mb-5 ">
          {allResults.map((accounts, index) => (
            <div key={index} className=" mb-2 md:mb-0 md:mt-0  w-full">
              {console.log("accounts:", accounts)}
              {/* <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Results for "{group.query}"
            </h3> */}
              <div className="flex flex-wrap ">
                {accounts.data.map((searchService) => (
                  <div
                    key={searchService._id}
                    className="w-full  border border-slate-200 shadow-xl rounded-2xl relative"
                  >
                    <div className="flex  absolute top-2 right-2 px-2 py-1 gap-1 ">
                      <FaStar className="text-yellow-400" />
                      <h3 className=" text-yellow-400  text-sm font-semibold rounded">
                        {searchService.rating}
                      </h3>
                    </div>

                    <div className="flex p-2 gap-4  "
                    
             >
                      <div className="md:w-44 md:h-56 w-28 h-28 rounded-lg overflow-hidden">
                        <img
                          src={
                            searchService.photo?.startsWith("http")
                              ? searchService.photo
                              : `${BASE_URL}/${searchService.photo?.replace(
                                  /^\//,
                                  ""
                                )}`
                          }
                          className="h-full w-full object-cover"
                          alt={searchService.name}
                        />
                      </div>

                      <div className="flex flex-col gap-4 md:mt-5 md:ml-8 mt-1" 
                    >

                        <h1 className="md:text-lg text-md  text-gray-800 font-bold"
                        onClick={() => handleClick(searchService ,accounts)
                        }
                        
                        >
                          {searchService.name || "No name available"}
                        </h1>
                        <h2 className="text-sm text-gray-600">
                          {searchService.about || "No description available"}
                        </h2>
                        <div className="mt-3 md:mt-8 text-sm text-gray-700 flex items-center gap-1">
                          <FaLocationDot className="" />
                          <h3 className="">
                            {searchService.location || "Location not specified"}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <p className="text-center text-gray-500 mt-10">
            {page === 1 ? "Loading searchService..." : "Loading more searchService..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default FindService;
