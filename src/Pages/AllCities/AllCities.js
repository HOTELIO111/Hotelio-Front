import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { isMobile } from 'react-device-detect';
import MobileHeader from '../../Components/MobileComponent/MobileHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageLoader from "../../Utilis/PageLoader";

const AllCities = () => {

  const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [show, setHide] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'https://countriesnow.space/api/v0.1/countries/cities';

    const requestBody = {
      "country": "india"
    };

    axios.post(apiUrl, requestBody)
      .then((response) => {
        setCities(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);


  const [filteredStates, setFilteredStates] = useState(cities);

  const handleAlphabetClick = (letter) => {
    setHide(true)
    const filtered = cities.filter((state) =>
      state.toUpperCase().startsWith(letter)
    );
    setFilteredStates(filtered.length > 0 ? filtered : ['NA']);
  };

  const handleCityClick = (city) => {
    navigate(`/searchedhotels?location=${city}`);
  };

  console.log(cities)

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
        <PageLoader loading={loading} />
        {
          show
            ? filteredStates.map((item, index) => (
              <Grid item py={1} xs={6} lg={2} key={index} textAlign={'center'}>
                <Typography sx={{ cursor: 'pointer' }} onClick={() => handleCityClick(item)} variant='h6'>{item}</Typography>
              </Grid>
            ))
            : cities.map((item, index) => (
              <Grid item py={1} xs={6} lg={2} key={index} textAlign={'center'}>
                <Typography sx={{ cursor: 'pointer' }} onClick={() => handleCityClick(item)} variant='h6'>{item}</Typography>
              </Grid>
            ))
        }

      </Grid>
    </div>
  );
};

export default AllCities;
