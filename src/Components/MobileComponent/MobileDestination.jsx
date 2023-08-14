import React from 'react';
import { Card, CardContent, Typography, Paper, Button } from '@mui/material';
import LocationIcon from '../../images/LocationIcon.png'
import styled from 'styled-components';

const CardContainer = styled(Paper)`
  display: flex;
  overflow-x: auto;
  background: transparent !important;
  box-shadow: none !important;
`;

const StyledCard = styled(Card)`
  min-width: 100px;
  max-width: 90px;
  min-height: 100px;
  max-height: 100px;
  margin: 4px;
  text-align: center;
`;

const cardData = [
    {

        content: 'Near me',
        image: LocationIcon,
    },
    {

        content: 'Near me',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
    {

        content: 'Near me',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
    {

        content: 'Near me',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
    {

        content: 'Near me',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
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
                                <img src={card.image} alt={`Image ${index}`} />
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
