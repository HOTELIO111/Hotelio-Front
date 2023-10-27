import { Button, Card, Grid, IconButton, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import HotelioLogo from '../../images/HotelioLogo.png'
import PersonIcon from "@mui/icons-material/Person";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Dropdown from '../dropdown/Dropdown';
import Dates from '../date/Date';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from '../Navbar/navbar.module.css'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/userAuthContext';

const TravelHeader = () => {

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const [citites, setCities] = useState(null);
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedCity, setSlectedCity] = useState(null);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const DummyArray = ["Your City", "Your City"];

  const { currentUser } =
    useAuthContext();

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

  return (

    <div>
      <Grid spacing={1} container sx={{ borderBottom: '2px solid #ee2e24' }}>
        <Grid item xs={12} sm={2}>
          <img onClick={() => navigate('/Travel-Partner-Home')} src={HotelioLogo} style={{ width: '150px' }} alt="Logo" />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card className={`p-2 mt-3 border ${isSmallScreen ? 'flex-column' : 'flex-row'}`}
            style={{ boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset' }}
          >
            <div className='d-flex align-items-center justify-content-between'>
              <fieldset className={`d-flex align-items-center`}>
                <HotelIcon className="text-danger me-2" />
                <Dropdown
                  citites={citites ? citites : DummyArray}
                  name="cityHotel"
                  setSlectedCity={setSlectedCity}
                />

              </fieldset>
              <fieldset
                style={{ borderRight: "2px solid red" }}
                className="d-flex align-items-center justify-content-center"
              >
                <div>
                  <CalendarMonthIcon className="text-danger" />
                  <Dates />
                </div>
              </fieldset>
              <div >
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
                    <div style={{ width: '350px' }} className={`shadow-lg p-2 ${style.options}`}>
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
                                <IconButton
                                  color='error'
                                  disabled={item.guest <= 0}
                                  onClick={() =>
                                    HandleManageRoom("d", index)
                                  }
                                >
                                  <RemoveIcon />
                                </IconButton>
                                <span
                                  className={style.optionCounterNumber}
                                >
                                  {item.guest}
                                </span>
                                <IconButton
                                  color='error'
                                  onClick={() =>
                                    HandleManageRoom("i", index)
                                  }
                                >
                                  <AddIcon />
                                </IconButton>
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
              <div>
                <fieldset>
                  <Button variant='contained' color='error'
                  >
                    <SearchIcon /> Search Now
                  </Button>
                </fieldset>
              </div>
            </div>
          </Card>
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