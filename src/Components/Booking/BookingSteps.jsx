import React, { useState } from "react";
import "./BookingSteps.css"; // Import your CSS file for styling
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { Button } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import axios from "axios";
import { API_URL } from "../../config";
import { useEffect } from "react";
import PageLoader from "../../Utilis/PageLoader";

const BookingSteps = () => {
  const location = useLocation();
  const [loader, setLoader] = useState(false);

  const [data, setData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const decoded = decodeURIComponent(location.search);

  const hotelId = new URLSearchParams(decoded).get("hid");
  const roomId = new URLSearchParams(decoded).get("rid");

  const [currentStep, setCurrentStep] = useState(2);

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
  }, [location.search]);
  return (
    <div
      style={isMobile ? { padding: "5px" } : { padding: "20px" }}
      className="multi-step-form"
    >
      <PageLoader loading={loader} />
      <div className="my-2">
        {currentStep > 1 && (
          <Button variant="outlined" onClick={prevStep}>
            {currentStep === 3 ? "Back" : "Back"}
          </Button>
        )}
        {currentStep < 3 && (
          <Button variant="contained" className="mx-2" onClick={nextStep}>
            Next
          </Button>
        )}
      </div>
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
      {currentStep === 1 && <StepOne hotelData={data} roomData={roomData} />}
      {currentStep === 2 && <StepTwo hotelData={data} roomData={roomData} />}
      {currentStep === 3 && <StepThree hotelData={data} roomData={roomData} />}
      <div className="my-2">
        {currentStep > 1 && (
          <Button variant="outlined" onClick={prevStep}>
            {currentStep === 3 ? "Back" : "Back"}
          </Button>
        )}
        {currentStep < 3 && (
          <Button variant="contained" className="mx-2" onClick={nextStep}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingSteps;
