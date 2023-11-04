import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/userAuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_OAUTH_CLIENT_ID } from "./config";
import { SearchProvider } from "./context/useSearch";
import { Provider } from "react-redux";
import store from "./store/store";
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import { BookingProvider } from "./context/useBooking";
import CssBaseline from "@mui/material/CssBaseline";
import { StateManagerProvider } from "./context/useStateManager";

const customTheme = createMuiTheme({
  typography: {
    fontFamily: "Baloo 2",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

const CLIENT_ID = GOOGLE_OAUTH_CLIENT_ID;

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <StateManagerProvider>
        <SearchProvider>
          <AuthProvider>
            <BookingProvider>
              <BrowserRouter>
                <ThemeProvider theme={customTheme}>
                  <Provider store={store}>
                    <CssBaseline />
                    <App />
                  </Provider>
                </ThemeProvider>
              </BrowserRouter>
            </BookingProvider>
          </AuthProvider>
        </SearchProvider>
      </StateManagerProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
