import style from "./footer.module.css";
import { Link } from "react-router-dom";
import MailList from "../mailList/MailList";
import { useMediaQuery } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InfoIcon from "@mui/icons-material/Info";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import PaymentsIcon from '@mui/icons-material/Payments';
import PolicyIcon from '@mui/icons-material/Policy';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SpaIcon from '@mui/icons-material/Spa';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import HotTubIcon from '@mui/icons-material/HotTub';
import Applestore from '../../images/apple.png'
import Playstore from '../../images/playstored.png'

const Footer = () => {
  const isXtraSmallScreen = useMediaQuery("(max-width:576px)");

  return (
    <footer
      className="pt-4 pb-4 text-white position-absolute end-0 container-fluid"
      style={{ backgroundColor: "#ff0600", marginTop: "25px" }}
    >
      <div className="container text-md-left">
        <div
          className={`row  ${isXtraSmallScreen ? "text-start ms-2" : "text-start"
            } text-md-left justify-content-between`}
        >
          <div
            className={`col-lg-5 ${isXtraSmallScreen ? "ps-4" : ""
              } my-1 col-xl-3 col-md-5 col-sm-5 col-8`}
          >
            <h5 className="text-uppercase" style={{ fontSize: "20px" }}>
              About Us
            </h5>
            <p className="mt-4 text-white">Hotelio Is Online Booking Platform for Easy And Comfortable
              stay For Travelers throug Hotelio app and Hotelio Web.
              It was founded In 13th may 2023 , Hotelio is owning
              by Company 'Houda Carjour Tourism pvt Ltd'
              Registered at Roc Kanpur Uttar pradesh.
              Hotelio is India's trusted and fastest
              growing hotel chain network.
              It's India's first AI Enabled app and website.</p>
            {/* <ul className={`${style.fList} mt-4`}>
              <li className={style.fListItem}>
                <Link to="/" className="d-flex justify-content-start">
                  <Hotel className="me-2" />
                  <span className="fs-6">Hotel</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/parking" className="d-flex justify-content-start">
                  <DirectionsCarIcon className="me-2" />
                  <span className="fs-6">Parking</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link
                  to="/HotelAndParking"
                  className="d-flex justify-content-start"
                >
                  <Hotel className="me-2" />
                  <span className="fs-6">Hotel And Parking</span>
                </Link>
              </li>
            </ul> */}
          </div>
          <div
            className={`col-lg-5 ${isXtraSmallScreen ? "ps-4" : ""
              } my-1 col-xl-3 col-md-5 col-sm-5 col-8`}
          >
            <h4 className="text-uppercase" style={{ fontSize: "20px" }}>
              Useful Links
            </h4>

            <ul className={`${style.fList} mt-4`}>
              <li className={style.fListItem}>
                <Link to="/about" className="d-flex justify-content-start">
                  <InfoIcon className="me-2" />
                  <span className="fs-6">About Us</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/contact" className="d-flex justify-content-start">
                  <PermPhoneMsgIcon className="me-2" />
                  <span className="fs-6">Contact Us</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/about" className="d-flex justify-content-start">
                  <PaymentsIcon className="me-2" />
                  <span className="fs-6">Refund Policy</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/privacy" className="d-flex justify-content-start">
                  <PolicyIcon className="me-2" />
                  <span className="fs-6">Privacy & Policy</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/tems" className="d-flex justify-content-start">
                  <VerifiedUserIcon className="me-2" />
                  <span className="fs-6">Terms & Condition</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/about" className="d-flex justify-content-start">
                  <GroupAddIcon className="me-2" />
                  <span className="fs-6">Join Our Network</span>
                </Link>
              </li>

            </ul>
          </div>
          <div
            className={`col-lg-5 ${isXtraSmallScreen ? "ps-4" : ""
              } my-1 col-xl-3 col-md-5 col-sm-5 col-8`}
          >
            <h4 className="text-uppercase" style={{ fontSize: "20px" }}>
              Hotelio Facilities
            </h4>

            <ul className={`${style.fList} mt-4`}>
              <li className={style.fListItem}>
                <Link to="/" className="d-flex justify-content-start">
                  <SpaIcon className="me-2" /> Spa
                </Link>
                <Link to="/" className="d-flex justify-content-start">
                  <FitnessCenterIcon className="me-2" />  Fitness Center
                </Link>
                <Link to="/" className="d-flex justify-content-start">
                  <PoolIcon className="me-2" /> Swimming Pool
                </Link>
                <Link to="/" className="d-flex justify-content-start">
                  <HotTubIcon className="me-2" /> Jacuzzi bath
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`col-lg-5 ${isXtraSmallScreen ? "ps-4" : ""
              } my-1 col-xl-3 col-md-5 col-sm-5 col-8`}
          >
            <h4 className="text-uppercase" style={{ fontSize: "20px" }}>
              Contact Us
            </h4>

            <ul className={`${style.fList} mt-4`}>
              <li className={style.fListItem}>
                <Link to="/contact" className="d-flex justify-content-start">
                  <CallIcon className="me-2" />{" "}
                  <span className=" fs-6">+91 (811) 5510050</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/contact" className="d-flex justify-content-start">
                  <CallIcon className="me-2" />
                  <span className="fs-6">+91 (729) 0900835</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/contact" className="d-flex justify-content-start">
                  <EmailIcon className="me-2" />
                  <span className="fs-6">info@hoteliorooms.com</span>
                </Link>
              </li>
            </ul>
            <div
              className={`${isXtraSmallScreen ? "text-center" : "text-start"
                }`}
            >
              <InstagramIcon className={`mx-1 fs-1  ${style.insta} `} />
              <FacebookIcon className={`mx-1 fs-1 ${style.facebook}`} />
              <TwitterIcon className={`mx-1 fs-1 ${style.tweeter}`} />
              <LinkedInIcon className={`mx-1 fs-1 ${style.linkedin}`} />
            </div>
          </div>
          {/* <div className="col-lg-5 my-1 col-xl-3 col-md-5 col-sm-5 col-8">
            <MailList />
          </div> */}
          <hr className="mt-3 " />
          <div className="row m-0">
            <div
              className={`${style.footersec5}  ${isXtraSmallScreen ? "text-center" : "text-start"}  col-xl-6 col-md-6 col-12 `}
            >
              {/* <InstagramIcon className={`mx-1 fs-1  ${style.insta} `} />
              <FacebookIcon className={`mx-1 fs-1 ${style.facebook}`} />
              <TwitterIcon className={`mx-1 fs-1 ${style.tweeter}`} />
              <LinkedInIcon className={`mx-1 fs-1 ${style.linkedin}`} /> */}
              {/* <p>Download Hotelio app for excitng offers.</p> */}
              <div className="d-flex align-items-center">
                <img style={{ width: '150px' }} src={Applestore} alt="applestore" />

                <img style={{ width: '150px' }} src={Playstore} alt="playstored" />
              </div>

            </div>
            <div
              className={`${isXtraSmallScreen ? "text-center" : "text-end"
                }  col-xl-6 col-md-6 col-12`}
              style={{ fontSize: "20px" }}
            >
              2023 © www.hoteliorooms.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
