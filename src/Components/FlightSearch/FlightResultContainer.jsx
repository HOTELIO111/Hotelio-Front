import { Box } from "@mui/material";
import FlightResultSort from "./FlightResultSort";
import FlightResultCard from "./FlightResultCard";

export default function ResultContainer() {
  return (
    <Box>
      <FlightResultSort />
      {Array.from({ length: 5 }).map((_, index) => (<FlightResultCard key={index} />))} 
    </Box>
  );
}
