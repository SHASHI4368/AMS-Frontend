import React, { useEffect, useState } from "react";
import {
  PopupButton,
  PopupButtonContainer,
  PopupDate,
  PopupDivider,
  PopupLabel,
  PopupPaper,
  PopupTitle,
  TextContainer,
  TitleContainer,
} from "../../../../styles/calendar";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useCalendarContext } from "../../../../context/calendar";
import { format } from "date-fns";
import { Colors } from "../../../../styles/theme";
import { lighten } from "polished";
import axios from "axios";
import { useUIContext } from "../../../../context/ui";
import { DateTimePicker } from "@mui/x-date-pickers";

const BlockPopup = () => {
  const { email, socket } = useUIContext();
  const { startTime, endTime, setPopupOpen, setAptId, setBlockPopupOpen } =
    useCalendarContext();
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");

  useEffect(() => {
    setFormattedStartTime(format(new Date(startTime), "EEE MMM dd yyyy HH:mm"));
  }, [startTime]);

  useEffect(() => {
    setFormattedEndTime(format(new Date(endTime), "EEE MMM dd yyyy HH:mm"));
  }, [endTime]);

  const getLastAppointment = async () => {
    try {
      const url = `http://194.238.23.116.nip.io:8080/db/appointment/last`;
      const response = await axios.get(url);
      console.log(response.data);
      if (response.data.length === 0) {
        return 1;
      } else {
        return response.data[0].Id;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addBlockTimeSlot = async () => {
    const id = (await getLastAppointment()) + 1;
    console.log(id);
    try {
      const url = `http://194.238.23.116.nip.io:8080/db/appointment/block`;
      const data = {
        Id: id,
        Lecturer_mail: email,
        StartTime: startTime,
        EndTime: endTime,
      };
      const response = await axios.post(url, data);
      console.log(response.data);
      socket.emit("block time slot");
      setBlockPopupOpen(false);
      setPopupOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setAptId(undefined);
    setBlockPopupOpen(false);
    setPopupOpen(false);
  };

  return (
    <PopupPaper>
      <TitleContainer>
        <PopupTitle id="responsive-dialog-title">
          {"Do you want to block this time slot?"}
        </PopupTitle>
      </TitleContainer>
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
        <PopupButton autoFocus onClick={() => addBlockTimeSlot()}>
          Block
        </PopupButton>
        <PopupButton onClick={() => handleClose()} autoFocus>
          Cancel
        </PopupButton>
      </DialogActions>
    </PopupPaper>
  );
};

export default BlockPopup;
