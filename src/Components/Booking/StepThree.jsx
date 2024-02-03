import React from "react";
import { Grid, Typography } from "@mui/material";
import "./BookingSteps.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookingInfo from "./BookingInfo";
import CcavForm from "./CcavForm";
import { useBooking } from "../../context/useBooking";
import { useAuthContext } from "../../context/userAuthContext";
import { useSelector } from "react-redux";
import { useCollections } from "../../context/useStateManager";

const StepThree = () => {

  const [searchParmas, setSearchParamas] = useSearchParams()
  const HotelData = useSelector((state) => state.GetSingleHotelReducers);
  const { data: hotelData } = HotelData || {};
  const roomId = searchParmas.get('rid')
  const roomData = hotelData?.rooms?.find((item) => item._id === roomId);
  const { BillingCalculate } = useBooking();
  const userBookingDetails = useSelector((state) => state.GetBookingRegisterReducer?.data?.message?.data);
  console.log('userBookingDetails', userBookingDetails)
  const { formData, handleFormData, setFormData } = useCollections();
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



  const navigate = useNavigate();

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
    <div className="container p-2">
      <Grid container spacing={2}>
        <BookingInfo />
        <Grid item sm={12} md={6} lg={8} xl={8}>
          {/* Conditionally render content based on activeTab */}
          <Grid container spacing={2} mb={2}>
            <Grid item sm={12}>
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
            <Grid item sm="12">
              <Typography
                variant="h5"
                gutterBottom
                className="text-danger fw-bolder"
              >
                Order ID <span style={{ fontFamily: 'fantasy', color: 'green' }}>{userBookingDetails?.bookingId}</span> has been generated, but the booking is pending. Please make the payment to confirm your booking.
                {calculate?._totalAmountToPaid?.head} &nbsp;₹ {calculate?._totalAmountToPaid?.value}
              </Typography>
            </Grid>
            <Grid item sm="12">
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
