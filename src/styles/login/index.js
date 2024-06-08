import {
  Box,
  Button,
  FormControl,
  Link,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Colors } from "../theme";
import "@fontsource/raleway";

export const LoginContainer = styled(Box)(({ theme }) => ({
  height: "550px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const LoginPaper = styled(Box)(({ theme }) => ({
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
}));

export const LoginHeader = styled(Typography)(({ theme }) => ({
  fontFamily: "Raleway",
  fontSize: "32px",
  letterSpacing: 0,
  fontWeight: 600,
  color: Colors.primary,
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

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0px",
  flexDirection: "column",
  width: "100%",
}));

export const LoginInput = styled(TextField)(({ theme }) => ({
  marginTop: "-20px",
  width: "60%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "120%",
  },
}));

export const PasswordFormControl = styled(FormControl)(({ theme }) => ({
  width: "60%",
  marginTop: "30px",
  marginBottom: "20px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "120%",
  },
}));

export const LoginButton = styled(Button, {
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
  },
}));

export const GoogleLoginButton = styled(Button, {
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
  },
}));

export const GoogleIcon = styled("img")(({ theme }) => ({
  width: "24px",
  height: "24px",
  marginRight: "10px",
}));

export const MyLink = styled(Link)(({ theme }) => ({
  color: Colors.dim_grey,
  fontSize: "16px",
  fontFamily: "Raleway",
  marginTop: "25px",
  "&:hover": {
    cursor: "pointer",
    color: Colors.primary,
  },
}));
