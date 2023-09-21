import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/footer/Footer'
import BookingSteps from '../../Components/Booking/BookingSteps'
import MobileFooter from '../../Components/MobileComponent/MobileFooter'
import MobileHeader from '../../Components/MobileComponent/MobileHeader'
import { isMobile } from 'react-device-detect'

const Booking = () => {
    return (
        <>
            {isMobile ? <MobileHeader /> : <Navbar />}
            <div style={isMobile ? { marginTop: '5px', marginBottom: '50px' } : { marginTop: '80px', marginBottom: '20px' }} className='container'>
                <BookingSteps />
            </div>
            {isMobile ? <MobileFooter /> : <Footer />}
        </>
    )
}

export default Booking