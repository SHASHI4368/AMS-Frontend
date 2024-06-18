import React, { useEffect } from "react";
import {
  DescriptionText,
  FieldContainer,
  HorizontalContainer,
  HorizontalTextInput,
  SmallHorizontalContainer,
} from "../../../styles/signup/details";
import BatchSelector from "../selectors/batchSelector";
import SignupPassword from "../other/newPassword";
import DepartmentSelector from "../selectors/departmentSelector";
import { useMediaQuery, useTheme } from "@mui/material";
import PositionSelector from "../selectors/positionSelector";
import TitleSelector from "../selectors/titleSelector";
import { useSignupContext } from "../../../context/signup";
import { ErrorMessage, ErrorMessageContainer } from "../../../styles/login";
import NewPassword from "../other/newPassword";
import ConfirmNewPassword from "../other/confirmNewPassword";

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
    staff,
  } = useSignupContext();

  useEffect(() => {
    if (staff) {
      setFirstName(staff.given_name);
      setLastName(staff.family_name);
    }
  }, []);

  return (
    <FieldContainer>
      <DescriptionText>Please enter the new password</DescriptionText>
      <FieldContainer>
        <HorizontalContainer sx={{ width: "70%", mb: 0, mt: 2 }}>
          <NewPassword />
        </HorizontalContainer>
        <HorizontalContainer sx={{ width: "70%" }}>
          <ConfirmNewPassword />
        </HorizontalContainer>
      </FieldContainer>
      <ErrorMessageContainer sx={{ mt: -3 }}>
        {message && <ErrorMessage severity="error">{message}</ErrorMessage>}
      </ErrorMessageContainer>
    </FieldContainer>
  );
};

export default StaffDetails;
