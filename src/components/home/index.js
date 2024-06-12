import { Box } from '@mui/material'
import React from 'react'
import { useUIContext } from '../../context/ui'
import { useNavigate } from 'react-router-dom';

const StudentHome = () => {
  const {authorized, setAlertOpen, setAlertMessage } = useUIContext();
  const navigate = useNavigate();
  if (!authorized) {
    setAlertOpen(true);
    setAlertMessage("Please login to continue");
    navigate("/");
  }
  return (
    <Box sx={{minHeight: '600px'}}>
     Student home
    </Box>
  )
}

export default StudentHome