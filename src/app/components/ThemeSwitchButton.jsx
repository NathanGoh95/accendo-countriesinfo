import { observer } from 'mobx-react';
import { pageModeStore } from '../store/PageModeStore';
import { Box, Button } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

export const ThemeSwitchButton = observer(() => {
  const handleToggle = (e) => {
    pageModeStore.toggleThemeMode();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Button
        sx={{ textTransform: 'none' }}
        variant='text'
        onClick={handleToggle}
        color='inherit'
        startIcon={pageModeStore.darkMode ? <LightMode /> : <DarkMode />}>
        {pageModeStore.darkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>
    </Box>
  );
});
