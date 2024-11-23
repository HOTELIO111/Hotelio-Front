import { Box, IconButton, Slide, Typography } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";
import AndroidIcon from "@mui/icons-material/Android";
import { useState } from "react";

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
            height: "300px",
            width: "300px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            bottom: "10px",
            right: "10px",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "300px",
              width: "300px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
              border: "2px solid #f50057",
            }}
          >
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Scan to Download App <br /> and get exclusive offers
            </Typography>
            <Box sx={{ position: "absolute", top: "0", right: "0" }}>
              <IconButton onClick={handleClose}>
                <CancelIcon sx={{ color: "#FF533B" }} />
              </IconButton>
            </Box>
            <img
              src="/app qr.svg"
              alt="QR Code"
              style={{ width: "200px", height: "200px" }}
            />
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
