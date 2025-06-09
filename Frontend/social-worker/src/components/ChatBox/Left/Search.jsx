import React, { useState, useCallback, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import UserGetAtll from "../../../context/UserGetAll";
import useConversation from "../../../stateManage/useConversation.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAccounts } from "../../../context/AppContext.jsx";

function Search() {
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const [allUsers] = UserGetAtll();
  const { setSelcetedConversation } = useConversation();
  const { accounts, loading, error } = useAccounts();

  const navigate = useNavigate();

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
    <div className=" px-2 py-1 md:py-3 pb-3 md:pb-2">
      <form onSubmit={handleSearch}>
        <div className="flex space-x-2">
          <label className="border-[1px] rounded-lg flex items-center gap-2 w-[90%]  border-gray-700 bg-slate-900">
            <input
              type="search"
              className="grow  bg-transparent outline-none  text-slate-200 pl-2 "
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button type="submit">
            <IoSearchSharp className=" text-4xl p-2 hover:bg-gray-600 rounded-full duration-300" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
