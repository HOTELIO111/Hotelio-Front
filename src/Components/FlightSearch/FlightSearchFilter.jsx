import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Stack,
  Radio,
  RadioGroup,
  Button,
  Divider,
} from "@mui/material";

const FlightFilter = ({ onApplyFilters }) => {
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [stops, setStops] = useState("");
  const [timeRange, setTimeRange] = useState("anytime");
  const [priceRange, setPriceRange] = useState([1000, 15000]);

  const airlines = ["Air India", "IndiGo", "SpiceJet", "Vistara", "GoAir"];

  const handleAirlineChange = (event) => {
    const value = event.target.name;
    setSelectedAirlines((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleStopsChange = (event) => {
    setStops(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      airlines: selectedAirlines,
      stops,
      timeRange,
      priceRange,
    });
  };

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Flight Filters
        </Typography>

        {/* Airlines Filter */}
        <Box mb={2}>
          <Typography variant="subtitle1" gutterBottom>
            Airlines
          </Typography>
          <FormGroup>
            {airlines.map((airline) => (
              <FormControlLabel
                key={airline}
                control={
                  <Checkbox
                    checked={selectedAirlines.includes(airline)}
                    onChange={handleAirlineChange}
                    name={airline}
                  />
                }
                label={airline}
              />
            ))}
          </FormGroup>
        </Box>

        <Divider />

        {/* Stops Filter */}
        <Box my={2}>
          <Typography variant="subtitle1" gutterBottom>
            Stops
          </Typography>
          <RadioGroup value={stops} onChange={handleStopsChange}>
            <FormControlLabel
              value="nonstop"
              control={<Radio />}
              label="Non-stop"
            />
            <FormControlLabel
              value="1stop"
              control={<Radio />}
              label="1 Stop"
            />
            <FormControlLabel
              value="2stops"
              control={<Radio />}
              label="2+ Stops"
            />
          </RadioGroup>
        </Box>

        <Divider />

        {/* Arrival/Departure Time Filter */}
        <Box my={2}>
          <Typography variant="subtitle1" gutterBottom>
            Arrival/Departure Time
          </Typography>
          <RadioGroup value={timeRange} onChange={handleTimeChange}>
            <FormControlLabel
              value="morning"
              control={<Radio />}
              label="Morning (5 AM - 12 PM)"
            />
            <FormControlLabel
              value="afternoon"
              control={<Radio />}
              label="Afternoon (12 PM - 5 PM)"
            />
            <FormControlLabel
              value="evening"
              control={<Radio />}
              label="Evening (5 PM - 9 PM)"
            />
            <FormControlLabel
              value="anytime"
              control={<Radio />}
              label="Anytime"
            />
          </RadioGroup>
        </Box>

        <Divider />

        {/* Price Range Filter */}
        <Box my={2}>
          <Typography variant="subtitle1" gutterBottom>
            Price Range (₹)
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={500}
            max={20000}
          />
        </Box>

        <Divider />

        {/* Apply Button */}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlightFilter;
