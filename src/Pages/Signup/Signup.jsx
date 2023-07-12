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
import { Link } from "react-router-dom";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [c_password, setCpassword] = useState("");
  const [account_type, setAccountType] = useState("user");
  const [mobileNumber, setMobileNumber] = useState(""); // New state variable
  const [alertOn, setAlertOn] = useState(false);
  const [open, setOpen] = useState(true);

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
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    password: "",
    cpassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobileNo: Yup.number().required("Mobile Number is required"),
    password: Yup.string().required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // API TO GET THE SIGN UP
  const handleSubmit = async (values, { resetForm }) => {
    setLoader(true);
    const { cpassword, firstName, lastName, ...rest } = values;
    const combinedName = `${firstName} ${lastName}`;

    const dataToSend = {
      name: combinedName,
      ...rest,
    };

    try {
      const response = await fetch(API_URL + "/api/signup", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          title: "Successfully Registered",
          icon: "success",
          text: `Welcome to the Hotelio`,
        });
        setLoader(false);
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

  return (
    <>
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
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      onChange={handleChange}
                      value={values.firstName}
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      onChange={handleChange}
                      value={values.lastName}
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      autoComplete="email"
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
                    <FormControl sx={{ width: "100%" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label="Password"
                        onChange={handleChange}
                        value={values.password}
                        // value={password}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <FormControl
                      sx={{ mt: 2, width: "100%" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="cpassword"
                        label="Confirm Password"
                        onChange={handleChange}
                        value={values.cpassword}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/signin">Already have an account? Sign in</Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}
