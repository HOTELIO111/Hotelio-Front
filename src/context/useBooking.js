import axios from "axios";
import { useContext } from "react";
import { createContext } from "react";
import { API_URL } from "../config";
import { useState } from "react";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [BookingDetails, setBookingDetails] = useState(null);

  const CreateBooking = async (formData) => {
    try {
      const response = await axios.post(
        API_URL + "/hotel/book/create",
        formData
      );
      if (response.status === 200) {
        setBookingDetails(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BookingContext.Provider
      value={{ CreateBooking, BookingDetails, setBookingDetails }}
    >
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => {
  return useContext(BookingContext);
};

export { BookingProvider, useBooking };
