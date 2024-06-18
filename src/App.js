import { ThemeProvider } from "@mui/material";
import Appbar from "./components/appbar";
import theme from "./styles/theme";
import AppDrawer from "./components/drawer";
import { UIProvider, useUIContext } from "./context/ui";
import Footer from "./components/footer";
import Login from "./components/login";
import SignUp from "./components/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyAlert from "./components/signup/other/alert";
import Calendar from "./components/calendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Department from "./components/department";
import axios from "axios";
import { useEffect } from "react";
import Home from "./components/home";
import ForgotPassword from "./components/forgot_password";
import Profile from "./components/profile";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <UIProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <Appbar />
            <AppDrawer />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/department" element={<Department />} />
              <Route path="/password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile/>}/>
            </Routes>
            <Footer />
          </BrowserRouter>
        </LocalizationProvider>
        <MyAlert />
      </UIProvider>
    </ThemeProvider>
  );
}

export default App;
