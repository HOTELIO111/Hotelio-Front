import { useState } from "react";
import { createContext, useContext } from "react";

const useStateManager = createContext();

const StateManagerProvider = ({ children }) => {
  const [checkInCheckOut, setCheckInCheckOut] = useState([]);

  // Get the addressInfo from google

  const GetPlaceInfo = async (place) => {
    try {
      const placeInfo = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=AIzaSyD_kgE_S3Nwf1IAamPa6D6ZyyazleBTrhI`
      );

      if (placeInfo.status === 200) {
        console.log(placeInfo.data?.results[0]?.geometry?.locaton);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <useStateManager.Provider value={{ checkInCheckOut, setCheckInCheckOut ,GetPlaceInfo}}>
      {children}
    </useStateManager.Provider>
  );
};

const useCollections = () => {
  return useContext(useStateManager);
};

export { useCollections, StateManagerProvider };
