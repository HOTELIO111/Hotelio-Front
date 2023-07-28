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
} from "@mui/material";
import style from "./HotelList.module.css";
import { useNavigate } from "react-router-dom";
import { WaitLoader } from "../../Components/Elements/WaitLoader";
import { API_URL } from "../../config";

const HotelList = ({ hotels, location }) => {
  const navigate = useNavigate();

  // State to keep track of the selected rating filter
  const [selectedRatingFilter, setSelectedRatingFilter] = React.useState("4");

  // Function to handle the change of the rating filter
  const handleRatingFilterChange = (event) => {
    setSelectedRatingFilter(event.target.value);
  };

  console.log(hotels)

  return hotels === null ? (
    <WaitLoader loading="true" />
  ) : (
    <Container>
      {/* First hotel card */}
      <Grid sx={{ margin: "10px 0px" }} container>
        <Grid item xs={12} lg={12} xl={12}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Here is your Searched Reasults of {location}</h4>
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
      {hotels.map((items, index) => (
        <Card fluid sx={{ p: 1, my: 1, borderRadius: 4 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={8} xl={8}>
              <div className="d-flex">
                <div className="d-xl-flex w-100">
                  <img
                    className="rounded"
                    style={{ height: "180px" }}
                    src={`${API_URL}/uploads/${items.hotelCoverImg}`}
                    alt="eyd"
                  />
                  <div className="px-3 pt-2">
                    <div className="d-flex align-items-center">
                      <h4>{items.hotelName}</h4>
                    </div>
                    <div className="d-flex align-items-center p-1">
                      <Rating
                        name="read-only"
                        value={items.hotelRatings}
                        readOnly
                      />
                      <p className="">{items.hotelType}</p>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Expedita, aliquid atque modi asperiores eius reprehenderit
                      quos beatae libero placeat iste dolore sequi ad molestiae
                      est. Ducimus dolorem quod commodi vero!
                    </p>
                    <div className="d-flex align-items-center">
                      <h6>
                        <b>{items?.hotelRatings || ''}</b> <span className="pl-1">233 (reviews)</span>
                      </h6>
                    </div>
                  </div>
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
                <div className={` ${style.mobflex}`}>
                  <div className={`p-2 ${style.BookingCardColor}`}>
                    <Button variant="contained" color="success">
                      Book Now
                    </Button>
                  </div>
                  <div className={`p-2 ${style.BookingCardColor}`}>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/searchedhotelname")}
                      color="primary"
                    >
                      View Hotel
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Card>
      ))}

      {/* Second hotel card
      <Card sx={{ p: 1, margin: "10px 0px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} xl={8}>
            <div className="d-flex">
              <div className="d-xl-flex w-100">
                <img
                  className="rounded img-fluid"
                  src="https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_225,q_auto,w_225/itemimages/90/79/907935_v5.jpeg"
                  alt="eyd"
                />
                <div className="px-3 pt-2">
                  <div className="d-flex align-items-center">
                    <h4>Hotel Casa Del</h4>
                  </div>
                  <div className="d-flex align-items-center p-1">
                    <Rating name="read-only" value={4} readOnly />
                    <p className="">Hotel</p>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Expedita, aliquid atque modi asperiores eius reprehenderit
                    quos beatae libero placeat iste dolore sequi ad molestiae
                    est. Ducimus dolorem quod commodi vero!
                  </p>
                  <div className="d-flex align-items-center">
                    <h6>
                      <b>7.5</b> <span className="pl-1">233 (reviews)</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} xl={4} className={`${style.SecondGridView}`}>
            <div>
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
              <div className={` ${style.mobflex}`}>
                <div className={`p-2 ${style.BookingCardColor}`}>
                  <Button variant="contained" color="success">
                    Book Now
                  </Button>
                </div>
                <div className={`p-2 ${style.BookingCardColor}`}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/searchedhotelname")}
                    color="primary"
                  >
                    View Hotel
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: 1, margin: "10px 0px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} xl={8}>
            <div className="d-flex">
              <div className="d-xl-flex w-100">
                <img
                  className="rounded img-fluid"
                  src="https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_225,q_auto,w_225/itemimages/90/79/907935_v5.jpeg"
                  alt="eyd"
                />
                <div className="px-3 pt-2">
                  <div className="d-flex align-items-center">
                    <h4>Hotel Casa Del</h4>
                  </div>
                  <div className="d-flex align-items-center p-1">
                    <Rating name="read-only" value={4} readOnly />
                    <p className="">Hotel</p>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Expedita, aliquid atque modi asperiores eius reprehenderit
                    quos beatae libero placeat iste dolore sequi ad molestiae
                    est. Ducimus dolorem quod commodi vero!
                  </p>
                  <div className="d-flex align-items-center">
                    <h6>
                      <b>7.5</b> <span className="pl-1">233 (reviews)</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} xl={4} className={`${style.SecondGridView}`}>
            <div>
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
              <div className={` ${style.mobflex}`}>
                <div className={`p-2 ${style.BookingCardColor}`}>
                  <Button variant="contained" color="success">
                    Book Now
                  </Button>
                </div>
                <div className={`p-2 ${style.BookingCardColor}`}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/searchedhotelname")}
                    color="primary"
                  >
                    View Hotel
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: 1, margin: "10px 0px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} xl={8}>
            <div className="d-flex">
              <div className="d-xl-flex w-100">
                <img
                  className="rounded img-fluid"
                  src="https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_225,q_auto,w_225/itemimages/90/79/907935_v5.jpeg"
                  alt="eyd"
                />
                <div className="px-3 pt-2">
                  <div className="d-flex align-items-center">
                    <h4>Hotel Casa Del</h4>
                  </div>
                  <div className="d-flex align-items-center p-1">
                    <Rating name="read-only" value={4} readOnly />
                    <p className="">Hotel</p>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Expedita, aliquid atque modi asperiores eius reprehenderit
                    quos beatae libero placeat iste dolore sequi ad molestiae
                    est. Ducimus dolorem quod commodi vero!
                  </p>
                  <div className="d-flex align-items-center">
                    <h6>
                      <b>7.5</b> <span className="pl-1">233 (reviews)</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} xl={4} className={`${style.SecondGridView}`}>
            <div>
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
              <div className={` ${style.mobflex}`}>
                <div className={`p-2 ${style.BookingCardColor}`}>
                  <Button variant="contained" color="success">
                    Book Now
                  </Button>
                </div>
                <div className={`p-2 ${style.BookingCardColor}`}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/searchedhotelname")}
                    color="primary"
                  >
                    View Hotel
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: 1, margin: "10px 0px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} xl={8}>
            <div className="d-flex">
              <div className="d-xl-flex w-100">
                <img
                  className="rounded img-fluid"
                  src="https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_225,q_auto,w_225/itemimages/90/79/907935_v5.jpeg"
                  alt="eyd"
                />
                <div className="px-3 pt-2">
                  <div className="d-flex align-items-center">
                    <h4>Hotel Casa Del</h4>
                  </div>
                  <div className="d-flex align-items-center p-1">
                    <Rating name="read-only" value={4} readOnly />
                    <p className="">Hotel</p>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Expedita, aliquid atque modi asperiores eius reprehenderit
                    quos beatae libero placeat iste dolore sequi ad molestiae
                    est. Ducimus dolorem quod commodi vero!
                  </p>
                  <div className="d-flex align-items-center">
                    <h6>
                      <b>7.5</b> <span className="pl-1">233 (reviews)</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} xl={4} className={`${style.SecondGridView}`}>
            <div>
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
              <div className={` ${style.mobflex}`}>
                <div className={`p-2 ${style.BookingCardColor}`}>
                  <Button variant="contained" color="success">
                    Book Now
                  </Button>
                </div>
                <div className={`p-2 ${style.BookingCardColor}`}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/searchedhotelname")}
                    color="primary"
                  >
                    View Hotel
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card> */}

      <div className="d-flex justify-content-center py-2">
        <Pagination count={5} />
      </div>
    </Container>
  );
};

export default HotelList;
