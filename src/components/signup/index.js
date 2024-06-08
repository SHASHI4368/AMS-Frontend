import React from "react";
import { SignupContainer, SignupPaper, SignupTitle } from "../../styles/signup";
import StepperTop from "./stepperTop";
import StepperBottom from "./stepperBottom";
import { Box } from "@mui/material";
import SelectEmail from "./selectEmail";
import Verification from "./verification";
import StudentDetails from "./studentDetails";
import { useUIContext } from "../../context/ui";
import StaffDetails from "./staffDetails";

const SignUp = () => {
  const { activeStep, userType } = useUIContext();
  return (
    <SignupContainer>
      <SignupPaper>
        <SignupTitle>Sign up</SignupTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "space-between",
            height: "100%",
            alignItems: "center",
          }}
        >
          <StepperTop />
          {activeStep === 0 ? (
            <SelectEmail />
          ) : activeStep === 1 ? (
            <Verification />
          ) : userType === "Student" ? (
            <StudentDetails />
          ) : (
            <StaffDetails />
          )}
          <StepperBottom />
        </Box>
      </SignupPaper>
    </SignupContainer>
  );
};

export default SignUp;
