import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/footer/Footer'
import { Grid } from '@mui/material'
import BookingSteps from '../../Components/Booking/BookingSteps'

const Booking = () => {
    return (
        <>
            <Navbar />
            <div style={{ marginTop: '80px', marginBottom:'20px' }} className='container'>
                <BookingSteps />
            </div>
            <Footer />
        </>
    )
}

export default Booking