import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const StateWiseCityList = [
    {
        id: 1,
        State: 'Uttar Pradesh',
        city: [
            "Lucknow", "Lakhimpur", "Raibarely", "Sultanpur", "Mirzapur"
        ]
    },
    {
        id: 2,
        State: 'Uttar Pradesh',
        city: [
            "Lucknow", "Lakhimpur", "Raibarely", "Sultanpur", "Mirzapur"
        ]
    },
    {
        id: 3,
        State: 'Uttar Pradesh',
        city: [
            "Lucknow", "Lakhimpur", "Raibarely", "Sultanpur", "Mirzapur"
        ]
    },
    {
        id: 4,
        State: 'Uttar Pradesh',
        city: [
            "Lucknow", "Lakhimpur", "Raibarely", "Sultanpur", "Mirzapur"
        ]
    },
    {
        id: 5,
        State: 'Uttar Pradesh',
        city: [
            "Lucknow", "Lakhimpur", "Raibarely", "Sultanpur", "Mirzapur"
        ]
    },
    {
        id: 6,
        State: 'Uttar Pradesh',
        city: [
            "Lucknow", "Lakhimpur", "Raibarely", "Sultanpur", "Mirzapur"
        ]
    },
    {
        id: 7,
        State: 'Uttar Pradesh',
        city: [
            "Lucknow", "Lakhimpur", "Raibarely", "Sultanpur", "Mirzapur"
        ]
    },
    {
        id: 8,
        State: 'Uttar Pradesh',
        city: [
            "Lucknow", "Lakhimpur", "Raibarely", "Sultanpur", "Mirzapur"
        ]
    },
    {
        id: 9,
        State: 'Uttar Pradesh',
        city: [
            "Lucknow", "Lakhimpur", "Raibarely", "Sultanpur", "Mirzapur"
        ]
    },
]

export default function CitywiseDropedown() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='d-flex'>
            {
                StateWiseCityList.map((item, index) => (
                    <div key={index}>
                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="text"
                            sx={{ color: '#fff' }}
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            {item.State}
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            {item.city.map((items, index) => (
                                <MenuItem key={index} onClick={handleClose} disableRipple>
                                    {items}
                                </MenuItem>
                            ))}

                        </StyledMenu>
                    </div>
                ))
            }
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="text"
                sx={{ color: '#fff' }}
                disableElevation
                endIcon={<ArrowForwardIosIcon fontSize='small' />}
            >
                All Cities
            </Button>
        </div>
    );
}
