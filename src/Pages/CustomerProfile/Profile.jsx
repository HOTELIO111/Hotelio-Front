import { useState } from 'react';
import style from './Profile.module.css';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '../../Components/YourBookings/List';
import { Grid, TextField } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';

const Profile = () => {
  // State variables
  const [profileUpdateOpen, setProfileUpdateOpen] = useState(false);
  const [passwordUpdateOpen, setPasswordUpdateOpen] = useState(false);
  const [validate, setValidate] = useState(false);
  const [otp, setOtp] = useState('');

  // Profile update modal handlers
  const handleProfileUpdateOpen = () => setProfileUpdateOpen(true);
  const handleProfileUpdateClose = () => setProfileUpdateOpen(false);

  // Password update modal handlers
  const handlePasswordUpdateOpen = () => setPasswordUpdateOpen(true);
  const handlePasswordUpdateClose = () => {
    setPasswordUpdateOpen(false);
    setValidate(false);
  };

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  // Profile update modal component
  const ProfileUpdateModal = () => {
    const styleo = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #fff',
      filter: 'drop-shadow(10px 8px 6px red)',
      borderRadius: '5px',
      boxShadow: 24,
      p: 4,
    };

    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={profileUpdateOpen}
          onClose={handleProfileUpdateClose}
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
              <Grid container spacing={2}>
                <Grid xs={12} className="text-center" item>
                  <h3> Edit Your Profile </h3>
                </Grid>
                <Grid xs={12} className="text-center" item>
                  <TextField
                    type="text"
                    label="Enter Full Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={12} className="text-center" item>
                  <TextField
                    type="number"
                    label="Enter Mobile No."
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={12} className="text-center" item>
                  <TextField
                    type="email"
                    label="Enter Email Id"
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={6} className="text-center" item>
                  <Button onClick={handleProfileUpdateClose} variant="outlined" color="error">
                    Cancel
                  </Button>
                </Grid>
                <Grid xs={6} className="text-center" item>
                  <Button variant="contained" color="error">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </div >
    );
  };

  // Password update modal component
  const PasswordUpdateModal = () => {
    const styleo = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #fff',
      filter: 'drop-shadow(10px 8px 6px red)',
      borderRadius: '5px',
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
              {validate ? (
                // Render the OTP input and password fields when validate is true
                <Grid container spacing={2}>
                  <Grid xs={12} className="text-center" item>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Enter OTP
                    </Typography>
                  </Grid>
                  <Grid xs={12} className="text-center" item>
                    <MuiOtpInput value={otp} onChange={handleChange} />
                  </Grid>
                  <Grid xs={12} className="text-center" item>
                    <TextField
                      type="password"
                      label="Enter Password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid xs={12} className="text-center" item>
                    <TextField
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid xs={6} className="text-center" item>
                    <Button
                      onClick={() => setValidate(false)}
                      variant="outlined"
                      color="error"
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid xs={6} className="text-center" item>
                    <Button
                      onClick={handlePasswordUpdateClose}
                      variant="contained"
                      color="error"
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                // Render the mobile number input and validate button when validate is false
                <Grid container spacing={2}>
                  <Grid xs={12} className="text-center" item>
                    <h3> Update Your Password </h3>
                  </Grid>
                  <Grid xs={12} className="text-center" item>
                    <TextField
                      type="number"
                      label="Enter Mobile No."
                      variant="outlined"
                    />
                  </Grid>
                  <Grid xs={6} className="text-center" item>
                    <Button
                      onClick={handlePasswordUpdateClose}
                      variant="outlined"
                      color="error"
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid xs={6} className="text-center" item>
                    <Button
                      onClick={() => setValidate(true)}
                      variant="contained"
                      color="error"
                    >
                      Validate
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <Grid container className="min-vh-100" spacing={2}>
        <Grid xs={12} className="text-center" item>
          <h3>Welcome to Hotelio! Please Update YourProfile</h3>
          <p>Membership Offer Coming Soon</p>
        </Grid>
        <Grid item xs={4}>
          <div className={`text-center ${style.box}`}>
            <div className={` ${style.content}`}>
              <div className={` ${style.image}`}>
                <img src="https://i.postimg.cc/bryMmCQB/profile-image.jpg" alt="Profile Image" />
              </div>
              <div className={` ${style.level}`}>
                <p>PRO</p>
              </div>
              <div className={` ${style.text}`}>
                <p className={` ${style.name}`}>Ethan Rivers</p>
                <h5 className={` ${style.job_title}`}>8090300447</h5>
                <h5 className={` mt-0 ${style.job_discription}`}>abc@gmail.com</h5>
              </div>
              <div className={` ${style.button}`}>
                <div>
                  <Button variant="contained" color="error" className={` ${style.connect}`} onClick={handleProfileUpdateOpen}>Edit</Button>
                </div>
              </div>
              <div className={`mt-1 ${style.button}`}>
                <div>
                  <Button color="error" variant="contained" className={` ${style.connect}`} type="button" onClick={handlePasswordUpdateOpen}>Update Password</Button>
                </div>
              </div>
            </div>
          </div>
          <ProfileUpdateModal />
          <PasswordUpdateModal />
        </Grid>
        <Grid item xs={8}>
          <div style={{ overflowY: 'auto', maxHeight: '90vh', paddingBottom: '10rem' }} className={` ${style.box}`}>
            <List />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
