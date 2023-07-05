import React from 'react';
import Rating from '@mui/material/Rating';
import { Card, Container, Grid, Typography, Button, Pagination } from '@mui/material';
import style from './HotelList.module.css';
import { useNavigate } from 'react-router-dom';

const HotelList = () => {
    const navigate = useNavigate()
    return (
        <Container maxWidth="md" className='my-2 '>
            {/* First hotel card */}
            <Card sx={{ p: 1, margin: '10px 0px' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} xl={8}>
                        <div className='d-flex'>
                            <div className='d-xl-flex w-100'>
                                <img className='rounded img-fluid' src='https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_225,q_auto,w_225/itemimages/90/79/907935_v5.jpeg' alt='eyd' />
                                <div className='px-3 pt-2'>
                                    <div className='d-flex align-items-center'>
                                        <h4>Hotel Casa Del</h4>
                                    </div>
                                    <div className='d-flex align-items-center p-1'>
                                        <Rating name="read-only" value={4} readOnly />
                                        <p className=''>Hotel</p>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, aliquid atque modi asperiores eius reprehenderit quos beatae libero placeat iste dolore sequi ad molestiae est. Ducimus dolorem quod commodi vero!</p>
                                    <div className='d-flex align-items-center'>
                                        <h6><b>7.5</b> <span className='pl-1'>233 (reviews)</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} xl={4} className={`${style.SecondGridView}`}>
                        <div>
                            <div className={`align-items-center p-2 ${style.BookingCardColor} ${style.mobflex}`}>
                                <h3>₹1345 <span><del>1645</del></span></h3> <span className='text-danger'>64% off</span>
                            </div>
                            <div className={` ${style.mobflex}`}>
                                <div className={`p-2 ${style.BookingCardColor}`}>
                                    <Button variant='contained' color='success'>Book Now</Button>
                                </div>
                                <div className={`p-2 ${style.BookingCardColor}`}>
                                    <Button variant='contained' onClick={() => navigate('/searchedhotelname')} color='primary'>View Hotel</Button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Card>

            {/* Second hotel card */}
            <Card sx={{ p: 1, margin: '10px 0px' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} xl={8}>
                        <div className='d-flex'>
                            <div className='d-xl-flex w-100'>
                                <img className='rounded img-fluid' src='https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_225,q_auto,w_225/itemimages/90/79/907935_v5.jpeg' alt='eyd' />
                                <div className='px-3 pt-2'>
                                    <div className='d-flex align-items-center'>
                                        <h4>Hotel Casa Del</h4>
                                    </div>
                                    <div className='d-flex align-items-center p-1'>
                                        <Rating name="read-only" value={4} readOnly />
                                        <p className=''>Hotel</p>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, aliquid atque modi asperiores eius reprehenderit quos beatae libero placeat iste dolore sequi ad molestiae est. Ducimus dolorem quod commodi vero!</p>
                                    <div className='d-flex align-items-center'>
                                        <h6><b>7.5</b> <span className='pl-1'>233 (reviews)</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} xl={4} className={`${style.SecondGridView}`}>
                        <div>
                            <div className={`align-items-center p-2 ${style.BookingCardColor} ${style.mobflex}`}>
                                <h3>₹1345 <span><del>1645</del></span></h3> <span className='text-danger'>64% off</span>
                            </div>
                            <div className={` ${style.mobflex}`}>
                                <div className={`p-2 ${style.BookingCardColor}`}>
                                    <Button variant='contained' color='success'>Book Now</Button>
                                </div>
                                <div className={`p-2 ${style.BookingCardColor}`}>
                                    <Button variant='contained' onClick={() => navigate('/searchedhotelname')} color='primary'>View Hotel</Button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Card>
            <div className='d-flex justify-content-center pt-2'>
                <Pagination count={5} />
            </div>
        </Container>
    );
}

export default HotelList;
