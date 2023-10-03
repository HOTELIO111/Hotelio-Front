import React, { useState } from 'react';
import './BookingSteps.css'; // Import your CSS file for styling
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const BookingSteps = () => {
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

  return (
    <div style={isMobile ? { padding: '5px' } : { padding: '20px' }} className="multi-step-form">
      <div className="my-2">
        {currentStep > 1 && (
          <Button variant="outlined" onClick={prevStep}>
            {currentStep === 3 ? 'Back' : 'Back'}
          </Button>
        )}
        {currentStep < 3 && (
          <Button variant="contained" className="mx-2" onClick={nextStep}>
            Next
          </Button>
        )}
      </div>
      <div className="stepper">
        <div className={`step ${currentStep === 1 ? 'active' : 'active'}`}>Your selection</div>
        <div className={`step ${currentStep === 2 ? 'active' : 'active'}`}>Your details</div>
        <div className={`step ${currentStep === 3 ? 'active' : ''}`}>Final Step</div>
      </div>

      {/* Render the form content based on the current step */}
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}
      <div className="my-2">
        {currentStep > 1 && (
          <Button variant="outlined" onClick={prevStep}>
            {currentStep === 3 ? 'Back' : 'Back'}
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
