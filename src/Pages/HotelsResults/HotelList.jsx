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
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { GetAlltheRoomTypes } from "../../store/actions/roomCategoriesAction";

const HotelList = ({
  hotels,
  location,
  loader,
  pagination,
  totalPages,
  setPagination,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AllRoomsData = useSelector((state) => state.GetAllRoomTypReducer);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = new URLSearchParams(document.location.search);

  // State to keep track of the selected rating filter

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
  // const PriceManagement = (hotelData) => {
  //   const report = {};
  //   hotelData?.rooms?.forEach((element) => {
  //     report[element?.roomType?._id] = {
  //       price: element?.price,
  //       title: element?.roomType?.title,
  //     };
  //   });
  //   const result = {};
  //   if (currentSearchParams.roomType !== undefined) {
  //     const newData = {
  //       price: report[currentSearchParams.roomType]?.price,
  //       title: report[currentSearchParams.roomType]?.title,
  //     };
  //     Object.assign(result, newData);
  //   } else {
  //     if (
  //       currentSearchParams.sort === "l2h" ||
  //       currentSearchParams.sort === "h2l"
  //     ) {
  //       if (currentSearchParams.sort === "l2h") {
  //         const roomListPriceList = Object.values(report);
  //         const minPrice = roomListPriceList.sort(
  //           (a, b) => a?.price - b?.price
  //         );
  //         Object.assign(result, minPrice[0]);
  //       } else {
  //         const roomListPriceList = Object.values(report);
  //         const minPrice = roomListPriceList.sort(
  //           (a, b) => b?.price - a?.price
  //         );
  //         Object.assign(result, minPrice[0]);
  //       }
  //     } else {
  //       const roomListPriceList = Object.values(report);
  //       const minPrice = roomListPriceList.sort((a, b) => a?.price - b?.price);
  //       Object.assign(result, minPrice[0]);
  //     }
  //   }
  //   return result;
  // };
  const setPrice = (roomData) => {
    let price;
    if (currentSearchParams.sort === "l2h") {
      const minPrice = roomData?.rooms?.sort((a, b) => a?.price - b?.price);
      price = minPrice[0].price;
    } else if (currentSearchParams.sort === "h2l") {
      const minPrice = roomData?.rooms?.sort((a, b) => b?.price - a?.price);
      price = minPrice[0].price;
    } else {
      price = roomData?.rooms[0]?.price;
    }
    return price;
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

  const TruncateText = ({ text, words }) => {
    const truncatedText = text.split(' ').slice(0, words).join(' ');

    return (
      <span style={{ fontWeight: '500' }} title={text}>
        {truncatedText}
        {text.split(' ').length > words && '...'}
      </span>
    );
  };

  return hotels === null ? (
    <WaitLoader loading="true" />
  ) : (
    <Container>
      {/* First hotel card */}
      <Grid sx={{ margin: "10px 0px" }} container>
        <Grid item xs={12}>
          <Typography variant={isMobile ? 'h5' : 'h3'} fontWeight={isMobile ? 500 : 700}>
            Welcome To Hotelio, Your Travel Partner
          </Typography>
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
              <b>{isMobile ? null : 'Here is your Searched Results of'} {location}</b>
            </h4>
            <Select
              value={currentSearchParams.sort}
              onChange={handleRatingFilterChange}
              sx={{ marginBottom: "10px", width: 200, fontWeight: '700' }}
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
                    className="rounded-3"
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
                  <div className={isMobile ? 'p-3' : 'px-3'}>
                    <div className={isMobile && 'd-flex justify-content-between align-items-center'}>
                      <div className={`${isMobile ? '' : 'pb-4'} d-flex align-items-start flex-column`}>
                        {isMobile ?
                          <TruncateText text={items?.hotelName} words={11} /> :
                          <Typography variant="h6">{items?.hotelName}</Typography>
                        }
                        <Typography className="fw-bold fs-6 text-danger">
                          {items?.hotelType?.title}
                        </Typography>
                      </div>
                      {
                        isMobile ?
                          <div className="d-flex flex-column flex-xs-column flex-md-row flex-lg-row flex-xl-row align-items-center justify-content-between">
                            <Rating
                              name="read-only"
                              value={items?.hotelRatings}
                              readOnly
                            />
                            {console.log(items)}
                            <Typography variant="body1" fontWeight={700}>
                              {items?.hotelRatings || ""} | 233 (reviews)
                            </Typography>
                          </div> : null
                      }
                    </div>
                    {
                      isMobile ? null :
                        <>
                          <h6>
                            {items?.locality} ,{items?.city} &nbsp;,{items?.state}
                          </h6>

                          <div>
                            <h5 className="fs-6 fw-bold py-2">
                              {
                                AllRoomsData?.data?.find(
                                  (x) => x._id === items?.rooms[0]?.roomType
                                )?.title
                              }
                            </h5>
                          </div>
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
                          <div className="d-flex flex-column flex-xs-column flex-md-row flex-lg-row flex-xl-row align-items-center justify-content-between">
                            <Rating
                              name="read-only"
                              value={items?.hotelRatings}
                              readOnly
                            />
                            {console.log(items)}
                            <Typography variant="body1" fontWeight={700}>
                              {items?.hotelRatings || ""} | 233 (reviews)
                            </Typography>
                          </div>
                        </>
                    }
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
                                `/searched-hotel/${items._id}?${bookingQueries}`
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
                              `/searched-hotel/${items._id}?${bookingQueries}`
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
                      <Typography variant="h5">
                        {setPrice(items)} &nbsp;
                      </Typography>{" "}
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
