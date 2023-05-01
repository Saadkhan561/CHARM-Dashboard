import axios from "axios";
import * as ActionTypes from "./ActionTypes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = axios.create({
  baseURL: `http://localhost:5000`,
});

export const setSelectedCar = (car_info) => {
  return {
    type: ActionTypes.SET_SELECTED_CAR,
    payload: car_info,
  };
};

export const handleCarTrends = (car_id, parameters, start_date, end_date) => {
  let data = {
    car_id: car_id,
    parameters,
    start_date,
    end_date,
  };
  return async (dispatch) => {
    dispatch({ type: "TRENDS_LOADER_START" });
    return await api
      .post("/car-trends/", JSON.stringify(data))
      .then((res) => {
        if (res.data.status === "success") {
          setTimeout(() => {
            dispatch({ type: "TRENDS_LOADER_END" });
          }, 2000);
          return dispatch({
            type: ActionTypes.CAR_TRENDS,
            payload: res.data,
          });
        } else {
          setTimeout(() => {
            dispatch({ type: "TRENDS_LOADER_END" });
          }, 2000);
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
        });
      });
  };
};

//Dashboard

export const setDashboardSelectedCar = (selected_car) => {
  return {
    type: ActionTypes.SET_DASHBOARD_SELECTED_CAR,
    payload: selected_car,
  };
};

// Dashboard Hourly RPM API
export const DashboardHourlyAvgRPM = (car_id, date) => {
  let data = {
    car_id,
    date,
  };
  return async (dispatch) => {
    // dispatch({ type: "DASHBOARD_HOURLY_AVG_RPM_LOADER_START" });

    return await api
      .post("/dashboard-hourlyAvgRpm/", JSON.stringify(data))
      .then((res) => {
        if (res.data.status === "success") {
          // setTimeout(() => {
          //   dispatch({ type: "DASHBOARD_HOURLY_AVG_RPM_LOADER_END" });
          // }, 2000);
          return dispatch({
            type: ActionTypes.HOURLY_AVG_RPM,
            payload: res.data,
          });
        } else {
          // setTimeout(() => {
          //   dispatch({ type: "DASHBOARD_HOURLY_AVG_RPM_LOADER_END" });
          // }, 2000);
          toast.error("Error Has Been Occured!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
        });
      });
  };
};

// Dashboard Weekly RPM API
export const DashboardWeeklyAvgRPM = (car_id, date) => {
  let data = {
    car_id,
    date,
  };
  return async (dispatch) => {
    // dispatch({ type: "DASHBOARD_WEEKLY_AVG_RPM_LOADER_START" });
    return await api
      .post("/dashboard-weekAvgRpm/", JSON.stringify(data))
      .then((res) => {
        if (res.data.status === "success") {
          // setTimeout(() => {
          //   dispatch({ type: "DASHBOARD_WEEKLY_AVG_RPM_LOADER_END" });
          // }, 2000);
          return dispatch({
            type: ActionTypes.WEEKLY_AVG_RPM,
            payload: res.data,
          });
        } else {
          // setTimeout(() => {
          //   dispatch({ type: "DASHBOARD_WEEKLY_AVG_RPM_LOADER_END" });
          // }, 2000);
          toast.error("Error Has Been Occured!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
        });
      });
  };
};


// Dashboard Hourly Speed API
export const DashboardHourlyAvgSpeed = (car_id, date) => {
  let data = {
    car_id,
    date,
  };
  return async (dispatch) => {
    // dispatch({ type: "DASHBOARD_HOURLY_AVG_SPEED_LOADER_START" });
    return await api
      .post("/dashboard-hourlyAvgSpeed/", JSON.stringify(data))
      .then((res) => {
        if (res.data.status === "success") {
          // setTimeout(() => {
          //   dispatch({ type: "DASHBOARD_HOURLY_AVG_SPEED_LOADER_END" });
          // }, 2000);
          return dispatch({
            type: ActionTypes.HOURLY_AVG_SPEED,
            payload: res.data,
          });
        } else {
          // setTimeout(() => {
          //   dispatch({ type: "DASHBOARD_HOURLY_AVG_SPEED_LOADER_END" });
          // }, 2000);
          toast.error("Error Has Been Occured!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
        });
      });
  };
};


// Dashboard Weekly Speed API
export const DashboardWeeklyAvgSpeed = (car_id, date) => {
  let data = {
    car_id,
    date,
  };
  return async (dispatch) => {
    // dispatch({ type: "DASHBOARD_WEEKLY_AVG_SPEED_LOADER_START" });
    return await api
      .post("/dashboard-weekAvgSpeed/", JSON.stringify(data))
      .then((res) => {
        if (res.data.status === "success") {
          // setTimeout(() => {
          //   dispatch({ type: "DASHBOARD_WEEKLY_AVG_SPEED_LOADER_END" });
          // }, 2000);
          return dispatch({
            type: ActionTypes.WEEKLY_AVG_SPEED,
            payload: res.data,
          });
        } else {
          // setTimeout(() => {
          //   dispatch({ type: "DASHBOARD_WEEKLY_AVG_SPEED_LOADER_END" });
          // }, 2000);
          toast.error("Error Has Been Occured!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
        });
      });
  };
};

export const DashboardHourlyAvgFuel = (car_id, date) => {
  let data = {
    car_id,
    date,
  };
  return async (dispatch) => {
    // dispatch({ type: "DASHBOARD_HOURLY_AVG_FUEL_LOADER_START" });
    return await api
      .post("/dashboard-hourlyAvgFuelconsumption/", JSON.stringify(data))
      .then((res) => {
        if (res.data.status === "success") {
          // setTimeout(() => {
          //   dispatch({ type: "DASHBOARD_HOURLY_AVG_FUEL_LOADER_END" });
          // }, 2000);
          return dispatch({
            type: ActionTypes.HOURLY_AVG_FUEL,
            payload: res.data,
          });
        } else {
          // setTimeout(() => {
          //   dispatch({ type: "DASHBOARD_HOURLY_AVG_FUEL_LOADER_END" });
          // }, 2000);
          toast.error("Error Has Been Occured!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
        });
      });
  };
};


export const DashboardWeeklyAvgFuel = (car_id, date) => {
  let data = {
    car_id,
    date,
  };
  return async (dispatch) => {
    // dispatch({ type: "DASHBOARD_WEEKLY_AVG_FUEL_LOADER_START" });
    return await api
      .post("/dashboard-weekAvgFuelconsumption/", JSON.stringify(data))
      .then((res) => {
        if (res.data.status === "success") {
          // setTimeout(() => {
          //   dispatch({ type: "DASHBOARD_WEEKLY_AVG_FUEL_LOADER_END" });
          // }, 2000);
          return dispatch({
            type: ActionTypes.WEEKLY_AVG_FUEL,
            payload: res.data,
          });
        } else {
          // setTimeout(() => {
          //   dispatch({ type: "DASHBOARD_WEEKLY_AVG_FUEL_LOADER_END" });
          // }, 2000);
          toast.error("Error Has Been Occured!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
        });
      });
  };
};