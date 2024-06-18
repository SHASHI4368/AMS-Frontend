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
import CancelAppointmentPopup from "./student/cancelAppointmentPopup";
import AcceptAppointmentPopup from "./staff/acceptAppointmentPopup";
import RescheduleAppointmentPopup from "./staff/rescheduleAppointmentPopup";
import ChangeTimePopup from "./staff/changeTimePopup";
import CancelAcceptedAppointmentPopup from "./staff/cancelAcceptedAppointmentPopup";

const Popup = () => {
  const {
    popupOpen,
    setPopupOpen,
    aptId,
    block,
    blockPopupOpen,
    addAppointmentPopupOpen,
    editAppointmentPopupOpen,
    cancelAppointmentPopupOpen,
    acceptAppointmentPopupOpen,
    rescheduleAppointmentPopupOpen,
    cancelAcceptedAppointmentPopupOpen,
    changeTimePopupOpen,
  } = useCalendarContext();
  return (
    <Dialog
      sx={{ overflow: "visible", zIndex: 999 }}
      fullScreen={false}
      open={popupOpen}
    >
      {blockPopupOpen === true && (
        <>{block ? <UnblockPopup /> : <BlockPopup />}</>
      )}
      {addAppointmentPopupOpen === true && <AddAppointmentPopup />}
      {editAppointmentPopupOpen === true && <EditAppointmentPopup />}
      {cancelAppointmentPopupOpen === true && <CancelAppointmentPopup />}
      {acceptAppointmentPopupOpen === true && <AcceptAppointmentPopup />}
      {rescheduleAppointmentPopupOpen === true && (
        <RescheduleAppointmentPopup />
      )}
      {changeTimePopupOpen === true && <ChangeTimePopup />}
      {cancelAcceptedAppointmentPopupOpen === true && (
        <CancelAcceptedAppointmentPopup />
      )}
    </Dialog>
  );
};

export default Popup;
