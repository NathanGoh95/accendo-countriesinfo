import { Box, Button, Chip, Modal, Typography } from '@mui/material';
import * as React from 'react';

export const CountryModal = ({ open, handleClose, country }) => {
  if (!country) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '85rem',
          height: '30rem',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          borderRadius: '8px',
        }}>
        <Box sx={{ width: '40%', height: '100%', overflow: 'hidden' }}>
          <img
            src={country.flags}
            alt={`${country.name} flag`}
            style={{ width: '30rem', height: '20rem', objectFit: 'cover' }}
          />
        </Box>

        <Box
          sx={{
            width: '60%',
            display: 'flex',
            flexDirection: 'column',
            pl: 4,
          }}>
          <Box sx={{ display: 'flex', mb: 2, width: '100%' }}>
            <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 2 }}>
              {country.name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3, width: '50%' }}>
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

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
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

          <Box sx={{ mt: '1rem', display: 'flex', flexDirection: 'row',}}>
            <Typography variant='body1' gutterBottom sx={{ alignContent: 'center'}}>
              <strong>Border Countries:</strong>
            </Typography>
            <Box>
              {country.borders?.map((border, idx) => (
                <Chip key={idx} label={border} variant='outlined' size='small' sx={{ ml: 1, mb: 1 }} />
              ))}
            </Box>
          </Box>
        </Box>

        {/* <Button onClick={handleClose} variant='contained' color='primary' sx={{ mt: 3 }}>
          Close
        </Button> */}
      </Box>
    </Modal>
  );
};
