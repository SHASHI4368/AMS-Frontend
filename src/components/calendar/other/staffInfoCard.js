import React from "react";
import {
  StaffCardContainer,
  StaffCardDetails,
  StaffCardImage,
} from "../../../styles/calendar";
import { useUIContext } from "../../../context/ui";
import { Typography } from "@mui/material";
import "@fontsource/poppins";
import "@fontsource/raleway";

const getDepartmentName = (department) => {
  if (department === "DEIE") {
    return "Department of Electrical and Information Engineering";
  } else if (department === "DCEE") {
    return "Department of Civil and Environmental Engineering";
  } else if (department === "DMME") {
    return "Department of Mechanical and Manufacturing Engineering";
  } else if (department === "MENA") {
    return "Marine Engineering and Naval Architecture";
  } else if (department === "Computer") {
    return "Department of Computer Engineering";
  }
};

const StaffInfoCard = () => {
  const { staff } = useUIContext();
  return (
    <StaffCardContainer>
      <StaffCardImage
        src={staff.Picture_URL}
        alt={`${staff.First_name} ${staff.Last_name}`}
      />
      <StaffCardDetails>
        <Typography
          variant="h3"
          sx={{ fontFamily: "Raleway", fontSize: "40px" }}
        >{`${staff.Title}. ${staff.First_name} ${staff.Last_name}`}</Typography>
        <Typography sx={{ fontFamily: "Raleway", fontSize: "20px", margin: "10px 0 0 0" }}>
          {staff.Position}
        </Typography>
        <Typography sx={{ fontFamily: "Raleway", fontSize: "20px" }}>
          {getDepartmentName(staff.Department)}
        </Typography>
        <Typography sx={{ fontFamily: "Raleway", fontSize: "20px" }}>
          {staff.Email}
        </Typography>
      </StaffCardDetails>
    </StaffCardContainer>
  );
};

export default StaffInfoCard;
