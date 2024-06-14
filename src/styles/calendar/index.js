import { Box, Button, DialogContent, DialogTitle, Divider, Paper, Typography, styled } from "@mui/material";
import "@fontsource/raleway";
import "@fontsource/poppins";
import { Colors } from "../theme";
import { lighten } from "polished";

export const CalendarContainer = styled(Box)(({ theme }) => ({
  minHeight: "600px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const PopupPaper = styled(DialogContent)(({ theme }) => ({
  // display: "flex",
  // width: "100%",
  // flexDirection: "column",
  // alignItems: "center",
  // justifyContent: "flex-start",
  // minHeight: "400px",
  // minWidth: "400px",
  backgroundColor: Colors.appbar,
  [theme.breakpoints.down("sm")]: {
    // minWidth: "400px",
  },
}));

export const PopupTitle = styled(DialogTitle)(({ theme }) => ({
  marginTop: "0px",
  fontFamily: "Poppins",
  color: Colors.primary,
  fontWeight: 500,
  fontSize: '22px',
  marginBottom: '10px'
}));

export const PopupDivider = styled(Divider)(({ theme }) => ({
  width: "95%",
  height: "2px",
  marginTop: '-10px',
  background: Colors.dove_gray,
}));

export const PopupLabel = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: "1rem",
  color: Colors.dark,
  marginTop: "20px",
}));

export const PopupDate = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: "1.5rem",
  color: Colors.dim_grey,
  marginTop: "10px",
  textAlign: 'center'
}));

export const TextContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "20px",
}));

export const PopupButton = styled(Button)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: "1rem",
}));

export const PopupButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  marginTop: "60px",
  padding: "0 20px",
  [theme.breakpoints.down("sm")]: {
    padding: "0 10px",
  },
}));