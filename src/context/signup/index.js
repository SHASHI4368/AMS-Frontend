import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const SignupContext = createContext();
export const useSignupContext = () => useContext(SignupContext);

export const SignupProvider = ({ children }) => {
  const getInitialState = (key, defaultValue) => {
    const savedValue = sessionStorage.getItem(key);
    return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
  };
  const [stdEmail, setStdEmail] = useState(getInitialState("stdEmail", ""));
  const [message, setMessage] = useState("");
  
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [tempRegNo, setTempRegNo] = useState("");
  const [batch, setBatch] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");

  const saveState = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

    useEffect(() => {
      saveState("stdEmail", stdEmail);
    }, [stdEmail]);

  const value = {
    stdEmail, setStdEmail,
    message, setMessage,
    one, setOne, two, setTwo, three, setThree, four, setFour,
    firstName, setFirstName,
    lastName, setLastName,
    regNo, setRegNo,
    tempRegNo, setTempRegNo,
    batch, setBatch, 
    department, setDepartment,
    password, setPassword,

  };
  return <SignupContext.Provider value={value}>{children}</SignupContext.Provider>;
};
