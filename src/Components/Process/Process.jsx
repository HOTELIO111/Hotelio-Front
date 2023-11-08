import React from 'react'
import { Box, Card, Grid, Typography } from '@mui/material'
import ProcessImage from '../../images/Process.png'
import SearchSelect from '../../images/Search-Select.webp'
import BookConfirm from '../../images/Book-Confirm.webp'
import EnjoyBooking from '../../images/EnjoyHotel.webp'
import style from './Process.module.css'
import { useState } from 'react'

const Process = () => {


    const [readMore, setReadless] = useState(false)

    return (
        <div>


            <div>
                <div className="p-2 text-center">
                    <h1>Best Online Hotel Booking Sites in India - Hoteliorooms</h1>
                    <hr />
                    <Typography variant="body1" textAlign={'left'} className='p-2'>
                        Hotelio Rooms is the <b>best online hotel booking in India</b> with multiple features that directly help you get all the convenient stuff during your trip. As an AI-based responsive service, it is capable of assisting you with the website or app where you can get all the facilities you are looking for. It will not be an exaggeration to say that once you get the pleasurable experience of booking with enormous facilities, you will always choose this for your planned booking.
                        Considering all your luxurious desires and comfort, it is there to help you choose the stay with all the features and benefits that care for your budget and desire.{readMore === false && <b style={{ cursor: 'pointer' }} onClick={() => setReadless(true)} className="text-primary" >...read more</b>} {readMore === true && <Typography variant='body1'> With the accumulation of the perfect data and information, <b>hotelio rooms</b> is your best travelling partner while online hotel booking by providing appropriate, desired, and pleasurable services. It’s not just an advanced website that facilitates enormous clients as per their budget and all, but it also takes care of your precious time by helping with automated check-in and check-out. It grasps all your feedback and requirements and provides the outcome as per your needs so that once you get an online hotel booking in India, you will be its fan forever. The website or app can be used for bookings in different places and locations, such as <b>booking in Lucknow</b>. Ultimately, connect to hotelio room to get an evergreen online partner to enjoy your wanderlust.{readMore === true && <b style={{ cursor: 'pointer' }} onClick={() => setReadless(false)} className="text-primary" > read less</b>}</Typography>}
                    </Typography>
                    <hr />
                </div>
                {/* <img style={{ width: '100%' }} src={ProcessImage} alt="Process" /> */}
                <div>
                    <Box sx={{ flexGrow: 1, textAlign: 'center', padding: '20px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Card className={style.processCardStyle} >
                                    <img style={{ width: '180px', height: '180px' }} className='rounded-circle animate__animated animate__bounce animate__delay-3s' src={SearchSelect} alt="SearchSelect" />
                                    <Typography variant="h5" color='#FFD700' className='py-2' gutterBottom>
                                        <b>Search & Select</b>
                                    </Typography>
                                    <Typography variant="p" gutterBottom>
                                        Browse our wide range
                                        of accommodations
                                        and select your
                                        preferred stay based
                                        on location, amenities,
                                        and budget.
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card className={style.processCardStyle}>
                                    <img style={{ width: '180px', height: '180px' }} className='rounded-circle animate__animated animate__bounce animate__delay-3s' src={BookConfirm} alt="BookConfirm" />
                                    <Typography variant="h5" color='#FFD700' className='py-2' gutterBottom>
                                        <b>Book & Confirm</b>
                                    </Typography>
                                    <Typography variant="p" gutterBottom>
                                        Complete the booking
                                        process by providing
                                        necessary details and
                                        make a secure payment to
                                        confirm your reservation.
                                    </Typography>
                                </Card>

                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card className={style.processCardStyle}>
                                    <img style={{ width: '180px', height: '180px' }} className='rounded-circle animate__animated animate__bounce animate__delay-3s' src={EnjoyBooking} alt="EnjoyBooking" />
                                    <Typography variant="h5" color='#FFD700' className='py-2' gutterBottom>
                                        <b>Enjoy Your Stay</b>
                                    </Typography>
                                    <Typography variant="p" gutterBottom>
                                        Arrive at your chosen
                                        accommodation, present your
                                        booking confirmation, and
                                        enjoy a comfortable stay with Hotelio.
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Process
