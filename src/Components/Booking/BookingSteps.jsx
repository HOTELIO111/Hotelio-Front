import React, { useState } from 'react';
import './BookingSteps.css'; // Import your CSS file for styling
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { Button } from '@mui/material';

const BookingSteps = () => {
  const [currentStep, setCurrentStep] = useState(3);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="multi-step-form">
      <div className="stepper">
        <div className={`step ${currentStep === 1 ? 'active' : 'active'}`}>Your selection</div>
        <div className={`step ${currentStep === 2 ? 'active' : 'active'}`}>Your details</div>
        <div className={`step ${currentStep === 3 ? 'active' : ''}`}>FInal Step</div>
      </div>

      {/* Render the form content based on the current step */}
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}

      <div className="buttons">
        {currentStep > 1 && <Button variant='outlined' onClick={prevStep}>Previous</Button>}
        {currentStep < 3 && <Button variant='contained' className='mx-2' onClick={nextStep}>Next</Button>}
      </div>
    </div>
  );
};

export default BookingSteps;
