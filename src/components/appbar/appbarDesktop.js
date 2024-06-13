import React from "react";
import {
  AppbarContainer,
  AppbarLogo,
  LoginButton,
  SignUpButton,
} from "../../styles/appbar/desktop";
import StudentBar from "./studentBar";
import { ShapeTop } from "../../styles/footer";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../../context/ui";
import StaffBar from "./staffBar";

const AppbarDesktop = () => {
  const navigate = useNavigate();
  const { authorized, userType } = useUIContext();
  return (
    <>
      <AppbarContainer>
        <AppbarLogo>ams</AppbarLogo>
        <AppbarContainer>
          {authorized && userType === "Student" && <StudentBar />}
          {authorized && userType === "Staff" && <StaffBar />}
          {!authorized && (
            <>
              <LoginButton
                variant="button"
                sx={{ textTransform: "capitalize", fontSize: "18px" }}
                onClick={(e) => navigate("/")}
              >
                Login
              </LoginButton>
              <SignUpButton
                color="primary"
                onClick={(e) => navigate("/signup")}
              >
                Sign up
              </SignUpButton>
            </>
          )}
        </AppbarContainer>
      </AppbarContainer>
      {!authorized && (
        <ShapeTop>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </ShapeTop>
      )}
    </>
  );
};

export default AppbarDesktop;
