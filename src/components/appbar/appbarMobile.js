import React from "react";
import {
  AppbarContainer,
  AppbarLogo,
  AppbarOuterContainer,
  MenuButton,
} from "../../styles/appbar/desktop";
import { Menu } from "@mui/icons-material";
import { useUIContext } from "../../context/ui";
import { ShapeTop } from "../../styles/footer";
import Logo from "../../images/Logo.png"
import { useNavigate } from "react-router-dom";

const AppbarMobile = () => {
  const navigate = useNavigate();
  const { setDrawerOpen, authorized } = useUIContext();
  return (
    <>
      <AppbarOuterContainer
        sx={{
          position: authorized ? "fixed" : "relative",
          borderBottom: authorized ? "2px solid #e0e0e0" : "none",
          zIndex: authorized ? 99 : 0,
        }}
      >
        <AppbarLogo src={Logo} onClick={()=> navigate('/home')} />
        <MenuButton onClick={(e) => setDrawerOpen(true)}>
          <Menu />
        </MenuButton>
      </AppbarOuterContainer>
      {!authorized && (
        <ShapeTop>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </ShapeTop>
      )}
    </>
  );
};

export default AppbarMobile;
