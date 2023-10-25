import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { FcApproval } from "react-icons/fc";
import style from "./Hotel.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import Welcome from "../../images/Welcome.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import { isMobile } from "react-device-detect";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import { AiOutlineCheckCircle } from "react-icons/ai";
import "./Detail.css";

const Detail = ({ data }) => {
  const navigate = useNavigate();

  const { searchParams, setSearchParams } = useSearchParams();
  const searchQuery = new URLSearchParams(document.location.search);
  const currentSearchParams = Object.fromEntries(searchQuery?.entries());

  const bookingQueries = new URLSearchParams({
    checkIn: currentSearchParams.checkIn,
    checkOut: currentSearchParams.checkOut,
    totalRooms: currentSearchParams.totalRooms,
    totalGuest: currentSearchParams.totalGuest,
  }).toString();

  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };

  // Check the value in localStorage
  const loggedIn = localStorage.getItem("customer");

  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          color="error"
          size={90}
          variant="determinate"
          {...props}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,

            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            <h5>{`${Math.round(props.value)}%`}</h5>
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8} xl={8} padding={1}>
          <div className="p-2 ">
            <h4 className="py-3 text-dark">Description</h4>
            <Typography variant="p">{data?.discription || "NA"}</Typography>
          </div>
          <hr />
          <div className="px-2">
            <h4 className="py-3 text-dark">Amenities & Facilities</h4>
            <div className="d-flex align-items-center ">
              <img
                style={{ height: "250px", width: "250px" }}
                src={Welcome}
                alt="welcome"
              />

              <div className="">
                <ul className="d-flex gap-2">
                  {/* ------------------------------------------------------ Map the Hotel Ammenities list (function defined upper side ) ------------------------------------------------- */}
                  {data?.room?.amenities?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="p-2 border rounded-4"
                        style={{
                          boxShadow:
                            "rgb(204, 219, 232) 0px 0px 6px 0px inset, rgba(255, 255, 255, 0.5) -1px -1px 6px 1px inset",
                        }}
                      >
                        {item === "WiFi" ? (
                          <>
                            <NetworkWifiIcon /> {item}
                          </>
                        ) : item === "Parking" ? (
                          <>
                            <LocalParkingIcon /> {item}
                          </>
                        ) : item === "Restaurant" ? (
                          <>
                            <FoodBankIcon /> {item}
                          </>
                        ) : item === "more" ? (
                          <>
                            <PlusOneIcon /> {item}
                          </>
                        ) : (
                          "NA"
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <hr />
        </Grid>
        <Grid
          sx={{ display: "grid", placeItems: "center" }}
          item
          xs={12}
          lg={4}
          xl={4}
          padding={1}
        >
          <iframe
            title="Hotel Location"
            src={data?.hotelMapLink}
            height="450"
            className={`w-100 mt-2 ${style.mapBox}`}
            style={{ borderRadius: "5px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Grid>
        {isMobile ? null : (
          <Grid item xs={12} lg={12} xl={12}>
            <Card
              className="p-3"
              sx={{
                margin: 1,
                boxShadow: "0px 0px 30px rgba(0,0,0,0.1) !important",
                borderRadius: "15px",
                border: "2px solid #ee2e24",
              }}
            >
              <div
                className="p-2 d-flex justify-content-between align-items-center"
                style={{
                  color: "#8d8d8d",
                  fontSize: "16px",
                }}
              >
                <b>Hotel Review & Rating</b>
              </div>
              <CardContent>
                <div className="d-flex justify-content-evenly align-items-center">
                  <div className="border">
                    <Typography className="bg-success text-center" variant="h5">
                      4.5
                    </Typography>
                    <Typography
                      className="bg-secondary text-nowrap p-1"
                      variant="p"
                    >
                      14 Rating
                    </Typography>
                  </div>
                  <div
                    className="d-flex flex-column align-items-center"
                    style={{ maxHeight: "135px", width: 110 }}
                  >
                    <CircularProgressWithLabel value={75} />
                    <p className="fw-bold mt-1">Value of Money</p>
                  </div>
                  <div
                    className="d-flex flex-column align-items-center"
                    style={{ maxHeight: "135px", width: 100 }}
                  >
                    <CircularProgressWithLabel value={80} />
                    <p className="fw-bold mt-1">Cleanliness</p>
                  </div>
                  <div
                    className="d-flex flex-column align-items-center"
                    style={{ maxHeight: "135px", width: 100 }}
                  >
                    <CircularProgressWithLabel value={90} />
                    <p className="fw-bold mt-1">Comfort</p>
                  </div>

                  <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={3000}
                    showStatus={false}
                    showIndicators={false}
                  >
                    <div>
                      <Card
                        sx={{
                          maxHeight: "134px",
                          width: 400,
                          p: 1,
                          boxShadow:
                            "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                          color: "#4d4d4d",
                          marginLeft: "10px",
                        }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perspiciatis maxime officiis error id nesciunt quos
                        officia.
                      </Card>
                    </div>
                    <div>
                      <Card
                        sx={{
                          maxHeight: "134px",
                          width: 400,
                          p: 1,
                          boxShadow:
                            "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                          color: "#4d4d4d",
                        }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perspiciatis maxime officiis error id nesciunt quos
                        officia.
                      </Card>
                    </div>
                    <div>
                      <Card
                        sx={{
                          maxHeight: "134px",
                          width: 400,
                          p: 1,
                          boxShadow:
                            "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                          color: "#4d4d4d",
                        }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perspiciatis maxime officiis error id nesciunt quos
                        officia.
                      </Card>
                    </div>
                  </Carousel>
                </div>
              </CardContent>
            </Card>
          </Grid>
        )}
        <Grid item xs={12} lg={12} xl={12}>
          <Card
            sx={{
              margin: 1,
              border: "2px solid #ee2e24",
              borderRadius: "15px",
            }}
          >
            <div
              className="p-2"
              id="BookNow"
              style={{
                background:
                  "linear-gradient(0deg, rgba(231,197,186,0.8688725490196079) 0%, rgba(255,255,255,0) 100%)",
                color: "#8d8d8d",
              }}
            >
              <b>Select Your Room</b>
            </div>
            {/* -------------------------------------------------Hotel rooms Maped ---------------------------------------------------------------------- */}
            {data?.rooms?.map((item, index) => {
              return (
                <CardContent sx={{ position: 'relative', padding: '5px' }}>
                  <div
                    style={{
                      cursor: "not-allowed",
                      display: 'grid',
                      placeItems: 'center',
                      position: 'absolute',
                      background: '#ffffffba',
                      zIndex: '1000',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <div>
                      <Typography variant="h6" color="error" fontWeight={800}>
                        Room Not Available
                      </Typography>
                    </div>
                  </div>
                  <Grid container spacing={1}>
                    <Grid
                      sx={
                        isMobile ? null : { borderRight: "2px solid #ee2e24" }
                      }
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      item
                      xs={2}
                      md={4}
                      lg={1}
                      xl={1}
                    >
                      <div>
                        <Typography variant="caption">{index + 1}</Typography>
                      </div>
                    </Grid>
                    <Grid
                      sx={
                        isMobile ? null : { borderRight: "2px solid #ee2e24" }
                      }
                      item
                      xs={10}
                      md={4}
                      lg={4}
                      xl={4}
                    >
                      <div className="d-flex align-items-center">
                        <Typography variant="h6">
                          {item?.roomType?.title}
                        </Typography>
                        <FcApproval size={35} />
                      </div>
                      <div style={{ color: "#28a745" }}>
                        {/* ------------------------------------Mapped Hotel Facilites as per room type amenites ------------------------------------------------------ */}
                        {item.roomType?.amenties?.map((facility, index) => (
                          <Typography key={index} variant="caption">
                            <AiOutlineCheckCircle /> {facility.title}{" "}
                          </Typography>
                        ))}

                        {/* ---------------------------------------------Mapped Amenites as per room type Amenites ----------------------------------------------------------------- */}
                        {item.roomType?.includeFacilities?.map(
                          (amenity, index) => (
                            <Typography key={index} variant="caption">
                              <AiOutlineCheckCircle /> {amenity.title}{" "}
                            </Typography>
                          )
                        )}
                      </div>
                    </Grid>
                    <Grid
                      display={"flex"}
                      alignItems={"center"}
                      sx={
                        isMobile ? null : { borderRight: "2px solid #ee2e24" }
                      }
                      item
                      xs={6}
                      md={4}
                      lg={2}
                      xl={2}
                    >
                      {/* -------------------------------------------------Mapped the price of every room ---------------------------------------------------------- */}
                      <div>
                        <Typography variant="h6">
                          ₹ {item.price}{" "}
                          <span className="text-secondary">
                            {item?.prevPrice ? (
                              <>
                                <del>{item.prevPrice}</del> off
                              </>
                            ) : (
                              <>
                                <del>1000</del> off
                              </>
                            )}
                          </span>
                        </Typography>
                        <Typography variant="caption">
                          + 18% taxes and charges per room
                        </Typography>
                      </div>
                    </Grid>
                    <Grid
                      sx={
                        isMobile ? null : { borderRight: "2px solid #ee2e24" }
                      }
                      item
                      xs={6}
                      md={4}
                      lg={3}
                      xl={3}
                    >
                      <div className="text-center">
                        <div className="d-flex">
                          <p>{item?.facilities || "NA"}</p>
                        </div>
                      </div>
                    </Grid>
                    <Grid
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      item
                      xs={12}
                      md={4}
                      lg={2}
                      xl={2}
                    >
                      <div className="text-center">
                        <Button
                          // onClick={() => navigate("/booking")}
                          onClick={() => {
                            if (loggedIn) {
                              const query = new URLSearchParams({
                                hid: data?._id,
                                rid: item?._id,
                              }).toString();
                              navigate(`/booking?${query}&${bookingQueries}`);
                            } else {
                              navigate("/signin");
                            }
                          }}
                          variant="contained"
                          sx={{ borderRadius: "50px" }}
                          color="error"
                        >
                          Book Now
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                  <hr />
                </CardContent>
              );
            })}
          </Card>
        </Grid>

        <Grid item xs={12} lg={6} xl={6} padding={1}>
          <div className="p-2">
            <div
              className="p-2"
              style={{
                background:
                  "linear-gradient(0deg, rgba(231,197,186,0.8688725490196079) 0%, rgba(255,255,255,0) 100%)",
                color: "#000000",
              }}
            >
              <h6>Travellers are asking</h6>
            </div>
            <Accordion className="mt-1">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ border: "2px solid #ee2e24" }}
              >
                <Typography>Is there a swimming pool</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: "2px solid #ee2e24" }}>
                <Typography>No</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="mt-1">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ border: "2px solid #ee2e24" }}
              >
                <Typography>Do they serve breakfast</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: "2px solid #ee2e24" }}>
                <Typography>Yes, We serve</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </Grid>
        <Grid item xs={12} lg={6} xl={6} padding={1}>
          <div className="p-2">
            <div
              className="p-2"
              style={{
                background:
                  "linear-gradient(0deg, rgba(231,197,186,0.8688725490196079) 0%, rgba(255,255,255,0) 100%)",
                color: "#000000",
              }}
            >
              <h6>Our Rules</h6>
            </div>
            <Accordion className="mt-1">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ border: "2px solid #ee2e24" }}
              >
                <Typography>Check-in Time</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: "2px solid #ee2e24" }}>
                <Typography>Available 24 hours</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="mt-1">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ border: "2px solid #ee2e24" }}
              >
                <Typography>Check-out Time</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: "2px solid #ee2e24" }}>
                <Typography>From 08:00 to 10:00</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="mt-1">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ border: "2px solid #ee2e24" }}
              >
                <Typography>Cancellation/prepayment</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: "2px solid #ee2e24" }}>
                <Typography>
                  Cancellation and prepayment policies vary according to
                  accommodation type. Please check what conditions may apply to
                  each option when making your selection.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Detail;
