import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import CardMember from "./CardMember";
import Footer from '../../Components/footer/Footer'
import style from './Member.module.css'
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, Container, Grid, Typography } from "@mui/material";
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
import Deal from '../../images/MemberDeal.png'

const Member = () => {
  return (
    <div
    >
      <Navbar />
      <section
        className={`${style.MemberBackground}`}
      >
        <CardMember />
        <Grid container padding={5} spacing={1} >
          <Grid item xs={12} xl={7} sx={{ display: 'grid', placeItems: 'center' }} >
            <h3>Hotelio Business Promises</h3>
            <div>
              <ul>
                <li style={{ padding: '20px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <SavingsIcon sx={{ fontSize: 40 }} />
                    <h4 style={{ marginLeft: '10px' }}>Save Cost</h4>
                  </div>
                  <p>Get easy access to 4000+ Hotelio properties with up to 40% savings, manage all your company bookings on a single portal, and say good-bye to third-party commissions.</p>
                </li>
                <li style={{ padding: '20px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <ScheduleIcon sx={{ fontSize: 40 }} />
                    <h4 style={{ marginLeft: '10px' }}>Save Time</h4>
                  </div>
                  <p>With OYO B’s effortless interface, have all your bookings at your fingertips anytime you need them.</p>
                </li>
                <li style={{ padding: '20px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <LocalPoliceIcon sx={{ fontSize: 40 }} />
                    <h4 style={{ marginLeft: '10px' }}>Provide Transparency</h4>
                  </div>
                  <p>Get invoices directly from us without any human intervention, and always be in the know.</p>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} xl={5} >
            <div
              style={
                {
                  clipPath: 'polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 13% 50%, 0% 0%)'
                }
              }
            >
              <img src="https://img.freepik.com/free-vector/hand-drawn-business-strategy-with-target_23-2149164451.jpg?w=1060&t=st=1690198812~exp=1690199412~hmac=45e2448b01293e6061c59b0200b8df4d076eb602cb6af06d07697c51ed6ed00b" alt="Bunisesspromises" />
            </div>
          </Grid>
        </Grid>
      </section>
      <section
        className={`${style.MemberBackgroundS}`}
      >
        <Grid container paddingX={5} paddingY={2} spacing={1} bgcolor={'#ffffff6b'} >
          <Grid item xs={12} xl={5} sx={{ display: 'grid', placeItems: 'center' }} >
            <div
              style={
                {
                  clipPath: 'circle(50% at 50% 50%)'
                }
              }
            >
              <img src="https://img.freepik.com/free-vector/hotel-services-set-icons_24877-52755.jpg?w=740&t=st=1690277494~exp=1690278094~hmac=b32c4b28daa5669533dbd655185a48cc7407dcd008dc56f1fcc26319ce9e8d2f" alt="Bunisesspromises" />
            </div>
          </Grid>
          <Grid item xs={12} xl={7} sx={{ display: 'grid', placeItems: 'center' }} >
            <div>
              <ul>
                <li className="mb-5 text-center">
                  <h3>So many reasons become a partner</h3>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <SpeedOutlinedIcon sx={{ fontSize: 40 }} />
                    <h4 style={{ marginLeft: '10px' }}>Gets bookings Fast</h4>
                  </div>
                  <p>Get easy access to 4000+ Hotelio properties with up to 40% savings, manage all your company bookings on a single portal, and say good-bye to third-party commissions.</p>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <TrendingUpOutlinedIcon sx={{ fontSize: 40 }} />
                    <h4 style={{ marginLeft: '10px' }}>Stand out from the competition</h4>
                  </div>
                  <p>With OYO B’s effortless interface, have all your bookings at your fingertips anytime you need them.</p>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <DomainAddOutlinedIcon sx={{ fontSize: 40 }} />
                    <h4 style={{ marginLeft: '10px' }}>List any property type</h4>
                  </div>
                  <p>Get invoices directly from us without any human intervention, and always be in the know.</p>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <LanguageOutlinedIcon sx={{ fontSize: 40 }} />
                    <h4 style={{ marginLeft: '10px' }}>Reach a global audience</h4>
                  </div>
                  <p>With OYO B’s effortless interface, have all your bookings at your fingertips anytime you need them.</p>
                </li>
                <li style={{ padding: '10px 0px' }}>
                  <div className="d-flex text-dark align-items-center">
                    <SupportAgentOutlinedIcon sx={{ fontSize: 40 }} />
                    <h4 style={{ marginLeft: '10px' }}>Support</h4>
                  </div>
                  <p>Get invoices directly from us without any human intervention, and always be in the know.</p>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </section>
      <section>
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={12} className="text-center">
              <h4>Hotelio Business is an innovative offering for corporates by Hotelio, India's largest hospitality company.</h4>
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
              <h3>Partner FAQ's</h3>
            </Grid>
            <Grid item xs={12} xl={5} sx={{ display: 'grid', placeItems: 'center' }} >
              <div
                style={
                  {
                    // clipPath: 'polygon(0% 20%, 100% 20%, 100% 75%, 40% 77%, 16% 99%, 22% 75%, 0% 75%)',
                    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
                  }
                }
              >
                <img src={Deal} alt="Bunisesspromises" />
              </div>
            </Grid>
            <Grid item xs={12} xl={7} sx={{ display: 'grid', placeItems: 'center' }}>
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
                      Every time you make a fresh booking, you have to go through the process of adding a new vendor to your system. Enter OYO. We only require one-time registration of vendors and allow one-time payments to be made against a particular corporate code, saving you hours of desk time and more than one headache
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
                      Thanks to GST, every hotel booking now splits into multiple points of contact: the hotel and the travel agent. If there are any questions that need answering, you’ll have to reach out to multiple people. Unless you book through OYO. We give you a single invoice, a single booking ID, and a single person to get in touch for any queries: Your OYO Relationship Manager
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Grid>

            <Grid item xs={12} className="text-center">
              <Button href="https://hotelio-dashboard-trickle.netlify.app/" variant="contained" color="error" sx={{ width: '50%' }} >Join Us</Button>
              <Button variant="contained" color="error" sx={{ width: '10%', marginLeft: '5%' }}><PermPhoneMsgSharpIcon /></Button>
            </Grid>
          </Grid>
        {/* </Card> */}

      </section>
      <Footer />
    </div>
  );
};

export default Member;
