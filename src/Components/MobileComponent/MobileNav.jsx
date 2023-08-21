import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Autocomplete, Button, Container, Grid, TextField } from '@mui/material';
import { FiPhoneCall } from "react-icons/fi";
import { API_URL } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from "@mui/material";
import HotelioLogo from "../../images/HotelioLogo.png";
import MobileFooter from './MobileFooter';
import PersonIcon from "@mui/icons-material/Person";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from 'axios';
import Dropdown from "../dropdown/Dropdown";
import Dates from "../date/Date";
import Premiumcard from './Premiumcard';
import style from "../Navbar/navbar.module.css";
import MobileSlider from './MobileSlider';
import styled from 'styled-components';
import MobileDestination from './MobileDestination';
import MobileHeader from './MobileHeader';
import MobileDate from './MobileDate';

const MobileNav = ({ list }) => {


    const isDesktop = useMediaQuery("(max-width: 992px)");
    const { options } = useSelector((state) => state.searchOption);
    const { resultPerson } = useSelector((state) => state.personAlert);
    const { resultCity } = useSelector((state) => state.cityAlert);
    const { resultVehicle } = useSelector((state) => state.vehicleAlert);
    const { resultDate } = useSelector((state) => state.dateAlert);
    const { resultDateTime } = useSelector((state) => state.dateTimeAlert);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [nav2, setNav2] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [navSearch, setNavSearch] = useState(false);
    const path = location.pathname;
    const [option, setOption] = useState(options);

    // Search Filter
    // ----------------------------------------- get the all cities
    const [citites, setCities] = useState(null);
    const [selectedCity, setSlectedCity] = useState(null);
    const GetAllCities = async () => {
        try {
            const response = await axios.get(`${API_URL}/hotel/get/city`);
            if (response.status === 200) {
                setCities(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // room management function
    const [manageRoom, setManageRoom] = useState([{ room: 1, guest: 1 }]);

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
        const newRoom = { room: manageRoom.room + 1, guest: manageRoom.guest };
        console.log(newRoom)
        if (action === "add") {
            setManageRoom([newRoom]);
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


    const DummyArray = ["Your City", "Your City"];

    useEffect(() => {
        GetAllCities();
    }, []);

    // ---------------------------------search the hotel
    const searchData = {
        location: selectedCity,
        totalRooms: manageRoom.length,
    };

    const SearchTheField = () => {
        if (selectedCity === null)
            return window.alert("please Select the location");
        if (manageRoom[0].guest === 0)
            return window.alert("please select the room and guest ");
        const queryString = new URLSearchParams(searchData).toString();
        navigate(`/searchedhotels?${queryString}`);
    };

    const top100Films = [
        { label: 'The Shawshank Redemption' },
        { label: 'The Godfather' },
        { label: 'The Godfather: Part II' },
    ]

    return (
        <>
            <MobileHeader />
            <div className='bg-white p-1'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>

                        <div className="container">
                            <div className="row">
                                {/* {console.log(citites)} */}
                                <div className="col-lg-12 px-0">
                                    <div className={` ${style.search_form}`}>
                                        <h5 className='pb-4'><b>Welcome To Hotelio Rooms</b></h5>
                                        {/* <div className="row position-relative" style={{ border: '2px solid red', padding: '5px', borderRadius: '15px' }}>
                                            <div className={`col-lg-2 align-self-center`}>
                                                <fieldset className={`d-flex align-items-center`}>
                                                    <HotelIcon className="text-danger me-2" />
                                                    {console.log(selectedCity)}
                                                    <Dropdown
                                                        citites={citites ? citites : DummyArray}
                                                        name="cityHotel"
                                                        setSlectedCity={setSlectedCity}
                                                    />
                                                </fieldset>
                                            </div>

                                            <div
                                                className={`align-self-center col-lg-4`}
                                            >
                                                <fieldset
                                                    className="d-flex align-items-center"
                                                >
                                                    <CalendarMonthIcon className="text-danger me-2" />
                                                    <Dates />
                                                </fieldset>
                                            </div>
                                            <div
                                                className={
                                                    "col-lg-4 align-self-center position-relative"
                                                }
                                            >
                                                <fieldset className="d-flex justify-content-between align-items-center">
                                                    <PersonIcon className="text-danger me-2" />
                                                    <span
                                                        onClick={() => {
                                                            setOpenOptions(!openOptions);
                                                            dispatch({
                                                                type: "ALERTPERSON",
                                                                payload: false,
                                                            });
                                                        }}
                                                        className={`d-flex justify-content-between ${style.headerSearchText}`}
                                                    >
                                                        {`${getTotalGuests()} Guests · ${manageRoom.length} room`}

                                                    </span>
                                                    <div className="ms-3 text-dark">
                                                        {openOptions ? (
                                                            <ExpandLessIcon />
                                                        ) : (
                                                            <ExpandMoreIcon />
                                                        )}
                                                    </div>
                                                    {openOptions && (
                                                        <div style={{ left: '-1px' }} className={`shadow-lg p-2 ${style.options}`}>
                                                            {manageRoom.map((item, index) => (
                                                                <div>
                                                                    <div>
                                                                        <div className={`d-flex justify-content-evenly ${style.optionItem}`}>
                                                                            <div
                                                                            >
                                                                                Rooms
                                                                            </div>
                                                                            <div
                                                                                className={`ms-1 ${style.optionCounter}`}
                                                                            >
                                                                                <button
                                                                                    className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                                                                    onClick={() =>
                                                                                        ManageRoomAddandDelete("remove")
                                                                                    }
                                                                                >
                                                                                    <RemoveIcon />
                                                                                </button>
                                                                                <span
                                                                                    className={style.optionCounterNumber}
                                                                                >
                                                                                    {item.room}
                                                                                </span>
                                                                                <button
                                                                                    className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                                                                    onClick={() =>
                                                                                        ManageRoomAddandDelete("add")
                                                                                    }
                                                                                >
                                                                                    <AddIcon />
                                                                                </button>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className={`d-flex justify-content-evenly ${style.optionItem}`}>
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

                                                        </div>
                                                    )}
                                                </fieldset>
                                            </div>


                                            <div
                                                className={`${isDesktop ? "mt-3" : ""} ${nav2 || navSearch ? "col-lg-2" : "col-lg-3"
                                                    }`}
                                            >
                                                <fieldset>
                                                    <button
                                                        className={`p-2 ${style.main_button}`}
                                                        // onClick={handleOnSearch}
                                                        // onClick={() => navigate("/searchedhotels")}
                                                        onClick={() => SearchTheField()}
                                                    >
                                                        <SearchIcon /> Search Now
                                                    </button>

                                                    {list &&
                                                        (resultPerson ||
                                                            resultCity ||
                                                            resultVehicle ||
                                                            resultDate ||
                                                            resultDateTime) && (
                                                            <div className="mt-2 start-0 bg-danger bg-opacity-75 text-light rounded-3 p-3 position-absolute d-flex flex-column align-items-start">
                                                                <strong>Error! </strong>
                                                                {resultPerson && (
                                                                    <div>
                                                                        Total number of persons is more than
                                                                        capacity of rooms
                                                                    </div>
                                                                )}
                                                                {resultCity && <div>Enter city</div>}
                                                                {resultVehicle && (
                                                                    <div>Enter number of vehicles</div>
                                                                )}
                                                                {resultDate && <div>Enter Date</div>}
                                                                {resultDateTime && (
                                                                    <div>Enter Date and time</div>
                                                                )}
                                                            </div>
                                                        )}
                                                </fieldset>
                                            </div>
                                        </div> */}
                                        <div>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Autocomplete
                                                        options={top100Films}
                                                        id="disable-close-on-select"
                                                        renderInput={(params) => (
                                                            <TextField fullWidth {...params} label="Destination" variant="standard" />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <MobileDate />
                                                </Grid>
                                                <Grid item xs={6} className='d-flex'>
                                                    <hr style={{ height: '50px', width: '1px', position: 'relative', left: '-7px', top: '-13px' }} />
                                                    {/* <div style={{ borderLeft: '1px solid grey', height: '50px', position: 'relative', left: '-5px' }}></div> */}
                                                    <TextField fullWidth id="standard-basic" label="Rooms and guests" value={'1 Guests 1 Room'} variant="standard" />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <button style={{ background: '#ee2e24', color: '#fff' }} >Search</button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} paddingBottom={6}>
                        <div className='text-center'>
                            <Premiumcard />

                            <h5 className='p-2 py-4 pl-4'><b>Explore these Locations</b></h5>

                            <MobileDestination />
                            <h5 className='p-2 py-4 pl-4'><b>Our collection</b></h5>

                            <MobileSlider />
                            <h5 className='p-2 py-4 pl-4'><b>Our collection</b></h5>

                            <MobileSlider />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <MobileFooter />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default MobileNav