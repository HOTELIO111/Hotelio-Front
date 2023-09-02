import { Backdrop, Box, Button, Fade, Grid, MenuItem, Modal, TextField, ThemeProvider, createTheme } from '@mui/material';
import React, { useState } from 'react'

const ProfileDetailUpdateModal = ({ profiledetailUpdate, handelDetailUpdate, currentUser }) => {

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

export default ProfileDetailUpdateModal