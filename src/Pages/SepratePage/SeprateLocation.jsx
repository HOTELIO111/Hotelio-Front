import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../config";
import { useEffect } from "react";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import MobileHeader from "../../Components/MobileComponent/MobileHeader";
import MobileFooter from "../../Components/MobileComponent/MobileFooter";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import HotelList from "../HotelsResults/HotelList";
import SideFilter from "../HotelsResults/SideFilter";
import BottomFilter from "../HotelsResults/BottomFilter";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const SeprateLocation = () => {
  const city = useParams('hotel-in-Lucknow')
  const [readMore, setReadLess] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(0);

  const handleAccordionClick = (index) => {
    if (openAccordion === index) {
      // If the clicked accordion is already open, close it.
      setOpenAccordion(null);
    } else {
      // Open the clicked accordion and close the others.
      setOpenAccordion(index);
    }
  };




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

  // to setthe price

  // Hotel PriceManagement
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

  // filter the hotel data as per the page and pagesize
  const FilterhotelsData = (data, pagination) => {
    const length = data.length;
    // const totalPageCounts = paginationManage(length);
    // setTotalPages(totalPageCounts);
    // const hotelData = data;
    // switch (currentSearchParams.sort) {
    //   case "popularity":
    //     hotelData?.sort((a, b) => b.hotelRatings - a.hotelRatings);
    //     break;
    //   case "ratings":
    //     hotelData?.sort((a, b) => b.hotelRatings - a.hotelRatings);
    //     break;
    //   case "l2h":
    //     hotelData?.sort(
    //       (a, b) => PriceManagement(a).price - PriceManagement(b).price
    //     );
    //     break;
    //   case "h2l":
    //     hotelData?.sort(
    //       (a, b) => PriceManagement(b)?.price - PriceManagement(a)?.price
    //     );
    //     break;
    // }
    setHotels(data);
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
          setTotalPages(response.data.totalCount);
          FilterhotelsData(response.data.data, pagination);
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

  // -------------------------------------------------------------------------------------------------------------------------
  return (
    <div>

      <Helmet>
        {/* Cononical tag:-  */}
        <link rel="canonical" href="https://www.hoteliorooms.com" />
      </Helmet>

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

            <Box sx={{ m: 1.5, p: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>Best Hotelio Hotels in Lucknow</Typography>
              <Typography variant="subtitle2" pt={2} fontWeight={500}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam quis nobis dolorem maxime explicabo. Soluta sunt modi obcaecati. Itaque quasi quam nostrum asperiores consequatur vel. Nisi quis mollitia soluta, minus vitae in? Nam rerum, deleniti, totam error, qui optio asperiores facere beatae porro voluptate quasi blanditiis veniam et excepturi non.</Typography>
              {readMore ? null : <Typography sx={{ cursor: 'pointer' }} onClick={() => setReadLess(true)} variant="subtitle2" color={'error'} fontWeight={500}>Read More</Typography>}
            </Box>
            {readMore && <>
              <Box sx={{ m: 1.5, p: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>Best Hotelio Hotels in Lucknow</Typography>
                <Typography variant="subtitle2" pt={2} fontWeight={500}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam quis nobis dolorem maxime explicabo. Soluta sunt modi obcaecati. Itaque quasi quam nostrum asperiores consequatur vel. Nisi quis mollitia soluta, minus vitae in? Nam rerum, deleniti, totam error, qui optio asperiores facere beatae porro voluptate quasi blanditiis veniam et excepturi non.</Typography>
              </Box>
              <Box sx={{ m: 1.5, p: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>Best Hotelio Hotels in Lucknow</Typography>
                <Typography variant="subtitle2" pt={2} fontWeight={500}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam quis nobis dolorem maxime explicabo. Soluta sunt modi obcaecati. Itaque quasi quam nostrum asperiores consequatur vel. Nisi quis mollitia soluta, minus vitae in? Nam rerum, deleniti, totam error, qui optio asperiores facere beatae porro voluptate quasi blanditiis veniam et excepturi non.</Typography>
              </Box>
              <Box sx={{ m: 1.5, p: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>Best Hotelio Hotels in Lucknow</Typography>
                <Typography variant="subtitle2" pt={2} fontWeight={500}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam quis nobis dolorem maxime explicabo. Soluta sunt modi obcaecati. Itaque quasi quam nostrum asperiores consequatur vel. Nisi quis mollitia soluta, minus vitae in? Nam rerum, deleniti, totam error, qui optio asperiores facere beatae porro voluptate quasi blanditiis veniam et excepturi non.</Typography>
                {readMore && <Typography sx={{ cursor: 'pointer' }} onClick={() => setReadLess(false)} variant="subtitle2" color={'error'} fontWeight={500}>Read Less</Typography>}
              </Box>
            </>}

            <Box sx={{ m: 1.5, p: 1 }} >

              <Typography variant="h5" pb={2} fontWeight={800}>Questions and Answers</Typography>

              <Accordion
                sx={{
                  boxShadow: '3px 3px 6px 0px rgba(204, 219, 232, 0.5) inset, -3px -3px 6px 1px rgba(255, 255, 255, 0.5) inset',
                  color: '#ee2e24'
                }}
                expanded={openAccordion === 0} onChange={() => handleAccordionClick(0)}>
                <AccordionSummary expandIcon={openAccordion === 0 ? <RemoveIcon /> : <AddIcon />}>
                  <Typography variant="h6">Which are the best Sanitised Hotels in Lucknow?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body">Under GST, online travel agents and hotels provide invoices that include charges for GST. But if you have bookings in multiple states, claiming credit input on these is more than a little complicated. We issue our invoices from the state each hotel is in, which means you can claim input credit for the full GST amount against your GST liability</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', color: '#ee2e24' }} expanded={openAccordion === 1} onChange={() => handleAccordionClick(1)}>
                <AccordionSummary expandIcon={openAccordion === 1 ? <RemoveIcon /> : <AddIcon />}>
                  <Typography variant="h6">What are some of the best accommodation options in Lucknow?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body">Every time you make a fresh booking, you have to go through the process of adding a new vendor to your system. Enter Hotelio. We only require one-time registration of vendors and allow one-time payments to be made against a particular corporate code, saving you hours of desk time and more than one headache</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', color: '#ee2e24' }} expanded={openAccordion === 2} onChange={() => handleAccordionClick(2)}>
                <AccordionSummary expandIcon={openAccordion === 2 ? <RemoveIcon /> : <AddIcon />}>
                  <Typography variant="h6">What are the interesting activities to engage in the city?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body">Thanks to GST, every hotel booking now splits into multiple points of contact: the hotel and the travel agent. If there are any questions that need answering, you’ll have to reach out to multiple people. Unless you book through Hotelio. We give you a single invoice, a single booking ID, and a single person to get in touch for any queries: Your Hotelio Relationship Manager</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', color: '#ee2e24' }} expanded={openAccordion === 3} onChange={() => handleAccordionClick(3)}>
                <AccordionSummary expandIcon={openAccordion === 3 ? <RemoveIcon /> : <AddIcon />}>
                  <Typography variant="h6">One-time Vendor Registration & Payments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body">Thanks to GST, every hotel booking now splits into multiple points of contact: the hotel and the travel agent. If there are any questions that need answering, you’ll have to reach out to multiple people. Unless you book through Hotelio. We give you a single invoice, a single booking ID, and a single person to get in touch for any queries: Your Hotelio Relationship Manager</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', color: '#ee2e24' }} expanded={openAccordion === 4} onChange={() => handleAccordionClick(4)}>
                <AccordionSummary expandIcon={openAccordion === 4 ? <RemoveIcon /> : <AddIcon />}>
                  <Typography variant="h6">One-time Vendor Registration & Payments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body">Thanks to GST, every hotel booking now splits into multiple points of contact: the hotel and the travel agent. If there are any questions that need answering, you’ll have to reach out to multiple people. Unless you book through Hotelio. We give you a single invoice, a single booking ID, and a single person to get in touch for any queries: Your Hotelio Relationship Manager</Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
          <Grid item xs={12}>

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

export default SeprateLocation;
