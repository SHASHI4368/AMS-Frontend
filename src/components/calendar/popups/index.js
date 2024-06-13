import { Dialog } from "@mui/material";
import { DatePicker, DateRangeIcon, DateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import "@fontsource/poppins"; 
import "@fontsource/raleway"; 
import BlockPopup from "./staff/blockPopup";
import { useCalendarContext } from "../../../context/calendar";

const Popup = () => {
  const {popupOpen, setPopupOpen} = useCalendarContext();
  return (
    <Dialog open={popupOpen}>
      <BlockPopup/>
    </Dialog>
  );
};

export default Popup;

