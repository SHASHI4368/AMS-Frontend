import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const URL = "http://localhost:8080";
const socket = io(URL, {
  autoConnect: false,
});

export const UIContext = createContext();
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const getInitialState = (key, defaultValue) => {
    const savedValue = sessionStorage.getItem(key);
    return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const [token, setToken] = useState(""); 
  const [progressOpen, setProgressOpen] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(
    getInitialState("drawerOpen", false)
  );
  const [activeStep, setActiveStep] = useState(
    getInitialState("activeStep", 0)
  );
  const [completed, setCompleted] = useState(getInitialState("completed", {}));
  const [email, setEmail] = useState(getInitialState("email", ""));
  const [googleAuth, setGoogleAuth] = useState(getInitialState("googleAuth", false));
  const [jwt, setJwt] = useState(getInitialState("jwt", ""));

  const [department, setDepartment] = useState(
    getInitialState("department", "")
  );
  const [userType, setUserType] = useState(
    getInitialState("userType", "Student")
  );

  // Login page
  const [authorized, setAuthorized] = useState(
    getInitialState("authorized", false)
  );
  const [regNumber, setRegNumber] = useState(getInitialState("regNumber", ""));

  const saveState = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    saveState("drawerOpen", drawerOpen);
  }, [drawerOpen]);

  useEffect(() => {
    saveState("jwt", jwt);
  }, [jwt]);

  useEffect(() => {
    saveState("authorized", authorized);
  }, [authorized]);


  useEffect(() => {
    saveState("activeStep", activeStep);
  }, [activeStep]);

  useEffect(() => {
    saveState("userType", userType);
  }, [userType]);

  useEffect(() => {
    saveState("googleAuth", googleAuth);
  }, [googleAuth]);

  useEffect(() => {
    saveState("email", email);
  }, [email]);

  useEffect(() => {
    saveState("completed", completed);
  }, [completed]);

  useEffect(() => {
    saveState("department", department);
  }, [department]);

  useEffect(() => {
    const getStdToken = async () => {
      try {
        const config = {
          headers: { Authorization: jwt }
        };
        const url = `http://localhost:8080/db/student/refresh`;
        const response = await axios.get(url, config);
        const accessToken = response.data.accessToken;
        setToken(accessToken);
      } catch (err) {
        setAuthorized(false);
      }
    };

    const getStaffToken = async () => {
      try {
        const config = {
          headers: { Authorization: jwt },
        };
        const url = `http://localhost:8080/db/staff/refresh`;
        const response = await axios.get(url, config);
        const accessToken = response.data.accessToken;
        setToken(accessToken);
      } catch (err) {
        setAuthorized(false);
      }
    };


    if (userType === "Student") {
      getStdToken()
    } else {
      getStaffToken();
    }
  }, []);

  useEffect(() => {
    if (token !== undefined && token !== "") {
      console.log(token);
      socket.connect();
      setAuthorized(true);
    }
  }, [token]);

  const value = {
    
    socket,
    email,
    setEmail,
    alertOpen,
    setAlertOpen,
    progressOpen,
    setProgressOpen,
    alertMessage,
    setAlertMessage,
    drawerOpen,
    setDrawerOpen,
    activeStep,
    setActiveStep,
    completed,
    setCompleted,
    department,
    setDepartment,
    userType,
    setUserType,
    // Login page
    authorized,
    setAuthorized,
    regNumber,
    setRegNumber,
    googleAuth,
    setGoogleAuth,
    jwt,
    setJwt,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
