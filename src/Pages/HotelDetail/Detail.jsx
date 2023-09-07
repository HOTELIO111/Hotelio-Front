import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { FcApproval } from "react-icons/fc";
import style from './Hotel.module.css'
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import Welcome from '../../images/Welcome.png'
import { useNavigate } from 'react-router-dom';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import CameraRearIcon from '@mui/icons-material/CameraRear';
import BathroomIcon from '@mui/icons-material/Bathroom';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import PlusOneIcon from '@mui/icons-material/PlusOne';

const Detail = ({ data }) => {

    const navigate = useNavigate()
    CircularProgressWithLabel.propTypes = {
        /**
         * The value of the progress indicator for the determinate variant.
         * Value between 0 and 100.
         * @default 0
         */
        value: PropTypes.number.isRequired,
    };

    const RoomOffer = [
        {
            id: 1,
            img: data?.hotelImages,
            roomName: 'Budget Room',
            roomRate: '1000',
            facilities: 'NA'
        },
        {
            id: 2,
            img: data?.hotelImages,
            roomName: 'Classic Room',
            roomRate: '1000',
            facilities: 'NA'
        },
        {
            id: 3,
            img: data?.hotelImages,
            roomName: 'Deluxe Room',
            roomRate: '1000',
            facilities: 'NA'
        },
        {
            id: 4,
            img: data?.hotelImages,
            roomName: 'Excutive Room',
            roomRate: '1000',
            facilities: 'NA'
        },
        {
            id: 5,
            img: data?.hotelImages,
            roomName: 'Suit Room',
            roomRate: '1000',
            facilities: 'NA'
        }
    ]

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

    console.log(data)

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={8} xl={8} padding={1}>
                    <div className="p-2 ">
                        <h4 className='py-3 text-dark'>Description</h4>
                        <Typography variant='p'>{data?.discription || 'NA'}</Typography>
                    </div>
                    <hr />
                    <div className='px-2'>
                        <h4 className='py-3 text-dark'>Amenities & Facilities</h4>
                        <div className="d-flex align-items-center ">
                            <img style={{ height: '250px', width: '250px' }} src={Welcome} alt="welcome" />

                            <div className=''>
                                <ul className='d-flex'>
                                    {data?.amenities.map((item, index) => {
                                        return (
                                            <li key={index} className='p-2'>{
                                                item === 'WiFi' ? <><NetworkWifiIcon /> {item}</>
                                                    : item === 'Parking' ? <><LocalParkingIcon /> {item}</>
                                                        : item === 'Restaurant' ? <><FoodBankIcon /> {item}</>
                                                            : item === 'more' ? <><PlusOneIcon /> {item}</> : 'NA'
                                            }
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr />

                </Grid>
                <Grid sx={{ display: 'grid', placeItems: 'center' }} item xs={12} lg={4} xl={4} padding={1}>
                    <iframe src={data?.hotelMapLink}
                        height="450"
                        className={`w-100 mt-2 ${style.mapBox}`}
                        style={{ borderRadius: '5px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Grid>
                <Grid item xs={12} lg={12} xl={12}>
                    <Card sx={{ margin: 1 }}>
                        <div className='p-2 d-flex justify-content-between align-items-center' style={{ background: 'linear-gradient(0deg, rgba(231,197,186,0.8688725490196079) 0%, rgba(255,255,255,0) 100%)', color: '#8d8d8d' }}>
                            <b>Hotel Review & Rating</b>
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

                                <Card sx={{ maxHeight: '134px', width: 400, p: 1 }} >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis maxime officiis error id nesciunt quos officia.
                                </Card>

                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={12} xl={12}>
                    <Card sx={{ margin: 1 }}>
                        <div className='p-2' id='BookNow' style={{ background: 'linear-gradient(0deg, rgba(231,197,186,0.8688725490196079) 0%, rgba(255,255,255,0) 100%)', color: '#8d8d8d' }}>
                            <b>Select Your Room</b>
                        </div>
                        {
                            RoomOffer.map((item, index) => {
                                return (
                                    <CardContent>

                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                <small>{item.id}</small>
                                            </div>
                                            <hr style={{ height: '150px', width: '2px', color: '#ee2e24' }} />
                                            <div>
                                                <div className='d-flex align-items-center'>
                                                    <Typography variant='h6'>{item.roomName}</Typography>
                                                    <FcApproval size={35} />
                                                </div>
                                                <div style={{ color: '#28a745' }}>
                                                    <Typography variant='p' display={'block'}>Air conditioning</Typography>
                                                    <Typography variant='p' display={'block'}>Flat-screen TV</Typography>
                                                    <Typography variant='p' display={'block'}>Attached bathroom</Typography>
                                                </div>
                                            </div>
                                            <hr style={{ height: '150px', width: '2px', color: '#ee2e24' }} />
                                            <div>
                                                <h4>₹ {item.roomRate} <span className='text-secondary'><del>1500</del> off</span></h4>
                                                <p>+₹ 2,112 taxes and charges</p>
                                            </div>
                                            <hr style={{ height: '150px', width: '2px', color: '#ee2e24' }} />
                                            <div>
                                                <div className="d-flex">
                                                    <p>{item.facilities}</p>
                                                </div>
                                            </div>
                                            <hr style={{ height: '150px', width: '2px', color: '#ee2e24' }} />
                                            <div className='text-center'>
                                                <Button onClick={() => navigate("/booking")} variant="contained" color='error'>
                                                    Book Now
                                                </Button>
                                            </div>
                                        </div>
                                        <hr />
                                    </CardContent>
                                )
                            })
                        }
                    </Card>

                </Grid>


                <Grid item xs={12} lg={12} xl={12} padding={1} >
                    <div className='p-2'>
                        <div className='p-2' style={{ background: 'linear-gradient(0deg, rgba(231,197,186,0.8688725490196079) 0%, rgba(255,255,255,0) 100%)', color: '#000000' }}>
                            <h6>Travellers are asking</h6>
                        </div>
                        <Accordion className='mt-1'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ background: '#ff0200', borderRadius: '5px' }}
                            >
                                <Typography color={'#fff'}>Is there a swimming pool</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    No
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className='mt-1'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                sx={{ background: '#ff0200', borderRadius: '5px' }}
                            >
                                <Typography color={'#fff'} >Do they serve breakfast</Typography>
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
                        <div className='p-2' style={{ background: 'linear-gradient(0deg, rgba(231,197,186,0.8688725490196079) 0%, rgba(255,255,255,0) 100%)', color: '#000000' }}>
                            <h6>Our Rules</h6>
                        </div>
                        <Accordion className='mt-1'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ background: '#ff0200', borderRadius: '5px' }}
                            >
                                <Typography color={'#fff'}>Check-in Time</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Available 24 hours
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className='mt-1'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                sx={{ background: '#ff0200', borderRadius: '5px' }}
                            >
                                <Typography color={'#fff'}>Check-out Time</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    From 08:00 to 10:00
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className='mt-1'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                sx={{ background: '#ff0200', borderRadius: '5px' }}
                            >
                                <Typography color={'#fff'}>Cancellation/prepayment</Typography>
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
        </div >
    );
};

export default Detail;
