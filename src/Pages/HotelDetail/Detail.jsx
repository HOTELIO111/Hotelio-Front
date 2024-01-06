import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { FcApproval } from "react-icons/fc";
import style from "./Hotel.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import Welcome from "../../images/Welcome.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
  const SearchParams = {
    checkIn: currentSearchParams.checkIn,
    checkOut: currentSearchParams.checkOut,
    totalRooms: currentSearchParams.totalRooms,
    totalGuest: currentSearchParams.totalGuest,
  }
  const bookingQueries = new URLSearchParams(SearchParams).toString();

  // arrage room listing
  const ArrangeRoomList = (rooms) => {
    const listing = [
      "Budget Hotel",
      "Classic Room",
      "Deluxe Room",
      "Premium Hotel",
    ];

    // Use the listing array to sort the rooms
    const sortedRooms = rooms?.sort((room1, room2) => {
      const index1 = listing.indexOf(room1?.roomType?.title);
      const index2 = listing.indexOf(room2?.roomType?.title);
      // If a room is not in the listing array, it will be placed at the end.
      if (index1 === -1) return 1;
      if (index2 === -1) return -1;

      return index1 - index2;
    });

    return sortedRooms;
  };

  CircularProgressWithLabel.propTypes = {
    /**
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

  const AllAmentitesAndFacilities = (rooms) => {
    const amenties = new Set();
    const additonalAmenties = new Set();
    const includeFacilities = new Set();
    const additionalFacilities = new Set();

    rooms?.forEach((element) => {
      if (element?.roomType?.amenties) {
        element.roomType.amenties.forEach((item) => amenties.add(item.title));
      }
      if (element.additionAmenities) {
        element.additionAmenities.forEach((item) =>
          additonalAmenties.add(item)
        );
      }
      if (element?.roomType?.includeFacilities) {
        element.roomType.includeFacilities.forEach((item) =>
          includeFacilities.add(item.title)
        );
      }
      if (element?.additionalFacilties) {
        element.additionalFacilties.forEach((item) =>
          additionalFacilities.add(item)
        );
      }
    });

    const allAmentiesFacilities = [
      ...amenties,
      ...includeFacilities,
      ...additonalAmenties,
      ...additionalFacilities,
    ];

    return {
      amenties: [...amenties],
      additonalAmenties: [...additonalAmenties],
      includeFacilities: [...includeFacilities],
      additionalFacilities: [...additionalFacilities],
      allAmentiesFacilities,
    };
  };

  // Function ko pura karna hai
  const RoomAvailable = (allbookings, room, checkIn, checkOut) => {
    let result;
    const checkin = new Date(checkIn);
    const checkout = new Date(checkOut);

    if (allbookings) {
      const booking = allbookings?.find((x) => x?._id === room?._id);
      return booking;
    } else {
      result = true;
    }
    return result;
  };

  //  Implement the review and ratings  ===========================================================================================================
  // ==============================================================================================================================================
  var apiKey = "AIzaSyD_kgE_S3Nwf1IAamPa6D6ZyyazleBTrhI";
  var placeId = "";

  // Make a request to the Places API to get details for the place
  var request = {
    placeId: placeId,
    fields: ["name", "formatted_address", "reviews", "rating"],
    key: "ChIJKyBEbmzkmzkRBAMQgJDFmEs",
  };

  // Perform the request
  var service = new window.google.maps.places.PlacesService(
    document.createElement("div")
  );
  service.getDetails(request, callback);

  // Handle the callback function
  function callback(place, status) {
    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
      console.log(place);
      // console.log("Place Name:", place.name);
      // console.log("Formatted Address:", place.formatted_address);

      // Access reviews and ratings
      if (place.reviews) {
        place.reviews.forEach(function (review) {
          // console.log("Rating:", review.rating);
          // console.log("Text:", review.text);
        });
      }
    } else {
      console.error("Error retrieving place details:", status);
    }
  }

  const HandleNavigations = (hotelid, roomid, bookingQueries) => {
    const query = new URLSearchParams({
      hid: hotelid?._id,
      rid: roomid?._id,
    }).toString();
    if (loggedIn) {
      window.localStorage.setItem('search', JSON.stringify({ hid: hotelid._id, rid: roomid._id, ...SearchParams }))
      return `/booking?${query}&${bookingQueries}`
    } else {
      return `/signin`
    }
  }

  //  Implement the review and ratings  ===========================================================================================================
  // ==============================================================================================================================================
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
              <div
                className=""
                style={{
                  maxWidth: "30vw",
                  height: "30vh",
                }}
              >
                <ul
                  className="d-flex gap-2"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {/* ------------------------------------------------------ Map the Hotel Ammenities list (function defined upper side ) ------------------------------------------------- */}
                  {AllAmentitesAndFacilities(data?.rooms)
                    ?.allAmentiesFacilities?.slice(0, 10)
                    ?.map((item, index) => (
                      <div className="customChip " key={index}>
                        {item}
                      </div>
                    ))}
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
            width="600"
            height="450"
            frameborder="0"
            className={`w-100 mt-2 ${style.mapBox}`}
            style={{ borderRadius: "5px" }}
            src={decodeURIComponent(data?.hotelMapLink)}
            allowfullscreen
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
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Perspiciatis maxime officiis error id nesciunt
                          quos officia.
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            borderTop: "1px solid #ee2e24",
                            borderBottom: "1px solid #ee2e24",
                          }}
                        >
                          <Rating name="read-only" value={3} readOnly />
                          <Typography variant="subtitle2">
                            Adam Smith
                          </Typography>
                        </div>
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
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Perspiciatis maxime officiis error id nesciunt
                          quos officia.
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            borderTop: "1px solid #ee2e24",
                            borderBottom: "1px solid #ee2e24",
                          }}
                        >
                          <Rating name="read-only" value={3} readOnly />
                          <Typography variant="subtitle2">
                            Adam Smith
                          </Typography>
                        </div>
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
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Perspiciatis maxime officiis error id nesciunt
                          quos officia.
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            borderTop: "1px solid #ee2e24",
                            borderBottom: "1px solid #ee2e24",
                          }}
                        >
                          <Rating name="read-only" value={3} readOnly />
                          <Typography variant="subtitle2">
                            Adam Smith
                          </Typography>
                        </div>
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
            {ArrangeRoomList(data?.rooms)?.map((item, index) => {
              return (
                <CardContent sx={{ position: "relative", padding: "5px" }}>
                  {RoomAvailable(
                    data?.bookings,
                    item,
                    currentSearchParams.checkIn,
                    currentSearchParams.checkOut
                  ) && (
                      <div
                        style={{
                          cursor: "not-allowed",
                          display: "grid",
                          placeItems: "center",
                          position: "absolute",
                          background: "#ffffffba",
                          zIndex: "1000",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div>
                          <Typography variant="h6" color="error" fontWeight={800}>
                            Room Not Available
                          </Typography>
                        </div>
                      </div>
                    )}
                  <Grid container spacing={1}>
                    {/* <Grid
                      item
                      xs={12}
                      sx={{
                        cursor: "not-allowed",
                        display: "grid",
                        placeItems: "center",
                        position: "absolute",
                        background: "#ffffffba",
                        width: "1100px",
                        marginTop: "5px",
                        zIndex: "1200",
                      }}
                    >
                      <div className="p-5">
                        <Typography variant="h6" color="error" fontWeight={800}>
                          Room Not Available
                        </Typography>
                      </div>
                    </Grid> */}
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

                          variant="contained"
                          sx={{ borderRadius: "50px" }}
                          color="error"
                        >
                          <Link target="_blank" to={HandleNavigations(data, item, bookingQueries)}>Book Now</Link>
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
    </div >
  );
};

export default Detail;
