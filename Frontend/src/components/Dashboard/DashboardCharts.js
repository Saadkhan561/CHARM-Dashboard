import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
//Charts
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import { useDispatch, useSelector } from "react-redux";
import CircularProgresssBarWithLabel from "../CircularProgressWithLabel";
import MDTypography from "components/MDTypography";
// Images
import honda from "assets/images/honda.png";

const DashboardCharts = () => {
  const selectedCar = useSelector((state) => state.CarReducer.selectedDashboardCarInfo);

  const dashboard_hourly_avg_rpm = useSelector(
    (state) => state.CarReducer.dashboard_hourly_avg_rpm
  );
  const dashboard_hourly_avg_rpm_loader = useSelector(
    (state) => state.LoaderReducer.dashboard_hourly_avg_rpm_loader
  );

  const dashboard_hourly_avg_speed = useSelector(
    (state) => state.CarReducer.dashboard_hourly_avg_speed
  );
  const dashboard_hourly_avg_speed_loader = useSelector(
    (state) => state.LoaderReducer.dashboard_hourly_avg_speed_loader
  );

  const dashboard_hourly_avg_fuel = useSelector(
    (state) => state.CarReducer.dashboard_hourly_avg_fuel
  );
  const dashboard_hourly_avg_fuel_loader = useSelector(
    (state) => state.LoaderReducer.dashboard_hourly_avg_fuel_loader
  );
  const dashboard_weekly_avg_rpm = useSelector(
    (state) => state.CarReducer.dashboard_weekly_avg_rpm
  );
  const dashboard_weekly_avg_rpm_loader = useSelector(
    (state) => state.LoaderReducer.dashboard_weekly_avg_rpm_loader
  );

  const dashboard_weekly_avg_speed = useSelector(
    (state) => state.CarReducer.dashboard_weekly_avg_speed
  );
  const dashboard_weekly_avg_speed_loader = useSelector(
    (state) => state.LoaderReducer.dashboard_weekly_avg_speed_loader
  );

  const dashboard_weekly_avg_fuel = useSelector(
    (state) => state.CarReducer.dashboard_weekly_avg_fuel
  );
  const dashboard_weekly_avg_fuel_loader = useSelector(
    (state) => state.LoaderReducer.dashboard_weekly_avg_fuel_loader
  );
  const hourlyrpmdata = {
    labels: dashboard_hourly_avg_rpm?.hourly_average_rpm?.hours,
    datasets: { label: "Hourly RPM", data: dashboard_hourly_avg_rpm?.hourly_average_rpm?.avg_rpm },
  };
  const hourlyspeeddata = {
    labels: dashboard_hourly_avg_speed?.hourly_average_speed?.hours,
    datasets: {
      label: "Hourly Speed",
      data: dashboard_hourly_avg_speed?.hourly_average_speed?.avg_speed,
    },
  };
  const hourlyfueldata = {
    labels: dashboard_hourly_avg_fuel?.hourly_average_fuel_consumption?.hours,
    datasets: {
      label: "Hourly Fuel",
      data: dashboard_hourly_avg_fuel?.hourly_average_fuel_consumption?.avg_fuel_consumption,
    },
  };
  const weeklyrpmdata = {
    labels: dashboard_weekly_avg_rpm?.week_average_rpm?.startDate,
    datasets: { label: "Weekly RPM", data: dashboard_weekly_avg_rpm?.week_average_rpm?.avg_rpm },
  };

  const weeklyspeeddata = {
    labels: dashboard_weekly_avg_speed?.week_average_speed?.startDate,
    datasets: {
      label: "Weekly Speed",
      data: dashboard_weekly_avg_speed?.week_average_speed?.avg_speed,
    },
  };

  const weeklyfueldata = {
    labels: dashboard_weekly_avg_fuel?.week_average_fuel_consumption?.startDate,
    datasets: {
      label: "Weekly Fuel",
      data: dashboard_weekly_avg_fuel?.week_average_fuel_consumption?.avg_fuel_consumption,
    },
  };

  console.log("selectedCar", selectedCar);
  console.log("Hr rpm => ", dashboard_hourly_avg_rpm_loader);
  console.log("Wk rpm => ", dashboard_weekly_avg_rpm_loader);
  console.log("Hr speed => ", dashboard_hourly_avg_speed_loader);
  console.log("Wk speed => ", dashboard_weekly_avg_speed_loader);
  console.log("Hr fuel => ", dashboard_hourly_avg_fuel_loader);
  console.log("Wk fuel => ", dashboard_weekly_avg_fuel_loader);

  return (
    <>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            {/* <MDBox mb={4}>
            <MDTypography>Car ID{selectedCar?.id}</MDTypography>
            <MDTypography>Owner: {selectedCar?.name}</MDTypography>
            <MDTypography>
              Car: {selectedCar?.make} {selectedCar?.model}
            </MDTypography>
          </MDBox> */}

            <MDBox component="li" display="flex" alignItems="center" py={1} mb={6}>
              <MDBox mr={2}>
                <MDAvatar alt="something here" shadow="md" />
                {/* < MDAvatar src={image} alt="something here" shadow="md" /> */}
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
              >
                <MDTypography variant="button" fontWeight="medium">
                  Owner: {selectedCar?.name}
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  Car: {selectedCar?.make} {selectedCar?.model}
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  Car ID:{selectedCar?.id}
                </MDTypography>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mb={3}>
        {dashboard_hourly_avg_rpm_loader ||
        dashboard_weekly_avg_rpm_loader ||
        dashboard_hourly_avg_speed_loader ||
        dashboard_weekly_avg_speed_loader ||
        dashboard_hourly_avg_fuel_loader ||
        dashboard_weekly_avg_fuel_loader ? (
          <CircularProgresssBarWithLabel />
        ) : (
          <>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsBarChart
                      color="error"
                      title="Vehicle Speed"
                      description=" Speed in a Day"
                      date=""
                      chart={hourlyspeeddata}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="warning"
                      title="Vehicle Speed"
                      description=" Speed in a Week"
                      date=""
                      chart={weeklyspeeddata}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsBarChart
                      color="dark"
                      title="Revolutions Per Minute (RPM)"
                      description=" RPM in a Day"
                      date=""
                      chart={hourlyrpmdata}
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="success"
                      title="Revolutions Per Minute (RPM)"
                      description=" RPM in a Week"
                      date=""
                      chart={weeklyrpmdata}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsBarChart
                      color="info"
                      title="Fuel Consumption"
                      description=" Fuel Consumption in a Day"
                      date=""
                      chart={hourlyfueldata}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="dark"
                      title="Fuel Consumption"
                      description=" Fuel Consumption in a Week"
                      date=""
                      chart={weeklyfueldata}
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </>
        )}
      </MDBox>
    </>
  );
};

export default DashboardCharts;
