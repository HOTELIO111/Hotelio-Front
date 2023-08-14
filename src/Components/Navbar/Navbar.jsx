import React, { useEffect, useState } from "react";
import style from "./navbar.module.css";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import $, { param } from "jquery";
import ParkingDate from "../DateForPaking/ParkingDate";
import Dates from "../date/Date";
import Dropdown from "../dropdown/Dropdown";
import hotel from "../../images/hotel-bg.png";
import hotelparking from "../../images/hotelparking-bg.jpg";
import parking from "../../images/parking-bg.jpg";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { FormControl, InputLabel, Select, useMediaQuery } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import NavBanner from "../../images/NavBanner.jpg";
import HotelioLogo from "../../images/HotelioLogo.png";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import {
  BsFillBuildingsFill,
} from "react-icons/bs";
import KeyIcon from "@mui/icons-material/Key";
import Swal from "sweetalert2";
import QuickFilterNav from "../../Pages/QuickFilterNav/QuickFilterNav";
import axios from "axios";
import { API_URL } from "../../config";
import InfoIcon from '@mui/icons-material/Info';
import CitywiseDropedown from "../CitywiseDropedown/CitywiseDropedown";

const Navbar = ({ list }) => {
  // Get Logged In User
  const { login } = useSelector((state) => state.setLogin);
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);

  // Dashboard Access And Logout
  const [sidetooltip, setTooltip] = useState(null);
  const openTooltip = Boolean(sidetooltip);
  const handleonClick = (event) => {
    setTooltip(event.currentTarget);
  };
  const handleonClose = () => {
    setTooltip(null);
  };

  // Popover Material UI Code
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);

  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);

  const [Login, setLogin] = React.useState(null);
  const openBox = Boolean(Login);
  const handleClickLogin = (event) => {
    setLogin(event.currentTarget);
  };
  const handleCloseLogin = () => {
    setLogin(null);
  };

  // Popover Material UI Code
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dates } = useSelector((state) => state.searchDate);
  const datesParking = useSelector((state) => state.searchParkingDate.dates);
  const { resultPerson } = useSelector((state) => state.personAlert);
  const { resultCity } = useSelector((state) => state.cityAlert);
  const { resultVehicle } = useSelector((state) => state.vehicleAlert);
  const { resultDate } = useSelector((state) => state.dateAlert);
  const { resultDateTime } = useSelector((state) => state.dateTimeAlert);
  const { c } = useSelector((state) => state.searchVehicle);
  const { activePath } = useSelector((state) => state.activePath);
  const { options } = useSelector((state) => state.searchOption);
  const location = useLocation();
  const path = location.pathname;
  const [navSearch, setNavSearch] = useState(false);
  const [nav2, setNav2] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [option, setOption] = useState(options);
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

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

  //For Mobile Rsponsive of Navbar Search Bar
  const isMobile = useMediaQuery("(max-width: 400px)");
  const isDesktop = useMediaQuery("(max-width: 992px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  // Hidding Alerts After Two Seconds
  if (
    resultPerson ||
    resultCity ||
    resultVehicle ||
    resultDate ||
    resultDateTime
  ) {
    setTimeout(() => {
      dispatch({
        type: "ALERTPERSON",
        payload: false,
      });
      dispatch({
        type: "ALERTCITY",
        payload: false,
      });
      dispatch({
        type: "ALERTVEHICLE",
        payload: false,
      });
      dispatch({
        type: "ALERTDATE",
        payload: false,
      });
      dispatch({
        type: "ALERTDATETIME",
        payload: false,
      });
    }, 2000);
  }

  useEffect(() => {
    if (path === "/" || path === "/listHotel" || path === "/singleHotel") {
      dispatch({
        type: "activePath",
        payload: "hotel",
      });
    } else if (path === "/parking" || path === "/ParkingList") {
      dispatch({
        type: "activePath",
        payload: "parking",
      });
    } else if (
      path === "/HotelAndParking" ||
      path === "/HotelAndParkingList" ||
      path === "/singleHotelAndParking"
    ) {
      dispatch({
        type: "activePath",
        payload: "hotelAndParking",
      });
    } else {
      dispatch({
        type: "activePath",
        payload: "",
      });
    }

    if (path === "/") {
      setNavSearch(true);
    } else if (path === "/HotelAndParking") {
      setNav2(true);
    } else if (path === "/parking") {
      setNav2(false);
      setNavSearch(false);
    }

    if (path === "/" || path === "/HotelAndParking" || path === "/parking") {
      setOption({
        adult: 1,
        children: 0,
        singleRoom: 1,
        twinRoom: 0,
        familyRoom: 0,
      });

      dispatch({
        type: "SET_DATE",
        payload: [],
      });

      dispatch({
        type: "SET_CITY",
        payload: "",
      });

      dispatch({
        type: "SET_HOTELANDPARKINGCITY",
        payload: "",
      });

      dispatch({
        type: "SET_PARKINGCITY",
        payload: "",
      });

      dispatch({
        type: "INCREMENT",
        payload: "",
      });
    }

    dispatch({
      type: "ALERTPERSON",
      payload: false,
    });

    dispatch({
      type: "ALERTCITY",
      payload: false,
    });

    dispatch({
      type: "ALERTVEHICLE",
      payload: false,
    });

    dispatch({
      type: "ALERTDATE",
      payload: false,
    });

    dispatch({
      type: "ALERTDATETIME",
      payload: false,
    });
  }, [path]);

  useEffect(() => {
    dispatch({
      type: "SET_OPTION",
      payload: option,
    });
  }, [option]);

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
    const newRoom = { room: manageRoom.length + 1, guest: 1 };
    if (action === "add") {
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
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("customer"))
  );

  const HandleLogOutCustomer = () => {
    sessionStorage.removeItem("customer");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Log Out Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    setCurrentUser(sessionStorage.getItem("customer"));
    navigate("/");
  };
  useEffect(() => {
    if (currentUser !== {}) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);

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

  useEffect(() => {
    GetAllCities();
  }, []);
  // ---------------------------------city get api

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

  const DummyArray = ["Your City", "Your City"];

  return (
    <div className="w-100">
      <header
        className={`${style.header_area}  ${style.header_sticky} ${style.wow} ${style.slideInDown
          } ${!list ? "bg-light position-static border-bottom" : ""}`}
        data-wow-duration="0.75s"
        data-wow-delay="0s"
      >

        <div className={`${style.Container}`}>
          <div className="row">
            <div className="col-12 p-0">
              <nav
                style={{
                  background: '#fff',
                  // background: `linear-gradient(4deg, rgba(255,255,255,1) 17%, rgba(188,124,124,0.3394607843137255) 89%), url(${NavBanner})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                className={style.main_nav}
              >
                <Link to="/" className={`${style.logo} ms-4`}>
                  <img alt="logo" src={HotelioLogo} />
                </Link>
                <ul className={style.nav}>
                  <li style={{ listStyle: "none" }}>
                    <NavLink
                      to="/"
                      className={`${!list ? "text-dark" : ""}`}
                      onClick={() => {
                        dispatch({
                          type: "activePath",
                          payload: "hotel",
                        });
                      }}
                    >
                      <HomeIcon /> Home
                      <hr
                        className={`mt-0 ${style.activeTab} ${activePath === "hotel" ? "d-block" : "d-none"
                          }`}
                      />
                    </NavLink>
                  </li>
                  <li style={{ listStyle: "none" }}>
                    <NavLink
                      to="/about"
                      className={`${!list ? "text-dark" : ""}`}
                      onClick={() => {
                        dispatch({
                          type: "activePath",
                          payload: "about",
                        });
                      }}
                    >
                      <InfoIcon /> About Us
                      <hr
                        className={`mt-0 ${style.activeTab} ${activePath === "about" ? "d-block" : "d-none"
                          }`}
                      />
                    </NavLink>
                  </li>
                  <li style={{ listStyle: "none" }}>
                    <NavLink
                      // to="/parking"
                      target="_blank" 
                      to="/hoteliomember"
                      className={`${!list ? "text-dark" : ""}`}
                      onClick={() => {
                        dispatch({
                          type: "activePath",
                          payload: "parking",
                        });
                      }}
                    >
                      <BsFillBuildingsFill /> Become a Hotelio Partner
                      <hr
                        className={`mt-0 ${style.activeTab} ${activePath === "parking" ? "d-block" : "d-none"
                          }`}
                      />
                    </NavLink>
                  </li>
                  <li style={{ listStyle: "none" }}>
                    <NavLink
                      // to="/parking"
                      to={
                        "https://hotelio-dashboard-trickle.netlify.app/register"
                      }
                      className={`${!list ? "text-dark" : ""}`}
                      onClick={() => {
                        dispatch({
                          type: "activePath",
                          payload: "register",
                        });
                      }}
                    >
                      <DomainAddIcon /> LIST YOUR PROPERTY
                      <hr
                        className={`mt-0 ${style.activeTab} ${activePath === "register" ? "d-block" : "d-none"
                          }`}
                      />
                    </NavLink>
                  </li>
                  {/* <li style={{ listStyle: 'none' }}>
                    <NavLink to="/contact">+91 (811)55 10050</NavLink>
                  </li> */}
                  {!currentUser ? (
                    <>
                      {/* <li>
                        <button
                          onClick={() => {
                            navigate("/contact");
                          }}
                          className={`${style.iconShow} btn btn-primary rounded`}
                        >
                          Contact us
                        </button>
                      </li> */}
                      <NavLink
                        to="/contact"
                        className={`${!list ? "text-dark" : ""} ${style.iconHide
                          }`}
                      >
                        Contact us
                      </NavLink>
                      <li style={{ listStyle: "none" }}>
                        <Button
                          id="demo-positioned-button"
                          aria-controls={
                            openBox ? "demo-positioned-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={openBox ? "true" : undefined}
                          onClick={handleClickLogin}
                          endIcon={<KeyboardArrowDownIcon />}
                          sx={{ color: "black", fontWeight: 700, my: 1, pt: 0 }}
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
                          {/* <MenuItem onClick={() => navigate("/signup")}>
                            Customer Signup
                          </MenuItem> */}
                          <MenuItem>
                            <Link
                              to={
                                "https://hotelio-dashboard-trickle.netlify.app/"
                              }
                            >
                              Partner Login
                            </Link>
                          </MenuItem>
                          {/* <MenuItem>
                            <Link
                              to={
                                "https://hotelio-dashboard-trickle.netlify.app/register"
                              }
                            >
                              Partner Signup
                            </Link>
                          </MenuItem> */}
                        </Menu>
                      </li>
                    </>
                  ) : (
                    <>
                      {/* after login show this component */}{" "}
                      <li style={{ listStyle: "none" }}>
                        <Button
                          id="demo-customized-button"
                          sx={{ color: "black" }}
                          aria-controls={
                            open ? "demo-customized-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          disableElevation
                          onClick={handleClick}
                          endIcon={<KeyboardArrowDownIcon />}
                        >
                          {currentUser ? currentUser.name : ""}
                        </Button>
                        <StyledMenu
                          id="demo-customized-menu"
                          MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >
                          <MenuItem
                            sx={{ paddingY: 0 }}
                            onClick={handleClose}
                            disableRipple
                          >
                            <NavLink to={"/CustomerNameProfile"}>
                              My Profile
                            </NavLink>
                          </MenuItem>
                          <MenuItem
                            sx={{ paddingY: 0 }}
                            onClick={handleClose}
                            disableRipple
                          >
                            <NavLink to="/YourBooking">Your Booking</NavLink>
                          </MenuItem>
                          <MenuItem
                            sx={{ paddingY: 0 }}
                            onClick={handleClose}
                            disableRipple
                          >
                            <NavLink to="/contact">+91 (811)55 10050</NavLink>
                          </MenuItem>
                          <MenuItem
                            sx={{ paddingY: 0 }}
                            onClick={handleClose}
                            disableRipple
                          >
                            <NavLink to="/about">About Us</NavLink>
                          </MenuItem>
                          <MenuItem
                            sx={{ paddingY: 0 }}
                            onClick={handleClose}
                            disableRipple
                          >
                            <div onClick={HandleLogOutCustomer}>Log Out</div>
                          </MenuItem>
                        </StyledMenu>
                      </li>
                    </>
                  )}

                  <li style={{ listStyle: "none" }}>
                    <span className={style.main_white_button}></span>
                  </li>
                </ul>
                <a
                  className={`${style.menu_trigger} ${menuOpen ? style.active : ""
                    }`}
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    $(`.${style.header_area} .${style.nav}`).slideToggle(200);
                  }}
                >
                  <span>Menu</span>
                </a>
                <div className={`py-2 text-white text-center ${style.navRemove}`}>
                  {/* <ul className="d-flex justify-content-center">
                    <li  >
                      <b onClick={() => navigate('/')} style={{ cursor: 'pointer' }} className="px-5">HOME</b>
                    </li>
                    <li style={{ borderLeft: '2px solid white' }} >
                      <b onClick={() => navigate('/about')} style={{ cursor: 'pointer' }} className="px-5">ABOUT US</b>
                    </li>
                    <li style={{ borderLeft: '2px solid white' }} >
                      <b onClick={() => navigate('/hoteliomember')} style={{ cursor: 'pointer' }} className="px-5">BECOME A HOTELIO PARTNER</b>
                    </li>
                    <li style={{ borderLeft: '2px solid white' }} >
                      <b onClick={() => navigate('')} style={{ cursor: 'pointer' }} className="px-5">FAQ</b>
                    </li>
                    <li style={{ borderLeft: '2px solid white' }} >
                      <b onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }} className="px-5">CONTACT US</b>
                    </li>
                  </ul> */}
                  <CitywiseDropedown />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {list && (
        <>
          <div
            className={style.main_banner}
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(33, 33, 33,0.1), rgb(33, 33, 33,0.2)),url(${hotel})`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className={`${style.top_text} ${style.header_text}`}>
                    <h2 className={` text-white ${style.text_shadow}`}>
                      Welcome To Hotelio, Your Travel Partner
                    </h2>
                    {/* <h4 className={`py-3 text-white ${style.text_shadow}`}>
                      Where comfort meets convenience and your journey begins
                      with a click
                    </h4> */}
                  </div>
                </div>
                {/* {console.log(citites)} */}
                <div className="col-lg-12 px-0">
                  <div className={` ${style.search_form}`}>
                    <div className="row position-relative">
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
                        className={`${nav2 ? "col-lg-3" : "col-lg-4"
                          } align-self-center`}
                      >
                        <fieldset
                          style={{ borderRight: "2px solid red" }}
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
                        <fieldset className="d-flex align-items-center">
                          <PersonIcon className="text-danger me-2" />
                          <span
                            onClick={() => {
                              setOpenOptions(!openOptions);
                              dispatch({
                                type: "ALERTPERSON",
                                payload: false,
                              });
                            }}
                            className={`d-flex ${style.headerSearchText}`}
                          >
                            {`${getTotalGuests()} Guests · ${manageRoom.length} room`}
                            <div className="ms-3 text-dark">
                              {openOptions ? (
                                <ExpandLessIcon />
                              ) : (
                                <ExpandMoreIcon />
                              )}
                            </div>
                          </span>
                          {openOptions && (
                            <div className={`shadow-lg p-2 ${style.options}`}>
                              <div className="row">
                                <div className="col">
                                  <div className="d-flex justify-content-evenly">
                                    <h5>Rooms</h5>
                                    <h5>Guests</h5>
                                  </div>
                                </div>
                              </div>
                              {/* Mapped the rooms data */}
                              {manageRoom.map((item, index) => (
                                <div className="row">
                                  <div className="col-6">
                                    <div className={style.optionItem}>
                                      <div
                                        className={`d-flex justify-content-between`}
                                      >
                                        Rooms
                                      </div>
                                      <div
                                        className={`d-flex justify-content-between`}
                                      >
                                        {item.room}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
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

                              <div className="row">
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
                                      className={`${style.optionText} `}
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
                      <div
                        className={`${isDesktop ? "mt-3" : ""} ${nav2 || navSearch ? "col-lg-2" : "col-lg-3"
                          }`}
                      >
                        <fieldset>
                          <button
                            className={style.main_button}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '100px' }} className="container">
              <QuickFilterNav />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
//  onClick={() =>  handleOption("singleRoom", "d")}
// onClick={() =>  handleOption("singleRoom", "i")  }
// {options.singleRoom}
