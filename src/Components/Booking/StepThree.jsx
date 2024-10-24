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
import { Button } from "@material-ui/core";

const StepThree = () => {
  const [searchParmas] = useSearchParams();
  const { openRazorPay } = useBooking();
  const HotelData = useSelector((state) => state.GetSingleHotelReducers);
  const { data: hotelData } = HotelData || {};
  const roomId = searchParmas.get("rid");
  const roomData = hotelData?.rooms?.find((item) => item._id === roomId);
  const { BillingCalculate, BookingDetails } = useBooking();
  const userBookingDetails = BookingDetails;
  const calculate = useSelector(
    (state) => state.GetHotelBillCalculationReducers?.data?.data
  );
  const [isPaying, setIsPaying] = React.useState(false);
  const { formData } = useCollections();

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return document.getElementById("FormfillDone").click();
    } else {
      // Render a countdown
      return (
        <Typography
          variant="h6"
          gutterBottom
          className="text-warning fw-bolder"
        >
          Timer: {minutes}:{seconds}
        </Typography>
      );
    }
  };

  return (
    <div className="step3container">
      <BookingInfo />
      <Grid
        item
        sm={12}
        md={6}
        lg={8}
        xl={8}
        display={isPaying ? "none" : "block"}
      >
        {/* Conditionally render content based on activeTab */}
        <Grid container spacing={2} mb={2}>
          <Grid item sm={12}>
            <Box
              className="rounded"
              style={{
                border: "2px solid #ee2e24",
              }}
            >
              <Box
                display={"flex"}
                color={"#ee2e24"}
                flexDirection={isMobile ? "column" : "row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                p={1}
                className="fw-bolder"
              >
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
              <Box
                display={"flex"}
                gap={isMobile ? 1 : 5}
                flexDirection={isMobile ? "column" : "row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                p={1}
              >
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
                  textTransform={"uppercase"}
                  className="text-warning fw-bolder"
                >
                  {userBookingDetails?.bookingStatus}
                </Typography>
                <Countdown
                  date={Date.now(userBookingDetails?.createdAt) + 300000}
                  renderer={renderer}
                />
              </Box>
              <Box p={1}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="text-danger fw-bolder"
                >
                  Order ID{" "}
                  <Tooltip title="Your Order Id">
                    {" "}
                    <span
                      style={{
                        fontFamily: "sans-serif",
                        color: "#74E291",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      {userBookingDetails?.bookingId}
                    </span>
                  </Tooltip>{" "}
                  has been generated, but the booking is pending. Please make
                  the payment to confirm your booking.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item sm="12">
            <CcavForm
              BOOKINGDATA={userBookingDetails}
              BILL={BillingCalculate}
              roomData={roomData}
              DATAA={formData}
              actualPricetoPay={calculate?.totalAmountToPay}
              setIsPaying={setIsPaying}
            />
          </Grid>
        </Grid>
      </Grid>
      {isPaying && (
        <div>
          <div
            className="paymentMethod"
            style={{ border: "2px solid #ee2e24" }}
          >
            <div className="buttonContainer">
              <Typography variant="h6">Pay With</Typography>
              <Button
                variant="outlined"
                style={{ justifyContent: "flex-start" }}
                onClick={openRazorPay}
              >
                <div className="imgDiv">
                  <img
                    src="https://images.saasworthy.com/tr:w-160,h-0,c-at_max,e-sharpen-1/razorpay_3762_logo_1603891770_dtlfw.jpg"
                    alt="Razorpay"
                  />
                </div>
                <div className="contentDiv">
                  <p>
                    Credit & Debit Card / Net Banking / Wallet / UPI (Powered by
                    Razorpay)
                  </p>
                </div>
              </Button>
              <Button
                variant="outlined"
                style={{ justifyContent: "flex-start" }}
                onClick={() => document.getElementById("FormfillDone").click()}
              >
                <div className="imgDiv">
                  <img
                    src="https://pbs.twimg.com/profile_images/1789943330295427072/lv7whBjj_400x400.jpg"
                    alt="Razorpay"
                  />
                </div>
                <div className="contentDiv">
                  <p>
                    Credit & Debit Card / Net Banking / Wallet / UPI (Powered by
                    CCAvenues)
                  </p>
                </div>
              </Button>
              <Button
                variant="outlined"
                style={{ justifyContent: "flex-start" }}
              >
                <div className="imgDiv">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv7C7cl9ufztQRxoH-y_biXvwoAf5bynbtnA&s"
                    alt="Razorpay"
                  />
                </div>
                <div className="contentDiv">
                  <p>
                    Credit & Debit Card / Net Banking / Wallet / UPI (Powered by
                    PhonePe)
                  </p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepThree;
