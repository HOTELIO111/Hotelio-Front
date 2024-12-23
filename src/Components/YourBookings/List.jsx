import * as React from "react";
import Swal from "sweetalert2";
import moment from "moment/moment";
import Grid from "@mui/material/Grid";
import Skeleton from "react-loading-skeleton";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../../context/userAuthContext";
import { GetBookingHistoryAction } from "../../store/actions/BookingHistoryAction";
import { CreateHotelioReview } from "../../store/actions/HotelioReviewAction";
import { RxCrossCircled } from "react-icons/rx";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Modal,
  Rating,
  SpeedDial,
  SpeedDialAction,
  Typography,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { useSearchParams } from "react-router-dom";

export default function List() {
  const dispatch = useDispatch();
  const { currentUser } = useAuthContext();
  const [open, setOpen] = React.useState(false);
  const [hotelId, setHotelId] = React.useState("");
  const [bookingId, setBookingId] = React.useState("");
  const [customerId, setCustomerId] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const handleOpen = (hoteid, bookingid, customerid) => {
    setOpen(true);
    setHotelId(hoteid);
    setBookingId(bookingid);
    setCustomerId(customerid);
  };
  const handleClose = () => setOpen(false);
  const [sortby, setSortBy] = React.useState("time-desc");
  const BookingData = useSelector((state) => state.GetBookingHistoryReducers);

  const reviewData = useSelector((state) => state.GetHotelioReviewReducer);
  React.useEffect(() => {
    changeOnesearchParam("sortby", sortby);
    dispatch(GetBookingHistoryAction(currentUser?._id));
  }, [currentUser, sortby]);

  const totalLengthOfStay = (checkIn, checkOut) => {
    const newCheckIn = new Date(checkIn);
    const newCheckOut = new Date(checkOut);
    const timeDifference = newCheckOut.getTime() - newCheckIn.getTime();
    const totalDays = timeDifference / (1000 * 3600 * 24);
    return totalDays;
  };

  const AlertBox = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel your Booking ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel Booking!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cancelled!", "Your Booking will be cancelled.", "success");
      }
    });
  };

  const ReviewModal = ({ open, handleClose }) => {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      bgcolor: "background.paper",
      // border: '2px solid #000',
      borderRadius: "20px",
      boxShadow: 24,
      p: 4,
      textAlign: "center",
    };

    const handleRatingChange = (fieldName, newValue) => {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: newValue,
      }));
    };

    const handleTextareaChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const [formData, setFormData] = React.useState({
      message: "",
      ratings: 0,
      valueOfMoney: 0,
      cleanliness: 0,
      comfort: 0,
      customer: "",
      hotel: "",
      booking: "",
    });

    const handleSubmit = async (event) => {
      event.preventDefault();

      const formDataToSend = {
        message: formData.message,
        ratings: formData.ratings,
        valueOfMoney: formData.valueOfMoney,
        cleanliness: formData.cleanliness,
        comfort: formData.comfort,
        customer: customerId,
        hotel: hotelId,
        booking: bookingId,
      };

      console.log(formDataToSend);

      try {
        await dispatch(CreateHotelioReview(formDataToSend));

        if (reviewData.data) {
          Swal.fire({
            icon: "success",
            title: "Hey! your review is captured",
            showConfirmButton: false,
            timer: 1500,
          });

          dispatch(GetBookingHistoryAction(currentUser._id));
          handleClose();
          setFormData({
            message: "",
            ratings: 0,
            valueOfMoney: 0,
            cleanliness: 0,
            comfort: 0,
            customer: "",
            hotel: "",
            booking: "",
          });

          // Handle success or navigate to another page
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please try again.",
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error, show a message or take appropriate action
      }
    };

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography id="modal-modal-title" variant="h6">
                Please share your review
              </Typography>
              <Button
                variant="text"
                onClick={handleClose}
                color="error"
                size="medium"
              >
                <RxCrossCircled size={30} />
              </Button>
            </Box>
            <hr />
            <div className="py-2">
              <Typography component="legend">Value of Money</Typography>
              <Rating
                name="valueOfMoney"
                size="large"
                value={formData.valueOfMoney}
                onChange={(event, newValue) =>
                  handleRatingChange("valueOfMoney", newValue)
                }
              />
            </div>
            <div className="py-2">
              <Typography component="legend">Cleanliness</Typography>
              <Rating
                name="cleanliness"
                size="large"
                value={formData.cleanliness}
                onChange={(event, newValue) =>
                  handleRatingChange("cleanliness", newValue)
                }
              />
            </div>
            <div className="py-2">
              <Typography component="legend">Comfort</Typography>
              <Rating
                name="comfort"
                size="large"
                value={formData.comfort}
                onChange={(event, newValue) =>
                  handleRatingChange("comfort", newValue)
                }
              />
            </div>
            <div className="py-2">
              <Typography component="legend">Overall Review</Typography>
              <Rating
                name="ratings"
                size="large"
                value={formData.ratings}
                onChange={(event, newValue) =>
                  handleRatingChange("ratings", newValue)
                }
              />
            </div>
            <div className="py-2">
              <Typography component="legend"> Write your Review </Typography>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleTextareaChange}
                className="border p-1"
                cols={50}
                rows={5}
              />
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <Button
                variant="contained"
                type="submit"
                color="error"
                size="medium"
              >
                Share
              </Button>
              <Button
                variant="outlined"
                onClick={handleClose}
                color="error"
                size="medium"
              >
                Close
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    );
  };

  const changeOnesearchParam = (key, value) => {
    let searchQuery = new URLSearchParams(document.location.search);
    let currentSearchParams = Object.fromEntries(searchQuery?.entries());
    setSearchParams({
      ...currentSearchParams,
      [key]: value,
    });
  };

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent={"space-between"}>
        <Typography py={3} component="div" fontWeight={600} variant="h4">
          Booking History
        </Typography>
        <SpeedDial
          ariaLabel="Sort By"
          title="Sort By"
          direction="left"
          sx={{
            button: { bgcolor: "white" },
            "button:hover": { bgcolor: "whitesmoke" },
          }}
          icon={<SwapVertIcon sx={{ color: "black" }} />}
        >
          <SpeedDialAction
            icon={<HourglassBottomIcon />}
            onClick={() => setSortBy("time-asc")}
            tooltipTitle={"Sort By Time Ascending"}
          />
          <SpeedDialAction
            icon={<HourglassTopIcon />}
            onClick={() => setSortBy("time-desc")}
            tooltipTitle={"Sort By Time Descending"}
          />
          <SpeedDialAction
            icon={<PriceChangeIcon />}
            onClick={() => setSortBy("price-asc")}
            tooltipTitle={"Sort By Price Ascending"}
          />
          <SpeedDialAction
            icon={<PriceChangeIcon />}
            onClick={() => setSortBy("price-desc")}
            tooltipTitle={"Sort By Price Descending"}
          />
        </SpeedDial>
      </Grid>
      <ReviewModal open={open} handleClose={handleClose} />
      {BookingData?.data ? (
        BookingData?.data?.data?.map((item, index) => {
          return (
            <Grid
              container
              spacing={0}
              my={1}
              key={index}
              sx={{ boxShadow: "10px 10px 34px 0px rgba(0,0,0,0.15)" }}
            >
              <Grid item xs={12} sm={12} lg={12}>
                <Card
                  sx={{
                    boxShadow:
                      "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                  }}
                  className="p-1"
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      gap: "5px",
                      flexDirection: isMobile ? "column" : "row",
                    }}
                  >
                    <Box
                      sx={{
                        maxHeight: isMobile ? "" : "200px",
                        maxWidth: "400px",
                        minHeight: "150px",
                      }}
                    >
                      <img
                        style={{
                          borderRadius: "5px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        src={item?.hotel?.[0]?.hotelCoverImg}
                        alt="hotel"
                      />
                    </Box>
                    <Box>
                      <Box
                        display={isMobile ? "" : "flex"}
                        px={1}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography variant="h5" fontWeight={800}>
                          {item?.hotel?.[0]?.hotelName}
                        </Typography>
                        <Box display={"flex"}>
                          <Rating
                            name="read-only"
                            value={item?.hotel?.[0]?.hotelRatings}
                            readOnly
                          />
                          <Typography component="div" variant="p">
                            {item?.hotel?.[0]?.reviews.length} (
                            {item?.hotel?.[0]?.reviews.length} reviews)
                          </Typography>
                        </Box>
                      </Box>
                      <Grid p={1} container>
                        <Grid item xs={12} lg={6}>
                          <div
                            className={`d-flex align-items-center border-bottom ${
                              isMobile && "justify-content-around"
                            }`}
                          >
                            <Typography
                              fontWeight={700}
                              variant={isMobile ? "caption" : "p"}
                            >
                              BOOKING ID :
                            </Typography>
                            <Typography
                              fontWeight={800}
                              sx={{ pl: 2.5 }}
                              variant={isMobile ? "caption" : "h6"}
                            >
                              {item?.bookingId}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <div
                            className={`d-flex align-items-center border-bottom ${
                              isMobile && "justify-content-around"
                            }`}
                          >
                            <Typography
                              fontWeight={700}
                              variant={isMobile ? "caption" : "p"}
                            >
                              BOOKING DATE & TIME :
                            </Typography>
                            <Typography
                              sx={{ pl: 2.5 }}
                              variant={isMobile ? "caption" : "h6"}
                            >
                              {moment(item?.dateOfBooking).format(
                                "DD-MM-YYYY, h:mm a"
                              )}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <div
                            className={`d-flex align-items-center border-bottom ${
                              isMobile && "justify-content-around"
                            }`}
                          >
                            <Typography
                              fontWeight={700}
                              variant={isMobile ? "caption" : "p"}
                            >
                              CHECK IN :
                            </Typography>
                            <Typography
                              sx={{ pl: 2.5 }}
                              variant={isMobile ? "caption" : "h6"}
                            >
                              {moment(item?.bookingDate?.checkIn).format(
                                "DD-MM-YYYY, h:mm a"
                              )}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <div
                            className={`d-flex align-items-center border-bottom ${
                              isMobile && "justify-content-around"
                            }`}
                          >
                            <Typography
                              fontWeight={700}
                              variant={isMobile ? "caption" : "p"}
                            >
                              CHECK OUT :
                            </Typography>
                            <Typography
                              sx={{ pl: 2.5 }}
                              variant={isMobile ? "caption" : "h6"}
                            >
                              {moment(item?.bookingDate?.checkOut).format(
                                "DD-MM-YYYY, h:mm a"
                              )}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <div
                            className={`d-flex align-items-center border-bottom ${
                              isMobile && "justify-content-around"
                            }`}
                          >
                            <Typography
                              fontWeight={700}
                              variant={isMobile ? "caption" : "p"}
                            >
                              NO OF DAYS & NIGHT :
                            </Typography>
                            <Typography
                              sx={{ pl: 2.5 }}
                              variant={isMobile ? "caption" : "h6"}
                            >
                              {totalLengthOfStay(
                                item?.bookingDate?.checkIn,
                                item?.bookingDate?.checkOut
                              )}{" "}
                              NIGHT
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <div
                            className={`d-flex align-items-center border-bottom ${
                              isMobile && "justify-content-around"
                            }`}
                          >
                            <Typography
                              fontWeight={700}
                              variant={isMobile ? "caption" : "p"}
                            >
                              NO OF GUEST :
                            </Typography>
                            <Typography
                              sx={{ pl: 2.5 }}
                              variant={isMobile ? "caption" : "h6"}
                            >
                              {item?.numberOfGuests?.adults} Guest,{" "}
                              {item?.numberOfRooms} Room
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <div
                            className={`d-flex align-items-center border-bottom ${
                              isMobile && "justify-content-around"
                            }`}
                          >
                            <Typography
                              fontWeight={700}
                              variant={isMobile ? "caption" : "p"}
                            >
                              TXN ID :
                            </Typography>
                            <Typography
                              sx={{ pl: 2.5 }}
                              variant={isMobile ? "caption" : "h6"}
                            >
                              NA
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <div
                            className={`d-flex align-items-center border-bottom ${
                              isMobile && "justify-content-around"
                            }`}
                          >
                            <Typography
                              fontWeight={700}
                              variant={isMobile ? "caption" : "p"}
                            >
                              BOOKING STATUS :
                            </Typography>
                            <Typography
                              sx={{ pl: 2.5 }}
                              variant={isMobile ? "caption" : "h6"}
                            >
                              {item?.bookingStatus}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <div
                            className={`d-flex align-items-center border-bottom ${
                              isMobile && "justify-content-around"
                            }`}
                          >
                            <Typography
                              fontWeight={700}
                              variant={isMobile ? "caption" : "p"}
                            >
                              PAYMENT METHOD :
                            </Typography>
                            <Typography
                              sx={{ pl: 2 }}
                              variant={isMobile ? "caption" : "h6"}
                            >
                              {item?.payment?.paymentType || "NA"}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <div
                            className={`d-flex align-items-center border-bottom ${
                              isMobile && "justify-content-around"
                            }`}
                          >
                            <Typography
                              fontWeight={700}
                              variant={isMobile ? "caption" : "p"}
                            >
                              PAID AMOUNT :
                            </Typography>
                            <Typography
                              sx={{ pl: 2 }}
                              color={"green"}
                              variant={isMobile ? "caption" : "h6"}
                            >
                              {item?.totalAmount || "NA"}
                            </Typography>
                          </div>
                        </Grid>
                        {item?.payment?.balanceAmt !== 0 && (
                          <Grid item xs={12} lg={6}>
                            <div
                              className={`d-flex align-items-center ${
                                isMobile &&
                                "justify-content-around border-bottom"
                              }`}
                            >
                              <Typography
                                fontWeight={700}
                                variant={isMobile ? "caption" : "p"}
                              >
                                BALANCE AMOUNT :
                              </Typography>
                              <Typography
                                sx={{ pl: 2 }}
                                color={"error"}
                                variant={isMobile ? "caption" : "h6"}
                              >
                                {item?.payment?.balanceAmt || "0"}
                              </Typography>
                            </div>
                          </Grid>
                        )}
                        <Grid item xs={12} lg={6}>
                          <div
                            className={`d-flex align-items-center ${
                              isMobile && "justify-content-around border-bottom"
                            }`}
                          >
                            <Typography
                              fontWeight={700}
                              variant={isMobile ? "caption" : "p"}
                            >
                              TOTAL AMOUNT :
                            </Typography>
                            <Typography
                              sx={{ pl: 2 }}
                              variant={isMobile ? "caption" : "h6"}
                            >
                              {item?.totalAmount || "NA"}
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Grid spacing={1} container>
                      <Grid item xs={12} lg={6} xl={6}>
                        <div>
                          {/* <Button color='error' href={`/searched-hotel/${item?.hotel?.[0]?._id}`} variant="contained" size="medium">View Hotel</Button> */}
                          <Button
                            onClick={AlertBox}
                            sx={{ ml: 1, borderRadius: "25px" }}
                            variant="outlined"
                            color="error"
                            size="medium"
                          >
                            Cancel Booking
                          </Button>
                        </div>
                      </Grid>
                      {isMobile ? null : (
                        <Grid
                          item
                          xs={12}
                          lg={6}
                          xl={6}
                          sx={{ display: "flex", justifyContent: "end" }}
                        >
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                              handleOpen(
                                item.hotel[0]._id,
                                item._id,
                                item.customer
                              )
                            }
                            size="medium"
                          >
                            Share review
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Grid container my={1}>
          <Grid item xs={12} lg={6} xl={4}>
            <Skeleton
              duration={1}
              style={{
                backgroundColor: "#ddd",
                height: "250px",
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6} xl={8}>
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
        </Grid>
      )}
    </Container>
  );
}
