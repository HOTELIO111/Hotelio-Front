import { Card, CardContent, Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import React from 'react'
import MobileFooter from '../MobileComponent/MobileFooter';
import MobileHeader from '../MobileComponent/MobileHeader';

const Favourite = () => {


    const FavouriteData = [
        {
            id: 1,
            title: 'Hotel',
            para: 'Lorem ipsum dolor sit amet.',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
        {
            id: 2,
            title: 'Hotel',
            para: 'Lorem ipsum dolor sit amet.',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
        {
            id: 3,
            title: 'Hotel',
            para: 'Lorem ipsum dolor sit amet.',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
        {
            id: 4,
            title: 'Hotel',
            para: 'Lorem ipsum dolor sit amet.',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
    ]


    const StyledCard = styled(Card)`
  min-width: 150px;
  margin: 2px;
`;

    return (
        <div>
            <MobileHeader />
            <Grid container spacing={1}>
                {
                    FavouriteData.map((card, index) => (

                        <Grid sx={{ padding: 1 }} item xs={6} md={6}>
                            <StyledCard key={index}>

                                <CardContent>
                                    <img src={card.image} className='rounded' alt={`Image ${index}`} />
                                    <div className="d-flex justify-content-between">
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {card.title}
                                        </Typography>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {card.content}
                                        </Typography>
                                    </div>
                                    {/* <Typography variant='small'></Typography> */}
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {card.para}
                                    </Typography>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    ))
                }
            </Grid>
            <div>
                <MobileFooter />
            </div>
        </div>
    )
}

export default Favourite