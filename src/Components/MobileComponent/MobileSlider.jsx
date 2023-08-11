import React from 'react';
import { Card, CardContent, Typography, Container, Paper } from '@mui/material';
import styled from 'styled-components';

const CardContainer = styled(Paper)`
  display: flex;
  overflow-x: auto;
  background: transparent !important;
  box-shadow: none !important;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  margin: 8px;
`;

const cardData = [
    {
        title: 'Card 1',
        content: 'Lorem ipsum dolor sit amet.',
        image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
    },
    {
        title: 'Card 2',
        content: 'Lorem ipsum dolor sit amet.',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
    {
        title: 'Card 2',
        content: 'Lorem ipsum dolor sit amet.',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
    {
        title: 'Card 2',
        content: 'Lorem ipsum dolor sit amet.',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
    {
        title: 'Card 2',
        content: 'Lorem ipsum dolor sit amet.',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
];

const ScrollableCardList = () => {
    return (
        <>
            <CardContainer>
                {cardData.map((card, index) => (
                    <StyledCard key={index}>

                        <CardContent>
                            {/* <Typography variant="h6">{card.title}</Typography> */}
                            <img src={card.image} alt={`Image ${index}`} />
                            {/* <Typography>{card.content}</Typography> */}
                        </CardContent>
                    </StyledCard>
                ))}
            </CardContainer>
        </>
    );
};

export default ScrollableCardList;
