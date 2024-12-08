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
      <TableCell sx={{ display: { xs: 'table-cell', md: 'table-cell' }, order: { xs: 1, md: 'unset' } }}>
        <Box sx={{ width: { xs: '50%', md: '30%' } }}>
          <img src={country.flags} alt={`${country.name} flag`} style={{ aspectRatio: '3/2', borderRadius: '5px', objectFit: 'cover' }} />
        </Box>
      </TableCell>
      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{country.population}</TableCell>
      <TableCell sx={{ display: { xs: 'table-cell', md: 'table-cell' }, order: { xs: 3, md: 'unset' } }}>{country.region}</TableCell>
      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{country.capital}</TableCell>
      <TableCell sx={{ display: { xs: 'table-cell', md: 'table-cell' }, order: { xs: 2, md: 'unset' } }}>{country.name}</TableCell>
      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
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
