import "./App.css";
import { Route, Routes } from "react-router-dom";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About Us/About";
import Home from "./Pages/Home/Home";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";
import Forgetpass from "./Pages/Forgetpassword/Forgetpass";
import Changepassword from "./Pages/ChangePassword/Changepassword";
import SearchBar from "./Components/SearchBar/SearchBar";
import PageNotFound from "./Components/No Data Page/PageNotFound";
import Featured_skeleton from "./Components/Skeletons/Featured_skeleton";
import PublicRoute from "./Components/Routes/PublicRoute";
import CustomerPro from "./Pages/CustomerProfile/CustomerPro";
import YourBooking from './Components/YourBookings/YourBooking'
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

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/signup" element={<PublicRoute Component={Signup} />} />
        <Route path="/signin" element={<PublicRoute Component={Signin} />} />
        <Route path="/forgetpassword" element={<Forgetpass />} />
        <Route
          path="/reset/password"
          element={<PublicRoute Component={Changepassword} />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/skeleton" element={<Featured_skeleton />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/tems' element={<Terms />} />
        <Route path="/Terms&condition" element={<TermsMob />} />
        <Route path="/Privacy&policy" element={<PrivacyMob />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/YourBooking' element={<YourBooking />} />
        <Route path="/About_Us" element={<AboutMob />} />
        <Route path="/Contact_Us" element={<ContactUsMob />} />
        <Route path="/about" element={<About />} />
        <Route path='/CustomerNameProfile' element={<CustomerPro />} />
        <Route path='/searchedhotels' element={<HotelResults />} />
        <Route path='/searchedhotel/:id' element={<HotelDetail />} />
        <Route path='/hoteliomember' element={<Member />} />
        <Route path='/JoinOurNetwork' element={<JoinOurNetwork />} />
        <Route path='/Refund' element={<Refund />} />

        {/* Mobile pages */}

        <Route path="/favourite" element={<Favourite />} />
        <Route path="/offer" element={<MobileOffer />} />
      </Routes>
    </>
  );
}

export default App;
