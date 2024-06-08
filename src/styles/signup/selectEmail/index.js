import { Box, Button, styled } from "@mui/material";
import { Colors } from "../../theme";

export const GoogleSignupButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color",
  name: "MySignUpButton",
  slot: "Root",
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondary" && styles.secondary,
  ],
})(({ theme }) => ({
  marginTop: "30px",
  textTransform: "capitalize",
  fontFamily: "Raleway",
  padding: "10px 0",
  width: "60%",
  color: Colors.white,
  borderRadius: "5px",
  fontSize: "16px",
  fontWeight: 500,
  [theme.breakpoints.down("md")]: {
    padding: "10px 0",
    fontSize: "14px",
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0",
    fontSize: "14px",
    width: "120%",
    marginTop: "0px",
  },
}));
