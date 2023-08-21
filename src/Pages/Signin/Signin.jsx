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
} from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { API_URL } from "../../config";
import { WaitLoader } from "../../Components/Elements/WaitLoader";
import MobileFooter from "../../Components/MobileComponent/MobileFooter";
import { MuiOtpInput } from "mui-one-time-password-input";
import HotelioLogo from '../../images/HotelioLogo.png'
import LoginMoto from '../../images/LoginMoto.jpg'

const Signin = () => {
  // code for loader top

  const [hideOtp, setShowOtp] = useState(false);
  const [inputOtp, setInputOtp] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
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
            <Typography component="h1" variant="h5">
              Customer Sign in
            </Typography>
            <Formik
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({ values, handleChange, handleSubmit, errors, touched }) => (
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
                        justifyContent={"flex-end"}
                      >
                        <Link to="/signin">Already have an account? Sign in</Link>
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
                        label="Mobile Number"
                        name="mobileNo"
                        autoComplete="mobileNo"
                        autoFocus
                      />
                      {errors.mobileNo && touched.mobileNo && (
                        <div className="error-message">{errors.mobileNo}</div>
                      )}

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
                          <Link to="/">I will do later</Link>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Box>
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
