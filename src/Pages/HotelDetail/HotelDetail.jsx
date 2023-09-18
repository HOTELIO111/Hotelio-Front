import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import HotelCover from "./HotelCover";
import Detail from "./Detail";
import { API_URL } from "../../config";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Chip,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import style from "./Hotel.module.css";
import { isMobile } from "react-device-detect";
import MobileHeader from "../../Components/MobileComponent/MobileHeader";
import MobileFooter from "../../Components/MobileComponent/MobileFooter";

const HotelDetail = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  const GetHoteldata = async () => {
    try {
      const response = await axios.get(API_URL + `/hotel/hoteldetails/${id}`);
      if (response.status === 200) {
        setData(response.data.data);
        console.log(data);
      }
      console.log("API Response:", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetHoteldata();
  }, []);

  return (
    <>
      {isMobile ? <MobileHeader /> : <Navbar />}
      <div
        style={{
          marginTop: isMobile ? null : '85px',
          background: 'radial-gradient(circle, rgba(238,46,36,0.3086484593837535) 0%, rgba(148,187,233,1) 100%)',
          border: '2px solid #ee2e24'
        }}
      >
        <Container>
          <Grid spacing={1} container padding={5}>
            <Grid
              sx={{ display: "grid", placeItems: "center" }}
              item
              xs={12}
              lg={6}
            >
              <div className="text-center">
                <Typography color={"#ee2e24"} fontWeight={700} variant="h2">
                  {data?.hotelName}
                </Typography>
                <Rating
                  name="read-only"
                  size="large"
                  value={data?.hotelRatings}
                  readOnly
                />
                <div>
                  <Button
                    size="larger"
                    href="#BookNow"
                    color="error"
                    variant="outlined"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid
              sx={{ display: "grid", placeItems: "center" }}
              item
              xs={12}
              lg={6}
            >
              <div className={style.Imagebox}>
                <img src={data?.hotelCoverImg} alt="hotelImg" />
              </div>
            </Grid>
          </Grid>
        </Container>
        <HotelCover data={data} />
      </div>
      <Container sx={isMobile ? { mb: 10 } : null}>
        <Detail data={data} />
      </Container>
      {isMobile ? <MobileFooter /> : <Footer />}
    </>
  );
};

export default HotelDetail;
