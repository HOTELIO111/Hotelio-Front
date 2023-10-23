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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PermPhoneMsgSharpIcon from '@mui/icons-material/PermPhoneMsgSharp';
import FaQ from '../../images/FaQ.png'
import ResonsImage from '../../images/reasonsImage.jpg'
import HoteliLogo from '../../images/HotelioLogo.png'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessImageFirst from '../../images/BusinessImageFirst.jpg'

const Member = () => {

  const [underlineColor, setUnderlineColor] = useState('#0d6efd');
  const colors = ['#0d6efd', '#fff', '#ee2e24']; // Define your desired colors
  const animationDuration = 3000; // Define the duration of the animation in milliseconds

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
      <div>
        <Grid container spacing={1}>
          <Grid item lg={6} xl={6}>
            <div className="d-flex align-items-center">
              <img style={{ height: '120px', width: '150px' }} src={HoteliLogo} alt="logo" />
              <h3 style={{ color: '#ee2e24' }}>Business</h3>
            </div>
          </Grid>
          <Grid item lg={6} xl={6} display={'grid'}>
            <div className="d-flex justify-content-end pr-2 align-items-center">
              <Typography color='error' sx={{ pr: 2 }} variant="h6"><LocalPhoneIcon /> +91 (811) 5510050</Typography>
              <Typography color='error' sx={{ borderLeft: '1px solid #ee2e24', padding: '0px 10px' }} variant="h6"><EmailIcon /> info@hoteliorooms.com</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      <section
        className={`${style.MemberBackgroundS}`}
      >
        <CardMember />
        <Grid container paddingX={5} paddingY={2} spacing={1} bgcolor={'#ffffff6b'} >
          <Grid item xs={12} lg={5} xl={5} sx={{ display: 'grid', placeItems: 'center' }} >
            <div style={{ clipPath: 'circle(50% at 50% 50%)' }}>
              <img src={ResonsImage} alt="Bunisesspromises" />
            </div>
          </Grid>
          <Grid item xs={12} lg={7} xl={7} sx={{ display: 'grid', placeItems: 'center' }} >
            <Typography marginY={5} variant="h4" sx={{ borderBottom: `2px solid ${underlineColor}` }}>So many reasons become a partner</Typography>
            <div>
              <ul>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <SpeedOutlinedIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" style={{ marginLeft: '10px' }}>Gets bookings Fast</Typography>
                  </div>
                  <Typography variant="p">Get easy access to 4000+ Hotelio properties with up to 40% savings, manage all your company bookings on a single portal, and say good-bye to third-party commissions.</Typography>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <TrendingUpOutlinedIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" sx={{ marginLeft: '10px' }}>Stand out from the competition</Typography>
                  </div>
                  <Typography variant="p">With Hotelio Business effortless interface, have all your bookings at your fingertips anytime you need them.</Typography>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <DomainAddOutlinedIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" sx={{ marginLeft: '10px' }}>List any property type</Typography>
                  </div>
                  <Typography variant="p">Get invoices directly from us without any human intervention, and always be in the know.</Typography>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <LanguageOutlinedIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" sx={{ marginLeft: '10px' }}>Reach a global audience</Typography>
                  </div>
                  <Typography variant="p">With Hotelio Business effortless interface, have all your bookings at your fingertips anytime you need them.</Typography>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <SupportAgentOutlinedIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" sx={{ marginLeft: '10px' }}>Support</Typography>
                  </div>
                  <Typography variant="p">Get invoices directly from us without any human intervention, and always be in the know.</Typography>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </section>
      <section
        className={`${style.MemberBackground}`}
      >

        <Grid container padding={5} spacing={1} >
          <Grid item xs={12} lg={7} xl={7} sx={{ display: 'grid', placeItems: 'center' }} >
            <Typography sx={{ borderBottom: `3px solid ${underlineColor}` }} variant="h4">Hotelio Business Promises</Typography>
            <div>
              <ul>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <SavingsIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" sx={{ marginLeft: '10px' }}>Save Cost</Typography>
                  </div>
                  <Typography variant="p">Get easy access to 4000+ Hotelio properties with up to 40% savings, manage all your company bookings on a single portal, and say good-bye to third-party commissions.</Typography>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <ScheduleIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" sx={{ marginLeft: '10px' }}>Save Time</Typography>
                  </div>
                  <Typography variant="p">With Hotelio Business effortless interface, have all your bookings at your fingertips anytime you need them.</Typography>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <LocalPoliceIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h5" sx={{ marginLeft: '10px' }}>Provide Transparency</Typography>
                  </div>
                  <Typography variant="p">Get invoices directly from us without any human intervention, and always be in the know.</Typography>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} lg={5} xl={5} >
            <div
              style={
                {
                  clipPath: 'polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)'
                }
              }
            >
              <img src={BusinessImageFirst} alt="Bunisesspromises" />
            </div>
          </Grid>
        </Grid>
      </section>
      <section>
        <Container>
          <Grid container padding={5} spacing={5}>
            <Grid item xs={12} className="text-center">
              <Typography variant="h6">Hotelio Business is an innovative offering for corporates by Hotelio, India's largest hospitality company.</Typography>
            </Grid>
            <Grid item xs={4} className="text-center">
              <PublicTwoToneIcon sx={{ fontSize: 50 }} />
              <h1>80</h1>
              <small>Countries</small>

            </Grid>
            <Grid item xs={4} className="text-center">
              <MapsHomeWorkTwoToneIcon sx={{ fontSize: 50 }} />
              <h1>800+</h1>
              <small>Cities and Towns</small>
            </Grid>
            <Grid item xs={4} className="text-center">
              <ApartmentTwoToneIcon sx={{ fontSize: 50 }} />
              <h1>5000+</h1>
              <small>Hotels</small>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section
        className={`${style.MemberBackgroundL}`}
      >
        {/* <Card
          sx={{ boxShadow: 'none', padding: '20px' }}
        > */}
        <Grid container paddingX={5} spacing={1}>
          <Grid item className="text-center" xs={12}>
            <Typography padding={2} variant="h4">Partner FAQ's</Typography>
          </Grid>
          <Grid item xs={12} lg={5} xl={5} sx={{ display: 'grid', placeItems: 'center' }} >
            <div style={{ boxShadow: 'none' }}>
              <img src={FaQ} alt="Bunisesspromises" />
            </div>
          </Grid>
          <Grid item xs={12} lg={7} xl={7} sx={{ display: 'grid', placeItems: 'center' }}>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Claim input credit in every state</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Under GST, online travel agents and hotels provide invoices that include charges for GST. But if you have bookings in multiple states, claiming credit input on these is more than a little complicated. We issue our invoices from the state each hotel is in, which means you can claim input credit for the full GST amount against your GST liability
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Claim input credit for full GST amount</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Every time you make a fresh booking, you have to go through the process of adding a new vendor to your system. Enter Hotelio. We only require one-time registration of vendors and allow one-time payments to be made against a particular corporate code, saving you hours of desk time and more than one headache
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>One-time Vendor Registration & Payments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Thanks to GST, every hotel booking now splits into multiple points of contact: the hotel and the travel agent. If there are any questions that need answering, you’ll have to reach out to multiple people. Unless you book through Hotelio. We give you a single invoice, a single booking ID, and a single person to get in touch for any queries: Your Hotelio Relationship Manager
                  </Typography>
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
      </section>
    </div >
  );
};

export default Member;
