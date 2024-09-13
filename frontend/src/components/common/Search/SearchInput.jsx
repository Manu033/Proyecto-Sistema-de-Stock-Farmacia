import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [isSearchFiltering, setIsSearchFiltering] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    setIsSearchFiltering(true);
    setActiveFilter(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-row mb-6 items-center space-x-4">
      <div className="flex flex-col">
        <label htmlFor="search" className="px-1">
          Buscar por nombre
        </label>
        <div className="flex flex-row items-center space-x-2">
          <input
            id="search"
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            autoComplete="off"
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            className="border w-96 border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <CiSearch size={"2rem"} onClick={handleSearch} />
        </div>
      </div>
      {isSearchFiltering && (
        <div className="rounded-xl bg-gray-200 border border-black h-8 flex items-center">
          <span className="text-center px-2 m-0 py-0">
            filtrando por: {activeFilter}
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
