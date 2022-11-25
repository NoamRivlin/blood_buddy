import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./AuthContext";
import { AppointmentProvider } from "./contexts/AppointmentContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff4756",
    },
    success: {
      main: "#2ed573",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppointmentProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AppointmentProvider>
    </AuthProvider>
  </React.StrictMode>
);
