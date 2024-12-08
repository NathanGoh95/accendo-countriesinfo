'use client';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { apiStore } from '../../store/ApiStore';
import { filteredCountryStore } from '../../store/FilteredCountryStore';
import { Tables } from './Tables';
import { CountryModal } from '../modal/CountryModal';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';

const TableView = observer((country) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [openModal, setOpenModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleOpenModal = (country) => {
    setSelectedCountry(country);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCountry(null);
  };

  return (
    <>
      <TableContainer
        sx={{
          width: '100%',
          margin: 'auto',
          px: { xs: '1rem', md: '13rem' },
          py: '2rem',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'auto',
        }}>
        <Table aria-label='country table'>
          <TableHead>
            <TableRow sx={{ backgroundColor: isDarkMode ? '#020617' : '#272727' }}>
              <TableCell sx={{ width: { xs: '35%', md: '10%', order: { xs: 1, md: 'unset' } } }}></TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, width: { xs: '0', md: '18%' }, color: '#F1F1F1', fontWeight: 'bold' }}>Population</TableCell>
              <TableCell sx={{ width: { xs: '30%', md: '18%' }, order: { xs: 3, md: 'unset' }, color: '#F1F1F1', fontWeight: 'bold' }}>Region</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, width: { xs: '0', md: '18%' }, color: '#F1F1F1', fontWeight: 'bold' }}>Capital</TableCell>
              <TableCell sx={{ width: { xs: '35%', md: '20%' }, order: { xs: 2, md: 'unset' }, color: '#F1F1F1', fontWeight: 'bold' }}>Country</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, width: { xs: '0', md: '16%' }, color: '#F1F1F1', fontWeight: 'bold' }}>Currency</TableCell>
            </TableRow>
          </TableHead>
          {/* Render countries */}
          <TableBody>
            {filteredCountryStore.filteredCountries.map((country, index) => (
              <Tables key={index} country={country} onRowClick={handleOpenModal} />
            ))}
          </TableBody>
        </Table>
        <CountryModal open={openModal} handleClose={handleCloseModal} country={selectedCountry} />
      </TableContainer>
    </>
  );
});

export default TableView;
