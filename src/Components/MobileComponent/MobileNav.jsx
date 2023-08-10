import React from 'react'
import { Link } from 'react-router-dom'
import HotelioLogo from "../../images/HotelioLogo.png";
import { FiPhoneCall } from "react-icons/fi";
import { BottomNavigation, BottomNavigationAction, Container, Grid } from '@mui/material';
import MobileFooter from './MobileFooter';

const MobileNav = () => {
    return (
        <>
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={4} style={{ display: 'grid', placeItems: 'center' }}>

                    </Grid>
                    <Grid item xs={4} style={{ display: 'grid', placeItems: 'center' }}>
                        <div className="d-flex justify-content-end align-items-center">
                            <Link to="/" >
                                <img alt="logo" style={{ width: '100px' }} src={HotelioLogo} />
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'grid', placeItems: 'center' }}>
                        <div className="d-flex justify-content-end align-items-center">
                            <Link to="/contact" >
                                <FiPhoneCall size={20} />
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <div className='bg-white p-1'>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <p><b>Welcome To Hotelio Rooms</b></p>
                    </Grid>
                    <Grid item xs={12}>
                        <MobileFooter />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default MobileNav