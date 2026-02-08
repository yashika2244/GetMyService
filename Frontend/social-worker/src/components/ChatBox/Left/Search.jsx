import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import UserGetAtll from "../../../context/UserGetAll";
import useConversation from "../../../stateManage/useConversation.js";
import { toast } from "react-toastify";
import { useAccounts } from "../../../context/AppContext.jsx";

function Search() {
  const [search, setSearch] = useState("");
  const { setSelcetedConversation } = useConversation();
  const { accounts } = useAccounts();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const conversation = accounts.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelcetedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="px-2 py-2">
      <form onSubmit={handleSearch}>
        <div className="flex items-center gap-2">

          {/* INPUT */}
          <div className="flex items-center gap-2 w-full px-3 py-2 rounded-xl bg-white border border-blue-100 shadow-sm focus-within:ring-2 focus-within:ring-blue-200">

            <IoSearchSharp className="text-blue-500 text-lg" />

            <input
              type="search"
              className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-sm"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700 active:scale-95 transition-all duration-200"
          >
            <IoSearchSharp className="text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
