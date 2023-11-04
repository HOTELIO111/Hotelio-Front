import { useState } from "react";
import { createContext, useContext } from "react";

const useStateManager = createContext();

const StateManagerProvider = ({ children }) => {
  const [checkInCheckOut, setCheckInCheckOut] = useState([]);
  return (
    <useStateManager.Provider value={{ checkInCheckOut, setCheckInCheckOut }}>
      {children}
    </useStateManager.Provider>
  );
};

const useCollections = () => {
  return useContext(useStateManager);
};

export { useCollections, StateManagerProvider };
