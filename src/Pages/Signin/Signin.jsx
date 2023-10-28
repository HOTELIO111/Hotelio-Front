import React, { useState } from "react";
import {
  Grid,
  Typography,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { API_URL } from "../../config";
import MobileFooter from "../../Components/MobileComponent/MobileFooter";
import LoginLogo from "../../images/HotelioLogo.png";
import Reception from "../../images/Reception.jpg";
import { buildQueryString, validateInput } from "../../Utilis/_fuctions";
import StepsForm from "./StepsForm";
import { isMobile } from "react-device-detect";

const Signin = () => {
  // code for loader top

  const [hideOtp, setShowOtp] = useState(false);
  const [inputOtp, setInputOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dataFound, setDataFound] = useState(true);
  // already user or not
  const [isUser, setIsUser] = useState(false);
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
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formd = values;
    formd.otp = inputOtp;
    formd.password = "";

    try {
      setLoader(true);

      // Construct the query string manually
      const queryString = buildQueryString({
        ...values,
        otp: inputOtp,
        password: "",
      });

      const response = await axios.get(
        API_URL + "/api/authenticate?" + queryString,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        Swal.fire({
          title: "Successfully Logged In",
          icon: "success",
          text: `Welcome ${data.name}`,
        });
        window.localStorage.setItem("customer", JSON.stringify(data));
        setLoader(false);
        Navigate("/");
      } else if (response.status === 201) {
        setIsUser(true);
        setLoader(false);
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

  // send otp  -------------------------------------------------- --------------------------
  const sendOtp = async (number) => {
    CheckTheUser();
    setLoader(true);
    // check the input type
    const isInput = validateInput(number);
    //  ====================================================
    // email credentials
    const formd = {
      email: `${number}`,
      format: "otp",
    };
    const queryString = buildQueryString(formd);
    try {
      let response;
      if (isInput === "mobile") {
        response = await axios.get(API_URL + "/verify/mobile/" + number);
      } else if (isInput === "email") {
        response = await axios.get(API_URL + "/verify/email?" + queryString);
      } else {
        Swal.fire({
          text: "Please enter a valid email or mobile number",
        });
      }

      if (response.status === 200) {
        Swal.fire({
          text: `We sended you a otp on ${isInput} ${number}`,
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

  const CheckTheUser = async (number) => {
    const isUser = await axios.get(
      API_URL + "/api/get?" + buildQueryString({ field: number })
    );
    setDataFound(isUser);
  };

  return (
    <>
      <marquee
        style={{
          color: "#fff",
          fontWeight: "900",
          background: "#ff0000",
        }}
        behavior="alternate"
        direction="left"
      >
        <h5>
          <b>
            Get 999 INR instantly Credit in your account on Sign Up. Also
            become eligible for refer and earn.
          </b>
        </h5>
      </marquee>
      <div style={{ background: `url(${Reception})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>

        <Grid container pt={0} mt={0} spacing={1}>

          {isMobile ? '' : <Grid sx={{ display: 'grid', placeItems: 'center' }} item xs={0} md={12} lg={7} xl={7}>
            <div className="w-75 h-50 shadow-lg text-center" style={{ background: "rgba(255,255,255,0.011112)", borderRadius: "30px", display: 'grid', placeItems: 'center' }}>
              <Typography
                className="animate__animated animate__backInUp"
                sx={{
                  backgroundImage: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  pl: 1
                }}
                fontWeight={700} variant="h4">
                Get 999 INR instantly Credit in your account on Sign Up. Also
                become eligible for refer and earn.
              </Typography>
            </div>
          </Grid>}
          <Grid sx={{ background: '#e5e7eb', minHeight: '100vh' }} item xs={12} md={12} lg={5} xl={5}>
            <StepsForm />
            <Copyright />
            <div className="d-md-block d-lg-none d-xl-none">
              <MobileFooter />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Signin;
