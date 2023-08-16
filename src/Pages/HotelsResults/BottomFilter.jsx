import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Autocomplete, Checkbox, FormControlLabel, Grid, Modal, Slider, TextField, Typography } from '@mui/material';

export default function BottomFilter() {
    const [value, setValue] = React.useState(0);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const FilterModal = ({ open, onClose }) => {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            maxHeight: '80vh',
            overflow: 'scroll'
        };

        const [priceRange, setPriceRange] = React.useState([0, 45000]);
        const [selectedLocations, setSelectedLocations] = React.useState([]);
        const [selectedGuestRatings, setSelectedGuestRatings] = React.useState([]);
        const [selectedRoomTypes, setSelectedRoomTypes] = React.useState([]);

        function valuetext(value) {
            return `${value}`;
        }

        function handlePriceChange(event, newValue) {
            setPriceRange(newValue);
        }

        const categoryData = [
            {
                id: 1,
                categoryName: 'Hotelio Budgets'
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

        const roomTypes = ['Single', 'Delux', 'Family', 'Luxuary'];

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

        return (<Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={1} className='border p-2  rounded'>
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
            </Box>
        </Modal>
        )
    }

    return (
        <Box>
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
                    position: 'fixed',
                    width: '100%',
                    left: '-1px',
                    bottom: '5px',
                    zIndex: '1000'
                }}
            >
                <FilterModal open={open} onClose={handleClose} />
                <BottomNavigationAction onClick={handleOpen} label="Filter" icon={<FilterListIcon />} />
                <BottomNavigationAction label="Location" icon={<LocationOnIcon />} />
            </BottomNavigation>
        </Box>
    );
}