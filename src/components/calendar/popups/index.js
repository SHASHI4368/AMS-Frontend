import { Dialog } from "@mui/material";
import { DatePicker, DateRangeIcon, DateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import "@fontsource/poppins"; 
import "@fontsource/raleway"; 
import BlockPopup from "./staff/blockPopup";
import { useCalendarContext } from "../../../context/calendar";
import UnblockPopup from "./staff/unblockPopup";

const Popup = () => {
  const {popupOpen, setPopupOpen, aptId, block} = useCalendarContext();
  return (
    <Dialog fullScreen={false} open={popupOpen}>
      {block ? <UnblockPopup/> : <BlockPopup/>}
    </Dialog>
  );
};

export default Popup;

