import axios from "axios";
import { useContext } from "react";
import { createContext } from "react";
import { API_URL } from "../config";
import { useState } from "react";
import { totalLengthOfStay } from "../Utilis/_fuctions";
import instance from "../store/_utils";

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

  const [coupon, setCoupon] = useState();
  const [Gst, setGst] = useState("18");
  const [userBookingDetails, setUserBookingDetails] = useState({});
  const [finalBookingData, setFinalBookingData] = useState({});


  const BillingCalculate = (
    amount,
    coupon,
    totalrooms,
    gst,
    checkIn,
    checkOut,
    customer
  ) => {
    const CouponName = "WELCOME25";
    const totalDays = totalLengthOfStay(checkIn, checkOut);
    const basePrice = amount * totalDays * totalrooms;
    const walletAmount = customer?.wallet?.amount >= 100 ? 100 : 0;
    const serviceFee = 80;
    const offerAmount =
      CouponName === "WELCOME25"
        ? (basePrice * 25) / 100
        : (basePrice * 0) / 100;
    const priceAfterDiscount = basePrice - (walletAmount + offerAmount);
    const gstAmount = (priceAfterDiscount * gst) / 100;
    const totalAmountToPaid = priceAfterDiscount + serviceFee + gstAmount;

    // Function to format numbers to two decimal places
    const formatNumber = (num) => parseFloat(num.toFixed(2));

    // coupon
    const _basePrice = {
      head: `Base Price (${totalrooms} room x ${totalDays} night)`,
      value: formatNumber(basePrice),
    };
    const _totalDiscount = {
      head: "Total Discount",
      value: formatNumber(walletAmount + offerAmount),
      sub: [
        { head: "Wallet", value: formatNumber(walletAmount) },
        { head: CouponName, value: formatNumber(offerAmount) },
      ],
    };
    const _priceAfterDiscount = {
      head: "Price after Discount",
      value: formatNumber(priceAfterDiscount),
    };
    const _taxesAndServiceFee = {
      head: "Taxes & Service Fees",
      value: formatNumber(serviceFee + gstAmount),
      sub: [
        { head: "Hotel GST", value: formatNumber(gstAmount) },
        { head: "Service Fees", value: formatNumber(serviceFee) },
      ],
    };

    const _totalAmountToPaid = {
      head: "Total Amount to be paid",
      value: formatNumber(totalAmountToPaid),
    };

    return {
      CouponName,
      totalDays,
      totalrooms,
      amount,
      basePrice: formatNumber(basePrice),
      walletAmount: formatNumber(walletAmount),
      serviceFee,
      priceAfterDiscount: formatNumber(priceAfterDiscount),
      gstAmount: formatNumber(gstAmount),
      totalAmountToPaid: formatNumber(totalAmountToPaid),
      offerAmount: formatNumber(offerAmount),
      _basePrice,
      _totalDiscount,
      _priceAfterDiscount,
      _taxesAndServiceFee,
      _totalAmountToPaid,
    };
  };

  const GenerateBookingId = async () => {
    try {
      const response = await instance.get("/hotel/book/booking/generate");
      if (response.status === 200) {
        console.log(response.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CreatePreBooking = async (formData) => {
    try {
      const response = await instance.post(
        "/hotel/book/create/pre-booking",
        formData
      );
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };




  return (
    <BookingContext.Provider
      value={{
        coupon,
        setCoupon,
        userBookingDetails,
        setUserBookingDetails,
        finalBookingData,
        setFinalBookingData,
        Gst,
        setGst,
        CreateBooking,
        BookingDetails,
        setBookingDetails,
        GenerateBookingId,

        BillingCalculate,
        CreatePreBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => {
  return useContext(BookingContext);
};

export { BookingProvider, useBooking };

// calculateAmount(
//   priceOfaRoom,
//   null,
//   qunatityRooms,
//   18,
//   checkIn,
//   checkOut,
//   currentUser
// );

{
  /* {console.log(
            numberOfRooms,
            gstApplied,
            priceWithGst,
            _withPromocode,
            roomAmount,
            net_amount,
            promocodeDiscount,
            totalDay,
            _promocode_percent,
            perDayFinalPrice,
            wallet_deduction,
            final_amount
          )} */
}

// CouponName,
// totalDays,
// basePrice,
// walletAmount,
// serviceFee,
// priceAfterDiscount,
// gstAmount,
// totalAmountToPaid,
// offerAmount,
// _basePrice,
// _totalDiscount,
// _priceAfterDiscount,
// _taxesAndServiceFee,
// _totalAmountToPaid,
