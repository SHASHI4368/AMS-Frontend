import { ThemeProvider } from "@mui/material";
import Appbar from "./components/appbar";
import theme from "./styles/theme";
import AppDrawer from "./components/drawer";
import { UIProvider } from "./context/ui";
import Footer from "./components/footer";
import Login from "./components/login";
import SignUp from "./components/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentHome from "./components/home";
import MyAlert from "./components/signup/other/alert";
import Calendar from "./components/calendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
              <Route path="/home" element={<StudentHome />} />
              <Route path="/calendar" element={<Calendar />} />
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
