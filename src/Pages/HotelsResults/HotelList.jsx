import React from "react";
import Rating from "@mui/material/Rating";
import {
  Card,
  Container,
  Grid,
  Button,
  Pagination,
  Select,
  MenuItem,
  Chip,
  Typography,
} from "@mui/material";
import style from "./HotelList.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { WaitLoader } from "../../Components/Elements/WaitLoader";
import HotelListBack from "../../images/HotelListBack.jpg";
import { useAuthContext } from "../../context/userAuthContext";
import { useEffect } from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { current } from "@reduxjs/toolkit";

const HotelList = ({
  hotels,
  location,
  loader,
  pagination,
  totalPages,
  setPagination,
}) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = new URLSearchParams(document.location.search);

  // State to keep track of the selected rating filter
  const [selectedRatingFilter, setSelectedRatingFilter] =
    React.useState("popularity");

  const currentSearchParams = Object.fromEntries(searchQuery?.entries());

  const bookingQueries = new URLSearchParams({
    checkIn: currentSearchParams.checkIn,
    checkOut: currentSearchParams.checkOut,
    totalRooms: currentSearchParams.totalRooms,
    totalGuest: currentSearchParams.totalGuest,
  }).toString();

  const updateSearchQuery = async ({ ...args }) => {
    const updatedSearchParams = {
      ...currentSearchParams,
      ...args,
    };
    setSearchParams(new URLSearchParams(updatedSearchParams));
  };

  // Function to handle the change of the rating filter
  const handleRatingFilterChange = (event) => {
    updateSearchQuery({ sort: event.target.value });
  };

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
      if (
        currentSearchParams.sort === "l2h" ||
        currentSearchParams.sort === "h2l"
      ) {
        if (currentSearchParams.sort === "l2h") {
          const roomListPriceList = Object.values(report);
          const minPrice = roomListPriceList.sort(
            (a, b) => a?.price - b?.price
          );
          Object.assign(result, minPrice[0]);
        } else {
          const roomListPriceList = Object.values(report);
          const minPrice = roomListPriceList.sort(
            (a, b) => b?.price - a?.price
          );
          Object.assign(result, minPrice[0]);
        }
      } else {
        const roomListPriceList = Object.values(report);
        const minPrice = roomListPriceList.sort((a, b) => a?.price - b?.price);
        Object.assign(result, minPrice[0]);
      }
    }
    return result;
  };

  // Check the value in localStorage
  const loggedIn = localStorage.getItem("customer");

  // TO manage the paginationn
  const Page = (count, pagesize) => {
    let result;
    if (Math.round(count / pagesize) > count / 5) {
      result = Math.round(count / pagesize);
    } else {
      result = Math.round(count / pagesize) + 1;
    }
    return result;
  };

  // update the pagination
  useEffect(() => {
    updateSearchQuery({ page: pagination, pageSize: 5 });
  }, [pagination]);

  return hotels === null ? (
    <WaitLoader loading="true" />
  ) : (
    <Container>
      {/* First hotel card */}
      <Grid sx={{ margin: "10px 0px" }} container>
        <Grid item xs={12}>
          <Typography variant="h3" fontWeight={700}>Welcome To Hotelio, Your Travel Partner</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          p={2}
          lg={12}
          xl={12}
          style={{
            background: `url(${HotelListBack})`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            color: "#000",
            borderRadius: "8px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h4>
              <b>Here is your Searched Results of {location}</b>
            </h4>
            <Select
              value={currentSearchParams.sort}
              onChange={handleRatingFilterChange}
              sx={{ marginBottom: "10px", width: 200 }}
            >
              <MenuItem value="popularity">Popularity</MenuItem>
              <MenuItem value="ratings">Guest Rating</MenuItem>
              <MenuItem value="l2h">Price Low to High</MenuItem>
              <MenuItem value="h2l">Price High to Low</MenuItem>
            </Select>
          </div>
        </Grid>
      </Grid>
      {/* {count >= 0 ? null : <Typography variant="h4">We are currently working in this area</Typography>} */}
      {hotels?.map((items) => (
        <>
          {loader ? (
            <React.Fragment>
              <Grid container>
                <Grid item xs={12} lg={3} xl={3}>
                  <Skeleton
                    duration={1}
                    style={{
                      backgroundColor: "#ddd",
                      height: "180px",
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={5} xl={5}>
                  <div className="px-3 pt-2">
                    <Skeleton
                      width="80%"
                      height={24}
                      duration={2}
                      style={{ backgroundColor: "#ddd" }}
                    />
                    <Skeleton
                      width="60%"
                      height={16}
                      duration={2}
                      style={{ backgroundColor: "#ddd" }}
                    />
                    <Skeleton
                      width="50%"
                      height={16}
                      duration={2}
                      style={{ backgroundColor: "#ddd" }}
                    />
                    <Skeleton
                      width="40%"
                      height={16}
                      duration={2}
                      style={{ backgroundColor: "#ddd" }}
                    />
                    <Skeleton
                      width="60%"
                      height={16}
                      duration={2}
                      style={{ backgroundColor: "#ddd" }}
                    />
                    <Skeleton
                      width="50%"
                      height={16}
                      duration={2}
                      style={{ backgroundColor: "#ddd" }}
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  xl={4}
                  className={`${style.SecondGridView}`}
                >
                  <div>
                    <Skeleton
                      width="80%"
                      height={48}
                      duration={2}
                      style={{ backgroundColor: "#ddd" }}
                    />
                    <Skeleton
                      width="80%"
                      height={40}
                      duration={2}
                      style={{ backgroundColor: "#ddd" }}
                    />
                  </div>
                </Grid>
              </Grid>
            </React.Fragment>
          ) : (
            <Card
              style={{ border: "2px solid #ee2e24" }}
              fluid
              sx={{ p: 1, my: 1, borderRadius: 4 }}
            >
              <Grid container>
                <Grid item xs={12} lg={3} xl={3}>
                  {/* <div className="w-100"> */}

                  <img
                    className="rounded"
                    style={{ height: "180px", width: "100%" }}
                    src={items.hotelCoverImg}
                    alt="eyd"
                  />
                  {/* </div> */}
                </Grid>
                <Grid
                  style={{ display: "grid", alignItems: "center" }}
                  item
                  xs={12}
                  lg={5}
                  xl={5}
                >
                  <div className="px-3 pt-2">
                    <div className="d-flex align-items-center">
                      <h4>
                        {items.hotelName} ({items?.hotelType?.title})
                      </h4>
                    </div>
                    <p>
                      {items.locality}, {items.city}, {items.country}
                    </p>
                    <h6>{items.zipCode}</h6>
                    <div>
                      {items?.rooms[0]?.roomType?.amenties?.map(
                        (item, index) => (
                          <Chip
                            key={index}
                            label={item.title}
                            sx={{
                              mr: 1,
                              mb: 1,
                              background: "#6b0000",
                              color: "#ffd700",
                            }}
                          />
                        )
                      )}
                    </div>
                    <div className="d-flex align-items-center">
                      <Rating
                        name="read-only"
                        value={items.hotelRatings}
                        readOnly
                      />
                      <h6>
                        <b>{items?.hotelRatings || ""}</b>&nbsp; |{" "}
                        <span className="px-2">233 (reviews)</span>
                      </h6>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  xl={4}
                  className={`${style.SecondGridView}`}
                >
                  <div>
                    <div className={` ${style.mobflex}`}>
                      <div className={`p-2 ${style.BookingCardColor}`}>
                        <Button
                          onClick={() => {
                            if (loggedIn) {
                              navigate(
                                `/searchedhotel/${items._id}?${bookingQueries}`
                              );
                            } else {
                              navigate("/signin");
                            }
                          }}
                          variant="contained"
                          sx={{ borderRadius: 5 }}
                          color="error"
                        >
                          Book Now
                        </Button>
                      </div>
                      <div className={`p-2 ${style.BookingCardColor}`}>
                        <Button
                          variant="outlined"
                          sx={{ borderRadius: 5 }}
                          color="error"
                          onClick={() =>
                            navigate(
                              `/searchedhotel/${items._id}?${bookingQueries}`
                            )
                          }
                        >
                          View Hotel
                        </Button>
                      </div>
                    </div>
                    <div
                      className={`align-items-center p-2 ${style.BookingCardColor} ${style.mobflex}`}
                    >
                      <h4>
                        {PriceManagement(items).price} &nbsp;
                        <span>
                          <del>{items?.rooms[0]?.prevPrice}</del>
                        </span>
                      </h4>{" "}
                      <span className="text-danger">64% off</span>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Card>
          )}
          <hr style={{ color: "#6b0000", borderTop: "2px solid #6b0000" }} />
        </>
      ))}
      <div className="d-flex justify-content-center py-2">
        <Pagination
          count={Page(totalPages, 5)}
          page={pagination}
          onChange={(value, newValue) => setPagination(newValue)}
        />
      </div>
    </Container>
  );
};

export default HotelList;
