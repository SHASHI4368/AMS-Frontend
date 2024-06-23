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

const EditAppointmentPopup = () => {
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
    setEditAppointmentPopupOpen,
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

  const updateAppointment = async () => {
    setProgressOpen(true);
    try {
      const url = `http://localhost:8080/db/appointment`;
      const data = {
        Id: setAptId,
        Subject: subject,
        Description: description,
        StartTime: startTime,
        EndTime: endTime,
        Apt_status: "New",
        Reason: "",
      };
      const response = await axios.put(url, data);
      sendAppointmentChangeMail();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAppointment = async () => {
    setProgressOpen(true);
    try {
      const url = `http://localhost:8080/db/appointment/${aptId}`;
      const response = await axios.delete(url);
      sendAppointmentDeleteMail();
    } catch (err) {
      console.log(err);
    }
  };

  const sendAppointmentDeleteMail = async () => {
    const getStudentDetails = async () => {
      try {
        const url = `http://localhost:8080/db/student/details/${regNumber}`;
        const { data } = await axios.get(url, regNumber);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    try {
      const student = await getStudentDetails(regNumber);
      const url = `http://localhost:8080/mail/student/request/appointment`;
      const subject = "Student removed the appointment";
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
      `;
      const { data } = await axios.post(url, {
        lecMail: selectedStaffEmail,
        subject,
        content,
      });
      const msg = { lecMail: selectedStaffEmail };
      socket.emit("delete appointment", msg);
      setProgressOpen(false);
      setPopupOpen(false);
      setEditAppointmentPopupOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const sendAppointmentChangeMail = async () => {
    const getStudentDetails = async () => {
      try {
        const url = `http://localhost:8080/db/student/details/${regNumber}`;
        const { data } = await axios.get(url, regNumber);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    try {
      const student = await getStudentDetails(regNumber);
      const url = `http://localhost:8080/mail/student/request/appointment`;
      const acceptUrl = `http://localhost:8080/db/appointment/accept/${aptId}`;
      const subject = "Change of appointment details";
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
        <a href="${acceptUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: green; text-align: center; text-decoration: none; border-radius: 5px;">Accept Appointment</a>
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
      setEditAppointmentPopupOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setAptId(undefined);
    setPopupOpen(false);
    setEditAppointmentPopupOpen(false);
  };

  return (
    <PopupPaper>
      <TitleContainer>
        <PopupTitle id="responsive-dialog-title">
          {"Change your appointment details"}
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
            label="Reason"
          />
          <CustomTextField
            label="Description"
            placeholder="Please enter a brief description about the reason"
            multiline
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </TextFieldContainer>
      </DialogContent>
      <DialogActions sx={{ mt: -2 }}>
        <PopupButton
          color="error"
          sx={{
            mr: 30,
            [theme.breakpoints.down("sm")]: {
              mr: 1,
            },
          }}
          autoFocus
          onClick={() => deleteAppointment()}
        >
          delete
        </PopupButton>
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

export default EditAppointmentPopup;
