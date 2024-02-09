import React, { useEffect, useState } from "react";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import "./BookingSteps.css";
import { useSearchParams } from "react-router-dom";
import BookingInfo from "./BookingInfo";
import CcavForm from "./CcavForm";
import { useBooking } from "../../context/useBooking";
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
  const calculate = useSelector((state) => state.GetHotelBillCalculationReducers?.data?.data);
  const { formData } = useCollections();
  // Calculate the total night stay
  const totalLengthOfStay = (checkIn, checkOut) => {
    const newCheckIn = new Date(checkIn);
    const newCheckOut = new Date(checkOut);
    const timeDifference = newCheckOut.getTime() - newCheckIn.getTime();
    const totalDays = timeDifference / (1000 * 3600 * 24);
    return totalDays;
  };
  //   credentials
  // credentials ----------------------------
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
        // navigate('/YourBooking')
      }
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  const formattedTime = moment.utc(timeRemaining.asMilliseconds()).format("mm:ss");

  return (
    <div className="p-2">
      <Grid container spacing={2}>
        <BookingInfo />
        <Grid item sm={12} md={6} lg={8} xl={8}>
          {/* Conditionally render content based on activeTab */}
          <Grid container spacing={2} mb={2}>
            <Grid item sm={12}>
              <Box className='rounded' style={{
                border: "2px solid #ee2e24",
                background: 'linear-gradient(338deg, rgba(243,200,198,1) 35%, rgba(255,255,255,1) 100%)'
              }}>
                <Box
                  style={{
                    webkitTextStroke: ' 1px #ee2e24',
                    webkitTextFillColor: 'white'
                  }}
                  display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={1} className="fw-bolder">
                  <Typography textTransform={'uppercase'} variant="h5" gutterBottom>
                    {formData?.name}
                  </Typography>
                  <Typography textTransform={'uppercase'} variant="h5" gutterBottom>
                    {formData?.email}
                  </Typography>
                  <Typography textTransform={'uppercase'} variant="h5" gutterBottom>
                    {formData?.mobileNo}
                  </Typography>
                </Box>
                <Box display={'flex'} gap={5} justifyContent={'space-between'} alignItems={'center'} p={1} >

                  <Typography
                    variant="h6"
                    gutterBottom
                    className="text-danger fw-bolder"
                  >
                    Total Amount to be Paid - ₹ {calculate?.totalAmountToPay}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    textTransform={'uppercase'}
                    className="text-warning fw-bolder"
                  >
                    {userBookingDetails?.bookingStatus}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className="text-warning fw-bolder"
                  >
                    Timer: {formattedTime}
                  </Typography>
                </Box>
                <Box p={1} >
                  <Typography
                    variant="h6"
                    gutterBottom
                    className="text-danger fw-bolder text-center"
                  >
                    Order ID <Tooltip title="Your Order Id"> <span style={{ fontFamily: 'sans-serif', color: '#74E291', textDecoration: 'underline' }}> {userBookingDetails?.bookingId}</span></Tooltip> has been generated, but the booking is pending. Please make the payment to confirm your booking.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item sm="12" >
              <CcavForm
                BOOKINGDATA={userBookingDetails}
                BILL={BillingCalculate}
                roomData={roomData}
                DATAA={formData}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div >
  );
};

export default StepThree;
