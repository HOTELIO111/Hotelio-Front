import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Profile from './Profile'
import MobileHeader from '../../Components/MobileComponent/MobileHeader'
import MobileFooter from '../../Components/MobileComponent/MobileFooter'
import { isMobile } from 'react-device-detect'
import Footer from '../../Components/footer/Footer'

const CustomerPro = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            {isMobile ? <MobileHeader /> : <Navbar />}
            <Profile />
            {isMobile ? <MobileFooter /> : <Footer />}
        </div>
    )
}

export default CustomerPro