// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { Box } from "@mui/material";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React base styles
import typography from "assets/theme/base/typography";

// Images

import ncllogorevised from "assets/images/ncllogorevised.png";
import ncailogo from "assets/images/ncailogo.png";
import nedlogo from "assets/images/nedlogo.png";


function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <MDBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <MDTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </MDTypography>
        </Link>
      </MDBox>
    ));

  return (
    <div style={{
      position:"absolute",
      left:"0",
      right:"0",
      
    }}>
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >

    <MDBox > 
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
        marginLeft={0.5}
        alt="NED Logo."
        src={nedlogo}
      />
      <Box 
        component="img"
        sx={{
          height: 50,
          width: 75,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
          
        }}
        marginLeft={0.5}
        alt="NCAI Logo."
        src={ncailogo}
      />
      </MDBox>

      


      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={10}
        py={5}
       
      >
        &copy; {new Date().getFullYear()}, Powered by
        <MDBox fontSize={size.md} color="text" mb={-0.5} mx={0.25} >

        </MDBox>
 
        <Link href="https://nedncl.com/" target="_blank">
          <MDTypography variant="button" fontWeight="medium">
            &nbsp;Neurocomputation Lab - NCAI&nbsp;
          </MDTypography>
        </Link>
        for a better web.
      </MDBox>


    </MDBox>
    </div>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://www.creative-tim.com/", name: "Creative Tim" },
  links: [
    { href: "https://www.creative-tim.com/", name: "Creative Tim" },
    { href: "https://www.creative-tim.com/presentation", name: "About Us" },
    { href: "https://www.creative-tim.com/blog", name: "Blog" },
    { href: "https://www.creative-tim.com/license", name: "License" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
