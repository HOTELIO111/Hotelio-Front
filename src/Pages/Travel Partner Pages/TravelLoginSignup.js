import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import TravelPartner from "../../images/TravelPartner.png";
import HoteliLogo from "../../images/HotelioLogo.png";
import { isMobile } from "react-device-detect";
import { FcGoogle } from "react-icons/fc";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { GetAgentSignup } from "../../store/actions/agentActions";
import { LoadingButton } from "@mui/lab";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useAuthContext } from "../../context/userAuthContext";
import instance from "../../store/_utils";
import Swal from "sweetalert2";

const TravelLoginSignup = () => {
  const location = useLocation();
  const navigat = useNavigate();

  // Extract query parameters from the location search string
  const queryParams = new URLSearchParams(location.search);

  const auth = queryParams.get("auth");

  // Define state variables to store form data
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    mobilNo: "",
    panNo: "",
  });

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // ===========================================Login Signup Implementation ===============================================

  const navigate = useNavigate();
  const [otp, setopt] = useState("");
  const { sendOtp, otpResp } = useAuthContext();

  const GetAgentLogin = async (formData) => {
    try {
      const queryUrl = new URLSearchParams({
        mobileNo: formData.mobileNo,
        otp: formData.otp,
        password: formData.password,
      }).toString();
      const response = await instance.get(`/api/agent/auth/login?${queryUrl}`);
      if (response.status === 200) {
        Swal.fire({ icon: "success", title: "Login Successfully " });
        window.localStorage.setItem(
          "customer",
          JSON.stringify(response.data.data)
        );
        window.localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed ",
          text: response.data.error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleSendOtp = (value) => {
    sendOtp(value).then(() => {
      if (otpResp) {
        setLoginWith("otp");
      }
    });
  };

  const SignupInitialValues = {
    email: "",
    name: "",
    password: "",
    mobileNo: "",
    panNo: "",
  };

  const LoginInitialValues = {
    mobileNo: "",
    otp: otp,
    password: "",
  };

  const [loginWith, setLoginWith] = useState(null);
  const handleSetOtp = (value) => {
    setopt(value);
  };

  const { data } = useSelector((state) => state.GetAgentSignupReducer);
  const loginData = useSelector((state) => state.GetAgentLoginReducer);

  const dispatch = useDispatch();
  const HandleLoginSubmit = async (value, { resetForm }) => {
    const formData = value;
    formData.otp = otp;
    await GetAgentLogin(formData);
  };

  // Function to handle form submission
  const handleSignupSubmit = (value, { resetForm }) => {
    console.log(value);
    dispatch(GetAgentSignup(value)).then(() => {
      if (data) {
        resetForm();
      }
    });
  };

  const signupPage = new URLSearchParams({ auth: "signup" }).toString();

  return (
    <Container
      style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}
    >
      <Grid container spacing={1}>
        {isMobile ? null : (
          <Grid
            sx={{
              my: 8,
              display: "flex",
              alignItems: "center",
            }}
            item
            xs={7}
            lg={7}
          >
            <img src={TravelPartner} style={{ width: "500px" }} alt="icon" />
          </Grid>
        )}
        {auth !== "signup" ? (
          <Grid item xs={12} lg={5}>
            {console.log(loginData)}
            <Formik
              initialValues={LoginInitialValues}
              onSubmit={HandleLoginSubmit}
            >
              {({ values, handleChange, handleSubmit }) => (
                <Box
                  sx={{
                    my: 6,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <img src={HoteliLogo} style={{ width: "250px" }} alt="logo" />

                  <Typography variant="h5" gutterBottom>
                    Travel Partner Login
                  </Typography>
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="mobileNo"
                    label="Enter Mobile No. or Email Id"
                    name="mobileNo"
                    value={values.mobileNo}
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                  />
                  {loginWith === "password" && (
                    <TextField
                      margin="normal"
                      type="password"
                      fullWidth
                      required
                      id="password"
                      label="Password"
                      name="password"
                      value={values.password}
                      autoComplete="email"
                      autoFocus
                      onChange={handleChange}
                    />
                  )}
                  {loginWith === "otp" && (
                    <MuiOtpInput value={otp} id="otp" onChange={handleSetOtp} />
                  )}
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <hr style={{ width: "100px" }} />
                    <Typography
                      className={isMobile ? "px-1" : "px-3"}
                      variant="caption"
                    >
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
                  {loginWith === null && (
                    <LoadingButton
                      type="button"
                      fullWidth
                      variant="contained"
                      color="error"
                      onClick={() => HandleSendOtp(values.mobileNo)}
                      sx={{ mt: 2, mb: 2 }}
                    >
                      send Otp
                    </LoadingButton>
                  )}
                  {loginWith !== null && (
                    <LoadingButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="error"
                      sx={{ mt: 2, mb: 2 }}
                    >
                      Log In
                    </LoadingButton>
                  )}
                  {loginWith === null && (
                    <LoadingButton
                      type="button"
                      fullWidth
                      onClick={() => setLoginWith("password")}
                      variant="contained"
                      color="error"
                      sx={{ mt: 2, mb: 2 }}
                    >
                      Login With Password
                    </LoadingButton>
                  )}
                </Box>
              )}
            </Formik>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  to={`/Travel-Partner-Auth?${signupPage}`}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 3 }}
            >
              {"Copyright © "}
              <Link color="inherit" href="https://mui.com/">
                hoteliorooms.com
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Grid>
        ) : (
          <Grid item xs={12} lg={5}>
            <Formik
              initialValues={SignupInitialValues}
              onSubmit={handleSignupSubmit}
            >
              {({ values, handleChange, handleSubmit }) => (
                <Box
                  sx={{
                    my: 1,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onSubmit={handleSubmit}
                  component="form"
                >
                  <img src={HoteliLogo} style={{ width: "250px" }} alt="logo" />

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
                    value={values.name}
                    onChange={handleChange}
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
                    value={values.email}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="mobileNo"
                    label="Enter Mobile No."
                    name="mobileNo"
                    autoComplete="mobileNo"
                    autoFocus
                    value={values.mobileNo}
                    onChange={handleChange}
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
                    value={values.password}
                    onChange={handleChange}
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
                    value={values.panNo}
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    color="error"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Formik>
            <Grid container>
              <Grid item xs={12} textAlign={"center"}>
                <Link href="#" variant="body2" to={"/Travel-Partner-Auth"}>
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 1 }}
                >
                  {"Copyright © "}
                  <Link color="inherit" href="https://mui.com/">
                    hoteliorooms.com
                  </Link>{" "}
                  {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default TravelLoginSignup;
