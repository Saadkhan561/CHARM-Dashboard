import axios from "axios";
import * as ActionTypes from "./ActionTypes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = axios.create({
  baseURL: `http://localhost:5000`,
});

export const handleAllCarsDetailsActions = (startRes, endRes) => {
  let data = { start_date: startRes, end_date: endRes };
  return (dispatch) => {
    dispatch({ type: "LOADER_START" });
    return api
      .post("/all-car-details/", JSON.stringify(data))
      .then((res) => {
        if (res.data.status === "success") {
          dispatch({ type: "LOADER_END" });
          return dispatch({
            type: ActionTypes.CAR_DETAILS,
            payload: res.data,
            duration: data,
          });
        } else {
          toast.warn("No Record Found !", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
          });
          dispatch({ type: "LOADER_END" });
          return dispatch({
            type: ActionTypes.CAR_DETAILS,
            payload: res.data,
          });
        }
      })
      .catch((error) => {});
  };
};


export const setSelectedCar = (car_id) => {
  return {
    type: ActionTypes.SET_SELECTED_CAR,
    payload: car_id,
  };
};

export const handleAllCarsLastRecord = () => {
  return (dispatch) => {
    dispatch({ type: "CARS_LAST_RECORD_LOADER_START" });
    return api
      .get("/cars-last-record/")
      .then((res) => {
        if (res.data.status === "success") {
          dispatch({ type: "CARS_LAST_RECORD_LOADER_END" });
          return dispatch({
            type: ActionTypes.CARS_LAST_RECORD,
            payload: res.data,
          });
        } else {
          dispatch({ type: "CARS_LAST_RECORD_LOADER_END" });
          return dispatch({
            type: ActionTypes.CARS_LAST_RECORD,
            payload: res.data,
          });
        }
      })
      .catch((error) => {});
  };
};
