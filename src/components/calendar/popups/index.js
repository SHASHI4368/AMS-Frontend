import { Dialog } from "@mui/material";
import { DatePicker, DateRangeIcon, DateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import "@fontsource/poppins";
import "@fontsource/raleway";
import BlockPopup from "./staff/blockPopup";
import { useCalendarContext } from "../../../context/calendar";
import UnblockPopup from "./staff/unblockPopup";
import AddAppointmentPopup from "./student/addAppointmentPopup";
import EditAppointmentPopup from "./student/editAppointmentPopup";

const Popup = () => {
  const { popupOpen, setPopupOpen, aptId, block, blockPopupOpen, addAppointmentPopupOpen, editAppointmentPopupOpen } =
    useCalendarContext();
  return (
    <Dialog fullScreen={false} open={popupOpen}>
      {blockPopupOpen === true && (
        <>{block ? <UnblockPopup /> : <BlockPopup />}</>
      )}
      {addAppointmentPopupOpen === true && <AddAppointmentPopup />}
      {editAppointmentPopupOpen === true && <EditAppointmentPopup />}
    </Dialog>
  );
};

export default Popup;
