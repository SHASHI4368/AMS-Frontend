import React from "react";
import {
  DescriptionText,
  FieldContainer,
  HorizontalContainer,
  HorizontalTextInput,
  SmallHorizontalContainer,
} from "../../../styles/signup/details";
import BatchSelector from "../selectors/batchSelector";
import SignupPassword from "../other/signupPassword";
import DepartmentSelector from "../selectors/departmentSelector";
import { useMediaQuery, useTheme } from "@mui/material";
import PositionSelector from "../selectors/positionSelector";
import TitleSelector from "../selectors/titleSelector";

const StaffDetails = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <FieldContainer>
      <DescriptionText>Please enter all the details</DescriptionText>
      <FieldContainer>
        <HorizontalContainer>
          <HorizontalTextInput
            variant="outlined"
            label="First name"
            sx={{ lineHeight: "1px" }}
          />
          <HorizontalTextInput
            variant="outlined"
            label="Last name"
            sx={{ lineHeight: "1px" }}
          />
        </HorizontalContainer>

        {small && (
          <>
            <HorizontalContainer sx={{ mb: "15px" }}>
              <PositionSelector />
            </HorizontalContainer>
            <SmallHorizontalContainer>
              <TitleSelector />
              <DepartmentSelector />
            </SmallHorizontalContainer>
          </>
        )}
        {!small && (
          <>
            <HorizontalContainer sx={{ mb: "15px" }}>
              <PositionSelector />
              <TitleSelector />
              <DepartmentSelector />
            </HorizontalContainer>
          </>
        )}
        <HorizontalContainer>
          <HorizontalTextInput
            variant="outlined"
            label="University email"
            sx={{
              lineHeight: "1px",
              margin: small ? "5px 10px" : "0px 10px",
              width: "97.5%",
            }}
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <SignupPassword />
        </HorizontalContainer>
      </FieldContainer>
    </FieldContainer>
  );
};

export default StaffDetails;
