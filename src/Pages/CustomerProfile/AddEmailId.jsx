import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import React, { useState } from "react";
import { useAuthContext } from "../../context/userAuthContext";
import { WaitLoader } from "../../Components/Elements/WaitLoader";
import { buildQueryString, validateInput } from "../../Utilis/_fuctions";
import { API_URL } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";

const AddEmailId = ({ updateEmail, updateField, handeleEmailUpdate }) => {
  // funtion for otp fire and update
  const { AddEmailAndMobile, currentUser } = useAuthContext();
  const [otpResp, setOtpResp] = useState("");
  const [sentOtp, setsentOtp] = useState("");
  const [loader, setLoader] = useState(false);
  // State variables
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

  const [email, setEmail] = useState("");

  // State for OTP input
  const [otp, setOtp] = useState("");

  // Handle OTP input change
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    setLoader(true);
    event.preventDefault();
    const data = {};
    data[`${validateInput(email)}`] = email;
    console.log(data);
    AddEmailAndMobile(email, otp, otpResp.data, currentUser._id)
      .then((result) => {
        handeleEmailUpdate();
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
    // setsentOtp(true); // Log the form data
    // You can add logic to handle form submission here
  };

  const styleo = {
    // Styling for the modal
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #fff",
    borderRadius: "5px",
    boxShadow: 24,
    zIndex: 1,
    p: 2,
  };

  if (window.innerWidth >= 960) {
    styleo.width = "30%";
  }

  //   // send otp
  //   const OtpSendToCredential = (number) => {
  //     if (!number) throw "enter a valid email or mobile number";
  //     sendOtp(number)
  //       .then((result) => {
  //         setsentOtp(true);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  const sendOtp = async (number) => {
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
        response = await axios.get(API_URL + "/verify/mobile/" + number, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else if (isInput === "email") {
        response = await axios.get(API_URL + "/verify/email?" + queryString, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        Swal.fire({
          text: "Please enter a valid email or mobile number",
        });
      }

      if (response.status === 200) {
        setLoader(false);
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: `We sended you a otp on ${isInput} ${number}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setOtpResp(response.data);
        // handleNext();
      } else {
        setLoader(false);
        Swal.fire({
          title: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      setLoader(false);
      Swal.fire({
        title: "Otp Send Failed ! Try Again",
        icon: "error",
      });
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={updateEmail} // Indicates whether the modal is open or not
        onClose={handeleEmailUpdate} // Function to handle the close event of the modal
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={updateEmail}>
          <Box component="form" sx={styleo}>
            <WaitLoader loading={loader} />
            <form>
              <Grid container spacing={2}>
                <Grid xs={12} className="text-center" item>
                  <h3> Add your {updateField} </h3>
                </Grid>
                <ThemeProvider theme={theme}>
                  {otpResp ? (
                    <Grid xs={12} className="text-center" item>
                      <MuiOtpInput value={otp} onChange={handleChange} />
                    </Grid>
                  ) : (
                    <Grid xs={12} className="text-center" item>
                      <TextField
                        name="email"
                        fullWidth
                        required
                        type="text"
                        id="outlined-required"
                        label={`Enter your ${updateField}`}
                        onChange={(e) => setEmail(e.target.value)} // Update form data on input change
                        value={email} // Set value based on form data
                      />
                    </Grid>
                  )}
                </ThemeProvider>
              </Grid>
              <div className="d-flex justify-content-evenly py-3">
                <Button
                  onClick={handeleEmailUpdate}
                  variant="outlined"
                  color="error"
                >
                  Cancel
                </Button>
                {otpResp ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    color="error"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => sendOtp(email)}
                    color="error"
                  >
                    Verify
                  </Button>
                )}
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddEmailId;
