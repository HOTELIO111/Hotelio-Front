import React, { useEffect, useState } from "react";
import CardMember from "./CardMember";
import style from './Member.module.css'
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Grid, Typography } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import DomainAddOutlinedIcon from '@mui/icons-material/DomainAddOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import MapsHomeWorkTwoToneIcon from '@mui/icons-material/MapsHomeWorkTwoTone';
import ApartmentTwoToneIcon from '@mui/icons-material/ApartmentTwoTone';
import PermPhoneMsgSharpIcon from '@mui/icons-material/PermPhoneMsgSharp';
import FaQ from '../../images/FaQ.png'
import ResonsImage from '../../images/reasonsImage.jpg'
import HoteliLogo from '../../images/HotelioLogo.png'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessImageFirst from '../../images/BusinessImageFirst.jpg'
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { isMobile } from "react-device-detect";

const Member = () => {

  const [underlineColor, setUnderlineColor] = useState('#0d6efd');
  const colors = ['#0d6efd', '#fff', '#ee2e24']; // Define your desired colors
  const animationDuration = 3000; // Define the duration of the animation in milliseconds

  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    if (openAccordion === index) {
      // If the clicked accordion is already open, close it.
      setOpenAccordion(null);
    } else {
      // Open the clicked accordion and close the others.
      setOpenAccordion(index);
    }
  };

  const naviagte = useNavigate()

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % colors.length;
      setUnderlineColor(colors[currentIndex]);
    }, animationDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
    >
      <div className={isMobile && 'mb-4 p-2'}>
        <Grid container spacing={1}>
          <Grid item sx={{ display: 'grid', placeItems: 'center' }} xs={12} lg={3} xl={4}>
            <div onClick={() => naviagte('/')} className="d-flex align-items-center justify-content-start">
              <img style={{ height: '120px', width: '150px' }} className={isMobile ? 'w-50 h-50' : ''} src={HoteliLogo} alt="logo" />
              <h3 style={{ color: '#ee2e24' }}>Business</h3>
            </div>
          </Grid>
          <Grid item sx={{ display: 'grid', placeItems: 'center', textAlign: 'center' }} xs={12}  lg={4} xl={4}>
            <Typography color='error' fontWeight={800} variant={isMobile ? 'caption' : 'h5'}>Welcome To Hotelio, Your Travel Partner</Typography>
          </Grid>
          <Grid sx={{ display: 'grid', placeItems: 'center' }} item xs={12}  lg={5} xl={4}>
            <div className="d-flex justify-content-end align-items-center">
              <Typography color='error' sx={{ pr: 2 }} variant={isMobile ? 'caption' : 'h6'}><LocalPhoneIcon /> +91 (811) 5510050</Typography>
              <Typography color='error' sx={{ borderLeft: '1px solid #ee2e24', padding: '0px 10px' }} variant={isMobile ? 'caption' : 'h6'}><EmailIcon /> info@hoteliorooms.com</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      <section
        // className={`${style.MemberBackgroundS}`}
        style={{ backgroundColor: 'skyblue', backgroundSize: 'cover', backgroundPosition: 'bottom', backgroundAttachment: 'fixed' }}
      >
        <CardMember />
        <Grid container paddingX={5} paddingY={2} spacing={1} bgcolor={'#ffffff'} >
          <Grid item xs={12} lg={5} xl={5} sx={{ display: 'grid', placeItems: 'center' }} >
            <div style={{ clipPath: 'circle(64.3% at 20% 38%)' }}>
              <img src={ResonsImage} alt="Bunisesspromises" />
            </div>
          </Grid>
          <Grid item xs={12} lg={7} xl={7} sx={{ display: 'grid', placeItems: 'center' }} >
            <Typography marginY={5} fontWeight={800} variant={isMobile ? 'h6' : 'h4'} color={'#87ceeb'} sx={{ borderBottom: `2px solid ${underlineColor}` }}>So many reasons become a partner</Typography>
            <div>
              <ul>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <SpeedOutlinedIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={600} style={{ marginLeft: '10px' }}>Gets bookings Fast</Typography>
                  </div>
                  <Typography variant="subtitle1">Get easy access to 4000+ Hotelio properties with up to 40% savings, manage all your company bookings on a single portal, and say good-bye to third-party commissions.</Typography>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <TrendingUpOutlinedIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={600} sx={{ marginLeft: '10px' }}>Stand out from the competition</Typography>
                  </div>
                  <Typography variant="subtitle1">With Hotelio Business effortless interface, have all your bookings at your fingertips anytime you need them.</Typography>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <DomainAddOutlinedIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={600} sx={{ marginLeft: '10px' }}>List any property type</Typography>
                  </div>
                  <Typography variant="subtitle1">Get invoices directly from us without any human intervention, and always be in the know.</Typography>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <LanguageOutlinedIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={600} sx={{ marginLeft: '10px' }}>Reach a global audience</Typography>
                  </div>
                  <Typography variant="subtitle1">With Hotelio Business effortless interface, have all your bookings at your fingertips anytime you need them.</Typography>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <SupportAgentOutlinedIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={600} sx={{ marginLeft: '10px' }}>Support</Typography>
                  </div>
                  <Typography variant="subtitle1">Get invoices directly from us without any human intervention, and always be in the know.</Typography>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </section>
      <section
        className={`${style.MemberBackground}`}
        style={{ backgroundSize: 'cover', backgroundPosition: 'bottom', backgroundAttachment: 'fixed' }}
      >

        <Grid container padding={5} spacing={1} >
          <Grid item xs={12} lg={7} xl={7} sx={{ display: 'grid', placeItems: 'center' }} >
            <Typography fontWeight={800} color={'#fff'} sx={{ borderBottom: `3px solid ${underlineColor}` }} variant={isMobile ? 'h6' : 'h4'}>Hotelio Business Promises</Typography>
            <div>
              <ul>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <SavingsIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={600} sx={{ marginLeft: '10px' }}>Save Cost</Typography>
                  </div>
                  <Typography variant="subtitle1">Get easy access to 4000+ Hotelio properties with up to 40% savings, manage all your company bookings on a single portal, and say good-bye to third-party commissions.</Typography>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <ScheduleIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={600} sx={{ marginLeft: '10px' }}>Save Time</Typography>
                  </div>
                  <Typography variant="subtitle1">With Hotelio Business effortless interface, have all your bookings at your fingertips anytime you need them.</Typography>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <LocalPoliceIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={600} sx={{ marginLeft: '10px' }}>Provide Transparency</Typography>
                  </div>
                  <Typography variant="subtitle1">Get invoices directly from us without any human intervention, and always be in the know.</Typography>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} lg={5} xl={5} >
            <div
              style={
                {
                  clipPath: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)', height: isMobile ? '' : '500px'
                }
              }
            >
              <img src={BusinessImageFirst} alt="Bunisesspromises" />
              <div className="animatedElement"></div>
            </div>
          </Grid>
        </Grid>
      </section>
      <section>
        <Container>
          <Grid container padding={5} spacing={5}>
            <Grid item xs={12} className="text-center">
              <Typography fontWeight={700} color={'primary'} variant={isMobile ? 'subtitle1' : 'h4'}>Hotelio Business is an innovative offering for corporates by Hotelio, India's largest hospitality company.</Typography>
            </Grid>
            <Grid item xs={4} className="text-center text-primary">
              <PublicTwoToneIcon sx={{ fontSize: 50 }} />
              <Typography variant={isMobile ? 'h5' : 'h3'} fontWeight={600}>80</Typography>
              <Typography variant="subtitle2">Countries</Typography>

            </Grid>
            <Grid item xs={4} className="text-center text-primary">
              <MapsHomeWorkTwoToneIcon sx={{ fontSize: 50 }} />
              <Typography variant={isMobile ? 'subtitle1' : 'h3'} fontWeight={600}>800 +</Typography>
              <Typography variant={isMobile ? 'caption' : 'subtitle2'}>Cities and Towns</Typography>
            </Grid>
            <Grid item xs={4} className="text-center text-primary">
              <ApartmentTwoToneIcon sx={{ fontSize: 50 }} />
              <Typography variant={isMobile ? 'subtitle1' : 'h3'} fontWeight={600}>5000 +</Typography>
              <Typography variant={isMobile ? 'caption' : 'subtitle2'}>Hotels</Typography>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section
        className={`${style.MemberBackgroundL} ${isMobile && 'pb-5'}`}
        style={{ backgroundSize: 'cover', backgroundPosition: 'bottom', backgroundAttachment: 'fixed' }}
      >
        {/* <Card
          sx={{ boxShadow: 'none', padding: '20px' }}
        > */}
        <Grid container paddingX={1} spacing={1}>
          <Grid item className="text-center" xs={12}>
            <Typography fontWeight={800} color={'#ee2e24'} p={2} variant={isMobile ? 'h5' : 'h3'}>Partner FAQ's</Typography>
          </Grid>
          <Grid item xs={12} lg={5} xl={5} sx={{ display: 'grid', placeItems: 'center' }} >
            <div style={{ boxShadow: 'none' }}>
              <img src={FaQ} alt="Bunisesspromises" />
            </div>
          </Grid>
          <Grid item xs={12} lg={7} xl={7} sx={{ display: 'grid', placeItems: 'center' }}>
            <div >
              <Accordion
                sx={{
                  width: isMobile ? 300 : 600,
                  boxShadow: '3px 3px 6px 0px rgba(204, 219, 232, 0.5) inset, -3px -3px 6px 1px rgba(255, 255, 255, 0.5) inset',
                  color: '#ee2e24'
                }}
                expanded={openAccordion === 0} onChange={() => handleAccordionClick(0)}>
                <AccordionSummary expandIcon={openAccordion === 0 ? <RemoveIcon /> : <AddIcon />}>
                  <Typography variant="h6">Claim input credit in every state</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body">Under GST, online travel agents and hotels provide invoices that include charges for GST. But if you have bookings in multiple states, claiming credit input on these is more than a little complicated. We issue our invoices from the state each hotel is in, which means you can claim input credit for the full GST amount against your GST liability</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ width: isMobile ? 300 : 600, boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', color: '#ee2e24' }} expanded={openAccordion === 1} onChange={() => handleAccordionClick(1)}>
                <AccordionSummary expandIcon={openAccordion === 1 ? <RemoveIcon /> : <AddIcon />}>
                  <Typography variant="h6">Claim input credit for full GST amount</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body">Every time you make a fresh booking, you have to go through the process of adding a new vendor to your system. Enter Hotelio. We only require one-time registration of vendors and allow one-time payments to be made against a particular corporate code, saving you hours of desk time and more than one headache</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ width: isMobile ? 300 : 600, boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', color: '#ee2e24' }} expanded={openAccordion === 2} onChange={() => handleAccordionClick(2)}>
                <AccordionSummary expandIcon={openAccordion === 2 ? <RemoveIcon /> : <AddIcon />}>
                  <Typography variant="h6">One-time Vendor Registration & Payments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body">Thanks to GST, every hotel booking now splits into multiple points of contact: the hotel and the travel agent. If there are any questions that need answering, you’ll have to reach out to multiple people. Unless you book through Hotelio. We give you a single invoice, a single booking ID, and a single person to get in touch for any queries: Your Hotelio Relationship Manager</Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>


        </Grid>
        {/* </Card> */}
        <div className="text-center fixed-bottom bg-light p-3">
          <Button href="https://admin.hoteliorooms.com/" variant="contained" color="error" sx={{ width: '50%', borderRadius: '15px' }} >Join Us</Button>
          <Button variant="contained" color="error" size="md" sx={{ marginLeft: '5%', borderRadius: '15px' }}><PermPhoneMsgSharpIcon /></Button>
        </div>
        <div style={{ position: 'relative' }}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height={isMobile ? '35vh' : '30vh'} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
            <defs>
              <linearGradient id="bg">
                <stop offset="0%" style={{ stopColor: "rgba(130, 158, 249, 0.06)" }}></stop>
                <stop offset="50%" style={{ stopColor: "rgba(76, 190, 255, 0.6)" }}></stop>
                <stop offset="100%" style={{ stopColor: "rgba(115, 209, 72, 0.2)" }}></stop>
              </linearGradient>
              <path id="wave" fill="url(#bg)" d="M-363.852,502.589c0,0,236.988-41.997,505.475,0s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z" />
            </defs>
            <g>
              <use href='#wave' opacity=".3">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  dur="10s"
                  calcMode="spline"
                  values="270 230; -334 180; 270 230"
                  keyTimes="0; .5; 1"
                  keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                  repeatCount="indefinite" />
              </use>
              <use href='#wave' opacity=".6">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  dur="8s"
                  calcMode="spline"
                  values="-270 230;243 220;-270 230"
                  keyTimes="0; .6; 1"
                  keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                  repeatCount="indefinite" />
              </use>
              <use href='#wave' opacty=".9">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  dur="6s"
                  calcMode="spline"
                  values="0 230;-140 200;0 230"
                  keyTimes="0; .4; 1"
                  keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                  repeatCount="indefinite" />
              </use>
            </g>
          </svg>
          <div className="border-top border-dark pt-3" style={{ position: 'absolute', top: '10px', width: '100%', left: '10px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6} className={isMobile && 'border-bottom border-danger"'}>
                <u><Typography fontWeight={700} variant="h5">About</Typography></u>
                <ul>
                  <li><Typography sx={{ cursor: 'pointer' }} onClick={() => naviagte('/about')} fontWeight={600} variant="subtitle1">- About US</Typography></li>
                  <li><Typography sx={{ cursor: 'pointer' }} onClick={() => naviagte('/contact')} fontWeight={600} variant="subtitle1">- Contact US</Typography></li>
                </ul>
              </Grid>
              <Grid item xs={12} lg={6}>
                <u><Typography fontWeight={700} variant="h5">List Property</Typography></u>
                <ul>
                  <li><Typography sx={{ cursor: 'pointer' }} onClick={() => naviagte('/terms-condition')} fontWeight={600} variant="subtitle1">- Terms & Condition</Typography></li>
                  <li><Typography sx={{ cursor: 'pointer' }} onClick={() => naviagte('/privacy')} fontWeight={600} variant="subtitle1">- Privacy & Policy</Typography></li>
                </ul>
              </Grid>
            </Grid>
          </div>
        </div>
      </section >
    </div >
  );
};

export default Member;
