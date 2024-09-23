import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function SimpleBottomNavigation({ openFilter }) {
    const [value, setValue] = React.useState(0);

    return (
        <Box
            sx={{
                '.Mui-selected': {
                    color: '#ee2e24 !important', // Replace with your desired color
                    backgroundColor: 'transparent !important', // Optional: Set background color for active item
                    fontSize: '0.75rem !important',
                },
                position: 'absolute',
                width: '55px',
                height: '10px',
                right: '10px',
                bottom: '110px',
                zIndex: '1000',
                borderRadius: '50px'
            }}
        >
            <BottomNavigation
                sx={{ borderRadius: '50px', border: '1px solid #ee2e24' }}
                showLabels
                value={value}
                onClick={openFilter}

            >
                <BottomNavigationAction label="Filter" icon={<FilterAltIcon />} />
            </BottomNavigation>
        </Box>
    );
}