import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDashboardSelectedCar } from "redux/actions/CarActions";

// @mui material components
import Card from "@mui/material/Card";
import CarImageCard from "examples/Cards/ProjectCards/CarImageCard";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

// @mui material components
import Icon from "@mui/material/Icon";

// Images
import honda from "assets/images/honda.png";

const DashboardTable = ({ all_cars_record, noGutter }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const SelectCar = async (car) => {
    await dispatch(setDashboardSelectedCar(car));
    await navigate("/dashboard/carinfo");
  };

  return (
    <>
      <Grid item xs={12} md={10}>
        <Card id="delete-account">
          <MDBox pt={3} px={2}>
            <MDTypography variant="h6" fontWeight="medium">
              Dashboard Table
            </MDTypography>
          </MDBox>

          {all_cars_record.map((e, index) => {
            return (
              <div key={index}>
                <span>
                  <MDBox pt={1} pb={1} px={2}>
                    <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                      <MDBox
                        component="li"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        bgColor={darkMode ? "transparent" : "grey-100"}
                        borderRadius="lg"
                        p={3}
                        mb={noGutter ? 0 : 1}
                        mt={2}
                      >
                        <MDBox
                          display="flex"
                          alignItems="center"
                          mt={{ xs: 2, sm: 0 }}
                          ml={{ xs: -1.5, sm: 0 }}
                        >
                          <MDBox ml={-3}>
                            <Grid item md={4} xl={8}>
                              <CarImageCard image={honda} />
                            </Grid>
                          </MDBox>
                        </MDBox>

                        <MDBox width="100%" display="flex" flexDirection="column">
                          <MDBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems={{ xs: "flex-start", sm: "center" }}
                            flexDirection={{ xs: "column", sm: "row" }}
                            mb={2}
                          >
                            <MDTypography
                              variant="button"
                              fontWeight="medium"
                              textTransform="capitalize"
                            >
                              {e.name} {e.make}
                            </MDTypography>

                            <MDBox
                              display="flex"
                              alignItems="center"
                              mt={{ xs: 2, sm: 0 }}
                              ml={{ xs: -1.5, sm: 0 }}
                            >
                              <MDBox mr={1}>
                                <MDButton
                                  onClick={() => SelectCar(e)}
                                  variant="outlined"
                                  size="small"
                                  color={darkMode ? "white" : "dark"}
                                >
                                  <Icon>open_in_new</Icon>&nbsp;view details
                                </MDButton>
                              </MDBox>
                            </MDBox>
                          </MDBox>
                          <MDBox mb={2} lineHeight={0}>
                            <MDTypography variant="caption" color="text">
                              Car Id:&nbsp;&nbsp;&nbsp;
                              <MDTypography
                                variant="caption"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                {e.id}
                              </MDTypography>
                            </MDTypography>
                          </MDBox>
                          <MDBox mb={2} lineHeight={0}>
                            <MDTypography variant="caption" color="text">
                              Car User:&nbsp;&nbsp;&nbsp;
                              <MDTypography
                                variant="caption"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                {e.name} {e.surname}
                              </MDTypography>
                            </MDTypography>
                          </MDBox>{" "}
                          <MDBox mb={2} lineHeight={0}>
                            <MDTypography variant="caption" color="text">
                              Car :&nbsp;&nbsp;&nbsp;
                              <MDTypography
                                variant="caption"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                {e.make} {e.model} {e.year}
                              </MDTypography>
                            </MDTypography>
                          </MDBox>
                          <MDBox mb={2} lineHeight={0}>
                            <MDTypography variant="caption" color="text">
                              Last active:&nbsp;&nbsp;&nbsp;
                              <MDTypography variant="caption" fontWeight="medium">
                                {e.time}
                              </MDTypography>
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </span>
              </div>
            );
          })}
        </Card>
      </Grid>
    </>
  );
};

export default DashboardTable;
