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
import { buildQueryString, validateInput } from "../../Utilis/_fuctions";
import StepsForm from "./StepsForm";

const Signin = () => {
  // code for loader top

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            "& .MuiInputBase-input:focus": {
              backgroundColor: "#fff",
            },
            "& .MuiInput-underline::before": {
              borderBottom: "2px solid #ee2e24",
            },
            "& .MuiInput-underline::after": {
              borderBottom: "2px solid #ee2e24",
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
        sessionStorage.setItem("customer", JSON.stringify(data));
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
    <div style={{ background: 'url(https://assets.cntraveller.in/photos/63b80c6d79d81704e445df00/master/pass/Westin%20Himalayas%20facade.jpg)', backgroundSize: 'cover', minHeight: '100vh' }}>
      <Grid container mt={0} spacing={2}>
        <Grid className="d-none d-sm-block" item xs={12} md={12} lg={7} xl={7}>
          <div className="text-center">
            <img
              src={LoginLogo}
              alt="Main"
              className="animate__animated animate__fadeInDown"
              style={{ width: "260px", height: "200px" }}
            />
            <Typography className="animate__animated animate__backInUp" fontWeight={800} color={"white"} variant="h4">Welcome To Hotelio, Your Travel Partner</Typography>
          </div>
        </Grid>
        <Grid sx={{ background: '#ffffff', minHeight: '100vh' }} item xs={12} md={12} lg={5} xl={5}>
          <StepsForm />
          <div className="d-md-block d-lg-none d-xl-none">
            <MobileFooter />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signin;
