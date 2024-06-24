import { Divider, Drawer, Slide, styled } from "@mui/material";
import React, { useRef, useState } from "react";
import {
  Arrow,
  ArrowContainer,
  DepartmentDrawerList,
  DrawerCloseButton,
  DrawerContainer,
  DrawerList,
  DrawerListItem,
  DrawerLogo,
} from "../../styles/appbar/mobile";
import { lighten } from "polished";
import { ArrowBackIos, Close } from "@mui/icons-material";
import { Colors } from "../../styles/theme";
import { useUIContext } from "../../context/ui";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { set } from "date-fns";

const MiddeDivider = styled((props) => (
  <Divider variant="middle" {...props} />
))``;

const AppDrawer = () => {
  const [drawerDepOpen, setDrawerDepOpen] = useState(false);
  const [drawerDepSliderOpen, setDrawerDepSliderOpen] = useState(false);
  const {
    drawerOpen,
    setDrawerOpen,
    authorized,
    userType,
    setStaffList,
    setProgressOpen,
    setDepartment,
    setAuthorized,
    socket,
    jwt,
    setJwt,
    setEmail,
  } = useUIContext();
  const containerRef = useRef();
  const navigate = useNavigate();

  const handleSlider = () => {
    if (drawerDepSliderOpen) {
      setDrawerDepSliderOpen(!drawerDepSliderOpen);
      setTimeout(() => {
        setDrawerDepOpen(!drawerDepOpen);
      }, 600);
    } else {
      setDrawerDepSliderOpen(!drawerDepSliderOpen);
      setDrawerDepOpen(!drawerDepOpen);
    }
  };

  const getDepartmentStaff = async (Department) => {
    console.log(Department);
    try {
      const url = `http://localhost:8080/db/department/${Department}`;
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
  };

  const handleDepartment = async (Department) => {
    setDrawerOpen(false);
    setProgressOpen(true);
    setDepartment(Department);
    await getDepartmentStaff(Department);
  };

  const handleLogin = () => {
    navigate("/");
    setDrawerOpen(false);
  };

  const handleSignup = () => {
    navigate("/signup");
    setDrawerOpen(false);
  };

  const handleHome = () => {
    navigate("/home");
    setDrawerOpen(false);
  };

  const handleStdLogout = async () => {
    try {
      const config = {
        headers: { Authorization: jwt },
      };
      const url = `http://localhost:8080/db/student/logout`;
      const response = await axios.get(url, config);
      setEmail("");
      setJwt("");
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
      const url = `http://localhost:8080/db/staff/logout`;
      const response = await axios.get(url, config);
      setEmail("");
      setJwt("");
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
    setDrawerOpen(false);
    setAuthorized(false);
    navigate("/");
  };

  const handleCalendar = () => {
    navigate("/calendar");
    setDrawerOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setDrawerOpen(false);
  };

  return (
    <>
      {drawerOpen && (
        <DrawerCloseButton
          sx={{ zIndex: 999999 }}
          onClick={() => setDrawerOpen(false)}
        >
          <Close
            sx={{
              fontSize: "2.5rem",
              zIndex: 9999999,
              color: lighten(0.09, Colors.secondary),
            }}
          />
        </DrawerCloseButton>
      )}
      <Drawer sx={{ zIndex: 99999 }} open={drawerOpen}>
        <DrawerContainer>
          <DrawerLogo>ams</DrawerLogo>
          <DrawerList>
            {!authorized && (
              <>
                <DrawerListItem onClick={(e) => handleLogin()}>
                  Login
                </DrawerListItem>
                <MiddeDivider />
                <DrawerListItem onClick={(e) => handleSignup()}>
                  Sign up
                </DrawerListItem>
                <MiddeDivider />
              </>
            )}

            {authorized && userType === "Student" && (
              <>
                <DrawerListItem onClick={(e) => handleHome()}>
                  Home
                </DrawerListItem>
                <MiddeDivider />
                <DrawerListItem ref={containerRef}>
                  <ArrowContainer>
                    Department
                    <Arrow onClick={handleSlider} open={drawerDepOpen}>
                      <ArrowBackIos sx={{ fontSize: "20px" }} />
                    </Arrow>
                  </ArrowContainer>
                  <Slide
                    container={containerRef.current}
                    direction={drawerDepSliderOpen ? "true" : "down"}
                    timeout={{ enter: 800, exit: 800 }}
                    in={drawerDepSliderOpen}
                  >
                    <DepartmentDrawerList open={drawerDepOpen}>
                      <DrawerListItem onClick={() => handleDepartment("DEIE")}>
                        DEIE
                      </DrawerListItem>
                      <MiddeDivider />
                      <DrawerListItem onClick={() => handleDepartment("DCEE")}>
                        DCEE
                      </DrawerListItem>
                      <MiddeDivider />
                      <DrawerListItem onClick={() => handleDepartment("DMME")}>
                        DMME
                      </DrawerListItem>
                      <MiddeDivider />
                      <DrawerListItem onClick={() => handleDepartment("MENA")}>
                        MENA
                      </DrawerListItem>
                      <MiddeDivider />
                      <DrawerListItem
                        onClick={() => handleDepartment("Computer")}
                      >
                        Computer
                      </DrawerListItem>
                      <MiddeDivider />
                    </DepartmentDrawerList>
                  </Slide>
                </DrawerListItem>
                <MiddeDivider />
                {/* <DrawerListItem>My Appointments</DrawerListItem>
                <MiddeDivider /> */}
                <DrawerListItem onClick={(e) => handleProfile()}>
                  Profile
                </DrawerListItem>
                <MiddeDivider />

                <DrawerListItem onClick={(e) => handleLogout()}>
                  Log out
                </DrawerListItem>
                <MiddeDivider />
              </>
            )}
            {authorized && userType === "Staff" && (
              <>
                <DrawerListItem onClick={(e) => handleHome()}>
                  Home
                </DrawerListItem>
                <MiddeDivider />
                <DrawerListItem onClick={(e) => handleCalendar()}>
                  Calendar
                </DrawerListItem>
                <MiddeDivider />
                <DrawerListItem onClick={(e) => handleProfile()}>
                  Profile
                </DrawerListItem>
                <MiddeDivider />
                <DrawerListItem onClick={(e) => handleLogout()}>
                  Log out
                </DrawerListItem>
                <MiddeDivider />
              </>
            )}
          </DrawerList>
        </DrawerContainer>
      </Drawer>
    </>
  );
};

export default AppDrawer;
