import React from 'react'
import List from './List'
import Navbar from '../Navbar/Navbar'
import { isMobile } from 'react-device-detect'
import MobileHeader from '../MobileComponent/MobileHeader'
import MobileFooter from '../MobileComponent/MobileFooter'
import Footer from '../footer/Footer'

const YourBooking = () => {
  return (
    <div>
      {isMobile ? <MobileHeader /> : <Navbar />}
      <div style={isMobile ? { paddingBottom: '70px' } : { marginTop: '70px' }}>
        <List />
      </div>
      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  )
}

export default YourBooking