import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/footer/Footer'
import HotelCover from './HotelCover'
import Detail from './Detail'

const HotelDetail = () => {
    return (
        <>
            <Navbar />
            <HotelCover />
            <Detail/>
            <Footer />
        </>
    )
}

export default HotelDetail