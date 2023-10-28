import {
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

const BookingInfo = ({ hotelData, roomData, currentSearchParam }) => {
  const navigate = useNavigate();
  const [show, setHide] = useState(false);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

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
            {hotelData?.hotelName}(Resort)
          </Typography>
          <Typography variant="body2">{hotelData?.address}</Typography>
          <div className="d-flex align-items-center">
            <Chip
              label={"9.3"}
              sx={{ mr: 1, my: 1, background: "#ee2e24", color: "#ffd700" }}
            />{" "}
            5 · 233 reviews
          </div>
          <Typography variant="body2">
            Swimming pool, Restaurant, WiFi, Parking
          </Typography>
        </CardContent>
      </Card>
      <Card style={{ border: "2px solid #ee2e24" }} className="w-100 mt-2 my-1">
        <CardContent>
          <div className="d-flex justify-content-between align-items-center">
            <Typography color="text-dark" variant="h6" fontWeight={700}>
              Your booking details
            </Typography>

            <Typography
              onClick={handleOpen}
              sx={{ cursor: "pointer" }}
              color="#ee2e24"
              variant="button"
              fontWeight={700}
            >
              Edit
            </Typography>
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
                {totalLengthOfStay(
                  currentSearchParam?.checkIn,
                  currentSearchParam?.checkOut
                )}
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
                  {qunatityRooms} {roomData?.roomType?.title} for {totalDays}{" "}
                  Days
                  <Typography variant="subtitle2">
                    {currentSearchParam?.totalRooms} X {totalDays} X ₹
                    {roomData?.price} = ₹{" "}
                    {
                      calculateThePrice(
                        currentSearchParam,
                        qunatityRooms,
                        priceOfaRoom,
                        totalDays,
                        0.2
                      ).GrossAmount
                    }
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
                    {qunatityRooms} x {roomData.roomType.title}
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
          <Typography color="text-dark" fontWeight={700}>
            Your price summary
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">Original price</Typography>
            <Typography variant="caption">
              ₹
              {
                calculateThePrice(
                  currentSearchParam,
                  qunatityRooms,
                  priceOfaRoom,
                  totalDays,
                  0.2
                ).GrossAmount
              }
            </Typography>
          </div>
          <div
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
          </div>

          <Typography variant="caption">
            You're getting a discount because, for a limited time, this property
            is offering reduced rates on some rooms that match your search.
          </Typography>
        </CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#ebf3ff",
            padding: "20px",
          }}
        >
          <Typography fontWeight={600} variant="h5">
            Price
          </Typography>
          <div className="text-right">
            <Typography color="error" variant="h6">
              <del>
                {" "}
                {
                  calculateThePrice(
                    currentSearchParam,
                    qunatityRooms,
                    priceOfaRoom,
                    totalDays,
                    0.2
                  ).GrossAmount
                }
              </del>
            </Typography>
            <Typography fontWeight={700} variant="h5">
              {
                calculateThePrice(
                  currentSearchParam,
                  qunatityRooms,
                  priceOfaRoom,
                  totalDays,
                  0.2
                ).NetAmount
              }
            </Typography>
            <Typography variant="caption">
              + ₹{" "}
              {
                calculateThePrice(
                  currentSearchParam,
                  qunatityRooms,
                  priceOfaRoom,
                  totalDays,
                  0.2
                ).GstAmount
              }
              taxes and charges
            </Typography>
          </div>
        </div>
        <CardContent>
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
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BookingInfo;
