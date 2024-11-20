import React, { useEffect, useState } from "react";
import style from "./navbar.module.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import $ from "jquery";
import { useSelector } from "react-redux";
import Dates from "../date/Date";
import hotel from "../../images/hotel-bg.webp";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CallIcon from "@mui/icons-material/Call";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  Container,
  createTheme,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
  Grid,
  useMediaQuery,
  IconButton,
  Stack,
  Typography,
  Slider,
  Paper,
  CardContent,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HotelioLogo from "../../images/HotelioLogo.png";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import KeyIcon from "@mui/icons-material/Key";
import Swal from "sweetalert2";
import QuickFilterNav from "../../Pages/QuickFilterNav/QuickFilterNav";
import axios from "axios";
import { API_URL } from "../../config";
import InfoIcon from "@mui/icons-material/Info";
import { useAuthContext } from "../../context/userAuthContext";
import { convertDatesToUTC } from "../../Utilis/_fuctions";
import { useCollections } from "../../context/useStateManager";
import { useSearch } from "../../context/useSearch";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { ArrowDropDown, SwapHoriz } from "@mui/icons-material";
import { DatePicker } from "antd";
import { airportData } from "../../Utilis/airportData";

const Navbar = ({ list }) => {
  // Locatio Asked function

  // Popover Material UI Code
  const [anchorEl, setAnchorEl] = useState(null);
  const [tab, setTab] = useState("hotel");
  const [passMenu, setPassMenu] = useState(null);
  const theme = createTheme({
    components: {
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginLeft: 0,
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#ee2e24",
      },
    },
  });
  const [flightSearchForm, setFlightSearchForm] = useState({
    JourneyType: "1",
    DirectFlight: false,
    AdultCount: 1,
    ChildCount: 0,
    InfantCount: 0,
    Origin: "",
    Destination: "",
    FlightCabinClass: "Economy",
    PreferredDepartureTime: "",
    PreferredArrivalTime: "",
  });

  const { selectedPlace, setSelectedPlace, placeData } = useSearch();

  const open = Boolean(anchorEl);
  const CollectionData = useSelector(
    (state) => state.GetAllCollectionReducer.data
  );
  const [Login, setLogin] = useState(null);
  const openBox = Boolean(Login);
  const handleClickLogin = (event) => {
    setLogin(event.currentTarget);
  };
  const handleCloseLogin = () => {
    setLogin(null);
  };

  // Quick Nav
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Popover Material UI Code

  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  // selected checkinCheckOut Date
  const { checkInCheckOut, setCheckInCheckOut } = useCollections();

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeFlightSearchForm = (e) => {
    console.log("flightSearchForm", flightSearchForm);
    setFlightSearchForm({
      ...flightSearchForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitFlightSearchForm = (e) => {
    e.preventDefault();
    navigate("/flight/search")
  };

  //For Mobile Rsponsive of Navbar Search Bar
  const isMobile = useMediaQuery("(max-width: 400px)");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  // after login fuctins
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setCurrentUser, currentUser, logOut } = useAuthContext();

  const HandleLogOutCustomer = () => {
    logOut();
    window.localStorage.removeItem("customer");
    window.localStorage.removeItem("token");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Log Out Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    setCurrentUser("");
    navigate("/");
  };
  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);

  // Search Filter
  // ----------------------------------------- get the all cities
  const [citites, setCities] = useState(null);
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

  useEffect(() => {
    GetAllCities();
  }, []);

  // ---------------------------------search the hotel -----------------------------
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
    navigate(`/searched-hotels?${queryString}`);
  };

  const MarginMobile = {
    marginTop: "-112px",
  };

  return (
    <div>
      <header
        className={`${style.header_area}  ${style.header_sticky} ${style.wow} ${
          style.slideInDown
        } ${!list ? "bg-light position-static border-bottom" : ""}`}
        data-wow-duration="0.75s"
        data-wow-delay="0s"
      >
        <div className={`${style.Container}`}>
          <div className="row">
            <div className="col-12 p-0">
              <nav
                style={{
                  background: "#fff",
                  borderBottom: "2px solid #ee2e24",
                }}
                className={style.main_nav}
              >
                <div className="row">
                  <marquee
                    style={{
                      color: "#fff",
                      fontWeight: "900",
                      background: "#ff0000",
                    }}
                    behavior="alternate"
                    direction="left"
                  >
                    <h5>
                      <b>
                        Get 999 INR instantly Credit in your account on Sign Up.
                        Also become eligible for refer and earn.
                      </b>
                    </h5>
                  </marquee>
                  <div className="col-md-2 col-lg-12 col-xl-2 p-0 m-0">
                    <Link to="/" className={`${style.logo} ms-4`}>
                      <img alt="logo" src={HotelioLogo} />
                    </Link>
                  </div>
                  <div
                    style={isMobile ? MarginMobile : {}}
                    className="col-md-12 col-lg-12 col-xl-10 p-0 m-0"
                  >
                    <ul className={style.nav}>
                      <li
                        style={{
                          listStyle: "none",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <NavLink
                          to="/"
                          className={`${!list ? "text-dark w-100" : ""}`}
                        >
                          <HomeIcon /> Home
                        </NavLink>
                      </li>
                      <li
                        style={{
                          listStyle: "none",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <NavLink
                          to="/about-us"
                          className={`${!list ? "text-dark" : ""}`}
                        >
                          {/* {console.log(GetPlaceInfo('chennai')) */}
                          <InfoIcon /> About Us
                        </NavLink>
                      </li>
                      {/* <li
                        style={{
                          listStyle: "none",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <NavLink
                          target="_blank"
                          to="/hotelio-member"
                          className={`${!list ? "text-dark" : ""}`}
                        >
                          <BsFillBuildingsFill /> Become a Hotelio Partner
                        </NavLink>
                      </li> */}
                      {!currentUser ? (
                        <li
                          style={{
                            listStyle: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <NavLink
                            to={"https://admin.hoteliorooms.com/"}
                            className={`${!list ? "text-dark" : ""}`}
                          >
                            <DomainAddIcon /> LIST YOUR PROPERTY
                          </NavLink>
                        </li>
                      ) : (
                        <li
                          style={{
                            listStyle: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <NavLink to="/contact">
                            <CallIcon /> +91 (811)55 10050
                          </NavLink>
                        </li>
                      )}
                      {!currentUser ? (
                        <>
                          <NavLink
                            to="/contact"
                            className={`${!list ? "text-dark" : ""} ${
                              style.iconHide
                            }`}
                          >
                            Contact us
                          </NavLink>
                          <li
                            style={{
                              listStyle: "none",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              id="demo-positioned-button"
                              aria-controls={
                                openBox ? "demo-positioned-menu" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={openBox ? "true" : undefined}
                              onClick={handleClickLogin}
                              endIcon={<KeyboardArrowDownIcon />}
                              sx={{
                                color: "black",
                                fontWeight: 700,
                                pt: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontFamily: "Baloo 2",
                              }}
                            >
                              <KeyIcon /> Log In / Sign Up
                            </Button>
                            <Menu
                              id="demo-positioned-menu"
                              aria-labelledby="demo-positioned-button"
                              anchorEl={Login}
                              open={openBox}
                              onClose={handleCloseLogin}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                            >
                              <MenuItem onClick={() => navigate("/signin")}>
                                Customer Login
                              </MenuItem>
                              <MenuItem
                                onClick={() => navigate("/Travel-Partner-Auth")}
                              >
                                Agent Login
                              </MenuItem>
                              <MenuItem>
                                <Link to={"https://admin.hoteliorooms.com/"}>
                                  Partner Login
                                </Link>
                              </MenuItem>
                            </Menu>
                          </li>
                        </>
                      ) : (
                        <>
                          {/* after login show this component */}{" "}
                          <li
                            style={{
                              listStyle: "none",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            {currentUser?.avatar && (
                              <img
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "100%",
                                  border: "2px solid #ee2e24",
                                }}
                                src={currentUser?.avatar}
                                alt="profile"
                              />
                            )}
                            <Button
                              id="demo-customized-button"
                              sx={{
                                color: "#EE2E24",
                                fontWeight: "700",
                                fontSize: "15px",
                              }}
                              aria-controls={
                                open ? "demo-customized-menu" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              disableElevation
                              onClick={handleClick}
                              endIcon={<KeyboardArrowDownIcon />}
                            >
                              {currentUser && currentUser.name
                                ? currentUser.name
                                : currentUser.email
                                ? currentUser.email
                                : currentUser.mobileNo}
                            </Button>
                            <StyledMenu
                              id="demo-customized-menu"
                              MenuListProps={{
                                "aria-labelledby": "demo-customized-button",
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              className="text-center"
                            >
                              <MenuItem
                                onClick={handleClose}
                                disableRipple
                                sx={{ textAlign: "center" }}
                              >
                                <NavLink
                                  className="text-dark"
                                  to={`/customer-profile/${currentUser._id}`}
                                >
                                  My Profile
                                </NavLink>
                              </MenuItem>
                              <MenuItem
                                onClick={handleClose}
                                disableRipple
                                sx={{ textAlign: "center" }}
                              >
                                <NavLink
                                  className="text-dark"
                                  to="/booking-history"
                                >
                                  Booking History
                                </NavLink>
                              </MenuItem>
                              <MenuItem
                                onClick={handleClose}
                                disableRipple
                                sx={{ textAlign: "center" }}
                              >
                                <NavLink className="text-dark" to="/contact">
                                  <CallIcon /> +91 (811)55 10050
                                </NavLink>
                              </MenuItem>
                              <MenuItem
                                onClick={handleClose}
                                disableRipple
                                sx={{ textAlign: "center" }}
                              >
                                <NavLink className="text-dark" to="/about-us">
                                  About Us
                                </NavLink>
                              </MenuItem>
                              <MenuItem disableRipple>
                                <div onClick={HandleLogOutCustomer}>
                                  Log Out
                                </div>
                              </MenuItem>
                            </StyledMenu>
                          </li>
                        </>
                      )}

                      <li style={{ listStyle: "none" }}>
                        <span className={style.main_white_button}></span>
                      </li>
                    </ul>
                    <div
                      className={`${style.menu_trigger} ${
                        menuOpen ? style.active : ""
                      }`}
                      onClick={() => {
                        setMenuOpen(!menuOpen);
                        $(`.${style.header_area} .${style.nav}`).slideToggle(
                          200
                        );
                      }}
                    >
                      <span>Menu</span>
                    </div>
                  </div>
                </div>
                {/* <div
                  className={`py-2 text-white text-center ${style.navRemove}`}
                >
                  <CitywiseDropedown CityWiseCityList={citites} />
                </div> */}
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* ----------------------------------------------Banner Section---------------------------------------------------------- */}

      {list && (
        <>
          <div
            className={style.main_banner}
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(33, 33, 33,0.1), rgb(33, 33, 33,0.2)),url(${hotel})`,
            }}
          >
            <div className="col-lg-12">
              <div className={`${style.top_text} ${style.header_text}`}>
                <h2 className={` text-white ${style.text_shadow}`}>
                  Welcome To Hotelio, Your Travel Partner
                </h2>
              </div>
            </div>
            <div className={style.tabContainer}>
              <div>
                <button onClick={() => setTab("hotel")}>
                  <div
                    className={`${style.svgContainer} ${
                      tab === "hotel" && style.active
                    }`}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 38 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M36.9444 4.125C37.5276 4.125 38 3.66352 38 3.09375V1.03125C38 0.461484 37.5276 0 36.9444 0H1.05556C0.472361 0 0 0.461484 0 1.03125V3.09375C0 3.66352 0.472361 4.125 1.05556 4.125H2.10979V28.875H1.05556C0.472361 28.875 0 29.3365 0 29.9062V31.9688C0 32.5385 0.472361 33 1.05556 33H16.8889V27.8438C16.8889 27.2766 17.3639 26.8125 17.9444 26.8125H20.0556C20.6361 26.8125 21.1111 27.2766 21.1111 27.8438V33H36.9444C37.5276 33 38 32.5385 38 31.9688V29.9062C38 29.3365 37.5276 28.875 36.9444 28.875H35.8889V4.125H36.9444ZM16.8889 7.0125C16.8889 6.6 17.3111 6.1875 17.7333 6.1875H20.2667C20.6889 6.1875 21.1111 6.6 21.1111 7.0125V9.4875C21.1111 9.9 20.6889 10.3125 20.2667 10.3125H17.7333C17.3111 10.3125 16.8889 9.9 16.8889 9.4875V7.0125ZM16.8889 13.2C16.8889 12.7875 17.3111 12.375 17.7333 12.375H20.2667C20.6889 12.375 21.1111 12.7875 21.1111 13.2V15.675C21.1111 16.0875 20.6889 16.5 20.2667 16.5H17.7333C17.3111 16.5 16.8889 16.0875 16.8889 15.675V13.2ZM8.44444 7.0125C8.44444 6.6 8.86667 6.1875 9.28889 6.1875H11.8222C12.2444 6.1875 12.6667 6.6 12.6667 7.0125V9.4875C12.6667 9.9 12.2444 10.3125 11.8222 10.3125H9.28889C8.86667 10.3125 8.44444 9.9 8.44444 9.4875V7.0125ZM11.8222 16.5H9.28889C8.86667 16.5 8.44444 16.0875 8.44444 15.675V13.2C8.44444 12.7875 8.86667 12.375 9.28889 12.375H11.8222C12.2444 12.375 12.6667 12.7875 12.6667 13.2V15.675C12.6667 16.0875 12.2444 16.5 11.8222 16.5ZM12.6667 24.75C12.6667 21.3327 15.5022 18.5625 19 18.5625C22.4978 18.5625 25.3333 21.3327 25.3333 24.75H12.6667ZM29.5556 15.675C29.5556 16.0875 29.1333 16.5 28.7111 16.5H26.1778C25.7556 16.5 25.3333 16.0875 25.3333 15.675V13.2C25.3333 12.7875 25.7556 12.375 26.1778 12.375H28.7111C29.1333 12.375 29.5556 12.7875 29.5556 13.2V15.675ZM29.5556 9.4875C29.5556 9.9 29.1333 10.3125 28.7111 10.3125H26.1778C25.7556 10.3125 25.3333 9.9 25.3333 9.4875V7.0125C25.3333 6.6 25.7556 6.1875 26.1778 6.1875H28.7111C29.1333 6.1875 29.5556 6.6 29.5556 7.0125V9.4875Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <p>Hotel</p>
                </button>
                <button onClick={() => setTab("flight")}>
                  <div
                    className={`${style.svgContainer} ${
                      tab === "flight" && style.active
                    }`}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.51937 25.7313L0.642755 22.48L2.57102 20.5293L7.16212 21.1795L14.3242 13.9339L0 6.03802L2.57102 3.43703L20.109 7.98877L27.3171 0.789587C27.8374 0.263196 28.4881 0 29.2692 0C30.0503 0 30.7004 0.263196 31.2195 0.789587C31.7386 1.31598 31.9988 1.97428 32 2.76449C32.0012 3.55469 31.7411 4.21237 31.2195 4.73752L24.0574 11.9832L28.5567 29.7256L25.9856 32.3266L18.1808 17.8354L11.0186 25.081L11.6614 29.7256L9.73314 31.6764L6.51937 25.7313Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <p>Flight</p>
                </button>
              </div>
            </div>
            {tab === "hotel" && (
              <>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 px-0">
                      <div className={` ${style.search_form}`}>
                        <div className="row position-relative">
                          <div
                            className={`col-lg-3 align-self-center d-flex align-items-center`}
                          >
                            <HotelIcon className="text-danger me-2" />
                            {/* <input type="text" ref={inputRef} /> */}
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
                          </div>

                          <div className={`col-lg-4 align-self-center`}>
                            <fieldset
                              style={{ borderRight: "2px solid red" }}
                              className="d-flex align-items-center justify-content-center"
                            >
                              <div>
                                <CalendarMonthIcon className="text-danger" />
                                <Dates
                                  setCheckInCheckOut={setCheckInCheckOut}
                                  checkInCheckOut={checkInCheckOut}
                                />
                              </div>
                            </fieldset>
                          </div>

                          <div
                            className={
                              "col-lg-3 align-self-center position-relative"
                            }
                          >
                            <fieldset className="d-flex align-items-center justify-content-center">
                              <PersonIcon className="text-danger me-2" />
                              <span
                                onClick={() => {
                                  setOpenOptions(!openOptions);
                                }}
                                className={`d-flex ${style.headerSearchText}`}
                              >
                                {`${getTotalGuests()} Guests · ${
                                  manageRoom.length
                                } room`}
                                <div className="ms-3 text-dark">
                                  {openOptions ? (
                                    <ExpandLessIcon />
                                  ) : (
                                    <ExpandMoreIcon />
                                  )}
                                </div>
                              </span>
                              {openOptions && (
                                <div
                                  className={`shadow-lg p-2 ${style.options}`}
                                >
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
                                          <span
                                            className={`${style.optionText} `}
                                          >
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
                                              className={
                                                style.optionCounterNumber
                                              }
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
                                          className={`${
                                            manageRoom.length === 7
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
                              )}
                            </fieldset>
                          </div>

                          <div className={"col-lg-2"}>
                            <fieldset>
                              <button
                                className={style.main_button}
                                onClick={() => SearchTheField()}
                              >
                                <SearchIcon /> Search Now
                              </button>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "50px" }} className="container">
                  <QuickFilterNav
                    CollectionData={CollectionData}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                  />
                </div>
              </>
            )}
            {tab === "flight" && (
              <ThemeProvider theme={theme}>
                <Container
                  maxWidth={"md"}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                >
                  <Box padding={2}>
                    <form
                      onSubmit={handleSubmitFlightSearchForm}
                    >
                      <Box
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <RadioGroup
                          row
                          name="JourneyType"
                          value={flightSearchForm.JourneyType}
                          onChange={handleChangeFlightSearchForm}
                          sx={{ gap: 3 }}
                        >
                          <FormControlLabel
                            value="1"
                            control={<Radio hidden />}
                            label={
                              <Chip
                                label="One Way"
                                clickable
                                variant={
                                  flightSearchForm.JourneyType === "1"
                                    ? "filled"
                                    : "outlined"
                                }
                                color="primary"
                                size="medium"
                                sx={{
                                  fontSize: "1.2rem",
                                  borderWidth: "2px",
                                }}
                              />
                            }
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio hidden />}
                            label={
                              <Chip
                                label="Round-Trip"
                                clickable
                                variant={
                                  flightSearchForm.JourneyType === "2"
                                    ? "filled"
                                    : "outlined"
                                }
                                color="primary"
                                size="medium"
                                sx={{
                                  fontSize: "1.2rem",
                                  borderWidth: "2px",
                                }}
                              />
                            }
                          />
                        </RadioGroup>
                        <FormControlLabel
                          label={
                            <Chip
                              label="Direct Flight"
                              clickable
                              variant={
                                flightSearchForm.DirectFlight === true
                                  ? "filled"
                                  : "outlined"
                              }
                              color="primary"
                              size="small"
                            />
                          }
                          control={
                            <Checkbox
                              name="DirectFlight"
                              checked={flightSearchForm.DirectFlight}
                              onChange={(e) =>
                                setFlightSearchForm({
                                  ...flightSearchForm,
                                  DirectFlight: e.target.checked,
                                })
                              }
                            />
                          }
                        />
                      </Box>
                      <Grid
                        container
                        position={"relative"}
                        spacing={2}
                        mt={1}
                        width={"100%"}
                      >
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            freeSolo
                            options={airportData}
                            value={flightSearchForm.Origin}
                            onSelect={handleChangeFlightSearchForm}
                            getOptionLabel={(option) => {
                              if (option) {
                                return (
                                  option.airport_city_name +
                                    " (" +
                                    option.airport_code +
                                    ")" || ""
                                );
                              }
                              return "";
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="To"
                                variant="outlined"
                              />
                            )}
                          />
                        </Grid>
                        <Grid
                          item
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50% , -50%)",
                          }}
                        >
                          <IconButton>
                            <SwapHoriz />
                          </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            freeSolo
                            options={airportData}
                            value={flightSearchForm.Origin}
                            onSelect={handleChangeFlightSearchForm}
                            getOptionLabel={(option) => {
                              if (option) {
                                return (
                                  option.airport_city_name +
                                    " (" +
                                    option.airport_code +
                                    ")" || ""
                                );
                              }
                              return "";
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="From"
                                variant="outlined"
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} sm={6}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "stretch",
                              padding: 1,
                              marginTop: -1,
                              marginRight: 1,
                              gap: 2,
                              borderRadius: 1,
                              border: "1px solid #e0e0e0",
                              "&:focus-within": {
                                borderColor: "primary.main",
                                borderWidth: 2,
                              },
                              "&:hover": {
                                borderColor: "black",
                              },
                            }}
                          >
                            <DatePicker
                              style={{ width: "100%", padding: 0 }}
                              placeholder="Departure Date"
                              variant="borderless"
                              value={flightSearchForm.DepartureDate}
                            />
                            {flightSearchForm.JourneyType === "2" && (
                              <>
                                <Box
                                  sx={{
                                    bgcolor: "rgba(0, 0, 0,0.2)",
                                    padding: 0.1,
                                  }}
                                />
                                <DatePicker
                                  style={{ width: "100%", padding: 0 }}
                                  placeholder="Return Date"
                                  variant="borderless"
                                />
                              </>
                            )}
                          </Box>
                        </Grid>
                        <Grid item position={"relative"} xs={12} sm={6}>
                          <Button
                            id="passenger-menu"
                            sx={{
                              width: "100%",
                              padding: 1.5,
                              marginTop: -1,
                              marginLeft: -1,
                              marginRight: 4,
                              justifyContent: "space-between",
                              gap: 2,
                              borderRadius: 1,
                              boxSizing: "border-box",
                              border: "1px solid #e0e0e0",
                              "&:focus-within": {
                                borderColor: "primary.main",
                                borderWidth: 2,
                              },
                              "&:hover": {
                                borderColor: "black",
                              },
                            }}
                            onClick={(e) => setPassMenu(e.currentTarget)}
                          >
                            <Typography variant="body1">
                              2 Passengers . Economy
                            </Typography>
                            <ArrowDropDown
                              sx={{
                                padding: 0,
                                [menuOpen ? "transform" : ""]: menuOpen
                                  ? "rotate(180deg)"
                                  : "",
                              }}
                            />
                          </Button>
                          <Menu
                            anchorEl={passMenu}
                            open={Boolean(passMenu)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            MenuListProps={{
                              "aria-labelledby": "passenger-menu",
                            }}
                            sx={{
                              "& .MuiMenu-paper": {
                                width: "300px",
                              },
                            }}
                            onClose={() => setPassMenu(null)}
                          >
                            <Box paddingX={3}>
                              <Stack width={"-webkit-fill-available"}>
                                <Box
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  alignItems={"center"}
                                  paddingX={2}
                                >
                                  <Typography variant="subtitle1">
                                    Adults
                                  </Typography>
                                  <Typography variant="subtitle1">4</Typography>
                                </Box>
                                <Slider min={1} max={10} step={1} />
                              </Stack>
                            </Box>
                            <Box paddingX={3}>
                              <Stack width={"-webkit-fill-available"}>
                                <Box
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  alignItems={"center"}
                                  paddingX={2}
                                >
                                  <Typography variant="subtitle1">
                                    Children
                                  </Typography>
                                  <Typography variant="subtitle1">4</Typography>
                                </Box>
                                <Slider min={0} max={10} step={1} />
                              </Stack>
                            </Box>
                            <Box paddingX={3}>
                              <Stack width={"-webkit-fill-available"}>
                                <Box
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  alignItems={"center"}
                                  paddingX={2}
                                >
                                  <Typography variant="subtitle1">
                                    Infants
                                  </Typography>
                                  <Typography variant="subtitle1">4</Typography>
                                </Box>
                                <Slider min={0} max={10} step={1} />
                              </Stack>
                            </Box>
                            <Box
                              paddingX={3}
                              sx={{
                                flexDirection: "column",
                              }}
                            >
                              <Typography variant="h6" component={"h6"}>
                                Select Class
                              </Typography>
                              <RadioGroup
                                sx={{
                                  flexDirection: "row",
                                  gap: 2,
                                  justifyContent: "center",
                                  mt: 2,
                                }}
                              >
                                <FormControlLabel
                                  value="1"
                                  control={<Radio hidden />}
                                  label={
                                    <Button variant="outlined">Economy</Button>
                                  }
                                />
                                <FormControlLabel
                                  value="1"
                                  control={<Radio hidden />}
                                  label={
                                    <Button variant="outlined">Economy</Button>
                                  }
                                />
                                <FormControlLabel
                                  value="1"
                                  control={<Radio hidden />}
                                  label={
                                    <Button variant="outlined">Economy</Button>
                                  }
                                />
                                <FormControlLabel
                                  value="1"
                                  control={<Radio hidden />}
                                  label={
                                    <Button variant="outlined">Economy</Button>
                                  }
                                />
                              </RadioGroup>
                            </Box>
                          </Menu>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} mt={2} px={2}>
                        <Box
                          sx={{
                            width: "100%",
                            border: "1px solid #e0e0e0",
                            display: "flex",
                            borderRadius: 1,
                            "&:hover": {
                              borderColor: "black",
                            },
                            "&:focus-within": {
                              borderColor: "primary.main",
                              borderWidth: 2,
                            },
                          }}
                        >
                          <CardContent>
                            <Typography noWrap color={"primary.main"}>
                              Special Fares
                            </Typography>
                          </CardContent>
                          <RadioGroup
                            value={flightSearchForm.SpecialFares}
                            onChange={handleChangeFlightSearchForm}
                            sx={{
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "row",
                              flexWrap: "nowrap",
                              justifyContent: "space-around",
                              width: "-webkit-fill-available",
                            }}
                          >
                            <FormControlLabel
                              control={<Radio />}
                              label={<Typography>Student</Typography>}
                              value={"Student"}
                              sx={{
                                border: "1px solid #e0e0e0",
                                paddingRight: 2,
                                borderRadius: 1,
                                "&:has(:checked)": {
                                  borderColor: "primary.main",
                                  borderWidth: 2,
                                  color: "primary.main",
                                },
                                "&:has(:checked) p": {
                                  color: "primary.main",
                                },
                              }}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label={<Typography>Senior Citizen</Typography>}
                              value={"Senior Citizen"}
                              sx={{
                                border: "1px solid #e0e0e0",
                                paddingRight: 2,
                                borderRadius: 1,
                                "&:has(:checked)": {
                                  borderColor: "primary.main",
                                  borderWidth: 2,
                                  color: "primary.main",
                                },
                                "&:has(:checked) p": {
                                  color: "primary.main",
                                },
                              }}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label={<Typography>Armed Forces</Typography>}
                              value={"Armed Forces"}
                              sx={{
                                border: "1px solid #e0e0e0",
                                paddingRight: 2,
                                borderRadius: 1,
                                "&:has(:checked)": {
                                  borderColor: "primary.main",
                                  borderWidth: 2,
                                  color: "primary.main",
                                },
                                "&:has(:checked) p": {
                                  color: "primary.main",
                                },
                              }}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label={<Typography>Doctors & Nurses</Typography>}
                              value={"Docter&Nurse"}
                              sx={{
                                border: "1px solid #e0e0e0",
                                paddingRight: 2,
                                borderRadius: 1,
                                "&:has(:checked)": {
                                  borderColor: "primary.main",
                                  borderWidth: 2,
                                  color: "primary.main",
                                },
                                "&:has(:checked) p": {
                                  color: "primary.main",
                                },
                              }}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label={<Typography>None</Typography>}
                              value={""}
                              sx={{
                                border: "1px solid #e0e0e0",
                                paddingRight: 2,
                                borderRadius: 1,
                                "&:has(:checked)": {
                                  borderColor: "primary.main",
                                  borderWidth: 2,
                                  color: "primary.main",
                                },
                                "&:has(:checked) p": {
                                  color: "primary.main",
                                },
                              }}
                            />
                          </RadioGroup>
                        </Box>
                      </Grid>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 2,
                        }}
                      >
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          sx={{ width: "80%" }}
                        >
                          Search Flights
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Container>
              </ThemeProvider>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
