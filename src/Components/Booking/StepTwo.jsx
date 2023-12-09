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
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CoffeeIcon from "@mui/icons-material/Coffee";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import VapingRoomsIcon from "@mui/icons-material/VapingRooms";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Dates from "../date/Date";
import { Check } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/userAuthContext";
import moment from "moment/moment";
import BookingInfo from "./BookingInfo";
import { useBooking } from "../../context/useBooking";

const StepTwo = ({
  hotelData,
  roomData,
  formData,
  setFormData,
  handleFormData,
}) => {
  const {
    coupon,
    setCoupon,
    userBookingDetails,
    setUserBookingDetails,
    finalBookingData,
    setFinalBookingData,
    Gst,
    setGst,
  } = useBooking();
  const searchQuery = new URLSearchParams(document.location.search);

  const currentSearchParam = Object.fromEntries(searchQuery?.entries());
  const { currentUser } = useAuthContext();

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
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [changeSelection, setChangeSelection] = useState(false);
  const [selectedValue, setSelectedValue] = useState("myself");
  // const [show, setHide] = useState(false);
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    setUserBookingDetails((prevDetails) => ({
      ...prevDetails,
      dateOfBooking: new Date(Date.now()).toISOString(),
      customer: currentUser || prevDetails.customer,
      hotel: hotelData || prevDetails.hotel,
      room: roomData || prevDetails.room,
      guest: formData || prevDetails.guest,
      bookingDate: {
        checkIn: currentSearchParam.checkIn || prevDetails.bookingDate.checkIn,
        checkOut:
          currentSearchParam.checkOut || prevDetails.bookingDate.checkOut,
      },
      numberOfRooms: currentSearchParam.totalRooms || prevDetails.numberOfRooms,
      numberOfGuests: {
        adults:
          currentSearchParam.totalGuest || prevDetails.numberOfGuests.adults,
      },
    }));
  }, [currentUser, hotelData, roomData, formData, currentSearchParam]);

  useEffect(() => {
    if (selectedValue === "myself") {
      setFormData({
        name: currentUser?.name,
        email: currentUser?.email,
        mobileNo: currentUser?.mobileNo,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        mobileNo: "",
      });
    }
  }, [selectedValue]);

  return (
    <div className="container p-2">
      <Modal
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
      </Modal>
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
                <div>
                  <TextField
                    InputProps={{ className: "custom-input" }}
                    id="outlined-basic"
                    label="Full Name *"
                    margin="normal"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleFormData}
                    variant="outlined"
                  />

                  <br />

                  <TextField
                    InputProps={{ className: "custom-input" }}
                    id="outlined-basic"
                    label="Email *"
                    margin="normal"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleFormData}
                    variant="outlined"
                  />
                </div>
              ) : (
                <div>
                  <TextField
                    InputProps={{ className: "custom-input" }}
                    id="outlined-basic"
                    label="Full Name *"
                    margin="normal"
                    value={formData.name || ""}
                    name="name"
                    onChange={handleFormData}
                    variant="outlined"
                  />
                  <TextField
                    InputProps={{ className: "custom-input" }}
                    id="outlined-basic"
                    label="Email *"
                    margin="normal"
                    value={formData.email || ""}
                    name="email"
                    onChange={handleFormData}
                    sx={{ ml: 1 }}
                    variant="outlined"
                  />
                  <br />

                  <TextField
                    InputProps={{ className: "custom-input" }}
                    id="outlined-basic"
                    label="Contact No. *"
                    value={formData.mobileNo || ""}
                    name="mobileNo"
                    onChange={handleFormData}
                    margin="normal"
                    variant="outlined"
                  />
                </div>
              )}
              <Typography variant="caption" display="block">
                Confirmation email goes to this address
              </Typography>

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
          <Card style={{ border: "2px solid #ee2e24" }} className="w-100 my-2">
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
                Guests:{" "}
                {[...Array(roomData?.roomType?.personAllowed)]?.map(
                  (item, index) => (
                    <PersonIcon key={index} />
                  )
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <BookingInfo
          currentSearchParam={currentSearchParam}
          hotelData={hotelData}
          roomData={roomData}
        />
      </Grid>
    </div>
  );
};

export default StepTwo;

// const [selectedGuest, setselectedGuest] = useState(1);
// const [selectedRoom, setselectedRoom] = useState(1);

// const Guestincrement = () => {
//   if (selectedRoom) {
//     if (selectedGuest < selectedRoom * 4) {
//       setselectedGuest(selectedGuest + 1);
//     } else {
//       if (selectedGuest === 32) {
//         window.alert("Maximum guests and rooms reached");
//       } else {
//         setselectedGuest(selectedGuest + 1);
//         if (selectedGuest % 4 === 0) {
//           setselectedRoom(selectedRoom + 1);
//           window.alert("Selected room increased to " + (selectedRoom + 1));
//         }
//       }
//     }
//   }
// };

// const Guestdecrement = () => {
//   if (selectedGuest > 1) {
//     setselectedGuest(selectedGuest - 1);
//   }
// };

// const Roomincrement = () => {
//   if (selectedRoom < 8) {
//     setselectedRoom(selectedRoom + 1);
//   }
// };

// const Roomdecrement = () => {
//   if (selectedRoom > 1) {
//     setselectedRoom(selectedRoom - 1);
//   }
// };

// const handleChangeCredentials = () => {
//   const lastQuerySearched = sessionStorage.getItem("search");
//   const decoded = decodeURIComponent(lastQuerySearched);
//   // navigate(`/searchedhotels?${decoded}`);
//   navigate("/");
// };

// // GuestIncrement or decrement
// const RoomIncDec = (query) => {
//   if (query === "inc") {
//     setSearchParams({
//       totalRooms: parseInt(searchQuery.get("totalRooms")) + 1,
//     });
//   }
// };

// // Total LengthOFStay
// const totalLengthOfStay = (checkIn, checkOut) => {
//   const newCheckIn = new Date(checkIn);
//   const newCheckOut = new Date(checkOut);

//   // Calculate the time difference in milliseconds
//   const timeDifference = newCheckOut.getTime() - newCheckIn.getTime();

//   // Convert the time difference from milliseconds to days
//   const totalDays = timeDifference / (1000 * 3600 * 24);

//   // Return the total number of days
//   return totalDays;
// };

// const calculateDiscount = (originalAmount, discountPercent, parameter) => {
//   const discountAmount = (originalAmount * discountPercent) / 100;
//   const discountedAmount = originalAmount - discountAmount;

//   return {
//     originalAmount: originalAmount,
//     discountAmount: discountAmount,
//     discountedAmount: discountedAmount,
//   };
// };
