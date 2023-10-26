import { Backdrop, Box, Button, Fade, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/userAuthContext';
import { API_URL } from '../../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MuiOtpInput } from 'mui-one-time-password-input';

const PasswordUpdateModal = ({ passwordUpdateOpen, setPasswordUpdateOpen }) => {

    const { sendOtp, otpResp, Loader, setLoader } = useAuthContext();
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
    const [validate, setValidate] = useState(false);
    const [profileUpdateOpen, setProfileUpdateOpen] = useState(false);
    const [confirmUpdatedPassword, setConfirmUpdatedPassword] = useState(null);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(window.localStorage.getItem("customer"))
    );

    const handleProfileUpdateClose = () => setProfileUpdateOpen(false);
    const handlePasswordUpdateClose = () => {
        setPasswordUpdateOpen(false);
        setValidate(false);
    };

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
                setCurrentUser(JSON.parse(window.localStorage.getItem("customer")));
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
        width: '90%',
        bgcolor: "background.paper",
        border: "2px solid #fff",
        // filter: "drop-shadow(10px 8px 6px red)",
        borderRadius: "5px",
        boxShadow: 24,
        p: 3,
    };

    if (window.innerWidth >= 960) {
        styleo.width = '50%';
      }

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

                        <Grid container spacing={2}>
                            <Grid xs={12} className="text-center" item>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    we sent you a otp on you number {currentUser?.mobileNo}
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

export default PasswordUpdateModal