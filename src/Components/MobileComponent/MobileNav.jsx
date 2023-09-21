import React, { useState } from 'react'
import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MobileFooter from './MobileFooter';
import Premiumcard from './Premiumcard';
import style from "../Navbar/navbar.module.css";
import MobileSlider from './MobileSlider';
import MobileDestination from './MobileDestination';
import MobileHeader from './MobileHeader';
import MobileDate from './MobileDate';
import { Offcanvas } from 'react-bootstrap';
import MainBannerMob from '../../images/MainBannerMob.jpg'
import { LoadingButton } from '@mui/lab';

const MobileNav = () => {

    const top100Films = [
        { label: 'The Shawshank Redemption' },
        { label: 'The Godfather' },
        { label: 'The Godfather: Part II' },
    ]

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Stylelabel = {
        fontSize: '12px',
        lineHeight: '1.4375em',
        color: 'rgba(0, 0, 0, 0.6)',
        marginBottom: '-17px',
        paddingBottom: '0px',
        fontWeight: 'normal',
        position: 'relative',
        top: '0px',
        left: '1%',
        textAlign: 'left'
    };

    const [selectedGuest, setselectedGuest] = useState('1')
    const [selectedRoom, setselectedRoom] = useState('1')


    const handelChangeGuest = (e) => {
        setselectedGuest(e.target.value)
    }

    const handelChangeRoom = (e) => {
        setselectedRoom(e.target.value)
    }

    return (
        <>
            <MobileHeader />
            <div>
                <div
                    style={{
                        background: `url(${MainBannerMob})`,
                        backgroundPosition: 'center',
                        height: '25vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        color: '#000'
                        // alignItems: 'center'
                    }}
                >
                    <h1 className='mt-3' ><b>Welcome To Hotelio Rooms</b></h1>
                </div>
                <div className="w-100">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className='bg-white p-2 rounded'>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            options={top100Films}
                                            id="disable-close-on-select"
                                            renderInput={(params) => (
                                                <TextField fullWidth {...params} label="Destination" variant="standard" />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MobileDate />
                                    </Grid>
                                    <Grid item xs={6} className='d-flex'>
                                        <hr style={{ height: '50px', width: '1px', position: 'relative', left: '-4px', top: '-13px' }} />
                                        {/* <TextField onClick={handleShow} disabled fullWidth id="standard-read-only-input" label="Rooms and guests" value={'1 Guests 1 Room'} variant="standard"
                                                        InputProps={{
                                                            readOnly: true,
                                                            style: { userSelect: 'none' },
                                                        }}
                                                    /> */}
                                        <div onClick={handleShow} className='w-100'>
                                            <label style={Stylelabel} className="labelfordatepicker">Rooms and guests</label>
                                            <p style={{ marginTop: '14px' }}>{selectedGuest} Guests, {selectedRoom} Room</p>
                                            <hr style={{ marginTop: '11px', color: 'black' }} />
                                        </div>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <LoadingButton fullWidth href='/searchedhotels' style={{ background: '#ee2e24', color: '#fff' }} >Search</LoadingButton>
                                    </Grid>
                                </Grid>
                                <Offcanvas show={show} style={{ borderRadius: ' 25px 25px 0px 0px', height: '40vh' }} placement='bottom' onHide={handleClose}>
                                    <Offcanvas.Header className='pt-3 pr-5' >
                                        <Offcanvas.Title onClick={handleClose} style={{ background: '#ee2e24', padding: '4px 76px', position: 'fixed', left: '30%', borderRadius: '5px' }}></Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <div className='text-center'>
                                            <div className='d-flex justify-content-evenly align-items-center'>
                                                <h5>Guest</h5>
                                                <FormControl className='w-25'>
                                                    {/* <InputLabel>Select an option</InputLabel> */}
                                                    <Select value={selectedGuest} onChange={handelChangeGuest}>
                                                        <MenuItem value="1">1</MenuItem>
                                                        <MenuItem value="2">2</MenuItem>
                                                        <MenuItem value="3">3</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <hr />
                                            <div className='d-flex justify-content-evenly align-items-center py-2'>
                                                <h5>Room</h5>
                                                <FormControl className='w-25'>
                                                    {/* <InputLabel>Select an option</InputLabel> */}
                                                    <Select value={selectedRoom} onChange={handelChangeRoom}>
                                                        <MenuItem value="1">1</MenuItem>
                                                        <MenuItem value="2">2</MenuItem>
                                                        <MenuItem value="3">3</MenuItem>
                                                        <MenuItem value="4">4</MenuItem>
                                                        <MenuItem value="5">5</MenuItem>
                                                        <MenuItem value="6">6</MenuItem>
                                                        <MenuItem value="7">7</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <Button color='error' onClick={handleClose} fullWidth variant='contained'>Done</Button>
                                        </div>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </div>
                        </div>
                    </div>
                </div>
                <Grid container padding={1} spacing={2}>
                    <Grid item xs={12} paddingBottom={6}>
                        <div className='text-center'>

                            <Premiumcard />

                            <h5 style={{ borderRadius: '50px 0px 50px 0px', background: '#ee2e24' }} className='p-2 py-2 pl-4 text-white'><b>Explore Locations</b></h5>

                            <MobileDestination />

                            <h5 style={{ borderRadius: '50px 0px 50px 0px', background: '#ee2e24' }} className='p-2 py-2 pl-4 text-white'><b>Our collection</b></h5>

                            <MobileSlider />

                            <h5 style={{ borderRadius: '50px 0px 50px 0px', background: '#ee2e24' }} className='p-2 py-2 pl-4 text-white'><b>Recommendation</b></h5>

                            <MobileSlider />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <MobileFooter />
                    </Grid>
                </Grid>
            </div >
        </>
    )
}

export default MobileNav