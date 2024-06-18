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
import { PasswordFormControl } from "../../../styles/signup/details";
import { useSignupContext } from "../../../context/signup";

const ConfirmNewPassword = () => {
  const { confirmNewPassword, setConfirmNewPassword } = useSignupContext();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <PasswordFormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">
        Confirm new password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
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
        label="Confirm new password"
      />
    </PasswordFormControl>
  );
};

export default ConfirmNewPassword;
