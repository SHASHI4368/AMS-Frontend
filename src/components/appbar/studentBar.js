import React, { useEffect, useState } from "react";
import {
  ButtonContainer,
  ButtonItem,
  DepartmentButton,
  DepartmentContainer,
  DepartmentItem,
} from "../../styles/appbar/desktop";
import Avatar from "./avatar";
import { useUIContext } from "../../context/ui";
import Loader from "../signup/other/loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentBar = () => {
  const [open, setOpen] = useState(false);
  const {staffList, setStaffList, setProgressOpen, progressOpen, setDepartment} = useUIContext();
  const navigate = useNavigate();

  const getDepartmentStaff = async (Department) => {
    console.log(Department);
    try {
      const url = `https://ams-backend-hvfj.onrender.com/db/department/${Department}`;
      const response = await axios.get(url);
      console.log(response.data);
      setStaffList(response.data);
      setTimeout(() => {
        setProgressOpen(false);
        navigate("/department");
      }, 300);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  }

  const handleClick = async (Department) => {
    setProgressOpen(true);
    setDepartment(Department);
    await getDepartmentStaff(Department);
  }

  return (
    <ButtonContainer>
      <ButtonItem onClick={() => navigate('/home')}>Home</ButtonItem>
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
          <DepartmentItem
            sx={{ mt: "10px" }}
            onClick={() => handleClick("DEIE")}
          >
            DEIE
          </DepartmentItem>
          <DepartmentItem onClick={() => handleClick("DCEE")}>
            DCEE
          </DepartmentItem>
          <DepartmentItem onClick={() => handleClick("DMME")}>
            DMME
          </DepartmentItem>
          <DepartmentItem onClick={() => handleClick("MENA")}>
            MENA
          </DepartmentItem>
          <DepartmentItem onClick={() => handleClick("Computer")}>
            Computer
          </DepartmentItem>
        </DepartmentContainer>
      </DepartmentButton>
      <Avatar />
      <Loader progressOpen={progressOpen} />
    </ButtonContainer>
  );
};

export default StudentBar;
