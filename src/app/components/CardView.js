"use client";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { apiStore } from "../store/ApiStore";
import { filteredCountryStore } from "../store/FilteredCountryStore";
import { pageModeStore } from "../store/PageModeStore";

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
      <div onClick={pageModeStore.toggleListView}>{pageModeStore.listView ? "Table" : "Card"}</div>

      {/* filter section */}
      <div>
        <label>
          <select value={filteredCountryStore.selectedRegion} onChange={(event) => onSelectRegion(event.target.value)}>
            <option value="All">Filter by Region</option>
            {[...filteredCountryStore.uniqueRegions].map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Render countries */}
      <div>
        {filteredCountryStore.filteredCountries.map((country, index) => {
          return (
            <div key={index}>
              <img src={country.flags} className="w-10 h-10" alt={`${country.name} flag`} />
              <h1>{country.name}</h1>
              <p>Population: {country.population} </p>
              <p>Region: {country.region} </p>
              <p>Capital: {country.capital} </p>
              {/* <p>Currency:</p>
              <div className="bg-red-500 flex flex-row">
                {country.currenciesKeys.map((currency, index) => (
                  <div key={index} className="bg-red-100 mr-3">
                    {currency}
                  </div>
                ))}
              </div> */}
            </div>
          );
        })}
      </div>
    </>
  );
});

export default CardView;
