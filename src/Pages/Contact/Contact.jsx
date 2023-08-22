import React, { useState } from "react";
import style from "./contact.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Card, createTheme, ThemeProvider } from '@mui/material';
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ContactImg from '../../images/ContactImage.png'
import HotelioLogo from '../../images/HotelioLogo.png'

const Contact = () => {

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            '& .MuiInputBase-input:focus': {
              backgroundColor: '#fff',
            },
            '& .MuiInput-underline::before': {
              borderBottom: '2px solid #ee2e24', // Change to your desired active color
            },
            '& .MuiInput-underline::after': {
              borderBottom: '2px solid #ee2e24', // Change to your desired active color
            },
          },
        },
      },
    },
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    serviceType: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <>
      <Navbar />

      <section className={`${style.contact_section} spad`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div style={{ display: 'grid', placeItems: 'center' }}>
                <img src={HotelioLogo} style={{ height: '220px', width: '300px' }} alt="Logo" />
              </div>
              <div className={style.contact_text}>
                <h2>Contact Info</h2>
                <p>
                  Hotelio is owned by Houda Carjour Tourism Pvt Ltd, India's Number 1 Fastest Leading Hotel Chain.
                </p>
                <div className="py-2">
                  <div className="my-2 d-flex">
                    <HomeRoundedIcon sx={{ color: '#ee2e24' }} />
                    <h5 className="mx-2 fw-bold">Address:</h5>
                    <h6 className="fw-lighter text-muted">
                      Indira Nagar, Lucknow, UP
                    </h6>
                  </div>
                  <div className="my-2 d-flex align-items-center">
                    <LocalPhoneRoundedIcon sx={{ color: '#ee2e24' }} />
                    <h5 className="mx-2 fw-bold">Phone:</h5>
                    <h5 className="fw-lighter text-muted">
                      +91 (811) 5510050
                    </h5>
                  </div>
                  <div className="my-2 d-flex align-items-center">
                    <EmailRoundedIcon sx={{ color: '#ee2e24' }} />
                    <h5 className="mx-2 fw-bold">Email:</h5>
                    <h5 className="fw-lighter text-muted">
                      info@hoteliorooms.com
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <Card className="p-3 mt-3 rounded"
                sx={{ boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset' }}
              >
                <ThemeProvider theme={theme}>
                  <form onSubmit={handleSubmit}>
                    {/* <div>
                  <img src={HotelioLogo} alt="Logo" />
                </div> */}
                    <TextField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      margin="normal"
                      sx={{
                        '&:focus': {
                          backgroundColor: '#fff !important',
                        },
                      }}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <TextField
                      label="Mobile No"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <FormControl fullWidth required margin="normal">
                      <InputLabel>Service Type</InputLabel>
                      <Select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="service1">Service 1</MenuItem>
                        <MenuItem value="service2">Service 2</MenuItem>
                        <MenuItem value="service3">Service 3</MenuItem>
                      </Select>
                    </FormControl>
                    <TextareaAutosize
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      minRows={5}
                      placeholder="Description"
                      style={{ width: '100%', margin: '16px 0px', borderRadius: '24px', padding: '10px', backgroundColor: '#ee2e243f' }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </form>
                </ThemeProvider>
              </Card>
            </div>
          </div>
          <div className={style.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.0606825994123!2d-72.8735845851828!3d40.760690042573295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e85b24c9274c91%3A0xf310d41b791bcb71!2sWilliam%20Floyd%20Pkwy%2C%20Mastic%20Beach%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1578582744646!5m2!1sen!2sbd"
              height="470"
              style={{ border: "0" }}
              allowfullscreen=""
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;

