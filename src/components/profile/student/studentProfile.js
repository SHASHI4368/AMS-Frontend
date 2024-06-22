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

const StudentProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [batch, setBatch] = useState("");
  const [message, setMessage] = useState("");

  const {
    email,
    profileBatch,
    setProfileBatch,
    profileDepartment,
    setProfileDepartment,
    regNumber,
    profilePassword,
    setAlertOpen,
    setAlertMessage,
  } = useUIContext();

  useEffect(() => {}, []);

  useEffect(() => {
    const getStudent = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/student/details/${regNumber}`;
      const response = await axios.get(url);
      setFirstName(response.data[0].First_name);
      setLastName(response.data[0].Last_name);
      setProfileBatch(response.data[0].Batch);
      setProfileDepartment(response.data[0].Department);
    };
    getStudent();
  }, []);

  const updateStudentPassword = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/student/password`;
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

  const updateStudent = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/student`;
      const data = {
        First_name: firstName,
        Last_name: lastName,
        Department: profileDepartment,
        Batch: profileBatch,
        Reg_number: regNumber,
      };
      const response = await axios.put(url, data);
      console.log(response);
      if(profilePassword !== "") {
        updateStudentPassword();
      }else{
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
      updateStudent();
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
            <HorizontalContainer sx={{ mt: "-5px" }}>
              <HorizontalTextInput
                variant="outlined"
                label="Registration no."
                sx={{ lineHeight: "1px", mb: "5px" }}
                value={regNumber}
                disabled
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
                value={regNumber}
                disabled
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
            value={email}
            disabled
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <NewPassword />
        </HorizontalContainer>
      </FieldContainer>
      <ErrorMessageContainer sx={{ mt: -3 }}>
        {message && <ErrorMessage severity="error">{message}</ErrorMessage>}
      </ErrorMessageContainer>
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
        <Button
          onClick={() => navigate("/home")}
          size="large"
          variant="text"
          sx={{ mt: "20px", ml: 2 }}
        >
          cancel
        </Button>
      </HorizontalContainer>
    </FieldContainer>
  );
};

export default StudentProfile;
