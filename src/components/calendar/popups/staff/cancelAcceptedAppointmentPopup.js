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

const CancelAcceptedAppointmentPopup = () => {
  const { socket, selectedStaffEmail, progressOpen, setProgressOpen, email } =
    useUIContext();
  const {
    startTime,
    endTime,
    setPopupOpen,
    aptId,
    setAptId,
    reg,
    setCancelAcceptedAppointmentPopupOpen,
    setChangeTimePopupOpen,
    subject,
    setSubject,
    description,
    setDescription,
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

  const cancelAppointment = async () => {
    setProgressOpen(true);
    try {
      const url = `http://localhost:8080/db/appointment`;
      const response = await axios.put(url, {
        Id: aptId,
        Subject: subject,
        Description: description,
        StartTime: startTime,
        EndTime: endTime,
        Apt_status: "Cancelled",
        Reason: "",
      });
      sendAppointmentCancelMail();
    } catch (err) {
      console.log(err);
    }
  };

  const finishAppointment = async () => {
    setProgressOpen(true);
    try {
      const url = `http://localhost:8080/db/appointment`;
      const response = await axios.put(url, {
        Id: aptId,
        Subject: subject,
        Description: description,
        StartTime: startTime,
        EndTime: endTime,
        Apt_status: "Completed",
        Reason: "",
      });
      sendAppointmentCompleteMail();
    } catch (err) {
      console.log(err);
    }
  };

  const sendAppointmentCompleteMail = async () => {
    const msg = { email };
    const getStudentDetails = async () => {
      try {
        const url = `http://localhost:8080/db/student/details/${reg}`;
        const { data } = await axios.get(url, reg);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    const getStaffDetails = async () => {
      try {
        const url = `http://localhost:8080/db/staff/details/${email}`;
        const { data } = await axios.get(url);
        return data[0];
      } catch (err) {
        console.log(err);
      }
    };
    const staffDetails = await getStaffDetails();
    try {
      const student = await getStudentDetails();
      const stdMail = student[0].Email;
      const url = `http://localhost:8080/mail/student/update/appointment`;
      const subject = "Appointment completed";
      const content = `
        <p>Dear student,</p>
        <p>Your appointment with ${staffDetails.First_name} ${staffDetails.Last_name} has been successfully completed.</p>
        <h2>Appointment Details:</h2>
        <p>Date: ${date}</p>
        <p>Time: ${formattedStartTime} - ${formattedEndTime}</p>
        <br>
        <p>${staffDetails.First_name} ${staffDetails.Last_name}</p>
        <p>${staffDetails.Email}</p>
        <p>${staffDetails.Department}</p>
      `;
      const { data } = await axios.post(url, { stdMail, subject, content });
      socket.emit("change appointment", msg);
      setProgressOpen(false);
      setPopupOpen(false);
      setCancelAcceptedAppointmentPopupOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  const sendAppointmentCancelMail = async () => {
    console.log("cancelled");
    const msg = { email };
    const getStudentDetails = async () => {
      try {
        const url = `http://localhost:8080/db/student/details/${reg}`;
        const { data } = await axios.get(url, reg);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    const getStaffDetails = async () => {
      try {
        const url = `http://localhost:8080/db/staff/details/${email}`;
        const { data } = await axios.get(url);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    try {
      const student = await getStudentDetails();
      const staffDetails = await getStaffDetails();
      console.log(reg);
      const stdMail = student[0].Email;
      const url = `http://localhost:8080/mail/student/update/appointment`;
      const subject = "Appointment cancelled";
      const content = `
        <p>Dear student,</p>
        <p>Your appointment with ${staffDetails[0].First_name} ${staffDetails[0].Last_name} has been cancelled.</p>
        <h2>Appointment Details:</h2>
        <p>Date: ${date}</p>
        <p>Time: ${formattedStartTime} - ${formattedEndTime}</p>
        <br>
        <p>${staffDetails[0].First_name} ${staffDetails[0].Last_name}</p>
        <p>${staffDetails[0].Email}</p>
        <p>${staffDetails[0].Department}</p>
      `;
      const { data } = await axios.post(url, { stdMail, subject, content });
      socket.emit("change appointment", msg);
      setProgressOpen(false);
      setChangeTimePopupOpen(true);
      setCancelAcceptedAppointmentPopupOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setAptId(undefined);
    setPopupOpen(false);
    setCancelAcceptedAppointmentPopupOpen(false);
  };

  return (
    <PopupPaper>
      <TitleContainer>
        <PopupTitle id="responsive-dialog-title">
          {"Cancel Appointment"}
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
            rows={2}
            required
            disabled
            label="Reason"
          />
          <CustomTextField
            label="Description"
            placeholder="Please enter a brief description about the reason"
            multiline
            disabled
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </TextFieldContainer>
      </DialogContent>
      <DialogActions sx={{ mt: -2 }}>
        <PopupButton
          color="success"
          sx={{
            mr: 30,
            [theme.breakpoints.down("sm")]: {
              mr: 5,
            },
          }}
          autoFocus
          onClick={() => finishAppointment()}
        >
          complete
        </PopupButton>
        <PopupButton
          color="primary"
          sx={{
            mr: 4,
            [theme.breakpoints.down("sm")]: {
              mr: 0,
            },
          }}
          autoFocus
          onClick={() => cancelAppointment()}
        >
          unable
        </PopupButton>
        <PopupButton
          color="inherit"
          sx={{ mr: 1 }}
          onClick={() => handleClose()}
          autoFocus
        >
          Close
        </PopupButton>
      </DialogActions>
      <Loader progressOpen={progressOpen} />
    </PopupPaper>
  );
};

export default CancelAcceptedAppointmentPopup;
