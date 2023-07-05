import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProfileSetup from './ProfileSetup'
import Profile from './Profile'

const CustomerPro = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Navbar />
            <Profile />
            {/* <ProfileSetup /> */}
        </div>
    )
}

export default CustomerPro