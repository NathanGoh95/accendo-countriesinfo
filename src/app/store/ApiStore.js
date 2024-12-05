import { makeAutoObservable } from "mobx";
import { filteredCountryStore } from "./FilteredCountryStore";
import { delay } from "lodash";

export class ApiStore {
  apiURL = "https://restcountries.com/v3.1/all";
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  callApi = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await fetch(this.apiURL);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      filteredCountryStore.processData(data);
    } catch (error) {
      this.error = error.message;
    }

    this.isLoading = false;
  };
}

export const apiStore = new ApiStore();
