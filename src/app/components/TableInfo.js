"use client";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { pageModeStore } from "../store/PageModeStore";

const API_URL = "https://restcountries.com/v3.1/all";

const CardInfo = observer(() => {
  const toggleDarkMode = () => {
    pageModeStore.toggleDarkMode();
  };

  const toggleListView = () => {
    pageModeStore.toggleListView();
  };

  const [apiData, setApiData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    pageModeStore.callApi()
  }, []);

  useEffect(() => {
    refreshData();
  }, [selectedRegion, apiData]);

  // To filter the data that I need
  let countries = [];
  // Iterate over each data object
  apiData.map((apiCountry) => {
    // Check if currencies property exists and it's an object
    if (apiCountry.currencies && typeof apiCountry.currencies === "object") {
      // Create variable to store currency from all countries
      let currencies = [];
      // Iterate over the keys of currencies object
      Object.keys(apiCountry.currencies).forEach((currencyKey) => {
        // Push currency symbol and value into respective arrays, if no currency symbol then only display currency key
        if (apiCountry.currencies[currencyKey].symbol) {
          currencies.push(`${apiCountry.currencies[currencyKey].symbol} ${currencyKey}`);
        } else {
          currencies.push(`${currencyKey}`);
        }
      });

      // Push object containing required params into countries array
      countries.push({
        flags: apiCountry.flags.svg,
        name: apiCountry.name.common,
        population: apiCountry.population,
        region: apiCountry.region,
        capital: apiCountry.capital,
        currenciesKeys: currencies,
      });
    }
  });

  // Initialize a set to store unique regions
  const uniqueRegions = new Set();
  // Iterate over each data object
  countries.map((regionList) => {
    // Add the region value to the set
    uniqueRegions.add(regionList.region);
  });
  // Convert the set back to an array to obtain unique regions
  const uniqueRegionsArray = [...uniqueRegions];

  // // Change page mode (dark mode / light mode)
  // const changePageMode = () => {
  //   setDarkMode(!darkMode);
  // };

  // // Change page view (list / card view)
  // const changePageView = () => {
  //   setListView(!listView);
  // };

  const onSelectRegion = (value) => {
    setSelectedRegion(value);
  };

  const refreshData = () => {
    // if filteredCountries is empty after filtering then set entire countries array to ensures filteredCountries always have data to display, either after filtering or initially before any filtering is applied
    if (countries.length > 0) {
      const filtered = countries.filter((item) => {
        return selectedRegion === "All" || item.region === selectedRegion;
      });
      setFilteredCountries(filtered.length > 0 ? filtered : countries);
    }
    //   setFilteredCountries(
    //     countries.filter((item) => {
    //       return selectedRegion === "All" || item.region === selectedRegion;
    //     }),
    //   );
    // } else {
    //   setFilteredCountries([]);
    // }
  };

  return (
    <>
      {/* header section */}
      <div>
        <h1>Countries {pageModeStore.listView ? "Table" : "Card"} View</h1>
      </div>
      <div onClick={toggleDarkMode}>{pageModeStore.darkMode ? "Dark Mode" : "Light Mode"}</div>
      <div onClick={toggleListView}>{pageModeStore.listView ? "Table" : "Card"}</div>

      {/* filter section */}
      <div>
        <label>
          Filter by Region
          <select value={selectedRegion} onChange={(event) => onSelectRegion(event.target.value)}>
            {uniqueRegionsArray.map((region) => {
              return <option value={region}>{region}</option>;
            })}
          </select>
        </label>
      </div>

      <div>
        {filteredCountries?.map((country, index) => {
          return (
            <div key={index}>
              <img src={country.flags} className="w-10 h-10" />
              <h1>{country.name}</h1>
              <p>Population: {country.population} </p>
              <p>Region: {country.region} </p>
              <p>Capital: {country.capital} </p>
              <p>Currency:</p>
              <div className="bg-red-500 flex flex-row">
                {country.currenciesKeys.map((currency, index) => (
                  <div key={index} className="bg-red-100 mr-3">
                    {currency}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
});

export default CardInfo;
