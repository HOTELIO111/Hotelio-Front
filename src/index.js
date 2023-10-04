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

const root = ReactDOM.createRoot(document.getElementById("root"));

const CLIENT_ID = GOOGLE_OAUTH_CLIENT_ID;

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <SearchProvider>
        <AuthProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </AuthProvider>
      </SearchProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
