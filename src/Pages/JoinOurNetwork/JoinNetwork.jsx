import React from "react";
import BusinessCoverImg from "../../images/BusinessCoverImg.jpg";
import Button from "@mui/material/Button";

import style from "./Join.module.css";
import { Link } from "react-router-dom";
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
        {/* <img src={BusinessCoverImg} alt="coverImg" /> */}
        <div className={` ${style.topleft}`}>
          <h2 className="text-danger">Join Our Network</h2>
        </div>
        <div className={` w-100 ${style.bottomleft}`}>
          <h2>Focus on delivering exceptional value to your customers.</h2>
          <h2>Build strong relationships with customers and stakeholders.</h2>
          <Link to={"https://hotelio-dashboard-trickle.netlify.app/register"}>
            <Button
              variant="contained"
              color="error"
              size="large"
              fullWidth
              className="mt-3" 
            >
              Join Us
            </Button>
          </Link>
        </div>
      </div>
      {/* <div className="p-3"> 
        <Button
          variant="contained"
          color="error"
          size="large"
          fullWidth
          
        >
          Join Us
        </Button>
      </div> */}
    </div>
  );
};

export default JoinNetwork;
