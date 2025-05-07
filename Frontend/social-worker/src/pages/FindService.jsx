import React, { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../config";
import { CiSearch } from "react-icons/ci";
import { debounce } from "lodash";
import { BsChatSquareText } from "react-icons/bs";

const FindService = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [allResults, setAllResults] = useState([]); // Store all search groups
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchServices = async (searchQuery, pageNumber, e) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/Services/search?search=${searchQuery}&page=${pageNumber}`
      );
      if (!response.ok) throw new Error("Failed to fetch services");

      const data = await response.json();

      if (pageNumber === 1) {
        setAllResults((prev) => {
          const existingQueryGroup = prev.find(
            (group) => group.query === searchQuery
          );

          if (existingQueryGroup) {
            return prev.map((group) =>
              group.query === searchQuery
                ? {
                    ...group,
                    data: [
                      ...group.data,
                      ...data.filter(
                        (newItem) =>
                          !group.data.some(
                            (existing) => existing._id === newItem._id
                          )
                      ),
                    ],
                  }
                : group
            );
          } else {
            return [...prev, { query: searchQuery, data }];
          }
        });
      } else {
        setAllResults((prev) =>
          prev.map((group) =>
            group.query === searchQuery
              ? {
                  ...group,
                  data: [
                    ...group.data,
                    ...data.filter(
                      (newItem) =>
                        !group.data.some(
                          (existing) => existing._id === newItem._id
                        )
                    ),
                  ],
                }
              : group
          )
        );
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch services when query or page changes
  useEffect(() => {
    if (query) {
      fetchServices(query, page);
    }
  }, [query, page]);

  const handleSearch = () => {
    if (!search.trim()) return;
    setPage(1);
    // setAllResults([]); // Clear previous results before setting the new query
    setQuery(search);
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

  return (
    <div className="md:mt-12 mt-5 flex justify-center bg-gradient-to-b from-blue-50 to-white min-h-screen pt-10 w-full">
      <div className="max-w-[1100px] w-full px-6">
        {/* Title and Search Bar */}
        <div className="text-center flex flex-col items-center">
          <h2 className="md:text-4xl text-2xl font-bold text-gray-800 mb-6">
            Find Services
          </h2>
          {/* <div className=" w-full flex items-center md:gap-1 bg-white shadow-lg rounded-xl px-2 md:px-4 md:py-2 py-1 border border-gray-300 hover:shadow-xl transition-all">
            <span className="mr-1 md:text-2xl text-sm">
              <CiSearch className="text-gray-700 md:text-lg text-sm" />
            </span>
            <input
              type="search"
              placeholder="Search for a service..."
              className="flex-1 bg-transparent outline-none text-gray-700 md:text-lg text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <BsChatSquareText />
          </div> */}
          {/* <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              onClick={handleSearch}
            >
              Search
            </button> */}
          <div className="w-full flex items-center gap-2">
            {/* Search Input Box */}
            <div className="flex items-center md:gap-1 bg-white shadow-lg rounded-xl px-2 md:px-4 md:py-2 py-2 border border-gray-300 hover:shadow-xl transition-all w-full">
              <span className="mr-1 md:text-2xl text-sm text-gray-700">
                <CiSearch className=" text-gray-700" />
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

        {/* All Search Results */}
        <div className="flex flex-col lg:flex-row lg:flex-wrap md:gap-10  mt-1 md:mt-10 md:mb-5 ">
          {allResults.map((group, index) => (
            <div key={index} className=" mt-5 md:mt-0  w-full">
              {/* <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Results for "{group.query}"
            </h3> */}
              <div className="flex flex-wrap ">
                {group.data.map((service) => (
                  <div
                    key={service._id}
                    className="w-full  border border-slate-200 shadow-xl rounded-2xl relative"
                  >
                    <h3 className="absolute top-2 right-2 text-yellow-400 px-2 py-1 text-sm font-semibold rounded">
                      {service.rating || "N/A"}
                    </h3>
                    <div className="flex p-2 gap-4">
                      <div className="md:w-33 md:h-56 w-28 h-28 rounded-lg overflow-hidden">
                        <img
                          src={
                            service.imageUrl ||
                            "https://via.placeholder.com/150"
                          }
                          className="h-full w-full object-cover"
                          alt={service.name}
                        />
                      </div>
                      <div className="flex flex-col gap-4 md:mt-8 md:ml-8 mt-1">
                        <h1 className="text-lg font-bold">{service.name}</h1>
                        <h2 className="text-sm text-gray-600">
                          {service.description || "No description available"}
                        </h2>
                        <h3 className="mt-3 md:mt-8 text-sm text-gray-700">
                          {service.location || "Location not specified"}
                        </h3>
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
            {page === 1 ? "Loading services..." : "Loading more services..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default FindService;
