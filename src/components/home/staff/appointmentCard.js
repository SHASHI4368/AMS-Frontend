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
import { lighten, padding } from "polished";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../../../context/ui";

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 50,
  marginBottom: 10,
  fontWeight: 300,
  color: Colors.dim_grey,
  fontFamily: "Poppins",
  textAlign: "right",
  [theme.breakpoints.down("lg")]: {
    fontSize: 40,
  },
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  fontSize: 30,
  marginBottom: 10,
  fontWeight: 300,
  color: Colors.dim_grey,
  fontFamily: "Poppins",
  textAlign: "left",
  [theme.breakpoints.down("lg")]: {
    fontSize: 25,
  },
}));

const SubHeading2 = styled(Typography)(({ theme }) => ({
  fontSize: 25,
  marginBottom: 10,
  marginTop: -10,
  fontWeight: 300,
  color: Colors.dim_grey,
  fontFamily: "Poppins",
  textAlign: "left",
  [theme.breakpoints.down("lg")]: {
    fontSize: 20,
  },
}));

const Subject = styled(Typography)(({ theme }) => ({
  fontSize: 30,
  color: Colors.dim_grey,
  fontFamily: "Poppins",
  textAlign: "left",
  [theme.breakpoints.down("lg")]: {
    fontSize: 25,
  },
}));
const Description = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  marginBottom: 1.5,
  color: Colors.dim_grey,
  fontFamily: "Poppins",
  textAlign: "left",
  [theme.breakpoints.down("lg")]: {
    fontSize: 18,
  },
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
  width: "100%",
  margin: "10px",
  textAlign: "center",
  zIndex: 999,
  [theme.breakpoints.down("md")]: {
    width: "90%",
  },
}));

const PaperButton = styled(Button)(({ theme }) => ({
  backgroundColor: Colors.primary,
  color: Colors.white,
  fontFamily: "Poppins",
  fontSize: 18,
  fontWeight: 500,
  borderRadius: "5px",
  padding: "10px",
  margin: "10px",
  "&:hover": {
    backgroundColor: lighten(0.04, Colors.primary),
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: 16,
    padding: "8px",
  },
}));

const AppointmentCard = ({ appointment }) => {
  const [student, setStudent] = useState({});
  useEffect(() => {
    const getStudent = async () => {
      const url = `https://api.swargadhi.lk/db/student/details/${appointment.Student_reg}`;
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
          {`${format(appointment.StartTime, "hh:mm a")} - ${format(
            appointment.EndTime,
            "hh:mm a"
          )}`}
        </Heading>
        <SubHeading>{`${student.First_name} ${student.Last_name}`}</SubHeading>
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

export default AppointmentCard;
