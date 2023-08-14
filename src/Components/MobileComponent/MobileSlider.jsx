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
        title: 'Hotel',
        para: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        content: '(4.1 rating)',
        image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
    },
    {
        title: 'Hotel',
        para: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        content: '(4.2 rating)',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
    {
        title: 'Hotel',
        para: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        content: '(4.1 rating)',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
    {
        title: 'Hotel',
        para: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        content: '(4.4 rating)',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
    {
        title: 'Hotel',
        para: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        content: '(3.8 rating)',
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
                            <img src={card.image} alt={`Image ${index}`} />
                            <div className="d-flex justify-content-between">
                                <Typography>{card.title}</Typography>
                                <Typography>{card.content}</Typography>
                            </div>
                            <Typography>{card.para}</Typography>
                        </CardContent>
                    </StyledCard>
                ))}

            </CardContainer>
        </>
    );
};

export default ScrollableCardList;
