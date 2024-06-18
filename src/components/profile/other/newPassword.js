import React from "react";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PasswordFormControl } from "../../../styles/signup/details";
import { useUIContext } from "../../../context/ui";

const NewPassword = () => {
  const { profilePassword, setProfilePassword } = useUIContext();
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
        New password
      </InputLabel>
      <Tooltip title="Keep blank if you don't want to change password">
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={profilePassword}
          onChange={(e) => setProfilePassword(e.target.value)}
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
          label="New password"
        />
      </Tooltip>
    </PasswordFormControl>
  );
};

export default NewPassword;
