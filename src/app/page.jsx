'use client';
import { ViewSwitchToggle } from './components/ViewSwitchToggle';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { pageModeStore } from './store/PageModeStore';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import { Box, CircularProgress, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeSwitchButton } from './components/ThemeSwitchButton';
import TableView from './pages/table/TableView';
import CardView from './pages/card/CardView';
import { apiStore } from './store/ApiStore';

const Home = observer(() => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    apiStore.callApi();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      pageModeStore.initializeSettings();
    }
  }, [isMounted]);

  const theme = createTheme({
    palette: {
      mode: pageModeStore.getToggleThemeMode,
      ...(pageModeStore.darkMode && {
        background: {
          default: '#121212',
          paper: '#1D1D1D',
        },
      }),
    },
  });

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Outer container */}
      <div className='flex flex-col w-full'>
        {/* Header container */}
        <div className='mx-[10rem] py-4'>
          <div className='flex justify-between items-center'>
            <h1>Countries {pageModeStore.tableView ? 'Table' : 'Card'} View</h1>
            <ThemeSwitchButton />
          </div>
        </div>

        {/* Main container */}
        <div className={`flex flex-col flex-grow min-h-screen ${pageModeStore.darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          {/* Search bar, filter, and view switch */}
          <div className='flex justify-between items-center mx-[11rem] py-4'>
            <SearchBar />
            <div className='flex items-center space-x-4'>
              <Filter />
              <ViewSwitchToggle />
            </div>
          </div>

          {apiStore.isLoading || pageModeStore.isLoading ? (
            <Box display='flex' justifyContent='center' alignItems='center' height='70vh'>
              <CircularProgress color='primary' size={50} thickness={4} />
            </Box>
          ) : (
            <div className='flex-grow'>{pageModeStore.tableView ? <TableView /> : <CardView />}</div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
});

export default Home;
