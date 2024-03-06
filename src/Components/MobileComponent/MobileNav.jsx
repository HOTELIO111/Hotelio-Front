import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl, Grid, IconButton, Box, Typography } from '@mui/material';
import MobileFooter from './MobileFooter';
import Premiumcard from './Premiumcard';
import MobileDestination from './MobileDestination';
import MobileHeader from './MobileHeader';
import MobileDate from './MobileDate';
import { Offcanvas } from 'react-bootstrap';
import MainBannerMob from '../../images/MainBannerMob.jpg'
import { LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MobileCollections from './MobileCollections';
import MobileRecommended from './MobileRecommended';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useSearch } from '../../context/useSearch';
import { useCollections } from '../../context/useStateManager';
import { convertDatesToUTC } from '../../Utilis/_fuctions';
import { GetAllCollectionAction } from '../../store/actions/hotelioCollectionActions';
import { GetAllRecommendationAction } from '../../store/actions/recommendedAction';
import { useAuthContext } from '../../context/userAuthContext';

const MobileNav = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { currentUser } = useAuthContext();
    const { selectedPlace, setSelectedPlace, placeData } = useSearch();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSearchParams = Object.fromEntries(searchParams.entries());
    const { checkInCheckOut, setCheckInCheckOut } = useCollections();
    const [selectedGuest, setselectedGuest] = useState(1)
    const [selectedRoom, setselectedRoom] = useState(1)
    const [manageRoom, setManageRoom] = useState([{ room: 1, guest: 1 }]);
    const searchData = {
        location: placeData?.address,
        lng: placeData?.longitude,
        lat: placeData?.latitude,
        totalRooms: selectedRoom,
        totalGuest: selectedGuest,
        checkIn: convertDatesToUTC(checkInCheckOut)[0],
        checkOut: convertDatesToUTC(checkInCheckOut)[1],
        kmRadius: 20,
        priceMin: 400,
        priceMax: 20000,
        sort: "popularity",

    };

    useEffect(() => {
        dispatch(GetAllCollectionAction())
    }, [])

    useEffect(() => {
        dispatch(GetAllRecommendationAction(currentUser?._id))
    }, [currentUser])

    const CollectionData = useSelector((state) => state.GetAllCollectionReducer.data);
    const RecommededData = useSelector((state) => state.GetAllRecommendedReducer.data);

    const SearchTheField = () => {
        if (placeData?.address === undefined)
            return window.alert("please Select the location");
        if (!checkInCheckOut[0] && !checkInCheckOut[1]) {
            return window.alert("please select the check-in And Check-out");
        }
        if (manageRoom[0].guest === 0)
            return window.alert("please select the room and guest ");
        const queryString = new URLSearchParams(searchData).toString();
        navigate(`/searched-hotels?${queryString}`);
    };


    // const [citites, setCities] = useState(null);
    const [selectedCity, setSlectedCity] = useState(null);
    const [geoLoc, setGeoLoc] = useState({ longitude: "", latitude: "" });
    // const GetAllCities = async () => {
    //     try {
    //         const response = await axios.get(`${API_URL}/hotel/get/city`);
    //         if (response.status === 200) {
    //             setCities(response.data.data);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     GetAllCities();
    // }, []);

    const autoCompleteRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        try {
            const options = {
                types: ["geocode"],
                componentRestrictions: { country: "in" },
                fields: ["formatted_address", "geometry"],
            };

            autoCompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current,
                options
            );

            autoCompleteRef.current.addListener("place_changed", () => {
                const place = autoCompleteRef.current.getPlace();
                setSlectedCity(place.formatted_address);
                console.log(place);
                // Get latitude and longitude
                const { lat, lng } = place.geometry.location;
                let longitude = lng();
                let latitude = lat();
                setGeoLoc({ longitude: longitude, latitude: latitude });
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Stylelabel = {
        fontSize: '12px',
        lineHeight: '1.4375em',
        color: 'rgba(0, 0, 0, 0.6)',
        marginBottom: '-17px',
        paddingBottom: '0px',
        fontWeight: 'normal',
        position: 'relative',
        top: '0px',
        left: '1%',
        textAlign: 'left'
    };


    const Guestincrement = () => {
        if (selectedGuest < selectedRoom * 4) {
            setselectedGuest(selectedGuest + 1);
        }
    };

    const Guestdecrement = () => {
        if (selectedGuest > 1) {
            setselectedGuest(selectedGuest - 1);
        }
    };

    const Roomincrement = () => {
        if (selectedRoom < 7) {
            setselectedRoom(selectedRoom + 1);
        }
    };

    const Roomdecrement = () => {
        // Ensure there's at least one room
        if (selectedRoom > 1) {
            // Calculate the number of guests for the new room count
            const newGuestCount = (selectedRoom - 1) * 4;

            if (selectedGuest > newGuestCount) {
                // Decrease both room count and guest count
                setselectedRoom(selectedRoom - 1);
                setselectedGuest(newGuestCount);
            } else {
                // Decrease room count only
                setselectedRoom(selectedRoom - 1);
            }
        }
    };


    return (
        <>
            <Helmet>
                <title>Online hotel Booking in India | Hotelio</title>
                <meta name="keywords"
                    content="online hotel booking, hoteliorooms, hotelio, online hotel booking in india, best hotel in lucknow,hotel booking in lucknow, five star hotel in lucknow" />

            </Helmet>
            <MobileHeader />
            <Box>
                <Box
                    style={{
                        background: `url(${MainBannerMob})`,
                        backgroundPosition: 'center',
                        height: '25vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        color: '#000'
                    }}
                >
                    <Typography variant="h5" mt={2} fontWeight={700} color="initial">Welcome To Hotelio Rooms</Typography>
                </Box>
                <Box className="w-100">
                    <div className="row">
                        <div className="col-lg-12">
                            <div
                                style={
                                    {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }
                                }
                                className='bg-white p-2 rounded'>
                                <div className="w-100">
                                    <GooglePlacesAutocomplete
                                        onLoadFailed={(error) =>
                                            console.error(
                                                "Could not inject Google script",
                                                error
                                            )
                                        }
                                        placeholder="Enter location"
                                        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                        apiOptions={{
                                            language: "en",
                                            region: "in",
                                            libraries: "places",
                                        }}
                                        selectProps={{
                                            value: selectedPlace,
                                            onChange: setSelectedPlace,
                                            placeholder: "Enter Location",
                                            styles: {
                                                input: (provided) => ({
                                                    ...provided,
                                                    // padding: "px",
                                                    border: "none",
                                                    borderColor: "transparent",
                                                }),
                                                option: (provided) => ({
                                                    ...provided,
                                                    color: "#ee2e24",
                                                    borderBottom: "1px solid gray",
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }),
                                                control: (provided) => ({
                                                    ...provided,
                                                    borderColor: "transparent",
                                                    boxShadow: "none",
                                                }),
                                                menu: (provided) => ({
                                                    ...provided,
                                                    borderColor: "transparent",
                                                    outlineColor: "transparent",
                                                }),
                                            },
                                        }}
                                    />
                                </div>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <MobileDate
                                            setCheckInCheckOut={setCheckInCheckOut}
                                            checkInCheckOut={checkInCheckOut}
                                        />
                                    </Grid>
                                    <Grid item xs={6} className='d-flex'>
                                        <hr style={{ height: '50px', width: '1px', position: 'relative', left: '-4px', top: '-13px' }} />
                                        <div onClick={handleShow} className='w-100'>
                                            <label style={Stylelabel} className="labelfordatepicker">Rooms and guests</label>
                                            <p style={{ marginTop: '14px' }}>{selectedGuest} Guests, {selectedRoom} Room</p>
                                            <hr style={{ marginTop: '11px', color: 'black' }} />
                                        </div>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <LoadingButton fullWidth onClick={() => SearchTheField()} style={{ background: '#ee2e24', color: '#fff' }} >Search</LoadingButton>
                                    </Grid>
                                </Grid>
                                <Offcanvas show={show} style={{ borderRadius: ' 25px 25px 0px 0px', height: '40vh' }} placement='bottom' onHide={handleClose}>
                                    <Offcanvas.Header className='pt-3 pr-5' >
                                        <Offcanvas.Title onClick={handleClose} style={{ background: '#ee2e24', padding: '4px 76px', position: 'fixed', left: '30%', borderRadius: '5px' }}></Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <div className='text-center'>
                                            <div className='d-flex justify-content-evenly align-items-center'>
                                                <h5>Guest</h5>
                                                <FormControl className='w-50'>
                                                    <div>
                                                        <IconButton onClick={Guestdecrement} ><RemoveIcon /></IconButton>&nbsp;{selectedGuest}&nbsp;<IconButton onClick={Guestincrement} ><AddIcon /></IconButton>
                                                    </div>
                                                </FormControl>
                                            </div>
                                            <hr />
                                            <div className='d-flex justify-content-evenly align-items-center py-2'>
                                                <h5>Room</h5>
                                                <FormControl className='w-50'>
                                                    <div>
                                                        <IconButton onClick={Roomdecrement} ><RemoveIcon /></IconButton>&nbsp;{selectedRoom}&nbsp;<IconButton onClick={Roomincrement} ><AddIcon /></IconButton>
                                                    </div>
                                                </FormControl>
                                            </div>
                                            <Button color='error' onClick={handleClose} fullWidth variant='contained'>Done</Button>
                                        </div>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </div>
                        </div>
                    </div>
                </Box>
                <Grid container padding={1} spacing={2}>
                    <Grid item xs={12} paddingBottom={6}>
                        <div className='text-center'>

                            <Premiumcard />

                            <h5 style={{ borderRadius: '50px 0px 50px 0px', background: '#ee2e24', fontWeight: 700 }} className='p-2 py-2 pl-4 text-white'>Explore Locations</h5>

                            <MobileDestination />

                            <h5 style={{ borderRadius: '50px 0px 50px 0px', background: '#ee2e24', fontWeight: 700 }} className='p-2 py-2 pl-4 text-white'>Our collection</h5>

                            <MobileCollections CollectionData={CollectionData} />

                            {RecommededData?.data?.length > 0 ?
                                <>
                                    <h5 style={{ borderRadius: '50px 0px 50px 0px', background: '#ee2e24', fontWeight: 700 }} className='p-2 py-2 pl-4 text-white'>Recommendation</h5>
                                    <MobileRecommended RecommededData={RecommededData} />
                                </> : null
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <MobileFooter />
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default MobileNav