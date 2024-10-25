import { observer } from 'mobx-react';
import { pageModeStore } from '../store/PageModeStore';
import { Box, Typography, Switch, styled } from '@mui/material';
import * as React from 'react';

const ViewToggleSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      '& + .MuiSwitch-track': {
        backgroundColor: 'transparent',
        opacity: 0.2,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#000000',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: '#000000',
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: 'transparent',
    opacity: 0.2,
    border: '2px solid',
    boxSizing: 'border-box',
  },
}));

export const ViewSwitchToggle = observer(() => {
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
      <ViewToggleSwitch
        checked={!pageModeStore.tableView}
        onChange={handleToggle}
        inputProps={{ 'aria-label': 'view mode toggle' }}
      />
      <Typography>Card</Typography>
    </Box>
  );
});

// <Box display='flex' alignItems='center'>
//   <Typography variant='body1' style={{ marginRight: '8px' }}>
//     Table
//   </Typography>

//   <Switch checked={pageModeStore.tableView} onChange={handleToggle} color='primary' />

//   <Typography variant='body1' style={{ marginLeft: '8px' }}>
//     Card
//   </Typography>
// </Box>
