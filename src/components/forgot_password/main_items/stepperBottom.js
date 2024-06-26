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
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
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
      setAlertMessage("Passwor changed successfully");
      setAlertOpen(true);
      navigate("/");
    }, 1000);
  };

  const sendVerificationMail = async (email, code) => {
    try {
      const url = `https://api.swargadhi.lk/mail/student/verify`;
      const { data } = await axios.post(url, { email, code });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateVerificationCode = async (Email, Verification_Code) => {
    try {
      const url = `https://api.swargadhi.lk/db/tempUser`;
      const { data } = await axios.put(url, { Email, Verification_Code });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTempUser = async (Email, Verification_Code) => {
    try {
      const url = `https://api.swargadhi.lk/db/tempUser`;
      const { data } = await axios.post(url, { Email, Verification_Code });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTempUser = async (Email) => {
    try {
      const url = `https://api.swargadhi.lk/db/tempUser/${Email}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getStudent = async (Email) => {
    try {
      const url = `https://api.swargadhi.lk/db/student/${Email}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getStaff = async (Email) => {
    try {
      const url = `https://api.swargadhi.lk/db/staff/${Email}`;
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
        if (student.length && (!tempUser.length || !tempUser.Verified)) {
          if (!tempUser.length) {
            addTempUser(email, code);
            sendVerificationMail(email, code);
          } else if (tempUser.length && !tempUser.Verified) {
            updateVerificationCode(email, code);
          }
          setMessage("");
          activateLoader(newActiveStep);
        } else {
          setMessage("Email does not exists");
        }
      } else {
        setUserType("Staff");
        const code = `${Math.floor(Math.random() * 10)}${Math.floor(
          Math.random() * 10
        )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
        const staff = await getStaff(email);
        const tempUser = await getTempUser(email);
        if (staff.length && (!tempUser.length || !tempUser.Verified)) {
          if (!tempUser.length) {
            addTempUser(email, code);
            sendVerificationMail(email, code);
          } else if (tempUser.length && !tempUser.Verified) {
            updateVerificationCode(email, code);
          }
          setMessage("");
          activateLoader(newActiveStep);
        } else {
          setMessage("Email does not exists");
        }
      }
    }
  };

  const getPasscode = async (Email) => {
    try {
      const url = `https://api.swargadhi.lk/db/tempUser/passcode/${Email}`;
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

  const updateStudentPassword = async () => {
    try {
      const url = `https://api.swargadhi.lk/db/student/password`;
      const response = await axios.put(url, {
        Email: email,
        Password: newPassword,
      });
      setEmail("");
      setNewPassword("");
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

  const updateStaffPassword = async () => {
    try {
      const url = `https://api.swargadhi.lk/db/staff/password`;
      const response = await axios.put(url, {
        Email: email,
        Password: newPassword,
      });
      setEmail("");
      setNewPassword("");
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
      const url = `https://api.swargadhi.lk/db/tempUser/${Email}`;
      const response = await axios.delete(url);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userType === "Student") {
      if (newPassword === "") {
        setMessage("Please enter a new password");
      } else if (confirmNewPassword === "") {
        setMessage("Please confirm the new password");
      } else if (newPassword !== confirmNewPassword) {
        setMessage("Passwords do not match");
      } else {
        deleteTempUser(email);
        updateStudentPassword();
      }
    } else {
      if (newPassword === "") {
        setMessage("Please enter a new password");
      } else if (confirmNewPassword === "") {
        setMessage("Please confirm the new password");
      } else if (newPassword !== confirmNewPassword) {
        setMessage("Passwords do not match");
      } else {
        deleteTempUser(email);
        updateStaffPassword();
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
                  Change
                </Button>
              ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default StepperBottom;
