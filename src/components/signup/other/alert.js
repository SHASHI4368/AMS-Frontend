import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useUIContext } from "../../../context/ui";

export default function MyAlert() {
  const {alertOpen, setAlertOpen, alertMessage} = useUIContext();

  const handleClick = () => {
    setAlertOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key={'top' + 'center'}
        open={alertOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        sx={{zIndex: 9999999}}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
