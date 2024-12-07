import { Box, Chip, TableCell, TableRow, useTheme } from '@mui/material';

export const Tables = ({ country, onRowClick }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <TableRow
      onClick={() => onRowClick(country)}
      sx={{
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': { backgroundColor: isDarkMode ? '#6e6e6e' : '#89C2D9' },
        transition: 'background-color 0.3s ease-in-out',
      }}>
      <TableCell>
        <Box sx={{ width: '30%'}}>
          <img src={country.flags} alt={`${country.name} flag`} style={{ aspectRatio: '3/2', borderRadius: '5px', objectFit: 'cover' }} />
        </Box>
      </TableCell>
      <TableCell>{country.population}</TableCell>
      <TableCell>{country.region}</TableCell>
      <TableCell>{country.capital}</TableCell>
      <TableCell>{country.name}</TableCell>
      <TableCell>
        {country.currencies.map((currency, idx) => (
          <Chip
            key={idx}
            label={currency}
            size='small'
            sx={{
              marginRight: '4px',
              backgroundColor: isDarkMode ? '3c3c3c' : '#f5f5f5',
              border: '1px solid #e0e0e0',
              fontWeight: 'bold',
            }}
          />
        ))}
      </TableCell>
    </TableRow>
  );
};
