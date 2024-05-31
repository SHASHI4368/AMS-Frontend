import { Box, Button, Typography, styled } from "@mui/material";
import { Colors } from "../theme";
import "@fontsource/montez";
import { lighten } from "polished";

export const AppbarContainer = styled(Box)(() => ({
 padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: Colors.appbar,
}));

export const AppbarLogo = styled(Box)(() => ({
  fontSize: "4rem",
  fontWeight: "bold",
  flexGrow: 1,
  fontFamily: '"Montez", "cursive"',
  textTransform: "uppercase",
  marginLeft: "30px",
}));

export const LoginButton = styled(Typography)(() => ({
  textTransform: "capitalize",
  fontSize: "16px",
  "&:hover": {
    cursor: "pointer",
    color: lighten(0.05, Colors.primary),
  },
  transition: "color 0.3s",
  marginRight: "20px",
}));

export const SignUpButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color",
  name: "MySignUpButton",
  slot: "Root",
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondary" && styles.secondary,
  ],
})(({ theme }) => ({
  margin: "10px 20px",
  textTransform: "capitalize",
  padding: "10px 0",
  width: "120px",
  color: Colors.white,
  borderRadius: "35px",
  fontSize: "16px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0",
    fontSize: "14px",
  },
}));
