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
import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  totalLengthOfStay,
} from "../../Utilis/_fuctions";
import { useBooking } from "../../context/useBooking";
import { useAuthContext } from "../../context/userAuthContext";
import { GetHotelBillCalculation } from "../../store/actions/hotelActions";
import { useCollections } from "../../context/useStateManager";

const BookingInfo = () => {
  const {
    BillingCalculate,
  } = useBooking();
  const navigate = useNavigate();
  const [show, setHide] = useState(false);
  const [searchParmas, setSearchParamas] = useSearchParams()
  const { currentUser } = useAuthContext();
  const dispatch = useDispatch()
  const [details, setDetails] = useState(false);
  const ShowDetails = () => setDetails((prev) => !prev);
  const HotelData = useSelector((state) => state.GetSingleHotelReducers);
  const calculate = useSelector((state) => state.GetHotelBillCalculationReducers?.data?.data);
  const roomId = searchParmas.get('rid')
  const { data: hotelData } = HotelData || {};
  const roomData = hotelData?.rooms?.find((item) => item._id === roomId);
  const { applicableOffer } = useCollections();


  const handleChangeCredentials = () => {
    const lastQuerySearched = window.localStorage.getItem("search");
    const decoded = decodeURIComponent(lastQuerySearched);
    navigate("/");
  };
  //   credentials
  const checkIn = searchParmas.get('checkIn');
  const checkOut = searchParmas.get('checkOut');
  const totalRooms = searchParmas.get('totalRooms');
  const totalGuest = searchParmas.get('totalGuest');
  const priceOfaRoom = roomData?.price;
  const customer = currentUser._id
  const totalDays = totalLengthOfStay(checkIn, checkOut);

  // const calculate = BillingCalculate(
  //   priceOfaRoom,
  //   null,
  //   qunatityRooms,
  //   12,
  //   checkIn,
  //   checkOut,
  //   currentUser
  // );
  useEffect(() => {

    let queryParams = {
      checkIn: searchParmas.get('checkIn'),
      totalRooms: searchParmas.get('totalRooms'),
      totalGuest: searchParmas.get('totalGuest'),
      roomid: searchParmas.get('rid'),
      customer: currentUser._id,
      checkOut: searchParmas.get('checkOut'),
    };
    if (applicableOffer) {
      queryParams.OfferId = applicableOffer
    }

    const billingQuery = new URLSearchParams(queryParams).toString()

    dispatch(GetHotelBillCalculation(billingQuery));
  }, [searchParmas, applicableOffer, currentUser, dispatch]);



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
                {moment(checkIn).format("ddd DD MMM YYYY")}
                {/* Sat 26 Aug 2003 */}
              </Typography>
              <Typography variant="caption">
                {moment(checkIn).format("hh:mm A")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ pl: 1.5 }} variant="subtitle2">
                {moment(checkOut).format("ddd DD MMM YYYY")}
              </Typography>
              <Typography sx={{ pl: 1.5 }} variant="caption">
                {moment(checkOut).format("hh:mm A")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="overline">Total length of stay:</Typography>
              <Typography variant="subtitle2">
                {totalDays}
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
                  {totalRooms} {roomData?.roomType?.title} for{" "}
                  {totalDays} Days
                  <Typography variant="subtitle2">
                    {totalRooms} X {totalDays} X ₹
                    {priceOfaRoom} = ₹ {totalRooms * totalDays * priceOfaRoom}
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
                    {totalDays} x {roomData.roomType.title}
                  </Typography>
                  <Typography variant="caption" display="block">
                    {totalGuest} Guests
                  </Typography>
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
          <Box display={'flex'} justifyContent={'space-between'}>

            <Typography
              className="text-danger"
              fontWeight={800}
            >
              Your price summary
            </Typography>
            <Typography
              color="primary"
              fontWeight={500}
              sx={{ cursor: 'pointer' }}
              onClick={() => ShowDetails()}
            >
              View Full Breakup
            </Typography>
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "0.5rem",
            }}
          >
            <Typography variant="body2" className="fw-bold ">
              Base Price ( {totalRooms} room X {totalDays} night )
            </Typography>
            <Typography variant="caption" className="fw-bold ">
              ₹{Math.ceil(calculate?.BasePrice)}
            </Typography>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" className="fw-bold">
                Total Discount
              </Typography>
              <Typography variant="caption" className="fw-bold">
                ₹{Math.ceil(calculate?.discountedAmount)}
              </Typography>
            </div>
            {details && (
              <>
                {calculate?.totalDiscount?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" className="text-secondary">
                      {/* &emsp;-{item?.type || 'No offer applied'} */}
                      &emsp;{item?.type ? `-${item?.type}` : 'No offer applied'}
                    </Typography>
                    <Typography variant="caption" className="text-secondary">
                      {item?.amount ? `+₹${Math.ceil(item?.amount)}` : null}
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
              Price after Discount
            </Typography>
            <Typography variant="caption" className="fw-bold">
              ₹ {Math.ceil(calculate?.priceAfterDiscount)}
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
                Taxes & Service Fees
              </Typography>
              <Typography variant="caption" className="fw-bold">
                ₹{Math.ceil(calculate?.totalTaxAndServiceAmount)}
              </Typography>
            </div>
            {details && (
              <>
                {calculate?.taxAndServices?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" className="text-secondary">
                      &emsp;-{item?.type}
                    </Typography>
                    <Typography variant="caption" className="text-secondary">

                      +₹{Math.ceil(item?.amount)}
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
              Total Amount to be paid
            </Typography>
            <Typography variant="caption" className="fw-bold">
              ₹ {Math.ceil(calculate?.totalAmountToPay)}
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
            Total Amount to be paid
          </Typography>
          <div className="text-right">
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography color="error" variant="h4">
                <del>₹&nbsp;{calculate?.BasePrice}</del>
              </Typography>
              <Typography fontWeight={700} variant="h4">
                ₹&nbsp;{Math.ceil(calculate?.totalAmountToPay)}
              </Typography>
            </Box>
            <Typography variant="caption">
              Great Choice! You are saving{" "}
              <span className="text-danger">
                ₹&nbsp;{Math.ceil(calculate?.discountedAmount)}
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