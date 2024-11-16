import { createContext, useContext, useEffect } from "react";
import { API_URL } from "../config";
import { useState } from "react";
import axios from "axios";
import { geocodeByAddress } from "react-google-places-autocomplete";
import instance from "../store/_utils";

const searchContext = createContext();

const SearchProvider = ({ children }) => {
  const [hotels, setHotels] = useState(null);

  const getSearchHotel = async (params) => {
    try {
      const response = await axios.get(
        `${API_URL}/hotel/search/hotels?${params}`
      );
      if (response.status === 200) {
        setHotels(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeData, setPlaceData] = useState(null);

  const getLattitudeAndLongitude = async (address) => {
    try {
      if (address === null) throw new Error("Address is null");
      const result = await geocodeByAddress(address);
      const { lat, lng } = result[0].geometry.location;
      const latitude = lat();
      const longitude = lng();
      return { latitude, longitude };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedPlace !== null) {
          const { latitude, longitude } = await getLattitudeAndLongitude(
            selectedPlace?.label
          );

          setPlaceData({
            ...placeData,
            latitude,
            longitude,
            address: selectedPlace?.label,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedPlace]);

  const GetLocationData = async (endpoint, filter, currentSearchParams) => {
    let newFilter = {};

    if (filter !== null) {
      if (filter.price && filter?.price[0] !== null) {
        newFilter.priceMin = filter?.price[0];
      }

      if (filter.price && filter?.price[1] !== null) {
        newFilter.priceMax = filter?.price[1];
      }

      if (filter.roomType !== undefined) {
        newFilter.roomType = filter?.roomType;
      }

      if (filter.hotelType !== undefined) {
        newFilter.hotelType = filter?.hotelType;
      }

      if (filter.amenities && filter.amenities.length > 0) {
        newFilter.amenities = filter?.amenities.join(",");
      }

      if (filter?.payment !== undefined) {
        newFilter.payment = filter?.payment === "Pay at Hotel" ? true : false;
      }
    }

    let urlParams = {
      page: currentSearchParams?.page ? currentSearchParams?.page : 1,
      priceMin: currentSearchParams?.priceMin
        ? currentSearchParams?.priceMin
        : 0,
      priceMax: currentSearchParams?.priceMax
        ? currentSearchParams?.priceMax
        : 20000,
      pageSize: 20,
      endpoint: endpoint,
      sort: currentSearchParams?.sort
        ? currentSearchParams?.sort
        : "popularity",
      ...(currentSearchParams ? currentSearchParams : {}),
    };

    const searchParams = new URLSearchParams(urlParams).toString();

    try {
      const response = await instance.get(`/hotel/search-loc?${searchParams}`);

      if (response.status === 200) {
        return { error: false, data: response?.data?.data, url: endpoint };
      }
    } catch (error) {
      console.error(error);
      return { error: true, message: error.message };
    }
  };

  return (
    <searchContext.Provider
      value={{
        hotels,
        setHotels,
        getSearchHotel,
        selectedPlace,
        setSelectedPlace,
        placeData,
        GetLocationData,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

const useSearch = () => {
  return useContext(searchContext);
};

export { SearchProvider, useSearch };
