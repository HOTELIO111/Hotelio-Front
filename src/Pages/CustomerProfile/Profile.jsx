import { useState } from "react";
import style from "./Profile.module.css";
import Button from "@mui/material/Button";
import List from "../../Components/YourBookings/List";
import { Card, Grid, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import EmailIcon from "@mui/icons-material/Email";
import { WaitLoader } from "../../Components/Elements/WaitLoader";
import { useAuthContext } from "../../context/userAuthContext";
import { useNavigate } from "react-router-dom";
import ProfileUpdateModal from "./ProfileUpdateModal";
import ProfileDetailUpdateModal from "./ProfileDetailUpdateModal";
import AddEmailId from "./AddEmailId";
import PasswordUpdateModal from "./PasswordUpdateModal";
import moment from "moment/moment";
import { isMobile } from "react-device-detect";

const Profile = () => {
  // State variables
  const [profiledetailUpdate, setprofiledetailUpdate] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updateField, setUpdateField] = useState("Mobile");
  const [passwordUpdateOpen, setPasswordUpdateOpen] = useState(false);
  // Profile update modal handlers
  const handelDetailUpdate = () => setprofiledetailUpdate(false);
  const handelUpdateEmailOpen = () => setUpdateEmail(true);
  const handeleEmailUpdate = () => setUpdateEmail(false);

  // Password update modal handlers
  const handlePasswordUpdateOpen = () => setPasswordUpdateOpen(true);

  const { sendOtp, otpResp, Loader, setLoader, currentUser, setCurrentUser } =
    useAuthContext();

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

  const navigate = useNavigate();
  const userMobileNo = currentUser?.mobileNo || "Add";
  const userEmailId = currentUser?.email || "Add";

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

  const [link, setLink] = useState("https://www.hoteliorooms.com/");
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  // useEffect(() => {
  //   if (currentUser !== {}) {
  //     setIsLoggedIn(true);
  //   }
  // }, [currentUser]);

  return (
    <div className="p-1">
      <Grid container className="min-vh-100 mt-5" spacing={1}>
        <WaitLoader loading={Loader} />
        <Grid xs={12} className="text-center" item>
          <div className="pt-4">
            <Typography variant="h4" className="mt-2">
              Welcome to Hotelio! Please Update YourProfile
            </Typography>
            <Typography variant="p">Membership Offer Coming Soon</Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4}>
          <div className={`${style.box}`}>
            <div className="d-flex justify-content-between">
              <Typography variant="h6">
                <b>My Profile</b>
              </Typography>
              <div
                style={{ color: "#ee2e24", cursor: "pointer" }}
                onClick={() => setprofiledetailUpdate(true)}
              >
                <u>Edit Details</u>
              </div>
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
                          onClick={() => {
                            handelUpdateEmailOpen();
                            setUpdateField("Mobile No");
                          }}
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
                          onClick={() => {
                            handelUpdateEmailOpen();
                            setUpdateField("Email Id");
                          }}
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
                className={`mt-1 ${isMobile ? 'text-center' : 'd-flex justify-content-evenly align-items-center'}  ${style.button}`}
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
                    className={` ${style.connect}`}
                    // onClick={() => sendOtpToNumber()}
                    onClick={() => {
                      sendNewOtp(
                        currentUser?.mobileNo
                          ? currentUser?.mobileNo
                          : currentUser?.email
                      );
                    }}
                  >
                    Update Password
                  </Button>
                </div>
              </div>
              <div className="p-2 text-center">
                <Button
                  color="error"
                  onClick={HandleLogOutCustomer}
                  variant="contained"
                >
                  LogOut
                </Button>
              </div>
            </div>
          </div>
          <ProfileUpdateModal />
          <PasswordUpdateModal
            passwordUpdateOpen={passwordUpdateOpen}
            setPasswordUpdateOpen={setPasswordUpdateOpen}
          />
          <ProfileDetailUpdateModal
            profiledetailUpdate={profiledetailUpdate}
            handelDetailUpdate={handelDetailUpdate}
            currentUser={currentUser}
          />
          <AddEmailId
            handeleEmailUpdate={handeleEmailUpdate}
            updateField={updateField}
            updateEmail={updateEmail}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={8} xl={8} className="d-none d-sm-block">
          <div
            style={{ marginBottom: "0.5rem", display: "flex" }}
            className={` ${style.box}`}
          >
            <Card className="p-2" style={{ maxWidth: "400px", background: 'transparent', boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', borderRadius: '15px' }}>
              <Typography variant="h5">
                Get 999 INR instantly Credit in your account. Also become
                eligible for refer and earn.
              </Typography>
              {/* <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              /> */}
              <Button onClick={copyToClipboard} className="mt-2">
                {isCopied ? "Copied!" : "Refer Copy Link"}
              </Button>
            </Card>
            <Card sx={{ ml: 2, bgcolor: 'transparent', boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', borderRadius: '15px' }} className="p-2">
              <Typography variant="h5">My Hotelio Wallet</Typography>
              <hr style={{ marginTop: "0px" }} />
              <div className="d-flex align-items-center">
                <Typography fontWeight={700} variant="p">
                  My Hotelio Wallet :
                </Typography>
                <Typography sx={{ pl: 2.5 }} variant="h6">
                  ₹ 999
                </Typography>
              </div>
              <hr style={{ marginTop: "0px" }} />
              <div className="d-flex align-items-center">
                <Typography fontWeight={700} variant="p">
                  Expires :
                </Typography>
                <Typography sx={{ pl: 2.5 }} variant="h6">
                  {" "}
                  31 Sep, 2023
                </Typography>
              </div>
              <hr style={{ marginTop: "0px" }} />
              <div className="d-flex align-items-center">
                <Typography fontWeight={700} variant="p">
                  Usable :
                </Typography>
                <Typography sx={{ pl: 2.5 }} variant="h6">
                  ₹ 100 each spent on every booking
                </Typography>
              </div>
            </Card>
          </div>
          <div
            style={{
              overflowY: "auto",
              maxHeight: "100vh",
              paddingBottom: "2rem",
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
