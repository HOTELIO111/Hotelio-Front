import React from "react";
import style from "./About.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import parking1 from "../../images/parking10.jpg";
import Hotel1 from "../../images/hotelPic1.jpg";
import Hotel21 from "../../images/hotelPic21.jpg";
import Hotel23 from "../../images/hotelPic23.jpg";
import Hotel4 from "../../images/hotelPic4.jpg";
import Hotel12 from "../../images/hotelPic12.jpg";
import Hotel3 from "../../images/hotelPic3.jpg";
import Hotel2 from "../../images/hotelPic2.jpg";
import Hotel25 from "../../images/hotelPic25.jpg";
import Hotel6 from "../../images/hotelPic7.jpg";
import DecorImage from '../../images/DecorImage.png'
import DecorImageS from '../../images/DecoreImageS.jpg'
import AboutUsTopBanner from '../../images/AboutUsTopBanner.jpg'
import Client from '../../images/Client.jpg'
import LabelImportantRoundedIcon from "@mui/icons-material/LabelImportantRounded";
import { Images } from "./images";

const About = () => {

  return (
    <>
      <Navbar />
      <div className="conatiner-fluid">
        <section style={{ background: `linear-gradient(37deg, rgba(255,255,255,0.8016456582633054) 0%, rgba(255,255,255,0.38147759103641454) 100%), url(${AboutUsTopBanner})`, backgroundSize: 'cover', backgroundPosition: 'bottom', backgroundAttachment: 'fixed', height: '50vh', display: 'grid', placeItems: 'center' }}>
          <div className="row">
            <div style={{ display: 'grid', placeItems: 'center' }} className="col-12 p-5">
              <div className="border rounded p-2 text-center text-danger">
                <h1><b>About Us</b></h1>
                <h4>Home 	&#62; About Us</h4>
              </div>
            </div>
          </div>
        </section>

        <section style={{ borderTop: '2px solid #ee2e24' }} className={`${style.aboutus_page_section} pt-4 `}>
          <div className="container">
            <div className={style.about_page_text}>
              <div className="row d-flex flex-row justify-content-between">
                <div className="col-lg-6">
                  <div className={style.ap_title}>
                    <h2>Welcome To Hotelio.</h2>
                    <p style={{ fontFamily: "Rubik" }}>
                      India's leading online booking
                      platform, revolutionizes the way travelers
                      find and book accommodations. With our
                      user-friendly app and website, we bring
                      easy and comfortable stays to your
                      fingertips. Explore our vast network of
                      premium hotels, budget-friendly options,
                      and authentic homestays. As India's first
                      AI-enabled platform, we prioritize your
                      comfort and provide hassle-free check-ins.
                      Join us on a journey where travel meets
                      convenience, and let Hotelio be your
                      trusted partner for unforgettable stays
                      India's leading online booking
                      wherever your adventures take you. Hotelio is owned by Houda Carjour Tourism Pvt Ltd, India's Number 1 Fastest Leading Hotel Chain.
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-5  offset-lg-1"
                  style={{ fontFamily: "Rubik" }}
                >
                  <ul className={style.ap_services}>
                    <li>
                      <LabelImportantRoundedIcon color="primary" /> 20% Off On
                      Accommodation.
                    </li>
                    <li>
                      <LabelImportantRoundedIcon color="primary" />{" "}
                      Complimentary Daily Breakfast
                    </li>
                    <li>
                      <LabelImportantRoundedIcon color="primary" /> 3 Pcs
                      Laundry Per Day
                    </li>
                    <li>
                      <LabelImportantRoundedIcon color="primary" /> Free Wifi.
                    </li>
                    <li>
                      <LabelImportantRoundedIcon color="primary" /> Discount 20%
                      On F&B
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={style.about_page_services}>
              <div className="row">
                <div className="col-md-4">
                  <div
                    className={`${style.gallery_item} ${style.set_bg}`}
                    style={{
                      backgroundImage: `url(${Hotel1})`,
                      height: "400px",
                    }}
                  >
                    <div className={style.gi_text}>
                      <h3>Hotel</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className={`${style.gallery_item} ${style.set_bg}`}
                    style={{
                      backgroundImage: `url(${Hotel4})`,
                      height: "400px",
                    }}
                  >
                    <div className={style.gi_text}>
                      <h3>Hotel And Parking</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className={`${style.gallery_item} ${style.set_bg}`}
                    style={{
                      backgroundImage: `url(${parking1})`,
                      height: "400px",
                    }}
                  >
                    <div className={style.gi_text}>
                      <h3>Parking</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: `url(${DecorImageS})`, backgroundSize: 'contain' }} className={style.hp_room_section}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className={style.section_title}>
                  <h2>Discover Our Hotelio Categories</h2>
                </div>
              </div>
            </div>
            <div className={style.hp_room_items}>
              <div className="row mx-1">
                <div className="col-lg-4 col-md-6">
                  <div
                    className={`${style.hp_room_item} ${style.gallery_item} ${style.set_bg}`}
                    style={{ backgroundImage: `url(${Hotel21})` }}
                  >
                    <div className={style.hr_text}>
                      <h3 className="fw-bold fs-3">Hotelio Premium</h3>
                      <h2 style={{ color: '#ee2e24' }} className="fs-4 ">
                        1000₹<span>/Pernight</span>
                      </h2>
                      <table>
                        <tbody>
                          <tr>
                            <td className={style.r_o}>Size:</td>
                            <td>30 ft</td>
                          </tr>
                          <tr>
                            <td className={style.r_o}>Capacity:</td>
                            <td>Max persion 2</td>
                          </tr>
                          <tr>
                            <td className={style.r_o}>Bed:</td>
                            <td>King Beds</td>
                          </tr>
                          <tr>
                            <td className={style.r_o}>Services:</td>
                            <td>Wifi, Television, Bathroom,...</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div
                    className={`${style.hp_room_item} ${style.gallery_item} ${style.set_bg}`}
                    style={{ backgroundImage: `url(${Hotel23})` }}
                  >
                    <div className={style.hr_text}>
                      <h3 className="fw-bold fs-3">Hotelio Home Stay</h3>
                      <h2 style={{ color: '#ee2e24' }} className="fs-4">
                        1590₹<span>/Pernight</span>
                      </h2>
                      <table>
                        <tbody>
                          <tr>
                            <td className={style.r_o}>Size:</td>
                            <td>30 ft</td>
                          </tr>
                          <tr>
                            <td className={style.r_o}>Capacity:</td>
                            <td>Max persion 3</td>
                          </tr>
                          <tr>
                            <td className={style.r_o}>Bed:</td>
                            <td>King Beds</td>
                          </tr>
                          <tr>
                            <td className={style.r_o}>Services:</td>
                            <td>Wifi, Television, Bathroom,...</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div
                    className={`${style.hp_room_item} ${style.gallery_item} ${style.set_bg}`}
                    style={{ backgroundImage: `url(${Hotel25})` }}
                  >
                    <div className={style.hr_text}>
                      <h3 className="fw-bold fs-3">Hotelio Budget</h3>
                      <h2 style={{ color: '#ee2e24' }} className="fs-4">
                        1980₹<span className="">/Pernight</span>
                      </h2>
                      <table>
                        <tbody>
                          <tr>
                            <td className={style.r_o}>Size:</td>
                            <td>30 ft</td>
                          </tr>
                          <tr>
                            <td className={style.r_o}>Capacity:</td>
                            <td>Max persion 5</td>
                          </tr>
                          <tr>
                            <td className={style.r_o}>Bed:</td>
                            <td>King Beds</td>
                          </tr>
                          <tr>
                            <td className={style.r_o}>Services:</td>
                            <td>Wifi, Television, Bathroom,...</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: `url(${DecorImageS})`, backgroundSize: 'cover' }} className={`${style.gallery_section}`}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className={style.section_title}>
                  <h1><u><b>Our Hotels</b></u></h1>
                  <h2>Discover Our Luxury Hotels</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div
                  className={`${style.gallery_item} ${style.set_bg}`}
                  style={{ backgroundImage: `url(${Hotel12})` }}
                >
                  <div className={style.gi_text}>
                    <h3>Room Luxury</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div
                      className={`${style.gallery_item} ${style.set_bg}`}
                      style={{ backgroundImage: `url(${Hotel3})` }}
                    >
                      <div className={style.gi_text}>
                        <h3>Room Luxury</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div
                      className={`${style.gallery_item} ${style.set_bg}`}
                      style={{ backgroundImage: `url(${Hotel2})` }}
                    >
                      <div className={style.gi_text}>
                        <h3>Room Luxury</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className={`${style.gallery_item} ${style.set_bg}`}
                  style={{
                    backgroundImage: `url(${Hotel6})`,
                    height: "580px",
                  }}
                >
                  <div className={style.gi_text}>
                    <h3>Room Luxury</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${style.aboutus_page_sectionOne} pt-4`}>
          <div className="container">
            <div className="row">
              <div className="col-xl-5 pb-4">
                <img className="rounded-circle img-fluid" style={{ height: '500px' }} src={Client} alt="imgdata" />
              </div>
              <div className="col-xl-7 text-white" style={{ display: 'grid', placeItems: 'center' }}>
                <h1><b>Our Founder</b></h1>
                <h5 className="pb-5">
                  Aditya Jaiswal, the founder of Hotelio, is a visionary
                  entrepreneur with a strong background in the real estate
                  and hospitality sectors. With over 12 years of vast
                  experience in these industries, he brings valuable insights
                  and expertise to the table. Aditya has successfully managed
                  numerous real estate projects, gaining comprehensive
                  knowledge of property development and operations. His
                  deep understanding of the hospitality sector, coupled with
                  his passion for providing exceptional customer experiences,
                  has driven him to establish Hotelio as a leading online
                  booking platform. Aditya's strategic vision and leadership
                  have played a pivotal role in shaping Hotelio's growth and
                  establishing it as India's trusted and fastest growing hotel
                  chain network.
                </h5>
              </div>
            </div>
          </div>
        </section>

        <section style={{ border: '2px solid #ee2e24' }} className="py-0" >
          <div className="container">
            <div className="row">
              <div className="col-xl-12 p-3"
                style={{
                  display: 'grid', placeItems: 'center', background: `linear-gradient(37deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4290966386554622) 100%),url(${DecorImage})`
                }}
              >
                <h1><b>Our Vision</b></h1>
                <ul>
                  <li>
                    <h5><b>Extensive Quality Assurance :</b></h5> <p className="py-3">Hotelio ensures standardized
                      quality across accommodations by implementing a
                      stringent quality assurance program, verifying and rating
                      properties based on a set of predefined criteria to ensure
                      consistent and satisfactory experiences for travelers.</p>
                  </li>
                  <li>
                    <h5><b>Transparent Pricing :</b></h5> <p className="py-3">Hotelio provides transparent pricing
                      information, displaying comprehensive details of rates, fees,
                      and any additional charges upfront. This allows travelers to
                      make informed decisions and find the best deals,
                      promoting fairness and transparency in the booking
                      process.</p>
                  </li>
                  <li>
                    <h5><b>Increased Availability and Options :</b></h5> <p className="py-3">Hotelio actively expands
                      its network of accommodations, forging partnerships with a
                      diverse range of properties to ensure availability and
                      options even during peak seasons. By offering a wide
                      selection of stays, travelers can find suitable
                      accommodations that meet their preferences and needs</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </section>

      </div>
      <Footer />
    </>
  );
};

export default About;
