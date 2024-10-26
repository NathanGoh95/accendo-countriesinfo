'use client';
import TableView from "./components/TableView";
import CardView from "./components/CardView";
import { ViewSwitchToggle } from "./components/ViewSwitchToggle";
import React from "react";
import { observer } from "mobx-react";
import { pageModeStore } from "./store/PageModeStore";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import { Box, CircularProgress } from "@mui/material";

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
      {pageModeStore.isLoading ? (
        <Box display='flex' justifyContent='center' alignItems='center' height='70vh'>
          <CircularProgress color='primary' size={50} thickness={4} />
        </Box>
      ) : (
        <div>{pageModeStore.tableView ? <TableView /> : <CardView />}</div>
      )}
    </>
  );
})

export default Home
