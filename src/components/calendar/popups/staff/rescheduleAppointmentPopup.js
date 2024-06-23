import React, { useEffect, useState } from "react";
import {
  CustomTextField,
  DateTimeContainer,
  DateTimeSection,
  PopupButton,
  PopupDate,
  PopupPaper,
  PopupTitle,
  TextFieldContainer,
  TitleContainer,
} from "../../../../styles/calendar";
import { useCalendarContext } from "../../../../context/calendar";
import { format } from "date-fns";
import axios from "axios";
import { useUIContext } from "../../../../context/ui";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Loader from "../../../signup/other/loader";

const RescheduleAppointmentPopup = () => {
  const {
    socket,
    email,
    selectedStaffEmail,
    regNumber,
    progressOpen,
    setProgressOpen,
  } = useUIContext();
  const {
    startTime,
    endTime,
    setPopupOpen,
    aptId,
    reg,
    setAptId,
    setRescheduleAppointmentPopupOpen,
    setChangeTimePopupOpen,
    subject,
    setSubject,
    description,
    setDescription,
    reason,
    setReason,
  } = useCalendarContext();
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");
  const [date, setDate] = useState("");
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setFormattedStartTime(format(new Date(startTime), "HH:mm"));
    setDate(format(new Date(startTime), "EEE MMM dd yyyy"));
  }, [startTime]);

  useEffect(() => {
    setFormattedEndTime(format(new Date(endTime), "HH:mm"));
  }, [endTime]);

  const deleteAppointment = async (Id, EventType, StdReg) => {
    setProgressOpen(true);
    try {
      const url = `https://ams-backend-hvfj.onrender.com/db/appointment/${aptId}`;
      const response = await axios.delete(url);

      const msg = { email, EventType };
      sendAppointmentDeleteMail();
    } catch (err) {
      console.log(err);
    }
  };

  const sendAppointmentDeleteMail = async () => {
    console.log("hello");
    const getStudentDetails = async () => {
      try {
        const url = `https://ams-backend-hvfj.onrender.com/db/student/details/${reg}`;
        const { data } = await axios.get(url, reg);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    const getStaffDetails = async () => {
      try {
        const url = `https://ams-backend-hvfj.onrender.com/db/staff/details/${email}`;
        const { data } = await axios.get(url);
        return data[0];
      } catch (err) {
        console.log(err);
      }
    };
    try {
      console.log(aptId);
      const student = await getStudentDetails();
      const staffDetails = await getStaffDetails();
      console.log(staffDetails);
      const stdMail = student[0].Email;
      const url = `https://ams-backend-hvfj.onrender.com/mail/student/update/appointment`;
      const subject = "Your appointment has been removed";
      const content = `
        <p>Dear student,</p>
        <p>Your appointment with ${staffDetails.First_name} ${staffDetails.Last_name} has been removed.</p>
      `;
      const { data } = await axios.post(url, { stdMail, subject, content });
      const msg = { email, EventType: "Cancelled" };
      socket.emit("delete appointment", msg);
      setProgressOpen(false);
      setPopupOpen(false);
      setRescheduleAppointmentPopupOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeTime = () => {
    setChangeTimePopupOpen(true);
    setRescheduleAppointmentPopupOpen(false);
  };

  const handleClose = () => {
    setAptId(undefined);
    setPopupOpen(false);
    setRescheduleAppointmentPopupOpen(false);
  };

  return (
    <PopupPaper>
      <TitleContainer>
        <PopupTitle id="responsive-dialog-title">
          {"Reschedule Appointment"}
        </PopupTitle>
      </TitleContainer>
      <DialogContent>
        {small && (
          <>
            <DialogContentText>
              <Typography>On</Typography>
            </DialogContentText>
            <DialogContentText>
              <PopupDate>{date}</PopupDate>
            </DialogContentText>
            <DateTimeContainer>
              <DateTimeSection sx={{ flexGrow: 1 }}>
                <DialogContentText>
                  <Typography>From</Typography>
                </DialogContentText>
                <DialogContentText>
                  <PopupDate>{formattedStartTime}</PopupDate>
                </DialogContentText>
              </DateTimeSection>
              <DateTimeSection sx={{ flexGrow: 1 }}>
                <DialogContentText>
                  <Typography>To:</Typography>
                </DialogContentText>
                <DialogContentText>
                  <PopupDate>{formattedEndTime}</PopupDate>
                </DialogContentText>
              </DateTimeSection>
            </DateTimeContainer>
          </>
        )}
        {!small && (
          <>
            <DateTimeContainer>
              <DateTimeSection sx={{ width: "2000px" }}>
                <DialogContentText>
                  <Typography>On</Typography>
                </DialogContentText>
                <DialogContentText>
                  <PopupDate>{date}</PopupDate>
                </DialogContentText>
              </DateTimeSection>
              <DateTimeSection sx={{ flexGrow: 1 }}>
                <DialogContentText>
                  <Typography>From</Typography>
                </DialogContentText>
                <DialogContentText>
                  <PopupDate>{formattedStartTime}</PopupDate>
                </DialogContentText>
              </DateTimeSection>
              <DateTimeSection sx={{ flexGrow: 1 }}>
                <DialogContentText>
                  <Typography>To:</Typography>
                </DialogContentText>
                <DialogContentText>
                  <PopupDate>{formattedEndTime}</PopupDate>
                </DialogContentText>
              </DateTimeSection>
            </DateTimeContainer>
          </>
        )}
        <TextFieldContainer>
          <Tooltip title="For students">
            <CustomTextField
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              multiline
              rows={1}
              required
              disabled
              label="Reason"
            />
          </Tooltip>
          <Tooltip title="For students">
            <CustomTextField
              label="Description"
              placeholder="Please enter a brief description about the reason"
              multiline
              rows={small ? 2 : 3}
              disabled
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Tooltip>
          <Tooltip title="For students">
            <CustomTextField
              label="Reason for unavailability"
              placeholder="Please enter a brief description about the reason and any alternative times you are available for the appointment"
              multiline
              disabled
              rows={small ? 2 : 3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Tooltip>
        </TextFieldContainer>
      </DialogContent>
      <DialogActions
        sx={{
          mt: -2,
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
        }}
      >
        <PopupButton
          color="error"
          sx={{
            mr: 30,
            [theme.breakpoints.down("sm")]: {
              mr: 0,
              fontSize: "14px",
            },
          }}
          autoFocus
          onClick={() => deleteAppointment()}
        >
          delete
        </PopupButton>
        <PopupButton
          sx={{
            mr: 2,
            [theme.breakpoints.down("sm")]: {
              mr: 1,
              fontSize: "14px",
            },
          }}
          autoFocus
          onClick={() => handleChangeTime()}
        >
          reschedule
        </PopupButton>
        <PopupButton
          sx={{
            [theme.breakpoints.down("sm")]: {
              mr: -1,
              fontSize: "14px",
            },
          }}
          onClick={() => handleClose()}
          autoFocus
        >
          Cancel
        </PopupButton>
      </DialogActions>
      <Loader progressOpen={progressOpen} />
    </PopupPaper>
  );
};

export default RescheduleAppointmentPopup;
