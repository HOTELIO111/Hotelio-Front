import React from "react";
import "./BookingSteps.css";
import CcavForm from "./CcavForm";
import Countdown from "react-countdown";
import BookingInfo from "./BookingInfo";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useBooking } from "../../context/useBooking";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { useCollections } from "../../context/useStateManager";
import { isMobile } from "react-device-detect";

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

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return document.getElementById('FormfillDone').click();
    } else {
      // Render a countdown
      return <Typography variant="h6" gutterBottom className="text-warning fw-bolder">Timer: {minutes}:{seconds}</Typography>;
    }
  };


  return (
    <div className="p-2">
      <Grid container spacing={2}>
        <BookingInfo />
        <Grid item sm={12} md={6} lg={8} xl={8}>
          {/* Conditionally render content based on activeTab */}
          <Grid container spacing={2} mb={2}>
            <Grid item sm={12}>
              <Box className='rounded' style={{
                border: "2px solid #ee2e24"
              }}>
                <Box
                  display={'flex'} color={'#ee2e24'} flexDirection={isMobile ? 'column' : 'row'} justifyContent={'space-between'} alignItems={'center'} p={1} className="fw-bolder">
                  <Typography fontWeight={600} variant="h5" gutterBottom>
                    {formData?.name}
                  </Typography>
                  <Typography fontWeight={600} variant="h5" gutterBottom>
                    {formData?.email}
                  </Typography>
                  <Typography fontWeight={600} variant="h5" gutterBottom>
                    {formData?.mobileNo}
                  </Typography>
                </Box>
                <Box display={'flex'} gap={isMobile ? 1 : 5} flexDirection={isMobile ? 'column' : 'row'} justifyContent={'space-between'} alignItems={'center'} p={1} >

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
                  <Countdown date={Date.now(userBookingDetails?.createdAt) + 300000}
                    renderer={renderer}
                  />
                </Box>
                <Box p={1} >
                  <Typography
                    variant="h6"
                    gutterBottom
                    className="text-danger fw-bolder"
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
                actualPricetoPay={calculate?.totalAmountToPay}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div >
  );
};

export default StepThree;
