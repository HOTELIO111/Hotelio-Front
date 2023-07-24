import style from "./footer.module.css";
import { Link } from "react-router-dom";
import { Button, useMediaQuery } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InfoIcon from "@mui/icons-material/Info";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import PaymentsIcon from "@mui/icons-material/Payments";
import PolicyIcon from "@mui/icons-material/Policy";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SpaIcon from "@mui/icons-material/Spa";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PoolIcon from "@mui/icons-material/Pool";
import HotTubIcon from "@mui/icons-material/HotTub";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import SendIcon from '@mui/icons-material/Send';
import Applestore from "../../images/apple.png";
import Playstore from "../../images/playstored.png";

const Footer = () => {
  const isXtraSmallScreen = useMediaQuery("(max-width:320px)");

  return (
    <footer
      className={`pt-4 pb-4 text-white  container-fluid ${style.footerBanner}`}
      style={{ backgroundColor: "#ff0600" }}
    >
      <div className="container-fluid">
        <div
          className={`row  ${isXtraSmallScreen ? "text-start ms-2" : "text-start"
            } `}
        >
          <div
            className={`${isXtraSmallScreen ? "ps-4" : ""
              } my-1 col-xl-5 col-sm-12`}
          >
            <h5 className="text-uppercase" style={{ fontSize: "20px" }}>
              About Us
            </h5>
            <p className="mt-4 text-white">
              Hotelio Is Online Booking Platform for Easy And Comfortable stay
              For Travelers throug Hotelio app and Hotelio Web. It was founded
              In 13th may 2023 , Hotelio is owning by Company 'Houda Carjour
              Tourism pvt Ltd' Registered at Roc Kanpur Uttar pradesh. Hotelio
              is India's trusted and fastest growing hotel chain network. It's
              India's first AI Enabled app and website.
            </p>
            <div style={{ borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.236)' }} className="border w-100 d-flex justify-content-end">
              <input className="w-100 bg-transparent border-0 p-1" type="text" />
              <Button variant='text'><SendIcon /></Button>
            </div>
          </div>

          <div
            className={`col-lg-5 ${isXtraSmallScreen ? "ps-4" : ""
              } my-1 col-xl-5 col-sm-12`}
          >
            <div className="row">
              <div className="col-xl-6 col-xs-12">
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
                    <Link
                      to="/JoinOurNetwork"
                      className="d-flex justify-content-start"
                    >
                      <GroupAddIcon className="me-2" />
                      <span className="fs-6">Join Our Network</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-xl-6 col-xs-12">
                <h4 className="text-uppercase" style={{ fontSize: "20px" }}>
                  Hotelio Facilities
                </h4>
                <ul className={`${style.fList} mt-4`}>
                  <li className={` ${style.fListItem} ${isXtraSmallScreen ? "text-center" : "text-start"}`}>
                    <Link to="/" className="d-flex justify-content-start">
                      <SpaIcon className="me-2" /> Spa
                    </Link>
                    <Link to="/" className="d-flex justify-content-start">
                      <FitnessCenterIcon className="me-2" /> Fitness Center
                    </Link>
                    <Link to="/" className="d-flex justify-content-start">
                      <PoolIcon className="me-2" /> Swimming Pool
                    </Link>
                    <Link to="/" className="d-flex justify-content-start">
                      <HotTubIcon className="me-2" /> Jacuzzi bath
                    </Link>
                    <Link to="/" className="d-flex justify-content-start">
                      <AcUnitIcon className="me-2" /> Air Conditioner
                    </Link>
                    <Link to="/" className="d-flex justify-content-start">
                      <RoomServiceIcon className="me-2" /> Restaurant
                    </Link>
                    <Link to="/" className="d-flex justify-content-start">
                      <NetworkWifiIcon className="me-2" /> Free WiFi
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`col-lg-5 ${isXtraSmallScreen ? "ps-4" : ""
              } my-1 col-xl-2 col-sm-12`}
          >
            <h4 className="text-uppercase" style={{ fontSize: "20px" }}>
              Contact Us
            </h4>

            <ul className={`${style.fList} mt-4`}>
              {/* <li className={style.fListItem}>
                <Link to="/contact" className="d-flex justify-content-start">
                  <CallIcon className="me-2" />{" "}
                  <span className=" fs-6">+91 (811) 5510050</span>
                </Link>
              </li> */}
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
              className={`${isXtraSmallScreen ? "text-center" : "text-start"}`}
            >
              <InstagramIcon className={`mx-1 fs-1  ${style.insta} `} />
              <FacebookIcon className={`mx-1 fs-1 ${style.facebook}`} />
              <TwitterIcon className={`mx-1 fs-1 ${style.tweeter}`} />
              <LinkedInIcon className={`mx-1 fs-1 ${style.linkedin}`} />
            </div>
          </div>

          {/* SUb-Footer */}

          <hr className="mt-3 " />

          <div className="row m-0">
            <div
              className={`${style.footersec5}  ${isXtraSmallScreen ? "text-center" : "text-start"
                }  col-xl-4 col-md-12 col-12 `}
            >
              {/* <InstagramIcon className={`mx-1 fs-1  ${style.insta} `} />
              <FacebookIcon className={`mx-1 fs-1 ${style.facebook}`} />
              <TwitterIcon className={`mx-1 fs-1 ${style.tweeter}`} />
              <LinkedInIcon className={`mx-1 fs-1 ${style.linkedin}`} /> */}
              {/* <p>Download Hotelio app for excitng offers.</p> */}
              <div className="d-flex align-items-center">
                <img
                  style={{ width: "150px" }}
                  src={Applestore}
                  alt="applestore"
                />

                <img
                  style={{ width: "150px" }}
                  src={Playstore}
                  alt="playstored"
                />
              </div>
            </div>
            <div className="col-xl-4 col-md-12 col-12"
              style={{ fontSize: "20px", display: 'grid', placeItems: 'center' }}
            >
              2023 © www.hoteliorooms.com
            </div>
            <div
              className={`col-xl-4 col-md-12 col-12`}
              style={{ fontSize: "20px", display: 'grid', placeItems: 'center' }}
            >
              <div className={` ${style.acceptPaymentStyle}`}>
                <img src="https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png" alt="" />
                <img src="https://freepngimg.com/thumb/mastercard/14-2-mastercard-download-png.png" alt="" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/330px-RuPay.svg.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
