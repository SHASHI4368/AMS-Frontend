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

const AddAppointmentPopup = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
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
    setAptId,
    setAddAppointmentPopupOpen,
  } = useCalendarContext();
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setFormattedStartTime(format(new Date(startTime), "HH:mm"));
    setDate(format(new Date(startTime), "EEE MMM dd yyyy"));
  }, [startTime]);

  useEffect(() => {
    setFormattedEndTime(format(new Date(endTime), "HH:mm"));
  }, [endTime]);

  const addAppointment = async () => {
    setProgressOpen(true);
    try {
      const id = (await getLastAppointment()) + 1;
      const url = `http://194.238.23.116:8080/db/appointment/add`;
      const data = {
        Id: id,
        Lecturer_mail: selectedStaffEmail,
        Student_reg: regNumber,
        Subject: subject,
        Description: description,
        StartTime: startTime,
        EndTime: endTime,
        Apt_status: "New",
      };
      const response = await axios.post(url, data);
      sendAppointmentAddedMail();
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  const sendAppointmentAddedMail = async () => {
    console.log("Sending email");

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
      const id = await getLastAppointment();
      const student = await getStudentDetails();
      const url = `http://194.238.23.116:8080/mail/student/request/appointment`;
      const acceptUrl = `http://194.238.23.116:8080/db/appointment/accept/${id}`;
      const subject = "Request for an appointment";
      const content = `
        <h1>${subject}</h1>
        <h2>Student Details:</h2>
        <p>Reg Number: ${regNumber}</p>
        <p>Name: ${student[0].First_name} ${student[0].Last_name}</p>
        <p>Department: ${student[0].Department}</p>
        <p>Email: ${student[0].Email}</p>
        <p>Batch: ${student[0].Batch}</p>
        <br>
        <h2>Appointment Description:</h2>
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
      console.log(regNumber);
      const msg = { lecMail: selectedStaffEmail, regNumber };
      socket.emit("add appointment", msg);
      setProgressOpen(false);
      setPopupOpen(false);
      setAddAppointmentPopupOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getLastAppointment = async () => {
    try {
      const url = `http://194.238.23.116:8080/db/appointment/last`;
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

  const handleClose = () => {
    setAptId(undefined);
    setPopupOpen(false);
    setAddAppointmentPopupOpen(false);
  };

  return (
    <PopupPaper>
      <TitleContainer>
        <PopupTitle id="responsive-dialog-title">
          {"Requesting for an appointment"}
        </PopupTitle>
      </TitleContainer>
      {/* <PopupDivider /> */}
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
      <DialogActions
        sx={{
          mt: -5,
          [theme.breakpoints.down("sm")]: {
            mt: -2,
          },
        }}
      >
        <PopupButton autoFocus onClick={() => addAppointment()}>
          request
        </PopupButton>
        <PopupButton onClick={() => handleClose()} autoFocus>
          Cancel
        </PopupButton>
      </DialogActions>
      <Loader progressOpen={progressOpen} />
    </PopupPaper>
  );
};

export default AddAppointmentPopup;
