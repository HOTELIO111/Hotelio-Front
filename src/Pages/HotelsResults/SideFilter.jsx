import {
  Checkbox,
  FormControlLabel,
  Grid,
  Slider,
  Typography,
  Autocomplete,
  TextField,
  Radio,
} from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/userAuthContext";
import { useSearch } from "../../context/useSearch";
import { useEffect } from "react";

const SideFilter = (setFilterData, filterData) => {
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedGuestRatings, setSelectedGuestRatings] = useState([]);
  const { facilities, roomType, amenities, propertyType } = useAuthContext();
  const { hotels, setHotels, getSearchHotel } = useSearch();
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchParams = Object.fromEntries(searchParams.entries());

  // to update the query search value
  const updateSearchQuery = async ({ ...args }) => {
    const updatedSearchParams = {
      ...currentSearchParams,
      ...args,
    };
    setSearchParams(new URLSearchParams(updatedSearchParams));
  };

  function valuetext(value) {
    return `${value}`;
  }

  function handlePriceChange(event, newValue) {
    setPriceRange(newValue);
    updateSearchQuery({ priceMin: newValue[0], priceMax: newValue[1] });
  }

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

  const HotelFacilities = [
    {
      id: 1,
      HotelFacilitiesName: "Room Heater",
    },
    {
      id: 2,
      HotelFacilitiesName: "Geyser",
    },
    {
      id: 3,
      HotelFacilitiesName: "Seating area",
    },
    {
      id: 4,
      HotelFacilitiesName: "King Sized Bed",
    },
    {
      id: 5,
      HotelFacilitiesName: "TV",
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

  const locations = ["Mumbai", "Delhi", "Gaziabad"];

  const guestRatings = [
    { key: "1", value: "Ok" },
    { key: "2", value: "Fair" },
    { key: "3", value: "Good" },
    { key: "4", value: "Very Good" },
    { key: "5", value: "Excellent" },
  ];

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
    setSelectedRoomTypes(roomType);
  };

  const [selectedPropertyType, setSelectedPropertyType] = useState([]);

  const handlePropertyType = (property) => {
    if (selectedPropertyType.includes(property)) {
      setSelectedPropertyType(
        selectedPropertyType.filter((r) => r !== property)
      );
    } else {
      setSelectedPropertyType([...selectedPropertyType, property]);
    }
  };

  useEffect(() => {
    if (selectedRoomTypes) {
      updateSearchQuery({ roomType: selectedRoomTypes });
    }
    if (selectedPropertyType.length > 0) {
      updateSearchQuery({ hotelType: selectedPropertyType.join(",") });
    }
  }, [selectedRoomTypes, selectedPropertyType]);

  // useEffect(() => {}, [selectedGuestRatings]);

  return (
    <Grid
      container
      spacing={1}
      sx={{ borderRadius: '8px' }}
      className="border p-2 ml-1 m-2 d-none d-sm-block"
    >
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
          getAriaValueText={valuetext}
          disableSwap
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
