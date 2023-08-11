import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import { BsFillBuildingsFill } from 'react-icons/bs';
import DomainAddIcon from '@mui/icons-material/DomainAdd';

export default function MobileFooter() {
    const [value, setValue] = React.useState(0);

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
                <BottomNavigationAction sx={{ margin: '0px -8px !important' }} label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction sx={{ margin: '0px -8px !important' }} label="About us" icon={<InfoIcon />} />
                <BottomNavigationAction sx={{ margin: '0px -8px !important' }} label="List Property" icon={<DomainAddIcon />} />
                <BottomNavigationAction sx={{ margin: '0px -8px !important' }} label="User" icon={<PersonIcon />} />
            </BottomNavigation>
        </div>
    );
}
