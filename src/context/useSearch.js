import { createContext, useContext } from "react";
import { API_URL } from "../config";
import { useState } from "react";
import axios from "axios";

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
  return (
    <searchContext.Provider value={{ hotels, setHotels, getSearchHotel }}>
      {children}
    </searchContext.Provider>
  );
};

const useSearch = () => {
  return useContext(searchContext);
};

export { SearchProvider, useSearch };
