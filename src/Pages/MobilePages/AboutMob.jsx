import React from "react";
import style from "../About Us/About.module.css";
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
import AboutUsTopBanner from '../../images/AboutUsTopBanner.webp'
import Client from '../../images/Client.jpg'
import LabelImportantRoundedIcon from "@mui/icons-material/LabelImportantRounded";
import MobileFooter from "../../Components/MobileComponent/MobileFooter";
import MobileHeader from "../../Components/MobileComponent/MobileHeader";
import { Helmet } from "react-helmet";

const AboutMob = () => {

    return (
        <>
            <Helmet>
                <title>About Us | Best Luxury Hotel In Delhi India</title>
                <meta
                    name="description"
                    content="About One of the best Luxury hotel in Lucknow. Hotelio have verdant grounds and its unrivalled service. Our luxurious rooms and suites feature elegant decor."
                />
                {/* Cononical tag:-  */}
                <link rel="canonical" href="https://www.hoteliorooms.com/about-us" />

                {/* OG Tag:- */}
                <meta property="og:title" content="About Us | Best Luxury Hotel In Delhi India" />
                <meta property="og:site_name" content="Hotelio" />
                <meta property="og:url" content="https://www.hoteliorooms.com/about-us" />
                <meta property="og:description" content="About One of the best Luxury hotel in Lucknow. Hotelio have verdant grounds and its unrivalled service. Our luxurious rooms and suites feature elegant decor." />
                <meta property="og:type" content="" />
                <meta property="og:image" content="https://www.hoteliorooms.com/static/media/HotelioLogo.8079a48b3c088ec911fa.png" />
                {/* // Twitter card:- */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="About Us | Best Luxury Hotel In Delhi India" />
                <meta name="twitter:site" content="@Hotelio" />
                <meta name="twitter:description" content="About One of the best Luxury hotel in Lucknow. Hotelio have verdant grounds and its unrivalled service. Our luxurious rooms and suites feature elegant decor." />
                <meta name="twitter:image" content="https://www.hoteliorooms.com/static/media/HotelioLogo.8079a48b3c088ec911fa.png" />


            </Helmet>
            <MobileHeader />
            <div className="conatiner-fluid mt-0">
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

                <section className={`${style.aboutus_page_section} pt-4 `}>
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
                                    <h1><u><b>Our Rooms</b></u></h1>
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
                            <div className="col-xl-5">
                                <img className="rounded-circle" style={{ height: '300px' }} src={Client} alt="" />
                            </div>
                            <div className="col-xl-7 text-white" style={{ display: 'grid', placeItems: 'center' }}>
                                <h1 className="py-3"><b>Our Founder</b></h1>
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

                <section className="pb-3" >
                    <div className="container-fluid">
                        <div className="row" style={{ background: 'url(https://img.freepik.com/free-photo/woman-talking-with-hotel-receptionist-lobby_23-2149304051.jpg?w=900&t=st=1689250295~exp=1689250895~hmac=11307d5481c4db04b0d8d6ae392bcccc234f9ff37feb4c0aafac4746af640ff3)' }}>
                            <div className="col-xl-8 px-2 pb-5 pt-1"
                                style={{
                                    display: 'grid', placeItems: 'center', clipPath: 'circle(133% at 0 51%)', background: `linear-gradient(37deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4290966386554622) 100%),url(${DecorImage})`
                                }}
                            >
                                <h1 className="py-2"><b>Our Vision</b></h1>
                                <ul>
                                    <li>
                                        <b>Extensive Quality Assurance</b>: <p>Hotelio ensures standardized
                                            quality across accommodations by implementing a
                                            stringent quality assurance program, verifying and rating
                                            properties based on a set of predefined criteria to ensure
                                            consistent and satisfactory experiences for travelers.</p>
                                    </li>
                                    <li>
                                        <b>Transparent Pricing</b>: <p>Hotelio provides transparent pricing
                                            information, displaying comprehensive details of rates, fees,
                                            and any additional charges upfront. This allows travelers to
                                            make informed decisions and find the best deals,
                                            promoting fairness and transparency in the booking
                                            process.</p>
                                    </li>
                                    <li>
                                        <b>Increased Availability and Options</b>: <p>Hotelio actively expands
                                            its network of accommodations, forging partnerships with a
                                            diverse range of properties to ensure availability and
                                            options even during peak seasons. By offering a wide
                                            selection of stays, travelers can find suitable
                                            accommodations that meet their preferences and needs</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-xl-4">
                                {/* <img className="w-100 rounded" style={{ height: '500px' }} src="https://i.pinimg.com/736x/a7/96/98/a79698e6e8d74213650194e941b155df.jpg" alt="" /> */}
                            </div>
                        </div>
                    </div>

                </section>
            </div>
            <div className="d-md-block d-lg-none d-xl-none">
                <MobileFooter />
            </div>
        </>
    );
};

export default AboutMob;
