import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../styles/theme";
import { format } from "date-fns";
import "@fontsource/raleway";
import "@fontsource/poppins";
import { lighten } from "polished";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../../../context/ui";

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 25,
  marginBottom: 10,
  fontWeight: 300,
  color: Colors.dim_grey,
  fontFamily: "Poppins",
  textAlign: "right",
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  marginBottom: 10,
  fontWeight: 300,
  color: Colors.dim_grey,
  fontFamily: "Poppins",
  textAlign: "right",
}));

const SubHeading2 = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 300,
  color: Colors.dim_grey,
  fontFamily: "Poppins",
  textAlign: "left",
}));

const Subject = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  marginBottom: "5 px",
  color: Colors.dim_grey,
  fontFamily: "Poppins",
  textAlign: "left",
}));
const Description = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  marginBottom: 1.5,
  color: Colors.dim_grey,
  fontFamily: "Poppins",
  textAlign: "left",
}));

const Paper = styled(Card)(({ theme }) => ({
  backgroundColor: Colors.card,
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  border: `1px solid ${Colors.dove_gray}`,
  boxShadow: "10px 10px 10px 0 rgba(0, 0, 0, 0.1)",
  opacity: 0.8,
  position: "relative",
  borderRadius: "10px",
  padding: "10px",
  width: "90%",
  margin: "10px",
  marginLeft: "10px",
  textAlign: "center",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    marginLeft: "20px",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginLeft: "30px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    marginLeft: "20px",
  },
}));

const PaperButton = styled(Button)(({ theme }) => ({
  backgroundColor: Colors.homebtn,
  color: Colors.white,
  fontFamily: "Poppins",
  fontSize: 18,
  fontWeight: 500,
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: lighten(0.04, Colors.homebtn),
  },
}));

const SmallAppointmentCard = ({ appointment }) => {
  const [student, setStudent] = useState({});
  useEffect(() => {
    const getStudent = async () => {
      const url = `http://194.238.23.116:8080/db/student/details/${appointment.Student_reg}`;
      const response = await axios.get(url);
      setStudent(response.data[0]);
    };
    getStudent();
  }, []);

  const truncateText = (text) => {
    const words = text.split(" ");
    if (words.length > 50) {
      return words.slice(0, 50).join(" ") + "...";
    }
    return text;
  };
  const { setSelectedDate } = useUIContext();
  const navigate = useNavigate();
  const handleNavigate = () => {
    setSelectedDate(new Date(appointment.StartTime));
    navigate("/calendar");
  };

  return (
    <Paper>
      <CardContent>
        <Heading variant="h3" gutterBottom>
          {`${format(appointment.StartTime, "EEE MMM dd yyyy")}`}
        </Heading>
        <SubHeading variant="h3" gutterBottom>
          {`${format(appointment.StartTime, "hh:mm a")} - ${format(
            appointment.EndTime,
            "hh:mm a"
          )}`}
        </SubHeading>
        <SubHeading2>{`${student.First_name} ${student.Last_name}`}</SubHeading2>
        <SubHeading2>{`Batch - ${student.Batch}`}</SubHeading2>
        <Subject>{appointment.Subject}</Subject>
        <Description>{truncateText(appointment.Description)}</Description>
      </CardContent>
      <CardActions>
        <PaperButton onClick={() => handleNavigate()}>see calendar</PaperButton>
      </CardActions>
    </Paper>
  );
};

export default SmallAppointmentCard;
