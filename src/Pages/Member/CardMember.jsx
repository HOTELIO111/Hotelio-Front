import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarsIcon from "@mui/icons-material/Stars";
import DiscountIcon from "@mui/icons-material/Discount";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ApartmentIcon from "@mui/icons-material/Apartment";
import style from "./Member.module.css";
import { Container, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Member from "../../images/MemberIcon.jpg";

const CardMember = () => {
  return (
    <Container maxWidth="lg" className="min-vh-100">
      <h2 className="text-center p-1">So many reasons become a member</h2>
      <Grid container spacing={2} mt={0}>
        <Grid item lg={6} xs={12}>
          <Card className={` ${style.Cardcolor}`}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <StarsIcon sx={{ fontSize: "4rem" }} />
              </Typography>
              <h5 gutterBottom variant="h5" component="div">
                Gets bookings Fast
              </h5>
              <Typography
                variant="body2"
                color="text.secondary"
                className="pt-2"
              >
                Our statistics show that the majority of new listings receive a
                booking within the first 3 months of joining our community.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Card className={` ${style.CardcolorOne}`}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <DiscountIcon sx={{ fontSize: "4rem" }} />
              </Typography>
              <h5 gutterBottom variant="h5" component="div">
                Stand out from the competition
              </h5>
              <Typography
                variant="body2"
                color="text.secondary"
                className="pt-2"
              >
                New listings get a special boost in visibility. Keep the
                spotlight on your property with a range of options to increase
                your exposure.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Card className={` ${style.CardcolorThree}`}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <ApartmentIcon sx={{ fontSize: "4rem" }} />
              </Typography>
              <h5 gutterBottom variant="h5" component="div">
                List any property type
              </h5>
              <Typography
                variant="body2"
                color="text.secondary"
                className="pt-2"
              >
                List a hotel, apartment, house, and so many other property types
                for free on Agoda.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Card className={` ${style.CardcolorTwo}`}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <PeopleAltIcon sx={{ fontSize: "4rem" }} />
              </Typography>
              <h5 gutterBottom variant="h5" component="div">
                Reach a global audience
              </h5>
              <Typography
                variant="body2"
                color="text.secondary"
                className="pt-2"
              >
                More than 9 million Agoda users from around the world will get
                to see your property.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Card className={` ${style.CardcolorFour}`}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <HeadsetMicIcon sx={{ fontSize: "4rem" }} />
              </Typography>
              <h5 gutterBottom variant="h5" component="div">
                Support
              </h5>
              <Typography
                variant="body2"
                color="text.secondary"
                className="pt-2"
              >
                Find support through online material, the support widget on YCS
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={0}>
        <Grid item lg={4} xs={12}>
          <div className="d-flex justify-content-center align-items-center gap-3 p-2">
            <div>
              <img
                src={Member}
                style={{ height: "100px", width: "100px" }}
                alt="icon"
                className="rounded-circle"
              />
            </div>
            <h2>Join</h2>
          </div>
        </Grid>
        <Grid item lg={4} xs={12}>
          <div className="d-flex justify-content-center align-items-center gap-3 p-2">
            <div>
              <img
                src={Member}
                style={{ height: "100px", width: "100px" }}
                alt="icon"
                className="rounded-circle"
              />
            </div>
            <h2>Book</h2>
          </div>
        </Grid>
        <Grid item lg={4} xs={12}>
          <div className="d-flex justify-content-center align-items-center gap-3 p-2">
            <div>
              <img
                src={Member}
                style={{ height: "100px", width: "100px" }}
                alt="icon"
                className="rounded-circle"
              />
            </div>
            <h2>Relax</h2>
          </div>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        fullWidth
        color="error"
        // style={{ position: "static" }}
      >
        Success
      </Button>
    </Container>
  );
};

export default CardMember;
