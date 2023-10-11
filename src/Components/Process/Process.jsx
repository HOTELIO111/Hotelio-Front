import React from 'react'
import { Box, Card, Grid, Typography } from '@mui/material'
import ProcessImage from '../../images/Process.png'
import style from './Process.module.css'

const Process = () => {
    return (
        <div>
            <div>
                {/* <img style={{ width: '100%' }} src={ProcessImage} alt="Process" /> */}
                <div>
                    <Box sx={{ flexGrow: 1, textAlign: 'center', padding: '20px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Card className={style.processCardStyle} >
                                <img style={{ width: '180px', height: '180px' }} className='rounded-circle animate__animated animate__bounce animate__delay-3s' src="https://img.freepik.com/free-vector/real-estate-searching-concept_23-2148639937.jpg?w=740&t=st=1689235690~exp=1689236290~hmac=3f748d38133c3fbe944579f19fc04a40d482edd7a83631f87b54709146a1b33f" alt="" />
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
                                <img style={{ width: '180px', height: '180px' }} className='rounded-circle animate__animated animate__bounce animate__delay-3s' src="https://img.freepik.com/free-vector/hotel-booking-concept-flat-style_23-2148167146.jpg?w=740&t=st=1689236031~exp=1689236631~hmac=19d6f7e7369231b0a0e31767af8967849647487cca32e1d397a5effbeb9e6267" alt="" />
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
                                <img style={{ width: '180px', height: '180px' }} className='rounded-circle animate__animated animate__bounce animate__delay-3s' src="https://img.freepik.com/free-vector/refreshing-from-summer-heat-concept-illustration_114360-5805.jpg?size=626&ext=jpg&uid=R102512588&ga=GA1.2.703551834.1682442547&semt=sph" alt="" />
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
