'use client';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { filteredCountryStore } from '@components/app/store/FilteredCountryStore';
import { Cards } from './Cards';
import { apiStore } from '@components/app/store/ApiStore';
import { CountryModal } from '../modal/CountryModal';

const CardView = observer(() => {
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
      {/* Render countries */}
      <div className='flex flex-wrap justify-center px-[10rem]'>
        {filteredCountryStore.filteredCountries.map((country, index) => (
          <div key={index}>
            <Cards country={country} onClick={handleOpenModal} />
          </div>
        ))}
      </div>
      <CountryModal open={openModal} handleClose={handleCloseModal} country={selectedCountry} />
    </>
  );
});

export default CardView;
