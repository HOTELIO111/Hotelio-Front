import { createContext, useContext } from "react";

const OffersContext = createContext();

const OfferProvider = ({ children }) => {
  <OffersContext.Provider>{children}</OffersContext.Provider>;
};

export const useOffers = () => {
  return useContext(OffersContext);
};

export default OfferProvider;
