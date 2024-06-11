import { Box, Tooltip } from "@mui/material";
import React from "react";
import {
  DescriptionText,
  TextInput,
  FieldContainer,
} from "../../../styles/signup";
import { GoogleSignupButton } from "../../../styles/signup/selectEmail";
import {
  ErrorMessage,
  ErrorMessageContainer,
  GoogleIcon,
} from "../../../styles/login";
import { useSignupContext } from "../../../context/signup";
import { useUIContext } from "../../../context/ui";

const SelectEmail = () => {
  const { stdEmail, setStdEmail, message } = useSignupContext();

  return (
    <FieldContainer>
      <DescriptionText>Please enter your university email</DescriptionText>
      <TextInput
        variant="outlined"
        label="University email"
        sx={{ lineHeight: "1px" }}
        value={stdEmail}
        onChange={(e) => setStdEmail(e.target.value)}
      />
      <ErrorMessageContainer sx={{ mt: 1, mb: -2 }}>
        <ErrorMessage>{message}</ErrorMessage>
      </ErrorMessageContainer>
      <DescriptionText sx={{ marginTop: "40px", marginBottom: "0px" }}>
        or
      </DescriptionText>
      <Tooltip title="Only for staff members" placement="bottom">
        <GoogleSignupButton variant="contained" color="primary">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <GoogleIcon
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="google"
            />
            Sign{" "}
            <span style={{ margin: "0 5px", textTransform: "lowercase" }}>
              {" "}
              up with{" "}
            </span>{" "}
            Google
          </Box>
        </GoogleSignupButton>
      </Tooltip>
    </FieldContainer>
  );
};

export default SelectEmail;
