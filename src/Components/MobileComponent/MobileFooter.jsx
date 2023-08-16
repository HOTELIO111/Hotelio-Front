import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import { NavLink, useNavigate } from 'react-router-dom';

export default function MobileFooter() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate()

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
                <BottomNavigationAction onClick={() => navigate('/favourite')} sx={{ margin: '0px -8px !important' }} label="Favorites" icon={<FavoriteIcon />}  />
                <BottomNavigationAction label="List Property" sx={{ margin: '0px -8px !important' }} icon={<DomainAddIcon />} >

                <NavLink href="https://www.example.com" sx={{ margin: '0px -8px !important' }} target="_blank" rel="noopener noreferrer">
                </NavLink>
                </BottomNavigationAction>
                <BottomNavigationAction onClick={() => navigate('/signin')} sx={{ margin: '0px -8px !important' }} label="User" icon={<PersonIcon />} />
            </BottomNavigation>
        </div>
    );
}
