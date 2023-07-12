import React from "react";
import BusinessCoverImg from "../../images/BusinessCoverImg.jpg";
import Button from "@mui/material/Button";
import style from "./Join.module.css";
import { Link } from "react-router-dom";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ApartmentIcon from "@mui/icons-material/Apartment";
import StarsIcon from "@mui/icons-material/Stars";
import DiscountIcon from "@mui/icons-material/Discount";

const JoinNetwork = () => {
  return (
    <div>
      <div
        style={{
          background: `linear-gradient(90deg, rgba(2,0,36,0.7064950980392157) 0%, rgba(255,255,255,0.7148984593837535) 100%), url(${BusinessCoverImg})`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <Container maxWidth="lg" className="min-vh-100">
          <Grid container spacing={2}>
            <Grid item lg={6} xs={12} className="mt-5">
              <Card className="bg-transparent">
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    <StarsIcon sx={{ fontSize: "4rem", color: "#076045" }} />
                  </Typography>
                  <h5
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="text-light"
                  >
                    Gets bookings Fast
                  </h5>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={6} xs={12} className="mt-5">
              <Card className="bg-transparent">
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    <StarsIcon sx={{ fontSize: "4rem", color: "#076045" }} />
                  </Typography>
                  <h5
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="text-light"
                  >
                    Gets bookings Fast
                  </h5>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={6} xs={12} className>
              <Card className="bg-transparent">
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    <StarsIcon sx={{ fontSize: "4rem", color: "#076045" }} />
                  </Typography>
                  <h5
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="text-light"
                  >
                    Gets bookings Fast
                  </h5>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={6} xs={12} className>
              <Card className="bg-transparent">
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    <StarsIcon sx={{ fontSize: "4rem", color: "#076045" }} />
                  </Typography>
                  <h5
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="text-light"
                  >
                    Gets bookings Fast
                  </h5>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <div className="text-center text-light mt-5">
            <h2>Build strong relationships with customers and stakeholders</h2>
            <h2>Focus on delivering exceptional value to your customers.</h2>
          </div>
          <Link to={"https://hotelio-dashboard-trickle.netlify.app/register"}>
            <div className="mt-5">
              <Button variant="contained" color="error" size="large" fullWidth>
                Join Us
              </Button>
            </div>
          </Link>
        </Container>
      </div>
    </div>
  );
};

export default JoinNetwork;
