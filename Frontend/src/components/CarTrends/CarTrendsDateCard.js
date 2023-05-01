// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { useState, useEffect } from "react";

//For Date Picking
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import moment from "moment";

import { CarTrendsTable } from "components/CarTrends/CarTrendsTable";
import CircularProgressWithLabel from "components/CircularProgressWithLabel";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { handleAllCarsDetailsActions } from "../../redux/actions/CarDetailsActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CarTrendsDateCard() {
  const dispatch = useDispatch();

  //Dates States
  const [startDate, startDateChange] = useState(new Date());
  const [endDate, endDateChange] = useState(new Date());

  //Dates Format Conversion
  var startRes = moment(startDate).format("YYYY-MM-DD");
  var endRes = moment(endDate).format("YYYY-MM-DD");

  //Redux States
  const loader = useSelector((state) => state.LoaderReducer.loader);
  const cardetails = useSelector((state) => state.CarReducer.cardetails);

  //Dispatching Action
  const getData = () => {
    if (startRes <= endRes) {
      dispatch(handleAllCarsDetailsActions(startRes, endRes));
    } else {
      alert("Start Date is bigger than end Date");
    }
  };
  useEffect(() => {
    dispatch(handleAllCarsDetailsActions(startRes, endRes));
  }, []);
  if (!localStorage.token && !localStorage.email) {
    return <ErrorPage button="sign-in" />;
  } else {
    return (
      <>
        <MDBox mb={12}>
          <ToastContainer />
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card id="delete-account">
                    <MDBox
                      pt={2}
                      px={2}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={3}
                    >
                      <MDTypography variant="h6" fontWeight="medium">
                        Car Records
                      </MDTypography>
                      <MDButton variant="gradient" color="dark" onClick={() => getData()}>
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;View
                      </MDButton>
                    </MDBox>

                    <MDBox p={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6} xl={6}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              label="Start Date"
                              inputFormat="MM/dd/yyyy"
                              value={startDate}
                              sx={{ width: 5000, outerHeight: 200 }}
                              onChange={(date) => startDateChange(date)}
                              renderInput={(params) => <TextField {...params} />}
                            />

                            <MDBox mt={3} mb={3}>
                              <DesktopDatePicker
                                label="End Date"
                                inputFormat="MM/dd/yyyy"
                                sx={{ width: 500 }}
                                value={endDate}
                                onChange={(date) => endDateChange(date)}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </MDBox>
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>

        {loader ? (
          <>
            <Grid item xs={12} md={6} xl={8} mt={3}>
              <MDBox ml={70} mb={5}>
                <CircularProgressWithLabel />
              </MDBox>
            </Grid>
          </>
        ) : (
          <MDBox mt={10}>
            {cardetails?.data?.length > 0 && <CarTrendsTable cardetails={cardetails?.data} />}
          </MDBox>
        )}
      </>
    );
  }
}

export default CarTrendsDateCard;
