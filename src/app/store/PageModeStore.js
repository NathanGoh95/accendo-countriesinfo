import { makeAutoObservable } from "mobx";

export class PageModeStore {
  darkMode = true;
  tableView = true;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);

    const savedViewMode = sessionStorage.getItem("viewMode");
    this.tableView = savedViewMode ? savedViewMode === 'table' : true;
  }

  toggleViewMode = () => {
    this.tableView = !this.tableView;
    sessionStorage.setItem('viewMode', this.tableView ? 'table' : 'card');
    this.isLoading = true;

    // Simulate loading time for the view content
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  };

  toggleThemeMode = () => {
    this.darkMode = !this.darkMode;
  };

  get getToggleViewMode() {
    return this.tableView;
  }

  get getToggleThemeMode() {
    return this.darkMode;
  }
}

export const pageModeStore = new PageModeStore();
