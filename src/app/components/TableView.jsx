"use client";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { apiStore } from "../store/ApiStore";
import { filteredCountryStore } from "../store/FilteredCountryStore";
import { pageModeStore } from "../store/PageModeStore";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { Tables } from "./Table";

const TableView = observer(() => {
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
      <div>
        {/* {filteredCountryStore.filteredCountries.map((country, index) => {
          return (
            <div key={index}>
              <img src={country.flags} className="w-10 h-10" alt={`${country.name} flag`} />
              <h1>{country.name}</h1>
              <p>Population: {country.population} </p>
              <p>Region: {country.region} </p>
              <p>Capital: {country.capital} </p>
              <p>Currency: {country.currencies.join(', ')}</p>
            </div>
          );
        })} */}
        <Tables countries={filteredCountryStore.filteredCountries} />
      </div>
    </>
  );
});

export default TableView;
