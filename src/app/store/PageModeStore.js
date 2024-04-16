import { makeAutoObservable } from "mobx";

export class PageModeStore {
  darkMode = true;
  listView = true;

  constructor() {
    makeAutoObservable(this);
  }

  toggleListView = () => {
    this.listView = !this.listView;
  };

  toggleDarkMode = () => {
    this.darkMode = !this.darkMode;
  };

  get getToggleListView() {
    return this.listView;
  }

  get getToggleDarkMode() {
    return this.darkMode;
  }
}

export const pageModeStore = new PageModeStore();
