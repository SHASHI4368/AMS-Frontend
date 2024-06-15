import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import "@fontsource/poppins";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { StaffCardContainer, StaffCardMedia, StaffCardSubtitle, StaffCardTitle } from "../../styles/department";
import { useUIContext } from "../../context/ui";
import { useNavigate } from "react-router-dom";

const StaffCard = ({staff}) => {
 const {setSelectedStaffEmail} = useUIContext();

 const navigate = useNavigate();
 useEffect(() => {
    console.log(staff);
 }, []);

 const handleClick = () => {
    setSelectedStaffEmail(staff.Email);
    navigate("/calendar");
 }

  return (
    <StaffCardContainer>
      <StaffCardMedia
        image={staff.Picture_URL}
        title={`${staff.First_name} ${staff.Last_name}`}
      />
      <CardContent>
        <StaffCardTitle gutterBottom variant="h5" component="div">
          {`${staff.Title}. ${staff.First_name} ${staff.Last_name}`}
        </StaffCardTitle>
        <StaffCardSubtitle variant="body2" color="text.secondary">
          {staff.Position}
        </StaffCardSubtitle>
        <StaffCardSubtitle variant="body2" color="text.secondary">
          {staff.Email}
        </StaffCardSubtitle>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleClick()}  sx={{fontFamily: 'Poppins', fontSize: '18px'}}>Calendar</Button>
      </CardActions>
    </StaffCardContainer>
  );
};

export default StaffCard;
