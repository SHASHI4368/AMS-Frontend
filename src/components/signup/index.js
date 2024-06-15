import React, { useState } from "react";
import { SignupContainer, SignupPaper, SignupTitle } from "../../styles/signup";
import StepperTop from "./main_items/stepperTop";
import StepperBottom from "./main_items/stepperBottom";
import { Box } from "@mui/material";
import SelectEmail from "./main_items/selectEmail";
import Verification from "./main_items/verification";
import StudentDetails from "./main_items/studentDetails";
import { useUIContext } from "../../context/ui";
import StaffDetails from "./main_items/staffDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SignupProvider, useSignupContext } from "../../context/signup";
import Loader from "./other/loader";

const SignUp = () => {
  const { activeStep, userType, progressOpen } = useUIContext();
  return (
    <SignupProvider>
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
      <Loader progressOpen={progressOpen} />
      </SignupContainer>
    </SignupProvider>
  );
};

export default SignUp;
