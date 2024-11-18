import { SwapHoriz } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const format = "yyyy-MM-ddTHH:mm:ss";

export default function FlightSearchForm() {
  const [formData, setFormData] = useState({
    AdultCount: 1,
    ChildCount: 0,
    InfantCount: 0,
    JourneyType: 1,
    DirectFlight: false,
    Origin: "",
    Destination: "",
    FlightCabinClass: 1,
    PreferredDepartureTime: dayjs().format(format),
    PreferredArrivalTime: dayjs().format(format),
  });
  const disabledDateFrom = (current) => {
    return current && current < dayjs().endOf("day");
  };
  const disabledDateTo = (current) => {
    return current && current < dayjs().endOf("day");
  };
  return (
    <Container>
      <form>
        <Box display={"flex"} flexDirection={"row"} gap={2}>
          <RadioGroup sx={{ flexDirection: "row" }}>
            <FormControlLabel value="1" control={<Radio />} label="One Way" />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Round Trip"
            />
          </RadioGroup>
          <Typography variant="body1" mt={1} sx={{ fontWeight: 500 }}>
            Class:{" "}
          </Typography>
          <Select
            labelId="classLabel"
            id="class"
            label="class"
            size="small"
            variant="standard"
            defaultValue={"1"}
            sx={{ width: "100px" }}
          >
            <MenuItem value={"1"}>Any</MenuItem>
            <MenuItem value={"2"}>Economy</MenuItem>
            <MenuItem value={"4"}>Business</MenuItem>
            <MenuItem value={"6"}>First Class</MenuItem>
          </Select>
          <FormControlLabel
            value="1"
            control={<Checkbox />}
            label="Direct Flight"
          />
        </Box>
        <Box display={"flex"} flexDirection={"row"} gap={2}>
          <Card
            sx={{
              backgroundColor: "primary.main",
              p: 0.5,
              gap: 1,
              flexDirection: "row",
              display: "flex",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                bgcolor: "white",
                width: "25%",
                borderRadius: 1,
                padding: 1,
              }}
            >
              From
            </Typography>
            <IconButton
              sx={{
                bgcolor: "white",
                width: "3%",
                borderRadius: 1,
                padding: 1,
              }}
            >
              <SwapHoriz />
            </IconButton>
            <Typography
              sx={{
                bgcolor: "white",
                width: "25%",
                borderRadius: 1,
                padding: 1,
              }}
            >
              To
            </Typography>
            <Box
              sx={{
                bgcolor: "white",
                width: "20%",
                borderRadius: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DatePicker
                variant="borderless"
                disabledDate={disabledDateFrom}
              />
              <DatePicker variant="borderless" />
            </Box>
            <Typography
              sx={{
                bgcolor: "white",
                width: "17%",
                borderRadius: 1,
                padding: 1,
              }}
            >
              1 Person
            </Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "white", color: "primary.main" }}
            >
              Search
            </Button>
          </Card>
        </Box>
      </form>
    </Container>
  );
}
