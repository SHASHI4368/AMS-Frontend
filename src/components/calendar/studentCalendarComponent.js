import React, { useEffect, useState } from "react";
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
import { L10n } from "@syncfusion/ej2-base";
import { useUIContext } from "../../context/ui";
import { useCalendarContext } from "../../context/calendar";
import { useMediaQuery, useTheme } from "@mui/material";

L10n.load({
  "en-US": {
    schedule: {
      saveButton: "Add",
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
    </div>
  );
};

const StudentCalendarComponent = () => {
  //=========================================================================================
  const { regNumber, socket, selectedStaffEmail, userType, selectedDate } =
    useUIContext();
  const {
    setStartTime,
    setEndTime,
    setPopupOpen,
    setAptId,
    setAddAppointmentPopupOpen,
    setEditAppointmentPopupOpen,
    setCancelAppointmentPopupOpen,
    setSubject,
    setDescription,
    setReason,
  } = useCalendarContext();
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

  const getDepName = () => {
    const dep = JSON.parse(sessionStorage.getItem("department"));
    switch (dep) {
      case "DCEE":
        return "Department of Civil and Environmental Engineering";
      case "DEIE":
        return "Department of Electrical and Information Engineering";
      case "DMME":
        return "Department of Mechanical and Manufacturing Engineering";
      case "MENA":
        return "Department of Metallurgical and Materials Engineering";
      case "Computer":
        return "Department of Computer Science and Engineering";
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

  const fetchData = async () => {
    try {
      const data = await getAllAppointments(selectedStaffEmail);
      setAppointments({
        dataSource: data.map((item) => ({
          Id: item.Id,
          Subject:
            item.Student_reg === regNumber
              ? item.Subject
              : item.Subject === "Blocked"
              ? "Blocked"
              : "Reserverd",
          EventType: item.Apt_status,
          StartTime: new Date(item.StartTime),
          EndTime: new Date(item.EndTime),
          Description: item.Description,
          IsBlock: item.Student_reg === regNumber ? false : true,
          Color: getColor(item.Apt_status),
        })),
        fields: {
          subject: { default: "No title is provided" },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("block time slot", () => {
      fetchData();
    });
    socket.on("add appointment", (msg) => {
      if ((msg.reg = regNumber) && userType === "Student") {
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

  //==============================================================================================
  const onPopupOpen = (e) => {
    if (e.data.StartTime < new Date()) {
      e.cancel = true;
    } else {
      if (
        (e.type === "Editor" || e.type === "ViewEventInfo") &&
        e.data.Id === undefined
      ) {
        e.cancel = true;
        setAptId(e.data.Id);
        setStartTime(e.data.StartTime);
        setEndTime(e.data.EndTime);
        setAddAppointmentPopupOpen(true);
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
        setDescription(e.data.Description);
        setEditAppointmentPopupOpen(true);
        setPopupOpen(true);
      } else if (e.data.EventType === "Cancelled") {
        e.cancel = true;
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
        setCancelAppointmentPopupOpen(true);
        setPopupOpen(true);
      } else if (
        e.type === "QuickInfo" &&
        e.data.EndTime - e.data.StartTime > 1800000 &&
        e.data.Id === undefined
      ) {
        e.cancel = true;
        setAptId(e.data.Id);
      } else {
        e.cancel = true;
      }
    }
  };

  const getStudentDetails = async (Reg_number) => {
    try {
      const url = `https://api.swargadhi.lk/db/student/details/${Reg_number}`;
      const { data } = await axios.get(url, Reg_number);
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

  const sendAppointmentChangeMail = async (description, from, to, lecMail) => {
    console.log("Sending email");
    const student = await getStudentDetails(regNumber);
    try {
      const url = `https://api.swargadhi.lk/mail/student/request/appointment`;
      const subject = "Unable to attend the appointment";
      const content = `
        <h2>Student Details:</h2>
        <p>Reg Number: ${student[0].Reg_number}</p>
        <p>Name: ${student[0].First_name} ${student[0].Last_name}</p>
        <p>Department: ${student[0].Department}</p>
        <p>Email: ${student[0].Email}</p>
        <p>Batch: ${student[0].Batch}</p>
        <br>
        <h2>Appointment Description:</h2>
        <p>Subject: ${subject}</p>
        <p>Date: ${getDate(from)}</p>
        <p>Time: ${getTime(from)} - ${getTime(to)}</p>
        <p>Description: ${description}</p>
      `;
      const { data } = await axios.post(url, { lecMail, subject, content });
      // const reg = student[0].Reg_number;
      const msg = { lecMail };
      socket.emit("change appointment", msg);
    } catch (err) {
      console.log(err);
    }
  };

  const sendAppointmentDeleteMail = async (
    description,
    from,
    to,
    lecMail,
    EventType
  ) => {
    const student = await getStudentDetails(regNumber);
    try {
      const url = `https://api.swargadhi.lk/mail/student/request/appointment`;
      const subject = "Student removed the appointment";
      const content = `
        <h2>Student Details:</h2>
        <p>Reg Number: ${student[0].Reg_number}</p>
        <p>Name: ${student[0].First_name} ${student[0].Last_name}</p>
        <p>Department: ${student[0].Department}</p>
        <p>Email: ${student[0].Email}</p>
        <p>Batch: ${student[0].Batch}</p>
        <br>
        <h2>Appointment Description:</h2>
        <p>Subject: ${subject}</p>
        <p>Date: ${getDate(from)}</p>
        <p>Time: ${getTime(from)} - ${getTime(to)}</p>
        <p>Description: ${description}</p>
      `;
      const { data } = await axios.post(url, { lecMail, subject, content });
      const msg = { lecMail, EventType };
      socket.emit("delete appointment", msg);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      {/* <div className="description">
        <div className="dep-name">
          <p className="abbr-name">
            {JSON.parse(sessionStorage.getItem("department")) === "Computer"
              ? "COM"
              : JSON.parse(sessionStorage.getItem("department"))}
          </p>
          <p className="long-name">{getDepName()}</p>
        </div>
        <div className="staff-detail">
          <img src={selectedStaffEmail.Picture_URL} alt="" className="staff-img" />
          <div className="details">
            <p className="staff-name">{`${selectedStaffEmail.First_name} ${selectedStaffEmail.Last_name}`}</p>
            <p className="staff-email">{selectedStaffEmail}</p>
          </div>
        </div>
      </div> */}
      <div className="calendar">
        <ScheduleComponent
          currentView="Month"
          eventSettings={{
            dataSource: appointments.dataSource,
            fields: appointments.fields,
            template: eventTemplate,
            enableMaxHeight: true,
          }}
          allowDragAndDrop={false}
          allowResizing={false}
          popupOpen={onPopupOpen}
          allowMultiCellSelection={false}
          cssClass="schedule-cell-dimension"
          allowMultiRowSelection={false}
          selectedDate={selectedDate}
        >
          <ViewsDirective>
            <ViewDirective
              option="Day"
              startHour="08:00"
              endHour="16:00"
              interval={dayCount}
              displayName={dayDisplay}
            />
            <ViewDirective option="Week" startHour="08:00" endHour="17:00" />
          </ViewsDirective>
          <Inject
            services={[
              Day,
              Week,
              Month,
              Agenda,
              TimelineMonth,
              TimelineViews,
              DragAndDrop,
              Resize,
            ]}
          />
        </ScheduleComponent>
      </div>
    </main>
  );
};

export default StudentCalendarComponent;
