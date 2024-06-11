import React, { useEffect } from "react";
import {
  DescriptionText,
  FieldContainer,
  HorizontalContainer,
  HorizontalTextInput,
  SmallHorizontalContainer,
} from "../../../styles/signup/details";
import BatchSelector from "../selectors/batchSelector";
import SignupPassword from "../other/signupPassword";
import DepartmentSelector from "../selectors/departmentSelector";
import { useMediaQuery, useTheme } from "@mui/material";
import { useSignupContext } from "../../../context/signup";
import { ErrorMessage, ErrorMessageContainer } from "../../../styles/login";

const StudentDetails = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    setRegNo,
    tempRegNo,
    setTempRegNo,
    batch,
    setBatch,
    stdEmail,
    message,
    setMessage,
  } = useSignupContext();

  useEffect(() => {
    setBatch("21");
  }, []);

  useEffect(() => {
    setTempRegNo(`EG/20${batch - 2}/`);
  }, [batch]);

  const handleRegNoChange = (e) => {
    setTempRegNo(e.target.value);
    if (
      /^[A-Z0-9][A-Z0-9]\/[0-9][0-9][0-9][0-9]\/[0-9][0-9][0-9]$/.test(
        tempRegNo
      )
    ) {
      setRegNo(e.target.value);
      setMessage("");
    } else {
      setMessage("Please enter a valid registration number");
    }
  };

  return (
    <FieldContainer>
      <DescriptionText>Please enter all the details</DescriptionText>
      <FieldContainer>
        <HorizontalContainer>
          <HorizontalTextInput
            variant="outlined"
            label="First name"
            sx={{ lineHeight: "1px" }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <HorizontalTextInput
            variant="outlined"
            label="Last name"
            sx={{ lineHeight: "1px" }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </HorizontalContainer>

        {small && (
          <>
            <HorizontalContainer sx={{ mt: "-5px" }}>
              <HorizontalTextInput
                variant="outlined"
                label="Registration no."
                sx={{ lineHeight: "1px", mb: "5px" }}
                value={tempRegNo}
                onChange={handleRegNoChange}
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
                sx={{ lineHeight: "1px", width: "30%" }}
                value={tempRegNo}
                onChange={handleRegNoChange}
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
            sx={{
              lineHeight: "1px",
              margin: small ? "5px 10px" : "0px 10px",
              width: "97.5%",
            }}
            value={stdEmail}
            disabled
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <SignupPassword />
        </HorizontalContainer>
      </FieldContainer>
      <ErrorMessageContainer sx={{ mt: -3 }}>
        <ErrorMessage>{message}</ErrorMessage>
      </ErrorMessageContainer>
    </FieldContainer>
  );
};

export default StudentDetails;
