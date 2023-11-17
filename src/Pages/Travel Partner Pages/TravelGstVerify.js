import { Box, Button, ButtonGroup, ClickAwayListener, Divider, Grow, Input, Menu, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material'
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { isMobile } from 'react-device-detect';
import { styled, alpha } from '@mui/material/styles';


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

const TravelGstVerify = () => {

    const options = ['GSTIN No.', 'Udyam ID', 'NGO Id'];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={isMobile ? '' : 'd-flex align-items-center justify-content-around'}>
            <div>
                <Typography fontWeight={600} variant='h5'>
                    Verify Your Organisation
                </Typography>
                <Typography fontWeight={500} variant='caption'>
                    GET LIFETIME CORPORATE BENEFITS BY VERIFYING YOUR COMPANY
                </Typography>
            </div>
            <Box sx={{ background: '#ffffff', px: 1, borderRadius: '8px' }}>
                <Button
                    color='error'
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<ArrowDropDownIcon />}
                    size='large'
                >
                    Select Document
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
                    <MenuItem onClick={handleClose} disableRipple>
                        GSTIN No.
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose} disableRipple>
                        Udyam ID
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose} disableRipple>
                        NGO ID
                    </MenuItem>

                </StyledMenu>
                <Input sx={{ p: 1, border: 'none', outline: 'none' }} type='text' placeholder='AGXXXXXXXXXXX' />
            </Box>
            <Button color='error' variant='contained'>Verify Now</Button>
        </div>
    )
}

export default TravelGstVerify