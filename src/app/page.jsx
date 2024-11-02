'use client';
import TableView from './components/TableView';
import CardView from './components/CardView';
import { ViewSwitchToggle } from './components/ViewSwitchToggle';
import React from 'react';
import { observer } from 'mobx-react';
import { pageModeStore } from './store/PageModeStore';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import { Box, CircularProgress, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeSwitchButton } from './components/ThemeSwitchButton';

const Home = observer(() => {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Outer container */}
      <div className='flex flex-col h-screen w-full overflow-y-scroll'>

        {/* Header container */}
        <div className='mx-[10rem] py-4'>
          <div className='flex justify-between items-center'>
            <h1>Countries {pageModeStore.tableView ? 'Table' : 'Card'} View</h1>
            <ThemeSwitchButton />
          </div>
        </div>

        {/* Main container */}
        <div className='flex flex-col flex-grow bg-gray-100'>
          {/* Search bar, filter, and view switch */}
          <div className='flex justify-between items-center mx-[11rem] py-4'>
            <SearchBar />
            <div className='flex items-center space-x-4'>
              <Filter />
              <ViewSwitchToggle />
            </div>
          </div>

          {pageModeStore.isLoading ? (
            <Box display='flex' justifyContent='center' alignItems='center' height='70vh'>
              <CircularProgress color='primary' size={50} thickness={4} />
            </Box>
          ) : (
            <div>{pageModeStore.tableView ? <TableView /> : <CardView />}</div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
});

export default Home;
