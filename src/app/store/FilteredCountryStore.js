import { makeAutoObservable } from "mobx";

export class FilteredCountryStore {
  filteredCountries = [];
  uniqueRegions = new Set(); //Initialize a set to store unique regions
  selectedRegion = "All";

  constructor() {
    makeAutoObservable(this);
  }

  setFilteredCountries(countries) {
    this.filteredCountries = countries;
  }

  setUniqueRegions(regions) {
    this.uniqueRegions = regions;
  }

  setSelectedRegion(region) {
    this.selectedRegion = region;
    this.filterCountriesByRegion(); // Call the filter function when selected region changes
  }

  filterCountriesByRegion() {
    const { selectedRegion } = this;
    let filteredCountries = [];

    if (selectedRegion === "All") {
      filteredCountries = this.countries;
    } else {
      filteredCountries = this.countries.filter((country) => country.region === selectedRegion);
    }

    this.setFilteredCountries(filteredCountries);
  }

  processData(apiData) {
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

        this.uniqueRegions.add(apiCountry.region);
      }
    });

    this.countries = countries; // Save all couontries data
    this.setFilteredCountries(countries); // Initialize filtered countries with all data
    this.setUniqueRegions([...this.uniqueRegions]); // Convert the set back to an array to obtain unique regions
  }
}

export const filteredCountryStore = new FilteredCountryStore();
