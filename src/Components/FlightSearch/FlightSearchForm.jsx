import {
  AddCircle,
  Boy,
  ChildCare,
  FlightLand,
  FlightTakeoff,
  Man,
  Person,
  RemoveCircle,
  SwapHoriz,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputBase,
  MenuItem,
  Popover,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker, Image } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { filterAirports } from "../../Utilis/_fuctions";
import { useNavigate } from "react-router-dom";

const format = "YYYY-MM-DDTHH:mm:ss";

export default function FlightSearchForm() {
  const [formData, setFormData] = useState({
    AdultCount: 1,
    ChildCount: 0,
    InfantCount: 0,
    JourneyType: "1",
    DirectFlight: false,
    Origin: "",
    Destination: "",
    FlightCabinClass: "1",
    PreferredDepartureTime: "",
    PreferredReturnTime: "",
    SpecialFares: "",
  });
  const [airports, setAirports] = useState([]);
  const [fromAnchorEl, setFromAnchorEl] = useState(null);
  const [toAnchorEl, setToAnchorEl] = useState(null);
  const [passengerAnchorEl, setPassengerAnchorEl] = useState(null);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const navigate = useNavigate();

  const disabledDateFrom = (current) => {
    return current && current < dayjs().endOf("day");
  };
  const disabledDateTo = (current) => {
    return current <= dayjs(formData.PreferredDepartureTime).endOf("day");
  };

  const fromOnClose = () => {
    setFromAnchorEl(null);
  };

  const toOnClose = () => {
    setToAnchorEl(null);
  };

  const passengerOnClose = () => {
    setPassengerAnchorEl(null);
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value;
    const filteredAirports = filterAirports(searchValue);
    setAirports(filteredAirports);
  };

  const switchFromTo = () => {
    const temp = formData.Origin;
    setFormData({
      ...formData,
      Origin: formData.Destination,
      Destination: temp,
    });
    setFromInput(
      `${formData.Destination.airport_name} (${formData.Destination.airport_code})`
    );
    setToInput(
      `${formData.Origin.airport_name} (${formData.Origin.airport_code})`
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    navigate("/flight/search");
  };

  return (
    <Container>
      <form onSubmit={handleSearch}>
        <Stack spacing={2} alignItems={"center"}>
          <Box display={"flex"} flexDirection={"row"} gap={2}>
            <RadioGroup
              sx={{ flexDirection: "row" }}
              value={formData.JourneyType}
              onChange={(e) => {
                setFormData({ ...formData, JourneyType: e.target.value });
              }}
            >
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
              value={formData.FlightCabinClass}
              onChange={(e) => {
                setFormData({ ...formData, FlightCabinClass: e.target.value });
              }}
              sx={{ width: "100px" }}
            >
              <MenuItem value={"1"}>Any</MenuItem>
              <MenuItem value={"2"}>Economy</MenuItem>
              <MenuItem value={"4"}>Business</MenuItem>
              <MenuItem value={"6"}>First Class</MenuItem>
            </Select>
            <Typography variant="body1" mt={1} sx={{ fontWeight: 500 }}>
              Class:{" "}
            </Typography>
            <Select
              labelId="classLabel"
              id="class"
              label="class"
              size="small"
              variant="standard"
              value={formData.FlightCabinClass}
              onChange={(e) => {
                setFormData({ ...formData, FlightCabinClass: e.target.value });
              }}
              sx={{ width: "100px" }}
            >
              <MenuItem value={"1"}>Any</MenuItem>
              <MenuItem value={"2"}>Economy</MenuItem>
              <MenuItem value={"4"}>Business</MenuItem>
              <MenuItem value={"6"}>First Class</MenuItem>
            </Select>
            <FormControlLabel
              checked={formData.DirectFlight}
              control={<Checkbox />}
              onChange={(e) => {
                setFormData({ ...formData, DirectFlight: e.target.checked });
              }}
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
              <InputBase
                placeholder="From"
                size="small"
                onChange={(e) => {
                  handleFilter(e);
                  setFromInput(e.target.value);
                  setFromAnchorEl(e.currentTarget.parentElement);
                }}
                value={fromInput}
                startAdornment={
                  <InputAdornment position="start">
                    <FlightTakeoff color="primary" />
                  </InputAdornment>
                }
                sx={{
                  bgcolor: "white",
                  width: "25%",
                  borderRadius: 1,
                  padding: 1,
                }}
              />
              <Popover
                id="from-input"
                anchorEl={fromAnchorEl}
                open={Boolean(fromAnchorEl)}
                onClose={fromOnClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                slotProps={{
                  paper: {
                    sx: {
                      width: "280px",
                    },
                  },
                }}
              >
                <Box padding={1}>
                  <InputBase
                    placeholder="From"
                    size="small"
                    onChange={(e) => {
                      handleFilter(e);
                      setFromInput(e.target.value);
                    }}
                    autoFocus
                    fullWidth
                    value={fromInput}
                    startAdornment={
                      <InputAdornment position="start">
                        <FlightTakeoff color="primary" />
                      </InputAdornment>
                    }
                    sx={{
                      bgcolor: "white",
                      borderRadius: 1,
                      padding: 1,
                      border: "2px solid",
                      borderColor: "primary.main",
                    }}
                  />
                </Box>
                {airports.map((airport) => (
                  <MenuItem
                    onClick={() => {
                      setFormData({ ...formData, Origin: airport });
                      setFromInput(
                        `${airport.airport_name} (${airport.airport_code})`
                      );
                      fromOnClose();
                    }}
                  >
                    <Box
                      display="flex"
                      width={"100%"}
                      justifyContent={"space-between"}
                    >
                      <Stack direction="column">
                        <Typography
                          sx={{ textWrap: "wrap" }}
                        >{`${airport.airport_name} (${airport.airport_code})`}</Typography>
                        <Typography sx={{ textWrap: "wrap" }} variant="caption">
                          {`${airport.airport_city_name}, ${airport.airport_country_name}`}
                        </Typography>
                      </Stack>
                      <Image
                        src={`https://flagcdn.com/192x144/${airport.airport_country_code.toLowerCase()}.png`}
                        alt={airport.airport_country_code}
                        width={30}
                      />
                    </Box>
                  </MenuItem>
                ))}
                {airports.length === 0 && (
                  <MenuItem sx={{ width: "280px" }}>
                    <Typography>No results found</Typography>
                  </MenuItem>
                )}
              </Popover>
              <IconButton
                onClick={switchFromTo}
                sx={{
                  bgcolor: "white",
                  width: "3%",
                  borderRadius: 1,
                  padding: 1,
                }}
              >
                <SwapHoriz />
              </IconButton>
              <InputBase
                placeholder="To"
                size="small"
                onChange={(e) => {
                  handleFilter(e);
                  setToInput(e.target.value);
                  setToAnchorEl(e.currentTarget.parentElement);
                }}
                value={toInput}
                startAdornment={
                  <InputAdornment position="start">
                    <FlightLand color="primary" />
                  </InputAdornment>
                }
                sx={{
                  bgcolor: "white",
                  width: "25%",
                  borderRadius: 1,
                  padding: 1,
                }}
              />
              <Popover
                id="to-input"
                anchorEl={toAnchorEl}
                open={Boolean(toAnchorEl)}
                onClose={toOnClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                slotProps={{
                  paper: {
                    sx: {
                      width: "280px",
                    },
                  },
                }}
              >
                <Box padding={1}>
                  <InputBase
                    placeholder="To"
                    size="small"
                    onChange={(e) => {
                      handleFilter(e);
                      setToInput(e.target.value);
                    }}
                    autoFocus
                    fullWidth
                    value={toInput}
                    startAdornment={
                      <InputAdornment position="start">
                        <FlightLand color="primary" />
                      </InputAdornment>
                    }
                    sx={{
                      bgcolor: "white",
                      borderRadius: 1,
                      padding: 1,
                      border: "2px solid",
                      borderColor: "primary.main",
                    }}
                  />
                </Box>
                {airports.map((airport) => (
                  <MenuItem
                    onClick={() => {
                      setFormData({ ...formData, Destination: airport });
                      setToInput(
                        `${airport.airport_name} (${airport.airport_code})`
                      );
                      toOnClose();
                    }}
                  >
                    <Box
                      display="flex"
                      width={"100%"}
                      justifyContent={"space-between"}
                    >
                      <Stack direction="column">
                        <Typography
                          sx={{ textWrap: "wrap" }}
                        >{`${airport.airport_name} (${airport.airport_code})`}</Typography>
                        <Typography sx={{ textWrap: "wrap" }} variant="caption">
                          {`${airport.airport_city_name}, ${airport.airport_country_name}`}
                        </Typography>
                      </Stack>
                      <Image
                        src={`https://flagcdn.com/192x144/${airport.airport_country_code.toLowerCase()}.png`}
                        alt={airport.airport_country_code}
                        width={30}
                      />
                    </Box>
                  </MenuItem>
                ))}
                {airports.length === 0 && (
                  <MenuItem sx={{ width: "280px" }}>
                    <Typography>No results found</Typography>
                  </MenuItem>
                )}
              </Popover>
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
                  onChange={(date, dateString) => {
                    setFormData({
                      ...formData,
                      PreferredDepartureTime: dayjs(dateString).format(format),
                    });
                  }}
                />
                {formData.JourneyType === "2" && (
                  <DatePicker
                    variant="borderless"
                    disabledDate={disabledDateTo}
                    onChange={(date, dateString) => {
                      setFormData({
                        ...formData,
                        PreferredReturnTime: dayjs(dateString).format(format),
                      });
                    }}
                  />
                )}
              </Box>
              <InputBase
                size="small"
                readOnly
                onClick={(e) => {
                  setPassengerAnchorEl(e.currentTarget);
                }}
                value={`${formData.AdultCount} Adult ${
                  formData.ChildCount > 0
                    ? `, ${formData.ChildCount} Child`
                    : ""
                } ${
                  formData.InfantCount > 0
                    ? `, ${formData.InfantCount} Infant`
                    : ""
                }`}
                startAdornment={
                  <InputAdornment position="start">
                    <Person color="primary" />
                  </InputAdornment>
                }
                sx={{
                  bgcolor: "white",
                  width: "17%",
                  borderRadius: 1,
                  padding: 1,
                }}
              />
              <Popover
                id="passenger-input"
                anchorEl={passengerAnchorEl}
                open={Boolean(passengerAnchorEl)}
                onClose={passengerOnClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box padding={2}>
                  <Stack direction="column" spacing={2}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Man color="primary" />
                        <Typography variant="body1" color={"primary"}>
                          Adults
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          onClick={() => {
                            if (formData.AdultCount > 1) {
                              setFormData({
                                ...formData,
                                AdultCount: formData.AdultCount - 1,
                              });
                            }
                          }}
                        >
                          <RemoveCircle
                            color={formData.AdultCount > 1 ? "primary" : ""}
                          />
                        </IconButton>
                        <Typography variant="body1">
                          {formData.AdultCount}
                        </Typography>
                        <IconButton
                          onClick={() => {
                            if (formData.AdultCount < 9)
                              setFormData({
                                ...formData,
                                AdultCount: formData.AdultCount + 1,
                              });
                          }}
                        >
                          <AddCircle
                            color={formData.AdultCount < 9 ? "primary" : ""}
                          />
                        </IconButton>
                      </Box>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Boy color="primary" />
                        <Typography variant="body1" color={"primary"}>
                          Child
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          onClick={() => {
                            if (formData.ChildCount > 0) {
                              setFormData({
                                ...formData,
                                ChildCount: formData.ChildCount - 1,
                              });
                            }
                          }}
                        >
                          <RemoveCircle
                            color={formData.ChildCount > 0 ? "primary" : ""}
                          />
                        </IconButton>
                        <Typography variant="body1">
                          {formData.ChildCount}
                        </Typography>
                        <IconButton
                          onClick={() => {
                            if (formData.ChildCount < 9)
                              setFormData({
                                ...formData,
                                ChildCount: formData.ChildCount + 1,
                              });
                          }}
                        >
                          <AddCircle
                            color={formData.ChildCount < 9 ? "primary" : ""}
                          />
                        </IconButton>
                      </Box>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <ChildCare color="primary" />
                        <Typography variant="body1" color={"primary"}>
                          Infant
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          onClick={() => {
                            if (formData.InfantCount > 0) {
                              setFormData({
                                ...formData,
                                InfantCount: formData.InfantCount - 1,
                              });
                            }
                          }}
                        >
                          <RemoveCircle
                            color={formData.InfantCount > 0 ? "primary" : ""}
                          />
                        </IconButton>
                        <Typography variant="body1">
                          {formData.InfantCount}
                        </Typography>
                        <IconButton
                          onClick={() => {
                            if (formData.InfantCount < 9)
                              setFormData({
                                ...formData,
                                InfantCount: formData.InfantCount + 1,
                              });
                          }}
                        >
                          <AddCircle
                            color={formData.InfantCount < 9 ? "primary" : ""}
                          />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              </Popover>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "white", color: "primary.main" }}
              >
                Search
              </Button>
            </Card>
          </Box>
          <Box
            sx={{
              width: "max-content",
              mx: "auto",
              display: "flex",
              borderRadius: 1,
            }}
          >
            <CardContent>
              <Typography noWrap color={"primary.main"}>
                Special Fares
              </Typography>
            </CardContent>
            <RadioGroup
              value={formData.SpecialFares}
              onChange={(e) => {
                setFormData({ ...formData, SpecialFares: e.target.value });
              }}
              sx={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-around",
              }}
            >
              <FormControlLabel
                control={<Radio />}
                label={<Typography>Student</Typography>}
                value={"Student"}
                sx={{
                  border: "1px solid #e0e0e0",
                  paddingRight: 2,
                  borderRadius: 1,
                  "&:has(:checked)": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                    color: "primary.main",
                  },
                  "&:has(:checked) p": {
                    color: "primary.main",
                  },
                }}
              />
              <FormControlLabel
                control={<Radio />}
                label={<Typography>Senior Citizen</Typography>}
                value={"Senior Citizen"}
                sx={{
                  border: "1px solid #e0e0e0",
                  paddingRight: 2,
                  borderRadius: 1,
                  "&:has(:checked)": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                    color: "primary.main",
                  },
                  "&:has(:checked) p": {
                    color: "primary.main",
                  },
                }}
              />
              <FormControlLabel
                control={<Radio />}
                label={<Typography>Armed Forces</Typography>}
                value={"Armed Forces"}
                sx={{
                  border: "1px solid #e0e0e0",
                  paddingRight: 2,
                  borderRadius: 1,
                  "&:has(:checked)": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                    color: "primary.main",
                  },
                  "&:has(:checked) p": {
                    color: "primary.main",
                  },
                }}
              />
              <FormControlLabel
                control={<Radio />}
                label={<Typography>Doctors & Nurses</Typography>}
                value={"Docter&Nurse"}
                sx={{
                  border: "1px solid #e0e0e0",
                  paddingRight: 2,
                  borderRadius: 1,
                  "&:has(:checked)": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                    color: "primary.main",
                  },
                  "&:has(:checked) p": {
                    color: "primary.main",
                  },
                }}
              />
              <FormControlLabel
                control={<Radio />}
                label={<Typography>None</Typography>}
                value={""}
                sx={{
                  border: "1px solid #e0e0e0",
                  paddingRight: 2,
                  borderRadius: 1,
                  "&:has(:checked)": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                    color: "primary.main",
                  },
                  "&:has(:checked) p": {
                    color: "primary.main",
                  },
                }}
              />
            </RadioGroup>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}
