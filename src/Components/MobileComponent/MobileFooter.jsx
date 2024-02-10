import React, { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useLocation, useNavigate } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import { Typography } from '@mui/material';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import PolicyIcon from "@mui/icons-material/Policy";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PermPhoneMsgRoundedIcon from '@mui/icons-material/PermPhoneMsgRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import HotelioLogo from '../../images/HotelioLogo.png'
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import Swal from 'sweetalert2';

export default function MobileFooter() {


    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const LeftNav = ({ handleClose, show }) => {

        const handlePhoneCall = () => {
            const phoneNumber = '811-551-0050';

            // Construct the phone call URL using the tel: scheme
            const phoneCallUrl = `tel:${phoneNumber}`;

            // Open the phone call URL
            window.location.href = phoneCallUrl;
        };


        const playStoreLink = 'https://play.google.com/store/apps/details?id=your_app_package_name';

        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [currentUser, setCurrentUser] = useState(
            JSON.parse(window.localStorage.getItem("customer"))
        );


        const HandleLogOutCustomer = () => {
            window.localStorage.removeItem("customer");
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Log Out Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            setCurrentUser(window.localStorage.getItem("customer"));
            navigate("/");
        };
        useEffect(() => {
            if (currentUser) {
                setIsLoggedIn(true);
            }
        }, [currentUser]);

        useEffect(() => {
            // Update the selected value (icon) based on the current route
            switch (location.pathname) {
                case '/':
                    setValue(0);
                    break;
                case '/favourite':
                    setValue(1);
                    break;
                case '/offer':
                    setValue(2);
                    break;
                case '/account':
                    setValue(3);
                    break;
                default:
                    setValue(0); // Default to the first icon if the route doesn't match
                    break;
            }
        }, [location.pathname]);


        return (
            <Offcanvas placement='end' show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ color: '#ee2e24' }}>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='pt-0 mt-0'>
                    <div className='pt-0 mt-0 d-flex justify-content-center align-items-start'>
                        <img src={HotelioLogo} style={{ height: '150px', width: '180px' }} alt="logo" />
                    </div>
                    <ul>
                        <li style={{ borderBottom: '1px solid #ee2e24' }} className='py-2'><a href={playStoreLink} target="_blank" rel="noopener noreferrer"><Typography color={'error'} variant='h6'><PhoneAndroidRoundedIcon sx={{ mr: 2 }} /> Download App </Typography></a></li>
                        {
                            currentUser &&
                                <li style={{ borderBottom: '1px solid #ee2e24' }} className='py-2'><Typography variant='h6' onClick={() => navigate(`/CustomerProfile/${currentUser._id}`)} ><PersonIcon sx={{ mr: 2 }} /> Profile</Typography></li>
                        }
                        {
                            currentUser &&
                                <li style={{ borderBottom: '1px solid #ee2e24' }} className='py-2'><Typography variant='h6' onClick={() => navigate('/booking-history')} ><FeaturedPlayListIcon sx={{ mr: 2 }} /> My Booking</Typography></li>
                        }
                        <li style={{ borderBottom: '1px solid #ee2e24' }} className='py-2'><Typography variant='h6' onClick={() => navigate('/About_Us')} ><InfoRoundedIcon sx={{ mr: 2 }} /> About Us</Typography></li>
                        <li style={{ borderBottom: '1px solid #ee2e24' }} className='py-2'><Typography variant='h6' onClick={() => navigate('/Contact_Us')} ><PermPhoneMsgRoundedIcon sx={{ mr: 2 }} /> Contact Us</Typography></li>
                        <li style={{ borderBottom: '1px solid #ee2e24' }} className='py-2'><Typography variant='h6' onClick={() => navigate('/favourite')} ><FavoriteIcon sx={{ mr: 2 }} /> favourite</Typography></li>
                        <li style={{ borderBottom: '1px solid #ee2e24' }} className='py-2'><Typography variant='h6' onClick={() => navigate('/Privacy&policy')} ><PolicyIcon sx={{ mr: 2 }} /> Privacy & Policy</Typography></li>
                        <li style={{ borderBottom: '1px solid #ee2e24' }} className='py-2'><Typography variant='h6' onClick={() => navigate('/Terms&condition')} ><VerifiedUserIcon sx={{ mr: 2 }} /> Terms & Condition</Typography></li>
                        <li style={{ borderBottom: '1px solid #ee2e24' }} className='py-2'><Typography variant='h6' onClick={handlePhoneCall} ><PhoneRoundedIcon sx={{ mr: 2 }} /> Call us</Typography></li>
                        {
                            currentUser ?
                                <li style={{ color: '#ee2e24' }} className='py-2'>
                                    <Typography variant='h6' onClick={HandleLogOutCustomer}>
                                        <LogoutRoundedIcon sx={{ mr: 2 }} /> Logout
                                    </Typography>
                                </li>
                                : <li style={{ color: '#ee2e24' }} className='py-2'>
                                    <Typography variant='h6' onClick={() => navigate('/signin')}>
                                        <LoginRoundedIcon sx={{ mr: 2 }} /> Login / Signup
                                    </Typography>
                                </li>
                        }

                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        )
    }

    return (
        <div style={{ borderTop: '2px solid #ee2e24' }} className='fixed-bottom'>
            <LeftNav handleShow={handleShow} show={show} handleClose={handleClose} />
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    // Update the active route when the user clicks an icon
                    switch (newValue) {
                        case 0:
                            navigate('/');
                            break;
                        case 1:
                            navigate('/favourite');
                            break;
                        case 2:
                            navigate('/offer');
                            break;
                        default:
                            break;
                    }
                }}
                sx={{
                    '.Mui-selected': {
                        color: '#ee2e24 !important', // Change the color for the selected icon
                        backgroundColor: 'transparent !important',
                        fontSize: '0.75rem !important',
                    },
                }}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon sx={{ color: '#ee2e24' }} />} />
                <BottomNavigationAction label="favourite" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Offer" icon={<LocalOfferIcon />} />
                <BottomNavigationAction onClick={handleShow} label="Account" icon={<PersonIcon />} />
            </BottomNavigation>
        </div>
    );
}
