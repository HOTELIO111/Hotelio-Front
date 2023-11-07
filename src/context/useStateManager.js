import axios from "axios";
import { useState } from "react";
import { createContext, useContext } from "react";
import instance from "../store/_utils";

const useStateManager = createContext();

const StateManagerProvider = ({ children }) => {
  const [checkInCheckOut, setCheckInCheckOut] = useState([]);

  // Get the addressInfo from google

  const GetPlaceInfo = async (place) => {
    try {
      const response = await instance.get(
        `/google/get-location?place=${place}`
      );
      if (response.status === 200) {
        const GeometryLocation =
          response.data?.data?.results[0].geometry?.location;
        const LocationName = response.data.data?.results[0]?.formatted_address;
        console.log(response.data.data);
        return {
          geometry: GeometryLocation,
          location: LocationName,
          data: response.data,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityClick = async (city) => {
    const checkIn = new Date();
    const checkOut = new Date(checkIn.getTime() + 24 * 60 * 60 * 1000);
    const { geometry, location, data } = await GetPlaceInfo(city);

    // Construct the search data
    const searchData = {
      location: location,
      lng: geometry?.lng,
      lat: geometry?.lat,
      totalRooms: 1,
      totalGuest: 1,
      checkIn: checkIn.toUTCString(),
      checkOut: checkOut.toUTCString(),
      kmRadius: 20,
      priceMin: 400,
      priceMax: 20000,
      sort: "popularity",
    };

    // Construct the URL with query parameters
    const queryParams = new URLSearchParams(searchData);
    const targetURL = `/searchedhotels?${queryParams.toString()}`;

    window.location.href = targetURL;
  };

  return (
    <useStateManager.Provider
      value={{
        checkInCheckOut,
        setCheckInCheckOut,
        GetPlaceInfo,
        handleCityClick,
      }}
    >
      {children}
    </useStateManager.Provider>
  );
};

const useCollections = () => {
  return useContext(useStateManager);
};

export { useCollections, StateManagerProvider };
