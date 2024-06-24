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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Loader from "../../../signup/other/loader";

const CancelAppointmentPopup = () => {
  const {
    socket,
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
    setAptId,
    setCancelAppointmentPopupOpen,
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

  const updateAppointment = async () => {
    setProgressOpen(true);
    try {
      const url = `http://194.238.23.116:8080/db/appointment`;
      const data = {
        Id: aptId,
        Subject: subject,
        Description: description,
        StartTime: startTime,
        EndTime: endTime,
        Apt_status: "Cancelled",
        Reason: reason,
      };
      const response = await axios.put(url, data);
      sendAppointmentChangeMail();
    } catch (err) {
      console.log(err);
    }
  };

  const sendAppointmentChangeMail = async () => {
    const getStudentDetails = async () => {
      try {
        const url = `http://194.238.23.116:8080/db/student/details/${regNumber}`;
        const { data } = await axios.get(url, regNumber);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    try {
      const student = await getStudentDetails(regNumber);
      const url = `http://194.238.23.116:8080/mail/student/request/appointment`;
      const deleteURL = `http://194.238.23.116:8080/db/appointment/delete/${aptId}`;
      const subject = "Notifying of Appointment Cancellation";
      const content = `
        <h2>Student Details:</h2>
        <p>Reg Number: ${regNumber}</p>
        <p>Name: ${student[0].First_name} ${student[0].Last_name}</p>
        <p>Department: ${student[0].Department}</p>
        <p>Email: ${student[0].Email}</p>
        <p>Batch: ${student[0].Batch}</p>
        <br>
        <h2>Appointment Description:</h2>
        <p>Subject: ${subject}</p>
        <p>Date: ${date}</p>
        <p>Time: ${formattedStartTime} - ${formattedEndTime}</p>
        <p>Description: ${description}</p>
        <br>
        <h2>Reason for Cancellation:</h2>
        <p>${reason}</p>
        <a href="${deleteURL}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: red; text-align: center; text-decoration: none; border-radius: 5px;">Delete Appointment</a>
      `;
      const { data } = await axios.post(url, {
        lecMail: selectedStaffEmail,
        subject,
        content,
      });
      const msg = { lecMail: selectedStaffEmail };
      socket.emit("change appointment", msg);
      setProgressOpen(false);
      setPopupOpen(false);
      setCancelAppointmentPopupOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setAptId(undefined);
    setPopupOpen(false);
    setCancelAppointmentPopupOpen(false);
  };

  return (
    <PopupPaper>
      <TitleContainer>
        <PopupTitle id="responsive-dialog-title">
          {"Cancel your appointment"}
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
          <CustomTextField
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            multiline
            rows={1}
            required
            disabled
            label="Reason"
          />
          <CustomTextField
            label="Description"
            placeholder="Please enter a brief description about the reason"
            multiline
            rows={3}
            disabled
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <CustomTextField
            label="Reason for unavailability"
            placeholder="Please enter a brief description about the reason and any alternative times you are available for the appointment"
            multiline
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </TextFieldContainer>
      </DialogContent>
      <DialogActions sx={{ mt: -2 }}>
        <PopupButton
          sx={{ mr: 2 }}
          autoFocus
          onClick={() => updateAppointment()}
        >
          change
        </PopupButton>
        <PopupButton onClick={() => handleClose()} autoFocus>
          Cancel
        </PopupButton>
      </DialogActions>
      <Loader progressOpen={progressOpen} />
    </PopupPaper>
  );
};

export default CancelAppointmentPopup;
