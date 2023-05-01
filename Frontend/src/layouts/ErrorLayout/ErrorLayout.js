// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import PageLayout from "layouts/PageLayout";

import FooterErrorpage from "components/Footer/FooterErrorpage";

function ErrorLayout({ image, children }) {
  return (
    <PageLayout>
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} height="100%">
          <Grid>{children}</Grid>
        </Grid>
      </MDBox>
      <FooterErrorpage light />
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
ErrorLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ErrorLayout;
