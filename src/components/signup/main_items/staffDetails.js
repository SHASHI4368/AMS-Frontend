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
import PositionSelector from "../selectors/positionSelector";
import TitleSelector from "../selectors/titleSelector";
import { useSignupContext } from "../../../context/signup";
import { ErrorMessage, ErrorMessageContainer } from "../../../styles/login";

const StaffDetails = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    message,
    setMessage,
    staff
  } = useSignupContext();

  useEffect(() => {
    if (staff) {
      setFirstName(staff.given_name);
      setLastName(staff.family_name);
    }
  }, []);

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
            <HorizontalContainer sx={{ mb: "15px" }}>
              <PositionSelector />
            </HorizontalContainer>
            <SmallHorizontalContainer>
              <TitleSelector />
              <DepartmentSelector />
            </SmallHorizontalContainer>
          </>
        )}
        {!small && (
          <>
            <HorizontalContainer sx={{ mb: "15px" }}>
              <PositionSelector />
              <TitleSelector />
              <DepartmentSelector />
            </HorizontalContainer>
          </>
        )}
        <HorizontalContainer>
          <HorizontalTextInput
            disabled
            variant="outlined"
            label="University email"
            sx={{
              lineHeight: "1px",
              margin: small ? "5px 10px" : "0px 10px",
              width: "97.5%",
            }}
            value={email}
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <SignupPassword />
        </HorizontalContainer>
        <ErrorMessageContainer sx={{ mt: -1, mb: -1 }}>
          {message && <ErrorMessage severity="error">{message}</ErrorMessage>}
        </ErrorMessageContainer>
      </FieldContainer>
    </FieldContainer>
  );
};

export default StaffDetails;
