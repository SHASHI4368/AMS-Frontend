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

const BatchSelector = () => {
  const {profileBatch, setProfileBatch} = useUIContext();
  const handleChange = (event) => {
    setProfileBatch(event.target.value);
  };
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "20%",
        marginRight: "10px",
        marginLeft: "11px",
        [theme.breakpoints.down("sm")]: { width: "40%", mt: "0px" },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Batch</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={profileBatch}
          label="Batch"
          onChange={handleChange}
        >
          <MenuItem value={21}>21</MenuItem>
          <MenuItem value={22}>22</MenuItem>
          <MenuItem value={23}>23</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default BatchSelector;
