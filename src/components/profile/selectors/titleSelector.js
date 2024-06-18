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

const TitleSelector = () => {
  const { profileTitle, setProfileTitle } = useUIContext();
  const handleChange = (event) => {
    setProfileTitle(event.target.value);
  };
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "33.33%",
        [theme.breakpoints.down("sm")]: { width: "40%", mt: "0px", ml: "11px" },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Title</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={profileTitle}
          label="Title"
          onChange={handleChange}
        >
          <MenuItem value={"Prof"}>Professor</MenuItem>
          <MenuItem value={"Dr"}>Dr</MenuItem>
          <MenuItem value={"Mr"}>Mr</MenuItem>
          <MenuItem value={"Mrs"}>Mrs</MenuItem>
          <MenuItem value={"Ms"}>Ms</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TitleSelector;
