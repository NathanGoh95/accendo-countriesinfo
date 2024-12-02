import { observer } from 'mobx-react';
import { pageModeStore } from '../store/PageModeStore';
import { Box, Typography, Switch, styled, useTheme } from '@mui/material';
import * as React from 'react';

export const ViewSwitchToggle = observer(() => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const StyledSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 4,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: 'transparent', // Transparent track when checked
        },
      },
    },
    '& .MuiSwitch-thumb': {
      width: 8,
      height: 8,
      borderRadius: 6,
      backgroundColor: isDarkMode ? '#fff' : '#000', // Black thumb
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 8, // Half of track height for rounded ends
      opacity: 1,
      backgroundColor: 'transparent', // Transparent track background
      boxSizing: 'border-box',
      border: `2px solid ${isDarkMode ? '#fff' : '#000'}`,
    },
  }));

  const handleToggle = (e) => {
    pageModeStore.toggleViewMode();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        '& .MuiTypography-root': { fontSize: '14px', fontWeight: 500 },
      }}>
      <Typography>Table</Typography>
      <StyledSwitch checked={!pageModeStore.tableView} onChange={handleToggle} inputProps={{ 'aria-label': 'view mode toggle' }} />
      <Typography>Card</Typography>
    </Box>
  );
});
