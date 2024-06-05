import React from "react";
import { Box, Grid, Link, Typography } from "@mui/material";
import { Colors } from "../../styles/theme";
import { FooterText, FooterTitle } from "../../styles/footer";
import { Email, Phone } from "@mui/icons-material";
import { lighten } from "polished";

const Footer = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 250"
        style={{ marginBottom: "-30px" }}
      >
        <path
          style={{ zIndex: 1 }}
          fill={lighten(0.09, Colors.primary)}
          fill-opacity="1"
          d="M0,64L18.5,85.3C36.9,107,74,149,111,165.3C147.7,181,185,171,222,186.7C258.5,203,295,245,332,234.7C369.2,224,406,160,443,144C480,128,517,160,554,170.7C590.8,181,628,171,665,181.3C701.5,192,738,224,775,208C812.3,192,849,128,886,85.3C923.1,43,960,21,997,21.3C1033.8,21,1071,43,1108,64C1144.6,85,1182,107,1218,117.3C1255.4,128,1292,128,1329,112C1366.2,96,1403,64,1422,48L1440,32L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
        ></path>
        <path
          style={{ zIndex: 22 }}
          fill={lighten(0.04, Colors.primary)}
          fill-opacity="1"
          d="M0,160L12.6,149.3C25.3,139,51,117,76,122.7C101.1,128,126,160,152,149.3C176.8,139,202,85,227,90.7C252.6,96,278,160,303,202.7C328.4,245,354,267,379,245.3C404.2,224,429,160,455,122.7C480,85,505,75,531,96C555.8,117,581,171,606,181.3C631.6,192,657,160,682,122.7C707.4,85,733,43,758,58.7C783.2,75,808,149,834,176C858.9,203,884,181,909,192C934.7,203,960,245,985,245.3C1010.5,245,1036,203,1061,181.3C1086.3,160,1112,160,1137,154.7C1162.1,149,1187,139,1213,122.7C1237.9,107,1263,85,1288,112C1313.7,139,1339,213,1364,218.7C1389.5,224,1415,160,1427,128L1440,96L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"
        ></path>
        <path
          style={{ zIndex: 22 }}
          fill={Colors.primary}
          fill-opacity="1"
          d="M0,96L18.5,85.3C36.9,75,74,53,111,69.3C147.7,85,185,139,222,149.3C258.5,160,295,128,332,122.7C369.2,117,406,139,443,138.7C480,139,517,117,554,128C590.8,139,628,181,665,197.3C701.5,213,738,203,775,197.3C812.3,192,849,192,886,192C923.1,192,960,192,997,186.7C1033.8,181,1071,171,1108,176C1144.6,181,1182,203,1218,224C1255.4,245,1292,267,1329,277.3C1366.2,288,1403,288,1422,288L1440,288L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
        ></path>
      </svg>
      <Box
        sx={{
          background: Colors.primary,
          color: Colors.white,
          p: { xs: 4, md: 10 },
          pt: 12,
          pb: 12,
          fontSize: { xs: "12px", md: "14px" },
        }}
      >
        <Grid container spacing={15} justifyContent={"center"}>
          <Grid item xs={12} md={4} lg={4}>
            <FooterTitle variant="h6">Address:</FooterTitle>
            <FooterText variant="body1">
              Faculty of Engineering, University of Ruhuna,
            </FooterText>
            <FooterText variant="body1">Hapugala, Galle, Sri Lanka.</FooterText>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <FooterTitle variant="h6">Contact Us:</FooterTitle>
            <FooterText sx={{letterSpacing: 0}} variant="body1">
              Phone : +(94) 091 2245765/6
            </FooterText>
            <FooterText variant="body1">
              E-mail : webmaster@eng.ruh.ac.lk
            </FooterText>
            <Box sx={{ mt: 4, color: Colors.appbar }}>
              <Link
                sx={{ color: Colors.appbar, mr: 3 }}
                href="tel:+94 91 2245765"
              >
                <Phone />
              </Link>
              <Link
                sx={{ color: Colors.appbar }}
                href="mailto:webmaster@eng.ruh.ac.lk"
              >
                <Email />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <FooterTitle variant="h6">Others:</FooterTitle>
            <Link
              sx={{ color: Colors.appbar }}
              href="http://lms.eng.ruh.ac.lk/"
            >
              <FooterText variant="body1">
                Learning Management System
              </FooterText>
            </Link>
            <Link
              sx={{ color: Colors.appbar }}
              href="http://stm.eng.ruh.ac.lk/src/login.php"
            >
              <FooterText variant="body1">Squirrel Mail</FooterText>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
