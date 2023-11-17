import { createContext, useContext, useEffect } from "react";
import { API_URL } from "../config";
import { useState } from "react";
import axios from "axios";
import { geocodeByAddress } from "react-google-places-autocomplete";

const searchContext = createContext();

const SearchProvider = ({ children }) => {
  const [hotels, setHotels] = useState(null);

  const getSearchHotel = async (params) => {
    try {
      const response = await axios.get(`${API_URL}/hotel/search?${params}`);
      if (response.status === 200) {
        setHotels(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeData, setPlaceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedPlace !== null) {
          const result = await geocodeByAddress(selectedPlace?.label);
          console.log(result);

          const { lat, lng } = result[0].geometry.location;
          const latitude = lat();
          const longitude = lng();

          setPlaceData({
            ...placeData,
            latitude,
            longitude,
            address: selectedPlace?.label,
          });

          console.log(placeData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedPlace]);

  return (
    <searchContext.Provider
      value={{
        hotels,
        setHotels,
        getSearchHotel,
        selectedPlace,
        setSelectedPlace,
        placeData,
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
