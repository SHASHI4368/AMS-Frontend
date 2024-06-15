import { Box, Button, DialogContent, DialogTitle, Divider, Paper, TextField, Typography, styled } from "@mui/material";
import "@fontsource/raleway";
import "@fontsource/poppins";
import { Colors } from "../theme";
import { lighten, padding } from "polished";

export const CalendarContainer = styled(Box)(({ theme }) => ({
  minHeight: "600px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const PopupPaper = styled(DialogContent)(({ theme }) => ({
  backgroundColor: Colors.appbar,
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
  },
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "120%",
  marginLeft: "-50px",
  backgroundColor: Colors.primary,
  height: "80px",
  marginTop: "-20px",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "-40px",
  },
}));

export const PopupTitle = styled(DialogTitle)(({ theme }) => ({
  marginTop: "0px",
  fontFamily: "Poppins",
  color: Colors.white,
  fontWeight: 500,
  fontSize: '28px',
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: '21px',
    marginLeft: "10px",
    width: "100%",
  },
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

export const DateTimeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "0px",
  marginBottom: "-20px",
  marginTop: "-20px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "0px",
    marginLeft: "-20px",
    marginBottom: "0px",
  },
}));

export const DateTimeSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "left",
  width: "100%",
  padding: "20px",
}));

export const TextFieldContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "20px",
  [theme.breakpoints.down("sm")]: {
    padding: "0px",
  },
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: "10px",
}));