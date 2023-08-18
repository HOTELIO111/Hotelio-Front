import React, { useState } from "react";
import { Container, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import HoteliLogo from '../../images/HotelioLogo.png'

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
    <Grid container spacing={2} padding={5}>
      <Grid item xs={12}>
        <div className="text-center text-white mt-4">
          <h2>Hotelio Business is a corporate hotel booking solution by Hotelio.</h2>
        </div>
      </Grid>

      <Grid item xs={12} lg={7} xl={7} xxl={7} style={{ display: 'grid', placeItems: 'center' }}>
        <img src={HoteliLogo} alt=".." />
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
