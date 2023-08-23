import { Button, Grid, IconButton, InputAdornment, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import React, { useState } from 'react';
import LoginMoto from '../../images/HotelioLogo.png'
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const StepsForm = () => {

    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        borderRadius: '20px',
                        '& .MuiInputBase-input:focus': {
                            backgroundColor: '#fff',
                        },
                        '& .MuiInput-underline::before': {
                            borderBottom: '2px solid #ee2e24', // Change to your desired active color
                        },
                        '& .MuiInput-underline::after': {
                            borderBottom: '2px solid #ee2e24', // Change to your desired active color
                        },
                    },
                },
            },
        },
    });

    const navigate = useNavigate()
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process and submit form data
        console.log('Form submitted:', formData);
    };

    const [otp, setOtp] = React.useState('')

    const handleOtp = (newValue) => {
        setOtp(newValue)
    }

    const renderForm = () => {
        switch (step) {
            case 1:
                return (
                    <Grid container spacing={1}>
                        <ThemeProvider theme={theme}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    type="text"
                                    fullWidth
                                    onChange={handleChange}
                                    id="mbileNo"
                                    sx={{ mt: 4 }}
                                    label="Mobile Number / Email Id"
                                    name="mobileNo"
                                    autoComplete="mobileNo"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    <hr style={{ width: "100px" }} />
                                    <Typography className="px-3" variant="caption">
                                        Or Login/Signup With
                                    </Typography>
                                    <hr style={{ width: "100px" }} />
                                </div>
                            </Grid>
                            <Grid item xs={12} justifyContent={'center'}>
                                <div className="d-flex align-items-center justify-content-center my-4">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            border: "1px solid black",
                                            borderRadius: "100%",
                                            width: "40px",
                                            height: "40px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <FcGoogle size={30} />
                                    </div>
                                </div>
                            </Grid>
                        </ThemeProvider>
                        <Button
                            onClick={handleNext}
                            fullWidth
                            type="button"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Continue
                        </Button>
                        <Button
                            onClick={() => navigate('/')}
                            fullWidth
                            type="button"
                            variant="text"
                            color="primary"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            I will do later
                        </Button>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container spacing={1}>
                        <ThemeProvider theme={theme}>
                            <Grid item xs={12}>
                                <h4 className="py-4">Enter OTP</h4>
                                <MuiOtpInput value={otp} onChange={handleOtp} />
                            </Grid>
                            <Grid item xs={12}>
                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    <hr style={{ width: "120px" }} />
                                    <Typography className="px-3" variant="caption">
                                        Or
                                    </Typography>
                                    <hr style={{ width: "120px" }} />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={handleChange}
                                    id="password"
                                    label="Enter Your Password"
                                    name="password"
                                    autoComplete="password"
                                    autoFocus
                                />
                            </Grid>
                        </ThemeProvider>
                        <Grid item xs={6}>
                            <Button
                                onClick={handlePrevious}
                                fullWidth
                                type="button"
                                variant="outlined"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                onClick={handleNext}
                                fullWidth
                                type="button"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Continue
                            </Button>
                        </Grid>
                    </Grid>
                );
            case 3:
                return (
                    <Grid container spacing={1}>
                        <ThemeProvider theme={theme}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={handleChange}
                                    value={formData.name}
                                    name="name"
                                    label="Enter Your Full Name"
                                    autoComplete="name"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={handleChange}
                                    value={formData.password}
                                    name="password"
                                    label="Enter Your Password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="password"
                                    autoFocus
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    sx={{
                                                        backgroundColor: isFocused ? "#fff" : "transparent",
                                                    }}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </ThemeProvider>
                        <Grid item xs={6}>
                            <Button
                                onClick={handlePrevious}
                                fullWidth
                                type="button"
                                variant="outlined"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Button
                            onClick={() => navigate('/')}
                            fullWidth
                            type="button"
                            variant="text"
                            color="primary"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            I will do later
                        </Button>
                    </Grid>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className='text-center'>
                <img
                    src={LoginMoto}
                    alt="Main"
                    style={{ width: '260px', height: '200px' }}
                />
                <Typography variant="h5" gutterBottom>
                    Customer Login / Signup
                </Typography>
            </div>
            <form onSubmit={handleSubmit}>
                {renderForm()}
            </form>
        </>
    );
};

export default StepsForm;
