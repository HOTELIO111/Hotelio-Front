import React, { useEffect, useState } from "react";
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

  return (
    <>
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
                <Typography display={"block"} variant="p">
                  {data?.address}
                </Typography>
              </div>
              <div className="border">
                <Typography className="bg-success text-center" variant="h5">
                  4.5
                </Typography>
                <Typography
                  className="bg-secondary text-nowrap p-1"
                  variant="p"
                >
                  14 Rating
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container sx={isMobile ? { mb: 10 } : null}>
        <Detail data={data} />
      </Container>
      {isMobile ? <MobileFooter /> : <Footer />}
    </>
  );
};

export default HotelDetail;
