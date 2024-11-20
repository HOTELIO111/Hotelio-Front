import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import FlightSearchForm from "../../Components/FlightSearch/FlightSearchForm";
import Footer from "../../Components/footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import FlightSearchFilter from "../../Components/FlightSearch/FlightSearchFilter";
import ResultContainer from "../../Components/FlightSearch/FlightResultContainer";

export default function FlightSearch() {
  const theme = createTheme({
    components: {
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginLeft: 0,
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#ee2e24",
      },
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box>
          <Navbar />
        </Box>
        <Box mt={4}>
          <FlightSearchForm />
          <Container sx={{ flexDirection: "row", display: "flex", mt: 4, gap: 2}}>
            <Box width={"25%"}>
              <FlightSearchFilter />
            </Box>
            <Box width={"75%"}>
              <ResultContainer />
            </Box>
          </Container>
        </Box>
        <Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </div>
  );
}
