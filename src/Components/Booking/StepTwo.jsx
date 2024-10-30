import {
  Alert,
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Check } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/userAuthContext";
import BookingInfo from "./BookingInfo";
import { isMobile } from "react-device-detect";
import HotelOffer from "./HotelioOffer";
import { useDispatch, useSelector } from "react-redux";
import { useCollections } from "../../context/useStateManager";
import { GetBookingOffers } from "../../store/actions/OfferActions";
import { useBooking } from "../../context/useBooking";

const StepTwo = () => {
  const [searchParmas, setSearchParamas] = useSearchParams();
  const dispatch = useDispatch();
  const {
    formData,
    handleFormData,
    setFormData,
    addWalletOffer,
    applicableOffer,
  } = useCollections();
  const roomId = searchParmas.get("rid");
  const totalGuest = searchParmas.get("totalGuest");
  const { Gst } = useBooking();
  const { currentUser } = useAuthContext();
  const HotelData = useSelector((state) => state.GetSingleHotelReducers);
  const { data: hotelData } = HotelData || {};
  const roomData = hotelData?.rooms?.find((item) => item._id === roomId);
  const [selectedValue, setSelectedValue] = useState("myself");
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [searchBookingInfo, setSearchBookingInfo] = useState(
    JSON.parse(window.localStorage.getItem("search"))
  );

  const HandleBookingCreate = ({
    hotel,
    room,
    formdata,
    searchBookingInfo,
    customer,
    gst,
    discounts,
  }) => {
    const currentDate = new Date().toISOString();
    const bookingObject = {
      room: room?._id,
      hotel: hotel?._id,
      guest: formdata,
      bookingDate: {
        checkIn: searchBookingInfo?.checkIn,
        checkOut: searchBookingInfo?.checkOut,
      },
      amount: room?.price,
      dateOfBooking: currentDate,
      numberOfGuests: {
        adults: searchBookingInfo?.totalGuest,
      },
      numberOfRooms: searchBookingInfo?.totalRooms,
      bookingSource: "website",
      customer: customer?._id,
      additionalCharges: {
        gst: gst,
      },
      specialRequests: "*",
      discountInfo: discounts?.map((item) => ({
        name: item.code,
        amount: item.amount,
      })),
    };
    if (addWalletOffer) {
      bookingObject.discountInfo.push({
        name: "Wallet Offer",
        amount: 100,
      });
    }
    if (applicableOffer) {
      bookingObject.discountInfo.push({
        name: applicableOffer.code,
        amount: applicableOffer.codeDiscount.amount,
      });
    }
    // Store the bookingObject in sessionStorage
    return bookingObject;
  };

  useEffect(() => {
    const data = HandleBookingCreate({
      hotel: hotelData,
      room: roomData,
      customer: currentUser,
      searchBookingInfo: searchBookingInfo,
      gst: Gst,
      formdata: formData,
      discounts: [],
    });
    sessionStorage.setItem("bookingObject", JSON.stringify(data));
  }, [
    hotelData,
    roomData,
    currentUser,
    searchBookingInfo,
    Gst,
    formData.email,
    formData.name,
    formData.mobileNo,
    addWalletOffer,
    applicableOffer,
  ]);

  useEffect(() => {
    if (searchBookingInfo.hid && searchBookingInfo.rid) {
      dispatch(
        GetBookingOffers(
          searchBookingInfo.hid,
          searchBookingInfo.rid,
          "customer",
          roomData?.roomType?._id
        )
      );
    }
  }, [searchBookingInfo, roomData]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser?.name,
        email: currentUser?.email,
        mobileNo: currentUser?.mobileNo,
      });
    }
  }, [currentUser]);

  return (
    <div className="p-2">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
          <Card style={{ border: "2px solid #ee2e24" }} className="w-100">
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
                Enter your details
              </Typography>
              <Alert severity="success" variant="filled" color="info">
                {selectedValue === "myself"
                  ? "Almost done! Just fill the * required info"
                  : "Just fill guest details"}
              </Alert>

              {/* {selectedValue === "myself" ? ( */}
              <Grid container flexDirection={isMobile && "column"} spacing={1}>
                <Grid item sm={12} md={6} lg={4}>
                  <TextField
                    id="fullName"
                    label="Full Name"
                    margin="normal"
                    className="w-100"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleFormData}
                    variant="outlined"
                    required
                    helperText={
                      formData.name === undefined
                        ? `Please fill ${
                            selectedValue === "myself" ? "your" : "guest"
                          } name`
                        : ""
                    }
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  <TextField
                    id="email"
                    label="Email"
                    margin="normal"
                    className="w-100"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleFormData}
                    variant="outlined"
                    required
                    helperText={
                      formData.email === undefined
                        ? `Please fill ${
                            selectedValue === "myself" ? "your" : "guest"
                          } email`
                        : ""
                    }
                    autoComplete="email"
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  <TextField
                    id="contactNo"
                    label="Contact No."
                    className="w-100"
                    value={formData.mobileNo || ""}
                    name="mobileNo"
                    onChange={handleFormData}
                    margin="normal"
                    variant="outlined"
                    required
                    helperText={
                      formData.mobileNo === undefined
                        ? `Please fill ${
                            selectedValue === "myself" ? "your" : "guest"
                          } contact number`
                        : ""
                    }
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={8}>
                  <TextField
                    id="address"
                    label="Address"
                    margin="normal"
                    className="w-100"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleFormData}
                    variant="outlined"
                    required
                    helperText={
                      formData.address === undefined
                        ? `Please fill ${
                            selectedValue === "myself" ? "your" : "guest"
                          } address`
                        : ""
                    }
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  <TextField
                    id="city"
                    label="City"
                    margin="normal"
                    className="w-100"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleFormData}
                    variant="outlined"
                    required
                    helperText={
                      formData.city === undefined
                        ? `Please fill ${
                            selectedValue === "myself" ? "your" : "guest"
                          } city`
                        : ""
                    }
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  <TextField
                    id="state"
                    label="State"
                    margin="normal"
                    className="w-100"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleFormData}
                    variant="outlined"
                    required
                    helperText={
                      formData.state === undefined
                        ? `Please fill ${
                            selectedValue === "myself" ? "your" : "guest"
                          } state`
                        : ""
                    }
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  <TextField
                    id="zip"
                    label="Zip / Pin Code"
                    value={formData.zip || ""}
                    name="zip"
                    className="w-100"
                    onChange={handleFormData}
                    margin="normal"
                    variant="outlined"
                    required
                    helperText={
                      formData.zip === undefined
                        ? `Please fill ${
                            selectedValue === "myself" ? "your" : "guest"
                          } zip/pin code`
                        : ""
                    }
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  <TextField
                    id="country"
                    label="Country"
                    value={formData.country || ""}
                    name="country"
                    className="w-100"
                    onChange={handleFormData}
                    margin="normal"
                    variant="outlined"
                    required
                    helperText={
                      formData.country === undefined
                        ? `Please fill ${
                            selectedValue === "myself" ? "your" : "guest"
                          } country`
                        : ""
                    }
                  />
                </Grid>
              </Grid>
              {/* ) : (
                <Grid
                  container
                  flexDirection={isMobile && "column"}
                  spacing={1}
                >
                  <Grid item sm={12} md={6} lg={4}>
                    <TextField
                      InputProps={{ className: "custom-input" }}
                      id="outlined-basic"
                      label="Full Name"
                      margin="normal"
                      name="name"
                      value={"" || formData.name}
                      onChange={handleFormData}
                      variant="outlined"
                      required
                      helperText={
                        formData.name === undefined
                          ? "Please fill your name"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
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
                      error={formData.email === undefined}
                      helperText={
                        formData.email === undefined
                          ? "Please fill your email"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                    <TextField
                      InputProps={{ className: "custom-input" }}
                      id="outlined-basic"
                      label="Contact No."
                      value={formData.mobileNo || ""}
                      name="mobileNo"
                      onChange={handleFormData}
                      margin="normal"
                      variant="outlined"
                      required
                      helperText={
                        formData.mobileNo === undefined
                          ? "Please fill your contact number"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item sm={12} md={6} lg={8}>
                    <TextField
                      InputProps={{ className: "custom-input" }}
                      id="outlined-basic"
                      label="Address"
                      margin="normal"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleFormData}
                      variant="outlined"
                      className="w-100"
                      required
                      error={formData.address === undefined}
                      helperText={
                        formData.address === undefined
                          ? "Please fill your address"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                    <TextField
                      InputProps={{ className: "custom-input" }}
                      id="outlined-basic"
                      label="City"
                      margin="normal"
                      name="city"
                      value={formData.city || ""}
                      onChange={handleFormData}
                      variant="outlined"
                      required
                      helperText={
                        formData.city === undefined
                          ? "Please fill your city"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                    <TextField
                      InputProps={{ className: "custom-input" }}
                      id="outlined-basic"
                      label="State"
                      margin="normal"
                      name="state"
                      value={formData.state || ""}
                      onChange={handleFormData}
                      variant="outlined"
                      required
                      error={formData.state === undefined}
                      helperText={
                        formData.state === undefined
                          ? "Please fill your state"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                    <TextField
                      InputProps={{ className: "custom-input" }}
                      id="outlined-basic"
                      label="Zip / Pin Code"
                      value={formData.zip || ""}
                      name="zip"
                      onChange={handleFormData}
                      margin="normal"
                      variant="outlined"
                      required
                      error={formData.zip === undefined}
                      helperText={
                        formData.zip === undefined
                          ? "Please fill your zip/pin code"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                    <TextField
                      InputProps={{ className: "custom-input" }}
                      id="outlined-basic"
                      label="Country"
                      value={formData.country || ""}
                      name="country"
                      onChange={handleFormData}
                      margin="normal"
                      variant="outlined"
                      required
                      error={formData.country === undefined}
                      helperText={
                        formData.country === undefined
                          ? "Please fill your country"
                          : ""
                      }
                    />
                  </Grid>
                </Grid>
              )} */}

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

          <HotelOffer />

          <Card style={{ border: "2px solid #ee2e24" }} className="w-100">
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
                {roomData?.roomType?.title}
              </Typography>

              <Box className="d-flex flex-wrap gap-2">
                {roomData?.roomType?.amenties?.map((item, index) => (
                  <div key={index}>
                    <Check />
                    {item?.title}
                  </div>
                ))}

                {roomData?.roomType?.includeFacilities?.map((item, index) => (
                  <div key={index}>
                    <Check />
                    {item.title}
                  </div>
                ))}
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={2}
              >
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  sx={{
                    fontSize: 14,
                    fontWeight: 800,
                  }}
                  gutterBottom
                >
                  No Of Guests:{" "}
                  {Array.from({ length: totalGuest }).map((_, index) => (
                    <PersonIcon key={index} />
                  ))}
                </Typography>
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  sx={{
                    fontSize: 14,
                    fontWeight: 800,
                  }}
                  gutterBottom
                >
                  Guests Allowed:{" "}
                  {Array.from({
                    length: roomData?.roomType?.personAllowed,
                  }).map((_, index) => (
                    <PersonIcon key={index} />
                  ))}
                  / Per Room
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <BookingInfo />
      </Grid>
    </div>
  );
};

export default StepTwo;
