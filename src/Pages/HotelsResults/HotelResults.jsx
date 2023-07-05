import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Filters from './Filters'
import HotelList from './HotelList'
import Footer from '../../Components/footer/Footer'

const HotelResults = () => {
    return (
        <div className='min-vh-100'>
            <Navbar />
            <Filters />
            <HotelList />
            <Footer />
        </div>
    )
}

export default HotelResults