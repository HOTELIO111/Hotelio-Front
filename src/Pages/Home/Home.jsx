import React from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Featured from "../../Components/featured/Featured";
import FeaturedProperties from "../../Components/featuredProperties/FeaturedProperties";
import Footer from "../../Components/footer/Footer";
import MailList from "../../Components/mailList/MailList";
// import PropertyList from "../../Components/propertyList/PropertyList";
import style from "./home.module.css";
import FeaturedBanner from '../../images/FeaturedBanner.jpg'
import { useMediaQuery } from "@mui/material";
import Process from "../../Components/Process/Process";
import WeServe from "../WeServe/WeServe";
import SliderCarousel from "../../Components/Slider/SliderCarousel";
import Offer from "../../Components/Offer/Offer";
import WhyChooseUs from "../../Components/WhyChooseUs/WhyChooseUs";
import AboutUs from "../../Components/AboutUs/AboutUs";
import NewOffer from "../../Components/NewOffer/NewOffer";
import Testimonial from "../../Components/Testimonial/Testimonial";
import QuickFilterNav from "../QuickFilterNav/QuickFilterNav";

const Home = (props) => {
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  const isXtraSmallScreen = useMediaQuery("(max-width: 450px)");
  const logout = () => {
    window.open(`${api}/user/logout`, "_self");
  };

  // State For Logged In User
  const [user, setUser] = useState(null);

  // Api Request To Get Logged In User
  const getUser = async () => {
    try {
      const url = `${api}/user/login`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: ` linear-gradient(0deg, rgba(186,221,231,0.8688725490196079) 0%, rgba(255,255,255,0) 100%), url(${FeaturedBanner})`,
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar list={true} />
      {/* <QuickFilterNav /> */}
      <NewOffer />
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



      <div className={`${style.homeContainer} container text-center`}>


        <AboutUs />
        <h1
          className={`${style.homeTitle} text-dark  fw-bold pb-4 ${isXtraSmallScreen ? "fs-4" : "fs-3"
            }`}
        >
          Our Testimonial
        </h1>
      </div>

      <Testimonial />

      {/* <div className={` ${style.homeContainer} container text-center`}>


        <h1
          className={` text-dark ${style.homeTitle}  fw-bold pb-4 ${isXtraSmallScreen ? "fs-4" : "fs-3"
            }`}
        >
          Explore Premium Partner's Properties With Hotelio
        </h1>
      </div> */}

      {/* <SliderCarousel /> */}
      <Footer />
    </div>
  );
};

export default Home;
