'use client';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { apiStore } from '../store/ApiStore';
import { filteredCountryStore } from '../store/FilteredCountryStore';
import { Cards } from './Card';
import { CountryModal } from './CountryModal';

const CardView = observer(() => {
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
      {/* Render countries */}
      <div className='flex flex-wrap justify-center'>
        {filteredCountryStore.filteredCountries.map((country, index) => (
          <Cards key={index} country={country} onClick={handleOpenModal} />
        ))}
      </div>
      <CountryModal open={openModal} handleClose={handleCloseModal} country={selectedCountry} />
    </>
  );
});

export default CardView;
