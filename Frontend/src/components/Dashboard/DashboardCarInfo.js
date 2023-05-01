import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardDatePicker from "./DashboardDatePicker";

const DashboardCarInfo = () => {
  const navigate = useNavigate();
  // const BackButton = async () => {
  //   await navigate("/dashboard");
  // };
  return (
    <>
      {/* <div>Info</div> */}
      {/* <button onClick={() => BackButton()}>Back</button> */}
      <DashboardDatePicker />
    </>
  );
};

export default DashboardCarInfo;
