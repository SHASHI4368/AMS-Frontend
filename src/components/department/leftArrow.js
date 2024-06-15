import { ArrowBackIosNew } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import React from "react";

const LeftArrow = (props) => {
  const { onClick } = props;
  const theme = useTheme();
  return (
    <IconButton
      sx={{
        position: "absolute",
        top: "50%",
        left: 0,
        marginLeft: "20px",
        zIndex: 1,
        [theme.breakpoints.down("sm")]: {
          ml: "10px",
        },
      }}
      onClick={onClick}
    >
      <ArrowBackIosNew />
    </IconButton>
  );
};

export default LeftArrow;
