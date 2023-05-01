import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DashboardHourlyAvgRPM,
  DashboardWeeklyAvgRPM,
  DashboardHourlyAvgSpeed,
  DashboardWeeklyAvgSpeed,
  DashboardHourlyAvgFuel,
  DashboardWeeklyAvgFuel,
} from "redux/actions/CarActions";
import * as ActionTypes from "../../redux/actions/ActionTypes";

//For Date Picking
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import TextField from "@mui/material/TextField";

// For Navigation
import { useNavigate } from "react-router-dom";
import DashboardCharts from "./DashboardCharts";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const DashboardDatePicker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BackButton = async () => {
    await navigate("/dashboard");
  };
  const [startDate, startDateChange] = useState(new Date());
  let startRes = moment(startDate).format("YYYY-MM-DD");
  const selectedCar = useSelector((state) => state.CarReducer.selectedDashboardCarInfo);
  console.log("selected Car and date selected", selectedCar, startRes);
  //   handling empty selectedCar Object
  if (!Object.keys(selectedCar).length > 0) {
    navigate("/dashboard");
  }
  useEffect(async () => {
    await dispatch({ type: ActionTypes.DASHBOARD_HR_SPEED_LOADER_START });
    await dispatch({ type: ActionTypes.DASHBOARD_HR_RPM_LOADER_START });
    await dispatch({ type: ActionTypes.DASHBOARD_HR_FUEL_LOADER_START });
    await dispatch({ type: ActionTypes.DASHBOARD_WK_SPEED_LOADER_START });
    await dispatch({ type: ActionTypes.DASHBOARD_WK_RPM_LOADER_START });
    await dispatch({ type: ActionTypes.DASHBOARD_WK_FUEL_LOADER_START });

    (async () => {
      await dispatch(DashboardHourlyAvgRPM(selectedCar.id, startRes));
      await dispatch({ type: ActionTypes.DASHBOARD_HR_RPM_LOADER_END });
    })();
    (async () => {
      await dispatch(DashboardWeeklyAvgRPM(selectedCar.id, startRes));
      await dispatch({ type: ActionTypes.DASHBOARD_WK_RPM_LOADER_END });
    })();
    (async () => {
      await dispatch(DashboardHourlyAvgSpeed(selectedCar.id, startRes));
      await dispatch({ type: ActionTypes.DASHBOARD_HR_SPEED_LOADER_END });
    })();
    (async () => {
      await dispatch(DashboardWeeklyAvgSpeed(selectedCar.id, startRes));
      await dispatch({ type: ActionTypes.DASHBOARD_WK_SPEED_LOADER_END });
    })();
    (async () => {
      await dispatch(DashboardHourlyAvgFuel(selectedCar.id, startRes));
      await dispatch({ type: ActionTypes.DASHBOARD_HR_FUEL_LOADER_END });
    })();
    (async () => {
      await dispatch(DashboardWeeklyAvgFuel(selectedCar.id, startRes));
      await dispatch({ type: ActionTypes.DASHBOARD_WK_FUEL_LOADER_END });
    })();
  }, [startDate]);

  return (
    <>
      <Grid item xs={12} md={10} xl={10} >
        <Card id="delete-account">
          <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" fontWeight="medium">
              Car Information
            </MDTypography>
            <MDButton onClick={() => BackButton()} variant="gradient" color="dark">
              <Icon sx={{ fontWeight: "bold" }}>arrow_back</Icon>
              &nbsp;Back
            </MDButton>
          </MDBox>
          <MDBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={6} >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Select Date"
                    inputFormat="MM/dd/yyyy"
                    value={startDate}
                    sx={{ width: 5000, outerHeight: 200 }}
                    onChange={(date) => startDateChange(date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <DashboardCharts />
    </>
  );
};

export default DashboardDatePicker;
