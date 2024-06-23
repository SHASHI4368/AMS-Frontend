import { Avatar, Box, Typography, useTheme } from '@mui/material';
import React from 'react'
import "@fontsource/raleway";

const getColor = (status) => {
  switch (status) {
    case "New":
      return "#1E90FF"; // Dodger Blue
    case "Blocked":
      return "#FF4500"; // Orange Red
    case "Confirmed":
      return "#32CD32"; // Lime Green
    case "Cancelled":
      return "#FF6347"; // Tomato
    case "Completed":
      return "#8A2BE2"; // Blue Violet
    default:
      return "#1E90FF"; // Dodger Blue
  }
};

const colors = [
  {
    status: "New",
    color: getColor("New"),
  },
  {
    status: "Blocked",
    color: getColor("Blocked"),
  },
  {
    status: "Confirmed",
    color: getColor("Confirmed"),
  },
  {
    status: "Cancelled",
    color: getColor("Cancelled"),
  },
  {
    status: "Completed",
    color: getColor("Completed"),
  },
]

const ColorPalette = () => {

 const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      }}
    >
      {colors.map((color) => (
        <Box
          key={color.status}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          margin="10px"
          width="45px"
          sx={{[theme.breakpoints.up('small')]:{ margin: "10px 20px"} }}
        >
          <Avatar sx={{ bgcolor: color.color }}> </Avatar>
          <Typography
            sx={{
              fontFamily: "Raleway",
              fontSize: "15px",
              [theme.breakpoints.down("sm")]: {
                fontSize: "12px",
              },
            }}
          >
            {color.status}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default ColorPalette