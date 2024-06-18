import { Box, styled } from "@mui/material";
import { Colors } from "../theme";

export const ProfileContainer = styled(Box)(({ theme }) => ({
  height: "800px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const ProfilePaper = styled(Box)(({ theme }) => ({
  backgroundColor: Colors.white,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: `1px solid ${Colors.dim_grey}`,
  boxShadow: "10px 10px 10px 0 rgba(0, 0, 0, 0.1)",
  opacity: 0.8,
  position: "relative",
  borderRadius: "10px",
  padding: "46px",
  width: "60%",
  textAlign: "center",
  height: "600px",
  marginTop: "100px",
  [theme.breakpoints.down("md")]: {
    width: "80%",
    height: "600px",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "30px",
    width: "80%",
    height: "650px",
  },
}));
