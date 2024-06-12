import React, { useState } from "react";
import {
  ButtonContainer,
  ButtonItem,
  DepartmentButton,
  DepartmentContainer,
  DepartmentItem,
} from "../../styles/appbar/desktop";
import Avatar from "./avatar";

const StudentBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <ButtonContainer>
      <ButtonItem>Home</ButtonItem>
      <DepartmentButton
        onMouseLeave={(e) => setOpen(false)}
        onMouseEnter={(e) => setOpen(true)}
      >
        Department
        <DepartmentContainer
          onMouseLeave={(e) => setOpen(false)}
          onMouseEnter={(e) => setOpen(true)}
          open={open}
        >
          <DepartmentItem sx={{ mt: "10px" }}>DEIE</DepartmentItem>
          <DepartmentItem>DCEE</DepartmentItem>
          <DepartmentItem>DMME</DepartmentItem>
          <DepartmentItem>MENA</DepartmentItem>
          <DepartmentItem>Computer</DepartmentItem>
        </DepartmentContainer>
      </DepartmentButton>
      <ButtonItem>My Appointments</ButtonItem>
      <Avatar/>
    </ButtonContainer>
  );
};

export default StudentBar;
