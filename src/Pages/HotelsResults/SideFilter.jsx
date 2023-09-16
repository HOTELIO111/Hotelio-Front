import { Checkbox, FormControlLabel, Grid, Slider, Typography, Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';

const SideFilter = () => {
    const [priceRange, setPriceRange] = useState([0, 45000]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedGuestRatings, setSelectedGuestRatings] = useState([]);
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

    function valuetext(value) {
        return `${value}`;
    }

    function handlePriceChange(event, newValue) {
        setPriceRange(newValue);
    }

    const categoryData = [
        {
            id: 1,
            categoryName: 'Hotelio Premium'
        },
        {
            id: 2,
            categoryName: 'Hotelio Home Stay'
        },
        {
            id: 3,
            categoryName: 'Hotelio Budget'
        }
    ];

    const AccomodationType = [
        {
            id: 1,
            AccomodationTypename: 'Villa'
        },
        {
            id: 2,
            AccomodationTypename: 'Resort'
        },
        {
            id: 3,
            AccomodationTypename: 'Home stay'
        }
    ];

    const HotelFacilities = [
        {
            id: 1,
            HotelFacilitiesName: 'Room Heater'
        },
        {
            id: 2,
            HotelFacilitiesName: 'Geyser'
        },
        {
            id: 3,
            HotelFacilitiesName: 'Seating area'
        },
        {
            id: 4,
            HotelFacilitiesName: 'King Sized Bed'
        },
        {
            id: 5,
            HotelFacilitiesName: 'TV'
        }
    ];

    const CheckInfeatures = [
        {
            id: 1,
            CheckInfeaturesName: 'Pay at Hotel'
        },
        {
            id: 2,
            CheckInfeaturesName: 'Online Payment'
        }
    ];

    const locations = ['Mumbai', 'Delhi', 'Gaziabad'];

    const guestRatings = [
        { key: '0', value: 'Ok' },
        { key: '7.0', value: 'Fair' },
        { key: '7.5', value: 'Good' },
        { key: '8.0', value: 'Very Good' },
        { key: '8.5', value: 'Excellent' }
    ];

    const roomTypes = ['Budget Hotel', 'Classic Room', 'Deluxe Room', 'Premium Room'];

    const handleLocationChange = (event, newValue) => {
        if (newValue) {
            setSelectedLocations(newValue);
        } else {
            setSelectedLocations([]);
        }
    };

    const handleGuestRatingChange = (rating) => {
        if (selectedGuestRatings.includes(rating)) {
            setSelectedGuestRatings(selectedGuestRatings.filter((r) => r !== rating));
        } else {
            setSelectedGuestRatings([...selectedGuestRatings, rating]);
        }
    };

    const handleRoomTypeChange = (roomType) => {
        if (selectedRoomTypes.includes(roomType)) {
            setSelectedRoomTypes(selectedRoomTypes.filter((r) => r !== roomType));
        } else {
            setSelectedRoomTypes([...selectedRoomTypes, roomType]);
        }
    };

    return (
        <Grid container spacing={1} className='border p-2 ml-1 m-2 rounded d-none d-sm-block'>
            <Grid item xs={12}>
                <div className='d-flex align-items-center justify-content-between'>
                    <h4>Filter</h4>
                    <p className='text-danger'>clear All</p>
                </div>
                <hr />
            </Grid>
            <Grid item xs={12}>
                <div>
                    <h5>Location</h5>
                    <Autocomplete
                        
                        options={locations}
                        value={selectedLocations}
                        onChange={handleLocationChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Select Locations"
                                placeholder="Location"
                            />
                        )}
                    />
                </div>
                <hr />
            </Grid>
            <Grid item xs={12}>
                <div>
                    <h5>Guest Rating</h5>
                    {guestRatings.map((rating, index) => (
                        <div key={index}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color='error'
                                        sx={{ padding: '2px', marginLeft: '10px' }}
                                        checked={selectedGuestRatings.includes(rating.key)}
                                        onChange={() => handleGuestRatingChange(rating.key)}
                                    />
                                }
                                label={rating.value}
                            />
                        </div>
                    ))}
                </div>
                <hr />
            </Grid>
            <Grid item xs={12}>
                <div>
                    <h5>Room Type</h5>
                    {roomTypes.map((roomType, index) => (
                        <div key={index}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color='error'
                                        sx={{ padding: '2px', marginLeft: '10px' }}
                                        checked={selectedRoomTypes.includes(roomType)}
                                        onChange={() => handleRoomTypeChange(roomType)}
                                    />
                                }
                                label={roomType}
                            />
                        </div>
                    ))}
                </div>
                <hr />
            </Grid>
            <Grid item sx={{ p: 2 }} xs={12}>
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
            </Grid>
            <Grid item xs={12}>
                <div>
                    <h5>Categories</h5>
                    {categoryData.map((item, index) => (
                        <div key={index}>
                            <FormControlLabel control={<Checkbox color='error' sx={{ padding: '2px', marginLeft: '10px' }} defaultChecked />} label={item.categoryName} />
                        </div>
                    ))}
                </div>
                <hr />
            </Grid>
            <Grid item xs={12}>
                <div>
                    <h5>Accommodation Type</h5>
                    {AccomodationType.map((item, index) => (
                        <div key={index}>
                            <FormControlLabel control={<Checkbox color='error' sx={{ padding: '2px', marginLeft: '10px' }} defaultChecked />} label={item.AccomodationTypename} />
                        </div>
                    ))}
                </div>
                <hr />
            </Grid>
            <Grid item xs={12}>
                <div>
                    <h5>Hotel Facilities</h5>
                    {HotelFacilities.map((item, index) => (
                        <div key={index}>
                            <FormControlLabel control={<Checkbox color='error' sx={{ padding: '2px', marginLeft: '10px' }} defaultChecked />} label={item.HotelFacilitiesName} />
                        </div>
                    ))}
                </div>
                <hr />
            </Grid>
            <Grid item xs={12}>
                <div>
                    <h5>Check-in features</h5>
                    {CheckInfeatures.map((item, index) => (
                        <div key={index}>
                            <FormControlLabel control={<Checkbox color='error' sx={{ padding: '2px', marginLeft: '10px' }} defaultChecked />} label={item.CheckInfeaturesName} />
                        </div>
                    ))}
                </div>
                <hr />
            </Grid>
        </Grid>
    );
};

export default SideFilter;
