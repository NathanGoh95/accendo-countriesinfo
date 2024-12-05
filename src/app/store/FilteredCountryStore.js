import { map, filter } from 'lodash';
import { makeAutoObservable } from 'mobx';

export class FilteredCountryStore {
  countries = []; // All countries data
  filteredCountries = []; // Initialize array to store filtered countries based on selected region
  uniqueRegions = new Set(); // Initialize a set to store unique regions name
  selectedRegion = 'All';
  countryCode = {}; // Store country code and their full

  constructor() {
    makeAutoObservable(this);
  }

  sortDataAscOrder(countries) {
    return countries.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  setFilteredCountries = (countries) => {
    // Ensure data is sorted before setting
    this.filteredCountries = this.sortDataAscOrder(countries);
  };

  setUniqueRegions = (regions) => {
    this.uniqueRegions = regions;
  }; // Updates the uniqueRegions set with the provided list of regions

  setSelectedRegion = (region) => {
    //  Updates the selectedRegion with the newly selected region and triggers the filtering of countries based on the selected region.
    this.selectedRegion = region;
    this.filterCountriesByRegion(); // Call the filter function when selected region changes
  };

  setCountryCode = (countryCode) => {
    this.countryCode = countryCode;
  };

  filterCountriesByRegion = () => {
    const { selectedRegion } = this;
    let filteredCountries = [];

    if (selectedRegion === 'All') {
      // If selected region is 'All', display all countries
      filteredCountries = this.countries;
    } else {
      // Otherwise filter countries based on selected region
      filteredCountries = this.countries.filter((country) => country.region === selectedRegion);
    }
    this.setFilteredCountries(filteredCountries);
  };

  setSearchInput = (searchInput) => {
    const { selectedRegion, countries } = this;

    if (!searchInput) {
      this.filterCountriesByRegion(); // If there's no search input, just show the currently filtered countries (based on region)
    } else {
      // Determine the base list to search from
      const baseCountries = selectedRegion === 'All'
        ? countries // Search all countries if no region is selected
        : countries.filter((country) => country.region === selectedRegion); // Only search filtered countries if a region is selected
      
      // Perform the search within the filtered base list
      const filtered = filter(baseCountries, (country) => 
        country.name.toLowerCase().includes(searchInput.toLowerCase())
      );

      this.setFilteredCountries(filtered); // Update filtered countries with the search results
    }
  };

  processData(apiData) {
    let countries = []; // To filter the required data
    let countryCode = {}; // Initialize country code to name

    // Create a map of country code (cca3) to full name
    apiData.forEach((apiCountry) => {
      if (apiCountry.cca3 || apiCountry.name || apiCountry.name.common) {
        countryCode[apiCountry.cca3] = apiCountry.name.common;
      }
    });

    // Process each country and convert borders to full name using the map
    apiData.forEach((apiCountry) => {
      // Check if currencies property exists and it's an object
      if (apiCountry.currencies && typeof apiCountry.currencies === 'object' && apiCountry.name.nativeName && typeof apiCountry.name.nativeName === 'object') {
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

        // let nativeNames = map(apiCountry.name.nativeName, (nativeName) => (nativeName.common ? nativeName.common : null)).filter(Boolean);
        let nativeNames = [...new Set(map(apiCountry.name.nativeName, (nativeName) => (nativeName.common ? nativeName.common : null)).filter(Boolean))];

        let languages = map(apiCountry.languages);
        // let languages = apiCountry.languages ? Object.values(apiCountry.languages).filter(Boolean) : [];

        // Map the border codes to full country names using the countryCode
        let borderCountries = apiCountry.borders ? map(apiCountry.borders, (code) => countryCode[code] || code) : [];

        // Push object containing required params into countries array
        countries.push({
          flags: apiCountry.flags.svg,
          name: apiCountry.name.common,
          nativeNames: nativeNames,
          population: apiCountry.population,
          region: apiCountry.region,
          subregion: apiCountry.subregion,
          capital: apiCountry.capital,
          topLevelDomains: apiCountry.tld,
          currencies: currencies,
          languages: languages,
          borders: borderCountries,
        });

        this.uniqueRegions.add(apiCountry.region);
      }
    });

    this.countries = this.sortDataAscOrder(countries); // Sort all data before saving
    this.setFilteredCountries(countries); // Initialize filtered countries with all data
    this.setCountryCode(countryCode); // Set the country code-to-name map for future use
    this.setUniqueRegions([...this.uniqueRegions]); // Convert the set back to an array to obtain unique regions
  }
}

export const filteredCountryStore = new FilteredCountryStore();
