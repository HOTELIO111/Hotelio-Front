import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import HotelBudgetTwo from '../../images/HotelInBudgetTwo.png';
import PrimeHotelTwo from '../../images/PrimeHotelTwo.png';
import HomeStayTwo from '../../images/HomeStayTwo.png';

const cardStyles = {
    position: 'relative',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
    padding: '10px',
    filter: 'invert(1)'
};

const titleStyles = {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0, 0, 0, 0.7)',
    color: '#11d1db',
    padding: '1px',
    textAlign: 'center',
    width: '100%',
};

const Premiumcard = () => {
    const cardData = [
        { imageUrl: PrimeHotelTwo, title: 'Premium' },
        { imageUrl: HotelBudgetTwo, title: 'Homestay' },
        { imageUrl: HomeStayTwo, title: 'Budget' },
    ];

    return (
        <div className='py-3'>
            <Grid container spacing={2}>
                {cardData.map((card, index) => (
                    <Grid key={index} item xs={4} sm={4} md={3}>
                        <Card style={cardStyles}>
                            <CardMedia
                                component="img"
                                alt={`Image ${index + 1}`}
                                style={{ minHeight: '100px', maxHeight: '100px' }}
                                image={card.imageUrl}
                            />
                            <Typography variant="body1" style={titleStyles}>
                                {card.title}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Premiumcard;
