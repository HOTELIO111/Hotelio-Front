import React from "react";
import style from "./About.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import parking1 from "../../images/parking10.jpg";
import Hotel1 from "../../images/hotelPic1.jpg";
import Hotel21 from "../../images/hotelPic21.jpg";
import Hotel2 from "../../images/hotelPic2.jpg";
import Hotel23 from "../../images/hotelPic23.jpg";
import Hotel3 from "../../images/hotelPic3.jpg";
import Hotel4 from "../../images/hotelPic4.jpg";
import Hotel12 from "../../images/hotelPic12.jpg";
import Hotel25 from "../../images/hotelPic25.jpg";
import Hotel6 from "../../images/hotelPic7.jpg";
import LabelImportantRoundedIcon from "@mui/icons-material/LabelImportantRounded";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="conatiner-fluid">
        <section className={`${style.aboutus_page_section} mt-5`}>
          <div className="container">
            <div className={style.about_page_text}>
              <div className="row d-flex flex-row justify-content-between">
                <div className="col-lg-6">
                  <div className={style.ap_title}>
                    <h2>Welcome To Hotelio.</h2>
                    <p style={{ fontFamily: "Rubik" }}>
                      Hotelio, India's leading online booking
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
                      wherever your adventures take you.
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

        <section className={style.hp_room_section}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className={style.section_title}>
                  <span>Our Rooms</span>
                  <h2>Discover Our Room Types</h2>
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
                      <h3 className="fw-bold fs-3">Single Room</h3>
                      <h2 className="fs-4 ">
                        199$<span>/Pernight</span>
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
                      <h3 className="fw-bold fs-3">Twin Room</h3>
                      <h2 className="fs-4">
                        159$<span>/Pernight</span>
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
                      <h3 className="fw-bold fs-3">Family Room</h3>
                      <h2 className="fs-4">
                        198$<span className="">/Pernight</span>
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

        <section className={`${style.gallery_section}`}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className={style.section_title}>
                  <span>Our Hotels</span>
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
      </div>
      <Footer />
    </>
  );
};

export default About;
