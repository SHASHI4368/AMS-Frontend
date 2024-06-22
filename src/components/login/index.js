import { Alert, Box, Tooltip, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Colors } from "../../styles/theme";
import {
  ButtonContainer,
  ErrorMessage,
  ErrorMessageContainer,
  GoogleIcon,
  GoogleLoginButton,
  LoginButton,
  LoginContainer,
  LoginHeader,
  LoginInput,
  LoginPaper,
  MyLink,
} from "../../styles/login";
import LoginPassword from "./loginPassword";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUIContext } from "../../context/ui";
import Loader from "../signup/other/loader";
import { se } from "date-fns/locale";

const Login = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [trueLogin, setTrueLogin] = useState(false);
  const {
    authorized,
    setAuthorized,
    setRegNumber,
    setEmail,
    progressOpen,
    setProgressOpen,
    googleAuth,
    setGoogleAuth,
    setUserType,
    socket,
    setJwt,
    setStudentAppointments,
    setStaffAppointments,
    regNumber,
    setAlertOpen,
    setAlertMessage,
  } = useUIContext();

  const navigate = useNavigate();
  const theme = useTheme();
  axios.defaults.withCredentials = true;

  const getRegNumber = async (Email) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/student/regnumber/${Email}`;
      const response = await axios.get(url);
      console.log(response.data[0].Reg_number);
      setRegNumber(response.data[0].Reg_number);
    } catch (err) {
      console.log(err);
    }
  };

  

  const handleStdLogin = async (Email, Password) => {
    const getStudentAppointments = async () => {
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/db/student/appointments/${regNumber}`;
        const response = await axios.get(url);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    };
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/student/login`;
      const response = await axios.post(url, { Email, Password });
      if (response.data.Status === "Success") {
        setJwt(response.data.RefreshToken);
        setAuthorized(true);
        getRegNumber(Email);
        setUserType("Student");
        console.log("Login successful");
        setProgressOpen(true);
        const appointments = await getStudentAppointments();
        setStudentAppointments(appointments);
        setTimeout(() => {
          console.log(progressOpen);
          setProgressOpen(false);
          setEmail(Email);
          socket.connect();
          navigate("/home");
        }, 500);
      } else {
        setMessage("Invalid email or password");
      }
    } catch (err) {
      console.log(err.message);
      setMessage("Invalid email or password");
    }
  };

  const handleStaffLogin = async (Email, Original_password) => {
    const getStaffAppointments = async () => {
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/db/appointments/${Email}`;
        const response = await axios.get(url);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    };
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/staff/login`;
      const body = { Email, Original_password };
      const response = await axios.post(url, body, { withCredentials: true });
      if (response.data.Status === "Success") {
        setJwt(response.data.RefreshToken);
        setAuthorized(true);
        console.log("Login successful");
        setProgressOpen(true);
        const appointments = await getStaffAppointments();
        setStaffAppointments(appointments);
        setTempEmail("");
        setUserType("Staff");
        setAuthorized(true);
        setEmail(Email);
        setTimeout(() => {
          setProgressOpen(false);
          setEmail(Email);
          socket.connect();
          navigate("/home");
        }, 200);
      } else {
        setMessage("Invalid email or password");
      }
    } catch (err) {
      console.log(err.message);
      setMessage("Invalid email or password");
    }
  };

  const handleSubmit = async (e) => {
    if (tempEmail === "" || password === "") {
      setMessage("Please fill all the fields");
    } else if (
      !tempEmail.includes("engug.ruh.ac.lk") &&
      !tempEmail.includes("eng.ruh.ac.lk")
    ) {
      setMessage("Invalid email");
    } else {
      if (tempEmail.includes("eng.ruh.ac.lk")) {
        handleStaffLogin(tempEmail, password);
      } else {
        handleStdLogin(tempEmail, password);
      }
    }
  };

  const getStaffPassword = async (Email) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/staff/password/${Email}`;
      const response = await axios.get(url);
      return response.data[0].Original_password;
    } catch (err) {
      console.log(err);
    }
  };
  const checkStaffIsThere = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/staff/${tempEmail}`;
      const response = await axios.get(url);
      if (response.data[0] !== undefined) {
        const password = await getStaffPassword(tempEmail);
        console.log(password);
        handleStaffLogin(tempEmail, password);
      }
    } catch (err) {
      console.log(err);
      if (tempEmail.includes("eng.ruh.ac.lk")) {
        setMessage("You don't have an account. Please sign up first");
      } else {
        setMessage("Invalid email");
      }
    }
  };

useEffect(() => {
  if (!authorized) {
    const getStaff = async () => {
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        if (data.error === false && googleAuth) {
          console.log("User data fetched successfully:", data.user);
          setTempEmail(data.user._json.email);
          setTrueLogin(true);
          setGoogleAuth(false);
          checkStaffIsThere();
        } else {
          console.log("User not authorized or Google Auth flag is false");
        }
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    };
    getStaff();
  } else {
    setAlertOpen(true);
    setAlertMessage("Please log out first");
    navigate("/home");
  }
}, [authorized, googleAuth]);

useEffect(() => {
  if (trueLogin) {
    console.log("trueLogin is set, proceeding with staff check and submit");
    setTrueLogin(false);
    checkStaffIsThere();
    handleSubmit();
  }
}, [trueLogin]);


  useEffect(() => {
    if (trueLogin) {
      setTrueLogin(false);
      checkStaffIsThere();
      handleSubmit();
    }
  }, [trueLogin]);

  const handleGoogleAuth = (e, action) => {
    e.preventDefault();
    setGoogleAuth(true);
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google?action=${action}`, "_self");
  };

  return (
    <LoginContainer sx={{ paddingTop: "100px" }}>
      <LoginPaper>
        <LoginHeader variant="h5">
          Welcome to the Appointment Management System !
        </LoginHeader>
        <LoginHeader
          variant="h2"
          sx={{ mt: -4, color: Colors.dim_grey, fontSize: "40px" }}
        >
          Login
        </LoginHeader>
        <ButtonContainer>
          <LoginInput
            variant="outlined"
            label="University email"
            sx={{ lineHeight: "1px" }}
            value={tempEmail}
            onChange={(e) => setTempEmail(e.target.value)}
          />
          <LoginPassword password={password} setPassword={setPassword} />
          <ErrorMessageContainer>
            {message && <ErrorMessage severity="error">{message}</ErrorMessage>}
          </ErrorMessageContainer>
          <MyLink
            onClick={() => navigate("/password")}
            color={Colors.dim_grey}
            underline="hover"
            sx={{ mt: 3 }}
          >
            Forgot password ?
          </MyLink>
          <LoginButton
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Login
          </LoginButton>
          <Tooltip title="Only for staff members" placement="bottom">
            <GoogleLoginButton
              onClick={(e) => handleGoogleAuth(e, "login")}
              variant="contained"
              color="primary"
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <GoogleIcon
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="google"
                />
                Login{" "}
                <span style={{ margin: "0 5px", textTransform: "lowercase" }}>
                  {" "}
                  with{" "}
                </span>{" "}
                Google
              </Box>
            </GoogleLoginButton>
          </Tooltip>
          <MyLink
            onClick={() => navigate("/signup")}
            color={Colors.dim_grey}
            underline="hover"
            sx={{
              mt: 5,
              [theme.breakpoints.down("sm")]: {
                fontSize: "12px",
              },
            }}
          >
            Don't have an account ? Sign up
          </MyLink>
        </ButtonContainer>
        <Loader progressOpen={progressOpen} />
      </LoginPaper>
    </LoginContainer>
  );
};

export default Login;
