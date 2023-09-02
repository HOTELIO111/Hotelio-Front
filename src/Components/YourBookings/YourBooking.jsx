import React from 'react'
import List from './List'
import Navbar from '../Navbar/Navbar'

const YourBooking = () => {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '70px' }}>
        <List />
      </div>
    </div>
  )
}

export default YourBooking