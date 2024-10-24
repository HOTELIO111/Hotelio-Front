import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import HotelBudgetTwo from '../../images/HotelInBudgetTwo.webp';
import PrimeHotelTwo from '../../images/PrimeHotelTwo.webp';
import HomeStayTwo from '../../images/HomeStayTwo.webp';
import { useNavigate } from 'react-router';

const cardStyles = {
    position: 'relative',
    boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
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
    width: '100%'
};

const Premiumcard = () => {

    const navigate = useNavigate()

    const cardData = [
        { imageUrl: PrimeHotelTwo, title: 'Premium' },
        { imageUrl: HotelBudgetTwo, title: 'Homestay' },
        { imageUrl: HomeStayTwo, title: 'Budget' },
    ];

    return (
        <div className='my-4'>
            <Grid container spacing={2}>
                {cardData.map((card, index) => (
                    <Grid key={index} item xs={4} sm={4} md={3}>
                        <Card onClick={() => navigate('/searched-hotels')} style={cardStyles}>
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
