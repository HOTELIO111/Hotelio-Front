import React, { useState } from "react";
import "./BookingSteps.css"; // Import your CSS file for styling
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { Button, Grid } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import axios from "axios";
import { API_URL } from "../../config";
import { useEffect } from "react";
import PageLoader from "../../Utilis/PageLoader";
import { useBooking } from "../../context/useBooking";

const BookingSteps = () => {
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const searchQuery = new URLSearchParams(document.location.search);
  const {
    coupon,
    setCoupon,
    userBookingDetails,
    setUserBookingDetails,
    finalBookingData,
    setFinalBookingData,
    Gst,
    setGst,
    GenerateBookingId,
    calculateAmount,
  } = useBooking();

  const currentSearchParam = Object.fromEntries(searchQuery?.entries());

  const [data, setData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [formData, setFormData] = useState({});
  const decoded = decodeURIComponent(location.search);

  const hotelId = new URLSearchParams(decoded).get("hid");
  const roomId = new URLSearchParams(decoded).get("rid");

  const [currentStep, setCurrentStep] = useState(2);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    // Check if currentStep is 3, use navigation if true
    if (currentStep === 2) {
      navigate(-1); // Replace '/target-route' with your desired route
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    const GetHoteldata = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          API_URL + `/hotel/hoteldetails/${hotelId}`
        );
        if (response.status === 200) {
          setData(response.data.data);
          const roomData = response?.data?.data?.rooms?.find(
            (x) => x._id === roomId
          );
          setRoomData(roomData);
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };
    GetHoteldata();
  }, [hotelId]);
  return (
    <div
      style={isMobile ? { padding: "5px" } : { padding: "20px" }}
      className="multi-step-form"
    >
      {/* <button onClick={() => GenerateBookingId()}>Book Now</button> */}
      <PageLoader loading={loader} />
      {/* <div className="my-2">
        {currentStep > 1 && (
          <Button variant="outlined" onClick={prevStep}>
            {currentStep === 3 ? "Back" : "Back"}
          </Button>
        )}
        {currentStep < 3 && (
          <Button variant="contained" color="error" className="mx-2" onClick={nextStep}>
            Next
          </Button>
        )}
      </div> */}
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
        <StepTwo
          hotelData={data}
          roomData={roomData}
          formData={formData}
          setFormData={setFormData}
          handleFormData={handleFormData}
        />
      )}
      {currentStep === 3 && (
        <StepThree
          hotelData={data}
          roomData={roomData}
          formData={formData}
          setFormData={setFormData}
          handleFormData={handleFormData}
        />
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
              <Button fullWidth variant="contained" sx={{ borderRadius: '27px', padding: 1 }} color="error" className="mx-2" onClick={nextStep}>
                Next
              </Button>
            </Grid>
          )}
        </Grid>
        {/* {currentStep > 1 && (
          <Button variant="outlined" color="error" onClick={prevStep}>
            {currentStep === 3 ? "Back" : "Back"}
          </Button>
        )}
        {currentStep < 3 && (
          <Button variant="contained" color="error" className="mx-2" onClick={nextStep}>
            Next
          </Button>
        )} */}
      </div>
    </div>
  );
};

export default BookingSteps;
