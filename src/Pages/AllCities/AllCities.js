import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { isMobile } from 'react-device-detect';
import MobileHeader from '../../Components/MobileComponent/MobileHeader';
import { useNavigate } from 'react-router-dom';

const AllCities = () => {
  const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const navigate = useNavigate();

  const indianStates = [
    'Lucknow',
    'Kanpur',
    'Varanasi',
    'Agra',
    'Prayagraj (Allahabad)',
    'Ghaziabad',
    'Meerut',
    'Bareilly',
    'Aligarh',
    'Moradabad',
    'Saharanpur',
    'Gorakhpur',
    'Noida',
    'Firozabad',
    'Jhansi',
    'Muzaffarnagar',
    'Mathura',
    'Budaun',
    'Rampur',
    'Shahjahanpur',
    'Farrukhabad',
    'Hapur',
    'Etawah',
    'Mirzapur',
    'Sambhal',
    'Amroha',
    'Hardoi',
    'Fatehpur',
    'Raebareli'
  ];

  const [filteredStates, setFilteredStates] = useState(indianStates);

  const handleAlphabetClick = (letter) => {
    const filtered = indianStates.filter((state) =>
      state.toUpperCase().startsWith(letter)
    );
    setFilteredStates(filtered.length > 0 ? filtered : ['NA']);
  };

  const handleCityClick = (city) => {
    navigate(`/searchedhotels?location=${city}`);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {isMobile ? <MobileHeader /> : <Navbar />}
      <Grid container spacing={1} sx={isMobile ? '' : { marginTop: '80px' }} bgcolor={'#ee2e24'}>
        {alphabet.map((item) => (
          <Grid item key={item}>
            <Button
              variant='text'
              sx={{ color: '#fff' }}
              onClick={() => handleAlphabetClick(item)}
            >
              {item}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid spacing={2} p={2} container>
        {filteredStates.map((item, index) => (
          <Grid item py={1} xs={6} lg={2} key={index} textAlign={'center'}>
            <Typography sx={{ cursor: 'pointer' }} onClick={() => handleCityClick(item)} variant='h6'>{item}</Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllCities;
