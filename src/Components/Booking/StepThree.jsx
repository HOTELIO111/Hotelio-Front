import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import OrderSucessfully from "../../images/OrderSucessfully.gif";
import "./BookingSteps.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import BookingInfo from "./BookingInfo";
import { calculateThePrice } from "../../Utilis/_fuctions";
import CcavForm from "./CcavForm";
import { useBooking } from "../../context/useBooking";
import { useAuthContext } from "../../context/userAuthContext";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const StepThree = ({ formData }) => {
  const {
    coupon,
    setCoupon,
    userBookingDetails,
    setUserBookingDetails,
    finalBookingData,
    setFinalBookingData,
    Gst,
    setGst,
    calculateAmount,
    BillingCalculate,
  } = useBooking();
  const location = useLocation()

  const decoded = decodeURIComponent(location.search);

  const roomId = new URLSearchParams(decoded).get("rid");
  const HotelData = useSelector((state) => state.GetSingleHotelReducers)

  const hotelData = HotelData?.data
  const roomData = HotelData?.data?.rooms?.find((item) => item._id === roomId)


  const searchQuery = new URLSearchParams(document.location.search);
  const { currentUser } = useAuthContext();

  const currentSearchParam = Object.fromEntries(searchQuery?.entries());
  // Calculate the total night stay
  const totalLengthOfStay = (checkIn, checkOut) => {
    const newCheckIn = new Date(checkIn);
    const newCheckOut = new Date(checkOut);
    const timeDifference = newCheckOut.getTime() - newCheckIn.getTime();
    const totalDays = timeDifference / (1000 * 3600 * 24);
    return totalDays;
  };
  //   credentials
  const checkIn = currentSearchParam.checkIn;
  const checkOut = currentSearchParam.checkOut;
  const qunatityRooms = currentSearchParam.totalRooms;
  const totalGuest = currentSearchParam.totalGuest;
  const priceOfaRoom = roomData?.price;
  const totalDays = totalLengthOfStay(checkIn, checkOut);
  // const currentDate = new Date.now();
  // credentials ----------------------------

  const [activeTab, setActiveTab] = useState(null); // Initialize the active tab state
  const [loading, setLoading] = useState(false)

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const navigate = useNavigate();

  const makePayment = async () => {
    navigate("/ccav");
  };

  // Confirm The booking
  const GetBookingData = (
    payment,
    formData,
    customerid,
    checkIn,
    checkOut,
    numberOfGuests,
    roomId,
    numberOfrooms,
    hotelId,
    amount,
    specialRequests,
    promoCode,
    discountAmount,
    bookingSource,
    additonalCharges
  ) => {
    return {
      room: roomId,
      numberOfRoom: numberOfrooms,
      hotel: hotelId,
      guest: {
        name: formData?.name,
        email: formData?.email,
        phoneNumber: formData?.mobileNo,
      },
      bookingDate: {
        checkIn: checkIn,
        checkOut: checkOut,
      },
      amount: amount,
      dateOfBooking: Date.now(),
      payment: {
        status: "success",
        method: "card",
        transactionID: payment?.id,
        confirmationNumber: "C543210",
        date: "2023-10-16T11:30:00.000Z",
      },
      specialRequests: specialRequests,
      additionalCharges: additonalCharges,
      promoCode: promoCode,
      discountAmount: discountAmount,
      numberOfGuests: {
        adults: numberOfGuests,
      },
      numberOfRooms: numberOfrooms,
      bookingSource: "website",
      customer: customerid,
    };
    // const session = await response.json();
    // const result = stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });
    // setPaymentDetails(result);
    // if (result.error) {
    //   console.log(result.error);
    // }
  };

  const calculate = BillingCalculate(
    priceOfaRoom,
    null,
    qunatityRooms,
    12,
    checkIn,
    checkOut,
    currentUser
  );



  useEffect(() => {
    const delay = 10000; // Set the delay in milliseconds

    const timeoutId = setTimeout(() => {
      // Set the state to indicate that the delay has elapsed
      setLoading(true);
    }, delay);

    // Cleanup function to clear the timeout in case the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // Conditionally render component A or B based on the delayElapsed state
  const renderContent = () => {
    if (loading) {
      return <CcavForm
        BOOKINGDATA={userBookingDetails}
        BILL={BillingCalculate}
        roomData={roomData}
      />;
    } else {
      return <Grid container>
        <Grid item xs={4}>
          <Skeleton
            width="100%"
            height={40}
            duration={2}
            style={{ backgroundColor: "#ddd" }}
          />
        </Grid>
        <Grid item xs={8}>
          <Skeleton
            width="100%"
            height={40}
            duration={2}
            style={{ backgroundColor: "#ddd" }}
          />
        </Grid>
        <Grid item xs={4}>
          <Skeleton
            width="100%"
            height={40}
            duration={2}
            style={{ backgroundColor: "#ddd" }}
          />
        </Grid>
        <Grid item xs={8}>
          <Skeleton
            width="100%"
            height={40}
            duration={2}
            style={{ backgroundColor: "#ddd" }}
          />
        </Grid>
        <Grid item xs={4}>
          <Skeleton
            width="100%"
            height={40}
            duration={2}
            style={{ backgroundColor: "#ddd" }}
          />
        </Grid>
        <Grid item xs={8}>
          <Skeleton
            width="100%"
            height={40}
            duration={2}
            style={{ backgroundColor: "#ddd" }}
          />
        </Grid>
      </Grid>;
    }
  };


  return (
    <div className="container p-2">
      <Grid container spacing={2}>
        <BookingInfo
          currentSearchParam={currentSearchParam}
          hotelData={hotelData}
          roomData={roomData}
        />
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
          {/* Conditionally render content based on activeTab */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs="12">
              <div
                style={{ border: "2px solid #ee2e24" }}
                className="d-flex justify-content-between align-items-center p-2 rounded"
              >
                <Typography variant="h6" gutterBottom>
                  {formData?.name}
                </Typography>
                <Typography variant="p" gutterBottom>
                  {formData?.email}
                </Typography>
                <Typography variant="p" gutterBottom>
                  {formData?.mobileNo}
                </Typography>
              </div>
            </Grid>
            <Grid item xs="12">
              <Typography
                variant="h5"
                gutterBottom
                className="text-danger fw-bolder"
              >
                {calculate?._totalAmountToPaid?.head} &nbsp;&nbsp; ₹
                {calculate?._totalAmountToPaid?.value}
              </Typography>
            </Grid>
            <Grid item xs="12">
              <div
                style={{ border: "2px solid #ee2e24" }}
                className="rounded p-2"
              >
                <Typography variant="h5" fontWeight={800}>
                  Choose payment method to pay
                </Typography>
                {hotelData?.isPostpaidAllowed && (
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleTabChange("payAtHotel")}
                  >
                    Pay at Hotel
                  </Button>
                )}

                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  sx={{ m: 1 }}
                  onClick={() => handleTabChange("partPayment")}
                >
                  Pay &emsp;
                  <span style={{ color: "#ff0" }}>
                    ₹
                    {((calculate._totalAmountToPaid?.value * 60) / 100).toFixed(
                      2
                    )}
                  </span>
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleTabChange("payOnline")}
                >
                  Pay Online &emsp;
                  <span style={{ color: "#ff0" }}>
                    ₹{calculate._totalAmountToPaid?.value}
                  </span>
                </Button>
              </div>
            </Grid>
          </Grid>

          {activeTab === "payAtHotel" && (
            <div style={{ background: "#eeeeeb" }} className="text-center">
              <img
                style={{ width: "200px" }}
                src={OrderSucessfully}
                alt="OrderSucessfully"
              />
              <Typography variant="h6" gutterBottom>
                Your hotel room booking has been successfully confirmed. Please
                check your registered email or mobile number for further
                details. If you require assistance, please contact our customer
                care.
              </Typography>
            </div>
          )}

          {activeTab === 'payOnline' &&
            renderContent()
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default StepThree;
