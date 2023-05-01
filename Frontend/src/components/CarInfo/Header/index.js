
import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import avatarrevised from "assets/images/avatarrevised.jpg";
import loginrevised from "assets/images/loginrevised.jpg";

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);


  return (
    <MDBox position="relative" mb={3}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="20rem"
        borderRadius="xl"
        sx={{
          backgroundImage: () =>
            ` url(${loginrevised})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={avatarrevised} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
               Car Records
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
               OBD CHARM
              </MDTypography>
            </MDBox>
          </Grid>

        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}
// Setting default props for the Header
Header.defaultProps = {
  children: "",
};
// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};
export default Header;
