import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Dates from "../date/Date";
import { Check } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/userAuthContext";
import BookingInfo from "./BookingInfo";

import HotelDetail from "./HotelioOffer";
import { useDispatch, useSelector } from "react-redux";
import { useCollections } from "../../context/useStateManager";
import { GetBookingOffers } from "../../store/actions/OfferActions";
import { GetBookingRegister } from "../../store/actions/BookingAction";
import { useBooking } from "../../context/useBooking";

const StepTwo = () => {

  const [searchParmas, setSearchParamas] = useSearchParams()
  const dispatch = useDispatch()
  const { formData, handleFormData, setFormData } = useCollections();
  const roomId = searchParmas.get('rid')
  const { Gst, coupon } = useBooking()
  const { currentUser } = useAuthContext();
  const HotelData = useSelector((state) => state.GetSingleHotelReducers);
  const { data: hotelData } = HotelData || {};
  const roomData = hotelData?.rooms?.find((item) => item._id === roomId);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 2,
    textAlign: "center",
    borderRadius: "8px",
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [selectedValue, setSelectedValue] = useState("myself");
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [searchBookingInfo, setSearchBookingInfo] = useState(JSON.parse(window.localStorage.getItem('search')))


  const HandleBookingCreate = ({ hotel, room, formdata, searchBookingInfo, customer, gst, discounts }) => {
    const currentDate = new Date().toISOString();

    const bookingObject = {
      room: room?._id,
      hotel: hotel?._id,
      guest: formdata,
      bookingDate: {
        checkIn: searchBookingInfo?.checkIn,
        checkOut: searchBookingInfo?.checkOut
      },
      amount: room?.price,
      dateOfBooking: currentDate,
      numberOfGuests: {
        adults: searchBookingInfo?.totalGuest
      },
      numberOfRooms: searchBookingInfo?.totalRooms,
      bookingSource: "website",
      customer: customer?._id,
      additionalCharges: {
        gst: gst,
      },
      specialRequests: "*",
      discountInfo: discounts?.map((item) => ({ name: item.code, amount: item.amount }))
    };
    // Store the bookingObject in sessionStorage
    return bookingObject
  };

  useEffect(() => {
    const data = HandleBookingCreate({
      hotel: hotelData,
      room: roomData,
      customer: currentUser,
      searchBookingInfo: searchBookingInfo,
      gst: Gst,
      formdata: formData,
      discounts: [{ code: "WELCOME200", amount: 200 }],
    });
    sessionStorage.setItem('bookingObject', JSON.stringify(data));
  }, [hotelData, roomData, currentUser, searchBookingInfo, Gst, formData.email, formData.name, formData.mobileNo]);


  useEffect(() => {
    if (searchBookingInfo.hid && searchBookingInfo.rid) {
      dispatch(GetBookingOffers(searchBookingInfo.hid, searchBookingInfo.rid, "customer"))
    }
  }, [searchBookingInfo])


  useEffect(() => {
    if (currentUser) {
      setFormData({ name: currentUser?.name, email: currentUser.email, mobileNo: currentUser?.mobileNo })
    }
  }, [currentUser])


  return (
    <div className="container p-2">
      {/* <Modal
        sx={{ zIndex: "1000" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Dates />
          <div className="my-2 d-flex justify-content-between">
            <Button variant="contained">Submit</Button>
            <Button sx={{ ml: 1 }} onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </div>
        </Box>
      </Modal> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
          <Card style={{ border: "2px solid #ee2e24" }} className="w-100">
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
                Enter your details
              </Typography>
              <Alert severity="success" color="info">
                {selectedValue === "myself"
                  ? "Almost done! Just fill the * required info"
                  : "Just fill guest details"}
              </Alert>

              {selectedValue === "myself" ? (
                <div style={{ display: 'flex', gap: '5px' }}>
                  <TextField
                    InputProps={{ className: "custom-input" }}
                    id="outlined-basic"
                    label="Full Name"
                    margin="normal"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleFormData}
                    variant="outlined"
                    required
                    helperText={formData.name === undefined ? 'Please fill your email' : ''}
                  />

                  <TextField
                    InputProps={{ className: "custom-input" }}
                    id="outlined-basic"
                    label="Email"
                    margin="normal"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleFormData}
                    variant="outlined"
                    required
                    error
                    helperText={formData.email === undefined ? 'Please fill your email' : ''}
                  />
                  <TextField
                    InputProps={{ className: "custom-input" }}
                    id="outlined-basic"
                    label="Contact No."
                    value={formData.mobileNo || ''}
                    name="mobileNo"
                    onChange={handleFormData}
                    margin="normal"
                    variant="outlined"
                    required
                    helperText={formData.mobileNo === undefined ? 'Please fill your email' : ''}
                  />

                  {/* <Button onClick={() => HandleBookingCreate({ hotel: hotelData, room: roomData, searchBookingInfo: searchBookingInfo, formdata: formData, discounts: [{ name: "WELCOME200", amount: 200 }], customer: currentUser, gst: Gst })}>test</Button> */}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '5px' }}>
                  <TextField
                    InputProps={{ className: "custom-input" }}
                    id="outlined-basic"
                    label="Full Name"
                    margin="normal"
                    value={formData.name || ""}
                    name="name"
                    onChange={handleFormData}
                    variant="outlined"
                    required
                  />
                  <TextField
                    InputProps={{ className: "custom-input" }}
                    id="outlined-basic"
                    label="Email"
                    margin="normal"
                    value={formData.email || ""}
                    name="email"
                    onChange={handleFormData}
                    sx={{ ml: 1 }}
                    variant="outlined"
                    required
                  />
                  <br />

                  <TextField
                    InputProps={{ className: "custom-input" }}
                    id="outlined-basic"
                    label="Contact No."
                    value={formData.mobileNo || ''}
                    name="mobileNo"
                    onChange={handleFormData}
                    margin="normal"
                    variant="outlined"
                    required
                  />
                </div>
              )}

              <Typography
                sx={{ mt: 1.5, mb: 1.5 }}
                color="text-dark"
                fontWeight={700}
              >
                Who are you booking for?
              </Typography>

              <FormControl sx={{ ml: 1.5 }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedValue}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="myself"
                    control={<Radio sx={{ p: 0, pr: 1 }} />}
                    label="Myself"
                  />
                  <FormControlLabel
                    value="someoneElse"
                    control={<Radio sx={{ p: 0, pr: 1 }} />}
                    label="Someone else"
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>

          <HotelDetail />

          <Card style={{ border: "2px solid #ee2e24" }} className="w-100">
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
                {roomData?.roomType?.title}
              </Typography>

              <Box className="d-flex flex-wrap gap-2">
                {roomData?.roomType?.amenties?.map((item, index) => (
                  <div>
                    <Check />
                    {item?.title}
                  </div>
                ))}
                {roomData?.roomType?.includeFacilities?.map((item, index) => (
                  <div>
                    <Check />
                    {item.title}
                  </div>
                ))}
              </Box>
              <Typography
                display={"flex"}
                alignItems={"center"}
                sx={{
                  fontSize: 14,
                  fontWeight: 800,
                  pl: 1.5,
                  marginTop: "1rem",
                }}
                gutterBottom
              >
                Guests Allowed:{" "}
                {[...Array(roomData?.roomType?.personAllowed)]?.map(
                  (item, index) => (
                    <PersonIcon key={index} />
                  )
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <BookingInfo />
      </Grid>
    </div>
  );
};

export default StepTwo;