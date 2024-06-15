import { Box, Card, CardMedia, Divider, TextField, Typography, styled } from "@mui/material";
import "@fontsource/poppins";
import "@fontsource/raleway";
import { Colors } from "../theme";

export const DepartmentContainer = styled(Box)(({ theme }) => ({
 display: 'flex',
 minHeight: '700px',
 flexDirection: 'column',
 alignItems: 'center',
 borderTop: `2px solid ${Colors.dove_gray}`,
 backgroundColor: Colors.appbar,
 paddingBottom: '20px',
}));

export const DepartmentHeader = styled(Typography)(({ theme }) => ({
 fontFamily: 'Raleway',
 fontSize: '50px',
 fontWeight: 600,
 marginTop: '20px',
 textAlign: 'center',
 color: Colors.primary,
 [theme.breakpoints.down('md')]: {
  fontSize: '40px',
 },
 [theme.breakpoints.down('sm')]: {
  fontSize: '30px',
 },
}));

export const Searchbar = styled(TextField)(({ theme }) => ({
 width: '50%',
 marginTop: '40px',
 [theme.breakpoints.down('md')]: {
  width: '70%',
 },
 [theme.breakpoints.down('sm')]: {
  width: '90%',
 },
}));

export const FullDivider = styled(Divider)(({ theme }) => ({
 height: '2px',
 width: '80%',
 backgroundColor: Colors.dove_gray,
 marginTop: '40px',
}));

export const NoStaffText = styled(Typography)(({ theme }) => ({
 fontFamily: 'Poppins',
 marginTop: '80px',
 fontSize: '100px',
 fontWeight: 400,
 color: Colors.dove_gray,
}));

export const StaffCardContainer = styled(Card)(({ theme }) => ({
  margin: "60px 60px",
  maxWidth: 345,
  height: 500,
}));

export const StaffCardMedia = styled(CardMedia)(({ theme }) => ({
 height: '300px',
}));

export const StaffCardTitle = styled(Typography)(({ theme }) => ({
 fontFamily: 'Raleway',
 fontSize: '25px',
 fontWeight: 400,
}));

export const StaffCardSubtitle = styled(Typography)(({ theme }) => ({
 fontFamily: 'Poppins',
 fontSize: '18px',
 fontWeight: 300,
}));

export const StaffContainer = styled(Box)(({ theme }) => ({
 width: '100%',
}));

export const StaffScrollContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginLeft: '20px',
  [theme.breakpoints.down('md')]: {
    marginLeft: '0px',
  },
}));