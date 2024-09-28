import { observer } from "mobx-react";
import { filteredCountryStore } from "../store/FilteredCountryStore";
import { useState } from "react";
import { LucideSearch, LucideX } from "lucide-react";
import { debounce } from "lodash";

const SearchBar = observer(() => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const debounceSearch = debounce((value) => {
    filteredCountryStore.setSearchInput(value);
  }, 1000);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debounceSearch(value); // Filter countries based on input value
  };

  const clearSearch = () => {
    setInput("");
    filteredCountryStore.setSearchInput("");
  };

  return (
    <div className="m-1 relative w-[25rem]">
      <div
        className={`relative flex items-center transition-all duration-200 ease-in-out 
            ${isFocused || input ? "shadow-lg" : "shadow-md hover:shadow-lg"
        }`}>
        <div className="absolute left-3 w-3 h-3 flex items-center justify-center">
          <LucideSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className={`w-full pl-10 pr-8 text-sm border rounded-md outline-none
            ${isFocused || input ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          placeholder="Search for a country"
          value={input}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {input && (
          <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={clearSearch}>
            <LucideX className="w-3 h-3 text-gray-400 hover:text-gray-800" />
          </button>
        )}
      </div>
    </div>
  );
});

export default SearchBar;