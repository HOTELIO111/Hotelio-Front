import React, { useState } from "react";
import { Container, Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import HoteliLogo from '../../images/HotelioLogo.png'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const CardMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    mobile: "",
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
    // Handle form submission here, e.g., sending data to a server
    console.log(formData);
  };

  return (
    <Grid sx={{borderTop:'2px solid #ee2e24'}} container spacing={2} padding={2}>
      <Grid paddingTop={0} item xs={12}>
        <div className="text-center text-white">
          <h2><span style={{ color: '#ee2e24' }} ><b>Hotelio Business</b></span> is a corporate hotel booking solution by <span style={{ color: '#ee2e24' }} ><b>Hotelio</b></span>.</h2>
        </div>
      </Grid>

      <Grid item xs={12} lg={7} xl={7} xxl={7} style={{ display: 'grid', placeItems: 'center' }}>
        <img src={HoteliLogo} style={{ height: '250px', width: '450px' }} alt="logo" />
        <Typography color={"white"} variant="h4"> "Grow your <span style={{ color: '#ee2e24' }}><i>Business</i> <TrendingUpIcon fontSize="large" /></span> and make your <span style={{ color: '#ee2e24' }}><b>profit double</b> <KeyboardDoubleArrowUpIcon fontSize="large" /> </span>"</Typography>
      </Grid>

      <Grid item xs={12} lg={5} xl={5} xxl={5} style={{ display: 'grid', placeItems: 'center' }}>
        <form className="bg-white rounded p-4" onSubmit={handleSubmit}>
          <h3>Get Started</h3>
          {/* Name input */}
          <TextField
            fullWidth
            id="name"
            name="name"
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
            label="Company"
            value={formData.company}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
          />

          {/* Email input */}
          <TextField
            fullWidth
            id="email"
            name="email"
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
            name="mobile"
            label="Mobile Number"
            value={formData.mobile}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
          />

          <div className="text-center">
            {/* Submit button */}
            <Button variant="contained" color="error" type="submit">
              Register Now
            </Button>
          </div>

        </form>
      </Grid>
    </Grid>
  );
};

export default CardMember;
