import { Box, TextField, styled } from "@mui/material";
import { margin } from "polished";

export const CodeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    width: "140%",
  },
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
    width: "100px",
    marginBottom: "20px",
    margin: "0px 10px",
  },
}));
