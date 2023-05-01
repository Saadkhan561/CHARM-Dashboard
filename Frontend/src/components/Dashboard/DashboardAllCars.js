import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAllCarsLastRecord } from "redux/actions/CarDetailsActions";
import DashboardTable from "./DashboardTable";
import CircularProgressWithLabel from "components/CircularProgressWithLabel";
import MDBox from "components/MDBox";

const DashboardAllCars = () => {
  const dispatch = useDispatch();
  const last_record_loader = useSelector((state) => state.LoaderReducer.last_record_loader);
  const all_cars_record = useSelector((state) => state.CarReducer.last_record);
  useEffect(() => {
    dispatch(handleAllCarsLastRecord());
  }, []);
  return (
    <>
      {all_cars_record?.data?.length > 0 ? (
        <DashboardTable all_cars_record={all_cars_record.data} />
      ) : (
        <MDBox ml={60} mt={20} mb={25}>
          <CircularProgressWithLabel />
        </MDBox>
      )}
    </>
  );
};

export default DashboardAllCars;
