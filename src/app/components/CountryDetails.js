"use client";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { apiStore } from "../store/ApiStore";
import { filteredCountryStore } from "../store/FilteredCountryStore";
import { pageModeStore } from "../store/PageModeStore";

const CountryDetails = observer(() => {
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
        <h1>Countries Details</h1>
      </div>
      <div onClick={pageModeStore.toggleDarkMode}>{pageModeStore.darkMode ? "Dark Mode" : "Light Mode"}</div>

      {/* Render countries */}
      <div>
        {filteredCountryStore.filteredCountries.map((country, index) => {
          return (
            <div key={index}>
              <img src={country.flags} className="w-60 h-30" alt={`${country.name} flag`} />
              <h1>{country.name}</h1>
              {/* <p>Native name: {}</p> */}
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              <p>Sub Region: {country.subregion}</p>
              <p>Capital: {country.capital}</p>
              <p>Top Level Domain: {country.topLevelDomains}</p>
              <p>Currencies: {country.currencies.join(", ")}</p>
              <p>Languages: {country.languages.join(", ")}</p>
              {/* <p>Border Countries: {}</p> */}
            </div>
          );
        })}
      </div>
    </>
  );
});

export default CountryDetails;
