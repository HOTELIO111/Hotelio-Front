import React from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import MobileFooter from "../../Components/MobileComponent/MobileFooter";
import LoginLogo from "../../images/HotelioLogo.png";
import TRAVELBR from "../../images/TRAVELBR.png";
import StepsForm from "./StepsForm";
import { isMobile } from "react-device-detect";

const Signin = () => {

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link to="/">www.hoteliorooms.com</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }



  return (
    // <div style={{ background: 'url(https://assets.cntraveller.in/photos/63b80c6d79d81704e445df00/master/pass/Westin%20Himalayas%20facade.jpg)', backgroundSize: 'cover', minHeight: '100vh' }}>
    //   <Grid container mt={0} spacing={2}>
    //     <Grid className="d-none d-sm-block" item xs={12} md={12} lg={7} xl={7}>
    //       <div className="text-center">
    //         <img
    //           src={LoginLogo}
    //           alt="Main"
    //           className="animate__animated animate__fadeInDown"
    //           style={{ width: "260px", height: "200px" }}
    //         />
    //         <Typography className="animate__animated animate__backInUp" fontWeight={800} color={"white"} variant="h4">Welcome To Hotelio, Your Travel Partner</Typography>
    //       </div>
    //     </Grid>
    //     <Grid sx={{ background: '#ffffff', minHeight: '100vh' }} item xs={12} md={12} lg={5} xl={5}>
    //       <StepsForm />
    //       <Copyright />
    //       <div className="d-md-block d-lg-none d-xl-none">
    //         <MobileFooter />
    //       </div>
    //     </Grid>
    //   </Grid>
    // </div>
    <div
      style={{ background: '#fff', height: '100vh' }}
    >
      <marquee
        style={{
          color: "#fff",
          fontWeight: "900",
          background: "#ff0000",
        }}
        behavior="alternate"
        direction="left"
      >
        <h5>
          <b>
            Get 999 INR instantly Credit in your account on Sign Up.  Also
            become eligible for refer and earn.
          </b>
        </h5>
      </marquee>
      <div className="d-flex w-100">
        <NavLink to="/">
          <img
            src={LoginLogo}
            alt="Main"
            style={{ width: "260px", height: "150px" }}
          />
        </NavLink>
        <div style={{ clipPath: "circle(30% at 50% 0)", background: "#ee2e24", height: '150px', display: 'grid', placeItems: 'center', width: '100%', marginRight: '250px' }}>

          <Typography
            sx={{
              backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(48,131,229,1) 80%)',
              backgroundClip: 'text',
              color: 'transparent'
            }}
            variant="h4" fontWeight={700}>Welcome To Hotelio, <br />Your Travel Partner</Typography>
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={4} xl={4}
        // sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div>
            <img height={400} src="https://img.freepik.com/free-vector/couple-booking-hotel-room_74855-2362.jpg?w=740&t=st=1698219619~exp=1698220219~hmac=edb86fcc80967048bbe6120e17d70cd6425d3640ea36f58d9aca5cfaca2b412b" alt=".." />
            <Typography
              sx={{
                backgroundImage: 'linear-gradient(90deg, rgba(238,46,36,1) 0%, rgba(48,131,229,1) 80%)',
                backgroundClip: 'text',
                color: 'transparent',
                pl: 1
              }}
              variant="h4"
              fontWeight={700}
            >
              Get 999 INR instantly Credit in your account on Sign Up.</Typography>
          </div>

        </Grid>
        <Grid sx={{ background: '#ffffff', borderRadius: '8px' }} item xs={12} md={12} lg={4} xl={4}>
          <div style={{ margin: '10px' }}>
            <StepsForm />
            <Copyright />
            <div className="d-md-block d-lg-none d-xl-none">
              <MobileFooter />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4} sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center' }} >
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <Typography
              sx={{
                backgroundImage: 'linear-gradient(90deg, rgba(238,46,36,1) 0%, rgba(48,131,229,1) 80%)',
                backgroundClip: 'text',
                color: 'transparent',
                p: 1
              }}
              variant="h3"
              fontWeight={700}
            >
              Book Now
            </Typography>
            <img src={TRAVELBR} alt=".." />
          </div>
        </Grid>
      </Grid>
    </div >
  );
};

export default Signin;
