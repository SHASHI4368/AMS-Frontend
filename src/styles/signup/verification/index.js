import { Box, TextField, styled } from "@mui/material";

export const CodeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}));

export const CodeInput = styled(TextField)(({ theme }) => ({
  margin: "-20px 10px",
  width: "80px",
  maxLength: 1,
  resize: {
    fontSize: "40px",
  },
  alignContent: "center",
  [theme.breakpoints.down("md")]: {
    width: "80px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "60px",
    marginBottom: "20px",
  },
}));
