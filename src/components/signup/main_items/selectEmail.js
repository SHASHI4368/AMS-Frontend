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
  const {setGoogleAuth} = useUIContext();
  const { email, setEmail, message, setStaff } =
    useSignupContext();

  const handleGoogleAuth = (e, action) => {
    e.preventDefault();
    setGoogleAuth(true);
      window.open(
        `http://localhost:8080/auth/google?action=${action}`,
        "_self"
      );
  };

    useEffect(() => {
      const getStaff = async () => {
        try {
          const url = `http://localhost:8080/auth/login/success`;
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
    <FieldContainer>
      <DescriptionText>Please enter your university email</DescriptionText>
      <TextInput
        variant="outlined"
        label="University email"
        sx={{ lineHeight: "1px" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <ErrorMessageContainer sx={{mt:3, mb:-2}}>
        {message && <ErrorMessage severity="error">{message}</ErrorMessage>}
      </ErrorMessageContainer>
      <DescriptionText sx={{ marginTop: "40px", marginBottom: "0px" }}>
        or
      </DescriptionText>
      <Tooltip title="Only for staff members" placement="bottom">
        <GoogleSignupButton
          onClick={(e) => handleGoogleAuth(e, "signup")}
          variant="contained"
          color="primary"
        >
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
