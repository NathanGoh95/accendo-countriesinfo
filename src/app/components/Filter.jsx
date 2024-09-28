import { observer } from "mobx-react";
import { useState } from "react";
import { filteredCountryStore } from "../store/FilteredCountryStore";
import { LucideChevronDown, LucideChevronRight } from "lucide-react";

const Filter = observer(() => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const onSelectRegion = (value) => {
    filteredCountryStore.setSelectedRegion(value);
    setIsExpanded(false);
  };

  return (
    <div className="m-1 relative">
      <button
        onClick={toggleExpanded}
        className="flex items-center justify-between w-[25rem] px-4 py-2 text-left text-sm bg-white rounded-md shadow-sm focus:outline focus:ring-offset-2 focus:ring-indigo-500">
        {filteredCountryStore.selectedRegion === "All" ? "Filter by Region" : filteredCountryStore.selectedRegion}
        {isExpanded ? <LucideChevronDown size={20} /> : <LucideChevronRight size={20} />}
      </button>
      {isExpanded && (
        <div>
          {[...filteredCountryStore.uniqueRegions].map((region) => (
            <button
              key={region}
              className="block w-[25rem] px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
              onClick={() => onSelectRegion(region)}>
              {region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default Filter
