import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { NavLink, useNavigate } from 'react-router-dom';
import MobileAccountOptions from './MobileAccountOptions';

export default function MobileFooter() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate()
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className='fixed-bottom'>
            <BottomNavigation
                showLabels

                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    '.Mui-selected': {
                        color: '#ee2e24 !important', // Replace with your desired color
                        backgroundColor: 'transparent !important', // Optional: Set background color for active item
                        fontSize: '0.75rem !important',
                    },
                }}
            >
                <BottomNavigationAction onClick={() => navigate('/')} sx={{ margin: '0px -8px !important' }} label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction onClick={() => navigate('/favourite')} sx={{ margin: '0px -8px !important' }} label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction onClick={() => navigate('/offer')} label="Offer" sx={{ margin: '0px -8px !important' }} icon={<LocalOfferIcon />} />
                <BottomNavigationAction sx={{ margin: '0px -8px !important' }} label="Account" icon={<PersonIcon handleShow={handleShow} show={show} handleClose={handleClose} />} />
            </BottomNavigation>
        </div>
    );
}
