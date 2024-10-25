'use client';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { apiStore } from '../store/ApiStore';
import { filteredCountryStore } from '../store/FilteredCountryStore';
import { pageModeStore } from '../store/PageModeStore';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { Tables } from './Table';
import { CountryModal } from './CountryModal';

const TableView = observer(() => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    apiStore.callApi();
  }, []);

  const onSelectRegion = (value) => {
    filteredCountryStore.setSelectedRegion(value);
  };

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
      {/* Render countries */}
      <div>
        <Tables countries={filteredCountryStore.filteredCountries} onRowClick={handleOpenModal} />
      </div>
      <CountryModal open={openModal} handleClose={handleCloseModal} country={selectedCountry} />
    </>
  );
});

export default TableView;
