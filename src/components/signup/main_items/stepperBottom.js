import { Alert, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useUIContext } from "../../../context/ui";
import { useTheme } from "@emotion/react";
import { useSignupContext } from "../../../context/signup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const steps = ["Select faculty email", "Faculty verification", "Enter detals"];

const StepperBottom = () => {
  const {
    activeStep,
    setActiveStep,
    completed,
    setCompleted,
    userType,
    setUserType,
    setAlertOpen,
    setAlertMessage,
    setProgressOpen,
    googleAuth,
  } = useUIContext();
  const {
    staff,
    setStaff,
    email,
    setMessage,
    one,
    two,
    three,
    four,
    position,
    setPosition,
    title,
    setTitle,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    regNo,
    setRegNo,
    setTempRegNo,
    batch,
    setBatch,
    department,
    setDepartment,
    password,
    setPassword,
    setEmail,
  } = useSignupContext();

  const navigate = useNavigate();

  const activateLoader = (newActiveStep) => {
    setProgressOpen(true);
    setTimeout(() => {
      setProgressOpen(false);
      setActiveStep(newActiveStep);
    }, 500);
  };

  const signupLoader = () => {
    setProgressOpen(true);
    setTimeout(() => {
      setProgressOpen(false);
      setActiveStep(0);
      setCompleted({});
      setFirstName("");
      setLastName("");
      setRegNo("");
      setTempRegNo("");
      setBatch("");
      setDepartment("");
      setPassword("");
      setMessage("");
      setEmail("");
      setPosition("");
      setTitle("");
      setStaff({});
      setAlertMessage("Sign up successful");
      setAlertOpen(true);
      navigate("/");
    }, 1000);
  };

  const sendVerificationMail = async (email, code) => {
    console.log("Hello");
    try {
      const url = `https://ams-backend-hvfj.onrender.com/mail/student/verify`;
      const { data } = await axios.post(url, { email, code });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateVerificationCode = async (Email, Verification_Code) => {
    try {
      const url = `https://ams-backend-hvfj.onrender.com/db/tempUser`;
      const { data } = await axios.put(url, { Email, Verification_Code });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTempUser = async (Email, Verification_Code) => {
    try {
      const url = `https://ams-backend-hvfj.onrender.com/db/tempUser`;
      const { data } = await axios.post(url, { Email, Verification_Code });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTempUser = async (Email) => {
    try {
      const url = `https://ams-backend-hvfj.onrender.com/db/tempUser/${Email}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getStudent = async (Email) => {
    try {
      const url = `https://ams-backend-hvfj.onrender.com/db/student/${Email}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getStaff = async (Email) => {
    try {
      const url = `https://ams-backend-hvfj.onrender.com/db/staff/${Email}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmailSelect = async (newActiveStep) => {
    if (email === "") {
      setMessage("Email is required");
    } else if (
      !email.includes("engug.ruh.ac.lk") &&
      !email.includes("eng.ruh.ac.lk")
    ) {
      setMessage("Please enter a valid email");
    } else {
      if (email.includes("engug.ruh.ac.lk")) {
        setUserType("Student");
        const code = `${Math.floor(Math.random() * 10)}${Math.floor(
          Math.random() * 10
        )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
        const student = await getStudent(email);
        const tempUser = await getTempUser(email);
        if (!student.length && (!tempUser.length || !tempUser.Verified)) {
          if (!tempUser.length) {
            addTempUser(email, code);
            sendVerificationMail(email, code);
          } else if (tempUser.length && !tempUser.Verified) {
            updateVerificationCode(email, code);
            sendVerificationMail(email, code);
          }
          setMessage("");
          activateLoader(newActiveStep);
        } else {
          console.log(student);
          console.log(tempUser);
          setMessage("Email already exists");
        }
      } else {
        setUserType("Staff");
        const code = `${Math.floor(Math.random() * 10)}${Math.floor(
          Math.random() * 10
        )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
        const staff = await getStaff(email);
        const tempUser = await getTempUser(email);
        if (!staff.length && (!tempUser.length || !tempUser.Verified)) {
          if (!tempUser.length) {
            addTempUser(email, code);
            sendVerificationMail(email, code);
          } else if (tempUser.length && !tempUser.Verified) {
            updateVerificationCode(email, code);
            sendVerificationMail(email, code);
          }
          setMessage("");
          activateLoader(newActiveStep);
        } else {
          setMessage("Email already exists");
        }
      }
    }
  };

  const getPasscode = async (Email) => {
    try {
      const url = `https://ams-backend-hvfj.onrender.com/db/tempUser/passcode/${Email}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      const code = response.data[0].Verification_Code;
      return code;
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerification = async (newActiveStep) => {
    const passCode = await getPasscode(email);
    if (one === "" || two === "" || three === "" || four === "") {
      setMessage("Please enter the code");
    } else if (`${one}${two}${three}${four}` !== passCode) {
      setMessage("Incorrect code");
    } else {
      setMessage("");
      activateLoader(newActiveStep);
    }
  };

  const addStudent = async (
    Reg_number,
    First_name,
    Last_name,
    Department,
    Email,
    Batch,
    Password
  ) => {
    try {
      const url = `https://ams-backend-hvfj.onrender.com/db/students`;
      const response = await axios.post(url, {
        Reg_number,
        First_name,
        Last_name,
        Department,
        Email,
        Batch,
        Password,
      });
      console.log(response.data.message);
      if (response.data.message === "Error") {
        setMessage("Registration number already exists");
      } else {
        setEmail("");
        signupLoader();
      }
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

  const addStaff = async (
    First_name,
    Last_name,
    Department,
    Email,
    Picture_URL,
    Password,
    Position,
    Title
  ) => {
    try {
      const url = `https://ams-backend-hvfj.onrender.com/db/staff`;
      const response = await axios.post(url, {
        First_name,
        Last_name,
        Department,
        Email,
        Picture_URL,
        Password,
        Position,
        Title,
      });
      setEmail("");
      signupLoader();
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

  const deleteTempUser = async (Email) => {
    try {
      const url = `https://ams-backend-hvfj.onrender.com/db/tempUser/${Email}`;
      const response = await axios.delete(url);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userType === "Student") {
      if (firstName === "") {
        setMessage("First name is required");
      } else if (lastName === "") {
        setMessage("Last name is required");
      } else if (regNo === "") {
        setMessage("Registration number is required");
      } else if (department === "") {
        setMessage("Department is required");
      } else if (password === "") {
        setMessage("Password is required");
      } else {
        deleteTempUser(email);

        addStudent(
          regNo,
          firstName,
          lastName,
          department,
          email,
          batch,
          password
        );
      }
    } else {
      if (firstName === "") {
        setMessage("First name is required");
      } else if (lastName === "") {
        setMessage("Last name is required");
      } else if (position === "") {
        setMessage("Position is required");
      } else if (title === "") {
        setMessage("Title is required");
      } else if (department === "") {
        setMessage("Department is required");
      } else if (password === "") {
        setMessage("Password is required");
      } else {
        const picture = googleAuth
          ? staff.picture
          : "https://www.w3schools.com/howto/img_avatar.png";
        console.log(picture);
        deleteTempUser(email);
        addStaff(
          firstName,
          lastName,
          department,
          email,
          picture,
          password,
          position,
          title
        );
      }
    }
  };

  // ------------------------------------------- Stepper --------------------------------------------------
  const handleNext = () => {
    const newActiveStep = (activeStep + 1) % 3;
    if (newActiveStep === 1) {
      handleEmailSelect(newActiveStep);
    } else if (newActiveStep === 2) {
      handleVerification(newActiveStep);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate("/");
    } else if (activeStep === 1) {
      setActiveStep(0);
    }
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "90%",
        pb: 2,
        [theme.breakpoints.down("md")]: { width: "105%" },
        [theme.breakpoints.down("sm")]: { width: "120%" },
      }}
    >
      {allStepsCompleted() ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button disabled={isLastStep()} onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </Button>
            {activeStep !== steps.length &&
              (completed[activeStep] ? (
                <Typography variant="caption" sx={{ display: "inline-block" }}>
                  Step {activeStep + 1} already completed
                </Typography>
              ) : (
                <Button onClick={handleSubmit} disabled={!isLastStep()}>
                  Sign up
                </Button>
              ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default StepperBottom;
