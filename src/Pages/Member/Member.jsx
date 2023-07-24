import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import CardMember from "./CardMember";
import Footer from '../../Components/footer/Footer'
import style from './Member.module.css'
import { Grid } from "@mui/material";

const Member = () => {
  return (
    <div
      className={`${style.MemberBackground}`}
    >
      <Navbar />
      <section>
        <Grid container padding={5} spacing={1} bgcolor={'#ffffff6b'} >
          <Grid item xs={12} xl={7} sx={{ display: 'grid', placeItems: 'center' }} >
            <h3>Hotelio Business Promises</h3>
            <div>
              <ul>
                <li style={{padding:'20px 0px'}}>
                  <h4>Save Cost</h4>
                  <p>Get easy access to 4000+ Hotelio properties with up to 40% savings, manage all your company bookings on a single portal, and say good-bye to third-party commissions.</p>
                </li>
                <li style={{padding:'20px 0px'}}>
                  <h4>Save Time</h4>
                  <p>With OYO B’s effortless interface, have all your bookings at your fingertips anytime you need them.</p>
                </li>
                <li style={{padding:'20px 0px'}}>
                  <h4>Provide Transparency</h4>
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
      <CardMember />
      <Footer />
    </div>
  );
};

export default Member;
