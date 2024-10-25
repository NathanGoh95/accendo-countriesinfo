import { makeAutoObservable } from "mobx";

export class PageModeStore {
  darkMode = true;
  tableView = true;

  constructor() {
    makeAutoObservable(this);
  }

  toggleViewMode = () => {
    this.tableView = !this.tableView;
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
