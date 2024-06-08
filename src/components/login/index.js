import { Box, Tooltip } from "@mui/material";
import React from "react";
import { Colors } from "../../styles/theme";
import {
  ButtonContainer,
  GoogleIcon,
  GoogleLoginButton,
  LoginButton,
  LoginContainer,
  LoginHeader,
  LoginInput,
  LoginPaper,
  MyLink,
} from "../../styles/login";
import LoginPassword from "./loginPassword";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  return (
    <LoginContainer>
      <LoginPaper>
        <LoginHeader variant="h5">
          Welcome to the Appointment Management System !
        </LoginHeader>
        <LoginHeader
          variant="h2"
          sx={{ mt: -4, color: Colors.dim_grey, fontSize: "40px" }}
        >
          Login
        </LoginHeader>
        <ButtonContainer>
          <LoginInput
            // color="success"
            variant="outlined"
            label="University email"
            sx={{ lineHeight: "1px" }}
          />
          <LoginPassword />
          <MyLink
            href="#"
            color={Colors.dim_grey}
            underline="hover"
            sx={{ mt: 2 }}
          >
            Forgot password ?
          </MyLink>
          <LoginButton variant="contained" color="primary">
            Login
          </LoginButton>
          <Tooltip title="Only for staff members" placement="bottom">
            <GoogleLoginButton variant="contained" color="primary">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <GoogleIcon
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="google"
                />
                Login{" "}
                <span style={{ margin: "0 5px", textTransform: "lowercase" }}>
                  {" "}
                  with{" "}
                </span>{" "}
                Google
              </Box>
            </GoogleLoginButton>
          </Tooltip>
            <MyLink
              color={Colors.dim_grey}
              underline="hover"
              sx={{ mt: 5 }}
              onClick={() => navigate("/signup")}
            >
              Don't have an account ? Sign up
            </MyLink>
        </ButtonContainer>
      </LoginPaper>
    </LoginContainer>
  );
};

export default Login;
