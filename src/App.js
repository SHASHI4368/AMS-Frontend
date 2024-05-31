import { ThemeProvider } from "@mui/material";
import Appbar from "./components/appbar";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Appbar />
    </ThemeProvider>
  );
}

export default App;
