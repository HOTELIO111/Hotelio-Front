import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import Googlelogo from "../Signin/googlelogo.png";
import { useDispatch } from "react-redux";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Form } from "react-bootstrap";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { API_URL } from "../../config";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import { WaitLoader } from "../../Components/Elements/WaitLoader";
import { MuiOtpInput } from "mui-one-time-password-input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MobileFooter from "../../Components/MobileComponent/MobileFooter";
import { data } from "jquery";

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
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [alertmessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [AlertTitle, setAlertTitle] = useState("Info");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const dispatch = useDispatch();
  const [alertOn, setAlertOn] = useState(false);
  const [open, setOpen] = useState(true);
  const [hideOtp, setShowOtp] = useState(false);
  const [inputOtp, setInputOtp] = useState("");

  const OtpChangeHandle = (newValue) => {
    setInputOtp(newValue);
  };

  const navigate = useNavigate();

  // loader state
  const [Loader, setLoader] = useState(false);

  // get geo locations

  const getLocationDetails = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error.message);
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  const handleLocationButtonClick = () => {
    getLocationDetails()
      .then(({ latitude, longitude }) => {
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        // Do something with the location details
      })
      .catch((error) => {
        console.log("Error:", error);
        // Handle the error
      });
  };

  const initialValues = {
    name: "",
    mobileNo: "",
    otp: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobileNo: Yup.number().required("Mobile Number is required"),
  });

  // API TO GET THE SIGN UP
  const handleSubmit = async (values, { resetForm }) => {
    setLoader(true);

    const data = values;
    data.otp = inputOtp;
    console.log(data);
    try {
      const response = await axios.post(API_URL + "/api/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        sessionStorage.setItem("customer", JSON.stringify(data));
        Swal.fire({
          title: "Successfully Registered",
          icon: "success",
          text: "Welcome to the Hotelio",
        });
        setLoader(false);
        navigate("/");
      } else {
        setLoader(false);
        throw new Error("Registration failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        icon: "error",
        text: "Registration Failed. Please try again.",
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
    <>
      {/* Display alert message */}
      {alertOn && (
        <Collapse in={open}>
          <Stack sx={{ width: "100%" }} spacing={1}>
            <Alert
              severity={alertType}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {/* <AlertTitle>{AlertTitle}</AlertTitle> */}
              This is an {alertType} alert — <strong>{alertmessage}</strong>
            </Alert>
          </Stack>
        </Collapse>
      )}

      <Container component="main" maxWidth="xs">
        {/* Loader  */}
        <WaitLoader loading={Loader} />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                {hideOtp ? (
                  /* Display OTP verification component */
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <div className="text-center">
                        <h4 className="py-4">Enter OTP</h4>
                        <MuiOtpInput
                          value={inputOtp}
                          onChange={(value) => setInputOtp(value)}
                        />
                      </div>
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
                        Sign Up
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      justifyContent={"flex-end"}
                    >
                      <Link to="/signin">Already have an account? Sign in</Link>
                    </Grid>
                  </Grid> /* Display regular sign up form */
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        onChange={handleChange}
                        value={values.name}
                        label="Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="mobileNo"
                        label="Mobile Number"
                        name="mobileNo"
                        value={values.mobileNo}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={() => {
                          sendOtp(values.mobileNo);
                        }}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Next
                      </Button>
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Link to="/signin">
                            Already have an account? Sign in
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <div className="d-md-block d-lg-none d-xl-none">
          <MobileFooter />
        </div>
      </Container>
    </>
  );
}
