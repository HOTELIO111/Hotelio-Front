import React, { useEffect, useState } from "react";
import HotelBudgetTwo from "../../images/HotelInBudgetTwo.webp";
import PrimeHotelTwo from "../../images/PrimeHotelTwo.webp";
import HomeStayTwo from "../../images/HomeStayTwo.webp";
import { useNavigate } from "react-router-dom";
import style from "./QuickFilterNav.module.css";
import axios from "axios";
import { Card, CardContent, Grid } from "@mui/material";
import dayjs from "dayjs";

const QuickFilterNav = ({ CollectionData }) => {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState(null);
  const dateFormat = "YYYY/MM/DD";
  const [geoLoc, setGeoLoc] = useState(
    JSON.parse(window.localStorage.getItem("location")) || {}
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator?.geolocation.getCurrentPosition(
        (position) => {
          const newGeoLoc = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          };
          window.localStorage.setItem("location", JSON.stringify(newGeoLoc));
          setGeoLoc(newGeoLoc);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geoLoc?.latitude},${geoLoc?.longitude}&key=AIzaSyD_kgE_S3Nwf1IAamPa6D6ZyyazleBTrhI`
        );

        // Extract relevant data from the response
        const address = response.data.results[0].formatted_address;
        setLocationData(address);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    // Ensure both latitude and longitude are available before making the request
    if (geoLoc?.latitude && geoLoc?.longitude) {
      fetchData();
    }
  }, [geoLoc]);

  console.log(locationData)

  const SearchTheField = (item) => {
    const searchData = {
      location: locationData,
      lng: geoLoc?.longitude,
      lat: geoLoc?.latitude,
      totalRooms: 1,
      totalGuest: 1,
      checkIn: dayjs().format(dateFormat),
      checkOut: dayjs().add(1, "day").format(dateFormat),
      priceMin: 400,
      priceMax: 20000,
      sort: "popularity",
      page: 1,
      pageSize: 5,
      hotelType: hotelType(item),
    };
    const queryString = new URLSearchParams(searchData).toString();
    navigate(`/searched-hotels?${queryString}`);
  };

  const hotelType = (item) => {
    return item?._id;
  };


  //   useEffect(() => {
  //     // Check if the browser supports geolocation
  //     if ("geolocation" in navigator) {
  //       // Ask for the user's location
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           // Store the user's location in state
  //           window.localStorage.setItem(
  //             "location",
  //             JSON.stringify({
  //               longitude: position.coords.longitude,
  //               latitude: position.coords.latitude,
  //             })
  //           );
  //         },
  //         (error) => {
  //           console.error("Error getting location:", error);
  //         }
  //       );
  //     } else {
  //       console.log("Geolocation is not available in this browser.");
  //     }
  //   }, []);

  return (
    <>
      <Grid
        container
        className={style.mainDiv}
        spacing={3}
        paddingY={0}
        justifyContent="center"
      >
        {
          CollectionData?.data?.map((item, index) => (
            <Grid item key={index}>
              <Card
                className="planCard"
                onClick={() => SearchTheField(item)}
                sx={{
                  minHeight: 200,
                  maxWidth: 200,
                  maxHeight: 280,
                  borderRadius: "8px",
                  filter: "invert(1)",
                }}
              >
                <div className="text-center p-1">
                  <img
                    src={PrimeHotelTwo}
                    style={{ borderRadius: "1rem" }}
                    alt="PrimeHotel"
                  />
                </div>
                <CardContent className="pb-0">
                  <div className="text-center">
                    <h5
                      style={{ color: "#11d1db", fontFamily: "Roboto, sans-serif" }}
                    >
                      {item?.title}
                    </h5>
                    <hr
                      style={{
                        backgroundColor: "#f00",
                        width: "120px",
                        height: "2px",
                        margin: "10px auto",
                        color: "#f00",
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        }
        {/* <Grid item>
          <Card
            className="planCard"
            onClick={() => SearchTheField(0, 1000)}
            sx={{
              minHeight: 200,
              maxWidth: 200,
              maxHeight: 280,
              borderRadius: "8px",
              filter: "invert(1)",
            }}
          >
            <div className="text-center p-1">
              <img
                src={HomeStayTwo}
                style={{ borderRadius: "1rem" }}
                alt="HomeStay"
              />
            </div>
            <CardContent style={{ paddingBottom: "5px" }}>
              <div className="text-center">
                <h5
                  style={{ color: "#11d1db", fontFamily: "Roboto, sans-serif" }}
                >
                  Hotelio Home Stay
                </h5>
                <hr
                  style={{
                    backgroundColor: "#f00",
                    width: "120px",
                    height: "2px",
                    margin: "10px auto",
                    color: "#f00",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className="planCard"
            onClick={() => SearchTheField(1000, 1999)}
            sx={{
              minHeight: 200,
              maxWidth: 200,
              maxHeight: 280,
              borderRadius: "8px",
              filter: "invert(1)",
            }}
          >
            <div className="text-center p-1">
              <img
                src={HotelBudgetTwo}
                style={{ borderRadius: "1rem" }}
                alt="HotelBudget"
              />
            </div>
            <CardContent style={{ paddingBottom: "5px" }}>
              <div className="text-center">
                <h5
                  style={{ color: "#11d1db", fontFamily: "Roboto, sans-serif" }}
                >
                  Hotelio Budget
                </h5>
                <hr
                  style={{
                    backgroundColor: "#f00",
                    width: "120px",
                    height: "2px",
                    margin: "10px auto",
                    color: "#f00",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </>
  );
};

export default QuickFilterNav;
