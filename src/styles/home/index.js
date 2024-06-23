import { Box, Button, Divider, Typography, styled } from "@mui/material";
import { Colors } from "../theme";
import "@fontsource/poppins";
import "@fontsource/raleway";
import { lighten } from "polished";

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
  alignItems: "top",
  justifyContent: "space-between",
  width: "100%",
  minHeight: "600px",
}));

export const TodayAppointmentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexGrow: 5,
  margin: "20px 30px",
  width: "60%",
  height: "100%", 
}));

export const PendingAppointmentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "0px 30px",
  flexDirection: "column",
  alignItems: "center", // Corrected from "top" to "flex-start"
  justifyContent: "flex-start", // Corrected from "left" to "flex-start"
  width: "40%",
  minHeight: "600px",
  backgroundColor: Colors.sidebar,
  flexGrow: 5,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    margin: "0px",
  },
}));


export const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Raleway",
  fontSize: "40px",
  fontWeight: "bold",
  color: Colors.primary,
  marginTop: "50px",
  marginLeft: "0px",
  marginBottom: "20px",
  [theme.breakpoints.down("lg")]: {
    fontSize: "30px",
  }
}));

export const Subtitle2 = styled(Typography)(({ theme }) => ({
  fontFamily: "Raleway",
  fontSize: "30px",
  fontWeight: "bold",
  color: Colors.primary,
  marginTop: "40px",
  marginBottom: "20px",
  textAlign: "center",
  [theme.breakpoints.down("lg")]: {
    fontSize: "25px",
  }
}));

export const HomeDividerMain = styled(Divider)(({ theme }) => ({
  width: "100%",
  height: "2px",
  background: Colors.dove_gray,
  marginBottom: "25px",
}));

export const HomeDivider = styled(Divider)(({ theme }) => ({
  width: "80%",
  height: "2px",
  background: Colors.dove_gray,
  marginBottom: "5px",
}));

export const SmallAppointmentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginLeft: "20px",
  [theme.breakpoints.down("lg")]: {
    marginLeft: "10px",
    width: "100%",
  },
}));

export const SliderContainer = styled(Box)(({ theme }) => ({
  width: "90%",
  padding: "10px",
  minHeight: "250px",
  marginBottom: "20px",
  marginLeft: "-40px",
  overflow: 'hidden',
  [theme.breakpoints.down("lg")]: {
    padding: "10px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: '30px'
  },
}));

export const NoAptTextMain = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  marginTop: "80px",
  fontSize: "80px",
  fontWeight: 400,
  color: Colors.dove_gray,
  [theme.breakpoints.down("sm")]: {
    fontSize: "60px",
  }
}));

export const NoAptText = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  marginTop: "100px",
  textAlign: "center",
  fontSize: "40px",
  fontWeight: 400,
  color: Colors.dove_gray,
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
  }
}));

export const MainButton = styled(Button)(({ theme }) => ({
  backgroundColor: Colors.primary,
  color: Colors.white,
  fontFamily: "Poppins",
  textTransform: "uppercase",
  fontSize: 60,
  fontWeight: 500,
  borderRadius: "10px",
  padding: "20px",
  marginTop: "40px",
  marginBottom: "20px",
  "&:hover": {
    backgroundColor: lighten(0.08, Colors.primary),
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: 50,
  }
}));
