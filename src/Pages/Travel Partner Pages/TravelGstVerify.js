import { Button, ButtonGroup, ClickAwayListener, Grow, Input, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material'
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const TravelGstVerify = () => {

    const options = ['GSTIN No.', 'Udyam ID', 'NGO Id'];
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    // const handleClick = () => {
    //     console.info(`You clicked ${options[selectedIndex]}`);
    // };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    return (
        <div className='d-flex align-items-center justify-content-around'>
            <div>
                <Typography fontWeight={600} variant='h5'>
                    Verify Your Organisation
                </Typography>
                <Typography fontWeight={500} variant='caption'>
                    GET LIFETIME CORPORATE BENEFITS BY VERIFYING YOUR COMPANY
                </Typography>
            </div>
            <div>

                <Popper
                    sx={{
                        zIndex: 1,
                    }}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center left' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        {options[selectedIndex]}<ArrowDropDownIcon />
                    </Button>
                    {/* <Button onClick={handleClick}>{options[selectedIndex]}</Button> */}
                    <Input sx={{ p: 1 }} type='text' placeholder='AGXXXXXXXXXXX' />
                </ButtonGroup>
            </div>
            <Button variant='contained'>Verify Now</Button>
        </div>
    )
}

export default TravelGstVerify