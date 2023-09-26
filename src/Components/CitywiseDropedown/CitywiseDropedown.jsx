import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ArrowRightTwoToneIcon from '@mui/icons-material/ArrowRightTwoTone';
import { useNavigate } from 'react-router-dom';

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
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

const City = [
    'Chennai',
    'Hyderabad',
    'Bangalore',
    'Mumbai',
    'Delhi',
    'Pune',
    'Kolkata',
    'Ahmedabad',
    'surat'
]

export default function CitywiseDropedown() {

    const navigate = useNavigate();

    const handleClick = (event, city) => {
        navigate(`/searchedhotels?location=${encodeURIComponent(city)}`);
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {City?.map((item, index) => (
                <div key={index}>
                    <Button
                        variant="text"
                        sx={{ color: '#fff' }}
                        disableElevation
                        onClick={(event) => handleClick(event, item)}
                        endIcon={<ArrowRightTwoToneIcon />}
                    >
                        {item}
                    </Button>
                </div>
            ))}
            <Button
                aria-haspopup="true"
                variant="text"
                sx={{ color: '#fff' }}
                disableElevation
                onClick={() => navigate('/allCities')}
                endIcon={<ArrowRightTwoToneIcon fontSize='small' />}
            >
                All Cities
            </Button>
        </div>
    );
}

