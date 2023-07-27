import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Chip, Grid, Typography, styled } from '@mui/material';
import React from 'react';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import CameraRearIcon from '@mui/icons-material/CameraRear';
import BathroomIcon from '@mui/icons-material/Bathroom';
import { FcApproval } from "react-icons/fc";
import style from './Hotel.module.css'
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
                <CircularProgress color='error' size={90} variant="determinate" {...props} />
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
                        <h5>{`${Math.round(props.value)}%`}</h5>
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
                        <div className='p-2' style={{ background: 'linear-gradient(0deg, rgba(231,197,186,0.8688725490196079) 0%, rgba(255,255,255,0) 100%)', color: '#8d8d8d' }}>
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
                        <div className='p-2 d-flex justify-content-between align-items-center' style={{ background: 'linear-gradient(0deg, rgba(231,197,186,0.8688725490196079) 0%, rgba(255,255,255,0) 100%)', color: '#8d8d8d' }}>
                            Hotel Review & Rating
                            <RatingC />
                        </div>
                        <CardContent>
                            <div className="d-flex justify-content-between align-items-center">
                                <div sx={{ maxHeight: '134px', width: 200 }}>
                                    <CircularProgressWithLabel value={75} />
                                    <p>Value of Money</p>
                                </div>
                                <div sx={{ maxHeight: '134px', width: 200 }}>
                                    <CircularProgressWithLabel value={80} />
                                    <p>Cleanliness</p>
                                </div>
                                <div sx={{ maxHeight: '134px', width: 200 }}>
                                    <CircularProgressWithLabel value={90} />
                                    <p>Comfort</p>
                                </div>

                                <Card sx={{ maxHeight: '134px', width: 200, p: 1 }} >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis maxime officiis error id nesciunt quos officia.
                                </Card>

                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={12} xl={12} padding={1} >
                    <hr />
                    <div className='p-2'>
                        <h4 className='py-3 text-dark'>Travellers are asking</h4>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Is there a swimming pool</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    No
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Do they serve breakfast</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Yes, We serve
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>

                </Grid>
                <Grid item xs={12} lg={12} xl={12} padding={1} >
                    <hr />
                    <div className='p-2'>
                        <h4 className='py-3 text-dark'>Our Rules</h4>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Check-in Time</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Available 24 hours
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Check-out Time</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    From 08:00 to 10:00
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Cancellation/prepayment</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Cancellation and prepayment policies vary according to accommodation type. Please check what conditions may apply to each option when making your selection.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>

                </Grid>
            </Grid>
        </div>
    );
};

export default Detail;
