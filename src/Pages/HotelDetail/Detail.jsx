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
import { useNavigate } from "react-router-dom";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import CameraRearIcon from "@mui/icons-material/CameraRear";
import BathroomIcon from "@mui/icons-material/Bathroom";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import { useAuthContext } from "../../context/userAuthContext";

const Detail = ({ data }) => {
  const navigate = useNavigate();
  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };

  const {
    GetAllAmenities,
    GetAllRoomTypes,
    GetAllFacilities,
    facilities,
    roomType,
    amenities,
  } = useAuthContext();

  const dataroomId = data?.rooms.map((x) => x.roomType);

  const RoomOffer = [
    {
      id: 1,
      img: data?.hotelImages,
      roomName: "Budget Room",
      roomRate: "1000",
      facilities: "NA",
    },
    {
      id: 2,
      img: data?.hotelImages,
      roomName: "Classic Room",
      roomRate: "1000",
      facilities: "NA",
    },
    {
      id: 3,
      img: data?.hotelImages,
      roomName: "Deluxe Room",
      roomRate: "1000",
      facilities: "NA",
    },
    {
      id: 4,
      img: data?.hotelImages,
      roomName: "Excutive Room",
      roomRate: "1000",
      facilities: "NA",
    },
    {
      id: 5,
      img: data?.hotelImages,
      roomName: "Suit Room",
      roomRate: "1000",
      facilities: "NA",
    },
  ];

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

  console.log(data);

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
                  {data?.amenities.map((item, index) => {
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
            src={data?.hotelMapLink}
            height="450"
            className={`w-100 mt-2 ${style.mapBox}`}
            style={{ borderRadius: "5px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Grid>
        <Grid item xs={12} lg={12} xl={12}>
          <Card
            className="p-3"
            sx={{
              margin: 1,
              boxShadow: "0px 0px 30px rgba(0,0,0,0.1) !important",
              borderRadius: "15px",
              border: '2px solid #ee2e24'
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
                <div
                  className="d-flex flex-column align-items-center"
                  sx={{ maxHeight: "134px", width: 200 }}
                >
                  <CircularProgressWithLabel value={75} />
                  <p className="fw-bold mt-1">Value of Money</p>
                </div>
                <div
                  className="d-flex flex-column align-items-center"
                  sx={{ maxHeight: "134px", width: 200 }}
                >
                  <CircularProgressWithLabel value={80} />
                  <p className="fw-bold mt-1">Cleanliness</p>
                </div>
                <div
                  className="d-flex flex-column align-items-center"
                  sx={{ maxHeight: "134px", width: 200 }}
                >
                  <CircularProgressWithLabel value={90} />
                  <p className="fw-bold mt-1">Comfort</p>
                </div>

                <Card
                  sx={{
                    maxHeight: "134px",
                    width: 400,
                    p: 1,
                    boxShadow: "none !important",
                    color: "#4d4d4d",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis maxime officiis error id nesciunt quos officia.
                </Card>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={12} xl={12}>
          <Card sx={{ margin: 1, border: '2px solid #ee2e24' }}>
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
            {roomType
              ?.filter((x) => dataroomId?.includes(x._id))
              ?.map((item, index) => {
                return (
                  <CardContent>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <small>1</small>
                      </div>
                      <hr
                        style={{
                          height: "150px",
                          width: "2px",
                          color: "#ee2e24",
                        }}
                      />
                      <div>
                        <div className="d-flex align-items-center">
                          <Typography variant="h6">{item.roomType}</Typography>
                          <FcApproval size={35} />
                        </div>
                        <div style={{ color: "#28a745" }}>
                          {facilities
                            ?.filter((x) =>
                              item.includeFacilities?.includes(x._id)
                            )
                            ?.map((facility, index) => (
                              <Typography
                                key={index}
                                variant="p"
                                display={"block"}
                              >
                                {facility.title}
                              </Typography>
                            ))}
                          {amenities
                            ?.filter((x) => item.amenties?.includes(x._id))
                            ?.map((amenity, index) => (
                              <Typography
                                key={index}
                                variant="p"
                                display={"block"}
                              >
                                {amenity.amenity}
                              </Typography>
                            ))}

                          {/* <Typography variant="p" display={"block"}>
                            Air conditioning
                          </Typography>
                          <Typography variant="p" display={"block"}>
                            Flat-screen TV
                          </Typography>
                          <Typography variant="p" display={"block"}>
                            Attached bathroom
                          </Typography> */}
                        </div>
                      </div>
                      <hr
                        style={{
                          height: "150px",
                          width: "2px",
                          color: "#ee2e24",
                        }}
                      />
                      <div>
                        <h4>
                          ₹ {data?.rooms[index]?.price}{" "}
                          <span className="text-secondary">
                            <del>{item.maxPrice}</del> off
                          </span>
                        </h4>
                        <p>+ 18% taxes and charges</p>
                      </div>
                      <hr
                        style={{
                          height: "150px",
                          width: "2px",
                          color: "#ee2e24",
                        }}
                      />
                      <div>
                        <div className="d-flex">
                          <p>{item?.facilities || 'NA'}</p>
                        </div>
                      </div>
                      <hr
                        style={{
                          height: "150px",
                          width: "2px",
                          color: "#ee2e24",
                        }}
                      />
                      <div className="text-center">
                        <Button
                          onClick={() => navigate("/booking")}
                          variant="contained"
                          color="error"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                );
              })}
          </Card>
        </Grid>

        <Grid item xs={12} lg={12} xl={12} padding={1}>
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
                sx={{ border: '2px solid #ee2e24' }}
              >
                <Typography>Is there a swimming pool</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '2px solid #ee2e24' }}>
                <Typography>No</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="mt-1">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ border: '2px solid #ee2e24' }}
              >
                <Typography>Do they serve breakfast</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '2px solid #ee2e24' }}>
                <Typography>Yes, We serve</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </Grid>
        <Grid item xs={12} lg={12} xl={12} padding={1}>
          <hr />
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
                sx={{ border: '2px solid #ee2e24' }}
              >
                <Typography>Check-in Time</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '2px solid #ee2e24' }}>
                <Typography>Available 24 hours</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="mt-1">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ border: '2px solid #ee2e24' }}
              >
                <Typography >Check-out Time</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '2px solid #ee2e24' }}>
                <Typography>From 08:00 to 10:00</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="mt-1">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ border: '2px solid #ee2e24' }}
              >
                <Typography >Cancellation/prepayment</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '2px solid #ee2e24' }}>
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
