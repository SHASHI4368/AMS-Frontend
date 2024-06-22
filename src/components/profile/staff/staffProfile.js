import React, { useEffect, useState } from "react";
import { DescriptionText, FieldContainer } from "../../../styles/signup";
import {
  HorizontalContainer,
  HorizontalTextInput,
  SmallHorizontalContainer,
} from "../../../styles/signup/details";
import { ErrorMessage, ErrorMessageContainer } from "../../../styles/login";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useUIContext } from "../../../context/ui";
import BatchSelector from "../selectors/batchSelector";
import DepartmentSelector from "../selectors/departmentSelector";
import NewPassword from "../other/newPassword";
import { Colors } from "../../../styles/theme";
import "@fontsource/raleway";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PositionSelector from "../selectors/positionSelector";
import TitleSelector from "../selectors/titleSelector";

const Header = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 500,
  color: Colors.primary,
  fontFamily: "Raleway",
  marginTop: "-60px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
    marginTop: "-80px",
  },
}));

const StaffProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const {
    email,
    profileDepartment,
    setProfileDepartment,
    profileTitle,
    setProfileTitle,
    profilePosition,
    setProfilePosition,
    profilePassword,
    setAlertOpen,
    setAlertMessage,
  } = useUIContext();

  useEffect(() => {}, []);

  useEffect(() => {
    const getStaff = async () => {
      const url = `https://ams-backend-duoh.onrender.com/db/staff/details/${email}`;
      const response = await axios.get(url);
      setFirstName(response.data[0].First_name);
      setLastName(response.data[0].Last_name);
      setProfileDepartment(response.data[0].Department);
      setProfilePosition(response.data[0].Position);
      setProfileTitle(response.data[0].Title);
    };
    getStaff();
  }, []);

    const updateStaffPassword = async () => {
      try {
        const url = `https://ams-backend-duoh.onrender.com/db/staff/password`;
        const response = await axios.put(url, {
          Email: email,
          Password: profilePassword,
        });
        setAlertOpen(true);
        setAlertMessage("Profile updated successfully");
        navigate("/home");
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.message);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(err.message);
        }
      }
    };

  const updateStaff = async () => {
    try {
      const url = `https://ams-backend-duoh.onrender.com/db/staff`;
      const data = {
        First_name: firstName,
        Last_name: lastName,
        Department: profileDepartment,
        Position: profilePosition,
        Title: profileTitle,
        Email: email,
      };
      const response = await axios.put(url, data);
      console.log(response);
      if (profilePassword !== "") {
        updateStaffPassword();
      } else {
        setAlertOpen(true);
        setAlertMessage("Profile updated successfully");
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    if (firstName === "") {
      setMessage("First name cannot be empty");
    } else if (lastName === "") {
      setMessage("Last name cannot be empty");
    } else {
      updateStaff();
    }
  };

  return (
    <FieldContainer>
      <Header>Update Profile</Header>
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
          <NewPassword />
        </HorizontalContainer>
        <ErrorMessageContainer sx={{ mt: -1, mb: -1 }}>
          {message && <ErrorMessage severity="error">{message}</ErrorMessage>}
        </ErrorMessageContainer>
      </FieldContainer>
      <HorizontalContainer
        sx={{
          justifyContent: "right",
          mr: 3,
          [theme.breakpoints.down("sm")]: {
            mr: 0,
            flexDirection: "row",
          },
        }}
      >
        <Button
          onClick={() => handleSubmit()}
          size="large"
          variant="contained"
          sx={{ mt: "20px" }}
        >
          Update
        </Button>
        <Button onClick={() => navigate('/home')} size="large" variant="text" sx={{ mt: "20px", ml: 2 }}>
          cancel
        </Button>
      </HorizontalContainer>
    </FieldContainer>
  );
};

export default StaffProfile;
