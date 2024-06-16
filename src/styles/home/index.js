import { Box, Divider, Typography, styled } from "@mui/material";
import { Colors } from "../theme";
import "@fontsource/poppins";
import "@fontsource/raleway";

export const HomeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderTop: `2px solid ${Colors.dove_gray}`,
  width: "100%",
  paddingTop: "100px",
  minHeight: "600px",
  [theme.breakpoints.down("sm")]: {
    padding: "0px",
  },
}));

export const AppointmentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "20px",
}));

export const TodayAppointmentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "flex-start",
  flexGrow:5,
  margin: "10px",
}));

export const PendingAppointmentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "flex-start",
  flexGrow:4,
  margin: "10px",
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Raleway",
  fontSize: "50px",
  fontWeight: "bold",
  color: Colors.primary,
  marginTop: "50px",
  marginLeft: "20px",
}));

export const HomeDivider = styled(Divider)(({ theme }) => ({
  width: "80%",
  height: "2px",
  background: Colors.dove_gray,
  margin: "10px",
}));
