import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../config";
import { useEffect } from "react";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import MobileHeader from "../../Components/MobileComponent/MobileHeader";
import MobileFooter from "../../Components/MobileComponent/MobileFooter";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import BottomFilter from "../HotelsResults/BottomFilter";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HotelsCard from "./HotelsCard";
import LocatinSideFilter from "./LocatinSideFilter";
import { useSearch } from "../../context/useSearch";
import instance from "../../store/_utils";
import { ClockLoader } from "react-spinners";
import {
  ClockWaitLoader,
  WaitLoader,
} from "../../Components/Elements/WaitLoader";

const SeprateLocation = () => {
  const { city } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(0);
  const [hotelList, setHotelList] = useState(null);
  const [page, setPage] = useState(1);
  const [toatalPage, setTotalPage] = useState(null);
  const { GetLocationData } = useSearch();
  const [filter, setFilter] = useState({});

  const handleFilterChange = (key, value) => {
    setFilter({ ...filter, [key]: value });
  };

  const handleAccordionClick = (index) => {
    if (openAccordion === index) {
      // If the clicked accordion is already open, close it.
      setOpenAccordion(null);
    } else {
      // Open the clicked accordion and close the others.
      setOpenAccordion(index);
    }
  };

  const searchQuery = new URLSearchParams(document.location.search);

  // State to keep track of the selected rating filter

  const currentSearchParams = Object.fromEntries(searchQuery?.entries());

  const location = useLocation();
  const [urlData, setUrlData] = useState(null);

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/"); // Navigate to the desired route without a page reload
  };

  const ReadMoreAndReadLess = ({ str }) => {
    const data = str;

    return (
      <>
        <Typography
          dangerouslySetInnerHTML={{ __html: data }}
          color={"grey"}
          sx={{ height: !readMore ? "200px" : "100%", overflowY: "hidden" }}
          variant="subtitle2"
        />
        <h6
          style={{ padding: ".5rem 0rem", color: "red", cursor: "pointer" }}
          onClick={() => {
            setReadMore(!readMore);
          }}
        >
          {!readMore ? "read more" : "read less"}
        </h6>
      </>
    );
  };

  // Get Hotels Data
  useEffect(() => {
    let timeoutId;

    const getSearchHotel = async () => {
      setLoading(true);
      try {
        console.log(filter);
        const data = await GetLocationData(city, filter, currentSearchParams);
        if (data.error === false) {
          setHotelList(data?.data[0]?.data);
          setTotalPage(data?.data[0]?.pagination[0].counts);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const debounceApiCall = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(getSearchHotel, 500);
    };
    debounceApiCall();
    return () => clearTimeout(timeoutId);
  }, [location.search, city]);

  // ---------------------------------------------------------------------------------------
  const [searchFaq, setSearchFaq] = useState("");
  useEffect(() => {
    let newFilter = {};

    if (filter !== null) {
      if (filter.price && filter?.price[0] !== null) {
        newFilter.priceMin = filter?.price[0];
      }

      if (filter.price && filter?.price[1] !== null) {
        newFilter.priceMax = filter?.price[1];
      }

      if (filter.roomType !== undefined) {
        newFilter.roomType = filter?.roomType;
      }

      if (filter.hotelType !== undefined) {
        newFilter.hotelType = filter?.hotelType;
      }

      if (filter.amenities && filter.amenities.length > 0) {
        newFilter.amenities = filter?.amenities.join(",");
      }

      if (filter?.payment !== undefined) {
        newFilter.payment = filter?.payment === "Pay at Hotel" ? true : false;
      }
      if (filter?.sort !== undefined) {
        newFilter.sort = filter?.sort;
      }
      if (filter.location !== undefined) {
        newFilter.location = filter?.location;
      }
      if (filter.lat !== undefined) {
        newFilter.lat = filter?.lat;
      }
      if (filter.lng !== undefined) {
        newFilter.lng = filter?.lng;
      }
    }
    setSearchParams({
      ...newFilter,
    });
  }, [filter]);

  useEffect(() => {
    async function GetLocationData(endpoint) {
      setLoading(true);
      try {
        const response = await instance.get(
          `/popular-location/get/endpoint/${endpoint}`
        );
        if (response.status === 200) {
          setUrlData(response.data.data[0]);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Pass the endpoint value to the function
    GetLocationData(city);
  }, [city]);

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
            <LocatinSideFilter
              handleFilterChange={handleFilterChange}
              filter={filter}
              setFilter={setFilter}
            />
          </Grid>

          {hotelList && urlData ? (
            <Grid item xl={10} lg={10} xs={12}>
              {hotelList?.length !== 0 ? (
                <HotelsCard
                  hotels={hotelList}
                  totalPages={toatalPage}
                  pagination={page}
                  setPagination={setPage}
                  location={urlData}
                  handleFilterChange={handleFilterChange}
                  filter={filter}
                />
              ) : (
                <img
                  src="https://www.sunflowerhospital.in/assets/img/bg/404-error-dribbble-800x600.gif"
                  alt="404notfound"
                  width={350}
                  height={500}
                  style={{ marginLeft: "10px" }}
                />
              )}

              <Box sx={{ m: 1.5, p: 1 }}>
                <ReadMoreAndReadLess str={urlData?.discriptions} />
              </Box>

              <Box sx={{ m: 1.5, p: 1 }}>
                <Typography variant="h5" pb={2} fontWeight={800}>
                  Questions and Answers
                </Typography>
                <TextField
                  placeholder="search"
                  fullWidth
                  value={searchFaq}
                  onChange={(e) => setSearchFaq(e.target.value)}
                  sx={{ padding: "1rem 0px" }}
                />
                <Typography>
                  Showing 1 - {urlData?.faq?.length} of {urlData?.faq?.length}
                </Typography>
                {urlData?.faq
                  ?.filter((item) =>
                    item?.question
                      ?.toLowerCase()
                      ?.includes(searchFaq?.toLowerCase())
                  )
                  ?.map((item, index) => (
                    <Accordion
                      key={index}
                      sx={{
                        boxShadow:
                          "3px 3px 6px 0px rgba(204, 219, 232, 0.5) inset, -3px -3px 6px 1px rgba(255, 255, 255, 0.5) inset",
                        color: "#ee2e24",
                      }}
                      expanded={openAccordion === index}
                      onChange={() => handleAccordionClick(index)}
                    >
                      <AccordionSummary
                        expandIcon={
                          openAccordion === index ? <RemoveIcon /> : <AddIcon />
                        }
                      >
                        <Typography
                          dangerouslySetInnerHTML={{ __html: item.question }}
                          color={"grey"}
                          variant="subtitle2"
                        />
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                          color={"grey"}
                          variant="subtitle2"
                        />
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </Box>
            </Grid>
          ) : (
            <ClockWaitLoader loading={true} />
          )}
          <Grid item xs={12}></Grid>
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
