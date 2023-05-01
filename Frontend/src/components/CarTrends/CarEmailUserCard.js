// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import loginrevised from "assets/images/loginrevised.jpg";

function CarEmailUserCard({ color, number, holder, expires }) {
  const numbers = [...`${number}`];

  if (numbers.length < 16 || numbers.length > 16) {
    throw new Error(
      "Invalid value for the prop number, the value for the number prop shouldn't be greater than or less than 16 digits"
    );
  }

  return (
    <>
      <MDBox mt={3}>
        <Card
          sx={({ palette: { gradients }, functions: { linearGradient }, boxShadows: { xl } }) => ({
            background: gradients[color]
              ? linearGradient(gradients[color].main, gradients[color].state)
              : linearGradient(gradients.dark.main, gradients.dark.state),
            boxShadow: xl,
            position: "relative",
          })}
        >
          <MDBox
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            opacity={0.4}
            sx={{
              backgroundImage: `url(${loginrevised})`,
              backgroundSize: "cover",
            }}
          />
          <MDBox position="relative" zIndex={2} p={2}>
            <MDBox color="white" p={1} lineHeight={0} display="inline-block">
              <Icon fontSize="default">wifi</Icon>
            </MDBox>
            <MDTypography
              variant="h5"
              color="white"
              fontWeight="medium"
              sx={{ mt: 5, mb: 5, pb: 1 }}
            ></MDTypography>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={5} mb={5}>
              <MDBox display="flex" alignItems="center">
                <MDBox mr={3} lineHeight={1}>
                  <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                    Car Owner
                  </MDTypography>
                  <MDTypography
                    variant="h6"
                    color="white"
                    fontWeight="medium"
                    textTransform="capitalize"
                  >
                    {holder}
                  </MDTypography>
                </MDBox>
                <MDBox lineHeight={1}>
                  <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                    Car User Email
                  </MDTypography>
                  <MDTypography variant="h6" color="white" fontWeight="medium">
                    {expires}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </>
  );
}

// Setting default values for the props of CarEmailUserCard
CarEmailUserCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the CarEmailUserCard
CarEmailUserCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  number: PropTypes.number.isRequired,
  holder: PropTypes.string.isRequired,
  expires: PropTypes.string.isRequired,
};

export default CarEmailUserCard;
