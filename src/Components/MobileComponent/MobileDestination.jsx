import React, { useState } from 'react';
import { Card, CardContent, Typography, Paper, Button } from '@mui/material';
import AllcitiesIcon from '../../images/AllcitiesIcon.jpg'
import LocationIcon from '../../images/LocationIcon.png'
import BangloreIcon from '../../images/BangloreIcon.jpeg'
import DelhiIcons from '../../images/DelhiIcon.webp'
import GurgaonIcon from '../../images/GurgaonIcon.jpg'
import ChennaiIcon from '../../images/ChennaiIcon.jpg'
import HyderabadIcon from '../../images/HyderabadIcon.jpg'
import KolkataIcon from '../../images/KolkataIcon.jpg'
import MumbaiIcon from '../../images/MumbaiIcon.jpg'
import NoidaIcon from '../../images/NoidaIcon.jpg'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCollections } from '../../context/useStateManager';


const CardContainer = styled(Paper)`
  display: flex;
  overflow-x: auto;
  background: transparent !important;
  box-shadow: none !important;
`;

const StyledCard = styled(Card)`
  min-width: 80px;
  max-width: 80px;
  min-height: 80px;
  max-height: 80px;
  margin: 4px;
  text-align: center;
`;


const cityCoordinates = {
    'Bangalore': {
        latitude: 12.9716,
        longitude: 77.5946,
        image: BangloreIcon,
    },
    'Chennai': {
        latitude: 13.0827,
        longitude: 80.2707,
        image: ChennaiIcon,
    },
    'Delhi': {
        latitude: 28.6139,
        longitude: 77.2090,
        image: DelhiIcons,
    },
    'Gurgaon': {
        latitude: 28.4595,
        longitude: 77.0266,
        image: GurgaonIcon,
    },
    'Hyderabad': {
        latitude: 17.3850,
        longitude: 78.4867,
        image: HyderabadIcon,
    },
    'Kolkata': {
        latitude: 22.5726,
        longitude: 88.3639,
        image: KolkataIcon,
    },
    'Mumbai': {
        latitude: 19.0760,
        longitude: 72.8777,
        image: MumbaiIcon,
    },
    'Noida': {
        latitude: 28.5355,
        longitude: 77.3910,
        image: NoidaIcon,
    }
};

const MobileDestination = () => {
    const { handleCityClick } = useCollections();
    const navigate = useNavigate();

    return (
        <>
            <CardContainer className='my-4'>
                <StyledCard>
                    <CardContent sx={{ padding: 0, textAlign: 'center' }}>
                        <Button>
                            <img src={LocationIcon} className='rounded' loading="lazy" alt='nearme' />
                        </Button>
                    </CardContent>
                    <Typography>Near me</Typography>
                </StyledCard>
                {Object.keys(cityCoordinates).map((city, index) => (
                    <StyledCard onClick={() => handleCityClick(city)} key={index}>
                        <CardContent sx={{ padding: 0, textAlign: 'center' }}>
                            <Button>
                                <img src={cityCoordinates[city].image} className='rounded' loading="lazy" alt={`Image ${index}`} />
                            </Button>
                        </CardContent>
                        <Typography>{city}</Typography>
                    </StyledCard>
                ))}
                <StyledCard>
                    <CardContent sx={{ padding: 0, textAlign: 'center' }}>
                        <Button onClick={() => navigate("/allCities")}>
                            <img src={AllcitiesIcon} className='rounded' loading="lazy" alt='nearme' />
                        </Button>
                    </CardContent>
                    <Typography>All Cities</Typography>
                </StyledCard>
            </CardContainer>
        </>
    );
};

export default MobileDestination;
