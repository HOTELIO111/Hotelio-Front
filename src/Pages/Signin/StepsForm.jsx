import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import LoginMoto from "../../images/HotelioLogo.png";
import { FcGoogle } from "react-icons/fc";
import { Navigate, useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { buildQueryString, validateInput } from "../../Utilis/_fuctions";
import { API_URL } from "../../config";
import Swal from "sweetalert2";
import { WaitLoader } from "../../Components/Elements/WaitLoader";
import { useAuthContext } from "../../context/userAuthContext";

const StepsForm = () => {
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
              borderBottom: "2px solid #ee2e24", // Change to your desired active color
            },
            "& .MuiInput-underline::after": {
              borderBottom: "2px solid #ee2e24", // Change to your desired active color
            },
          },
        },
      },
    },
  });

  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputOtp, setInputOtp] = useState("");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    password: "",
  });
  //  current user and set current user

  // fuctions form the userAuthcontext =
  const {
    setIsUser,
    isUser,
    Loader,
    setLoader,
    login,
    logOut,
    currentUser,
    setCurrentUser,
  } = useAuthContext();

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
    console.log("Form submitted:", formData);
  };
  // handler to opt update
  const handleOtp = (newValue) => {
    setInputOtp(newValue);
  };

  //   Handler to create account
  const handleCreateAccount = async (data) => {
    setLoader(true);

    // Assuming 'inputOtp' is defined somewhere
    const formd = { ...data, otp: inputOtp };
    delete formd.name;

    try {
      // Construct the query string manually
      const queryString = Object.keys(formd)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(formd[key])
        )
        .join("&");

      const response = await axios.get(
        API_URL + `/api/authenticate?` + queryString
      );

      if (response.status === 200) {
        navigate("/"); // Assuming 'navigate' is properly defined
        setLoader(false);
        const responseData = response.data.data;
        sessionStorage.setItem("customer", JSON.stringify(responseData));
        setCurrentUser(responseData);
        Swal.fire({
          title: "Successfully Logged In",
          icon: "success",
          text: `Welcome ${responseData.name}`,
        });
      } else if (response.status === 201) {
        setIsUser(response.data.data);
        handleNext(); // Assuming 'handleNext' is properly defined
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Login Failed",
        icon: "error",
        text: "Login Failed. Please try again.",
      });
    } finally {
      setLoader(false);
    }
  };

  const sendOtp = async (number) => {
    CheckTheUser(number);
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
        handleNext();
        setLoader(false);
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

  const handleUpdateFinal = async (formdata, createdUserid) => {
    setLoader(true);
    try {
      const response = await axios.patch(
        API_URL + "/api/update/" + createdUserid,
        formdata
      );
      if (response.status === 200) {
        setIsUser(response.data.data);
        setLoader(false);
        Swal.fire({ icon: "success", text: "Login Successfully" });
        sessionStorage.setItem("customer", JSON.stringify(response.data.data));
        navigate("/");
      }
    } catch (error) {
      setLoader(false);
      Swal.fire({
        text: "login failed please try again",
        icon: "error",
      });
    }
  };

  //   check the user and update
  const CheckTheUser = async (number) => {
    try {
      const newUser = await axios.get(
        API_URL + "/api/get?" + buildQueryString({ field: number })
      );
      setIsUser(newUser.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // before update Login

  const LoginBeforeUpdate = (data) => {
    sessionStorage.setItem("customer", JSON.stringify(data));
    Swal.fire({
      icon: "success",
      text: "Login successfully",
    });
    navigate("/");
  };
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
                  id="mobileNo"
                  value={formData.mobileNo || ""}
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
              <Grid item xs={12} justifyContent={"center"}>
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
                    onClick={() => login()}
                  >
                    <FcGoogle size={30} />
                  </div>
                </div>
              </Grid>
            </ThemeProvider>
            <Button
              onClick={() => sendOtp(formData.mobileNo)}
              fullWidth
              type="button"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
            <Button
              onClick={() => navigate("/")}
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
                <MuiOtpInput value={inputOtp} onChange={handleOtp} />
              </Grid>
              {isUser ? (
                <>
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
                      value={formData.password || null}
                      label="Enter Your Password"
                      name="password"
                      autoComplete="password"
                      autoFocus
                    />
                  </Grid>
                </>
              ) : null}
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
                onClick={() => handleCreateAccount(formData)}
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
                  value={formData.password || ""}
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
                onClick={() => handleUpdateFinal(formData, isUser._id)}
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Grid>
            <Button
              onClick={() => LoginBeforeUpdate(isUser)}
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
      <div className="text-center">
        <WaitLoader loading={Loader} />
        <img
          src={LoginMoto}
          alt="Main"
          style={{ width: "260px", height: "200px" }}
        />
        <Typography variant="h5" gutterBottom>
          Customer Login / Signup
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>{renderForm()}</form>
    </>
  );
};

export default StepsForm;
