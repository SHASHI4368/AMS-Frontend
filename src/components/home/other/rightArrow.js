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
        top: "46%",
        right: 0,
        marginRight: "-50px",
        [theme.breakpoints.down("sm")]: {
          mr: "-30px",
        },
      }}
      onClick={onClick}
    >
      <ArrowForwardIos />
    </IconButton>
  );
};

export default RightArrow;
