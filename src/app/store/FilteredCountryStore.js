import { makeAutoObservable } from "mobx";

export class FilteredCountryStore {
  filteredCountries = []; // Initialize array to store filtered countries based on selected region
  uniqueRegions = new Set(); // Initialize a set to store unique regions name
  selectedRegion = "All";

  constructor() {
    makeAutoObservable(this);
  }

  setFilteredCountries = (countries) => {
    this.filteredCountries = countries;
  }; // Updates filteredCountries array with the provided list of countries

  setUniqueRegions = (regions) => {
    this.uniqueRegions = regions;
  }; // Updates the uniqueRegions set with the provided list of regions

  setSelectedRegion = (region) => {
    //  Updates the selectedRegion with the newly selected region and triggers the filtering of countries based on the selected region.
    this.selectedRegion = region;
    this.filterCountriesByRegion(); // Call the filter function when selected region changes
  };

  filterCountriesByRegion = () => {
    const { selectedRegion } = this;
    let filteredCountries = [];

    if (selectedRegion === "All") {
      // If selected region is 'All', display all countries
      filteredCountries = this.countries;
    } else {
      // Otherwise filter countries based on selected region
      filteredCountries = this.countries.filter((country) => country.region === selectedRegion);
    }

    this.setFilteredCountries(filteredCountries);
  };

  processData(apiData) {
    // To filter the required data
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

        let languages = [];
        if (apiCountry.languages) {
          languages = Object.values(apiCountry.languages);
        }
        // Push object containing required params into countries array
        countries.push({
          flags: apiCountry.flags.svg,
          name: apiCountry.name.common,
          // nativeName: apiCountry.name.native.common,
          population: apiCountry.population,
          region: apiCountry.region,
          subregion: apiCountry.subregion,
          capital: apiCountry.capital,
          topLevelDomains: apiCountry.tld,
          currencies: currencies,
          languages: languages,
          // borders: apiCountry.borders,
        });

        this.uniqueRegions.add(apiCountry.region);
      }
    });

    this.countries = countries; // Save all countries data
    this.setFilteredCountries(countries); // Initialize filtered countries with all data

    uniqueRegionsArray = () => {
      this.setUniqueRegions([...this.uniqueRegions]);
    }; // Convert the set back to an array to obtain unique regions
  }
}

export const filteredCountryStore = new FilteredCountryStore();
