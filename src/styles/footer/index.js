import { Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const ShapeTop = styled("div")(({theme}) => ({
  top: 108,
  left: 0,
  bottom: 0,
  width: "100%",
  overflow: "hidden",
  lineHeight: 0,
  zIndex: 1,
  "& svg": {
    zIndex: 1,
    position: "relative",
    display: "block",
    width: "100%",
    height: "60px",
    fill: Colors.appbar,
  },

  "& shape-fill": {
    fill: "#FFFFFF",
  },
  [theme.breakpoints.down("sm")]: {
    top: 80,
  }
}));

export const ShapeBottom = styled("div")(() => ({
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  overflow: "hidden",
  lineHeight: 0,

  "& svg": {
    position: "relative",
    display: "block",
    width: "calc(156% + 1.3px)",
    height: "132px",
    fill: Colors.appbar,
  },

  "& shape-fill": {
    fill: "#FFFFFF",
  },
}));

export const FooterTitle = styled(Typography)(() => ({
  fontFamily: "Raleway",
  textTransform: "capitalize",
  marginBottom: "1em",
  fontWeight: 600,
}));

export const FooterText = styled(Typography)(() => ({
  fontFamily: "Raleway",
  marginBottom: "1em",
  fontSize: "16px",
}));

