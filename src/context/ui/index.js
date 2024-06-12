import { createContext, useContext, useState, useEffect } from "react";

export const UIContext = createContext();
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const getInitialState = (key, defaultValue) => {
    const savedValue = sessionStorage.getItem(key);
    return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
  };

  const [alertOpen, setAlertOpen] = useState(false);
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

  const value = {
    

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
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
