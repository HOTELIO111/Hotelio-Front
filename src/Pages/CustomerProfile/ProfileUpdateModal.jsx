import { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Grid, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useAuthContext } from '../../context/userAuthContext';
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../../config";
import { WaitLoader } from "../../Components/Elements/WaitLoader";


const ProfileUpdateModal = () => {
  // Loader
  // State to track the loading status
  const { Loader, setLoader } = useAuthContext();
  const [profileUpdateOpen, setProfileUpdateOpen] = useState(false);
  // onchange States
  const handleProfileUpdateClose = () => setProfileUpdateOpen(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("customer"))
  );

  const [isEmail, setIsEmail] = useState(currentUser.email); // State to track the email input value
  const [isName, setIsName] = useState(currentUser.name); // State to track the name input value
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

export default ProfileUpdateModal;