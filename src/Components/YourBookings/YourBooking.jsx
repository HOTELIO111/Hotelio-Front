import React from 'react'
import List from './List'
import Navbar from '../Navbar/Navbar'
import { isMobile } from 'react-device-detect'
import MobileHeader from '../MobileComponent/MobileHeader'
import MobileFooter from '../MobileComponent/MobileFooter'
import Footer from '../footer/Footer'
import styles from './List.module.css'

const YourBooking = () => {
  return (
    <div>
      <div style={{ position: 'absolute', zIndex: 1 }}>
        {isMobile ? <MobileHeader /> : <Navbar />}
        <div style={isMobile ? { paddingBottom: '70px' } : { marginTop: '20px' }}>
          <List />
        </div>
        {isMobile ? <MobileFooter /> : <Footer />}
      </div>
      <div style={{ zIndex: 2 }}>
        <ul className={styles.stylesbackground}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default YourBooking