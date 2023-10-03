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
import { useNavigate } from "react-router-dom";
import { WaitLoader } from "../../Components/Elements/WaitLoader";
import { API_URL } from "../../config";
import NetworkWifi3BarRoundedIcon from "@mui/icons-material/NetworkWifi3BarRounded";
import HotelListBack from "../../images/HotelListBack.jpg";
import { useAuthContext } from "../../context/userAuthContext";

const HotelList = ({ hotels, location, loader }) => {
  const navigate = useNavigate();

  const { facilities, roomType, amenities } = useAuthContext();

  // State to keep track of the selected rating filter
  const [selectedRatingFilter, setSelectedRatingFilter] = React.useState("4");

  // Function to handle the change of the rating filter
  const handleRatingFilterChange = (event) => {
    setSelectedRatingFilter(event.target.value);
  };

  // Check the value in localStorage
  const loggedIn = localStorage.getItem('customer');

  const count = hotels?.length

  return hotels === null ? (
    <WaitLoader loading="true" />
  ) : (
    <Container>
      <WaitLoader loading={loader} />
      {/* First hotel card */}
      <Grid sx={{ margin: "10px 0px" }} container>
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
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h4>
              <b>Here is your Searched Reasults of {location}</b>
            </h4>
            <Select
              value={selectedRatingFilter}
              onChange={handleRatingFilterChange}
              sx={{ marginBottom: "10px", width: 200 }}
            >
              <MenuItem value={4}>Popularity</MenuItem>
              <MenuItem value={3}>Guest Rating</MenuItem>
              <MenuItem value={2}>Price Low to High</MenuItem>
              <MenuItem value={1}>Price High to Low</MenuItem>
            </Select>
          </div>
        </Grid>
      </Grid>
      {/* {count >= 0 ? null : <Typography variant="h4">We are currently working in this area</Typography>} */}
      {hotels.map((items) => (
        <>
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
                      {items.hotelName} ({items.hotelType})
                    </h4>
                  </div>
                  <p>
                    {items.locality}, {items.city}, {items.country}
                  </p>
                  <h6>{items.zipCode}</h6>
                  <div>
                    {amenities
                      ?.filter((x) => items.amenities?.includes(x._id))
                      ?.map((item, index) => (
                        <Chip
                          key={index}
                          label={item.amenity}
                          sx={{
                            mr: 1,
                            mb: 1,
                            background: "#6b0000",
                            color: "#ffd700",
                          }}
                        />
                      ))}
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
                            navigate(`/searchedhotel/${items._id}`);
                          } else {
                            navigate('/signin');
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
                        onClick={() => navigate(`/searchedhotel/${items._id}`)}
                      >
                        View Hotel
                      </Button>
                    </div>
                  </div>
                  <div
                    className={`align-items-center p-2 ${style.BookingCardColor} ${style.mobflex}`}
                  >
                    <h4>
                      ₹1345{" "}
                      <span>
                        <del>1645</del>
                      </span>
                    </h4>{" "}
                    <span className="text-danger">64% off</span>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Card>
          <hr style={{ color: "#6b0000", borderTop: "2px solid #6b0000" }} />
        </>
      ))}
      <div className="d-flex justify-content-center py-2">
        <Pagination count={count} />
      </div>
    </Container>
  );
};

export default HotelList;
