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
  const [block, setBlock] = useState(false);
  const [blockPopupOpen, setBlockPopupOpen] = useState(false);
  const [addAppointmentPopupOpen, setAddAppointmentPopupOpen] = useState(false);
  const [editAppointmentPopupOpen, setEditAppointmentPopupOpen] = useState(false);
  const [cancelAppointmentPopupOpen, setCancelAppointmentPopupOpen] = useState(false);
  const [acceptAppointmentPopupOpen, setAcceptAppointmentPopupOpen] = useState(false);
  const [rescheduleAppointmentPopupOpen, setRescheduleAppointmentPopupOpen] = useState(false);
  const [changeTimePopupOpen, setChangeTimePopupOpen] = useState(false);
  const [cancelAcceptedAppointmentPopupOpen, setCancelAcceptedAppointmentPopupOpen] = useState(false);
  const [aptId, setAptId] = useState(undefined);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const [reg, setReg] = useState("");

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
    block,
    setBlock,
    blockPopupOpen,
    setBlockPopupOpen,
    addAppointmentPopupOpen,
    setAddAppointmentPopupOpen,
    editAppointmentPopupOpen,
    setEditAppointmentPopupOpen,
    cancelAppointmentPopupOpen,
    setCancelAppointmentPopupOpen,
    acceptAppointmentPopupOpen,
    setAcceptAppointmentPopupOpen,
    rescheduleAppointmentPopupOpen,
    setRescheduleAppointmentPopupOpen,
    cancelAcceptedAppointmentPopupOpen,
    setCancelAcceptedAppointmentPopupOpen,
    changeTimePopupOpen,
    setChangeTimePopupOpen,
    subject,
    setSubject,
    description,
    setDescription,
    reason,
    setReason,
    reg,
    setReg,
  };
  return (
    <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>
  );
};
