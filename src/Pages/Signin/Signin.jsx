import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { API_URL } from "../../config";
import { WaitLoader } from "../../Components/Elements/WaitLoader";
import MobileFooter from "../../Components/MobileComponent/MobileFooter";
import { MuiOtpInput } from "mui-one-time-password-input";
import HotelioLogo from '../../images/HotelioLogo.png'
import LoginMoto from '../../images/LoginMoto.jpg'
import { FcGoogle } from "react-icons/fc";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signin = () => {
  // code for loader top


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
              borderBottom: '2px solid #ee2e24',
            },
            '& .MuiInput-underline::after': {
              borderBottom: '2px solid #ee2e24',
            },
          },
        },
      },
      // MuiInputAdornment: {
      //   styleOverrides: {
      //     root: {
      //       backgroundColor: "#fff",
      //     },
      //   },
      // },
    },
  });

  const [hideOtp, setShowOtp] = useState(false);
  const [inputOtp, setInputOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dataFound, setDataFound] = useState(true)
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // loader state
  const [Loader, setLoader] = useState(false);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link to="/">www.hoteliorooms.com</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  // initial values
  const initialValues = {
    mobileNo: "",
    otp: "",
    password: ""
  };

  // validation schema
  const validationSchema = Yup.object().shape({
    mobileNo: Yup.number().min(10).required("Mobile Number is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const formd = values;
    formd.otp = inputOtp;

    try {
      setLoader(true);

      // Construct the query string manually
      const queryString = Object.keys(formd)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(formd[key])}`
        )
        .join("&");

      const response = await axios.get(API_URL + "/api/login?" + queryString, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (values.password !== reEnteredPassword) {
        Swal.fire({
          title: "Passwords do not match",
          icon: "error",
          text: "Please make sure the passwords match.",
        });
        setLoader(false);
        return;
      }

      if (response.status === 200) {
        const data = response.data;
        Swal.fire({
          title: "Successfully Logged In",
          icon: "success",
          text: `Welcome ${data.name}`,
        });
        sessionStorage.setItem("customer", JSON.stringify(data));
        setLoader(false);
        Navigate("/");
      } else {
        setLoader(false);
        throw new Error("Login Failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        icon: "error",
        text: "Login Failed. Please try again.",
      });
      setLoader(false);
    }

    resetForm();
  };

  const sendOtp = async (number) => {
    setLoader(true);
    try {
      const response = await axios.get(API_URL + "/verify/mobile/" + number);
      if (response.status === 200) {
        Swal.fire({
          text: `We sended you a otp on mobile ${number}`,
          icon: "info",
        });
        setLoader(false);
        setShowOtp(true);
      } else {
        Swal.fire({
          title: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Otp Send Failed ! Try Again",
        icon: "error",
      });
      setLoader(false);
    }
  };

  return (
    <Container fixed style={{ height: "100vh", background: '#fffffc' }}>
      <Grid container spacing={2} >
        <Grid className="d-none d-sm-block" item xs={12} md={12} lg={7} xl={7}>
          <img src={LoginMoto} alt="Main" style={{ padding: '15px', marginTop: '20px' }} />
        </Grid>
        <Grid item xs={12} md={12} lg={5} xl={5}>

          <WaitLoader loading={Loader} />
          <Box
            sx={{
              textAlign: 'center',
              mt: 8
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <img src={HotelioLogo} style={{ width: '200px' }} alt="logo" />
            <Typography sx={{ mt: 2 }} component="h1" variant="h5">
              Customer Sign in
            </Typography>
            <Formik
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({ values, handleChange, handleSubmit, errors, touched }) => (
                <ThemeProvider theme={theme}>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >

                    {hideOtp ? (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <div className="text-center">
                            <h4 className="py-4">Enter OTP</h4>
                            <MuiOtpInput
                              value={inputOtp}
                              onChange={(value) => setInputOtp(value)}
                            />
                          </div>
                          {dataFound ? null : <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Continue
                          </Button>}
                          <Typography variant="subtitle1" sx={{ my: 2 }} display="block">
                            OR
                          </Typography>
                          <div>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              onChange={handleChange}
                              value={values.password}
                              id="password"
                              label="Enter Your Password"
                              name="password"
                              autoComplete="password"
                              autoFocus
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          {dataFound ? <>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              onChange={handleChange}
                              value={values.name}
                              id="mbileNo"
                              sx={{ mt: 4 }}
                              label="Enter Your Full Name"
                              name="name"
                              autoComplete="name"
                              autoFocus
                            />
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              onChange={handleChange}
                              value={values.password}
                              id="password"
                              sx={{ mt: 4 }}
                              label="Enter Your Password"
                              name="password"
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

                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              onChange={(e) => setReEnteredPassword(e.target.value)}
                              value={reEnteredPassword}
                              id="reEnteredPassword"
                              sx={{ mt: 4 }}
                              label="Re-Enter Password"
                              name="reEnteredPassword"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
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

                          </> : null}
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => setShowOtp(false)}
                            sx={{ mt: 3, mb: 2 }}
                          >
                            <ArrowBackIcon /> Back
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Verify
                          </Button>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          justifyContent={"center"}
                        >
                          {/* <Link to="/signin">Already have an account? Sign in</Link> */}
                          <Link style={{ color: '#ee2e24' }} to="/"><b>I will do later</b></Link>
                        </Grid>
                      </Grid>
                    ) : (
                      <>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          onChange={handleChange}
                          value={values.mobileNo}
                          id="mbileNo"
                          sx={{ mt: 4 }}
                          label="Mobile Number / Email Id"
                          name="mobileNo"
                          autoComplete="mobileNo"
                          autoFocus
                        />
                        {errors.mobileNo && touched.mobileNo && (
                          <div className="error-message">{errors.mobileNo}</div>
                        )}
                        <div className="d-flex justify-content-center align-items-center mt-4">
                          <hr style={{ width: '120px' }} />
                          <Typography className="px-3" variant="caption">Or Login/Signup With</Typography>
                          <hr style={{ width: '120px' }} />
                        </div>


                        <div className="d-flex align-items-center justify-content-center mt-4">
                          <div className="d-flex align-items-center justify-content-center" style={{ border: '1px solid black', borderRadius: '100%', width: '40px', height: '40px', cursor: 'pointer' }}>
                            <FcGoogle size={30} />
                          </div>
                        </div>
                        <p>Google</p>

                        <Button
                          onClick={() => sendOtp(values.mobileNo)}
                          fullWidth
                          variant="contained"
                          color="primary"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign In
                        </Button>

                        <Grid container>
                          <Grid className="text-center" item xs={12} >
                            <Link style={{ color: '#ee2e24' }} to="/"><b>I will do later</b></Link>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Box>
                </ThemeProvider>
              )}
            </Formik>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
          <div className="d-md-block d-lg-none d-xl-none">
            <MobileFooter />
          </div>

        </Grid>
      </Grid>
    </Container>
  );
};

export default Signin;
