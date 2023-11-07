import {
  Checkbox,
  FormControlLabel,
  Grid,
  Slider,
  Typography,
  Radio,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/userAuthContext";
import { useEffect } from "react";
import MobileDate from "../../Components/MobileComponent/MobileDate";
import { LoadingButton } from "@mui/lab";
import GlobalModal from "../../Components/Global/GlobalModal";
import { convertDatesFromUTC, convertDatesToUTC } from "../../Utilis/_fuctions";
import { useCollections } from "../../context/useStateManager";
import { useSearch } from "../../context/useSearch";

const SideFilter = (setFilterData, filterData) => {
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const { roomType, amenities, propertyType } = useAuthContext();
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchParams = Object.fromEntries(searchParams.entries());

  const { getSearchHotel } = useSearch();

  const [geoLoc, setGeoLoc] = useState({
    longitude: currentSearchParams.lat,
    latitude: currentSearchParams.lng,
  });
  const [selectedLocations, setSelectedLocations] = useState(
    currentSearchParams.location
  );
  const { checkInCheckOut, setCheckInCheckOut } = useCollections();

  const [selectedGuest, setselectedGuest] = useState(
    parseInt(currentSearchParams.totalGuest)
  );
  const [selectedRoom, setselectedRoom] = useState(
    parseInt(currentSearchParams.totalRooms)
  );

  // update the location search query
  const HandleUpdateLocationQuery = async (
    location,
    checkIn,
    checkOut,
    totalRooms,
    totalGuests,
    lng,
    lat
  ) => {
    const data = await {
      location: location,
      checkIn: convertDatesToUTC(checkInCheckOut)[0],
      checkOut: convertDatesToUTC(checkInCheckOut)[1],
      totalRooms: totalRooms,
      totalGuest: totalGuests,
      lng: lng,
      lat: lat,
    };
    await updateSearchQuery(data);
    await getSearchHotel(searchParams);
  };
  // -------------------------- MOdal controllers-----------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //--------------------end Modal contorllers  -----------------------

  const Stylelabel = {
    fontSize: "12px",
    lineHeight: "1.4375em",
    color: "rgba(0, 0, 0, 0.6)",
    marginBottom: "-17px",
    paddingBottom: "0px",
    fontWeight: "normal",
    position: "relative",
    top: "0px",
    left: "1%",
    textAlign: "left",
  };

  // to update the query search value
  const updateSearchQuery = async ({ ...args }) => {
    const updatedSearchParams = {
      ...currentSearchParams,
      ...args,
    };
    setSearchParams(new URLSearchParams(updatedSearchParams));
  };

  // update the rest location data here

  function valuetext(value) {
    return `${value}`;
  }

  // Handle the price change
  function handlePriceChange(event, newValue) {
    setPriceRange(newValue);
    updateSearchQuery({ priceMin: newValue[0], priceMax: newValue[1] });
  }

  // handle room increament or decreament manage
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

  const categoryData = [
    {
      id: 1,
      categoryName: "Hotelio Premium",
    },
    {
      id: 2,
      categoryName: "Hotelio Home Stay",
    },
    {
      id: 3,
      categoryName: "Hotelio Budget",
    },
  ];

  const CheckInfeatures = [
    {
      id: 1,
      CheckInfeaturesName: "Pay at Hotel",
    },
    {
      id: 2,
      CheckInfeaturesName: "Online Payment",
    },
  ];

  // Km range slider

  const [kmValue, setKmValue] = React.useState(50);

  const handleKmChange = (event, newValue) => {
    setKmValue(newValue);
    updateSearchQuery({ kmRadius: newValue });
  };

  //  === handle Location update ==============
  const HandleLocationUpdate = (e) => {
    setSelectedLocations(e.target.value);
  };

  // handle the roomTypeChange
  const handleRoomTypeChange = (roomType) => {
    setSelectedRoomTypes(roomType);
  };

  const [selectedPropertyType, setSelectedPropertyType] = useState([]);

  // handle the property type onChange
  const handlePropertyType = (property) => {
    if (selectedPropertyType.includes(property)) {
      setSelectedPropertyType(
        selectedPropertyType.filter((r) => r !== property)
      );
    } else {
      setSelectedPropertyType([...selectedPropertyType, property]);
    }
  };

  // ======= Change the roomType And propertyType on query  ========
  useEffect(() => {
    if (selectedRoomTypes) {
      updateSearchQuery({ roomType: selectedRoomTypes });
    }
    if (selectedPropertyType.length > 0) {
      updateSearchQuery({ hotelType: selectedPropertyType.join(",") });
    }
  }, [selectedRoomTypes, selectedPropertyType]);

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  // ===== Show the suggetion of the location search on the input ==========
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
        setSelectedLocations(place.formatted_address);
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

  return (
    <Grid
      container
      spacing={1}
      sx={{ borderRadius: "8px" }}
      className="border ml-1 m-2 d-none d-sm-block"
    >
      <Grid item pr={1} xs={12}>
        {/* ----------------------- Locaton search input ------------------------------ */}
        <div className="d-flex align-items-center flex-column justify-content-between">
          {/* <h6 className="text-left">Locations</h6> */}
          <input
            type="text"
            ref={inputRef}
            value={selectedLocations || ""}
            onChange={HandleLocationUpdate}
          />
          <hr />
          {/* -------------------------------------------------- */}
          <MobileDate
            setCheckInCheckOut={setCheckInCheckOut}
            checkInCheckOut={checkInCheckOut}
            name={"Check-in Check-out"}
          />
          <div onClick={openModal} className="w-100">
            <label style={Stylelabel} className="labelfordatepicker">
              Rooms and guests
            </label>
            <p style={{ marginTop: "14px" }}>
              {selectedGuest} Guests, {selectedRoom} Room
            </p>
            <hr style={{ marginTop: "11px", color: "black" }} />
          </div>
          {/* ---------------------- Modal to select the room and guest ---------------------- */}
          <GlobalModal
            isOpen={isModalOpen}
            onClose={closeModal}
            height={"fit-content"}
          >
            <div className="text-center d-flex justify-content-center flex-column">
              <div className="d-flex justify-content-evenly align-items-center px-5">
                <h5>Guest</h5>
                <div className="w-100">
                  <div className="d-flex gap-2 justify-content-center">
                    <button
                      onClick={Guestdecrement}
                      className="ButtonSecondary"
                    >
                      -
                    </button>
                    &nbsp;{selectedGuest}&nbsp;
                    <button
                      onClick={Guestincrement}
                      className="ButtonSecondary"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-evenly align-items-center py-2 px-5">
                <h5>Room</h5>
                <div className="w-100">
                  <div className="d-flex gap-2 justify-content-center">
                    <button onClick={Roomdecrement} className="ButtonSecondary">
                      -
                    </button>
                    &nbsp;{selectedRoom}&nbsp;
                    <button onClick={Roomincrement} className="ButtonSecondary">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button className="ButtonPrimary" onClick={closeModal} fullWidth>
                Done
              </button>
            </div>
          </GlobalModal>
          {/* ------------------------ Global modal ends ------------------------------ */}
          <hr />
          <LoadingButton
            fullWidth
            onClick={() =>
              HandleUpdateLocationQuery(
                selectedLocations,
                checkInCheckOut[0],
                checkInCheckOut[1],
                selectedRoom,
                selectedGuest,
                geoLoc.longitude,
                geoLoc.latitude
              )
            }
            style={{ background: "#ee2e24", color: "#fff" }}
          >
            Search
          </LoadingButton>
        </div>
        <hr />
      </Grid>
      <Grid item xs={12}>
        <div className="d-flex align-items-center justify-content-between">
          <h4>Filter</h4>
          <p className="text-danger">clear All</p>
        </div>
        <hr />
      </Grid>
      <Grid item xs={12}>
        <div>
          <h5>Accommodation Types</h5>
          {roomType?.map((roomType, index) => (
            <div key={index}>
              <FormControlLabel
                control={
                  <Radio
                    color="error"
                    name="roomType"
                    size="small"
                    sx={{ padding: "2px", marginLeft: "10px" }}
                    checked={currentSearchParams.roomType === roomType._id}
                    onChange={() => handleRoomTypeChange(roomType._id)}
                  />
                }
                label={roomType.title}
              />
            </div>
          ))}
        </div>
        <hr />
      </Grid>
      <Grid item sx={{ p: 2 }} xs={12}>
        <Typography
          sx={{ display: "flex", justifyContent: "space-between" }}
          variant="caption"
          display="block"
        >
          <b>Price / night</b>{" "}
          <span className="ml-auto">
            ₹ {currentSearchParams.priceMin} - {currentSearchParams.priceMax}+
          </span>
        </Typography>
        <Slider
          getAriaLabel={() => "Minimum distance shift"}
          value={[currentSearchParams.priceMin, currentSearchParams.priceMax]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={20000}
          sx={{ color: "red" }}
          getAriaValueText={valuetext}
          disableSwap
        />
      </Grid>
      <Grid item sm={12} paddingX={1}>
        <h6>Area ( in Km )</h6>
        <Slider
          defaultValue={50}
          sx={{ color: "red" }}
          value={currentSearchParams.kmRadius}
          onChange={handleKmChange}
          aria-label="Km Slider"
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} Km`}
        />
      </Grid>
      <Grid item xs={12}>
        <div>
          <h5>Hotelio Collection</h5>
          {categoryData.map((item, index) => (
            <div key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="error"
                    sx={{ padding: "2px", marginLeft: "10px" }}
                    defaultChecked
                  />
                }
                label={item.categoryName}
              />
            </div>
          ))}
        </div>
        <hr />
      </Grid>
      <Grid item xs={12}>
        <div>
          <h5>Vacation Escapes</h5>
          {propertyType.map((item, index) => (
            <div key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="error"
                    sx={{ padding: "2px", marginLeft: "10px" }}
                    checked={currentSearchParams.hotelType
                      ?.split(",")
                      ?.includes(item.title)}
                    onChange={() => handlePropertyType(item.title)}
                  />
                }
                label={item.title}
              />
            </div>
          ))}
        </div>
        <hr />
      </Grid>
      <Grid item xs={12}>
        <div>
          <h5>In-Room Amenities</h5>
          {amenities.slice(0, 5).map((item, index) => (
            <div key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="error"
                    sx={{ padding: "2px", marginLeft: "10px" }}
                  />
                }
                label={item.title}
              />
            </div>
          ))}
        </div>
        <hr />
      </Grid>
      <Grid item xs={12}>
        <div>
          <h5>Payment Methods</h5>
          {CheckInfeatures.map((item, index) => (
            <div key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="error"
                    sx={{ padding: "2px", marginLeft: "10px" }}
                    defaultChecked
                  />
                }
                label={item.CheckInfeaturesName}
              />
            </div>
          ))}
        </div>
        <hr />
      </Grid>
    </Grid>
  );
};

export default SideFilter;
