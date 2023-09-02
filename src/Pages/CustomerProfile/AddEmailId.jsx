import { Backdrop, Box, Button, Fade, Grid, Modal, TextField, ThemeProvider, createTheme } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import React, { useState } from 'react'

const AddEmailId = ({ updateEmail, updateField, handeleEmailUpdate, sentOtp, setsentOtp }) => {
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

export default AddEmailId