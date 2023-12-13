import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  calculateDiscount,
  calculateThePrice,
  totalLengthOfStay,
} from "../../Utilis/_fuctions";
import { useBooking } from "../../context/useBooking";
import { useAuthContext } from "../../context/userAuthContext";

const BookingInfo = ({ hotelData, roomData, currentSearchParam }) => {
  const {
    coupon,
    setCoupon,
    userBookingDetails,
    setUserBookingDetails,
    finalBookingData,
    setFinalBookingData,
    Gst,
    setGst,
    calculateAmount,
    BillingCalculate,
  } = useBooking();
  const navigate = useNavigate();
  const [show, setHide] = useState(false);
  const { currentUser } = useAuthContext();
  const [details, setDetails] = useState(false);
  const ShowDetails = () => setDetails((prev) => !prev);
  // const handleOpen = () => setOpen(true);

  const handleChangeCredentials = () => {
    const lastQuerySearched = window.localStorage.getItem("search");
    const decoded = decodeURIComponent(lastQuerySearched);
    // navigate(`/searchedhotels?${decoded}`);
    navigate("/");
  };
  //   credentials
  const checkIn = currentSearchParam.checkIn;
  const checkOut = currentSearchParam.checkOut;
  const qunatityRooms = currentSearchParam.totalRooms;
  const totalGuest = currentSearchParam.totalGuest;
  const priceOfaRoom = roomData?.price;
  const totalDays = totalLengthOfStay(checkIn, checkOut);

  const calculate = BillingCalculate(
    priceOfaRoom,
    null,
    qunatityRooms,
    12,
    checkIn,
    checkOut,
    currentUser
  );

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
      <Card style={{ border: "2px solid #ee2e24" }} className="w-100 mb-1">
        <CardContent>
          <Typography
            display={"flex"}
            alignItems={"center"}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Hotel{" "}
            <Rating name="read-only" value={hotelData?.hotelRatings} readOnly />
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
            {hotelData?.hotelName} ({hotelData?.hotelType?.title})
          </Typography>
          <Typography variant="body2">{hotelData?.address}</Typography>
          <div className="d-flex align-items-center">
            <Chip
              label={`${hotelData?.hotelRatings}`}
              sx={{ mr: 1, my: 1, background: "#ee2e24", color: "#ffd700" }}
            />{" "}
            5 · 233 reviews
          </div>
          <Typography variant="body2">
            Swimming pool, Restaurant, WiFi, Parking
          </Typography>
        </CardContent>
      </Card>
      <Card style={{ border: "2px solid #ee2e24" }} className="w-100 mb-1">
        <CardContent>
          <div className="d-flex justify-content-between align-items-center">
            <Typography color="text-dark" variant="h6" fontWeight={700}>
              Your booking details
            </Typography>

            {/* <Typography
              onClick={handleOpen}
              sx={{ cursor: "pointer" }}
              color="#ee2e24"
              variant="button"
              fontWeight={700}
            >
              Edit
            </Typography> */}
          </div>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="overline" display="block">
                Check-in
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ pl: 1.5 }} variant="overline" display="block">
                Check-out
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ borderRight: "1px solid #808080" }}>
              <Typography variant="subtitle2">
                {moment(currentSearchParam.checkIn).format("ddd DD MMM YYYY")}
                {/* Sat 26 Aug 2003 */}
              </Typography>
              <Typography variant="caption">
                {moment(currentSearchParam.checkIn).format("hh:mm A")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ pl: 1.5 }} variant="subtitle2">
                {moment(currentSearchParam.checkOut).format("ddd DD MMM YYYY")}
              </Typography>
              <Typography sx={{ pl: 1.5 }} variant="caption">
                {moment(currentSearchParam.checkOut).format("hh:mm A")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="overline">Total length of stay:</Typography>
              <Typography variant="subtitle2">
                {calculate?.totalDays}
                &nbsp; night
              </Typography>
              <hr />
            </Grid>
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              item
              xs={12}
            >
              <div>
                <Typography variant="overline">Your selected</Typography>
                <Typography variant="subtitle2">
                  {calculate?.totalrooms} {roomData?.roomType?.title} for{" "}
                  {calculate?.totalDay} Days
                  <Typography variant="subtitle2">
                    {calculate?.totalrooms} X {calculate?.totalDays} X ₹
                    {calculate?.amount} = ₹ {calculate?._basePrice?.value}
                  </Typography>
                </Typography>
              </div>
              <div style={{ cursor: "pointer" }} className="p-2 border">
                {show ? (
                  <ExpandLessIcon onClick={() => setHide(!show)} />
                ) : (
                  <ExpandMoreIcon onClick={() => setHide(!show)} />
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              {show ? (
                <>
                  <Typography variant="overline">
                    {calculate.totalDays} x {roomData.roomType.title}
                  </Typography>
                  <Typography variant="caption" display="block">
                    {currentSearchParam.totalGuest} Guests
                  </Typography>
                  {/* <Typography variant="caption">
                    ₹{roomData?.price * parseInt(qunatityRooms)}
                  </Typography> */}
                </>
              ) : null}

              <Typography
                color="error"
                sx={{ cursor: "pointer" }}
                onClick={handleChangeCredentials}
                variant="subtitle2"
              >
                Change Your Selection
              </Typography>
              {/* {changeSelection && (
                    <div className="text-center">
                      <div className="d-flex justify-content-evenly align-items-center">
                        <Typography variant="overline" gutterBottom>
                          Guest
                        </Typography>
                        <FormControl className="w-50">
                          <div>
                            <IconButton onClick={Guestdecrement}>
                              <RemoveIcon />
                            </IconButton>
                            &nbsp;{selectedGuest}&nbsp;
                            <IconButton onClick={Guestincrement}>
                              <AddIcon />
                            </IconButton>
                          </div>
                        </FormControl>
                      </div>
                      <div className="d-flex justify-content-evenly align-items-center py-2">
                        <Typography variant="overline" gutterBottom>
                          Room
                        </Typography>
                        <FormControl className="w-50">
                          <div>
                            <IconButton onClick={Roomdecrement}>
                              <RemoveIcon />
                            </IconButton>
                            &nbsp;{selectedRoom}&nbsp;
                            <IconButton onClick={() => RoomIncDec("inc")}>
                              <AddIcon />
                            </IconButton>
                          </div>
                        </FormControl>
                      </div>
                      <Button color="error" fullWidth variant="contained">
                        Done
                      </Button>
                    </div>
                  )} */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card style={{ border: "2px solid #ee2e24" }}>
        <CardContent>
          <Typography
            color="text-dark"
            className="text-danger"
            fontWeight={800}
          >
            Your price summary
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "0.5rem",
            }}
          >
            <Typography variant="body2" className="fw-bold ">
              {calculate?._basePrice?.head}
            </Typography>
            <Typography variant="caption" className="fw-bold ">
              ₹{calculate?._basePrice?.value}
            </Typography>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => ShowDetails()}
            >
              <Typography variant="body2" className="fw-bold">
                {calculate?._totalDiscount?.head}
              </Typography>
              <Typography variant="caption" className="fw-bold">
                ₹{calculate?._totalDiscount?.value}
              </Typography>
            </div>
            {details && (
              <>
                {calculate?._totalDiscount?.sub?.map((item, index) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" className="text-secondary">
                      &emsp;-{item?.head}
                    </Typography>
                    <Typography variant="caption" className="text-secondary">
                      +₹{item?.value}
                    </Typography>
                  </div>
                ))}
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => ShowDetails()}
          >
            <Typography variant="body2" className="fw-bold">
              {calculate?._priceAfterDiscount?.head}
            </Typography>
            <Typography variant="caption" className="fw-bold">
              ₹{calculate?._priceAfterDiscount?.value}
            </Typography>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => ShowDetails()}
            >
              <Typography variant="body2" className="fw-bold">
                {calculate?._taxesAndServiceFee?.head}
              </Typography>
              <Typography variant="caption" className="fw-bold">
                ₹{calculate?._taxesAndServiceFee?.value}
              </Typography>
            </div>
            {details && (
              <>
                {calculate?._taxesAndServiceFee?.sub?.map((item, index) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" className="text-secondary">
                      &emsp;-{item?.head}
                    </Typography>
                    <Typography variant="caption" className="text-secondary">
                      +₹{item?.value}
                    </Typography>
                  </div>
                ))}
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" className="fw-bold">
              {calculate?._totalAmountToPaid?.head}
            </Typography>
            <Typography variant="caption" className="fw-bold">
              ₹{calculate?._totalAmountToPaid?.value}
            </Typography>
          </div>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">20% off</Typography>
            <Typography variant="caption">
              {
                calculateThePrice(
                  currentSearchParam,
                  qunatityRooms,
                  priceOfaRoom,
                  totalDays,
                  0.2
                ).discountAmount
              }
            </Typography>
          </div> */}

          <Typography variant="caption">
            You're getting a discount because, for a limited time, this property
            is offering reduced rates on some rooms that match your search.
          </Typography>
        </CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            background: "#ebf3ff",
            padding: "20px",
          }}
        >
          <Typography
            fontWeight={600}
            variant="h5"
            fontSize={18}
            className="text-danger"
          >
            {calculate?._totalAmountToPaid?.head}
          </Typography>
          <div className="text-right">
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography color="error" variant="h4">
                <del>₹&nbsp;{calculate?._basePrice?.value}</del>
              </Typography>
              <Typography fontWeight={700} variant="h4">
                ₹&nbsp;{calculate?._totalAmountToPaid?.value}
              </Typography>
            </Box>
            <Typography variant="caption">
              Great Choice! You are saving{" "}
              <span className="text-danger">
                ₹&nbsp;{calculate?._totalDiscount?.value}
              </span>
              &nbsp; with your booking
            </Typography>
          </div>
        </div>
        {/* <CardContent>
          <Typography color="text-dark" fontWeight={700}>
            Price information
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption">
              Excludes ₹ 201.60 in taxes and charges
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">Goods & services tax</Typography>
            <Typography variant="caption">₹ 201.60</Typography>
          </div>
        </CardContent> */}
      </Card>
    </Grid>
  );
};

export default BookingInfo;
