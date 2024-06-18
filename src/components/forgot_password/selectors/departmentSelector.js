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
import { useSignupContext } from "../../../context/signup";

const DepartmentSelector = () => {
  const {department, setDepartment} = useSignupContext();
  const handleChange = (event) => {
    setDepartment(event.target.value);
  };
  const theme = useTheme();
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "30%",
        margin: "0px 10px 0 10px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={department}
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
