import React, { useEffect, useState } from "react";
import style from "./navbar.module.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";
import Dates from "../date/Date";
import Dropdown from "../dropdown/Dropdown";
import hotel from "../../images/hotel-bg.png";
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
import CallIcon from '@mui/icons-material/Call';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useMediaQuery } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HotelioLogo from "../../images/HotelioLogo.png";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import { BsFillBuildingsFill } from "react-icons/bs";
import KeyIcon from "@mui/icons-material/Key";
import Swal from "sweetalert2";
import QuickFilterNav from "../../Pages/QuickFilterNav/QuickFilterNav";
import axios from "axios";
import { API_URL } from "../../config";
import InfoIcon from "@mui/icons-material/Info";
import CitywiseDropedown from "../CitywiseDropedown/CitywiseDropedown";
import { useAuthContext } from "../../context/userAuthContext";

const Navbar = ({ list }) => {
  // Locatio Asked function

  // Popover Material UI Code
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const [Login, setLogin] = useState(null);
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
  const { activePath } = useSelector((state) => state.activePath);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

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
    if (currentUser) {
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
  const MarginMobile = {
    marginTop: "-112px",
  };

  return (
    <div className="">
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
                  background: "#fff",
                }}
                className={style.main_nav}
              >
                <div className="row">
                  <marquee style={{ color: '#fff', fontWeight: '900', background: '#ff0000' }} behavior="alternate" direction="left"><b>Get 999 INR instantly Credit in your account. Also become eligible for refer and earn.</b></marquee>
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
                          onClick={() => {
                            dispatch({
                              type: "activePath",
                              payload: "home",
                            });
                          }}
                        >
                          <HomeIcon /> Home
                          <hr
                            className={`mt-0 ${style.activeTab} ${activePath === "home" ? "d-block" : "d-none"
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
                          to={
                            "https://admin.hoteliorooms.com/"
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
                              sx={{
                                color: "black",
                                fontWeight: 700,
                                my: 1,
                                pt: 0,
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
                              <MenuItem onClick={() => navigate("/Travel-Partner-Auth")}>
                                Agent Login
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to={
                                    "https://admin.hoteliorooms.com/"
                                  }
                                >
                                  Partner Login
                                </Link>
                              </MenuItem>
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
                              className='text-center'
                            >
                              <MenuItem
                                onClick={handleClose}
                                disableRipple
                                sx={{ textAlign: 'center' }}
                              >
                                <NavLink className='text-dark' to={`/Customer${currentUser.name}Profile`}>
                                  My Profile
                                </NavLink>
                              </MenuItem>
                              <MenuItem
                                onClick={handleClose}
                                disableRipple
                                sx={{ textAlign: 'center' }}
                              >
                                <NavLink className='text-dark' to="/YourBooking">
                                  My Booking
                                </NavLink>
                              </MenuItem>
                              <MenuItem
                                onClick={handleClose}
                                disableRipple
                                sx={{ textAlign: 'center' }}
                              >
                                <NavLink className='text-dark' to="/contact">
                                  <CallIcon /> +91 (811)55 10050
                                </NavLink>
                              </MenuItem>
                              <MenuItem
                                onClick={handleClose}
                                disableRipple
                                sx={{ textAlign: 'center' }}
                              >
                                <NavLink className='text-dark' to="/about">About Us</NavLink>
                              </MenuItem>
                              <MenuItem onClick={handleClose} disableRipple>
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
                    <a
                      className={`${style.menu_trigger} ${menuOpen ? style.active : ""
                        }`}
                      onClick={() => {
                        setMenuOpen(!menuOpen);
                        $(`.${style.header_area} .${style.nav}`).slideToggle(
                          200
                        );
                      }}
                    >
                      <span>Menu</span>
                    </a>
                  </div>

                </div>
                <div
                  className={`py-2 text-white text-center ${style.navRemove}`}
                >
                  <CitywiseDropedown CityWiseCityList={citites} />
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
                <div className="col-lg-12 px-0">
                  <div className={` ${style.search_form}`}>
                    <div className="row position-relative">

                      <div className={`col-lg-3 align-self-center`}>
                        <fieldset className={`d-flex align-items-center`}>
                          <HotelIcon className="text-danger me-2" />
                          <Dropdown
                            citites={citites ? citites : DummyArray}
                            name="cityHotel"
                            setSlectedCity={setSlectedCity}
                          />

                        </fieldset>
                      </div>

                      <div className={`col-lg-4 align-self-center`}>
                        <fieldset
                          style={{ borderRight: "2px solid red" }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <div>
                            <CalendarMonthIcon className="text-danger" />
                            <Dates />
                          </div>
                        </fieldset>
                      </div>

                      <div className={"col-lg-3 align-self-center position-relative"}>
                        <fieldset className="d-flex align-items-center justify-content-center">
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
                            {`${getTotalGuests()} Guests · ${manageRoom.length
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
                            <div className={`shadow-lg p-2 ${style.options}`}>
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
                                      <div
                                      >
                                        Rooms
                                      </div>
                                      <div
                                      >
                                        {item.room}
                                      </div>
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
                                      className={`${manageRoom.length === 7 ? style.optionTextDisable : style.optionText}`}
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
