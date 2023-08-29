import { useRef, useState } from "react";
import style from "./Profile.module.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "../../Components/YourBookings/List";
import { Grid, MenuItem, TextField, ThemeProvider, createTheme } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useEffect } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import EmailIcon from "@mui/icons-material/Email";
import { WaitLoader } from "../../Components/Elements/WaitLoader";
import { useAuthContext } from "../../context/userAuthContext";
import { useNavigate } from "react-router-dom";
import { color } from "framer-motion";

const Profile = () => {
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

  // Logged user data
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update the user details
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("customer"))
  );

  useEffect(() => {
    if (currentUser !== {}) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);

  // State variables
  const [profileUpdateOpen, setProfileUpdateOpen] = useState(false);
  const [profiledetailUpdate, setprofiledetailUpdate] = useState(false)
  const [updateEmail, setUpdateEmail] = useState(false)
  const [updateField, setUpdateField] = useState('Mobile')
  const [passwordUpdateOpen, setPasswordUpdateOpen] = useState(false);
  const [validate, setValidate] = useState(false);
  const [sentOtp, setsentOtp] = useState(false);
  // Profile update modal handlers
  const handleProfileUpdateClose = () => setProfileUpdateOpen(false);
  const handelDetailUpdate = () => setprofiledetailUpdate(false)
  const handelUpdateEmailOpen = () => setUpdateEmail(true)
  const handeleEmailUpdate = () => setUpdateEmail(false)

  // Password update modal handlers
  const handlePasswordUpdateOpen = () => setPasswordUpdateOpen(true);
  const handlePasswordUpdateClose = () => {
    setPasswordUpdateOpen(false);
    setValidate(false);
  };

  const { sendOtp, otpResp, Loader, setLoader } = useAuthContext();

  // otp after sent recieved data
  const [otpData, setotpData] = useState(null);

  // Profile update modal component
  const ProfileUpdateModal = () => {
    // Loader
    // State to track the loading status
    const { Loader, setLoader } = useAuthContext();
    // onchange States
    const [isEmail, setIsEmail] = useState(currentUser.email); // State to track the email input value
    const [isName, setIsName] = useState(currentUser.name); // State to track the name input value

    const styleo = {
      // Styling for the modal
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: '90%',
      bgcolor: "background.paper",
      border: "2px solid #fff",
      filter: "drop-shadow(10px 8px 6px red)",
      borderRadius: "5px",
      boxShadow: 24,
      p: 4,
    };

    if (window.innerWidth >= 960) {
      styleo.width = '50%';
    }

    // Function to update user data
    const UpdateUserData = async () => {
      let formData = {
        name: isName,
        email: isEmail,
      };

      if (isName !== null && isEmail !== null) {
        try {
          setLoader(true); // Show loader
          // Call the API to update user data
          const response = await axios.patch(
            API_URL + "/api/update/" + currentUser._id,
            formData,
            { method: "POST" }
          );

          if (response.status === 200) {
            setLoader(false); // Hide loader
            handleProfileUpdateClose(); // Close the profile update modal
            Swal.fire({
              title: "Updated Successfully",
              icon: "success",
            });
            sessionStorage.setItem(
              "customer",
              JSON.stringify(response.data.data)
            );
            setCurrentUser(JSON.parse(sessionStorage.getItem("customer")));
          }
        } catch (error) {
          setLoader(false); // Hide loader
          Swal.fire({
            title: "Something Error To Update! Try Again",
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "Invalid Input",
          icon: "error",
        });
      }
    };

    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={profileUpdateOpen} // Indicates whether the profile update modal is open or not
          onClose={handleProfileUpdateClose} // Function to handle the close event of the modal
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={profileUpdateOpen}>
            <Box component="form" sx={styleo}>
              {/* Loader */}
              <WaitLoader loading={Loader} />

              <Grid container spacing={2}>
                <Grid xs={12} className="text-center" item>
                  <h3> Edit Your Profile </h3>
                </Grid>
                <ThemeProvider theme={theme}>
                  <Grid xs={12} className="text-center" item>
                    <TextField
                      fullWidth
                      name="name"
                      type="text"
                      label="Enter Full Name"
                      variant="outlined"
                      onChange={(e) => setIsName(e.target.value)} // Update the name state when input value changes
                      value={isName} // Set the input value to the name state
                    />
                  </Grid>
                  <Grid xs={12} className="text-center" item>
                    <TextField
                      fullWidth
                      type="number"
                      name="number"
                      label="Enter Mobile No."
                      variant="outlined"
                      value={currentUser.mobileNo} // Display the current user's mobile number
                    />
                  </Grid>
                  <Grid xs={12} className="text-center" item>
                    <TextField
                      fullWidth
                      type="email"
                      name="email"
                      label="Enter Email Id"
                      variant="outlined"
                      onChange={(e) => setIsEmail(e.target.value)} // Update the email state when input value changes
                      value={isEmail} // Set the input value to the email state
                    />
                  </Grid>
                </ThemeProvider>
                <Grid xs={6} className="text-center" item>
                  <Button
                    onClick={handleProfileUpdateClose}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid xs={6} className="text-center" item>
                  <Button
                    variant="contained"
                    onClick={UpdateUserData}
                    color="error"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  };

  // Profile Detail update modal component
  const ProfileDetailUpdateModal = ({ profiledetailUpdate, handelDetailUpdate, currentUser }) => {

    const [formData, setFormData] = useState({});

    const handleFieldChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Form Data:', formData); // Log the form data
      // You can add logic to handle form submission here
    };

    const styleo = {
      // Styling for the modal
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: '90%',
      bgcolor: "background.paper",
      border: "2px solid #fff",
      borderRadius: "5px",
      boxShadow: 24,
      p: 2,
    };

    if (window.innerWidth >= 960) {
      styleo.width = '50%';
    }

    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={profiledetailUpdate} // Indicates whether the profile update modal is open or not
          onClose={handelDetailUpdate} // Function to handle the close event of the modal
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={profiledetailUpdate}>
            <Box component="form" sx={styleo}>
              {/* Loader */}
              <form onSubmit={handleSubmit}>

                <Grid container spacing={2}>
                  <Grid xs={12} className="text-center" item>
                    <h3> Edit Your Profile </h3>
                  </Grid>
                  <ThemeProvider theme={theme}>
                    <Grid xs={12} lg={6} xl={6} className="text-center" item>
                      <TextField
                        name="name"
                        fullWidth
                        required
                        id="outlined-required"
                        label="Full Name"
                        value={formData.name || currentUser.name}
                        onChange={handleFieldChange}
                      />
                    </Grid>
                    <Grid xs={12} lg={6} xl={6} className="text-center" item>
                      <TextField
                        fullWidth
                        type="date"
                        name="birthDate"
                        label="Select a Date"
                        variant="outlined"
                        value={formData.birthDate}
                        onChange={handleFieldChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid xs={12} lg={6} xl={6} className="text-center" item>
                      <TextField
                        fullWidth
                        select
                        name="gender"
                        label="Gender"
                        variant="outlined"
                        value={formData.gender}
                        onChange={handleFieldChange}
                      >
                        {/* Add your select options here */}
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </TextField>

                    </Grid>
                    <Grid xs={12} lg={6} xl={6} className="text-center" item>
                      <TextField
                        fullWidth
                        select
                        name="maritalStatus"
                        label="Marital Status"
                        variant="outlined"
                        value={formData.maritalStatus}
                        onChange={handleFieldChange}
                      >
                        {/* Add your select options here */}
                        <MenuItem value="single">Single</MenuItem>
                        <MenuItem value="married">Married</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid xs={12} lg={6} xl={6} className="text-center" item>
                      <TextField
                        fullWidth
                        required
                        name="address"
                        id="outlined-required"
                        label="Your Address"
                        value={formData.address}
                        onChange={handleFieldChange}
                      />
                    </Grid>
                    <Grid xs={12} lg={6} xl={6} className="text-center" item>
                      <TextField
                        fullWidth
                        required
                        type="number"
                        name="pincode"
                        id="outlined-required"
                        label="Pincode"
                        value={formData.pincode}
                        onChange={handleFieldChange}
                      />
                    </Grid>
                    <Grid xs={12} lg={6} xl={6} className="text-center" item>
                      <TextField
                        fullWidth
                        select
                        name="state"
                        label="State"
                        variant="outlined"
                        value={formData.state}
                        onChange={handleFieldChange}
                      >
                        {/* Add your select options here */}
                        <MenuItem value="option1">Uttar Pradesh</MenuItem>
                        <MenuItem value="option2">Bihar</MenuItem>
                      </TextField>
                    </Grid>
                  </ThemeProvider>

                </Grid>
                <div className="d-flex justify-content-evenly py-3">
                  <Button
                    onClick={handelDetailUpdate}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handelDetailUpdate}
                    color="error"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  };

  // Email and Mobile No add modal component
  const AddEmailId = ({ updateEmail, updateField, handeleEmailUpdate, sentOtp, setsentOtp }) => {
    // State variables

    const [formData, setFormData] = useState({}); // Store form data

    // Handle input field changes
    const handleFieldChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    // State for OTP input
    const [otp, setOtp] = useState('');

    // Handle OTP input change
    const handleChange = (newValue) => {
      setOtp(newValue);
    };

    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Form Data:', formData); // Log the form data
      // You can add logic to handle form submission here
    };

    const styleo = {
      // Styling for the modal
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: '90%',
      bgcolor: "background.paper",
      border: "2px solid #fff",
      borderRadius: "5px",
      boxShadow: 24,
      p: 2,
    };

    if (window.innerWidth >= 960) {
      styleo.width = '30%';
    }

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
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid xs={12} className="text-center" item>
                    <h3> Add your {updateField} </h3>
                  </Grid>
                  <ThemeProvider theme={theme}>
                    {sentOtp ? (
                      <Grid xs={12} className="text-center" item>
                        <MuiOtpInput value={otp} onChange={handleChange} />
                      </Grid>
                    ) : (
                      <Grid xs={12} className="text-center" item>
                        <TextField
                          name="name"
                          fullWidth
                          required
                          type="text"
                          id="outlined-required"
                          label={`Enter your ${updateField}`}
                          onChange={handleFieldChange} // Update form data on input change
                          value={formData.name || ''} // Set value based on form data
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
                  {sentOtp ? (
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={() => setsentOtp(true)}
                      color="error"
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setsentOtp(true)}
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




  // Password update modal component
  const PasswordUpdateModal = () => {
    const [otp, setOtp] = useState("");

    const handleChange = (newValue) => {
      setOtp(newValue);
    };

    // Timer
    const [seconds, setSeconds] = useState(120);

    useEffect(() => {
      if (seconds > 0) {
        const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
        return () => clearTimeout(timerId);
      }
    }, [seconds]);

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    };

    // new passwords
    const [updatedPassword, setUpdatedPassword] = useState(null);
    const [confirmUpdatedPassword, setConfirmUpdatedPassword] = useState(null);

    // Verify Otp and submit to update
    const HandleChangePassword = async (otpResp) => {
      const formdata = {
        id: otpResp,
        otp: otp,
        password: updatedPassword,
      };
      // put the req to change the password
      try {
        setLoader(true);
        const isChanged = await axios.post(
          API_URL + "/api/update-pass/" + currentUser._id,
          formdata
        );

        if (isChanged.status === 200) {
          setLoader(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Password Changed Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          sessionStorage.setItem(
            "customer",
            JSON.stringify(isChanged.data.data)
          );
          setCurrentUser(JSON.parse(sessionStorage.getItem("customer")));
          handlePasswordUpdateClose();
        } else {
          setLoader(false);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to Change Password",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    };

    const styleo = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #fff",
      // filter: "drop-shadow(10px 8px 6px red)",
      borderRadius: "5px",
      boxShadow: 24,
      p: 3,
    };

    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={passwordUpdateOpen}
          onClose={handlePasswordUpdateClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={passwordUpdateOpen}>
            <Box component="form" sx={styleo}>
              {/* <h6 className="d-flex align-items-center justify-content-center gap-3">
                {formatTime(seconds)}{" "}
                <Button
                  style={{ cursor: "pointer", zIndex: "4", userSelect: "none" }}
                  className="text-error h-100 w-100"
                  variant="outlined"
                  disabled={seconds > 10 ? true : false}
                  color={"primary"}
                >
                  Resend otp
                </Button>
              </h6> */}
              <Grid container spacing={2}>
                <Grid xs={12} className="text-center" item>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    we sent you a otp on you number {currentUser.mobileNo}
                  </Typography>
                </Grid>
                <Grid xs={12} className="text-center" item>
                  <MuiOtpInput value={otp} onChange={handleChange} />
                </Grid>
                <Grid xs={12} className="text-center my-3" item>
                  <TextField
                    fullWidth
                    type="password"
                    label="Enter Password"
                    variant="outlined"
                    value={updatedPassword}
                    onChange={(e) => setUpdatedPassword(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} className="text-center" item>
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    onChange={(e) => {
                      setConfirmUpdatedPassword(e.target.value);
                    }}
                    value={confirmUpdatedPassword}
                  />
                </Grid>
                <Grid xs={6} className="text-center my-3" item>
                  <Button
                    onClick={handlePasswordUpdateClose}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid xs={6} className="text-center my-3" item>
                  <Button
                    onClick={() => HandleChangePassword(otpResp.data)}
                    variant="contained"
                    color="error"
                    disabled={updatedPassword !== confirmUpdatedPassword}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  };

  const sendNewOtp = (number) => {
    sendOtp(number).then(() => {
      if (otpResp) {
        handlePasswordUpdateOpen();
      }
    });
  };
  // sendOtpFunction
  // const sendOtpToNumber = async () => {
  //   try {
  //     setLoader(true);
  //     const isSended = await axios.get(
  //       API_URL + "/verify/mobile/" + currentUser.mobileNo
  //     );
  //     if (isSended.status === 200) {
  //       setLoader(false);
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Otp Sent Successfully",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });

  //       setotpData(isSended.data);
  //     } else {
  //       setLoader(false);
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "error",
  //         title: "Otp Failed To sent Try Again After Sometime",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //   } catch (error) {
  //     setLoader(false);
  //     console.log(error);
  //   }
  // };

  const navigate = useNavigate()
  const userMobileNo = currentUser.mobileNo || 'Add'
  const userEmailId = currentUser.email || 'Add'

  const HandleLogOutCustomer = () => {
    sessionStorage.removeItem("customer");
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Log Out Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    setCurrentUser(sessionStorage.getItem("customer"));
    navigate("/");
  };
  // useEffect(() => {
  //   if (currentUser !== {}) {
  //     setIsLoggedIn(true);
  //   }
  // }, [currentUser]);

  return (
    <div>
      <Grid container className="min-vh-100 my-5" spacing={2}>
        <WaitLoader loading={Loader} />
        <Grid xs={12} className="text-center" item>
          <h3 className="py-3">
            Welcome to Hotelio! Please Update YourProfile
          </h3>
          <p>Membership Offer Coming Soon</p>
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4}>
          <div className={`${style.box}`}>
            <div className="d-flex justify-content-between">
              <p><b>My Profile</b></p>
              <div style={{ color: '#ee2e24', cursor: 'pointer' }} onClick={() => setprofiledetailUpdate(true)} ><u>Edit Details</u></div>
            </div>
            <div className={` ${style.content}`}>
              {/* <div className={` ${style.image}`}>
                <img
                  src="https://i.postimg.cc/bryMmCQB/profile-image.jpg"
                  alt="Profile Image"
                />
              </div> */}
              <div className="pb-2">
                <div>
                  <span style={{ color: '#ee2e24' }}>Full Name</span>
                  <h4><b>{currentUser ? currentUser.name : "Your Name"}</b></h4>
                </div>
              </div>
              <div className="d-flex justify-content-between pb-3">
                <div>
                  <span style={{ color: '#ee2e24' }}>Gender</span>
                  <h5>NA</h5>
                </div>
                <div>
                  <span style={{ color: '#ee2e24' }}>Marital Status</span>
                  <h5>NA</h5>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center pb-2">
                <div>
                  <span style={{ color: '#ee2e24' }}>Mobile No.</span>
                  <div className="d-flex justify-content-center align-items-center">
                    <h6 className={` mt-0 ${style.job_discription}`}>
                      {userMobileNo === currentUser.mobileNo ? <MobileFriendlyIcon /> : null}{" "}
                      {userMobileNo === currentUser.mobileNo ? userMobileNo :
                        <Button variant="text" onClick={() => { handelUpdateEmailOpen(); setUpdateField('Mobile No') }} >ADD</Button>}
                    </h6>
                    {userMobileNo === currentUser.mobileNo ? <div className={` ${style.level}`}>
                      <VerifiedRoundedIcon />
                    </div> : null}
                  </div>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center pb-2">
                <div>
                  <span style={{ color: '#ee2e24' }}>Email Id</span>
                  <div className="d-flex justify-content-center align-items-center">
                    <h6 className={` mt-0 ${style.job_discription}`}>
                      {userEmailId === currentUser.email ? <EmailIcon /> : null}{" "}
                      {userEmailId === currentUser.email ? userEmailId :

                        <Button variant="text" onClick={() => { handelUpdateEmailOpen(); setUpdateField('Email Id') }} >ADD</Button>}
                    </h6>
                    {userEmailId === currentUser.email ? <div className={` ${style.level}`}>
                      <VerifiedRoundedIcon />
                    </div> : null}
                  </div>
                </div>
              </div>
              <hr />
              <div className="d-flex pb-2">
                <div>
                  <span style={{ color: '#ee2e24' }}>Birthday</span>
                  <h5>NA</h5>
                </div>
              </div>
              <hr />
              <div className="d-flex pb-2">
                <div>
                  <span style={{ color: '#ee2e24' }}>Your Adress</span>
                  <h5>NA</h5>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between pb-2">
                <div>
                  <span style={{ color: '#ee2e24' }}>State</span>
                  <h5>NA</h5>
                </div>
                <div>
                  <span style={{ color: '#ee2e24' }}>Pincode</span>
                  <h5>NA</h5>
                </div>
              </div>
              <hr />
              <div
                className={`mt-1 d-flex justify-content-evenly align-items-center ${style.button}`}
              >
                {currentUser ? (
                  <TextField
                    type="password"
                    margin="normal"
                    value={currentUser ? currentUser.password : null}
                    id="standard-basic"
                    label="Password"
                    variant="outlined"
                  />
                ) : null}
                <div>
                  <Button
                    color="error"
                    variant="text"
                    className={` ${style.connect}`}
                    type="button"
                    // onClick={() => sendOtpToNumber()}
                    onClick={() => {
                      sendNewOtp(
                        currentUser.mobileNo !== undefined
                          ? currentUser.mobileNo
                          : currentUser.email
                      );
                    }}
                  >
                    Update Password
                  </Button>
                </div>
              </div>
              <div className="p-2 ">
                <Button sx={{ color: '#ee2e24', border: ' 1px solid #ee2e24' }} onClick={HandleLogOutCustomer} fullWidth variant="outlined">LogOut</Button>
              </div>
            </div>
          </div>
          <ProfileUpdateModal />
          <PasswordUpdateModal />
          <ProfileDetailUpdateModal profiledetailUpdate={profiledetailUpdate} handelDetailUpdate={handelDetailUpdate} currentUser={currentUser} />
          <AddEmailId handeleEmailUpdate={handeleEmailUpdate} updateField={updateField} updateEmail={updateEmail} sentOtp={sentOtp} setsentOtp={setsentOtp} />
        </Grid>
        <Grid item xs={12} md={12} lg={8} xl={8} className="d-none d-sm-block" >
          <div
            style={{
              overflowY: "auto",
              maxHeight: "100vh",
              paddingBottom: "10rem",
            }}
            className={` ${style.box}`}
          >
            <List />
          </div>
        </Grid>
      </Grid>
    </div >
  );
};

export default Profile;
