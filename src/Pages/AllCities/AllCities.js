import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

const AllCities = () => {
  const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

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

  return (
    <>
      <Grid container spacing={1} bgcolor={'#ee2e24'}>
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
          <Grid item py={1} xs={2} key={index}>
            <Typography variant='h6'>{item}</Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AllCities;
