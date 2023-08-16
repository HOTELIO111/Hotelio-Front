import React from 'react';
import { Card, CardContent, Typography, Paper, Button } from '@mui/material';
import LocationIcon from '../../images/LocationIcon.png'
import BangloreIcon from '../../images/BangloreIcon.jpeg'
import DelhiIcons from '../../images/DelhiIcon.webp'
import GurgaonIcon from '../../images/GurgaonIcon.jpg'
import ChennaiIcon from '../../images/ChennaiIcon.jpg'
import AllcitiesIcon from '../../images/AllcitiesIcon.jpg'
import styled from 'styled-components';

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

        content: 'All Cities',
        image: AllcitiesIcon,
    },
];

const MobileDestination = () => {
    return (
        <>
            <CardContainer>
                {cardData.map((card, index) => (
                    <StyledCard key={index}>

                        <CardContent sx={{ padding: 0, textAlign: 'center' }}>
                            <Button>
                                <img src={card.image} className='rounded' alt={`Image ${index}`} />
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
