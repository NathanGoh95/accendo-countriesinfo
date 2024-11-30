import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';

export const Cards = ({ country, onClick }) => {
  return (
    <Card
      sx={{
        width: '275px',
        height: '290px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 4px 32px rgba(137,194,217, 0.2)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        m: '2.5rem',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(137,194,217, 0.4)',
        },
      }}
      onClick={() => onClick(country)}>
        <CardMedia
          component='img'
          sx={{ aspectRatio: '16/9', objectFit: 'cover' }}
          image={country.flags}
          alt={`${country.name} flag`}
        />

      <CardContent
        sx={{ background: '#f5f5f5', height: '100%', padding: '10px', '&:last-child': { paddingBottom: '10px' }}}>
        <Typography
          variant='h6'
          component='div'
          sx={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '4px' }}>
          {country.name}
        </Typography>
        <Box>
          <Typography
            variant='body2'
            sx={{ fontWeight: 'bold', display: 'inline-block', fontSize: '14px' }}>
            Population:
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ display: 'inline-block', marginLeft: '4px', fontSize: '14px' }}>
            {country.population}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant='body2'
            sx={{ fontWeight: 'bold', display: 'inline-block', fontSize: '14px' }}>
            Region:
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ display: 'inline-block', marginLeft: '4px', fontSize: '14px' }}>
            {country.region}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant='body2'
            sx={{ fontWeight: 'bold', display: 'inline-block', fontSize: '14px' }}>
            Capital:
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ display: 'inline-block', marginLeft: '4px', fontSize: '14px' }}>
            {country.capital || 'N/A'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
