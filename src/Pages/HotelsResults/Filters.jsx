import React, { useState } from 'react';
import { Box, Button, Chip, Container, Grid, Menu, MenuItem, Slider, Typography } from '@mui/material';
import { ButtonGroup } from 'react-bootstrap';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Filters = () => {
    // Array of menu items for location selection
    const menuItems = ['Mumbai', 'Delhi', 'Gaziabad'];

    // Array of rating values for guest rating selection
    const ratingValues = [
        { key: '0', value: 'Ok' },
        { key: '7.0', value: 'Fair' },
        { key: '7.5', value: 'Good' },
        { key: '8.0', value: 'Very Good' },
        { key: '8.5', value: 'Excellent' }
    ];

    // State for storing the selected location
    const [selectedMenuItem, setSelectedMenuItem] = useState('');

    // Event handler for selecting a menu item
    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    // State for storing the price range
    const [priceRange, setPriceRange] = useState([0, 45000]);

    // Function for formatting the slider value text
    function valuetext(value) {
        return `${value}`;
    }

    // Event handler for changing the price range
    function handlePriceChange(event, newValue) {
        setPriceRange(newValue);
    }

    return (
        <Container maxWidth="md" className='shadow-lg mt-2'>
            <Grid container spacing={2} className='my-2'>
                <Grid item sx={{ py: 1 }} xs={12}>
                    <Box>
                        {/* Price range section */}
                        <Typography sx={{ display: 'flex', justifyContent: 'space-between' }} variant="caption" display="block">
                            <b>Price / night</b> <span className='ml-auto'>₹ {valuetext(priceRange[0])} - {valuetext(priceRange[1])}+</span>
                        </Typography>
                        <Slider
                            aria-label="Small steps"
                            color='error'
                            value={priceRange}
                            onChange={handlePriceChange}
                            getAriaValueText={valuetext}
                            step={4500}
                            marks
                            min={0}
                            max={45000}
                            valueLabelDisplay="auto"
                        />
                    </Box>
                </Grid>
                <Grid item sx={{ py: 1 }} xs={12} >
                    <Grid container spacing={2}>
                        <Grid item md={4} xs={12}>
                            <Box>
                                {/* Room type selection */}
                                <Typography variant="caption" display="block">
                                    <b>Room Type</b>
                                </Typography>
                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                    <Button color='error'>Single</Button>
                                    <Button color='error'>Twin</Button>
                                    <Button color='error'>Family</Button>
                                </ButtonGroup>
                            </Box>
                        </Grid>
                        <Grid item md={4} xs={6}>
                            <Box>
                                {/* Location selection */}
                                <Typography variant="caption" display="block">
                                    <b>Location</b>
                                </Typography>
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Button sx={{ minWidth: '150px' }} className='border' variant="outline" {...bindTrigger(popupState)}>
                                                {selectedMenuItem ? selectedMenuItem : 'Location'} <ExpandMoreIcon />
                                            </Button>
                                            <Menu {...bindMenu(popupState)}>
                                                {menuItems.map((item, index) => (
                                                    <MenuItem key={index} onClick={() => handleMenuItemClick(item, popupState.close)}>
                                                        {item}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            </Box>
                        </Grid>
                        <Grid item md={4} xs={6}>
                            <Box>
                                {/* Guest rating selection */}
                                <Typography variant="caption" display="block">
                                    <b>Guest rating</b>
                                </Typography>
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Button sx={{ minWidth: '150px' }} className='border' variant="outline" {...bindTrigger(popupState)}>
                                                {selectedMenuItem ? selectedMenuItem : 'Rating'} <ExpandMoreIcon />
                                            </Button>
                                            <Menu {...bindMenu(popupState)}>
                                                {ratingValues.map((item, index) => (
                                                    <MenuItem key={index} onClick={() => handleMenuItemClick(item, popupState.close)}>
                                                        <Chip color='error' label={item.key} /> <small className='px-1'>{item.value}</small>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Filters;
