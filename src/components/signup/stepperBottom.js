import { Box, Button, Typography} from "@mui/material";
import React from "react";
import { useUIContext } from "../../context/ui";import { useTheme } from "@emotion/react";

const steps = ["Select faculty email", "Faculty verification", "Enter detals"];

const StepperBottom = () => {
  const { activeStep, setActiveStep, completed, setCompleted } = useUIContext();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "90%",
        pb: 2,
        [theme.breakpoints.down("md")]: { width: "105%" },
        [theme.breakpoints.down("sm")]: { width: "120%",},
      }}
    >
      {allStepsCompleted() ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </Button>
            {activeStep !== steps.length &&
              (completed[activeStep] ? (
                <Typography variant="caption" sx={{ display: "inline-block" }}>
                  Step {activeStep + 1} already completed
                </Typography>
              ) : (
                <Button onClick={handleComplete} disabled={!isLastStep()}>
                  Sign up
                </Button>
              ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default StepperBottom;
