import React, { useState } from "react";
import style from "../Contact/contact.module.css";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Card, createTheme, ThemeProvider } from '@mui/material';
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import HotelioLogo from '../../images/HotelioLogo.png'
import MobileFooter from "../../Components/MobileComponent/MobileFooter";
import MobileHeader from "../../Components/MobileComponent/MobileHeader";
import TtyIcon from '@mui/icons-material/Tty';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood';

const ContactUsMob = () => {

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
            <MobileHeader />
            <section className={`${style.contact_section} mt-0 pt-0 spad`}>
                <div className="container px-1">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="d-flex justify-content-center align-items-start pt-0 mt-0">
                                <img src={HotelioLogo} style={{ height: '180px', width: '300px' }} alt="Logo" />
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
                                            A 210, Manas City, Indira Nagar, Lucknow, 226016.
                                        </h6>
                                    </div>
                                    <div className="my-2 d-flex align-items-center">
                                        <SecurityUpdateGoodIcon sx={{ color: '#ee2e24' }} />
                                        <h5 className="mx-2 fw-bold">Phone:</h5>
                                        <h5 className="fw-lighter text-muted">
                                            +91 (811) 5510050
                                        </h5>
                                    </div>
                                    <div className="my-2 d-flex align-items-center">
                                        <TtyIcon sx={{ color: '#ee2e24' }} />
                                        <h5 className="mx-2 fw-bold">Telephone:</h5>
                                        <h5 className="fw-lighter text-muted">
                                            0522-4329787
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
                        <div className="col-lg-6">
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
                    <div className={`mt-3 ${style.map}`}>
                        <iframe
                            title="contact"
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3557.96877780391!2d80.99880607543919!3d26.904485976652023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDU0JzE2LjIiTiA4McKwMDAnMDUuMCJF!5e0!3m2!1sen!2sin!4v1696829941027!5m2!1sen!2sin"
                            height="470"
                            style={{ border: "0" }}
                            allowfullscreen="true"
                        ></iframe>
                    </div>
                </div>
            </section>

            <div className="d-md-block d-lg-none d-xl-none">
                <MobileFooter />
            </div>
        </>
    );
};

export default ContactUsMob;

