import React from 'react'
import TravelHeader from '../../Components/Travel Partner Components/TravelHeader'
import { Button, Card, Grid, Input, TextField, Typography } from '@mui/material';
import { WaitLoader } from '../../Components/Elements/WaitLoader';
import EmailIcon from "@mui/icons-material/Email";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import style from '../CustomerProfile/Profile.module.css'
import { useAuthContext } from '../../context/userAuthContext';
import { isMobile } from 'react-device-detect';
import moment from "moment/moment";
import { useState } from 'react';
import List from "../../Components/YourBookings/List";

const TravelProfile = () => {

    const { sendOtp, otpResp, Loader, setLoader, currentUser, setCurrentUser } =
        useAuthContext();
    const userMobileNo = currentUser?.mobileNo || "Add";
    const userEmailId = currentUser?.email || "Add";


    return (
        <div>
            <Grid container className={isMobile ? 'mb-5' : "min-vh-100"} spacing={1}>
                <WaitLoader loading={Loader} />
                <Grid xs={12} item>
                    <Typography variant='h5' pt={2}>My Profile</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={4} xl={4}>
                    <div className={`${style.box}`}>
                        <div className="d-flex justify-content-between">
                            <Typography variant="h6">
                                <b>My Profile</b>
                            </Typography>
                            <div
                                style={{ color: "#ee2e24", cursor: "pointer" }}
                            >
                                <u>Edit Details</u>
                            </div>
                        </div>
                        <div className={` ${style.content}`}>
                            <div className="pb-2">
                                <div>
                                    <span style={{ color: "#ee2e24" }}>Full Name</span>
                                    <h5>
                                        <b>{currentUser ? currentUser.name : "Your Name"}</b>
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between pb-1">
                                <div>
                                    <span style={{ color: "#ee2e24" }}>Gender</span>
                                    <h6>{currentUser?.gender}</h6>
                                </div>
                                <div>
                                    <span style={{ color: "#ee2e24" }}>Marital Status</span>
                                    <h6>{currentUser?.maritialStatus}</h6>
                                </div>
                            </div>
                            <hr style={{ margin: '0.2rem 0rem' }} />
                            <div className="d-flex align-items-center pb-1">
                                <div>
                                    <span style={{ color: "#ee2e24" }}>Mobile No.</span>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <h6 className={` mt-0 ${style.job_discription}`}>
                                            {userMobileNo === currentUser.mobileNo ? (
                                                <MobileFriendlyIcon />
                                            ) : null}{" "}
                                            {userMobileNo === currentUser.mobileNo ? (
                                                userMobileNo
                                            ) : (
                                                <Button
                                                    variant="text"
                                                >
                                                    ADD
                                                </Button>
                                            )}
                                        </h6>
                                        {userMobileNo === currentUser.mobileNo ? (
                                            <div className={` ${style.level}`}>
                                                <VerifiedRoundedIcon />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <hr style={{ margin: '0.2rem 0rem' }} />
                            <div className="d-flex align-items-center pb-1">
                                <div>
                                    <span style={{ color: "#ee2e24" }}>Email Id</span>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <h6 className={` mt-0 ${style.job_discription}`}>
                                            {userEmailId === currentUser.email ? <EmailIcon /> : null}{" "}
                                            {userEmailId === currentUser.email ? (
                                                userEmailId
                                            ) : (
                                                <Button
                                                    variant="text"

                                                >
                                                    ADD
                                                </Button>
                                            )}
                                        </h6>
                                        {userEmailId === currentUser.email ? (
                                            <div className={` ${style.level}`}>
                                                <VerifiedRoundedIcon />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <hr style={{ margin: '0.2rem 0rem' }} />
                            <div className="d-flex pb-1">
                                <div>
                                    <span style={{ color: "#ee2e24" }}>Birthday</span>
                                    <h6>
                                        {moment(currentUser?.birthday).format("DD-MMMM-YYYY")}
                                    </h6>
                                </div>
                            </div>
                            <hr style={{ margin: '0.2rem 0rem' }} />
                            <div className="d-flex pb-2">
                                <div>
                                    <span style={{ color: "#ee2e24" }}>Your Address</span>
                                    <h6>{currentUser?.address}</h6>
                                </div>
                            </div>
                            <hr style={{ margin: '0.2rem 0rem' }} />
                            <div className="d-flex justify-content-between pb-2">
                                <div>
                                    <span style={{ color: "#ee2e24" }}>State</span>
                                    <h6>{currentUser?.state}</h6>
                                </div>
                                <div>
                                    <span style={{ color: "#ee2e24" }}>Pincode</span>
                                    <h6>{currentUser?.pinCode}</h6>
                                </div>
                            </div>
                            <hr style={{ margin: '0.2rem 0rem' }} />
                            <div
                                className={`mt-1 text-center  ${style.button}`}
                            >
                                {currentUser ? (
                                    <TextField
                                        type="password"
                                        margin="normal"
                                        value={currentUser ? currentUser.password : ""}
                                        id="standard-basic"
                                        label="Password"
                                        variant="outlined"
                                    />
                                ) : null}
                                <div>
                                    <Button
                                        color="error"
                                        variant="contained"
                                    >
                                        Update Password
                                    </Button>
                                </div>
                            </div>
                            <div className="p-2 text-center">
                                <Button
                                    color="error"
                                    variant="contained"
                                >
                                    LogOut
                                </Button>
                            </div>
                        </div>
                    </div>

                </Grid>
                <Grid item xs={12} md={12} lg={8} xl={8} className="d-none d-sm-block">
                    <div
                        style={{ marginBottom: "0.5rem", display: "flex" }}
                        className={` ${style.box}`}
                    >

                        <Card sx={{ bgcolor: 'transparent', boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', borderRadius: '15px' }} className="p-2 w-100">
                            <Grid container spacing={1}>
                                <Grid item sx={{ borderBottom: '2px solid #ee2e24' }} py={1} lg={12}>
                                    <Typography variant="h5">My Hotelio Wallet</Typography>
                                    {/* <Button color='error' sx={{ m: 1 }} variant='contained'>
                                    Add Wallet
                                </Button> */}
                                </Grid>
                                <Grid item sx={{ borderBottom: '2px solid #ee2e24' }} py={1} lg={6}>
                                    <Typography fontWeight={700} variant="p">
                                        My Hotelio Wallet :
                                    </Typography>
                                </Grid>
                                <Grid item sx={{ borderBottom: '2px solid #ee2e24' }} py={1} lg={6}>
                                    <Typography variant="p">
                                        ₹ 999
                                    </Typography>
                                </Grid>
                                <Grid item sx={{ borderBottom: '2px solid #ee2e24' }} py={1} lg={6}>
                                    <Typography fontWeight={700} variant="p">
                                        Expires :
                                    </Typography>
                                </Grid>
                                <Grid item sx={{ borderBottom: '2px solid #ee2e24' }} py={1} lg={6}>
                                    <Typography variant="p">
                                        {" "}
                                        31 Sep, 2023
                                    </Typography>
                                </Grid>
                                <Grid item sx={{ borderBottom: '2px solid #ee2e24' }} py={1} lg={6}>
                                    <Typography fontWeight={700} variant="p">
                                        Usable :
                                    </Typography>
                                </Grid>
                                <Grid item sx={{ borderBottom: '2px solid #ee2e24' }} lg={6}>
                                    <Typography variant="p">
                                        ₹ 100 each spent on every booking
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Card>

                    </div>

                </Grid>
            </Grid>
        </div>
    )
}

export default TravelProfile