import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import HoteliLogo from '../../images/HotelioLogo.png'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { isMobile } from "react-device-detect";
import Atropos from 'atropos/react';
import { useDispatch } from "react-redux";
import { GetHotelioEnquiry } from "../../store/actions/EnquiryAction";
import Swal from "sweetalert2";

const CardMember = () => {

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    mobileNo: "",
    city: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(GetHotelioEnquiry(formData))
    Swal.fire({
      title: "Thank You!",
      text: "Your request has been sent to the Hotelio team. We will connect with you soon.",
      icon: "success"
    })
    setFormData({
      name: "",
      company: "",
      email: "",
      mobileNo: "",
      city: ""
    });
  };

  return (
    <Grid sx={{ borderTop: '2px solid #ee2e24' }} container spacing={2} padding={2} pb={12}>
      <Grid paddingTop={0} item xs={12}>
        <div className={isMobile ? 'text-center text-white border-top border-bottom ' : 'text-center text-white border-top border-bottom my-2 mx-5'}>
          <Typography variant={isMobile ? 'body2' : 'h4'} fontWeight={800}>
            <svg style={{ width: '100%', height: "80px" }}>
              <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                Hotelio Business is a corporate hotel booking solution by Hotelio
              </text>
            </svg>
          </Typography>
        </div>
      </Grid>

      <Grid item xs={12} lg={7} xl={7} xxl={7} style={{ display: 'grid', placeItems: 'center' }}>
        <div className="animate__animated animate__bounceInDown text-center">
          <Atropos
            activeOffset={40}
            shadow={false}
          >
            <img src={HoteliLogo} style={{ height: '250px', width: '450px' }} className={isMobile ? 'w-100 h-25' : ''} alt="logo" />
            <Typography fontWeight={800} color={"white"} variant={isMobile ? 'h6' : 'h5'} > "Grow your <span style={{ color: '#ee2e24' }}><i>Business</i> <TrendingUpIcon fontSize="large" /></span> and make your <span style={{ color: '#ee2e24' }}><b>profit double</b> <KeyboardDoubleArrowUpIcon fontSize="large" /> </span>"</Typography>
          </Atropos>

        </div>
      </Grid>

      <Grid item className="animate__animated animate__fadeInRight" xs={12} lg={5} xl={5} xxl={5} style={{ display: 'grid', placeItems: 'center' }}>
        <form style={{ borderRadius: '24px', boxShadow: ' rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset' }} className="bg-white p-4" onSubmit={handleSubmit}>
          <h3>Get Started</h3>
          {/* Name input */}
          <TextField
            fullWidth
            id="name"
            name="name"
            type="text"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
          />

          {/* Company input */}
          <TextField
            fullWidth
            id="company"
            name="company"
            type="text"
            label="Hotel Name"
            value={formData.company}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
          />

          {/* City input */}
          <TextField
            fullWidth
            id="city"
            type="text"
            name="city"
            label="Enter city"
            value={formData.city}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
          />

          {/* Email input */}
          <TextField
            fullWidth
            id="email"
            name="email"
            type="email"
            label="Email address"
            value={formData.email}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
          />

          {/* Mobile number input */}
          <TextField
            fullWidth
            id="mobile"
            name="mobileNo"
            label="Mobile Number"
            type="number"
            value={formData.mobileNo}
            onChange={(e) => {
              const enteredValue = e.target.value.replace(/\D/g, '');
              if (enteredValue.length <= 10) {
                handleInputChange(e);
              }
            }}
            variant="outlined"
            margin="normal"
          />

          <div className="text-center">
            {/* Submit button */}
            <Button variant="contained" fullWidth sx={{ mt: 2, borderRadius: '24px', p: 1.5 }} color="error" type="submit">
              Register Now
            </Button>
          </div>

        </form>
      </Grid>
    </Grid>
  );
};

export default CardMember;
