import React from 'react';
import { Card, CardMedia, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import HotelBudget from '../../images/HotelInBudget.png';
import PrimeHotel from '../../images/PrimeHotel.png';
// import LuxuryHotel from '../../images/LuxuryHotel.png';
import HomeStay from '../../images/HomeStay.png';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    borderRadius: '50%',
    margin: theme.spacing(1),
    backgroundColor: 'transparent',
    filter: 'drop-shadow(10px 8px 6px #f0f0f0)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
    height: '250px',
    padding: theme.spacing(0),
    border: '3px solid red',
    cursor: 'pointer',
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
    color: '#ff5419',
    textAlign: 'center',
    padding: theme.spacing(0),
    width: '100%',
    boxShadow: 'none',
}));

const QuickFilterNav = () => {
    const navigate = useNavigate();

    return (
        <Container className='mt-5' maxWidth="md">
            <Grid container spacing={5} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard onClick={() => navigate('/searchedhotels')}>
                        <CardMedia
                            component="img"
                            width="120"
                            height="120"
                            image={HotelBudget}
                            alt="Hotel in Budget"
                        />
                    </StyledCard>
                    <StyledHeading variant="h6">Hotel in Budget</StyledHeading>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard onClick={() => navigate('/searchedhotels')}>
                        <CardMedia
                            component="img"
                            width="120"
                            height="120"
                            image={HomeStay}
                            alt="Home Stay"
                        />
                    </StyledCard>
                    <StyledHeading variant="h6">Home Stay</StyledHeading>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard onClick={() => navigate('/searchedhotels')}>
                        <CardMedia
                            component="img"
                            width="120"
                            height="120"
                            image={PrimeHotel}
                            alt="Prime Hotels"
                        />
                    </StyledCard>
                    <StyledHeading variant="h6">Prime Hotels</StyledHeading>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={3}>
                    <StyledCard onClick={() => navigate('/searchedhotels')}>
                        <CardMedia
                            component="img"
                            width="120"
                            height="120"
                            image={LuxuryHotel}
                            alt="Luxury Hotels"
                        />
                    </StyledCard>
                    <StyledHeading variant="h6">Luxury Hotels</StyledHeading>
                </Grid> */}
            </Grid>
        </Container>
    );
};

export default QuickFilterNav;
