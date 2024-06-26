import React, { useEffect, useState } from "react";
import {
  ButtonContainer,
  ButtonItem,
} from "../../styles/appbar/desktop";
import Avatar from "./avatar";
import { useUIContext } from "../../context/ui";
import { useNavigate } from "react-router-dom";

const StaffBar = () => {
 const navigate = useNavigate();
  const {authorized} = useUIContext();

  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, []);

  
  return (
    <ButtonContainer>
      <ButtonItem onClick={() => navigate("/home")}>Home</ButtonItem>
      <ButtonItem onClick={(e) => navigate("/calendar")}>Calendar</ButtonItem>
      <Avatar />
    </ButtonContainer>
  );
};

export default StaffBar;
