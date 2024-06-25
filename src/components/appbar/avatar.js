import React, { useState } from "react";
import {
  DepartmentButton,
  DepartmentContainer,
  DepartmentItem,
} from "../../styles/appbar/desktop";
import { IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Colors } from "../../styles/theme";
import { useUIContext } from "../../context/ui";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Avatar = () => {
  const [open, setOpen] = useState(false);
  const {
    setAuthorized,
    socket,
    jwt,
    setJwt,
    userType,
    setEmail,
    setRegNumber,
    setDepartment,
    setStaffList,
    setSelectedStaffEmail,
    setStaff,
    setStudentAppointments,
    setStaffAppointments,
  } = useUIContext();
  const navigate = useNavigate();

  const handleStdLogout = async () => {
    try {
      const config = {
        headers: { Authorization: jwt },
      };
      const url = `https://api.swargadhi.lk/db/student/logout`;
      const response = await axios.get(url, config);
      setEmail("");
      setJwt("");
      setRegNumber("");
      setDepartment("");
      setStaffList([]);
      setSelectedStaffEmail("");
      setStaff({});
      setStudentAppointments({});
      socket.disconnect();
      const accessToken = response.data.accessToken;
      return accessToken;
    } catch (err) {
      console.log(err);
    }
  };

  const handleStaffLogout = async () => {
    try {
      const config = {
        headers: { Authorization: jwt },
      };
      const url = `https://api.swargadhi.lk/db/staff/logout`;
      const response = await axios.get(url, config);
      setEmail("");
      setJwt("");
      setStaffAppointments({});
      socket.disconnect();
      const accessToken = response.data.accessToken;
      return accessToken;
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    if (userType === "Student") {
      handleStdLogout();
    } else {
      handleStaffLogout();
    }
    setAuthorized(false);
    navigate("/");
  };
  return (
    <DepartmentButton>
      <IconButton
        onMouseLeave={(e) => setOpen(false)}
        onMouseEnter={(e) => setOpen(true)}
        sx={{
          color: open ? Colors.primary : Colors.dim_grey,
          width: "40px",
          height: "40px",
        }}
      >
        <AccountCircle sx={{ fontSize: "40px" }} />
      </IconButton>
      <DepartmentContainer
        onMouseLeave={(e) => setOpen(false)}
        onMouseEnter={(e) => setOpen(true)}
        open={open}
        sx={{
          top: "45px",
          left: "-30px",
          width: "100px",
          border: `1px solid ${Colors.dove_gray}`,
        }}
      >
        <DepartmentItem
          onClick={() => navigate("/profile")}
          sx={{ mt: "10px", width: "100px" }}
        >
          Profile
        </DepartmentItem>
        <DepartmentItem onClick={handleLogout} sx={{ width: "100px" }}>
          Logout
        </DepartmentItem>
      </DepartmentContainer>
    </DepartmentButton>
  );
};

export default Avatar;
