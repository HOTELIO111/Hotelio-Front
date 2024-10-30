import React, { useLayoutEffect, useState } from "react";
import "./BookingSteps.css";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { Button, Grid } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useEffect } from "react";
import PageLoader from "../../Utilis/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleHotel } from "../../store/actions/hotelActions";
import { useCollections } from "../../context/useStateManager";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useBooking } from "../../context/useBooking";
import StepOne from "./StepOne";

const BookingSteps = () => {
  const HotelData = useSelector((state) => state.GetSingleHotelReducers);
  const [searchBookingInfo, setSearchBookingInfo] = useState(
    JSON.parse(window.localStorage.getItem("search"))
  );
  const { formData } = useCollections();
  const bookingObjectString = window.sessionStorage.getItem("bookingObject");
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingObject, setBookingObject] = useState(null);
  const navigate = useNavigate();
  const [searchParmas, setSearchParamas] = useSearchParams();
  const { CreateBooking } = useBooking();
  const dispatch = useDispatch();

  const nextStep = async (bookingObject) => {
    try {
      if (currentStep === 1) {
        setCurrentStep(currentStep + 1);
        return;
      }

      let { name, email, mobileNo, address, city, state, zip, country } =
        formData;

      if (
        !name ||
        !email ||
        !mobileNo ||
        !address ||
        !city ||
        !state ||
        !zip ||
        !country
      ) {
        Swal.fire({
          icon: "info",
          title: "Please fill the required details",
        });
        return;
      }

      const swalResult = await Swal.fire({
        icon: "info",
        title: "Are you sure with this information",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (!swalResult.isConfirmed) {
        return;
      }

      bookingObject = JSON.parse(
        window.sessionStorage.getItem("bookingObject")
      );
      console.log("bookingObject", bookingObject);
      const booking = await CreateBooking(bookingObject);

      if (!booking.error) {
        setCurrentStep(currentStep + 1);
      } else {
        handleBookingError(booking.error, booking.status);
      }
    } catch (error) {
      console.error("Error during booking creation:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred. Please try again.",
      });
    }
  };

  const handleBookingError = (error, status) => {
    if (error === true && status === 404) {
      Swal.fire({
        icon: "info",
        title: "Sorry! Currently Room not available, Please try again.",
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Please fill the required details",
      });
    }
  };

  useEffect(() => {
    if (searchBookingInfo.hid) {
      dispatch(GetSingleHotel(searchBookingInfo.hid));
    }
  }, [searchBookingInfo.hid]);

  const prevStep = () => {
    if (currentStep < 2) {
      navigate(-1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  useLayoutEffect(() => {
    if (bookingObjectString) {
      const parsedBookingObject = JSON.parse(bookingObjectString);
      setBookingObject(parsedBookingObject);
    }
  }, [bookingObjectString]);

  useEffect(() => {
    if (searchParmas.get("step")) {
      setCurrentStep(parseInt(searchParmas.get("step")));
    } else {
      setCurrentStep(1);
    }
  }, []);

  useEffect(() => {
    if (currentStep) {
      let searchQuery = new URLSearchParams(document.location.search);
      let currentSearchParams = Object.fromEntries(searchQuery?.entries());
      setSearchParamas({
        ...currentSearchParams,
        step: currentStep,
      });
    }
  }, [currentStep]);

  return (
    <div
      style={isMobile ? { padding: "5px" } : { padding: "20px" }}
      className="multi-step-form"
    >
      <ToastContainer />

      <PageLoader loading={HotelData.isSuccess === false} />
      <div className="stepper">
        <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
          Your selection
        </div>
        <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
          Your details
        </div>
        <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
          Final Step
        </div>
      </div>
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}
      <div className="my-2">
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item xs={3}>
            {currentStep <= 3 && (
              <Button
                fullWidth
                variant="contained"
                size="large"
                color="error"
                sx={{
                  clipPath:
                    "polygon(100% 0%, 98% 50%, 100% 100%, 5% 100%, 0% 50%, 5% 0%)",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                }}
                onClick={prevStep}
              >
                {currentStep > 1 ? "Back" : "Back"}
              </Button>
            )}
          </Grid>
          {currentStep < 3 && (
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  clipPath:
                    "polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 2% 50%, 0% 0%)",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                }}
                size="large"
                color="error"
                className="mx-2"
                onClick={() => nextStep(bookingObject)}
              >
                continue
              </Button>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default BookingSteps;
