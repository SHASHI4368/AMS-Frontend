import { Box, Tooltip } from "@mui/material";
import React from "react";
import {
  DescriptionText,
  TextInput,
  FieldContainer,
} from "../../styles/signup";
import {  GoogleSignupButton,  } from "../../styles/signup/selectEmail";
import { GoogleIcon} from "../../styles/login";

const SelectEmail = () => {
  return (
    <FieldContainer>
      <DescriptionText>Please enter your university email</DescriptionText>
      <TextInput
        variant="outlined"
        label="University email"
        sx={{ lineHeight: "1px" }}
      />
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
