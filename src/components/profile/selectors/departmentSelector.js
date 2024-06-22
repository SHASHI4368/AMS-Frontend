import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useUIContext } from "../../../context/ui";

const DepartmentSelector = () => {
  const {profileDepartment, setProfileDepartment} = useUIContext();
  const handleChange = (event) => {
    setProfileDepartment(event.target.value);
  };
  const theme = useTheme();
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "30%",
        margin: "0px 10px 0 10px",
        [theme.breakpoints.down("sm")]: {
          width: "50%",
          mt: "0px",
          mr: "-15px",
        },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={profileDepartment}
          label="Department"
          onChange={handleChange}
        >
          <MenuItem value={"DEIE"}>DEIE</MenuItem>
          <MenuItem value={"DMME"}>DMME</MenuItem>
          <MenuItem value={"DCEE"}>DCEE</MenuItem>
          <MenuItem value={"Computer"}>Computer</MenuItem>
          <MenuItem value={"MENA"}>MENA</MenuItem>
          <MenuItem value={"None"}>None</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DepartmentSelector;
