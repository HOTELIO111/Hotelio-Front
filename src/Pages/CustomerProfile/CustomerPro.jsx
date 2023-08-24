import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProfileSetup from './ProfileSetup'
import Profile from './Profile'
import MobileHeader from '../../Components/MobileComponent/MobileHeader'

const CustomerPro = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <div className="d-lg-none d-xl-none">
                <MobileHeader />
            </div>
            <div className='d-none d-md-none d-sm-none d-lg-block d-xl-block'>
                <Navbar />
            </div>
            <Profile />
            {/* <ProfileSetup /> */}
        </div>
    )
}

export default CustomerPro