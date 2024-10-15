import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const Tables = ({ countries, onRowClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='country table'>
        <TableHead>
          <TableRow>
            <TableCell>Flag</TableCell>
            <TableCell>Population</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Capital</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Currency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries.map((country, index) => (
            <TableRow key={index} onClick={() => onRowClick(country)} hover sx={{ cursor: 'pointer' }}>
              <TableCell>
                <img src={country.flags} alt={`${country.name} flag`} style={{ width: '40px', height: '25px' }} />
              </TableCell>
              <TableCell>{country.population}</TableCell>
              <TableCell>{country.region}</TableCell>
              <TableCell>{country.capital}</TableCell>
              <TableCell>{country.name}</TableCell>
              <TableCell>{country.currencies.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
