import React, { useEffect, useState } from "react";
import {
  PopupButton,
  PopupButtonContainer,
  PopupDate,
  PopupDivider,
  PopupLabel,
  PopupPaper,
  PopupTitle,
} from "../../../../styles/calendar";
import { useCalendarContext } from "../../../../context/calendar";
import { format } from "date-fns";
import axios from "axios";
import { useUIContext } from "../../../../context/ui";
import { DialogActions, DialogContent, DialogContentText, Typography } from "@mui/material";

const UnblockPopup = () => {
  const { socket } = useUIContext();
  const { startTime, endTime, setPopupOpen, aptId, setAptId } = useCalendarContext();
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");

  useEffect(() => {
    setFormattedStartTime(format(new Date(startTime), "EEE MMM dd yyyy HH:mm"));
  }, [startTime]);

  useEffect(() => {
    setFormattedEndTime(format(new Date(endTime), "EEE MMM dd yyyy HH:mm"));
  }, [endTime]);

  const deleteBlockTimeSlot = async () => {
    console.log(aptId);
    try {
      const url = `http://localhost:8080/db/appointment/${aptId}`;
      const response = await axios.delete(url);
      console.log(response.data);
      socket.emit("delete appointment");
      setPopupOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
   setAptId(undefined);
    setPopupOpen(false);
  };

  return (
   <PopupPaper>
      <PopupTitle id="responsive-dialog-title">
        {"Do you want to unblock this time slot?"}
      </PopupTitle>
      <PopupDivider />
      <DialogContent>
        <DialogContentText>
          <Typography>From:</Typography>
        </DialogContentText>
        <DialogContentText>
          <PopupDate>{formattedStartTime}</PopupDate>
        </DialogContentText>
        <DialogContentText>
          <Typography>To:</Typography>
        </DialogContentText>
        <DialogContentText>
          <PopupDate>{formattedEndTime}</PopupDate>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <PopupButton autoFocus onClick={() => deleteBlockTimeSlot()}>
          Unblock
        </PopupButton>
        <PopupButton onClick={() => handleClose()} autoFocus>
          Cancel
        </PopupButton>
      </DialogActions>
    </PopupPaper>
  );
};

export default UnblockPopup;
