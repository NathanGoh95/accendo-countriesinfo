import { Chip, TableCell, TableRow } from '@mui/material';

export const Tables = ({ country, onRowClick }) => {
  return (
    <TableRow
      onClick={() => onRowClick(country)}
      sx={{
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': { backgroundColor: '#89C2D9' },
        transition: 'background-color 0.3s ease-in-out',
      }}>
      <TableCell>
        <img
          src={country.flags}
          alt={`${country.name} flag`}
          style={{ width: '40%', aspectRatio: '3/2', borderRadius: '5px', objectFit: 'cover' }}
        />
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
              backgroundColor: '#f5f5f5',
              border: '1px solid #e0e0e0',
              fontWeight: 'bold',
            }}
          />
        ))}
      </TableCell>
    </TableRow>
  );
};
