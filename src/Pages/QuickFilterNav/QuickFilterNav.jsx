import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import HotelBudget from '../../images/HotelInBudget.png';
import PrimeHotel from '../../images/PrimeHotel.png';
// import LuxuryHotel from '../../images/LuxuryHotel.png';
import HomeStay from '../../images/HomeStay.png';
import { useNavigate } from 'react-router-dom';
import style from './QuickFilterNav.module.css'



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

        <>
            <div style={{ width: "100%" }} className={style.mainDiv}>
                <div onClick={() => navigate('/searchedhotels')} style={{ objectFit: "cover", objectPosition: 'center' }} className={style.cardStyle}>
                    <img src={PrimeHotel} style={{ borderRadius: "1rem" }} alt="PrimeHotel" />
                    <h5>Hotelio Premium</h5>
                </div>
                <div onClick={() => navigate('/searchedhotels')} style={{ objectFit: "cover", objectPosition: 'center' }} className={style.cardStyle}>
                    <img src={HomeStay} style={{ borderRadius: "1rem" }} alt="HomeStay" />
                    <h5>Hotelio Home Stay</h5>
                </div>
                <div onClick={() => navigate('/searchedhotels')} style={{ objectFit: "cover", objectPosition: 'center' }} className={style.cardStyle}>
                    <img src={HotelBudget} style={{ borderRadius: "1rem" }} alt="HotelBudget" />
                    <h5>Hotelio Budget</h5>
                </div>
            </div>
        </>

        // <Container className='mt-5' maxWidth="md">

        // <Grid container spacing={1} justifyContent="center" >
        //     <Grid bgcolor={'#fff'} xs={12} sm={6} md={4} borderRadius={5} boxShadow={'10px 10px 10px 0px rgba(0,0,0,0.2)'} width={30} sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
        //         <div onClick={() => navigate('/searchedhotels')} className={style.cardStyle}>
        //             <img width={50} src={HotelBudget} alt="HotelBudget" />
        //         </div>
        //         <StyledHeading variant="h6">Hotel in Budget</StyledHeading>
        //     </Grid>
        //     <Grid bgcolor={'#fff'} xs={12} sm={6} md={4} borderRadius={5} boxShadow={'10px 10px 10px 0px rgba(0,0,0,0.2)'} width={30} sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
        //         <div onClick={() => navigate('/searchedhotels')} className={style.cardStyle}>
        //             <img width={50} src={HomeStay} alt="HomeStay" />
        //         </div>
        //         <StyledHeading variant="h6">Home Stay</StyledHeading>
        //     </Grid>
        //     <Grid bgcolor={'#fff'} xs={12} sm={6} md={4} borderRadius={5} boxShadow={'10px 10px 10px 0px rgba(0,0,0,0.2)'} width={30} sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
        //         <div onClick={() => navigate('/searchedhotels')} className={style.cardStyle}>
        //             <img width={50} src={PrimeHotel} alt="PrimeHotel" />
        //         </div>
        //         <StyledHeading variant="h6">Prime Hotels</StyledHeading>
        //     </Grid >
        // </Grid >
        // </Container >
    );
};

export default QuickFilterNav;
