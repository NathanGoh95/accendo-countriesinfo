import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import { filteredCountryStore } from "../store/FilteredCountryStore";
import { LucideChevronRight, LucideX } from "lucide-react";

const Filter = observer(() => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const filterRef = useRef(null);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const onSelectRegion = (value) => {
    filteredCountryStore.setSelectedRegion(value);
    setIsExpanded(false);
  };

  const clearFilter = () => {
    filteredCountryStore.setSelectedRegion("All");
  };

  const isFilterActive = filteredCountryStore.selectedRegion !== "All";

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsExpanded(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={filterRef} className="m-1 relative w-[12rem]">
      <div
        className={`relative flex items-center transition-all duration-200 ease-in-out ${
          isFocused || isFilterActive || isExpanded ? "shadow-lg" : "shadow-md hover:shadow-lg"
        }
        `}>
        <button
          onClick={toggleExpanded}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`flex items-center justify-between px-4 py-2 w-full text-left text-sm rounded-md shadow-sm transition-all border
            ${
              isFocused || isFilterActive || isExpanded
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}>
          {filteredCountryStore.selectedRegion === "All"
            ? "Filter by Region"
            : filteredCountryStore.selectedRegion}
          {!isFilterActive && (
            <LucideChevronRight
              size={18}
              className={`transform transition-transform duration-150 ${
                isExpanded ? "rotate-90" : "rotate-0"
              }`}
            />
          )}
        </button>
        {/* Show 'X' button when filter is active */}
        {filteredCountryStore.selectedRegion !== "All" && (
          <button
            type="button"
            className="absolute right-0 inset-y-0 flex items-center pr-3"
            onClick={clearFilter}>
            <LucideX className="w-3 h-3 text-gray-400 hover:text-gray-800" />
          </button>
        )}
      </div>
      {isExpanded && (
        <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10">
          {[...filteredCountryStore.uniqueRegions].map((region) => (
            <button
              key={region}
              className="block w-full px-4 py-2 text-left rounded-md hover:bg-blue-50 focus:outline-none"
              onClick={() => onSelectRegion(region)}>
              {region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default Filter;
