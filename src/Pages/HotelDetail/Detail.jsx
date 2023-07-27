import { Box, Button, Card, CardContent, Chip, Grid, Typography, styled } from '@mui/material';
import React from 'react';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import CameraRearIcon from '@mui/icons-material/CameraRear';
import BathroomIcon from '@mui/icons-material/Bathroom';
import { FcApproval } from "react-icons/fc";
import style from './Hotel.module.css'
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import RatingC from './RatingC';

const Detail = () => {


    CircularProgressWithLabel.propTypes = {
        /**
         * The value of the progress indicator for the determinate variant.
         * Value between 0 and 100.
         * @default 0
         */
        value: PropTypes.number.isRequired,
    };

    function CircularProgressWithLabel(props) {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress color='error' variant="determinate" {...props} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="text.secondary">
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }



    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={8} xl={8} >
                    <div className="p-2 ">
                        <div className='d-flex align-items-center justify-content-around'>
                            <h2><b>Casa del Trigo</b></h2>
                            <Chip color='success' label='4.5 Rating' />
                        </div>
                        <div>
                            <hr />
                            <h4 className='py-3 text-dark'>Description</h4>
                            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ad aliquid nisi voluptatem necessitatibus, repellendus minus quibusdam hic assumenda asperiores id eos dolore distinctio nam veritatis dolorum ratione doloremque dolores</h5>
                        </div>
                    </div>
                    <hr />
                    <div className='px-2'>
                        <h4 className='py-3 text-dark'>Amenities</h4>
                        <div className="d-flex align-items-center justify-content-evenly">

                            <div>
                                <ul>
                                    <li className='p-2'><AcUnitIcon /> Air Conditioner Room</li>
                                    <li className='p-2'><ConnectedTvIcon /> Smart TV Attached</li>
                                    <li className='p-2'><NetworkWifiIcon /> Free WiFi</li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li className='p-2'><CameraRearIcon /> Geyser</li>
                                    <li className='p-2'><BathroomIcon /> Attached Bathroom</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr />

                </Grid>
                <Grid item xs={12} lg={4} xl={4} padding={1}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.414545560059!2d-3.717898024434202!3d37.19038204560858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71ff0676ddeaff%3A0xab7a2d29ef4f0546!2sHotel%20Casa%20del%20Trigo!5e0!3m2!1sen!2sin!4v1690436980354!5m2!1sen!2sin"
                        height="450"
                        className={`w-100 ${style.mapBox}`}
                        style={{ borderRadius: '5px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Grid>
                <Grid item xs={12} lg={6} xl={6}>
                    <Card sx={{ margin: 1 }}>
                        <div className='p-2' style={{ background: '#848484', color: '#fff' }}>
                            Your Chosen Room
                        </div>
                        <CardContent>
                            <div className='d-flex justify-content-center align-items-center'>

                            </div>

                            <div className='d-flex align-items-center justify-content-between'>
                                <img className='img-thumbnail' style={{ width: '200px' }} src="https://images.oyoroomscdn.com/uploads/hotel_image/109466/large/8f8433f482cb77d1.jpg" alt=".." />
                                <div>
                                    <div className="d-flex">
                                        <h3>Delux Room</h3>
                                        <FcApproval size={35} />
                                    </div>
                                    <h4>₹ 1000 <span className='text-secondary'><del>1500</del> off</span></h4>
                                </div>
                                <Button variant="contained" color='error'>
                                    Book Now
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6} xl={6}>
                    <Card sx={{ margin: 1 }}>
                        <div className='p-2 d-flex justify-content-between align-items-center' style={{ background: '#848484', color: '#fff' }}>
                            Hotel Review & Rating
                            <RatingC />
                        </div>
                        <CardContent>
                            <div className="d-flex justify-content-between align-items-center">
                                <div sx={{ maxHeight: '134px', width: 200 }}>
                                    <CircularProgressWithLabel  value={75} />
                                </div>

                                <Card sx={{ maxHeight: '134px' }} >
                                    <img className='img-thumbnail' style={{ width: '200px' }} src="https://images.oyoroomscdn.com/uploads/hotel_image/109466/large/8f8433f482cb77d1.jpg" alt=".." />
                                </Card>

                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Detail;
