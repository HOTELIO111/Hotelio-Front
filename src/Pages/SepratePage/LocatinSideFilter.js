import {
  Checkbox,
  FormControlLabel,
  Grid,
  Slider,
  Typography,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/userAuthContext";
import { useEffect } from "react";
import MobileDate from "../../Components/MobileComponent/MobileDate";
import { LoadingButton } from "@mui/lab";
import GlobalModal from "../../Components/Global/GlobalModal";
import { convertDatesFromUTC, convertDatesToUTC } from "../../Utilis/_fuctions";
import { useCollections } from "../../context/useStateManager";
import { useSearch } from "../../context/useSearch";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const LocatinSideFilter = ({ handleFilterChange, filter, setFilter }) => {
  const { city } = useParams();
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const { roomType, amenities, propertyType } = useAuthContext();
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchParams = Object.fromEntries(searchParams.entries());

  const { getSearchHotel } = useSearch();
  const navigate = useNavigate();

  const [selectedLocations, setSelectedLocations] = useState(
    currentSearchParams.location
  );
  const { checkInCheckOut, setCheckInCheckOut } = useCollections();

  const { placeData, selectedPlace, setSelectedPlace } = useSearch();

  const [selectedGuest, setselectedGuest] = useState(parseInt(1));
  const [selectedRoom, setselectedRoom] = useState(parseInt(1));

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
    const data = {
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

  useEffect(() => {
    if (selectedPlace) {
      console.log(placeData);
      // handleFilterChange({});
    }
  }, [selectedPlace]);

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

  const [changePlaceSearch, setChangePlaceSearch] = useState({});

  const HandlePlaceSearch = () => {
    const querySearch = {
      ...changePlaceSearch,
      ...currentSearchParams,
      checkIn: convertDatesToUTC(checkInCheckOut)[0],
      checkOut: convertDatesToUTC(checkInCheckOut)[1],
      totalRooms: selectedRoom,
      totalGuest: selectedGuest,
      sort: currentSearchParams.sort ? currentSearchParams.sort : "popularity",
    };
    const urlsearchParams = new URLSearchParams(querySearch).toString();
    navigate(`/searchedhotels?${urlsearchParams}`);
  };



  useEffect(() => {
    if (placeData) {
      setChangePlaceSearch({
        ...changePlaceSearch,
        location: placeData?.address,
        lat: placeData?.latitude,
        lng: placeData?.longitude,
      });
    }
  }, [placeData]);

  useEffect(() => {
    setSearchParams({ totalRooms: selectedRoom, totalGuest: selectedGuest });
  }, [selectedGuest, selectedRoom]);

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
          <div className="w-100">
            <GooglePlacesAutocomplete
              onLoadFailed={(error) =>
                console.error("Could not inject Google script", error)
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
                placeholder: city.replace("hotel-in-", "") || "Enter Location",
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
              {selectedGuest} Guests, {selectedRoom} Room Room
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
                    {/* &nbsp;10&nbsp; */}
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
            // onClick={() =>
            //   HandleUpdateLocationQuery(
            //     placeData?.address,
            //     checkInCheckOut[0],
            //     checkInCheckOut[1],
            //     selectedRoom,
            //     selectedGuest,
            //     placeData?.longitude,
            //     placeData?.latitude
            //   )
            // }
            onClick={HandlePlaceSearch}
            style={{ background: "#ee2e24", color: "#fff" }}
          >
            Search
          </LoadingButton>
        </div>
        <hr />
      </Grid>
      <Grid item xs={12}>
        <div className="d-flex align-items-center justify-content-between px-1">
          <h4>Filter</h4>
          <p className="text-danger" style={{ cursor: "pointer" }}>
            clear All
          </p>
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
                    checked={filter?.roomType === roomType?._id}
                    onChange={(e) => {
                      handleFilterChange(e.target.name, roomType?._id);
                    }}
                    sx={{ padding: "2px", marginLeft: "10px" }}
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
            ₹ {filter?.price?.length > 0 ? filter?.price[0] : 0} -{" "}
            {filter?.price?.length > 0 ? filter?.price[1] : 20000}+
          </span>
        </Typography>
        <Slider
          getAriaLabel={() => "Minimum distance shift"}
          value={filter?.price || [0, 20000]}
          onChange={(e, newValue) =>
            handleFilterChange("price", [newValue[0], newValue[1]])
          }
          valueLabelDisplay="auto"
          defaultValue={[0, 20000]}
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
          value={filter?.kmRadius}
          onChange={(value, newValue) =>
            handleFilterChange("kmRadius", newValue)
          }
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
                  <Radio
                    color="error"
                    name="category"
                    checked={filter?.category === item?.categoryName}
                    onChange={(e) => {
                      handleFilterChange(e.target.name, item?.categoryName);
                    }}
                    sx={{ padding: "2px", marginLeft: "10px" }}
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
                  <Radio
                    color="error"
                    name="hotelType"
                    size="small"
                    checked={filter?.hotelType === item?._id}
                    onChange={(e) =>
                      handleFilterChange(e.target.name, item?._id)
                    }
                    sx={{ padding: "2px", marginLeft: "10px" }}
                    // checked={currentSearchParams.hotelType === item?._id}
                  />
                }
                label={item?.title}
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
                    name="amenities"
                    checked={filter?.amenities?.includes(item?._id)}
                    onChange={(e) => {
                      const amenityId = item._id;
                      const currentAmenities = filter?.amenities || [];

                      const updatedAmenities = filter?.amenities?.includes(
                        amenityId
                      )
                        ? currentAmenities.filter((x) => x !== amenityId)
                        : [...currentAmenities, amenityId];

                      handleFilterChange(e.target.name, updatedAmenities);
                    }}
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
                  <Radio
                    color="error"
                    name="payment"
                    onChange={(e) => {
                      handleFilterChange(
                        e.target.name,
                        item.CheckInfeaturesName
                      );
                    }}
                    checked={filter?.payment === item.CheckInfeaturesName}
                    sx={{ padding: "2px", marginLeft: "10px" }}
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

export default LocatinSideFilter;
