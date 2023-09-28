import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import HotelList from "./HotelList";
import Footer from "../../Components/footer/Footer";
import { Container, Grid } from "@mui/material";
import SideFilter from "./SideFilter";
import axios from "axios";
import { API_URL } from "../../config";
import { useEffect } from "react";
import { useState } from "react";
import BottomFilter from "./BottomFilter";
import { isMobile } from "react-device-detect";
import MobileHeader from "../../Components/MobileComponent/MobileHeader";
import MobileFooter from "../../Components/MobileComponent/MobileFooter";

const HotelResults = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const searchData = {
    location: searchParams.get("location"),
    totalRooms: searchParams.get("totalRooms"),
  };

  const [filterData, setFilterData] = useState({});

  const [hotels, setHotels] = useState(null);

  const GetSearchHotel = async () => {
    try {
      const response = await axios.get(API_URL + "/hotel/search", {
        params: searchData, // The 'params' property sends the 'searchData' as query parameters
      });
      if (response.status === 200) {
        setHotels(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetSearchHotel();
  }, []);
  return (
    <div>
      {isMobile ? <MobileHeader /> : <Navbar />}
      <Container
        sx={isMobile ? { marginBottom: 7 } : { marginTop: 11 }}
        maxWidth="xl"
      >
        <Grid container spacing={1}>
          <Grid item xl={2} lg={2} xs={12}>
            <SideFilter
              hotels={hotels}
              setFilterData={setFilterData}
              filterData={filterData}
            />
          </Grid>
          <Grid item xl={10} lg={10} xs={12}>
            <HotelList
              hotels={hotels}
              location={searchParams.get("location")}
            />
          </Grid>
          <Grid item xs={12} className="d-lg-none d-xl-none">
            <BottomFilter />
          </Grid>
        </Grid>
      </Container>
      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  );
};

export default HotelResults;
