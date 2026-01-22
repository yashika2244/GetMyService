import React, { useState, useEffect, useCallback } from "react";
import { IoMdSearch } from "react-icons/io";
import { BsChatSquareText } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { debounce } from "lodash";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccounts, useAuth } from "../context/AppContext";

/* ================= ANIMATIONS ================= */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const FindService = () => {
  const [search, setSearch] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const { accounts, loading, error } = useAccounts();
  const { token } = useAuth();
  const navigate = useNavigate();

  /* ================= SEARCH ================= */

  const handleSearch = useCallback(
    debounce((query) => {
      if (!query) {
        setFilteredAccounts(accounts);
      } else {
        setFilteredAccounts(
          accounts.filter((a) =>
            a.name.toLowerCase().includes(query.toLowerCase()),
          ),
        );
      }
    }, 300),
    [accounts],
  );

  useEffect(() => {
    handleSearch(search);
  }, [search, handleSearch]);

  useEffect(() => {
    setFilteredAccounts(accounts);
  }, [accounts]);

  /* ================= CLICK ================= */

  const handleClick = (account) => {
    if (!token) {
      toast.info("Please login to view this profile");
      navigate("/login");
      return;
    }

    navigate(`/Services-profile/${account._id}`, {
      state: { ...account },
    });
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* ===== SEARCH BAR ===== */}
        <div className="sticky top-0 z-30 mt-10 backdrop-blur-xl bg-white/70 border-b border-gray-200/60">
          <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Heading */}
            <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
              Find <span className="text-blue-600">Services</span>
            </h2>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              {/* Input */}
              <div
                className="flex items-center w-full bg-white rounded-full px-5 py-3 shadow-lg border border-gray-200 
                      focus-within:ring-2 focus-within:ring-blue-500 
                      hover:shadow-xl transition-all duration-300"
              >
                <IoMdSearch className="text-gray-400 text-xl mr-3" />
                <input
                  type="search"
                  placeholder="Search services or professionals..."
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Chat Button */}
              <button
                className="group bg-blue-600 p-3 rounded-full shadow-lg 
                   hover:bg-blue-700 hover:shadow-xl 
                   active:scale-95 transition-all duration-300"
              >
                <BsChatSquareText className="text-white text-xl group-hover:scale-110 transition" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== ERROR ===== */}
        {error && (
          <p className="text-center text-red-500 mt-10">
            Something went wrong while loading services.
          </p>
        )}

        {/* ===== LOADING ===== */}
        {loading && (
          <p className="text-center text-gray-500 mt-16">Loading services...</p>
        )}

        {/* ===== EMPTY ===== */}
        {!loading && filteredAccounts.length === 0 && (
          <p className="text-center text-gray-500 mt-16">No services found.</p>
        )}

        {/* ===== CARDS ===== */}
        {!loading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 pb-16"
          >
            {filteredAccounts.map((account) => (
              <motion.div
                key={account._id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                onClick={() => handleClick(account)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl transition"
              >
                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden">
                  <motion.img
                    src={
                      account.photo?.trim()
                        ? account.photo
                        : "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                    }
                    alt={account.name}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <FaStar className="text-yellow-400" />
                    <span className="text-sm font-semibold">
                      {account.rating || 4.8}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                    {account.name}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {account.about || "No description available"}
                  </p>

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <FaLocationDot className="text-blue-500" />
                      <span>{account.location || "Not specified"}</span>
                    </div>

                    <span className="text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition">
                      View →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FindService;
