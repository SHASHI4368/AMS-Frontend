import { Alert, Box, Tooltip } from "@mui/material";
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

const Login = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [trueLogin, setTrueLogin] = useState(false);
  const {
    setAuthorized,
    setRegNumber,
    setEmail,
    progressOpen,
    setProgressOpen,
    googleAuth,
    setGoogleAuth,
    setUserType,
  } = useUIContext();

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const getRegNumber = async (Email) => {
    try {
      const url = `http://localhost:8080/db/student/regnumber/${Email}`;
      const response = await axios.get(url);
      console.log(response.data[0].Reg_number);
      setRegNumber(response.data[0].Reg_number);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStdLogin = async (Email, Password) => {
    try {
      const url = `http://localhost:8080/db/student/login`;
      const response = await axios.post(url, { Email, Password });
      if (response.data.Status === "Success") {
        sessionStorage.setItem(
          "jwt",
          JSON.stringify(response.data.RefreshToken)
        );
        setAuthorized(true);
        getRegNumber(Email);
        setUserType("Student");
        console.log("Login successful");
        //socket.connect();
        setProgressOpen(true);
        setTimeout(() => {
          console.log(progressOpen);
          setProgressOpen(false);
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
    try {
      const url = `http://localhost:8080/db/staff/login`;
      const body = { Email, Original_password };
      const response = await axios.post(url, body, { withCredentials: true });
      if (response.data.Status === "Success") {
        sessionStorage.setItem(
          "jwt",
          JSON.stringify(response.data.RefreshToken)
        );
        sessionStorage.setItem("authorized", JSON.stringify(true));
        console.log("Login successful");
        // socket.connect();
        setProgressOpen(true);
        setTempEmail("");
        setUserType("Staff");
        setAuthorized(true);
        setEmail(Email);
        setTimeout(() => {
          setProgressOpen(false);
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
      const url = `http://localhost:8080/db/staff/password/${Email}`;
      const response = await axios.get(url);
      return response.data[0].Original_password;
    } catch (err) {
      console.log(err);
    }
  };
  const checkStaffIsThere = async () => {
    try {
      const url = `http://localhost:8080/db/staff/${tempEmail}`;
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
    const getStaff = async () => {
      try {
        const url = `http://localhost:8080/auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        if (data.error === false && googleAuth) {
          console.log(data.user._json.email);
          setTempEmail(data.user._json.email);
          setTrueLogin(true);
          setGoogleAuth(false);
          checkStaffIsThere();
        }
      } catch (err) {
        console.log(err);
      }
    };
    getStaff();
  }, []);

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
    window.open(`http://localhost:8080/auth/google?action=${action}`, "_self");
  };

  return (
    <LoginContainer>
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
            href="#"
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
            sx={{ mt: 5 }}
          >
            Don't have an account ? Sign up
          </MyLink>
        </ButtonContainer>
        <Loader progeressOpen={progressOpen} />
      </LoginPaper>
    </LoginContainer>
  );
};

export default Login;
