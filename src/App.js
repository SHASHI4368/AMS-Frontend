import { ThemeProvider } from "@mui/material";
import Appbar from "./components/appbar";
import theme from "./styles/theme";
import AppDrawer from "./components/drawer";
import { UIProvider } from "./context/ui";
import Footer from "./components/footer";
import Login from "./components/login";
import SignUp from "./components/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentHome from "./components/student_home";
import MyAlert from "./components/signup/other/alert";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UIProvider>
        <BrowserRouter>
          <Appbar />
          <AppDrawer />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/student/home" element={<StudentHome/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
        <MyAlert />
      </UIProvider>
    </ThemeProvider>
  );
}

export default App;
