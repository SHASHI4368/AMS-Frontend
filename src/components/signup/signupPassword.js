import React from "react";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PasswordFormControl } from "../../styles/signup/details";

const SignupPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.down('md'));
  const small = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PasswordFormControl
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </PasswordFormControl>
  );
};

export default SignupPassword;
