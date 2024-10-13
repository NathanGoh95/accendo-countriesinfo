import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';

export const Cards = ({ country, onClick }) => {
  return (
    <Card
      sx={{
        maxWidth: '250px',
        maxHeight: '300px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '5px',
        overflow: 'hidden',
        boxShadow: '0 4px 32px rgba(137,194,217, 0.2)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 8px 16px rgba(137,194,217, 0.4)',
        },
      }}
      onClick={() => onClick(country)}>
      <CardMedia component='img' sx={{ width: '250px', height: '140px', objectFit: 'cover' }} image={country.flags} alt={`${country.name} flag`} />

      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {country.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Population: {country.population}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Region: {country.region}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Capital: {country.capital || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};
