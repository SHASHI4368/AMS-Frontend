import React from "react";
import { AppbarContainer, AppbarLogo, LoginButton, SignUpButton } from "../../styles/appbar";
import { Typography } from "@mui/material";

const AppbarDesktop = () => {
  return (
    <AppbarContainer>
      <AppbarLogo>AMs</AppbarLogo>
      <AppbarContainer>
        <LoginButton
          variant="button"
          sx={{ textTransform: "capitalize", fontSize: "18px" }}
        >
          Login
        </LoginButton>
        <SignUpButton color="primary">Sign up</SignUpButton>
      </AppbarContainer>
    </AppbarContainer>
  );
};

export default AppbarDesktop;
