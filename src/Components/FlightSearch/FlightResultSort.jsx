import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

export default function FlightResultSort(){
    const [value, setValue] = useState("best");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
      <Box sx={{borderWidth:2, borderStyle:"solid", borderColor:"primary.main", borderRadius:1}}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label="Best" value={"best"} />
          <Tab label="Cheapest" value={"cheapest"} />
          <Tab label="Fastest" value={"fastest"} />
          <Tab label="Earliest" value={"earliest"} />
        </Tabs>
      </Box>
    );
}