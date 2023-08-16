import style from "./footer.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, useMediaQuery } from "@mui/material";
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
import { AiFillCaretRight } from "react-icons/ai";

const Footer = () => {
  const isXtraSmallScreen = useMediaQuery("(max-width:320px)");

  const navigate = useNavigate()

  const locations = [
    'Hotelio near me',
    'Hotelio in Manali',
    'Hotelio in Nanital',
    'Hotelio in Mount Abu',
    'Hotelio in Agra',
    'Hotelio in Agra',
    'Hotelio in Agra',
    'Hotelio in Agra',
    'Hotelio in Agra',
    'Hotelio in Agra',
    // Add more locations here...
  ];

  const generateListItems = () => {
    return locations.map((location, index) => (
      <li key={index} >
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/searchedhotels')}>
          {location} <AiFillCaretRight />
        </span>
      </li>
    ));
  };



  return (
    <footer
      className={`pt-4 pb-4 text-white  container-fluid ${style.footerBanner}`}
    >
      <div className={`container-fluid ${style.mobremove}`}>
        <h4>Hotelio Rooms</h4>
        <Grid container py={2} spacing={2}>
          <Grid item xs={2}>
            <ul>
              {generateListItems()}
            </ul>
          </Grid>
          <Grid item xs={2}>
            <ul>
              {generateListItems()}
            </ul>
          </Grid>
          <Grid item xs={2}>
            <ul>
              {generateListItems()}
            </ul>
          </Grid>
          <Grid item xs={2}>
            <ul>
              {generateListItems()}
            </ul>
          </Grid>
          <Grid item xs={2}>
            <ul>
              {generateListItems()}
            </ul>
          </Grid>
          <Grid item xs={2}>
            <ul>
              {generateListItems()}
            </ul>
          </Grid>
        </Grid>
        <hr />
      </div>
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
              India's leading online booking platform, revolutionizes the way travelers find and book accommodations. With our user-friendly app and website, we bring easy and comfortable stays to your fingertips. Explore our vast network of premium hotels, budget-friendly options, and authentic homestays. As India's first AI-enabled platform, we prioritize your comfort and provide hassle-free check-ins. Join us on a journey where travel meets convenience, and let Hotelio be your trusted partner for unforgettable stays India's leading online booking wherever your adventures take you. Hotelio is owned by Houda Carjour Tourism Pvt Ltd, India's Number 1 Fastest Leading Hotel Chain.
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
                      to="/hoteliomember"
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
                }  col-xl-3 col-md-12 col-12 `}
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
            <div className="col-xl-6 col-md-12 col-12"
              style={{ fontSize: "20px", display: 'grid', placeItems: 'center' }}
            >
              © 2023 Hotelio is owned by Houda Carjour Tourism Pvt Ltd
            </div>
            <div
              className={`col-xl-3 col-md-12 col-12`}
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
