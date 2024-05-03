import { Button, Card, Grid, Typography, useMediaQuery, Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import HotelioLogo from '../../images/HotelioLogo.png'
import PersonIcon from "@mui/icons-material/Person";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Dates from '../date/Date';
import { useState } from 'react';
import style from '../Navbar/navbar.module.css'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/userAuthContext';
import { useCollections } from '../../context/useStateManager';
import { convertDatesToUTC } from '../../Utilis/_fuctions';
import { isMobile, isMobileOnly } from 'react-device-detect';
import TravelMobileSearch from './TravelMobileSearch';
import GlobalModal from '../Global/GlobalModal';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useSearch } from '../../context/useSearch';

const TravelHeader = () => {

  const { selectedPlace, setSelectedPlace, placeData } = useSearch();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // -------------------------- MOdal controllers-----------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { checkInCheckOut, setCheckInCheckOut } = useCollections();
  const navigate = useNavigate()

  // const [citites, setCities] = useState(null);
  const [selectedCity, setSlectedCity] = useState(null);
  const [geoLoc, setGeoLoc] = useState({ longitude: "", latitude: "" });
  // const GetAllCities = async () => {
  //   try {
  //     const response = await Axios.get(`${API_URL}/hotel/get/city`);
  //     if (response.status === 200) {
  //       setCities(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [manageRoom, setManageRoom] = useState([{ room: 1, guest: 1 }]);

  const searchData = {
    location: placeData?.address,
    lng: placeData?.longitude,
    lat: placeData?.latitude,
    totalRooms: manageRoom.length,
    totalGuest: manageRoom.reduce((a, b) => a + b.guest, 0),
    checkIn: convertDatesToUTC(checkInCheckOut)[0],
    checkOut: convertDatesToUTC(checkInCheckOut)[1],
    kmRadius: 20,
    priceMin: 400,
    priceMax: 20000,
    sort: "popularity",
    role: "Agent"
    // search ki api shi krna hai phle chekinChekout or totalrooms ke liye
  };


  const SearchTheField = () => {
    if (placeData?.address === undefined)
      return window.alert("please Select the location");
    if (!checkInCheckOut[0] && !checkInCheckOut[1]) {
      return window.alert("please select the check-in And Check-out");
    }
    if (manageRoom[0].guest === 0)
      return window.alert("please select the room and guest ");
    const queryString = new URLSearchParams(searchData).toString();
    navigate(`/Travel-Partner-Hotels?${queryString}`);
  };


  // room management function

  const HandleManageRoom = (work, index) => {
    const updatedRooms = [...manageRoom];
    if (work === "i") {
      if (updatedRooms[index].guest < 3) {
        updatedRooms[index] = {
          ...updatedRooms[index],
          guest: updatedRooms[index].guest + 1,
        };
      } else {
        // Suggest adding a new room when the current room is full (3 guests)
        const wantToAddNewRoom = window.alert(
          "This room already has 3 guests. Add a new room to add guest"
        );
        if (wantToAddNewRoom) {
          ManageRoomAddandDelete("add");
        }
      }
    } else if (work === "d") {
      updatedRooms[index] = {
        ...updatedRooms[index],
        guest: updatedRooms[index].guest - 1,
      };
    }
    setManageRoom(updatedRooms);
  };

  const ManageRoomAddandDelete = (action) => {
    if (action === "add" && manageRoom.length < 7) {
      // Only allow adding a new room if the current room count is less than 7.
      const newRoom = { room: manageRoom.length + 1, guest: 1 };
      setManageRoom([...manageRoom, newRoom]);
    } else if (action === "remove" && manageRoom.length > 1) {
      const updatedRoom = [...manageRoom];
      updatedRoom.pop();
      setManageRoom(updatedRoom);
    }
  };

  const getTotalGuests = () => {
    let totalGuests = 0;
    for (let i = 0; i < manageRoom.length; i++) {
      totalGuests += manageRoom[i].guest;
    }
    return totalGuests;
  };

  const { currentUser } = useAuthContext();
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  // useEffect(() => {
  //   GetAllCities();
  // }, []);

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

  const storedEncodedSearchData = localStorage.getItem('search');
  if (storedEncodedSearchData) {
    try {
      const decodedSearchData = JSON.parse(decodeURIComponent(storedEncodedSearchData));
      console.log(decodedSearchData);
    } catch (error) {
      console.error('Error decoding search data:', error);
    }
  } else {
    console.log('No search data found in local storage');
  }

  return (

    <div>
      <Grid spacing={1} alignItems={'center'} container sx={{ borderBottom: '2px solid #ee2e24' }}>
        <Grid item xs={12} sm={2}>
          <img onClick={() => navigate('/Travel-Partner-Home')} src={HotelioLogo} style={{ width: '150px' }} alt="Logo" />
        </Grid>
        <Grid item xs={12} sm={8} p={2} ml={isMobile && 2}>
          <Box className={`p-2 mt-3 border ${isSmallScreen ? 'flex-column' : 'flex-row'}`}
            style={{ boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset' }}
          >

            {
              isMobileOnly ?
                <TravelMobileSearch /> :
                <div className="col-lg-12">
                  <div className={` ${style.search_form}`}>
                    <Grid container spacing={1} >
                      <Grid item lg={3} >
                        <div className='d-flex align-items-center' >
                          <HotelIcon className="text-danger me-2" />
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
                                    fontWeight: "500"
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
                        </div>
                      </Grid>
                      <Grid item lg={9} >
                        <div className='d-flex align-items-center justify-content-between'>
                          <fieldset
                            style={isMobile ? {} : { borderRight: "2px solid red" }}
                            className="d-flex align-items-center"
                          >
                            <div>
                              <CalendarMonthIcon className="text-danger" />
                              <Dates
                                setCheckInCheckOut={setCheckInCheckOut}
                                checkInCheckOut={checkInCheckOut}
                              />
                            </div>
                          </fieldset>
                          <fieldset className="d-flex align-items-center justify-content-center">
                            <PersonIcon className="text-danger me-2" />
                            <span
                              onClick={() => {
                                setIsModalOpen(!isModalOpen);
                              }}
                              className={`d-flex ${style.headerSearchText}`}
                            >
                              {`${getTotalGuests()} Guests · ${manageRoom.length
                                } room`}
                              <div className="ms-3 text-dark">
                                {isModalOpen ? (
                                  <ExpandLessIcon />
                                ) : (
                                  <ExpandMoreIcon />
                                )}
                              </div>
                            </span>
                            <GlobalModal
                              isOpen={isModalOpen}
                              onClose={closeModal}
                              height={"fit-content"}
                            >
                              <div className={`shadow-lg p-2 w-100 ${style.options}`}>
                                <div className="row m-0 p-0">
                                  <div className="col">
                                    <div className="d-flex justify-content-evenly">
                                      <h5>Rooms</h5>
                                      <h5>Guests</h5>
                                    </div>
                                  </div>
                                </div>
                                {/* Mapped the rooms data */}
                                {manageRoom.map((item, index) => (
                                  <div className="row m-0 p-0">
                                    <div className="col-4">
                                      <div className={style.optionItem}>
                                        <div>Rooms</div>
                                        <div>{item.room}</div>
                                      </div>
                                    </div>
                                    <div className="col-8">
                                      <div className={style.optionItem}>
                                        <span className={`${style.optionText} `}>
                                          Guests
                                        </span>
                                        <div
                                          className={`ms-1 ${style.optionCounter}`}
                                        >
                                          <button
                                            disabled={item.guest <= 0}
                                            className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                            onClick={() =>
                                              HandleManageRoom("d", index)
                                            }
                                          >
                                            <RemoveIcon />
                                          </button>
                                          <span
                                            className={style.optionCounterNumber}
                                          >
                                            {item.guest}
                                          </span>
                                          <button
                                            className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                            onClick={() =>
                                              HandleManageRoom("i", index)
                                            }
                                          >
                                            <AddIcon />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <div className="row m-0 p-0">
                                  <div className="col">
                                    <div className="d-flex justify-content-evenly align-items-center">
                                      <div
                                        className={`${style.optionText} `}
                                        style={{ marginRight: "10px" }}
                                        onClick={() =>
                                          ManageRoomAddandDelete("remove")
                                        }
                                      >
                                        Delete Room
                                      </div>
                                      <div
                                        className={`${manageRoom.length === 7
                                          ? style.optionTextDisable
                                          : style.optionText
                                          }`}
                                        onClick={() =>
                                          ManageRoomAddandDelete("add")
                                        }
                                      >
                                        Add Room
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </GlobalModal>
                          </fieldset>
                          <div >
                            <fieldset>
                              <button
                                className={style.main_button}
                                onClick={() => SearchTheField()}
                              >
                                <SearchIcon />  Search Now
                              </button>
                            </fieldset>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
            }
          </Box>
        </Grid>
        <Grid sx={{ display: 'grid', placeItems: 'center' }} item xs={12} sm={2}>
          <div className='d-flex align-items-center'>
            <Typography className='text-capitalize' onClick={() => navigate('/Travel-Partner-Profile')} sx={{ m: 1, cursor: 'pointer' }} variant='h6'>{currentUser ? currentUser.name : ''}</Typography>
            <Button color='error' onClick={() => navigate('/Travel-Partner-Auth')} variant='text'>Logout</Button>
          </div>
        </Grid>
      </Grid>
    </div>

  )
}

export default TravelHeader