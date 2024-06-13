import {
  Box,
  Button,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { Colors } from "../../theme";
import "@fontsource/montez";
import "@fontsource/raleway";
import { lighten } from "polished";

export const AppbarContainer = styled(Box)(({ theme }) => ({
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: Colors.appbar,
}));

export const ButtonContainer = styled("ul")(() => ({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  fontFamily: "Roboto, sans-serif",
  fontSize: "18px",
  fontWeight: 400,
}));

export const DepartmentContainer = styled("ul")(({ open }) => ({
  position: "absolute",
  border: `1px solid ${Colors.dove_gray}`,
  opacity: open ? 1 : 0,
  visibility: open ? "visible" : "hidden",
  transition: "opacity 0.9s ease, visibility 0.3s ease-in-out",
  flexDirection: "column",
  top: "30px",
  left: "-10px",
  width: "120px",
  borderRadius: "15px",
  background: lighten(0.009, Colors.appbar),
  zIndex: 9999,
}));

export const DepartmentItem = styled("li")(() => ({
  position: "relative",
  listStyle: "none",
  cursor: "pointer",
  textAlign: "center",
  marginBottom: "10px",
  fontFamily: "Raleway",
  padding: "3px 0",
  "&::before": {
    content: '""',
    background: Colors.primary,
    position: "absolute",
    left: 0,
    bottom: "-0.4rem",
    height: "3px",
    width: "0",
    transition: "all 0.3s ease-in-out",
  },
  "&:hover::before": {
    content: '""',
    background: Colors.primary,
    position: "absolute",
    left: 3,
    bottom: "-0.4rem",
    height: "3px",
    width: "94%",
  },
}));

export const ButtonItem = styled("li")(() => ({
  margin: "0 20px",
  position: "relative",
  listStyle: "none",
  cursor: "pointer",
  fontFamily: "Raleway",

  "&::before": {
    content: '""',
    background: Colors.primary,
    position: "absolute",
    left: 0,
    bottom: "-0.4rem",
    height: "3px",
    width: "0",
    transition: "all 0.3s ease-in-out",
  },
  "&:hover::before": {
    content: '""',
    background: Colors.primary,
    position: "absolute",
    left: 0,
    bottom: "-0.4rem",
    height: "3px",
    width: "100%",
  },
}));

export const DepartmentButton = styled("li")(() => ({
  margin: "0 20px",
  position: "relative",
  listStyle: "none",
  cursor: "pointer",
}));

export const AppbarLogo = styled(Box)(({ theme }) => ({
  fontSize: "4rem",
  fontWeight: "bold",
  flexGrow: 1,
  fontFamily: '"Montez", "cursive"',
  textTransform: "uppercase",
  marginLeft: "30px",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
    marginLeft: "10px",
  },
}));

export const MenuButton = styled(IconButton)(() => ({
  marginRight: "10px",
  "&:hover": {
    color: Colors.primary,
  },
}));

export const LoginButton = styled(Typography)(() => ({
  textTransform: "capitalize",
  fontFamily: "Raleway",
  fontSize: "16px",
  fontWeight: 500,
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
  fontFamily: "Raleway",
  padding: "10px 0",
  width: "120px",
  color: Colors.white,
  borderRadius: "35px",
  fontSize: "16px",
  fontWeight: 500,
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0",
    fontSize: "14px",
  },
}));
