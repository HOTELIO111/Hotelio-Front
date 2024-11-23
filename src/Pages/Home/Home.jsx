import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import style from "./home.module.css";
import { Typography, useMediaQuery } from "@mui/material";
import Process from "../../Components/Process/Process";
import WeServe from "../WeServe/WeServe";
import SliderCarousel from "../../Components/Slider/SliderCarousel";
import AboutUs from "../../Components/AboutUs/AboutUs";
import Testimonial from "../../Components/Testimonial/Testimonial";
import MobileNav from "../../Components/MobileComponent/MobileNav";
import FirstTimePopup from "../FirstTimePopup/FirstTimePopup";
import { Helmet } from "react-helmet";
import { GetAllSliderAction } from "../../store/actions/SliderAction";
import AppQR from "../../Components/AppQR";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllSliderAction());
  }, []);

  const HotelReview = useSelector(
    (state) => state.GetHotelioReviewReducer.data
  );
  const HotelSlider = useSelector((state) => state.GetAllSliderReducer.data);
  const isXtraSmallScreen = useMediaQuery("(max-width: 450px)");
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      // Show the popup
      localStorage.setItem("hasSeenPopup", "false");
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Online Hotel Booking Sites in India | Hoteliorooms</title>
        <meta
          name="keywords"
          content="online hotel booking, hoteliorooms, hotelio, online hotel booking in india, best hotel in lucknow,hotel booking in lucknow, five star hotel in lucknow"
        />
      </Helmet>
      {localStorage.getItem("hasSeenPopup") !== "true" && <FirstTimePopup />}
      <div className="d-lg-none d-xl-none">
        <MobileNav />
      </div>
      <div className="d-none d-md-none d-sm-none d-lg-block d-xl-block">
        <Navbar list={true} />
        {/* <QuickFilterNav /> */}
        {/* <NewOffer /> */}
        {/* <div className={`${style.homeContainer} container text-center`}>
          <p>Promotions, deals and special offers for you</p>
          <Offer />

          <h1
          className={`${style.homeTitle} text-dark fw-bold ${isXtraSmallScreen ? "fs-4" : "fs-3"
            }`}
        >
          What will you get if you'll join us
        </h1>

          <WhyChooseUs />

          <Featured />

        </div> */}

        <Process />
        <WeServe />

        <AboutUs />
        {/* <div className={`${style.homeContainer} container text-center`}>
          <h1
          className={`${style.homeTitle} text-dark  fw-bold pb-4 ${
            isXtraSmallScreen ? "fs-4" : "fs-3"
          }`}
        >
          Our Testimonial
        </h1>
        </div> */}

        <div className={` ${style.homeContainer} container text-center`}>
          <h2
            className={` text-dark ${style.homeTitle}  fw-bold pb-4 ${
              isXtraSmallScreen ? "fs-4" : "fs-3"
            }`}
          >
            Explore Premium Partner's Properties With Hotelio
          </h2>
        </div>

        {HotelSlider?.data?.length > 0 ? (
          <SliderCarousel SliderData={HotelSlider} />
        ) : null}

        <div className="p-2 pb-4">
          <hr />
          <Typography variant="body1">
            A comfortable and convenient stay is the invariable part of
            wanderlust, and it is ensured when your search for a room is
            accomplished by getting a <b>deluxe rooms</b> as per your desire and
            intention. Here at the hotelio rooms, all data and information are
            explicitly delivered, making your trips unforgettable and as per the
            gallery, you get the perfect <b>luxury rooms</b> after booking from
            the hotelio rooms. It’s one of the leading platforms where you can
            get instant response and evergreen assistance for your trip and
            pleasant stay.
          </Typography>
        </div>
        <AppQR />

        {HotelReview?.data?.length > 0 ? <Testimonial /> : null}
        <Footer />
      </div>
    </>
  );
};

export default Home;
