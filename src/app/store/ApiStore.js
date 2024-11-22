import { makeAutoObservable } from "mobx";
import { filteredCountryStore } from "./FilteredCountryStore";

export class ApiStore {
  apiURL = "https://restcountries.com/v3.1/all";
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  callApi = () => {
    this.isLoading = true;
    fetch(this.apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        filteredCountryStore.processData(data);
      })
      .catch((error) => {
        this.error = error.message;
      })
      .finally(() => {
        this.isLoading = false;
      });
  };
}

export const apiStore = new ApiStore();
