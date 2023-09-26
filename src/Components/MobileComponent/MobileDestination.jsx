import React from 'react';
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

const cardData = [
    {

        content: 'Near me',
        image: LocationIcon,
    },
    {

        content: 'Bangalore',
        image: BangloreIcon,
    },
    {

        content: 'Chennai',
        image: ChennaiIcon,
    },
    {

        content: 'Delhi',
        image: DelhiIcons,
    },
    {

        content: 'Gurgaon',
        image: GurgaonIcon,
    },
    {

        content: 'Hyderabad',
        image: HyderabadIcon,
    },
    {

        content: 'Kolkata',
        image: KolkataIcon,
    },
    {

        content: 'Mumbai',
        image: MumbaiIcon,
    },
    {

        content: 'Noida',
        image: NoidaIcon,
    },
    {

        content: 'All cities',
        image: AllcitiesIcon,
    },
];

const MobileDestination = () => {

const navigate = useNavigate()

    return (
        <>
            <CardContainer className='my-4'>
                {cardData.map((card, index) => (
                    <StyledCard onClick={() => navigate('/allCities')} key={index}>

                        <CardContent sx={{ padding: 0, textAlign: 'center' }}>
                            <Button>
                                <img src={card.image} className='rounded' loading="lazy" alt={`Image ${index}`} />
                            </Button>
                        </CardContent>
                        <Typography>{card.content}</Typography>
                    </StyledCard>
                ))}

            </CardContainer>
        </>
    );
};

export default MobileDestination;
