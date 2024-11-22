import { makeAutoObservable } from 'mobx';

export class PageModeStore {
  darkMode = true;
  tableView = true;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  initializeSettings() {
    if (typeof window !== 'undefined') {
      const savedViewMode = sessionStorage.getItem('viewMode');
      this.tableView = savedViewMode ? savedViewMode === 'table' : true;

      const savedThemeMode = localStorage.getItem('themeMode');
      this.darkMode = savedThemeMode ? savedThemeMode === 'dark' : true;
    }
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
    localStorage.setItem('themeMode', this.darkMode ? 'dark' : 'light');
  };

  get getToggleViewMode() {
    return this.tableView;
  }

  get getToggleThemeMode() {
    return this.darkMode ? 'dark' : 'light';
  }
}

export const pageModeStore = new PageModeStore();
