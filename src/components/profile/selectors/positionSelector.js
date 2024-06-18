import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useUIContext } from "../../../context/ui";

const PositionSelector = () => {
  const { profilePosition, setProfilePosition } = useUIContext();
  const handleChange = (event) => {
    setProfilePosition(event.target.value);
  };
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginRight: "10px",
        marginLeft: "10px",
        width: "33.33%",
        [theme.breakpoints.down("sm")]: { width: "140%", mt: "-5px" },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Position</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={profilePosition}
          label="Position"
          onChange={handleChange}
        >
          <MenuItem value={"Senior Lecturer"}>Senior Lecturer</MenuItem>
          <MenuItem value={"Lecturer"}>Lecturer</MenuItem>
          <MenuItem value={"Assistant Lecturer"}>Assistant Lecturer</MenuItem>
          <MenuItem value={"Probational Lecturer"}>Assistant Lecturer</MenuItem>
          <MenuItem value={"Instructor"}>Instructor</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PositionSelector;
