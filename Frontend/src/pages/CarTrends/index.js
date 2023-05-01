// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "components/DashboardNavbar";
import Footer from "components/Footer/index";

// Dashboard components

import CarTrendsDateCard from "components/CarTrends/CarTrendsDateCard";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./trends.css";

//Redux
import { useDispatch, useSelector } from "react-redux";

function CarTrends() {
  const trendData = useSelector((state) => state.CarReducer.trendData);

  const [checkedParams, setCheckedParams] = useState([
    {
      title: "Vehicle Speed",
      name: "vehicle_speed",
      color: "success",
      icon: "speed",
    },
  ]);

  useEffect(() => {
    const params = checkedParams.map((param, key) => param.name);
  });

  const navigate = useNavigate();

  if (!localStorage.token && !localStorage.email) {
    useEffect(() => {
      navigate("/authentication/sign-in");
    });
    return (
      <MDBox my={5} textAlign="center">
        <h1 className="alert-heading">Please Login !</h1>;
      </MDBox>
    );
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <MDBox mb={-2}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <CarTrendsDateCard />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default CarTrends;
