import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
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
  PasswordFormControl,
} from "../../styles/login";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
            sx={{lineHeight: "1px"}}
          />
          <PasswordFormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </PasswordFormControl>
          <MyLink href="#">Forgot password?</MyLink>
          <LoginButton variant="contained" color="primary">
            Login
          </LoginButton>
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
        </ButtonContainer>
      </LoginPaper>
    </LoginContainer>
  );
};

export default Login;
