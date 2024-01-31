import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PaymentDone from "../../images/PaymentDone.jpg";
import { useAuthContext } from "../../context/userAuthContext";
import { API_URL } from "../../config";
import axios from "axios";
import { ClockLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import AnimatedBg from "../../Components/AnimatedBg";

const SuccessPage = () => {
  const { currentUser } = useAuthContext();
  const [loader, setLoader] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderStatus = searchParams.get("order_status");

    if (orderStatus === "Aborted") {
      setPaymentStatus("failed");

      setTimeout(() => {
        navigate(`/CustomerProfile/${currentUser?._id}`);
      }, 2000); // 2 minutes in milliseconds
    } else {
      setPaymentStatus("Success");

      // Simulate a 2-minute timeout before navigating
      setTimeout(() => {
        navigate(`/CustomerProfile/${currentUser?._id}`);
      }, 2000); // 2 minutes in milliseconds
    }
  }, [currentUser, navigate]);

  return (
    <>
      {loader ? (
        <ClockLoader
          style={{
            position: "absolute",
            top: "50%",
            right: "50%",
            transform: "translate(-50% , -50% )",
          }}
          loading={loader}
        />
      ) : paymentStatus === "success" ? (
        <div style={{ background: "#edbcc2" }}>
          <AnimatedBg />
          <Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
            <Grid container spacing={4} sx={{ margin: "auto" }}>
              <Grid item xs={2.5}></Grid>
              <Grid
                sx={{ display: "grid", placeItems: "center" }}
                item
                xs={3.5}
              >
                <div>
                  <p className="pt-2">
                    <b>
                      Hey, your transaction has been successfully completed.
                    </b>
                  </p>
                  <p className="p-0">
                    The page will navigate to your booking history in a few
                    seconds.
                  </p>
                </div>
              </Grid>
              <Grid
                sx={{ display: "grid", placeItems: "center" }}
                item
                xs={3.5}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={PaymentDone}
                  alt="order-gif"
                />
              </Grid>
              <Grid item xs={2.5}></Grid>
            </Grid>
          </Box>
          <Typography
            sx={{ position: "absolute", top: "20%", left: "20%" }}
            variant="h1"
            color={"green"}
          >
            Payment Successfully
          </Typography>
        </div>
      ) : (
        <>
          <p>Payment failed. Please try again.</p>
        </>
      )}
    </>
  );
};

export default SuccessPage;
