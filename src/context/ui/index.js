import { createContext, useContext, useState, useEffect } from "react";

export const UIContext = createContext();
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const getInitialState = (key, defaultValue) => {
    const savedValue = sessionStorage.getItem(key);
    return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
  };

  const [drawerOpen, setDrawerOpen] = useState(
    getInitialState("drawerOpen", false)
  );
  const [activeStep, setActiveStep] = useState(
    getInitialState("activeStep", 0)
  );
  const [completed, setCompleted] = useState(getInitialState("completed", {}));

  const [department, setDepartment] = useState(
    getInitialState("department", "")
  );
  const [userType, setUserType] = useState(
    getInitialState("userType", "Staff")
  );

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
    saveState("completed", completed);
  }, [completed]);

  useEffect(() => {
    saveState("department", department);
  }, [department]);

  const value = {
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
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
