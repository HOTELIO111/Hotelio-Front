import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
// import PropertyList from "../../Components/propertyList/PropertyList";
import style from "./home.module.css";
import { useMediaQuery } from "@mui/material";
import Process from "../../Components/Process/Process";
import WeServe from "../WeServe/WeServe";
import SliderCarousel from "../../Components/Slider/SliderCarousel";
import AboutUs from "../../Components/AboutUs/AboutUs";
import Testimonial from "../../Components/Testimonial/Testimonial";
import MobileNav from "../../Components/MobileComponent/MobileNav";
import FirstTimePopup from "../FirstTimePopup/FirstTimePopup";
import { Helmet } from "react-helmet";

const Home = (props) => {
  const isXtraSmallScreen = useMediaQuery("(max-width: 450px)");

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      // Show the popup
      localStorage.setItem('hasSeenPopup', 'false');
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Online hotel Booking in India | Hotelio</title>
        <meta name="keywords"
          content="online hotel booking, hoteliorooms, hotelio, online hotel booking in india, best hotel in lucknow,hotel booking in lucknow, five star hotel in lucknow" />

      </Helmet>
      {localStorage.getItem('hasSeenPopup') !== 'true' && <FirstTimePopup />}
      <div className="d-lg-none d-xl-none">
        <MobileNav />
      </div>
      <div
        className="d-none d-md-none d-sm-none d-lg-block d-xl-block"
      >
        <Navbar list={true} />
        {/* <QuickFilterNav /> */}
        {/* <NewOffer /> */}
        <div className={`${style.homeContainer} container text-center`}>
          {/* <p>Promotions, deals and special offers for you</p> */}
          {/* <Offer /> */}

          {/* <h1
          className={`${style.homeTitle} text-dark fw-bold ${isXtraSmallScreen ? "fs-4" : "fs-3"
            }`}
        >
          What will you get if you'll join us
        </h1> */}

          {/* <WhyChooseUs /> */}

          {/* <Featured /> */}
          
        </div>

        <Process />
        <WeServe />


        <AboutUs />
        <div className={`${style.homeContainer} container text-center`}>
          {/* <h1
          className={`${style.homeTitle} text-dark  fw-bold pb-4 ${
            isXtraSmallScreen ? "fs-4" : "fs-3"
          }`}
        >
          Our Testimonial
        </h1> */}
        </div>


        <div className={` ${style.homeContainer} container text-center`}>


          <h1
            className={` text-dark ${style.homeTitle}  fw-bold pb-4 ${isXtraSmallScreen ? "fs-4" : "fs-3"
              }`}
          >
            Explore Premium Partner's Properties With Hotelio
          </h1>
        </div>

        <SliderCarousel />

        <Testimonial />

        <Footer />
      </div>
    </>
  );
};

export default Home;
