import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About Us/About";
import Home from "./Pages/Home/Home";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";
import Forgetpass from "./Pages/Forgetpassword/Forgetpass";
import Changepassword from "./Pages/ChangePassword/Changepassword";
import SearchBar from "./Components/SearchBar/SearchBar";
import PageNotFound from "./Components/No Data Page/PageNotFound";
import PublicRoute from "./Components/Routes/PublicRoute";
import CustomerPro from "./Pages/CustomerProfile/CustomerPro";
import YourBooking from "./Components/YourBookings/YourBooking";
import Terms from "./Pages/Terms/Terms";
import Privacy from "./Pages/Privacy/Privacy";
import HotelResults from "./Pages/HotelsResults/HotelResults";
import HotelDetail from "./Pages/HotelDetail/HotelDetail";
import Member from "./Pages/Member/Member";
import JoinOurNetwork from "./Pages/JoinOurNetwork/JoinOurNetwork";
import Favourite from "./Pages/Favourite/Favourite";
import MobileOffer from "./Pages/Offer/MobileOffer";
import PrivacyMob from "./Pages/MobilePages/PrivacyMob";
import TermsMob from "./Pages/MobilePages/TermsMob";
import AboutMob from "./Pages/MobilePages/AboutMob";
import ContactUsMob from "./Pages/MobilePages/ContactUsMob";
import Booking from "./Pages/Booking/Booking";
import Refund from "./Pages/Refund/Refund";
import SuccessPage from "./Pages/TransectionPage/SuccessPage";
import FailedPage from "./Pages/TransectionPage/FailedPage";
import { isMobile } from "react-device-detect";
import MobileBackground from "./images/MobileBackground.jpg";
import { useEffect } from "react";
import TravelLoginSignup from "./Pages/Travel Partner Pages/TravelLoginSignup";
import TravelHome from "./Pages/Travel Partner Pages/TravelHome";
import TravelProfile from "./Pages/Travel Partner Pages/TravelProfile";
import AllCities from "./Pages/AllCities/AllCities";
import CcavForm from "./Components/Booking/CcavForm";
import SeprateLocation from "./Pages/SepratePage/SeprateLocation";
import instance from "./store/_utils";

function App() {
  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator?.geolocation.getCurrentPosition(
  //       (position) => {
  //         window.localStorage.setItem(
  //           "location",
  //           JSON.stringify({
  //             longitude: position.coords.longitude,
  //             latitude: position.coords.latitude,
  //           })
  //         );
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //       }
  //     );
  //   } else {
  //     console.log("Geolocation is not available in this browser.");
  //   }
  // }, []);

  const location = useLocation();

  const hotelioroomsStructuredData = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Hoteliorooms",
    url: "https://www.hoteliorooms.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.hoteliorooms.com{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  useEffect(() => {
    if (localStorage.getItem("customer")) {
      let customer = JSON.parse(localStorage.getItem("customer"));
      if (customer.mobileNo) {
        instance.get(`/api/get?field=${customer.mobileNo}`).then((res) => {
          if (res.data?.data) {
            localStorage.setItem("customer", JSON.stringify(res.data.data));
          }
        });
      } else if (customer.email) {
        instance.get(`/api/get?field=${customer.email}`).then((res) => {
          if (res.data?.data) {
            localStorage.setItem("customer", JSON.stringify(res.data.data));
          }
        });
      }
    }
  }, []);

  return (
    <div
      style={
        isMobile
          ? {
              backgroundImage: `url(${MobileBackground})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              height: `${
                location.pathname === "/favourite" ? "100vh" : "auto"
              }`,
            }
          : {}
      }
    >
      <script type="application/ld+json">
        {JSON.stringify(hotelioroomsStructuredData)}
      </script>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/signup" element={<PublicRoute Component={Signup} />} />
        <Route path="/signin" element={<PublicRoute Component={Signin} />} />
        <Route path="/forget-password" element={<Forgetpass />} />
        <Route
          path="/reset/password"
          element={<PublicRoute Component={Changepassword} />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms-condition" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/booking-history" element={<YourBooking />} />
        <Route path="/About_Us" element={<AboutMob />} />
        <Route path="/Contact_Us" element={<ContactUsMob />} />
        <Route path="/about-us" element={<About />} />
        <Route path={`/customer-profile/:id`} element={<CustomerPro />} />
        <Route path="/searched-hotels" element={<HotelResults />} />
        <Route path="/searched-hotel/:id" element={<HotelDetail />} />
        <Route path="/hotelio-member" element={<Member />} />
        <Route path="/JoinOurNetwork" element={<JoinOurNetwork />} />
        <Route path="/Refund" element={<Refund />} />
        <Route path="/Transaction_Status" element={<SuccessPage />} />
        <Route path="/Payment_failed" element={<FailedPage />} />
        <Route path="/allCities" element={<AllCities />} />
        <Route path="/:city" element={<SeprateLocation />} />
        <Route path="/ccav" element={<CcavForm />} />

        {/* Mobile pages */}

        <Route path="/favourite" element={<Favourite />} />
        <Route path="/offer" element={<MobileOffer />} />
        <Route path="/Privacy&policy" element={<PrivacyMob />} />
        <Route path="/Terms&condition" element={<TermsMob />} />

        {/* Travel Partner */}

        <Route path="/Travel-Partner-Auth" element={<TravelLoginSignup />} />
        <Route path="/Travel-Partner-Home" element={<TravelHome />} />
        <Route path="/Travel-Partner-Profile" element={<TravelProfile />} />
      </Routes>
    </div>
  );
}

export default App;
