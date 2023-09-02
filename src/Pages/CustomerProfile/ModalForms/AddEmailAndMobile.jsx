import React from 'react'

const AddEmailAndMobile = ({
    updateEmail,
    updateField,
    handeleEmailUpdate,
    sentOtp,
    setsentOtp,
  }) => {
    // State variables
    const { sendOtp, otpResp, Loader, setLoader, AddEmailAndMobile } =
      useAuthContext();

    const [formData, setFormData] = useState({}); // Store form data

    const [AddEmail, setAddEmail] = useState("");

    // Handle input field changes
    const handleFieldChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    // State for OTP input
    const [otp, setOtp] = useState("");

    // Handle OTP input change
    const handleChange = (newValue) => {
      setOtp(newValue);
    };

    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Form Data:", formData); // Log the form data
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
      p: 2,
    };

    if (window.innerWidth >= 960) {
      styleo.width = "30%";
    }

    const HandleSubmitFinal = (otp, otpResp, id) => {
      const data = {};
      data.email = AddEmail;
      AddEmailAndMobile(data, otp, otpResp, id);
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
              {/* <WaitLoader loading={Loader} /> */}
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
                          name="email"
                          fullWidth
                          required
                          type="text"
                          id="outlined-required"
                          label={`Enter your ${updateField}`}
                          onChange={(e) => {
                            setAddEmail(e.target.value);
                          }} // Update form data on input change
                          value={AddEmail} // Set value based on form data
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
                      type="button"
                      onClick={() =>
                        HandleSubmitFinal(otp, otpResp.data, currentUser._id)
                      }
                      color="error"
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => {
                        sendOtp(AddEmail).then(() => {
                          setsentOtp(true);
                        });
                      }}
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
  )
}

export default = 