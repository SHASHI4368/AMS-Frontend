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
  // Functions
  const getInitialState = (key, defaultValue) => {
    const savedValue = sessionStorage.getItem(key);
    return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
  };

  const saveState = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  // Common States
  const [alertOpen, setAlertOpen] = useState(false);
  const [token, setToken] = useState("");
  const [progressOpen, setProgressOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(
    getInitialState("drawerOpen", false)
  );
  useEffect(() => {
    saveState("drawerOpen", drawerOpen);
  }, [drawerOpen]);

  const [email, setEmail] = useState(getInitialState("email", ""));
  useEffect(() => {
    saveState("email", email);
  }, [email]);

  const [authorized, setAuthorized] = useState(
    getInitialState("authorized", false)
  );
  useEffect(() => {
    saveState("authorized", authorized);
  }, [authorized]);

  const [jwt, setJwt] = useState(getInitialState("jwt", ""));
  useEffect(() => {
    saveState("jwt", jwt);
  }, [jwt]);

  const [userType, setUserType] = useState(
    getInitialState("userType", "Student")
  );

  useEffect(() => {
    saveState("userType", userType);
  }, [userType]);

  // Signup page states
  const [activeStep, setActiveStep] = useState(
    getInitialState("activeStep", 0)
  );
  useEffect(() => {
    saveState("activeStep", activeStep);
  }, [activeStep]);

  const [completed, setCompleted] = useState(getInitialState("completed", {}));
  useEffect(() => {
    saveState("completed", completed);
  }, [completed]);

  // Login page
  const [googleAuth, setGoogleAuth] = useState(
    getInitialState("googleAuth", false)
  );
  useEffect(() => {
    saveState("googleAuth", googleAuth);
  }, [googleAuth]);

  const [regNumber, setRegNumber] = useState(getInitialState("regNumber", ""));
  useEffect(() => {
    saveState("regNumber", regNumber);
  }, [regNumber]);

  // department and calendar page states
  const [staffList, setStaffList] = useState(getInitialState("staffList", []));
  useEffect(() => {
    saveState("staffList", staffList);
  }, [staffList]);

  const [department, setDepartment] = useState(
    getInitialState("department", "")
  );
  useEffect(() => {
    saveState("department", department);
  }, [department]);

  const [selectedStaffEmail, setSelectedStaffEmail] = useState(getInitialState("selectedStaffEmail", ""));
  useEffect(() => {
    saveState("selectedStaffEmail", selectedStaffEmail);
  }, [selectedStaffEmail]);

  const [staff, setStaff] = useState(getInitialState("staff", {}));
  useEffect(() => {
    saveState("staff", staff);
  }, [staff]);

  const [studentAppointments, setStudentAppointments] = useState(getInitialState("studentAppointments", []));
  useEffect(() => {
    saveState("studentAppointments", studentAppointments);
  }, [studentAppointments]);

  // refresh management
  useEffect(() => {
    const getStdToken = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
        };
        const url = `http://localhost:8080/db/student/refresh`;
        const response = await axios.post(url, null, config); // 'null' for the data parameter
        const accessToken = response.data.accessToken;
        setToken(accessToken);
      } catch (err) {
        console.error(err);
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
      getStdToken();
    } else {
      getStaffToken();
    }
  }, []);

  useEffect(() => {
    if (token !== undefined && token !== "") {
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
    staffList,
    setStaffList,
    selectedStaffEmail,
    setSelectedStaffEmail,
    staff,
    setStaff,
    studentAppointments,
    setStudentAppointments,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
