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
import { useSignupContext } from "../../../context/signup";
import { ErrorMessage, ErrorMessageContainer } from "../../../styles/login";
import NewPassword from "../other/newPassword";
import ConfirmNewPassword from "../other/confirmNewPassword";

const StudentDetails = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const {
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
      <DescriptionText>Please enter the new password</DescriptionText>
      <FieldContainer>
        <HorizontalContainer sx={{ width: "70%", mb: 0, mt:2 }}>
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

export default StudentDetails;
