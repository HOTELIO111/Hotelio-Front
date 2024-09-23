import { Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../Components/footer/Footer";
import MobileFooter from "../../Components/MobileComponent/MobileFooter";
import MobileHeader from "../../Components/MobileComponent/MobileHeader";
import Navbar from "../../Components/Navbar/Navbar";
import { API_URL } from "../../config";
import { GetAlltheRoomTypes } from "../../store/actions/roomCategoriesAction";
import HotelList from "./HotelList";
import SideFilter from "./SideFilter";

const HotelResults = () => {
  const searchParams = new URLSearchParams(document.location.search);

  const { data } = useSelector((state) => state.GetSearchedHotelsReducers);

  const [filterData, setFilterData] = useState({});
  const [searchQuery, setSearchQuery] = useSearchParams();
  const params = new URLSearchParams(searchQuery.toString());
  // get all the query in the object
  const currentSearchParams = Object.fromEntries(searchParams.entries());

  const location = useLocation();

  const [hotels, setHotels] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState(1);

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // to set the price

  // Hotel Price Management
  const PriceManagement = (hotelData) => {
    const report = {};
    hotelData?.rooms?.forEach((element) => {
      report[element?.roomType?._id] = {
        price: element?.price,
        title: element?.roomType?.title,
      };
    });
    const result = {};
    if (currentSearchParams.roomType !== undefined) {
      const newData = {
        price: report[currentSearchParams.roomType]?.price,
        title: report[currentSearchParams.roomType]?.title,
      };
      Object.assign(result, newData);
    } else {
      const roomListPriceList = Object.values(report);
      const minPrice = roomListPriceList.sort((a, b) => a?.price - b?.price);
      Object.assign(result, minPrice[0]);
    }
    return result;
  };

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

  // filter the hotel data as per the page and page size
  const FilterhotelsData = (data, pagination) => {
    const length = data.length;
    setHotels(data);
  };

  // to make the API call on the change of the query
  useEffect(() => {
    let timeoutId;

    const getSearchHotel = async () => {
      try {
        setLoader(true);
        const decodedUriComponent = decodeURIComponent(params);
        const response = await axios.get(
          `${API_URL}/hotel/search-it?${decodedUriComponent}`
        );
        if (response.status === 200) {
          const hotelsData = response?.data?.data ?? [];
          setHotels(hotelsData);
          const paginationCounts =
            response?.data?.data?.[0]?.pagination?.[0]?.counts ?? 0;
          setTotalPages(paginationCounts);

          FilterhotelsData(hotelsData, pagination);

          window.localStorage.setItem(
            "search",
            encodeURIComponent(decodedUriComponent)
          );
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

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/"); // Navigate to the desired route without a page reload
  };

  React.useEffect(() => {
    const popstateListener = (e) => {
      if (e.type === "popstate") {
        handleBackButton();
      }
    };

    window.addEventListener("popstate", popstateListener);

    return () => {
      window.removeEventListener("popstate", popstateListener);
    };
  }, [navigate]);

  React.useEffect(() => {
    dispatch(GetAlltheRoomTypes());
  }, []);

  return (
    <div>
      <Helmet>
        {/* Cononical tag:-  */}
        <link rel="canonical" href="https://www.hoteliorooms.com" />
      </Helmet>

      {isMobile ? <MobileHeader /> : <Navbar />}
      <Container
        sx={isMobile ? { marginBottom: 7.5 } : { marginTop: 5 }}
        maxWidth="xl"
      >
        <Grid container spacing={1}>
          <Grid item xl={2} lg={2} xs={0}>
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
        </Grid>
      </Container>
      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  );
};

export default HotelResults;
