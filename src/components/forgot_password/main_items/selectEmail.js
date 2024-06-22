import { Box, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
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
import axios from "axios";

const SelectEmail = () => {
  const { email, setEmail, message, setStaff } = useSignupContext();

  const handleGoogleAuth = (e, action) => {
    e.preventDefault();
    window.open(
      `https://ams-backend-hvfj.onrender.com/auth/google?action=${action}`,
      "_self"
    );
  };

  useEffect(() => {
    const getStaff = async () => {
      try {
        const url = `https://ams-backend-hvfj.onrender.com/auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        if (data.error === false) {
          setStaff(data.user._json);
          setEmail(data.user._json.email);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getStaff();
  }, []);

  return (
    <FieldContainer sx={{ mt: "100px" }}>
      <DescriptionText>Please enter your university email</DescriptionText>
      <TextInput
        variant="outlined"
        label="University email"
        sx={{ lineHeight: "1px" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <ErrorMessageContainer sx={{ mt: 3, mb: -2 }}>
        {message && <ErrorMessage severity="error">{message}</ErrorMessage>}
      </ErrorMessageContainer>
    </FieldContainer>
  );
};

export default SelectEmail;
