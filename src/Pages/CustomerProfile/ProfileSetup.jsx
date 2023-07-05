import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Grid, Typography, Select, MenuItem } from '@mui/material';


const ProfileSetup = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const steps = ['Profile Picture', 'Personal Information', 'Confirmation'];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        mobile: '',
        profilePicture: null,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        if (e.target.name === 'profilePicture') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0],
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Form is valid, proceed with signup or form submission logic
            console.log(formData);
            // Reset form data
            setFormData({
                name: '',
                email: '',
                password: '',
                gender: '',
                mobile: '',
                profilePicture: null,
            });
            // Clear errors
            setErrors({});
        }
    };

    const validateForm = () => {
        let errors = {};

        // Validation rules for other fields
        // ...

        return errors;
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div className='p-4'>
                        {/* Profile Picture upload form */}
                        <form style={{ maxWidth: '800px', margin: '0 auto' }} onSubmit={handleSubmit}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12}>
                                    <Typography variant="h6" align="center">
                                        Customer Signup
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="file"
                                        label="Profile Picture"
                                        name="profilePicture"
                                        onChange={handleChange}
                                        error={!!errors.profilePicture}
                                        helperText={errors.profilePicture}
                                        fullWidth
                                        required
                                        inputProps={{ accept: 'image/*' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        component="label"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Choose File
                                        <input type="file" style={{ display: 'none' }} onChange={handleChange} />
                                    </Button>
                                </Grid>

                            </Grid>
                        </form>
                        {/* Your profile picture form fields here */}
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#ff5419', color: '#fff' }}
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    </div>
                );
            case 1:
                return (
                    <div className='p-4'>
                        {/* Personal Information form */}
                        <form style={{ maxWidth: '800px', margin: '0 auto' }} onSubmit={handleSubmit}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12}>
                                    <Typography variant="h6" align="center">
                                        Customer Signup
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={!!errors.password}
                                        helperText={errors.password}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Select
                                        label="Gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        error={!!errors.gender}
                                        helperText={errors.gender}
                                        fullWidth
                                        required
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Mobile Number"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        error={!!errors.mobile}
                                        helperText={errors.mobile}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </form>
                        {/* Your personal information form fields here */}
                        <Button onClick={handleBack}>Back</Button>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#ff5419', color: '#fff' }}
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    </div>
                );
            case 2:
                return (
                    <div className='p-4'>
                        {/* Confirmation page */}
                        <form style={{ maxWidth: '800px', margin: '0 auto' }} onSubmit={handleSubmit}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12}>
                                    <Typography variant="h6" align="center">
                                        Customer Signup
                                    </Typography>
                                </Grid>
                                {/* Other fields */}
                                {/* ... */}
                                <Grid item xs={12}>
                                    <TextField
                                        type="file"
                                        label="Profile Picture"
                                        name="profilePicture"
                                        onChange={handleChange}
                                        error={!!errors.profilePicture}
                                        helperText={errors.profilePicture}
                                        fullWidth
                                        required
                                        inputProps={{ accept: 'image/*' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        component="label"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Choose File
                                        <input type="file" style={{ display: 'none' }} onChange={handleChange} />
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={!!errors.password}
                                        helperText={errors.password}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Select
                                        label="Gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        error={!!errors.gender}
                                        helperText={errors.gender}
                                        fullWidth
                                        required
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Mobile Number"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        error={!!errors.mobile}
                                        helperText={errors.mobile}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </form>
                        <Button onClick={handleBack}>Back</Button>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#ff5419', color: '#fff' }}
                        >
                            Submit
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel >{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>{getStepContent(activeStep)}</div>
        </div>
    );
};

export default ProfileSetup;
