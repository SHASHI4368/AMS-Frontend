import { ThemeProvider } from "@mui/material";
import Appbar from "./components/appbar";
import theme from "./styles/theme";
import AppDrawer from "./components/drawer";
import { UIProvider } from "./context/ui";
import Footer from "./components/footer";
import Login from "./components/login";
import SignUp from "./components/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UIProvider>
        <Appbar />
        <AppDrawer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </UIProvider>
    </ThemeProvider>
  );
}

export default App;
