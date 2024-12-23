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
import { NavLink, useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import {
  buildQueryString,
  validateInput,
} from "../../Utilis/_fuctions";
import { API_URL } from "../../config";
import Swal from "sweetalert2";
import { WaitLoader } from "../../Components/Elements/WaitLoader";
import { useAuthContext } from "../../context/userAuthContext";
import { isMobile } from "react-device-detect";

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
              borderBottom: "2px solid #ee2e24",
            },
            "& .MuiInput-underline::after": {
              borderBottom: "2px solid #ee2e24",
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

  const {
    setIsUser,
    isUser,
    Loader,
    setLoader,
    login,
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
        navigate(-1); // Assuming 'navigate' is properly defined
        setLoader(false);
        const responseData = response.data.data;
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("customer", JSON.stringify(responseData));
        setCurrentUser(responseData);
        Swal.fire({
          title: "Successfully Logged In",
          icon: "success",
          text: `Welcome ${responseData.name}`,
        });
      } else if (response.status === 201) {
        setIsUser(response.data.data);
        localStorage.setItem("customer", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.token);
        handleNext();
      } else {
        Swal.fire({
          text: `Invalid Otp And Password`,
          icon: "error",
        });
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
      if (isInput === "mobileNo") {
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
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setIsUser(response.data.data);
        setLoader(false);
        Swal.fire({ icon: "success", text: "Login Successfully" });
        window.localStorage.setItem(
          "customer",
          JSON.stringify(response.data.data)
        );
        navigate(-1);
      }
    } catch (error) {
      setLoader(false);
      Swal.fire({
        text: "login failed please try agai",
        icon: "error",
      });
    }
  };

  //   check the user and update
  const CheckTheUser = async (number) => {
    try {
      const newUser = await axios.get(
        API_URL + "/api/get?" + buildQueryString({ field: number }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsUser(newUser.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // before update Login

  const LoginBeforeUpdate = (data) => {
    Swal.fire({
      icon: "success",
      text: "Login successfully",
    });
    navigate(-1);
  };
  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <Grid p={1} container spacing={1} textAlign={"center"}>
            <ThemeProvider theme={theme}>
              <Grid item xs={12} textAlign={"center"}>
                <TextField
                  margin="normal"
                  required
                  type="text"
                  // fullWidth
                  onChange={handleChange}
                  id="mobileNo"
                  value={formData.mobileNo || ""}
                  sx={{ mt: 2, width: 300 }}
                  label="Mobile Number / Email Id"
                  name="mobileNo"
                  autoComplete="mobileNo"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} >
                <div className="d-flex justify-content-center align-items-center mt-2">
                  <hr style={{ width: "100px" }} />
                  <Typography
                    className={isMobile ? "px-1" : "px-3"}
                    variant="caption"
                  >
                    Or Login/Signup With
                  </Typography>
                  <hr style={{ width: "100px" }} />
                </div>
              </Grid>
              <Grid item xs={12} justifyContent={"center"}>
                <div className="d-flex align-items-center justify-content-center mt-2 mb-4">
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
              <Grid item xs={12} textAlign={"center"} >
                <Button
                  onClick={() => sendOtp(formData.mobileNo)}
                  type="button"
                  variant="contained"
                  className="animate__animated animate__flipInX"
                  color="error"
                  sx={{ mt: 0, mb: 2, width: 300 }}
                >
                  Continue
                </Button>
              </Grid>
            </ThemeProvider>

            <Button
              onClick={() => navigate("/")}
              fullWidth
              type="button"
              variant="text"
              color="error"
              sx={{ mt: 1, mb: 3 }}
            >
              I will do later
            </Button>
          </Grid>
        );
      case 2:
        return (
          <Grid p={2} container spacing={1}>
            <ThemeProvider theme={theme}>
              <Grid item xs={12} textAlign={"center"}>
                <h4 className="pb-4">Enter OTP</h4>
                <center>
                  <MuiOtpInput sx={{ width: 300 }} value={inputOtp} onChange={handleOtp} />
                </center>
              </Grid>
              {isUser ? (
                <>
                  <Grid item xs={12} textAlign={"center"}>
                    <div className="d-flex justify-content-center align-items-center mt-2 text-nowrap">
                      <hr style={{ width: "120px" }} />
                      <Typography className="px-3" variant="caption">
                        Or
                      </Typography>
                      <hr style={{ width: "120px" }} />
                    </div>
                  </Grid>
                  <Grid item xs={12} textAlign={"center"}>
                    <TextField
                      required
                      // fullWidth
                      onChange={handleChange}
                      id="password"
                      value={formData.password || null}
                      label="Enter Your Password"
                      name="password"
                      autoComplete="password"
                      sx={{ width: 300 }}
                      autoFocus
                    />
                  </Grid>
                </>
              ) : null}
            </ThemeProvider>
            <Grid item xs={12} textAlign={"center"}>
              <Button
                onClick={handlePrevious}
                type="button"
                variant="outlined"
                color="error"
                sx={{ m: 1, mb: 2 }}
              >
                Back
              </Button>

              <Button
                onClick={() => handleCreateAccount(formData)}
                type="button"
                variant="contained"
                color="error"
                sx={{ m: 1, mb: 2 }}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={2}>
            <ThemeProvider theme={theme}>
              <Grid item xs={12} textAlign={"center"}>
                <TextField
                  margin="normal"
                  required
                  onChange={handleChange}
                  value={formData.name}
                  name="name"
                  label="Enter Your Full Name"
                  autoComplete="name"
                  autoFocus
                  sx={{ width: 300 }}
                /> <br />
                <TextField
                  margin="normal"
                  sx={{ width: 300 }}
                  required
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
              <Grid item xs={12} textAlign={"center"}>
                <Button
                  onClick={handlePrevious}
                  type="button"
                  variant="outlined"
                  color="error"
                  sx={{ m: 1 }}
                >
                  Back
                </Button>
                <Button
                  onClick={() => handleUpdateFinal(formData, isUser._id)}
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{ m: 1 }}
                >
                  Login
                </Button>
              </Grid>
              <Button
                onClick={() => LoginBeforeUpdate(isUser)}
                fullWidth
                type="button"
                variant="text"
                color="error"
                sx={{ m: 1 }}
              >
                I will do later
              </Button>
            </ThemeProvider>
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
        <NavLink to="/">
          <img
            src={LoginMoto}
            alt="Main"
            style={{ width: "260px", height: "150px" }}
          />
        </NavLink>
        <Typography variant={isMobile ? 'h4' : 'h3'}
          sx={{
            backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            pl: 1
          }}
          fontWeight={700}>
          Welcome To Hotelio, Your Travel Partner
        </Typography>
        <Typography variant="h5" gutterBottom>
          Customer Login / Signup
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>{renderForm()}</form>
    </>
  );
};

export default StepsForm;
