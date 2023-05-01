/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { Box } from "@mui/material";
import MDTypography from "components/MDTypography";

// Images

// import ncllogowhite from "assets/images/ncllogowhite.png";
// import ncailogowhite from "assets/images/logowhitencai.png";
// import nedlogowhite from "assets/images/nedlogowhite.png";

import ncllogorevised from "assets/images/ncllogorevised.png";
import ncailogo from "assets/images/ncailogo.png";
import nedlogo from "assets/images/nedlogo.png";


// Material Dashboard 2 PRO React base styles
import typography from "assets/theme/base/typography";

function FooterErrorpage({ light }) {
  const { size } = typography;

  return (
    <MDBox position="absolute" width="100%" bottom={0} py={2}>
      <Container>
        <MDBox
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? "dark" : "text"}
            fontSize={size.sm}
          >
            &copy; {new Date().getFullYear()}, Powered by 
            <MDBox fontSize={size.md} color={light ? "dark" : "white"} mb={-0.5} mx={0.25}>

            </MDBox>
          
            <Link href="https://nedncl.com/" target="_blank">
              <MDTypography variant="button" fontWeight="medium" color={light ? "dark" : "white"}>
                &nbsp;Neurocomputation Lab - NCAI&nbsp;
              </MDTypography>
            </Link>
            for a better web.
          </MDBox>
          <MDBox
            component="ul"
            sx={({ breakpoints }) => ({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              listStyle: "none",
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up("lg")]: {
                mt: 0,
              },
            })}
          >
            {/* <MDBox component="li" pr={2} lineHeight={1}>
              <Link href="https://www.creative-tim.com/" target="_blank">
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  Creative Tim
                </MDTypography>
              </Link>
            </MDBox> */}
            <MDBox component="li" px={2} lineHeight={1}>
            <Box 
        component="img"
        sx={{
          height: 50,
          width: 65,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
         
        }}
        alt="NCL Logo."
        src={ncllogorevised}
      />
      <Box 
        component="img"
        sx={{
          height: 50,
          width: 50,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
         
        }}
        marginLeft={1}
        alt="NED Logo."
        src={nedlogo}
      />
      <Box 
        component="img"
        sx={{
          height: 50,
          width: 85,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
          
        }}
        marginLeft={0.5}
        alt="NCAI Logo."
        src={ncailogo}
      />
            </MDBox>
            {/* <MDBox component="li" px={2} lineHeight={1}>
              <Link href="https://www.creative-tim.com/blog" target="_blank">
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  Blog
                </MDTypography>
              </Link>
            </MDBox> */}
            {/* <MDBox component="li" pl={2} lineHeight={1}>
              <Link href="https://www.creative-tim.com/license" target="_blank">
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  License
                </MDTypography>
              </Link>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Container>
    </MDBox>
  );
}

// Setting default props for the Footer
FooterErrorpage.defaultProps = {
  light: false,
};

// Typechecking props for the Footer
FooterErrorpage.propTypes = {
  light: PropTypes.bool,
};

export default FooterErrorpage;
