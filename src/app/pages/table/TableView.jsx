'use client';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { apiStore } from '../../store/ApiStore';
import { filteredCountryStore } from '../../store/FilteredCountryStore';
import { Tables } from './Tables';
import { CountryModal } from '../modal/CountryModal';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const TableView = observer(() => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    apiStore.callApi();
  }, []);

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
          paddingX: '150px',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'auto',
        }}>
        <Table aria-label='country table'>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#272727', position: 'sticky', top: 0, zIndex: 1 }}>
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
          {/* Render countries */}
          <TableBody>
            {filteredCountryStore.filteredCountries.map((country, index) => (
              <Tables key={index} country={country} onClick={handleOpenModal} />
            ))}
          </TableBody>
        </Table>
        <CountryModal open={openModal} handleClose={handleCloseModal} country={selectedCountry} />
      </TableContainer>
    </>
  );
});

export default TableView;
