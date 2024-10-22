import { Box, Button, Modal, Typography } from '@mui/material';
import * as React from 'react';

export const CountryModal = ({ open, handleClose, country }) => {
  if (!country) return null;

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70rem',
          height: '30rem',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          borderRadius: '8px',
        }}>
        <Box sx={{ flex: '1', pr: 2 }}>
          <img src={country.flags} alt={`${country.name} flag`} />
        </Box>

        <Box sx={{ flex: '2', pl: 2 }}>
          <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 2 }}>{country.name}</Typography>
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
          <Typography variant='body1' gutterBottom>
            <strong>Top Level Domain:</strong> {country.topLevelDomains.join(', ')}
          </Typography>
          <Typography variant='body1' gutterBottom>
            <strong>Currencies:</strong> {country.currencies.join(', ')}
          </Typography>
          <Typography variant='body1' gutterBottom>
            <strong>Languages:</strong> {country.languages.join(', ')}
          </Typography>
          <Typography variant='body1' gutterBottom>
            <strong>Border Countries:</strong> {country.borders}
          </Typography>
        </Box>

        <Button onClick={handleClose} variant='contained' color='primary' sx={{ mt: 3 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};
