import { Box, FormControl, TextField, Typography, styled } from "@mui/material";
import { Colors } from "../../theme";

export const HorizontalContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  marginBottom: "5px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: 'center',
    width: "80%",
  },
}));

export const SmallHorizontalContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "120%",
  marginBottom: "5px",
  marginTop: '-5px',
}));

export const HorizontalTextInput = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  margin: "0px 10px",
  marginBottom: "10px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "140%",
    marginBottom: "10px",
  },
}));

export const DescriptionText = styled(Typography)(({ theme }) => ({
  fontFamily: "Raleway",
  fontSize: "16px",
  letterSpacing: 0,
  fontWeight: 400,
  color: Colors.dim_grey,
  marginBottom: "-40px",
  marginTop: '-35px',
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
    marginTop: "-40px",
    marginBottom: "-40px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    marginTop: "-40px",
    marginBottom: "-40px",
  },
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

export const PasswordFormControl = styled(FormControl)(({ theme }) => ({
  width: "160px",
  margin: "10px 10px 30px 10px",
  flexGrow: 1,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "140%",
    marginTop: '-5px',
    marginBottom: '0px'
  },
}));
