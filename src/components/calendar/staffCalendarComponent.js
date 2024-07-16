import { useUIContext } from "../../context/ui";
import React, { useEffect, useState } from "react";

import "@fontsource/raleway";
import "./styles/calendar.css";
import axios from "axios";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
  Agenda,
  ViewsDirective,
  ViewDirective,
  TimelineViews,
  TimelineMonth,
  DragAndDrop,
  Resize,
} from "@syncfusion/ej2-react-schedule";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { L10n } from "@syncfusion/ej2-base";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useCalendarContext } from "../../context/calendar";
import Loader from "../signup/other/loader";
// import ColorCode from "./helpers/ColorCode";

L10n.load({
  "en-US": {
    schedule: {
      saveButton: "Save",
      cancelButton: "Close",
      deleteButton: "Remove",
      newEvent: "Appointment Details",
    },
  },
});

const getColor = (status) => {
  switch (status) {
    case "New":
      return "#1E90FF"; // Dodger Blue
    case "Blocked":
      return "#FF4500"; // Orange Red
    case "Confirmed":
      return "#32CD32"; // Lime Green
    case "Cancelled":
      return "#FF6347"; // Tomato
    case "Completed":
      return "#8A2BE2"; // Blue Violet
    default:
      return "#1E90FF"; // Dodger Blue
  }
};

const getTime = (value) => {
  const date = new Date(value);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedTime = `${formattedHours}:${formattedMinutes}`;
  if (formattedTime === "NaN:NaN") {
    return "";
  } else {
    return formattedTime;
  }
};

const getTimeString = (start, end) => {
  const startTime = getTime(start);
  const endTime = getTime(end);
  if (startTime === "" && endTime === "") {
    return "";
  } else {
    return `Time : ${startTime} - ${endTime}`;
  }
};

const eventTemplate = (e) => {
  const secondaryColor = { background: e.Color };
  const primaryColor_1 = { background: e.Color };
  const primaryColor_2 = { background: e.Color };
  return (
    <div className="template-wrap" style={secondaryColor}>
      <div className="subject" style={primaryColor_1}>
        {e.Subject}
      </div>
      <div className="time" style={primaryColor_2}>
        {getTimeString(e.StartTime, e.EndTime)}
      </div>
      <div className="reg" style={primaryColor_2}>
        {
          <div className="time" style={primaryColor_2}>
            {e.StdReg ? `Student: ${e.StdReg}` : ""}
          </div>
        }
      </div>
    </div>
  );
};

const StaffCalendarComponent = () => {
  //========================================================================
  const { email, socket, userType, setProgressOpen, progressOpen } =
    useUIContext();
  const {
    setStartTime,
    setEndTime,
    setPopupOpen,
    setAptId,
    setReg,
    setBlock,
    setReason,
    setBlockPopupOpen,
    setSubject,
    setDescription,
    setAcceptAppointmentPopupOpen,
    setRescheduleAppointmentPopupOpen,
    setCancelAcceptedAppointmentPopupOpen,
  } = useCalendarContext();
  const [blocked, setBlocked] = useState();
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const dayCount = small ? 1 : 3;
  const dayDisplay = small ? "Day" : "3 Days";
  const [appointments, setAppointments] = useState({
    dataSource: [],
    fields: {
      subject: { default: "No title is provided" },
    },
  });

  const [selectedAptId, setSelectedAptId] = useState(0);
  const [isDragged, setIsDragged] = useState(false);
  const [isResized, setIsResized] = useState(false);

  const [staffDetails, setStaffDetails] = useState({});

  const fetchData = async () => {
    try {
      const data = await getAllAppointments(email);
      setAppointments({
        dataSource: data.map((item) => ({
          Id: item.Id,
          Subject: item.Subject || "No title is provided",
          EventType: item.Apt_status,
          StartTime: new Date(item.StartTime),
          EndTime: new Date(item.EndTime),
          Description: item.Description,
          Color: getColor(item.Apt_status),
          StdReg: item.Student_reg,
          lecMail: item.Lecturer_mail,
          Reason: item.Reason,
          IsBlock: item.Apt_status === "Completed" ? true : false,
        })),
        fields: {
          subject: { default: "No title is provided" },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAllAppointments = async (Lecturer_mail) => {
    try {
      const url = `https://api.swargadhi.lk/db/appointments/${Lecturer_mail}`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("isDragged", JSON.stringify(false));
    const getStaffDetails = async () => {
      try {
        const url = `https://api.swargadhi.lk/db//staff/${email}`;
        const response = await axios.get(url);
        setStaffDetails(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getStaffDetails();
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("block time slot", () => {
      fetchData();
    });
    socket.on("add appointment", (msg) => {
      if ((msg.lecMail = email) && userType === "Staff") {
        fetchData();
      }
    });
    socket.on("delete appointment", () => {
      fetchData();
    });
    socket.on("change appointment", (msg) => {
      fetchData();
    });
  }, [socket]);

  useEffect(() => {
    sessionStorage.setItem("isDragged", JSON.stringify(false));
    const getStaffDetails = async () => {
      try {
        const url = `https://api.swargadhi.lk/db//staff/${email}`;
        const response = await axios.get(url);
        setStaffDetails(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getStaffDetails();
    fetchData();
    setBlocked(false);
    socket.on("block time slot", () => {
      fetchData();
    });
  }, [blocked]);

  const onDragStart = (e) => {
    e.interval = 30;
    setSelectedAptId(e.data.Id);
  };

  const onDragStop = (e) => {
    if (e.data.StartTime < new Date()) {
      e.cancel = true;
    } else {
      sessionStorage.setItem("isDragged", JSON.stringify(true));
      updateAppointment(
        e.data.Subject,
        e.data.Description,
        e.data.StartTime,
        e.data.EndTime,
        e.data.EventType === "Blocked" ? "Blocked" : "Confirmed",
        e.data.StdReg
      );
    }
  };

  const onResizeStart = (e) => {
    e.interval = 10;
    setSelectedAptId(e.data.Id);
  };

  const onResizeStop = (e) => {
    setIsResized(true);
    updateAppointment(
      e.data.Subject,
      e.data.Description,
      e.data.StartTime,
      e.data.EndTime,
      e.data.EventType === "Blocked" ? "Blocked" : "Conformed",
      e.data.StdReg
    );
  };

  const updateAppointment = async (
    Subject,
    Description,
    StartTime,
    EndTime,
    Apt_status,
    StdReg
  ) => {
    try {
      setProgressOpen(true);
      const url = `https://api.swargadhi.lk/db/appointment`;
      const response = await axios.put(url, {
        Id: selectedAptId,
        Subject,
        Description,
        StartTime,
        EndTime,
        Apt_status,
        Reason: "",
      });
      if (StdReg !== null) {
        sendAppointmentChangeMail(StartTime, EndTime, StdReg, Apt_status);
      }
      sessionStorage.setItem("isDragged", JSON.stringify(false));
      setIsResized(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getStudentDetails = async (Reg_number) => {
    try {
      const url = `https://api.swargadhi.lk/db/student/details/${Reg_number}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getDate = (value) => {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const getAppointment = async (Id) => {
    try {
      const url = `https://api.swargadhi.lk/db/appointment/${Id}`;
      const response = await axios.get(url);
      return response.data[0];
    } catch (err) {
      console.log(err);
    }
  };

  const sendAppointmentChangeMail = async (from, to, StdReg, Apt_status) => {
    const msg = { email };
    const getStaffDetails = async () => {
      try {
        const url = `https://api.swargadhi.lk/db/staff/details/${email}`;
        const { data } = await axios.get(url);
        return data[0];
      } catch (err) {
        console.log(err);
      }
    };
    if (JSON.parse(sessionStorage.getItem("isDragged")) === true) {
      try {
        const student = await getStudentDetails(StdReg);
        const staffDetails = await getStaffDetails();
        const stdMail = student[0].Email;
        const url = `https://api.swargadhi.lk/mail/student/update/appointment`;
        const subject = "Change of appointment time";
        const content = `
        <p>Dear student,</p>
        <p>Your appointment with ${staffDetails.First_name} ${
          staffDetails.Last_name
        } has been changed.</p>
        <h2>New Appointment Details:</h2>
        <p>Date: ${getDate(from)}</p>
        <p>Time: ${getTime(from)} - ${getTime(to)}</p>
        <br>
        <p>${staffDetails.First_name} ${staffDetails.Last_name}</p>
        <p>${staffDetails.Email}</p>
        <p>${staffDetails.Department}</p>
      `;
        const { data } = await axios.post(url, { stdMail, subject, content });
        const msg = { email };
        setProgressOpen(false);
        socket.emit("change appointment", msg);
      } catch (err) {
        console.log(err);
      }
    } else if (Apt_status === "Confirmed") {
      console.log("confirmed");
      try {
        const appointment = await getAppointment(selectedAptId);
        const student = await getStudentDetails(appointment.Student_reg);
        console.log(appointment.Student_reg);
        const stdMail = student[0].Email;
        const url = `https://api.swargadhi.lk/mail/student/update/appointment`;
        const subject = "Appointment confirmed";
        const content = `
        <p>Dear student,</p>
        <p>Your appointment with ${staffDetails.First_name} ${
          staffDetails.Last_name
        } has been confirmed.</p>
        <h2>Appointment Details:</h2>
        <p>Date: ${getDate(from)}</p>
        <p>Time: ${getTime(from)} - ${getTime(to)}</p>
        <br>
        <p>${staffDetails.First_name} ${staffDetails.Last_name}</p>
        <p>${staffDetails.Email}</p>
        <p>${staffDetails.Department}</p>
      `;
        const { data } = await axios.post(url, { stdMail, subject, content });
        setProgressOpen(false);
        socket.emit("change appointment", msg);
      } catch (err) {
        console.log(err);
      }
    } else if (Apt_status === "Unable") {
      try {
        const appointment = await getAppointment(selectedAptId);
        const student = await getStudentDetails(appointment.Student_reg);
        console.log(appointment.Student_reg);
        const stdMail = student[0].Email;
        const url = `https://api.swargadhi.lk/mail/student/update/appointment`;
        const subject = "Appointment cancelled";
        const content = `
        <p>Dear student,</p>
        <p>Your appointment with ${staffDetails.First_name} ${
          staffDetails.Last_name
        } has been cancelled.</p>
        <h2>Appointment Details:</h2>
        <p>Date: ${getDate(from)}</p>
        <p>Time: ${getTime(from)} - ${getTime(to)}</p>
        <br>
        <p>${staffDetails.First_name} ${staffDetails.Last_name}</p>
        <p>${staffDetails.Email}</p>
        <p>${staffDetails.Department}</p>
      `;
        const { data } = await axios.post(url, { stdMail, subject, content });
        socket.emit("change appointment", msg);
      } catch (err) {
        console.log(err);
      }
    } else if (Apt_status === "Done") {
      try {
        const appointment = await getAppointment(selectedAptId);
        const student = await getStudentDetails(appointment.Student_reg);
        console.log(appointment.Student_reg);
        const stdMail = student[0].Email;
        const url = `https://api.swargadhi.lk/mail/student/update/appointment`;
        const subject = "Appointment Done";
        const content = `
        <p>Dear student,</p>
        <p>Your appointment with ${staffDetails.First_name} ${
          staffDetails.Last_name
        } has been successfully done.</p>
        <h2>Appointment Details:</h2>
        <p>Date: ${getDate(from)}</p>
        <p>Time: ${getTime(from)} - ${getTime(to)}</p>
        <br>
        <p>${staffDetails.First_name} ${staffDetails.Last_name}</p>
        <p>${staffDetails.Email}</p>
        <p>${staffDetails.Department}</p>
      `;
        const { data } = await axios.post(url, { stdMail, subject, content });
        socket.emit("change appointment", msg);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // =====================================================================================================
  const onPopupOpen = (e) => {
    if (e.data.StartTime < new Date()) {
      e.cancel = true;
    } else {
      if (
        (e.type === "Editor" && e.data.Id === undefined) ||
        e.data.Subject === "Blocked"
      ) {
        e.cancel = true;
        setSelectedAptId(e.data.Id);
        setAptId(e.data.Id);
        if (e.data.Id === undefined) {
          setBlock(false);
        } else {
          setBlock(true);
        }
        setStartTime(e.data.StartTime);
        setEndTime(e.data.EndTime);
        setBlockPopupOpen(true);
        setPopupOpen(true);
      } else if (
        (e.type === "Editor" &&
          e.data.Id !== undefined &&
          e.data.EventType === "New") ||
        (e.type === "ViewEventInfo" &&
          e.data.Id !== undefined &&
          e.data.EventType === "New")
      ) {
        e.cancel = true;
        setAptId(e.data.Id);
        setStartTime(e.data.StartTime);
        setEndTime(e.data.EndTime);
        setSubject(e.data.Subject);
        setReg(e.data.StdReg);
        setDescription(e.data.Description);
        setAcceptAppointmentPopupOpen(true);
        setPopupOpen(true);
      } else if (
        (e.type === "Editor" &&
          e.data.Id !== undefined &&
          e.data.EventType === "Cancelled") ||
        (e.type === "ViewEventInfo" &&
          e.data.Id !== undefined &&
          e.data.EventType === "Cancelled")
      ) {
        e.cancel = true;
        setAptId(e.data.Id);
        setStartTime(e.data.StartTime);
        setEndTime(e.data.EndTime);
        setSubject(e.data.Subject);
        setDescription(e.data.Description);
        setReason(e.data.Reason);
        setReg(e.data.StdReg);
        setRescheduleAppointmentPopupOpen(true);
        setPopupOpen(true);
      } else if (
        (e.type === "Editor" &&
          e.data.Id !== undefined &&
          e.data.EventType === "Confirmed") ||
        (e.type === "ViewEventInfo" &&
          e.data.Id !== undefined &&
          e.data.EventType === "Confirmed")
      ) {
        e.cancel = true;
        setAptId(e.data.Id);
        setStartTime(e.data.StartTime);
        setEndTime(e.data.EndTime);
        setSubject(e.data.Subject);
        setDescription(e.data.Description);
        setReason(e.data.Reason);
        setReg(e.data.StdReg);
        setCancelAcceptedAppointmentPopupOpen(true);
        setPopupOpen(true);
      } else if (
        e.type === "QuickInfo" &&
        e.data.EndTime - e.data.StartTime > 1800000 &&
        e.data.Id === undefined
      ) {
        e.cancel = true;
        setSelectedAptId(e.data.Id);
        setAptId(e.data.Id);
        setBlockPopupOpen(true);
        if (e.data.Id === undefined) {
          setBlock(false);
        } else {
          setBlock(true);
        }
        setStartTime(e.data.StartTime);
        setEndTime(e.data.EndTime);
        setPopupOpen(true);
      } else if (e.type === "QuickInfo") {
        e.cancel = true;
      }
    }
  };

  return (
    <Box sx={{ fontFamily: "Raleway" }}>
      <div className="calendar">
        <ScheduleComponent
          currentView="Day"
          eventSettings={{
            dataSource: appointments.dataSource,
            fields: appointments.fields,
            template: eventTemplate,
            ignoreWhitespace: true,
          }}
          dragStart={onDragStart}
          dragStop={onDragStop}
          resizeStart={onResizeStart}
          resizeStop={onResizeStop}
          popupOpen={onPopupOpen}
          cssClass="schedule-cell-dimension"
          rowAutoHeight={true}
          quickInfoOnSelectionEnd={true}
        >
          <ViewsDirective>
            <ViewDirective
              option="Day"
              startHour="08:00"
              endHour="17:00"
              interval={dayCount}
              displayName={dayDisplay}
            />
            <ViewDirective option="Week" startHour="08:00" endHour="17:00" />
            {/* <ViewDirective
              option="Month"
              // isSelected={true}
              showWeekNumber={false}
              showWeekend={false}
            />
            <ViewDirective option="Agenda" /> */}
          </ViewsDirective>
          <Inject
            services={[
              Day,
              Week,
              Month,
              // Agenda,
              // TimelineMonth,
              // TimelineViews,
              DragAndDrop,
              Resize,
            ]}
          />
        </ScheduleComponent>
      </div>
      <Loader progressOpen={progressOpen} />
    </Box>
  );
};

export default StaffCalendarComponent;
