import { Box, Button, Divider, Paper, Typography, styled } from "@mui/material";
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

export const PopupPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: '500px',
  minWidth: '500px',
  backgroundColor: Colors.appbar,
}));

export const PopupTitle = styled(Typography)(({ theme }) => ({
  marginTop: "20px",
  fontFamily: "Poppins",
  color: Colors.primary,
  fontWeight: 500,
}));

export const PopupDivider = styled(Divider)(({ theme }) => ({
  width: "90%",
  height: "2px",
  margin: "16px 0",
  background: Colors.dove_gray,
}));

export const PopupLabel = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: "1.2rem",
  color: Colors.dark,
  marginLeft: "-400px",
  marginTop: "20px",
}));

export const PopupDate = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: "2rem",
  color: Colors.dim_grey,
  marginLeft: "20px",
  marginTop: "20px",
}));

export const PopupButton = styled(Button)(({ theme }) => ({
  width: "100px",
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: "1rem",
  margin: "0 10px",
}));

export const PopupButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  marginTop: "80px",
  padding: "0 20px",
}));