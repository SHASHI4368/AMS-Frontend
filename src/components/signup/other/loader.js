import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { CircularProgress } from "@mui/material";
import { Colors } from "../../../styles/theme";

const Loader = ({ progressOpen }) => {
  return (
    <Dialog open={progressOpen}>
      <CircularProgress sx={{margin: 'auto', mt: 2}} />
      <DialogTitle sx={{fontSize: '16px'}}>Please wait...</DialogTitle>
    </Dialog>
  );
};

export default Loader;
