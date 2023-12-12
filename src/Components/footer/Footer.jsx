import style from "./footer.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, useMediaQuery } from "@mui/material";
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
import TtyIcon from "@mui/icons-material/Tty";
import SendIcon from "@mui/icons-material/Send";
import Applestore from "../../images/apple.png";
import Playstore from "../../images/playstored.png";
import { AiFillCaretRight } from "react-icons/ai";
import SavingsIcon from "@mui/icons-material/Savings";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import VISALOGO from "../../images/VISALogo.webp";
import MASTERCARDLOGO from "../../images/MasterCardLogo.webp";
import UPILOGO from "../../images/UPILogo.webp";
import RUPAYLOGO from "../../images/RUPAYLogo.webp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetPopularLocationAction } from "../../store/actions/locationsActions";
import { useSearch } from "../../context/useSearch";
import { MdHomeWork } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { HiBuildingOffice2 } from "react-icons/hi2";



const Footer = () => {
  const isXtraSmallScreen = useMediaQuery("(max-width:320px)");
  const { GetLocationData } = useSearch();
  const allLocation = useSelector(
    (state) => state.GetALlPopularLocationReducer
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const locations = [
    "Hotelio near me",
    "Hotelio in Manali",
    "Hotelio in Nanital",
    "Hotelio in Mount Abu",
    "Hotelio in Agra",
    "Hotelio in Agra",
    "Hotelio in Agra",
    "Hotelio in Agra",
    "Hotelio in Agra",
    "Hotelio in Agra",
    // Add more locations here...
  ];

  const generateListItems = () => {
    return locations.map((location, index) => (
      <li key={index}>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/:city")}>
          {location} <AiFillCaretRight />
        </span>
      </li>
    ));
  };

  const HandleLocationSearch = async (item) => {
    // const data = await GetLocationData(
    //   1,
    //   item?.location?.coordinates[1],
    //   item?.location?.coordinates[0],
    //   item?.address,
    //   item?.endpoint
    // );
    navigate(`/${item?.endpoint}`, { state: item });
  };
  useEffect(() => {
    dispatch(GetPopularLocationAction());
  }, []);

  return (
    <footer
      className={`pt-4 pb-4 text-white  container-fluid ${style.footerBanner}`}
    >
      <div className={`container-fluid ${style.mobremove}`}>
        <h4>Hotelio Rooms</h4>
        {/* <div className={style.locationFooter}>
          {allLocation?.data?.data?.map((item, index) => (
            <li key={index}>
              <span style={{ cursor: "pointer" }} onClick={() => HandleLocationSearch(item)}>
                {item?.endpoint} <AiFillCaretRight />
              </span>
            </li>

          ))}
        </div> */}
        <Grid
          sx={{ color: "#ffb000", fontWeight: "700" }}
          container
          py={2}
          spacing={2}
        >
          {allLocation?.data?.data?.map((item, index) => (
            <Grid item xs={3}>
              <ul>
                <li key={index}>
                  <span style={{ cursor: "pointer" }} onClick={() => HandleLocationSearch(item)}>
                    {item?.endpoint} <AiFillCaretRight />
                  </span>
                </li>
              </ul>
            </Grid>
          ))}
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
              } my-1 col-lg-4 col-xl-4 col-sm-12`}
          >
            <h5 className="text-uppercase" style={{ fontSize: "20px" }}>
              About Us
            </h5>
            <p className="mt-4 text-white">
              India's leading online booking platform, revolutionizes the way
              travelers find and book accommodations. With our user-friendly app
              and website, we bring easy and comfortable stays to your
              fingertips. Explore our vast network of premium hotels,
              budget-friendly options, and authentic homestays. As India's first
              AI-enabled platform, we prioritize your comfort and provide
              hassle-free check-ins.
            </p>
            <div
              style={{
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.236)",
              }}
              className="border w-100 d-flex justify-content-end"
            >
              <input
                className="w-100 bg-transparent border-0 p-1"
                type="text"
              />
              <Button variant="text">
                <SendIcon />
              </Button>
            </div>
          </div>

          <div
            className={`col-lg-5 ${isXtraSmallScreen ? "ps-4" : ""
              } my-1 col-xl-5 col-sm-12`}
          >
            <div className="row">
              <div className=" col-lg-6 col-xl-6 col-xs-12">
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
                    <Link
                      to="/contact"
                      className="d-flex justify-content-start"
                    >
                      <PermPhoneMsgIcon className="me-2" />
                      <span className="fs-6">Contact Us</span>
                    </Link>
                  </li>
                  <li className={style.fListItem}>
                    <Link to="/Refund" className="d-flex justify-content-start">
                      <PaymentsIcon className="me-2" />
                      <span className="fs-6">Refund Policy</span>
                    </Link>
                  </li>
                  <li className={style.fListItem}>
                    <Link
                      to="/privacy"
                      className="d-flex justify-content-start"
                    >
                      <PolicyIcon className="me-2" />
                      <span className="fs-6">Privacy & Policy</span>
                    </Link>
                  </li>
                  <li className={style.fListItem}>
                    <Link
                      to="/terms-condition"
                      className="d-flex justify-content-start"
                    >
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
              <div className="col-lg-6 col-xl-6 col-xs-12">
                <h4 className="text-uppercase" style={{ fontSize: "20px" }}>
                  Room Categories
                </h4>
                <ul className={`${style.fList} mt-4`}>
                  <li
                    className={` ${style.fListItem} ${isXtraSmallScreen ? "text-center" : "text-start"
                      }`}
                  >
                    <Link to="/" className="d-flex justify-content-start">
                      <FilterVintageIcon className="me-2" /> Classic Room
                    </Link>
                    <Link to="/" className="d-flex justify-content-start">
                      <WorkspacePremiumIcon className="me-2" /> Delux Room
                    </Link>
                    <Link to="/" className="d-flex justify-content-start">
                      <BusinessCenterIcon className="me-2" /> Executive Room
                    </Link>
                    <Link to="/" className="d-flex justify-content-start">
                      <VideoCameraFrontIcon className="me-2" /> Suites
                    </Link>
                    <Link to="/" className="d-flex justify-content-start">
                      <MdHomeWork className="me-2" /> Hotelio Home Stay
                    </Link>
                    <Link to="/" className="d-flex justify-content-start">
                      <HiBuildingOffice2 className="me-2" /> Hotelio Premium
                    </Link>
                    <Link to="/" className="d-flex justify-content-start">
                      <BsFillBuildingsFill className="me-2" /> Hotelio Budget
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`col-lg-3 ${isXtraSmallScreen ? "ps-4" : ""
              } my-1 col-xl-3 col-sm-12`}
          >
            <h4 className="text-uppercase" style={{ fontSize: "20px" }}>
              Contact Us
            </h4>

            <ul className={`${style.fList} mt-4`}>
              <li className={style.fListItem}>
                <Link to="/contact" className="d-flex justify-content-start">
                  <TtyIcon className="me-2" />{" "}
                  <span className=" fs-6"> 0522-4329787 </span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/contact" className="d-flex justify-content-start">
                  <LocalPhoneRoundedIcon className="me-2" />
                  <span className="fs-6">+91 (811) 5510050</span>
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
            <div
              className="col-xl-6 col-md-12 col-12"
              style={{
                fontSize: "20px",
                display: "grid",
                placeItems: "center",
              }}
            >
              © 2023 Hotelio is owned by Houda Carjour Tourism Pvt Ltd
              <small style={{ color: "#FFB000", fontWeight: "600" }}>
                Designed & Developed By Trickle Solutions
              </small>
            </div>
            <div
              className={`col-xl-3 col-md-12 col-12`}
              style={{
                fontSize: "20px",
                display: "grid",
                placeItems: "center",
              }}
            >
              <div className={` ${style.acceptPaymentStyle}`}>
                <img src={VISALOGO} alt="VISALOGO" />
                <img src={MASTERCARDLOGO} alt="MASTERCARDLOGO" />
                <img src={UPILOGO} alt="UPILOGO" />
                <img src={RUPAYLOGO} alt="RUPAYLOGO" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
