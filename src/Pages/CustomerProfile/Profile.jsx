import { useState } from "react";
import style from "./Profile.module.css";
import Button from "@mui/material/Button";
import List from "../../Components/YourBookings/List";
import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
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

const Profile = () => {
  // Update the user details
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("customer"))
  );

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

  const { sendOtp, otpResp, Loader, setLoader } = useAuthContext();

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
              <p>
                <b>My Profile</b>
              </p>
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
                  <h4>
                    <b>{currentUser ? currentUser.name : "Your Name"}</b>
                  </h4>
                </div>
              </div>
              <div className="d-flex justify-content-between pb-1">
                <div>
                  <span style={{ color: "#ee2e24" }}>Gender</span>
                  <h5>{currentUser?.gender}</h5>
                </div>
                <div>
                  <span style={{ color: "#ee2e24" }}>Marital Status</span>
                  <h5>{currentUser?.maritialStatus}</h5>
                </div>
              </div>
              <hr />
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
              <hr />
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
              <hr style={{ marginTop: "0px" }} />
              <div className="d-flex pb-1">
                <div>
                  <span style={{ color: "#ee2e24" }}>Birthday</span>
                  <h5>{moment(currentUser?.birthday).format("DD-MMMM-YYYY")}</h5>
                </div>
              </div>
              <hr />
              <div className="d-flex pb-2">
                <div>
                  <span style={{ color: "#ee2e24" }}>Your Adress</span>
                  <h5>{currentUser?.address}</h5>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between pb-2">
                <div>
                  <span style={{ color: "#ee2e24" }}>State</span>
                  <h5>{currentUser?.state}</h5>
                </div>
                <div>
                  <span style={{ color: "#ee2e24" }}>Pincode</span>
                  <h5>{currentUser?.pinCode}</h5>
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
                <Button
                  sx={{ color: "#ee2e24", border: " 1px solid #ee2e24" }}
                  onClick={HandleLogOutCustomer}
                  fullWidth
                  variant="outlined"
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
            style={{
              // overflowY: "auto",
              // maxHeight: "100vh",
              marginBottom: "1rem",
            }}
            className={` ${style.box}`}
          >
            <Card className="p-2">
              <Typography variant="h5">My Hotelio Wallet</Typography>
              <hr />
              <div className="text-center">
                <Typography fontWeight={700} variant="p">
                  My Hotelio Wallet :
                </Typography>
                <Typography sx={{ pl: 2.5 }} display="block" variant="h6">
                  ₹ 999
                </Typography>
              </div>
              <hr />
              <div className="text-center">
                <Typography fontWeight={700} variant="p">
                  Expires :
                </Typography>
                <Typography sx={{ pl: 2.5 }} display="block" variant="h6">
                  {" "}
                  31 Sep, 2023
                </Typography>
              </div>
              <hr />
              <div className="text-center">
                <Typography fontWeight={700} variant="p">
                  Usable :
                </Typography>
                <Typography sx={{ pl: 2.5 }} display="block" variant="h6">
                  ₹ 200 each spent on booking
                </Typography>
              </div>
            </Card>
          </div>
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
        {/* <Grid item xs={12} md={12} lg={8} xl={8} className="d-none d-sm-block" >
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
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Profile;
