import * as React from "react";

import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Footer from "components/Footer/index";

// Material Dashboard 2 React example components
import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "components/DashboardNavbar";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { handleAllCarsLastRecord } from "../../redux/actions/CarDetailsActions";

import Header from "components/CarInfo/Header";

import { CarInfoTable } from "components/CarInfo/CarInfoTable";
import CircularProgressWithLabel from "../../components/CircularProgressWithLabel";

function LastRecord() {
  //Redux dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleAllCarsLastRecord());
  }, []);

  const last_record = useSelector((state) => state.CarReducer.last_record);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header>
        <MDBox pt={6} pb={3}>
          {last_record?.data?.length > 0 ? (
            <CarInfoTable lastrecord={last_record?.data} />
          ) : (
            <MDBox ml={2}>
              <CircularProgressWithLabel />
            </MDBox>
          )}
        </MDBox>
      </Header>
      <MDBox mt={-4}>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}

export default LastRecord;
