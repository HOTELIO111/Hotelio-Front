import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import "./BookingSteps.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookingInfo from "./BookingInfo";
import CcavForm from "./CcavForm";
import { useBooking } from "../../context/useBooking";
import { useAuthContext } from "../../context/userAuthContext";
import { useSelector } from "react-redux";
import { useCollections } from "../../context/useStateManager";
import moment from "moment/moment";

const StepThree = () => {

  const [searchParmas, setSearchParamas] = useSearchParams()
  const HotelData = useSelector((state) => state.GetSingleHotelReducers);
  const { data: hotelData } = HotelData || {};
  const roomId = searchParmas.get('rid')
  const roomData = hotelData?.rooms?.find((item) => item._id === roomId);
  const { BillingCalculate, BookingDetails } = useBooking();
  const userBookingDetails = BookingDetails;
  // const userBookingDetails = useSelector((state) => state.GetBookingRegisterReducer?.data?.message?.data);
  const { formData } = useCollections();
  const searchQuery = new URLSearchParams(document.location.search);
  const { currentUser } = useAuthContext();
  const currentSearchParam = Object.fromEntries(searchQuery?.entries());
  const navigate = useNavigate();
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
  console.log(formData)
  const [timeRemaining, setTimeRemaining] = useState(moment.duration(10, "minutes"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Decrease the remaining time by 1 second
      setTimeRemaining((prevTime) => moment.duration(prevTime - 1000));

      // Check if the timer has reached zero
      if (timeRemaining <= 0) {
        clearInterval(intervalId);
        // Perform any action when the timer reaches zero
        console.log("Timer reached zero!");
        navigate('/YourBooking')
      }
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  const formattedTime = moment.utc(timeRemaining.asMilliseconds()).format("mm:ss");

  const calculate = BillingCalculate(
    priceOfaRoom,
    null,
    qunatityRooms,
    12,
    checkIn,
    checkOut,
    currentUser
  );


  return (
    <div className="p-2">
      <Grid container spacing={2}>
        <BookingInfo />
        <Grid item sm={12} md={6} lg={8} xl={8}>
          {/* Conditionally render content based on activeTab */}
          <Grid container spacing={2} mb={2}>
            <Grid item sm={12}>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}
                style={{ border: "2px solid #ee2e24", background: 'linear-gradient(338deg, rgba(243,200,198,1) 35%, rgba(255,255,255,1) 100%)' }}
                className="px-2 fw-bolder rounded"
              >
                <Typography variant="h5" gutterBottom>
                  {formData?.name}
                </Typography>
                <Typography variant="p" gutterBottom>
                  {formData?.email}
                </Typography>
                <Typography variant="p" gutterBottom>
                  {formData?.mobileNo}
                </Typography>
              </Box>
            </Grid>
            <Grid item sm="12">
              <Typography
                variant="h5"
                gutterBottom
                className="text-danger fw-bolder"
              >
                Order ID <span style={{ fontFamily: 'sans-serif', color: '#74E291' }}> {userBookingDetails?.bookingId} </span> has been generated, but the booking is pending. Please make the payment to confirm your booking.
              </Typography>

              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} >

                <Typography
                  variant="h5"
                  gutterBottom
                  className="text-danger fw-bolder"
                >
                  {calculate?._totalAmountToPaid?.head} &nbsp;₹ {calculate?._totalAmountToPaid?.value}
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  className="text-warning fw-bolder"
                >
                  Timer: {formattedTime}
                </Typography>
              </Box>

            </Grid>
            <Grid item sm="12" >
              <CcavForm
                BOOKINGDATA={userBookingDetails}
                BILL={BillingCalculate}
                roomData={roomData}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default StepThree;
