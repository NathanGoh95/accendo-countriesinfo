'use client';
import TableView from "./components/TableView";
import CardView from "./components/CardView";
import { ViewSwitchToggle } from "./components/ViewSwitchToggle";
import React from "react";
import { observer } from "mobx-react";
import { pageModeStore } from "./store/PageModeStore";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";

const Home = observer(() => {
  return (
    <>
      <div>
        <h1>Countries {pageModeStore.tableView ? 'Table' : 'Card'} View</h1>
      </div>
      <div onClick={pageModeStore.toggleThemeMode}>
        {pageModeStore.darkMode ? 'Dark Mode' : 'Light Mode'}
      </div>
      <SearchBar />
      <Filter />
      <ViewSwitchToggle />
      {pageModeStore.tableView ? <TableView /> : <CardView />}
    </>
  );
})

export default Home
