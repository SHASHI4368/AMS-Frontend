import { ThemeProvider } from "@mui/material";
import Appbar from "./components/appbar";
import theme from "./styles/theme";
import AppDrawer from "./components/drawer";
import { UIProvider } from "./context/ui";
import Footer from "./components/footer";
import Login from "./components/login";
import SignUp from "./components/signup";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UIProvider>
        <Appbar />
        <AppDrawer />
        <Login />
        {/* <SignUp /> */}
        <Footer />
      </UIProvider>
    </ThemeProvider>
  );
}

export default App;
