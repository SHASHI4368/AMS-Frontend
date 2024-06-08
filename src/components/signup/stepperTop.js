import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { useUIContext } from "../../context/ui";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

const steps = ["Select faculty email", "Faculty verification", "Enter detals"];

export default function StepperTop() {
  const { activeStep, setActiveStep, completed} = useUIContext();

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const theme = useTheme();
  // if matches is true, the screen is md or smaller
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        marginTop: '-20px',
        width: "100%",
        [theme.breakpoints.down("md")]: { width: "130%" },
        [theme.breakpoints.down("sm")]: { width: "150%" },
      }}
    >
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {matches ? "" : label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
