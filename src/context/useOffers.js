import { createContext, useContext, useState } from "react";
import instance from "../store/_utils";

const OffersContext = createContext();

const OfferProvider = ({ children }) => {

  const [GetOffer, SetGetOffer] = useState(null);

  const CustomerOffers = async ({ hotelId, roomId }) => {
    try {
      const response = await instance.get(
        `/offers/get-offers/hotel?hotelid=${hotelId}&roomid=${roomId}&validFor=customer`
      );
      if (response.status === 200) {
        console.log(response.data);
        SetGetOffer(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <OffersContext.Provider value={{ GetOffer, CustomerOffers }}>
      {children}
    </OffersContext.Provider>
  );
};

export const useOffers = () => {
  return useContext(OffersContext);
};

export default OfferProvider;
