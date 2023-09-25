import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import TravelPartner from '../../images/TravelPartner.png'
import HoteliLogo from '../../images/HotelioLogo.png'
import { isMobile } from 'react-device-detect';
import { FcGoogle } from 'react-icons/fc';

const TravelLoginSignup = () => {

    const location = useLocation();

    // Extract query parameters from the location search string
    const queryParams = new URLSearchParams(location.search);

    const auth = queryParams.get('auth')

    // Define state variables to store form data
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        mobilNo: '',
        panNo: ''
    });

    // Function to handle form input changes
    const handleInputChange = (event) => {
        const { name, value, checked, type } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // You can now access the form data in formData object
        console.log(formData);

        // You can perform your desired actions here, such as making an API request.
    };

    const signupPage = new URLSearchParams({ auth: "signup" }).toString()

    return (
        <Container style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
            <Grid container spacing={1}>
                {isMobile ? null : <Grid
                    sx={{
                        my: 8,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    item xs={7} lg={7}>
                    <img src={TravelPartner} style={{ width: '500px' }} alt="icon" />

                </Grid>}
                {auth !== 'signup' ?
                    <Grid item xs={12} lg={5}>
                        <Box

                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            component="form" noValidate onSubmit={handleSubmit}>

                            <img src={HoteliLogo} style={{ width: '250px' }} alt="logo" />

                            <Typography variant="h5" gutterBottom>
                                Travel Partner Login
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Enter Mobile No. or Email Id"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <div className="d-flex justify-content-center align-items-center mt-4">
                                <hr style={{ width: "100px" }} />
                                <Typography className={isMobile ? 'px-1' : 'px-3'} variant="caption">
                                    Or Login With
                                </Typography>
                                <hr style={{ width: "100px" }} />
                            </div>
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
                            <Button
                                type="submit"
                                fullWidth
                                href='/Travel-Partner-Home'
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Log In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" to={`/Travel-Partner-Auth?${signupPage}`}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
                                {'Copyright © '}
                                <Link color="inherit" href="https://mui.com/">
                                    hoteliorooms.com
                                </Link>{' '}
                                {new Date().getFullYear()}
                                {'.'}
                            </Typography>
                        </Box>
                    </Grid>
                    : <Grid item xs={12} lg={5}>
                        <Box

                            sx={{
                                my: 1,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            component="form" noValidate onSubmit={handleSubmit}>

                            <img src={HoteliLogo} style={{ width: '250px' }} alt="logo" />

                            <Typography variant="h5" gutterBottom>
                                Travel Partner Sign Up
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                label="Enter Full Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Enter Email address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="mobilNo"
                                label="Enter Mobile No."
                                name="mobilNo"
                                autoComplete="mobilNo"
                                autoFocus
                                value={formData.mobilNo}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Enter Password"
                                name="password"
                                autoComplete="password"
                                autoFocus
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="panNo"
                                label="Enter PAN No."
                                name="panNo"
                                autoComplete="panNo"
                                autoFocus
                                value={formData.panNo}
                                onChange={handleInputChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item xs={12} textAlign={'center'}>
                                    <Link href="#" variant="body2" to={'/Travel-Partner-Auth'}>
                                        {"Already have an account? Log In"}
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                                        {'Copyright © '}
                                        <Link color="inherit" href="https://mui.com/">
                                            hoteliorooms.com
                                        </Link>{' '}
                                        {new Date().getFullYear()}
                                        {'.'}
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Box>
                    </Grid>}
            </Grid>
        </Container>
    );
};

export default TravelLoginSignup;
