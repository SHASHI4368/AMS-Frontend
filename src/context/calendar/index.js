import { createContext, useContext, useEffect, useState } from "react";

export const CalendarContext = createContext();
export const useCalendarContext = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {

  const getInitialState = (key, defaultValue) => {
    const savedValue = sessionStorage.getItem(key);
    return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
  };
  const [email, setEmail] = useState(getInitialState("email", ""));
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [aptId, setAptId] = useState(undefined);

  const saveState = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    saveState("email", email);
  }, [email]);

 

  const value = {
    email,
    setEmail,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    aptId,
    setAptId,
    popupOpen,
    setPopupOpen,

  };
  return (
    <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>
  );
};
