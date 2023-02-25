import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, SetSearchTerm] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-2 text-gray-400 focus-within:text-gray-600">
      <label
        htmlFor="search-field"
        className="sr-only">
        Search All Songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 ml-4 h-5" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="search"
          type="search"
          value={searchTerm}
          onChange={(e) =>
            SetSearchTerm(e.target.value)
          }
          className="bg-transparent border-none
        text-white p-4 placholder-gray-500 text-base outline-none"
        />
      </div>
    </form>
  );
};

export default Searchbar;
