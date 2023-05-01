import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// React
import { useState, useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { handleCarTrends } from "../../redux/actions/CarActions";


// Chart
import Chart from "components/Charts/Chart";

import CircularProgressWithLabel from "components/CircularProgressWithLabel";

// Parameters
import { parameters } from "components/Trends/ParamsData";


// CSS
import "./ParamTrends.css";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";


function ParamTrends(props) {
  const dispatch = useDispatch();
  const car_info = useSelector((state) => state.CarReducer.selectedCarInfo);
  const start_date = useSelector((state) => state.CarReducer.duration.start_date);
  const end_date = useSelector((state) => state.CarReducer.duration.end_date);
  const trendData = useSelector((state) => state.CarReducer.trendData);
  const trends_loader = useSelector((state) => state.LoaderReducer.trends_loader);

  const [checkedParams, setCheckedParams] = useState([
    {
      title: "Vehicle Speed",
      name: "vehicle_speed",
      color: "success",
      icon: "speed",
    },
  ]);
  const [checkedState, setCheckedState] = useState([true, false, false, false, false]);

  const handleOnChange = (parameter, key) => {
    const updatedCheckedState = checkedState.map((item, index) => (index === key ? !item : item));
    setCheckedState(updatedCheckedState);

    const updatedCheckedParams = parameters.filter((param, index) => updatedCheckedState[index]);
    setCheckedParams(updatedCheckedParams);
  };

  useEffect(() => {
    const params = checkedParams.map((param, key) => param.name);
    if (params.length === 0) {
      alert("kindly select the paramaters");
    } else {
      car_info?.id > 0 && dispatch(handleCarTrends(car_info.id, params, start_date, end_date));
    }
  }, [car_info]);

  const handleOnClick = () => {
    const params = checkedParams.map((param, key) => param.name);
    if (params.length === 0) {
      alert("kindly select the paramaters");
    } else {
      car_info?.id > 0 && dispatch(handleCarTrends(car_info.id, params, start_date, end_date));
    }
  };

  return (
    <>
      <MDBox mt={5}>
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
              Car Parameters
            </MDTypography>
            <MDButton variant="gradient" color="dark" onClick={() => handleOnClick()}>
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;Update
            </MDButton>
          </MDBox>

          <MDBox pt={8}>
            <Grid container spacing={3}>
              <div className="parameterswidth">
                <ul>
                  {parameters.map((parameter, key) => (
                    <li key={key} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={parameter.name}
                        id={parameter.name}
                        checked={checkedState[key]}
                        onChange={() => handleOnChange(parameter, key)}
                      />
                      <label className="form-check-label" htmlFor={parameter.name}>
                        {parameter.title}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
      {trends_loader ? (
        <>
          <MDBox ml={7} mt={5} textAlign="center">
            <CircularProgressWithLabel />
          </MDBox>
        </>
      ) : (
        <>
          <MDBox className="trends-chart" ml={-2} mt={5}>
            {trendData?.status == "success" && (
              <Chart trendData={trendData} parameters={checkedParams} />
            )}
          </MDBox>
          
        </>
      )}
    </>
  );
}

export default ParamTrends;
