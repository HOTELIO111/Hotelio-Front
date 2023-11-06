import React, { useState } from "react";
import HotelBudget from "../../images/HotelInBudget.png";
import PrimeHotel from "../../images/PrimeHotel.png";
import HomeStay from "../../images/HomeStay.png";
import HotelBudgetTwo from "../../images/HotelInBudgetTwo.webp";
import PrimeHotelTwo from "../../images/PrimeHotelTwo.webp";
import HomeStayTwo from "../../images/HomeStayTwo.webp";
import { useNavigate } from "react-router-dom";
import style from "./QuickFilterNav.module.css";
import { Card, CardContent, Grid } from "@mui/material";

const QuickFilterNav = ({ setSelectedCategory, selectedCategory }) => {
  const navigate = useNavigate();
  const [geoLoc, setGeoLoc] = useState(
    JSON.parse(window.localStorage.getItem("location"))
  );

  // ---------------------------------search the hotel -------------------------------------------------------------------------

  const SearchTheField = (priceMin, priceMax) => {
    const searchData = {
      lng: geoLoc?.longitude,
      lat: geoLoc?.latitude,
      totalRooms: 1,
      totalGuest: 1,
      kmRadius: 20,
      priceMin: priceMin,
      priceMax: priceMax,
      sort: "popularity",
    };
    const queryString = new URLSearchParams(searchData).toString();
    navigate(`/searchedhotels?${queryString}`);
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
        <Grid item>
          <Card
            className="planCard"
            onClick={() => SearchTheField(2000, 20000)}
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
                  Hotelio Premium
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
        </Grid>
      </Grid>
    </>
  );
};

export default QuickFilterNav;
