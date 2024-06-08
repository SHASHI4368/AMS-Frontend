import React from "react";
import {
  DescriptionText,
  FieldContainer,
  HorizontalContainer,
  HorizontalTextInput,
  SmallHorizontalContainer,
} from "../../styles/signup/details";
import BatchSelector from "./batchSelector";
import SignupPassword from "./signupPassword";
import DepartmentSelector from "./departmentSelector";
import { useMediaQuery, useTheme } from "@mui/material";

const StudentDetails = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <FieldContainer>
      <DescriptionText>Please enter all the details</DescriptionText>
      <FieldContainer>
        <HorizontalContainer>
          <HorizontalTextInput
            variant="outlined"
            label="First name"
            sx={{ lineHeight: "1px" }}
          />
          <HorizontalTextInput
            variant="outlined"
            label="Last name"
            sx={{ lineHeight: "1px" }}
          />
        </HorizontalContainer>

        {small && (
          <>
            <HorizontalContainer sx={{ mt: "-5px" }}>
              <HorizontalTextInput
                variant="outlined"
                label="Registration no."
                sx={{ lineHeight: "1px", mb: '5px' }}
              />
            </HorizontalContainer>
            <SmallHorizontalContainer>
              <BatchSelector />
              <DepartmentSelector />
            </SmallHorizontalContainer>
          </>
        )}
        {!small && (
          <>
            <HorizontalContainer>
              <HorizontalTextInput
                variant="outlined"
                label="Registration no."
                sx={{ lineHeight: "1px", width: '30%' }}
              />
              <BatchSelector />
              <DepartmentSelector />
            </HorizontalContainer>
          </>
        )}
        <HorizontalContainer>
          <HorizontalTextInput
            variant="outlined"
            label="University email"
            sx={{ lineHeight: "1px", margin: small ? "5px 10px" : "0px 10px", width: "97.5%" }}
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <SignupPassword />
        </HorizontalContainer>
      </FieldContainer>
    </FieldContainer>
  );
};

export default StudentDetails;
