import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import HotelList from './HotelList'
import Footer from '../../Components/footer/Footer'
import { Container, Grid } from '@mui/material'
import SideFilter from './SideFilter'

const HotelResults = () => {
    return (
        <div >
            <Navbar />
            <Container maxWidth='xl'>
                <Grid container spacing={1}>
                    <Grid item xl={2} lg={2} xs={12}>
                        <SideFilter />
                    </Grid>
                    <Grid item xl={10} lg={10} xs={12}>
                        <HotelList />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    )
}

export default HotelResults