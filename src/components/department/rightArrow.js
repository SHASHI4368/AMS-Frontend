import { ArrowForward, ArrowForwardIos } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import React from "react";

const RightArrow = (props) => {
  const { onClick } = props;
  const theme = useTheme();
  return (
    <IconButton
      sx={{
        position: "absolute",
        top: "50%",
        right: 0,
        marginRight: "20px",
        [theme.breakpoints.down("sm")]: {
          mr: "10px",
        },
      }}
      onClick={onClick}
    >
      <ArrowForwardIos />
    </IconButton>
  );
};

export default RightArrow;
