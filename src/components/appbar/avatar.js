import React, { useState } from 'react'
import { DepartmentButton, DepartmentContainer, DepartmentItem } from '../../styles/appbar/desktop';
import { IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Colors } from '../../styles/theme';
import { useUIContext } from '../../context/ui';
import { useNavigate } from 'react-router-dom';

const Avatar = () => {
 const [open, setOpen] = useState(false);
 const {setAuthorized} = useUIContext();
 const navigate = useNavigate();

 const handleLogout = () => {
    setAuthorized(false);
    navigate('/');
 }
  return (
    <DepartmentButton>
      <IconButton
        onMouseLeave={(e) => setOpen(false)}
        onMouseEnter={(e) => setOpen(true)}
        sx={{
          color: open ? Colors.primary : Colors.dim_grey,
          width: "40px",
          height: "40px",
        }}
      >
        <AccountCircle sx={{ fontSize: '40px'}} />
      </IconButton>
      <DepartmentContainer
        onMouseLeave={(e) => setOpen(false)}
        onMouseEnter={(e) => setOpen(true)}
        open={open}
        sx={{
          top: "45px",
          left: "-30px",
          width: "100px",
          border: `1px solid ${Colors.dove_gray}`,
        }}
      >
        <DepartmentItem sx={{ mt: "10px", width: "100px" }}>
          Profile
        </DepartmentItem>
        <DepartmentItem onClick={handleLogout} sx={{ width: "100px" }}>Logout</DepartmentItem>
      </DepartmentContainer>
    </DepartmentButton>
  );
}

export default Avatar