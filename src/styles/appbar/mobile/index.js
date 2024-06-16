import { Box, Icon, IconButton, styled } from "@mui/material";
import { Colors } from "../../theme";

export const DrawerCloseButton = styled(IconButton)(() => ({
  position: "fixed",
  top: 10,
  left: "250px",
  zIndex: 1999,
}));

export const ArrowContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "0",
  cursor: "pointer",
}));

export const Arrow = styled(Icon)(({ open }) => ({
  transform: open ? "rotate(90deg)" : "rotate(270deg)",
  transition: "transform 0.3s",
  color: Colors.appbar,
  marginRight: "20px",
  marginTop: open ? "5px" : "0",
  width: "20px",
}));

export const DrawerLogo = styled(Box)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: "bold",
  flexGrow: 1,
  fontFamily: '"Montez", "cursive"',
  textTransform: "uppercase",
  marginLeft: "-15px",
  marginTop: "30px",
  marginBottom: "50px",
  color: Colors.appbar,
}));

export const DepartmentDrawerList = styled("ul")(({ open }) => ({
  display: open ? "flex" : "none",
  flexDirection: "column",
  marginLeft: "0",
  width: "100%",
  transition: "display 1s",
  color: Colors.appbar,
}));

export const DrawerListItem = styled("li")(() => ({
  listStyle: "none",
  cursor: "pointer",
  margin: "20px 0",
  padding: "0 30px",
  fontSize: "18px",
  fontFamily: "Raleway",
  overflow: "hidden",
  zIndex: 9999,
}));

export const DrawerList = styled("ul")(() => ({
  display: "flex",
  flexDirection: "column",
  marginLeft: "0",
  width: "100%",
  color: Colors.appbar,
}));

export const DrawerContainer = styled(Box)(({ theme }) => ({
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: Colors.appbar,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    background: Colors.primary,
  },
}));
