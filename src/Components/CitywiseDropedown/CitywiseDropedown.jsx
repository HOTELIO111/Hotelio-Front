import * as React from "react";
import Button from "@mui/material/Button";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useCollections } from "../../context/useStateManager";
import { convertDatesToUTC } from "../../Utilis/_fuctions";

const City = [
  "Chennai",
  "Hyderabad",
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Surat",
];

const cityCoordinates = {
  Chennai: { latitude: 13.0827, longitude: 80.2707 },
  Hyderabad: { latitude: 17.385, longitude: 78.4867 },
  Bangalore: { latitude: 12.9716, longitude: 77.5946 },
  Mumbai: { latitude: 19.076, longitude: 72.8777 },
  Delhi: { latitude: 28.6139, longitude: 77.209 },
  Pune: { latitude: 18.5204, longitude: 73.8567 },
  Kolkata: { latitude: 22.5726, longitude: 88.3639 },
  Ahmedabad: { latitude: 23.0225, longitude: 72.5714 },
  Surat: { latitude: 21.1702, longitude: 72.8311 },
};

export default function CitywiseDropdown() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");
  const { handleCityClick } = useCollections();

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {City?.map((item, index) => (
        <div key={index}>
          <Button
            variant="text"
            sx={{ color: selectedCity === item ? "primary.main" : "#fff" }}
            disableElevation
            onClick={() => handleCityClick(item)}
            endIcon={<ArrowRightTwoToneIcon />}
          >
            {item}
          </Button>
        </div>
      ))}
      <Button
        aria-haspopup="true"
        variant="text"
        sx={{ color: "#fff" }}
        disableElevation
        onClick={() => navigate("/allCities")}
        endIcon={<ArrowRightTwoToneIcon fontSize="small" />}
      >
        All Cities
      </Button>
    </div>
  );
}
