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
import { DateTimePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const ChangeTimePopup = () => {
  const { socket, selectedStaffEmail, progressOpen, setProgressOpen, email } =
    useUIContext();
  const {
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    setPopupOpen,
    aptId,
    setAptId,
    reg,
    setChangeTimePopupOpen,
    subject,
    setSubject,
    description,
    setDescription,
  } = useCalendarContext();
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");
  const [datepickerStartTime, setDatePickerStartTime] = useState(null);
  const [datepickerEndTime, setDatePickerEndTime] = useState(null);
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

  const acceptAppointment = async () => {
    setProgressOpen(true);
    try {
      const url = `http://192.168.1.12.nip.io:8080/db/appointment`;
      const response = await axios.put(url, {
        Id: aptId,
        Subject: subject,
        Description: description,
        StartTime: startTime,
        EndTime: endTime,
        Apt_status: "Confirmed",
        Reason: "",
      });
      sendAppointmentAcceptMail();
    } catch (err) {
      console.log(err);
    }
  };

  const sendAppointmentAcceptMail = async () => {
    console.log("confirmed");
    const msg = { email };
    const getStudentDetails = async () => {
      try {
        const url = `http://192.168.1.12.nip.io:8080/db/student/details/${reg}`;
        const { data } = await axios.get(url, reg);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    const getStaffDetails = async () => {
      try {
        const url = `http://192.168.1.12.nip.io:8080/db/staff/details/${email}`;
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
      const url = `http://192.168.1.12.nip.io:8080/mail/student/update/appointment`;
      const subject = "Appointment rescheduled";
      const content = `
        <p>Dear student,</p>
        <p>Your appointment with ${staffDetails[0].First_name} ${staffDetails[0].Last_name} has been rescheduled.</p>
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
      setChangeTimePopupOpen(false);
      setPopupOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setAptId(undefined);
    setPopupOpen(false);
    setChangeTimePopupOpen(false);
  };

  useEffect(() => {
    console.log(startTime);
    if (datepickerStartTime !== null) {
      console.log(datepickerStartTime.$d);
    }
  }, [datepickerStartTime]);

  return (
    <PopupPaper>
      <TitleContainer>
        <PopupTitle
          sx={{
            [theme.breakpoints.down("sm")]: {
              fontSize: "18px",
            },
          }}
          id="responsive-dialog-title"
        >
          {"Do you want to reschedule appointment ?"}
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
            <Typography sx={{ mb: 1 }}>From</Typography>
            <MobileDateTimePicker
              sx={{ width: "100%", zIndex: 9999999 }}
              value={datepickerEndTime}
              onChange={(e) => setStartTime(e.$d)}
              ampm={false}
              disablePast
              minutesStep={30}
            />
            <Typography sx={{ mb: 1, mt: 2 }}>To</Typography>
            <MobileDateTimePicker
              sx={{ width: "100%", zIndex: 9999999 }}
              value={datepickerEndTime}
              onChange={(e) => setEndTime(e.$d)}
              ampm={false}
              disablePast
              minutesStep={30}
            />
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
            <DateTimeContainer sx={{ marginTop: "40px" }}>
              <DateTimeSection>
                <DialogContentText>
                  <Typography>From</Typography>
                  <DateTimePicker
                    value={datepickerStartTime}
                    onChange={(e) => setStartTime(e.$d)}
                    ampm={false}
                    disablePast
                    minutesStep={30}
                    orientation="landscape"
                    sx={{ zIndex: 99999 }}
                  />
                </DialogContentText>
              </DateTimeSection>
              <DateTimeSection>
                <DialogContentText>
                  <Typography>To</Typography>
                  <DateTimePicker
                    value={datepickerEndTime}
                    onChange={(e) => setEndTime(e.$d)}
                    ampm={false}
                    disablePast
                    minutesStep={30}
                    sx={{ zIndex: 999999 }}
                  />
                </DialogContentText>
              </DateTimeSection>
            </DateTimeContainer>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ mt: 0 }}>
        <PopupButton
          sx={{
            mr: 4,
            [theme.breakpoints.down("sm")]: {
              mr: 8,
            },
          }}
          autoFocus
          color="success"
          onClick={() => acceptAppointment()}
        >
          Change
        </PopupButton>
        <PopupButton sx={{ mr: 1 }} onClick={() => handleClose()} autoFocus>
          Close
        </PopupButton>
      </DialogActions>
      <Loader progressOpen={progressOpen} />
    </PopupPaper>
  );
};

export default ChangeTimePopup;
