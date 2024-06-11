import { createTheme } from "@mui/material";
import { lighten } from "polished";

export const Colors = {
  primary: "#8b22e2",
  secondary: "#d1adcc",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "#FF0000",
  warning: "#FFC107",
  dark: "#0e1b2e",
  light: "#aaa",
  muted: "#abafb3",
  border: "#DODFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  appbar: "#F0F2F8",
  // Grays
  dim_grey: "#696969",
  dove_gray: "#d5d5d5",
  body_bg: "#f3f6f9",
  light_gray: "rgb(230,230,230)",
  // Solid Color
  white: "#fff",
  black: "#000",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {},
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          marginLeft: "0px",
          margin: 0,
        },
      },
    },
    MySignUpButton: {
      styleOverrides: {
        root: {
          color: Colors.white,
        },
        primary: {
          background: Colors.primary,
          "&:hover": {
            background: lighten(0.05, Colors.primary),
          },
        },
        secondary: {
          background: Colors.secondary,
          "&:hover": {
            background: lighten(0.05, Colors.secondary),
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 250,
          background: Colors.primary,
          color: Colors.secondary,
          borderRadius: "0px 100px 0px 0px",
          borderRight: `5px solid ${Colors.appbar}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: lighten(0.2, Colors.appbar),
        },
      },
    },
  },
});

export default theme;
