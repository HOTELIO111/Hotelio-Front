import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { useLocation, useSearchParams } from "react-router-dom";
import instance from "../../store/_utils";

const HotelResults = () => {
  const searchParams = new URLSearchParams(document.location.search);

  const { data } = useSelector((state) => state.GetSearchedHotelsReducers);

  const [filterData, setFilterData] = useState({});
  const [searchQuery, setSearchQuery] = useSearchParams();
  const params = new URLSearchParams(searchQuery.toString());
  // getall the query in the object
  const currentSearchParams = Object.fromEntries(searchParams.entries());

  const location = useLocation();

  const [hotels, setHotels] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState(1);

  const paginationManage = (count) => {
    let paginationCount;
    const countValue = count / 5;
    if (Math.abs(Math.round(countValue) - countValue) > 0.5) {
      paginationCount = Math.round(countValue) + 1;
    } else {
      paginationCount = Math.round(countValue);
    }
    return paginationCount;
  };

  // filter the hotel data as per the page and pagesize
  const FilterhotelsData = (data, pagination) => {
    const length = data.length;
    const totalPageCounts = paginationManage(length);
    setTotalPages(totalPageCounts);
    const hotelData = data;
    switch (currentSearchParams.sort) {
      case "popularity":
        hotelData?.sort((a, b) => b.hotelRatings - a.hotelRatings);
        break;
      case "ratings":
        hotelData?.sort((a, b) => b.hotelRatings - a.hotelRatings);
        break;
      case "l2h":
        hotelData?.sort((a, b) => a.rooms[0]?.price - b.rooms[0]?.price);
        break;
      case "h2l":
        hotelData?.sort((a, b) => b.rooms[0]?.price - a.rooms[0]?.price);
        break;
    }
    const startIndex = (pagination - 1) * 5;
    const endIndex = startIndex + 5;
    const dataArray = hotelData?.slice(startIndex, endIndex);
    setHotels(dataArray);
  };

  // to make the api call on the change of the query ------------------------------------------
  useEffect(() => {
    let timeoutId;

    const getSearchHotel = async () => {
      try {
        setLoader(true);
        const decodedUriComponent = decodeURIComponent(params);
        const response = await axios.get(
          `${API_URL}/hotel/search?${decodedUriComponent}`
        );
        if (response.status === 200) {
          // setHotels(response.data.data);
          setTotalPages(response.data.data.length);
          FilterhotelsData(response.data.data, pagination);
          setLoader(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const debounceApiCall = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(getSearchHotel, 500);
    };
    debounceApiCall();
    return () => clearTimeout(timeoutId);
  }, [location.search]);

  // -------------------------------------------------------------------------------------------------------------------------
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
              pagination={pagination}
              totalPages={totalPages}
              setPagination={setPagination}
              loader={loader}
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
