"use client";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { apiStore } from "../store/ApiStore";
import { filteredCountryStore } from "../store/FilteredCountryStore";
import { pageModeStore } from "../store/PageModeStore";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { Cards } from "./Card";

const CardView = observer(() => {
  useEffect(() => {
    apiStore.callApi();
  }, []);

  const onSelectRegion = (value) => {
    filteredCountryStore.setSelectedRegion(value);
  };

  return (
    <>
      {/* header section & toggles*/}
      <div>
        <h1>Countries {pageModeStore.listView ? "Table" : "Card"} View</h1>
      </div>
      <div onClick={pageModeStore.toggleDarkMode}>{pageModeStore.darkMode ? "Dark Mode" : "Light Mode"}</div>
      <SearchBar />
      <Filter />
      <div onClick={pageModeStore.toggleListView}>{pageModeStore.listView ? "Table" : "Card"}</div>

      {/* Render countries */}
      <div className="flex flex-wrap gap-5 justify-center">
        {filteredCountryStore.filteredCountries.map((country, index) => (
          <Cards key={index} country={country} />
        ))}
      </div>
    </>
  );
});

export default CardView;
