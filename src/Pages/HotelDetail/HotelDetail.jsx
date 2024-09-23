import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import HotelCover from "./HotelCover";
import Detail from "./Detail";
import { API_URL } from "../../config";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Container, Grid, Rating, Typography } from "@mui/material";
import { isMobile } from "react-device-detect";
import MobileHeader from "../../Components/MobileComponent/MobileHeader";
import MobileFooter from "../../Components/MobileComponent/MobileFooter";
import PageLoader from "../../Utilis/PageLoader";
import { Helmet } from "react-helmet";
import { GetSingleHotelioReview } from "../../store/actions/HotelioReviewAction";

const HotelDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const GetHoteldata = async () => {
      try {
        setLoader(true);
        const response = await axios.get(API_URL + `/hotel/hoteldetails/${id}`);
        if (response.status === 200) {
          setData(response.data.data);
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };

    GetHoteldata();
  }, [id]);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetSingleHotelioReview(data?._id))
  }, [data])
  console.log('hotelid', data?._id)
  const HotelioReview = useSelector((state) => state.GetHotelioSingleReviewReducer?.data?.data[0]);
  console.log(HotelioReview)

  return (
    <>

      <Helmet>
        {/* Cononical tag:-  */}
        <link rel="canonical" href="https://www.hoteliorooms.com" />
      </Helmet>
      <PageLoader loading={loader} />
      {isMobile ? <MobileHeader /> : <Navbar />}
      <div
        style={{
          marginTop: isMobile ? null : "85px",
          background:
            "radial-gradient(circle, rgba(238,46,36,0.3086484593837535) 0%, rgba(148,187,233,1) 100%)",
          border: "2px solid #ee2e24",
        }}
      >
        <HotelCover data={data} />
        <Container>
          <Grid spacing={1} container padding={5}>
            <Grid item xs={12} lg={6} textAlign={"center"}>
              <Typography
                display={"block"}
                color={"#ee2e24"}
                fontWeight={700}
                variant={isMobile ? "p" : "h3"}
              >
                {data?.hotelName}
              </Typography>
              <div>
                <Button
                  size="large"
                  href="#BookNow"
                  color="error"
                  sx={{ my: 1 }}
                  variant="outlined"
                >
                  Book Now
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} lg={6} display={"flex"} alignItems={"center"}>
              {/* <div className={style.Imagebox}>
              
                <img src={data?.hotelCoverImg} alt="hotelImg" />
              </div> */}
              <div className="text-center">
                <Rating
                  name="read-only"
                  size="large"
                  color="#FF0000"
                  value={`${data?.hotelRatings}`}
                  readOnly
                />
                <Typography display={"block"} variant="subtitle2">
                  {data?.address}
                </Typography>
              </div>
              <div style={{ marginLeft: "5px" }} className="border">
                <Typography
                  display="block"
                  className="bg-success text-center"
                  variant="h5"
                >
                  {data?.hotelRatings}
                </Typography>
                <Typography
                  className="bg-secondary p-1 text-nowrap"
                  variant="caption"
                  display="block"
                >
                  {HotelioReview?.reviews.length} Rating
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container sx={isMobile ? { mb: 10 } : null}>
        <Detail data={data} HotelioReview={HotelioReview} />
      </Container>
      {isMobile ? <MobileFooter /> : <Footer />}
    </>
  );
};

export default HotelDetail;
