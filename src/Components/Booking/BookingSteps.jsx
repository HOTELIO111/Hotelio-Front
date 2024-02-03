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
import { GetBookingRegister } from '../../store/actions/BookingAction';


const BookingSteps = () => {
  const HotelData = useSelector((state) => state.GetSingleHotelReducers);
  const RegisteredBookingData = useSelector((state) => state.GetBookingRegisterReducer);
  const [searchBookingInfo, setSearchBookingInfo] = useState(JSON.parse(window.localStorage.getItem('search')))


  const bookingObjectString = window.sessionStorage.getItem("bookingObject");
  const [currentStep, setCurrentStep] = useState(2);
  const [bookingObject, setBookingObject] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const nextStep = (bookingObject) => {
    setCurrentStep(currentStep + 1);


    if (currentStep === 2) {
      dispatch(GetBookingRegister(bookingObject));
    }
  };



  useEffect(() => {
    if (searchBookingInfo.hid) {
      dispatch(GetSingleHotel(searchBookingInfo.hid));
    }
  }, [searchBookingInfo.hid]);


  // const prevStep = () => {
  //   if (currentStep === 3) {
  //     navigate('/');
  //   } else if (currentStep === 2) {
  //     navigate(-1);
  //   } else {
  //     setCurrentStep(currentStep - 1);
  //   }
  // };

  const prevStep = () => {

    if (currentStep === 2) {
      navigate(-1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  }


  useLayoutEffect(() => {
    if (bookingObjectString) {
      const parsedBookingObject = JSON.parse(bookingObjectString);
      setBookingObject(parsedBookingObject);
    }
  }, [bookingObjectString]);

  useEffect(() => {
    if (bookingObject) {
      dispatch(GetBookingRegister(bookingObject));
    }
  }, [bookingObject, currentStep]);


  return (
    <div
      style={isMobile ? { padding: "5px" } : { padding: "20px" }}
      className="multi-step-form"
    >

      <PageLoader loading={HotelData.isSuccess === false} />
      <div className="stepper">
        <div className={`step ${currentStep === 1 ? "active" : "active"}`}>
          Your selection
        </div>
        <div className={`step ${currentStep === 2 ? "active" : "active"}`}>
          Your details
        </div>
        <div className={`step ${currentStep === 3 ? "active" : ""}`}>
          Final Step
        </div>
      </div>

      {/* Render the form content based on the current step */}
      {/* {currentStep === 1 && (
        <StepOne
          hotelData={data}
          roomData={roomData}
          formData={formData}
          setFormData={setFormData}
          handleFormData={handleFormData}
        />
      )} */}
      {currentStep === 2 && (
        <StepTwo />
      )}
      {currentStep === 3 && (
        <StepThree />
      )}
      <div className="my-2">
        <Grid container spacing={2}>
          {currentStep > 1 && (
            <Grid item xs={4}>
              <Button fullWidth variant="outlined" sx={{ borderRadius: '27px', padding: 1 }} color="error" onClick={prevStep}>
                {currentStep === 3 ? "Back" : "Back"}
              </Button>
            </Grid>
          )}
          {currentStep < 3 && (
            <Grid item xs={8}>
              <Button fullWidth variant="contained" sx={{ borderRadius: '27px', padding: 1 }} color="error" className="mx-2" onClick={() => nextStep(bookingObject)}>
                Next
              </Button>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default BookingSteps;