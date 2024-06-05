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

const MiddeDivider = styled((props) => (
  <Divider variant="middle" {...props} />
))``;

const AppDrawer = () => {
  const [drawerDepOpen, setDrawerDepOpen] = useState(false);
  const [drawerDepSliderOpen, setDrawerDepSliderOpen] = useState(false);
  const { drawerOpen, setDrawerOpen } = useUIContext();
  const containerRef = useRef();

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
  return (
    <>
      {drawerOpen && (
        <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
          <Close
            sx={{
              fontSize: "2.5rem",
              color: lighten(0.09, Colors.secondary),
            }}
          />
        </DrawerCloseButton>
      )}
      <Drawer open={drawerOpen}>
        <DrawerContainer>
          <DrawerLogo>ams</DrawerLogo>
          <DrawerList>
            <DrawerListItem>Login</DrawerListItem>
            <MiddeDivider />
            <DrawerListItem>Sign up</DrawerListItem>
            <MiddeDivider />
            <DrawerListItem>Home</DrawerListItem>
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
                  <DrawerListItem>DEIE</DrawerListItem>
                  <MiddeDivider />
                  <DrawerListItem>DCEE</DrawerListItem>
                  <MiddeDivider />
                  <DrawerListItem>DMME</DrawerListItem>
                  <MiddeDivider />
                  <DrawerListItem>MENA</DrawerListItem>
                  <MiddeDivider />
                  <DrawerListItem>Computer</DrawerListItem>
                  <MiddeDivider />
                </DepartmentDrawerList>
              </Slide>
            </DrawerListItem>
            <MiddeDivider />
            <DrawerListItem>My Appointments</DrawerListItem>
            <MiddeDivider />
            <DrawerListItem>Log out</DrawerListItem>
            <MiddeDivider />
          </DrawerList>
        </DrawerContainer>
      </Drawer>
    </>
  );
};

export default AppDrawer;
