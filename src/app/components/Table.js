import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export const Tables = ({ countries, onRowClick }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        margin: 'auto',
        paddingX: '150px',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Table sx={{ minWidth: 650 }} aria-label='country table'>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#272727' }}>
            <TableCell sx={{ width: '10%' }}></TableCell>
            <TableCell sx={{ width: '18%', color: '#F1F1F1', fontWeight: 'bold' }}>
              Population
            </TableCell>
            <TableCell sx={{ width: '18%', color: '#F1F1F1', fontWeight: 'bold' }}>
              Region
            </TableCell>
            <TableCell sx={{ width: '18%', color: '#F1F1F1', fontWeight: 'bold' }}>
              Capital
            </TableCell>
            <TableCell sx={{ width: '20%', color: '#F1F1F1', fontWeight: 'bold' }}>
              Country
            </TableCell>
            <TableCell sx={{ width: '16%', color: '#F1F1F1', fontWeight: 'bold' }}>
              Currency
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries.map((country, idx) => (
            <TableRow
              key={idx}
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
                  style={{ width: '50px', height: '30px', borderRadius: '5px', objectFit: 'cover' }}
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
