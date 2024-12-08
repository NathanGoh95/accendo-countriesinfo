import { KeyboardBackspace } from '@mui/icons-material';
import { Box, Button, Chip, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';

export const CountryModal = ({ open, handleClose, country }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!country) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}>
      <Box
        sx={{
          position: 'absolute',
          top: isMobile ? 0 : '50%',
          left: isMobile ? 0 : '50%',
          transform: isMobile ? 'none' : 'translate(-50%, -50%)',
          width: isMobile ? '100%' : '90rem',
          height: isMobile ? '100%' : '40rem',
          bgcolor: isDarkMode ? '#1F2937' : '#e9ecef',
          boxShadow: 24,
          p: isMobile ? 3 : 4,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: isMobile ? '0' : '8px',
          '&:focus': {
            outline: 'none',
          },
        }}>
        <Button
          onClick={handleClose}
          variant='contained'
          sx={{
            position: 'absolute',
            top: isMobile ? '1rem' : '2rem',
            left: isMobile ? '1rem' : '2rem',
            bgcolor: '#ffff',
            color: 'black',
            '&:hover': { bgcolor: isDarkMode ? '#6e6e6e' : '#89C2D9' },
          }}>
          <KeyboardBackspace sx={{ mr: 1 }} />
          Back
        </Button>

        <Box
          sx={{
            width: isMobile ? '80%' : '40%',
            height: isMobile ? 'auto' : '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <img src={country.flags} alt={`${country.name} flag`} style={{ aspectRatio: '16/9', width: '100%', height: isMobile ? 'auto' : '14rem', objectFit: 'contain' }} />
        </Box>

        <Box
          sx={{
            width: isMobile ? '100%' : '60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Box sx={{ display: 'flex', mb: 2, width: '100%' }}>
            <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 2, ml: isMobile ? 2 : 0, mt: isMobile ? 2 : 0 }}>
              {country.name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3, width: isMobile ? '100%' : '50%' }}>
              <Typography variant='body1' gutterBottom>
                <strong>Native Name:</strong> {country.nativeNames.join(', ')}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Population:</strong> {country.population}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Region:</strong> {country.region}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Sub Region:</strong> {country.subregion}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Capital:</strong> {country.capital}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', width: isMobile ? '100%' : '50%' }}>
              <Typography variant='body1' gutterBottom>
                <strong>Top Level Domain:</strong> {country.topLevelDomains.join(', ')}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Currencies:</strong> {country.currencies.join(', ')}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Languages:</strong> {country.languages.join(', ')}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: '1rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
            <Typography variant='body1' gutterBottom sx={{ alignContent: 'center' }}>
              <strong>Border Countries:</strong>
            </Typography>
            <Box>
              {country.borders?.map((border, idx) => (
                <Chip
                  key={idx}
                  label={border}
                  variant='outlined'
                  size='small'
                  sx={{ ml: isMobile ? 0 : '4px', mr: isMobile ? 1 : '2', mb: '6px', bgcolor: isDarkMode ? '#3c3c3c' : '#ffff' }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
