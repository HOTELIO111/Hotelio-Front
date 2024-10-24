import axios from "axios";
import { useContext } from "react";
import { createContext } from "react";
import { API_URL, RAZORPAY_KEY_ID } from "../config";
import { useState } from "react";
import { totalLengthOfStay } from "../Utilis/_fuctions";
import instance from "../store/_utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [BookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();

  const CreateBooking = async (formData) => {
    try {
      const response = await instance.post(
        "/hotel/book/create/pre-booking",
        formData
      );
      if (response.status === 200) {
        setBookingDetails(response.data.data);
        return { error: false, status: 200 };
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { error: true, status: 404 };
      } else {
        return { error: true, message: error.message };
      }
    }
  };

  const [coupon, setCoupon] = useState();
  const [Gst, setGst] = useState(18);
  const [userBookingDetails, setUserBookingDetails] = useState({});
  const [finalBookingData, setFinalBookingData] = useState({});

  const calculateAmount = (
    amount,
    coupon,
    totalrooms,
    gst,
    checkIn,
    checkOut,
    customer
  ) => {
    const totalDays = totalLengthOfStay(checkIn, checkOut);
    const couponAmount =
      coupon || Math.floor(Math.random() * (50 - 30 + 1)) + 30;
    const totalRooms = totalrooms || 1;
    const applyGst = gst || 18;
    const roomPrice = amount;
    let final_amount;

    // calculation
    const total = totalRooms * roomPrice * totalDays;
    const priceWithGst = +(total * ((100 + applyGst) / 100)).toFixed(2);
    const _withPromocode = +(priceWithGst * (couponAmount / 100)).toFixed(2);
    const customerWalletAmount = customer?.wallet?.amount || 0; // Fix: Ensure customer?.wallet?.amount is defined

    if (customerWalletAmount <= 100) {
      final_amount = +(_withPromocode - 100).toFixed(2);
    } else {
      final_amount = +_withPromocode.toFixed(2);
    }

    const report = {
      numberOfRooms: totalRooms, // Fix: Corrected typo in property name
      gstApplied: applyGst,
      net_amount: total,
      priceWithGst: priceWithGst,
      _withPromocode,
      roomAmount: roomPrice,
      _promocode_percent: `${couponAmount}%`,
      promocodeDiscount: +(priceWithGst - _withPromocode).toFixed(2),
      totalDay: totalDays,
      perDayFinalPrice: +(_withPromocode / totalDays).toFixed(2),
      wallet_deduction: customerWalletAmount >= 100 ? 100 : 0,
      final_amount,
    };
    return report;
  };
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

  const openRazorPay = async () => {
    let amount = BookingDetails?.totalAmount;
    // console.log(BookingDetails.totalAmount);
    const response = await instance.post("/razorpay/create-order", { amount });
    const { data } = await response.data;
    // console.log("data", data);

    const options = {
      key: RAZORPAY_KEY_ID,
      currency: data.currency,
      name: "Hotelio",
      description: "Booking Room",
      image: "../images/HotelioLogo.png",
      order_id: data.id,
      handler: async function (response) {
        // mandatory data for booking validation because the ccavenue returns this data as well, so I add this dummy data to not break the code. I am filling the data which I can fill, and the rest of the data is dummy data.
        let mandetoryData = {
          order_id: BookingDetails?.bookingId,
          tracking_id: "123456",
          bank_ref_no: "123456",
          order_status: "Pending",
          failure_message: "",
          payment_mode: "Razorpay",
          card_name: "Visa",
          status_code: "0",
          status_message: "Pending",
          currency: "INR",
          amount: BookingDetails?.amount,
          billing_name: BookingDetails?.guest?.name,
          billing_address: "",
          billing_city: "",
          billing_state: "",
          billing_zip: "",
          billing_country: "",
          billing_tel: BookingDetails?.guest?.mobileNo,
          billing_email: BookingDetails?.guest?.email,
          trans_date: "",
          offer_type: BookingDetails?.discountInfo[0]?._id,
          offer_code: BookingDetails?.discountInfo[0]?.name,
          discount_value: BookingDetails?.discountInfo[0]?.amount,
          mer_amount: BookingDetails?.amount,
          eci_value: "",
          retry: "",
          bin_country: "",
        };
        response = { ...response, ...mandetoryData };
        let res = await instance.post("/razorpay/verify-payment", response);
        if (res.status === 200) {
          navigate("/Transaction_Status");
        }
      },
      prefill: {
        name: BookingDetails?.guest?.name,
        email: BookingDetails?.guest?.email,
        contact: BookingDetails?.guest?.mobileNo,
      },
      notes: {
        address: "Hotelio",
      },
      theme: {
        color: "#F37254",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const CreatePreBooking = async (formData) => {
    try {
      const response = await instance.post(
        "/hotel/book/create/pre-booking",
        formData
      );
      debugger;
      console.log(response);
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
        calculateAmount,
        BillingCalculate,
        CreatePreBooking,
        openRazorPay,
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
