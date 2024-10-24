import {
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Rating,
  Select,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { totalLengthOfStay } from "../../Utilis/_fuctions";
import { useCollections } from "../../context/useStateManager";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const StepOne = () => {
  const [searchParmas, setSearchParamas] = useSearchParams();
  const HotelData = useSelector((state) => state.GetSingleHotelReducers);
  const roomId = searchParmas.get("rid");
  const { data: hotelData } = HotelData || {};
  const roomData = hotelData?.rooms?.find((item) => item._id === roomId);
  const { checkInCheckOut, setCheckInCheckOut } = useCollections();

  //   credentials
  const checkIn = searchParmas.get("checkIn");
  const checkOut = searchParmas.get("checkOut");
  const [totalRooms, setTotalRooms] = useState(searchParmas.get("totalRooms"));
  const [totalGuest, setTotalGuest] = useState(searchParmas.get("totalGuest"));
  const priceOfaRoom = roomData?.price;
  const [totalDays, setTotalDays] = useState(
    totalLengthOfStay(checkIn, checkOut)
  );

  dayjs.extend(customParseFormat);
  const { RangePicker } = DatePicker;

  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const changeOneSearchParam = (key, value) => {
    let searchQuery = new URLSearchParams(document.location.search);
    let currentSearchParams = Object.fromEntries(searchQuery?.entries());
    setSearchParamas({
      ...currentSearchParams,
      [key]: value,
    });
  };

  const dateFormat = "YYYY/MM/DD";

  return (
    <Grid item sm={12} md={6} lg={4} xl={4}>
      <Card style={{ border: "2px solid #ee2e24" }} className="w-100 mb-1">
        <CardContent sx={{ width: "70%" }}>
          {hotelData?.hotelRatings !== undefined && (
            <Typography
              display={"flex"}
              alignItems={"center"}
              variant="p"
              color="text.secondary"
              gutterBottom
            >
              Hotel{" "}
              <Rating
                name="read-only"
                value={hotelData.hotelRatings}
                readOnly
              />
            </Typography>
          )}

          <Typography
            sx={{ mb: 1.5 }}
            variant="h5"
            color="text-dark"
            fontWeight={700}
          >
            {hotelData?.hotelName} ({hotelData?.hotelType?.title})
          </Typography>
          <Typography variant="h6">{hotelData?.address}</Typography>
          <div className="d-flex align-items-center">
            <Chip
              label={`${hotelData?.hotelRatings}`}
              sx={{ mr: 1, my: 1, background: "#ee2e24", color: "#ffd700" }}
            />{" "}
            5 · 233 reviews
          </div>
          <Typography variant="body1">
            Swimming pool, Restaurant, WiFi, Parking
          </Typography>
        </CardContent>
        {/* add images of hotel here */}
        <div></div>
      </Card>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 10,
          marginTop: "10px",
        }}
      >
        {/* add images of room here */}
        <div style={{ gridColumn: "1/5" }}></div>

        <Card style={{ border: "2px solid #ee2e24", gridColumn: "5/13" }}>
          <CardContent>
            <Typography color="text-dark" variant="h6" fontWeight={700}>
              Your booking details
            </Typography>
            <Grid container justifyContent={"space-between"}>
              <Grid container mb={0} xs={6}>
                <Grid item xs={6} mt={2}>
                  <Typography variant="body1" display="block" fontWeight={600}>
                    Check-in :
                  </Typography>
                </Grid>
                <Grid item xs={6} mt={2}>
                  <Typography
                    variant="body1"
                    display="block"
                    marginLeft={"5px"}
                    fontWeight={600}
                  >
                    Check-out :
                  </Typography>
                </Grid>
                <RangePicker
                  bordered={false}
                  style={{ padding: "0", marginLeft: "-5px", width: "95%" }}
                  disabledDate={disabledDate}
                  suffixIcon={null}
                  format={dateFormat}
                  placeholder={["Check In", "Check Out"]}
                  value={checkInCheckOut}
                  required={true}
                  onChange={(value, newValue) => {
                    setTotalDays(totalLengthOfStay(newValue[0], newValue[1]));
                    changeOneSearchParam("checkIn", newValue[0]);
                    changeOneSearchParam("checkOut", newValue[1]);
                    setCheckInCheckOut(value);
                  }}
                />
                <Grid item xs={6}>
                  <Typography variant="subtitle2">
                    {dayjs(checkIn).format("hh:mm A")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" marginLeft={"5px"}>
                    {dayjs(checkOut).format("hh:mm A")}
                  </Typography>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Typography variant="body1" fontWeight={600}>
                    Total length of stay :
                  </Typography>
                  <Typography variant="subtitle1">
                    {totalDays}
                    &nbsp; night
                  </Typography>
                </Grid>
              </Grid>
              <Grid container xs={6}>
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "space-between",
                  }}
                  item
                  xs={12}
                >
                  <div>
                    <Typography color="text-dark" variant="h6" fontWeight={700}>
                      Your selected
                    </Typography>
                    <Typography variant="subtitle2">
                      Guests:{" "}
                      <FormControl
                        sx={{
                          maxWidth: "60px",
                          marginLeft: "10px",
                          marginTop: "-2px",
                        }}
                        variant="standard"
                        size="small"
                        fullWidth
                      >
                        <Select
                          value={totalGuest}
                          label="Guests"
                          onChange={(e) => {
                            changeOneSearchParam("totalGuest", e.target.value);
                            setTotalGuest(e.target.value);
                          }}
                        >
                          {Array.from({ length: totalRooms * 3 }).map(
                            (_, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {index + 1}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                      {totalGuest === totalRooms * 3 && (
                        <Tooltip
                          title="Maximum 3 guests per room Add more room to add more guests"
                          TransitionComponent={Zoom}
                          placement="top"
                          arrow
                        >
                          <InfoIcon
                            sx={{
                              marginLeft: "10px",
                              fontSize: "15px",
                              color: "white",
                              backgroundColor: "red",
                              borderRadius: "50%",
                            }}
                          />
                        </Tooltip>
                      )}
                    </Typography>
                    <Typography variant="subtitle2">
                      Rooms:{" "}
                      <FormControl
                        sx={{
                          maxWidth: "60px",
                          marginLeft: "10px",
                          marginTop: "-2px",
                        }}
                        variant="standard"
                        size="small"
                        fullWidth
                      >
                        <Select
                          value={totalRooms}
                          label="Rooms"
                          onChange={(e) => {
                            changeOneSearchParam("totalRooms", e.target.value);
                            setTotalRooms(e.target.value);
                          }}
                        >
                          {Array.from({ length: 7 }).map((_, index) => (
                            <MenuItem key={index} value={index + 1}>
                              {index + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Typography>
                    <Typography variant="subtitle2">
                      {totalRooms} {roomData?.roomType?.title} for {totalDays}{" "}
                      Days At ₹{priceOfaRoom} per night
                    </Typography>
                    <Typography variant="subtitle2">
                      {totalRooms} X {totalDays} X ₹{priceOfaRoom} = ₹{" "}
                      {totalRooms * totalDays * priceOfaRoom}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* <Card style={{ border: "2px solid #ee2e24" }}>
          <CardContent>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography color="error" variant="h6" fontWeight={700}>
                Your price summary
              </Typography>
              <Typography
                color="primary"
                fontWeight={500}
                sx={{ cursor: "pointer" }}
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
              <Typography variant="subtitle1" className="fw-bold ">
                Base Price ( {totalRooms} room X {totalDays} night )
              </Typography>
              <Typography variant="subtitle2" className="fw-bold ">
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
                <Typography variant="subtitle1" className="fw-bold">
                  Total Discount
                </Typography>
                <Typography variant="subtitle2" className="fw-bold">
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
                      <Typography
                        variant="subtitle1"
                        className="text-secondary"
                      >
                        &emsp;
                        {item?.type ? `-${item?.type}` : "No offer applied"}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className="text-secondary"
                      >
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
              <Typography variant="subtitle1" className="fw-bold">
                Price after Discount
              </Typography>
              <Typography variant="subtitle2" className="fw-bold">
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
                <Typography variant="subtitle1" className="fw-bold">
                  Taxes & Service Fees
                </Typography>
                <Typography variant="subtitle2" className="fw-bold">
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
                      <Typography
                        variant="subtitle1"
                        className="text-secondary"
                      >
                        &emsp;-{item?.type}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className="text-secondary"
                      >
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
              <Typography variant="subtitle1" className="fw-bold">
                Total Amount to be paid
              </Typography>
              <Typography variant="subtitle2" className="fw-bold">
                ₹ {Math.ceil(calculate?.totalAmountToPay)}
              </Typography>
            </div>
            <Typography variant="caption">
              You're getting a discount because, for a limited time, this
              property is offering reduced rates on some rooms that match your
              search.
            </Typography>
          </CardContent>
          <Box
            bgcolor={"#ebf3ff"}
            p={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontWeight={600}
              variant="h5"
              fontSize={18}
              className="text-danger"
            >
              Total Amount to be paid
            </Typography>
            <Typography textAlign={"center"} fontWeight={700} variant="h4">
              ₹&nbsp;{Math.ceil(calculate?.totalAmountToPay)}
            </Typography>
          </Box>
          <Box p={2}>
            <Typography variant="body1">
              Great Choice! You are saving
              <em className="text-danger">
                {" "}
                ₹&nbsp;{Math.ceil(calculate?.discountedAmount)}&nbsp;{" "}
              </em>
              with your booking
            </Typography>
          </Box>
        </Card> */}
      </div>
    </Grid>
  );
};

export default StepOne;
