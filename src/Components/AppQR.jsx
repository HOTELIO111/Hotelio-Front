import { Box, IconButton, Slide, Typography } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";
import AndroidIcon from "@mui/icons-material/Android";
import { useState } from "react";
import HotelioLogo from "../images/HotelioLogo.png";

export default function AppQR() {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Slide in={open} direction="left">
        <Box
          sx={{
            height: "350px",
            width: "250px",
            boxShadow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            bottom: "50px",
            right: "10px",
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "40px",
              boxShadow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
            //   border: "2px solid #f50057",
              paddingBottom: "20px",
            }}
          >
            <img
              src="/androidpng.png"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "top",
                position: "absolute",
                top: 0,
              }}
              alt=""
            />
            <img
              src={HotelioLogo}
              alt=""
              style={{
                width: "150px",
                marginTop: "20px",
              }}
            />
            <Box sx={{ position: "absolute", top: "-20px", right: "-20px" }}>
              <IconButton onClick={handleClose}>
                <CancelIcon
                  sx={{
                    color: "#FF533B",
                    border: "1px solid black",
                    borderRadius: "9999px",
                    backgroundColor: "white",
                  }}
                />
              </IconButton>
            </Box>
            <img
              src="/app qr.svg"
              alt="QR Code"
              style={{ width: "200px", height: "200px" }}
            />
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                backgroundColor: "#FF533B",
                color: "white",
                position: "absolute",
                width: "270px",
                bottom: "-12%",
                padding:"5px 0",
                fontWeight:"bold"
              }}
            >
              Scan to Download App <br /> and get exclusive offers
            </Typography>
          </Box>
        </Box>
      </Slide>
      <Slide in={!open} direction="left">
        <Box
          sx={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            zIndex: 10,
          }}
        >
          <IconButton onClick={() => setOpen(true)} size="medium">
            <AndroidIcon
              sx={{
                color: "#FF533B",
                fontSize: "100px",
                borderRadius: "50%",
                border: "2px solid #FF533B",
                backgroundColor: "white",
              }}
            />
          </IconButton>
        </Box>
      </Slide>
    </>
  );
}
