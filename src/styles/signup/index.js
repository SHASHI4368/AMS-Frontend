import { Box, Link, TextField, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const SignupContainer = styled(Box)(({ theme }) => ({
  height: "550px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    height: '600px'
  }
}));

export const FieldContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  flexGrow: 1,
  width: "100%",
  marginTop: "70px",
}));

export const SignupPaper = styled(Box)(({ theme }) => ({
  backgroundColor: Colors.white,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: `1px solid ${Colors.dim_grey}`,
  boxShadow: "10px 10px 10px 0 rgba(0, 0, 0, 0.1)",
  opacity: 0.8,
  position: "relative",
  borderRadius: "10px",
  padding: "46px",
  width: "60%",
  textAlign: "center",
  height: "700px",
  zIndex: 999,
  [theme.breakpoints.down("md")]: {
    width: "80%",
    height: "600px",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "30px",
    width: "80%",
    height: "680px",
  },
}));

export const SignupContentPaper = styled(Box)(({ theme }) => ({
  backgroundColor: Colors.appbar,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: `1px solid ${Colors.dim_grey}`,
  boxShadow: "10px 10px 10px 0 rgba(0, 0, 0, 0.1)",
  opacity: 0.8,
  position: "relative",
  borderRadius: "10px",
  padding: "46px",
  width: "95%",
  textAlign: "center",
  height: "400px",
  zIndex: 999,
  [theme.breakpoints.down("md")]: {
    width: "80%",
    height: "600px",
  },
}));

export const SignupTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Raleway",
  fontSize: "32px",
  letterSpacing: 0,
  fontWeight: 600,
  color: Colors.dim_grey,
  marginTop: "-20px",
  marginBottom: "60px",
  [theme.breakpoints.down("md")]: {
    fontSize: "26px",
    marginTop: "-20px",
    marginBottom: "40px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "19px",
    marginTop: "-20px",
    marginBottom: "40px",
  },
}));

export const TextInput = styled(TextField)(({ theme }) => ({
  marginTop: "-20px",
  width: "60%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "120%",
    marginBottom: "20px",
  },
}));

export const DescriptionText = styled(Typography)(({ theme }) => ({
  fontFamily: "Raleway",
  fontSize: "16px",
  letterSpacing: 0,
  fontWeight: 400,
  color: Colors.dim_grey,
  marginBottom: "40px",
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
    marginTop: "10px",
    marginBottom: "40px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    marginTop: "10px",
    marginBottom: "40px",
  },
}));

export const MyLink = styled(Link)(({ theme }) => ({
  color: Colors.dim_grey,
  fontSize: "16px",
  fontFamily: "Raleway",
  marginTop: "100px",
  "&:hover": {
    cursor: "pointer",
    color: Colors.primary,
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "60px",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "50px",
  },
}));
